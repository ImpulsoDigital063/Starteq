"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { Icon } from "./Icon";
import type { Product } from "@/lib/catalog";

type Sort = "destaque" | "menor" | "maior" | "nome";

type Props = {
  items: Product[];
};

const PRICE_RANGES = [
  { label: "Até R$ 500", min: 0, max: 500 },
  { label: "R$ 500 – R$ 1.500", min: 500, max: 1500 },
  { label: "R$ 1.500 – R$ 3.000", min: 1500, max: 3000 },
  { label: "R$ 3.000 – R$ 5.000", min: 3000, max: 5000 },
  { label: "Acima de R$ 5.000", min: 5000, max: Infinity },
] as const;

export function CategoryGrid({ items }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const [priceIdx, setPriceIdx] = useState<number | null>(null);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sort, setSort] = useState<Sort>("destaque");

  const allBrands = useMemo(
    () => Array.from(new Set(items.map((i) => i.brand))).sort(),
    [items],
  );

  const filtered = useMemo(() => {
    let arr = [...items];
    if (brands.length > 0) arr = arr.filter((p) => brands.includes(p.brand));
    if (priceIdx !== null) {
      const r = PRICE_RANGES[priceIdx];
      arr = arr.filter((p) => p.pix_price >= r.min && p.pix_price < r.max);
    }
    if (onlyInStock) arr = arr.filter((p) => p.stock > 0);

    if (sort === "menor") arr.sort((a, b) => a.pix_price - b.pix_price);
    else if (sort === "maior") arr.sort((a, b) => b.pix_price - a.pix_price);
    else if (sort === "nome") arr.sort((a, b) => a.name.localeCompare(b.name));
    else
      arr.sort((a, b) => {
        // destaque: highlight primeiro, depois badge, depois estoque
        const sa = (a.highlight ? 10 : 0) + (a.badge ? 5 : 0) + (a.stock > 0 ? 1 : 0);
        const sb = (b.highlight ? 10 : 0) + (b.badge ? 5 : 0) + (b.stock > 0 ? 1 : 0);
        return sb - sa;
      });
    return arr;
  }, [items, brands, priceIdx, onlyInStock, sort]);

  const activeCount = brands.length + (priceIdx !== null ? 1 : 0) + (onlyInStock ? 1 : 0);

  const clearAll = () => {
    setBrands([]);
    setPriceIdx(null);
    setOnlyInStock(false);
  };

  const toggleBrand = (b: string) => {
    setBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));
  };

  const Sidebar = (
    <aside className="w-full lg:w-64 lg:flex-shrink-0">
      <div className="lg:sticky lg:top-32 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-space text-xs font-bold uppercase tracking-[0.2em] text-starteq-gold">
            Filtros {activeCount > 0 && <span className="text-starteq-bone">· {activeCount}</span>}
          </h3>
          {activeCount > 0 && (
            <button onClick={clearAll} className="text-xs text-starteq-muted hover:text-starteq-gold underline">
              limpar
            </button>
          )}
        </div>

        {/* Estoque */}
        <label className="flex items-center gap-2 cursor-pointer text-sm text-starteq-bone">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className="w-4 h-4 accent-starteq-gold"
          />
          Só em estoque
        </label>

        {/* Faixa de preço */}
        <div>
          <h4 className="font-space text-[10px] font-bold uppercase tracking-wider text-starteq-muted mb-2">
            Faixa de preço
          </h4>
          <div className="space-y-1.5">
            {PRICE_RANGES.map((r, i) => (
              <label key={r.label} className="flex items-center gap-2 cursor-pointer text-sm text-starteq-bone hover:text-starteq-gold">
                <input
                  type="radio"
                  name="price"
                  checked={priceIdx === i}
                  onChange={() => setPriceIdx(priceIdx === i ? null : i)}
                  onClick={() => priceIdx === i && setPriceIdx(null)}
                  className="w-4 h-4 accent-starteq-gold"
                />
                {r.label}
              </label>
            ))}
          </div>
        </div>

        {/* Marcas */}
        {allBrands.length > 1 && (
          <div>
            <h4 className="font-space text-[10px] font-bold uppercase tracking-wider text-starteq-muted mb-2">
              Marca
            </h4>
            <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
              {allBrands.map((b) => (
                <label key={b} className="flex items-center gap-2 cursor-pointer text-sm text-starteq-bone hover:text-starteq-gold">
                  <input
                    type="checkbox"
                    checked={brands.includes(b)}
                    onChange={() => toggleBrand(b)}
                    className="w-4 h-4 accent-starteq-gold"
                  />
                  {b}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );

  return (
    <>
      {/* Toolbar: contador + ordenação + botão filtros mobile */}
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div className="text-sm text-starteq-muted">
          <span className="text-starteq-bone font-bold">{filtered.length}</span> de {items.length} produto{items.length !== 1 ? "s" : ""}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-starteq-card border border-starteq-line text-starteq-bone text-xs font-space font-bold uppercase tracking-wider"
          >
            <Icon name="menu" size={14} /> Filtros {activeCount > 0 && `(${activeCount})`}
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="px-3 py-2 rounded-lg bg-starteq-card border border-starteq-line text-starteq-bone text-sm font-space font-medium"
          >
            <option value="destaque">Destaque</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
            <option value="nome">Nome A–Z</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6 lg:gap-8">
        <div className="hidden lg:block">{Sidebar}</div>

        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="bg-starteq-card border border-starteq-line rounded-xl p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-starteq-gold/10 flex items-center justify-center">
                <Icon name="ufo" size={28} className="text-starteq-gold" />
              </div>
              <h3 className="font-space font-bold text-base text-starteq-bone mb-1">Sem resultados com esses filtros</h3>
              <p className="text-starteq-muted text-sm">Tenta limpar algum critério ou abrir a faixa de preço.</p>
              <button onClick={clearAll} className="mt-4 text-xs text-starteq-gold hover:underline font-space font-bold uppercase tracking-wider">
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((p) => (
                <ProductCard key={p.sku} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Drawer mobile */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <aside className="absolute top-0 right-0 bottom-0 w-[88%] max-w-sm bg-starteq-black border-l border-starteq-line overflow-y-auto">
            <div className="sticky top-0 bg-starteq-black border-b border-starteq-line flex items-center justify-between px-4 py-3">
              <span className="font-space text-sm font-bold uppercase tracking-wider text-starteq-gold">Filtros</span>
              <button onClick={() => setDrawerOpen(false)} className="p-2 rounded-lg hover:bg-starteq-card text-starteq-bone" aria-label="Fechar">
                <Icon name="x" size={20} />
              </button>
            </div>
            <div className="p-4">{Sidebar}</div>
            <div className="p-4 border-t border-starteq-line">
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full bg-starteq-gold text-starteq-black font-space font-bold uppercase text-xs tracking-wider px-4 py-3 rounded-lg"
              >
                Aplicar ({filtered.length} produtos)
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
