"use client";

import { useState, useEffect, useMemo } from "react";
import { Icon } from "@/components/Icon";
import { ProductImage } from "@/components/ProductImage";
import { type Product, type Category } from "@/lib/catalog";
import {
  filterCompatible,
  isFonteAdequate,
  isCoolerRequired,
  isGpuRequired,
  categoryLabel,
  buildTotal,
  type Build,
} from "@/lib/compatibility";

// Abas obrigatórias na ordem (as 8 primeiras) + "Periféricos" (grupo)
const OBLIGATORY: Category[] = ["cpu", "cooler", "mobo", "ram", "gpu", "ssd", "gabinete", "fonte"];
const PERIPHERAL_CATS: Category[] = ["monitor", "teclado", "mouse", "headset", "mousepad", "cadeira"];

// Facetas de filtro por categoria (além de Fabricante, que é universal)
type Facet = { key: string; label: string; fmt?: (v: unknown) => string };
const FACETS: Partial<Record<Category, Facet[]>> = {
  cpu: [{ key: "socket", label: "Socket" }, { key: "igpu", label: "Vídeo integrado", fmt: (v) => (v ? "Sim" : "Não") }],
  mobo: [{ key: "socket", label: "Socket" }, { key: "ram_type", label: "Memória" }, { key: "form", label: "Formato" }],
  ram: [{ key: "ram_type", label: "Tipo" }],
  gpu: [{ key: "mem", label: "Memória" }],
  ssd: [{ key: "tipo", label: "Tipo" }],
  gabinete: [{ key: "form", label: "Formato" }],
  fonte: [{ key: "watts", label: "Potência", fmt: (v) => `${v}W` }],
  cooler: [{ key: "type", label: "Tipo" }],
  monitor: [{ key: "refresh_hz", label: "Taxa", fmt: (v) => `${v}Hz` }, { key: "painel", label: "Painel" }],
};

const BRAND_KEY = "__brand";

// Badges de spec no card (estilo Pichau) — usa só o que existe no catálogo
const SPEC_SKIP = ["cooler_included", "igpu", "supports_socket", "supports_mobo", "brand"];
const SPEC_FMT: Record<string, (v: unknown) => string> = {
  cores: (v) => `${v} núcleos`,
  threads: (v) => `${v} threads`,
  vram_gb: (v) => `${v}GB VRAM`,
  cache_mb: (v) => `${v}MB cache`,
  watts: (v) => `${v}W`,
  clock_ghz: (v) => `${v}GHz`,
  turbo_ghz: (v) => `${v}GHz turbo`,
  tela_pol: (v) => `${v}"`,
  refresh_hz: (v) => `${v}Hz`,
  resp_ms: (v) => `${v}ms`,
  size_mm: (v) => `${v}mm`,
  max_gpu_mm: (v) => `GPU até ${v}mm`,
  gen: (v) => `${v} geração`,
};
const SPEC_BOOL_LABEL: Record<string, string> = { rgb: "RGB", argb: "ARGB" };

function specBadges(p: Product): string[] {
  const out: string[] = [];
  for (const [k, v] of Object.entries(p.specs)) {
    if (SPEC_SKIP.includes(k)) continue;
    if (v === undefined || v === null || v === "" || v === false) continue;
    if (Array.isArray(v)) continue;
    if (typeof v === "boolean") {
      if (SPEC_BOOL_LABEL[k]) out.push(SPEC_BOOL_LABEL[k]);
    } else {
      out.push(SPEC_FMT[k] ? SPEC_FMT[k](v) : String(v));
    }
    if (out.length >= 4) break;
  }
  return out;
}

type Props = {
  openCat: Category | null;
  build: Build;
  qty: Partial<Record<Category, number>>;
  products: Product[];
  onClose: () => void;
  onSelectCat: (cat: Category) => void;
  onSelect: (cat: Category, p: Product) => void;
};

export function ComponentPickerModal({ openCat, build, qty, products, onClose, onSelectCat, onSelect }: Props) {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"relevancia" | "menor" | "maior">("relevancia");

  // reseta filtros/busca ao trocar de categoria
  useEffect(() => {
    setFilters({});
    setSearch("");
    setSort("relevancia");
  }, [openCat]);

  // trava o scroll da página enquanto o modal está aberto (para o Lenis + body)
  const isOpen = !!openCat;
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new Event("modal:open"));
    return () => {
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("modal:close"));
    };
  }, [isOpen]);

  const cat = openCat;
  const isPeriph = !!cat && PERIPHERAL_CATS.includes(cat);

  // candidatos compatíveis (inclui sem estoque → marcados "Indisponível")
  const compatibleAll = useMemo(() => {
    if (!cat) return [];
    const base = products.filter((p) => p.category === cat);
    return filterCompatible(base, build, cat);
  }, [products, build, cat]);

  // facetas disponíveis pra categoria ativa
  const facetDefs: Facet[] = cat ? [{ key: BRAND_KEY, label: "Fabricante" }, ...(FACETS[cat] ?? [])] : [];

  // valores + contagem por faceta (sobre o conjunto compatível)
  const facetOptions = useMemo(() => {
    const out: Record<string, { value: string; label: string; count: number }[]> = {};
    for (const f of facetDefs) {
      const counts = new Map<string, { label: string; count: number }>();
      for (const p of compatibleAll) {
        const raw = f.key === BRAND_KEY ? p.brand : p.specs[f.key];
        if (raw === undefined || raw === null || raw === "") continue;
        const value = String(raw);
        const label = f.fmt ? f.fmt(raw) : value;
        const cur = counts.get(value);
        if (cur) cur.count++;
        else counts.set(value, { label, count: 1 });
      }
      out[f.key] = [...counts.entries()]
        .map(([value, { label, count }]) => ({ value, label, count }))
        .sort((a, b) => b.count - a.count);
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compatibleAll, cat]);

  // aplica busca + filtros + ordenação
  const list = useMemo(() => {
    const q = search.trim().toLowerCase();
    let arr = compatibleAll.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q)) return false;
      for (const f of facetDefs) {
        const sel = filters[f.key];
        if (!sel || sel.length === 0) continue;
        const raw = f.key === BRAND_KEY ? p.brand : p.specs[f.key];
        if (raw === undefined || !sel.includes(String(raw))) return false;
      }
      return true;
    });
    // em estoque primeiro, depois por ordenação escolhida
    arr = [...arr].sort((a, b) => {
      const av = a.stock > 0 ? 0 : 1;
      const bv = b.stock > 0 ? 0 : 1;
      if (av !== bv) return av - bv;
      if (sort === "menor") return a.pix_price - b.pix_price;
      if (sort === "maior") return b.pix_price - a.pix_price;
      return 0;
    });
    return arr;
  }, [compatibleAll, search, filters, sort, facetDefs]);

  const total = useMemo(() => buildTotal(build, true, qty), [build, qty]);

  if (!cat) return null;

  function toggleFilter(fkey: string, value: string) {
    setFilters((prev) => {
      const cur = prev[fkey] ?? [];
      const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
      return { ...prev, [fkey]: next };
    });
  }

  // banner de requisito (cooler/gpu obrigatório pela CPU escolhida)
  const reqBanner =
    cat === "cooler" && build.cpu && isCoolerRequired(build)
      ? `Cooler é obrigatório para o ${build.cpu.name} (não acompanha cooler box)`
      : cat === "gpu" && isGpuRequired(build)
        ? "Placa de vídeo obrigatória — o processador escolhido não tem gráficos integrados"
        : null;

  const tabIdx = OBLIGATORY.indexOf(cat);
  const nextCat: Category | null =
    tabIdx >= 0 && tabIdx < OBLIGATORY.length - 1 ? OBLIGATORY[tabIdx + 1] : tabIdx === OBLIGATORY.length - 1 ? "monitor" : null;

  return (
    <div className="fixed inset-0 z-[200] flex items-stretch sm:items-center justify-center bg-black/80 p-0 sm:p-4">
      <div className="bg-starteq-black border border-starteq-line rounded-none sm:rounded-xl w-full sm:max-w-6xl h-full sm:h-[90vh] flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-starteq-line">
          <h2 className="font-display font-bold text-starteq-bone text-lg sm:text-xl">Selecionar Componente</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-starteq-card text-starteq-muted hover:text-starteq-bone" aria-label="Fechar">
            <Icon name="x" size={22} />
          </button>
        </div>

        {/* ABAS */}
        <div className="flex items-center gap-1 px-3 sm:px-4 py-2 border-b border-starteq-line overflow-x-auto flex-shrink-0">
          {OBLIGATORY.map((c, i) => {
            const active = cat === c;
            const done = !!build[c];
            return (
              <button
                key={c}
                onClick={() => onSelectCat(c)}
                className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-display font-semibold transition-all ${
                  active ? "bg-starteq-gold text-starteq-black" : "text-starteq-muted hover:text-starteq-bone hover:bg-starteq-card"
                }`}
              >
                {done && <Icon name="check" size={13} strokeWidth={3} className={active ? "text-starteq-black" : "text-starteq-green"} />}
                <span>{i + 1}. {categoryLabel(c)}</span>
              </button>
            );
          })}
          <button
            onClick={() => onSelectCat("monitor")}
            className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-display font-semibold transition-all ${
              isPeriph ? "bg-starteq-gold text-starteq-black" : "text-starteq-muted hover:text-starteq-bone hover:bg-starteq-card"
            }`}
          >
            9. Periféricos
          </button>
          {nextCat && (
            <button
              onClick={() => onSelectCat(nextCat)}
              className="ml-auto flex items-center gap-1.5 whitespace-nowrap px-4 py-1.5 rounded-lg bg-starteq-pix text-white font-display font-bold text-sm hover:opacity-90"
            >
              Próximo <Icon name="arrow-right" size={15} />
            </button>
          )}
        </div>

        {/* corpo: filtros + lista */}
        <div className="flex-1 flex overflow-hidden">
          {/* FILTROS */}
          <aside className="hidden md:block w-56 flex-shrink-0 border-r border-starteq-line overflow-y-auto overscroll-contain p-4 space-y-5">
            {facetDefs.map((f) => {
              const opts = facetOptions[f.key] ?? [];
              if (opts.length === 0) return null;
              return (
                <div key={f.key}>
                  <div className="font-display font-bold text-starteq-bone text-sm uppercase tracking-wider mb-2">{f.label}</div>
                  <div className="space-y-1.5">
                    {opts.map((o) => {
                      const checked = (filters[f.key] ?? []).includes(o.value);
                      return (
                        <label key={o.value} className="flex items-center gap-2 text-sm cursor-pointer group">
                          <span
                            className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                              checked ? "bg-starteq-gold border-starteq-gold" : "border-starteq-line group-hover:border-starteq-gold/50"
                            }`}
                          >
                            {checked && <Icon name="check" size={11} strokeWidth={3} className="text-starteq-black" />}
                          </span>
                          <input type="checkbox" checked={checked} onChange={() => toggleFilter(f.key, o.value)} className="sr-only" />
                          <span className="flex-1 text-starteq-text group-hover:text-starteq-bone truncate">{o.label}</span>
                          <span className="text-starteq-muted text-xs">({o.count})</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </aside>

          {/* LISTA */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* chips de sub-categoria pra periféricos */}
            {isPeriph && (
              <div className="flex flex-wrap gap-2 px-4 pt-3 flex-shrink-0">
                {PERIPHERAL_CATS.map((c) => {
                  const active = cat === c;
                  const chosen = !!build[c];
                  return (
                    <button
                      key={c}
                      onClick={() => onSelectCat(c)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-display font-semibold transition-all ${
                        active ? "border-starteq-gold bg-starteq-gold/10 text-starteq-gold" : "border-starteq-line bg-starteq-black text-starteq-muted hover:text-starteq-bone"
                      }`}
                    >
                      {categoryLabel(c)}
                      {chosen && <Icon name="check" size={13} strokeWidth={3} className="text-starteq-green" />}
                    </button>
                  );
                })}
              </div>
            )}

            {reqBanner && (
              <div className="mx-4 mt-3 bg-starteq-red/10 border border-starteq-red/40 rounded-lg p-3 text-sm flex items-start gap-2 flex-shrink-0">
                <Icon name="alert" size={16} className="text-starteq-red flex-shrink-0 mt-0.5" />
                <span className="text-starteq-bone">{reqBanner}</span>
              </div>
            )}

            {/* busca + ordenação */}
            <div className="flex items-center gap-2 px-4 py-3 flex-shrink-0">
              <div className="relative flex-1">
                <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-starteq-muted" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar produto..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-starteq-card border border-starteq-line focus:border-starteq-gold focus:outline-none text-starteq-bone placeholder:text-starteq-muted text-sm"
                />
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="rounded-lg bg-starteq-card border border-starteq-line text-starteq-bone text-sm px-3 py-2 focus:border-starteq-gold focus:outline-none"
              >
                <option value="relevancia">Relevância</option>
                <option value="menor">Menor preço</option>
                <option value="maior">Maior preço</option>
              </select>
            </div>

            {/* produtos */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-4 space-y-2">
              {list.length === 0 ? (
                <div className="text-sm text-starteq-muted py-12 text-center">Nenhum produto encontrado com esses filtros.</div>
              ) : (
                list.map((p) => {
                  const unavailable = p.stock <= 0;
                  const fonteBad = cat === "fonte" && build.cpu && !isFonteAdequate(p, build);
                  const disabled = unavailable || !!fonteBad;
                  const chosen = build[cat]?.sku === p.sku;
                  return (
                    <button
                      key={p.sku}
                      type="button"
                      onClick={() => !disabled && onSelect(cat, p)}
                      disabled={disabled}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all group ${
                        chosen
                          ? "border-starteq-green/50 bg-starteq-green/5"
                          : disabled
                            ? "border-starteq-line bg-starteq-coal opacity-55 cursor-not-allowed"
                            : "border-starteq-line hover:border-starteq-gold/40 bg-starteq-card"
                      }`}
                    >
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg border border-starteq-line bg-starteq-black flex-shrink-0 overflow-hidden p-1">
                        <ProductImage product={p} category={p.category} alt={p.name} fit="contain" className="w-full h-full rounded" />
                        {unavailable && (
                          <span className="absolute top-0 left-0 bg-starteq-warn text-starteq-black text-[9px] font-display font-bold uppercase px-1.5 py-0.5 rounded-br-lg">
                            Indisponível
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-starteq-muted uppercase tracking-wider">{p.brand}</span>
                          {chosen && (
                            <span className="text-[10px] font-display font-bold uppercase tracking-wider text-starteq-green bg-starteq-green/10 border border-starteq-green/30 px-2 py-0.5 rounded">
                              Selecionado
                            </span>
                          )}
                          {fonteBad && (
                            <span className="text-[10px] font-display font-bold uppercase tracking-wider text-starteq-warn bg-starteq-warn/10 border border-starteq-warn/30 px-2 py-0.5 rounded">
                              Potência insuficiente
                            </span>
                          )}
                          {p.specs.cooler_included === true && (
                            <span className="text-[10px] font-display font-bold uppercase tracking-wider text-starteq-green bg-starteq-green/10 border border-starteq-green/30 px-2 py-0.5 rounded">
                              Cooler incluído
                            </span>
                          )}
                          {p.specs.igpu === true && (
                            <span className="text-[10px] font-display font-bold uppercase tracking-wider text-starteq-gold bg-starteq-gold/10 border border-starteq-gold/30 px-2 py-0.5 rounded">
                              Vídeo integrado
                            </span>
                          )}
                        </div>
                        <div className={`font-display font-semibold leading-snug ${disabled ? "text-starteq-muted" : "text-starteq-bone group-hover:text-starteq-gold"} transition-colors`}>
                          {p.name}
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                          {specBadges(p).map((b) => (
                            <span
                              key={b}
                              className="inline-flex items-center text-[10px] font-display font-semibold uppercase tracking-wide text-starteq-text bg-starteq-line/50 border border-starteq-line rounded px-1.5 py-0.5"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className={`font-mono font-bold text-lg ${disabled ? "text-starteq-muted line-through" : "text-starteq-pix"}`}>
                          R$ {p.pix_price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-xs text-starteq-muted">{unavailable ? "sem estoque" : chosen ? "remover" : "no PIX"}</div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* RODAPÉ */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-t border-starteq-line flex-shrink-0">
          <div className="font-mono font-bold text-starteq-pix">
            Total: R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
          <button onClick={onClose} className="px-5 py-2 rounded-lg bg-starteq-card border border-starteq-line text-starteq-bone hover:border-starteq-gold/40 font-display font-bold text-sm uppercase tracking-wide">
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
}
