"use client";

import { useState, useMemo } from "react";
import { Icon, type IconName } from "@/components/Icon";
import { ProductImage } from "@/components/ProductImage";
import { ComponentPickerModal } from "@/components/montador/ComponentPickerModal";
import { type Product, type Category } from "@/lib/catalog";
import { postMontagem } from "@/lib/comandapro";
import {
  filterCompatible,
  validateBuild,
  recommendedWattage,
  estimateWattage,
  isFonteAdequate,
  isCoolerRequired,
  isGpuRequired,
  buildTotal,
  buildStatus,
  buildWhatsAppLink,
  categoryLabel,
  type Build,
} from "@/lib/compatibility";

type Step = {
  cat: Category;
  label: string;
  hint: string;
  optional?: (b: Build) => boolean;
};

const STEPS: Step[] = [
  { cat: "cpu", label: "Processador", hint: "O cérebro · define plataforma" },
  { cat: "cooler", label: "Cooler", hint: "Pode ser opcional se a CPU já vem com cooler", optional: (b) => !isCoolerRequired(b) },
  { cat: "mobo", label: "Placa-mãe", hint: "Filtrada pelo socket da CPU" },
  { cat: "ram", label: "Memória RAM", hint: "Filtrada pelo tipo (DDR4/DDR5) da placa" },
  { cat: "gpu", label: "Placa de vídeo", hint: "Opcional se a CPU tiver gráficos integrados", optional: (b) => !isGpuRequired(b) },
  { cat: "ssd", label: "Armazenamento", hint: "SSD NVMe é o padrão hoje" },
  { cat: "gabinete", label: "Gabinete", hint: "Compatível com form-factor da placa" },
  { cat: "fonte", label: "Fonte", hint: "Wattagem calculada pela sua build" },
];

// Componentes onde faz sentido escolher quantidade (2 pentes de RAM dual-channel, +1 SSD)
const QTY_CATS: Category[] = ["ram", "ssd"];
const MAX_QTY = 4;

// Etapa opcional "Periféricos e Extras" · monitor primeiro (Eduardo pediu)
const PERIPHERAL_CATS: Category[] = ["monitor", "teclado", "mouse", "headset", "mousepad", "cadeira"];
const OBLIGATORY: Category[] = STEPS.map((s) => s.cat);

const CAT_ICON: Record<Category, IconName> = {
  cpu: "cpu", cooler: "snowflake", mobo: "plug", ram: "memory", gpu: "gamepad", ssd: "disc",
  gabinete: "package", fonte: "zap", monitor: "monitor", teclado: "keyboard", mouse: "mouse",
  headset: "headphones", mousepad: "ruler", cadeira: "armchair", computadores: "monitor",
};

export function MontadorClient({ products }: { products: Product[] }) {
  const [build, setBuild] = useState<Build>({});
  const [qty, setQty] = useState<Partial<Record<Category, number>>>({});
  const [modalCat, setModalCat] = useState<Category | null>(null);
  const [sending, setSending] = useState(false);
  const [sentOs, setSentOs] = useState<string | null>(null);
  const [nome, setNome] = useState("");

  async function enviarPraLoja() {
    if (sending) return;
    setSending(true);
    try {
      const skus = Object.entries(build)
        .filter((e): e is [string, Product] => !!e[1])
        .flatMap(([cat, p]) => Array(qty[cat as Category] ?? 1).fill(p.sku));
      const d = await postMontagem(skus, nome.trim() || undefined);
      if (d.ok) setSentOs(d.code ?? d.osId ?? "enviado");
      else alert(d.error || "Não consegui enviar. Tente de novo.");
    } finally { setSending(false); }
  }

  // reprocessa os obrigatórios em ordem, removendo o que ficou incompatível com upstream
  function sanitize(b: Build): Build {
    const clean: Build = {};
    for (const s of STEPS) {
      const cur = b[s.cat];
      if (cur && filterCompatible([cur], clean, s.cat).length > 0) clean[s.cat] = cur;
    }
    for (const c of PERIPHERAL_CATS) if (b[c]) clean[c] = b[c];
    return clean;
  }

  // próxima categoria obrigatória a mostrar (pula opcionais não necessárias); null = acabou
  function nextCatAfter(cat: Category, b: Build): Category | null {
    const idx = OBLIGATORY.indexOf(cat);
    if (idx < 0) return null; // periférico não avança
    for (let i = idx + 1; i < OBLIGATORY.length; i++) {
      const c = OBLIGATORY[i];
      if (c === "cooler" && !isCoolerRequired(b)) continue;
      if (c === "gpu" && !isGpuRequired(b)) continue;
      return c;
    }
    return "monitor"; // terminou os obrigatórios → periféricos
  }

  function handleSelect(cat: Category, p: Product) {
    const toggleOff = build[cat]?.sku === p.sku;
    setBuild((b) => {
      if (b[cat]?.sku === p.sku) {
        const next = { ...b };
        delete next[cat];
        return OBLIGATORY.includes(cat) ? sanitize(next) : next;
      }
      const merged = { ...b, [cat]: p };
      return OBLIGATORY.includes(cat) ? sanitize(merged) : merged;
    });
    // ao escolher (não ao remover) um obrigatório, avança pra próxima etapa
    if (!toggleOff && OBLIGATORY.includes(cat)) {
      const predicted = sanitize({ ...build, [cat]: p });
      setModalCat(nextCatAfter(cat, predicted));
    }
  }

  function removeItem(cat: Category) {
    setBuild((b) => {
      const next = { ...b };
      delete next[cat];
      return OBLIGATORY.includes(cat) ? sanitize(next) : next;
    });
    setQty((q) => {
      const next = { ...q };
      delete next[cat];
      return next;
    });
  }

  function setQtyFor(cat: Category, delta: number) {
    setQty((q) => {
      const next = Math.min(MAX_QTY, Math.max(1, (q[cat] ?? 1) + delta));
      return { ...q, [cat]: next };
    });
  }

  function reset() {
    setBuild({});
    setQty({});
    setModalCat(null);
  }

  const issues = useMemo(() => validateBuild(build), [build]);
  const errors = useMemo(() => issues.filter((i) => i.type === "error"), [issues]);
  const total = useMemo(() => buildTotal(build, true, qty), [build, qty]);
  const totalRetail = useMemo(() => buildTotal(build, false, qty), [build, qty]);
  const status = useMemo(() => buildStatus(build), [build]);
  const consumption = useMemo(() => estimateWattage(build), [build]);
  const minWatts = useMemo(() => recommendedWattage(build), [build]);

  const allRequiredSelected = status.filled === status.required && errors.length === 0;
  const chosenPeriphs = PERIPHERAL_CATS.filter((c) => build[c]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* COLUNA ESQUERDA · BLOCOS DE COMPONENTE */}
        <div className="space-y-3">
          {STEPS.map((step, idx) => {
            const selected = build[step.cat];
            const isOptional = step.optional?.(build);
            const q = qty[step.cat] ?? 1;
            return (
              <div
                key={step.cat}
                className={`border rounded-xl overflow-hidden transition-all ${
                  selected ? "border-starteq-green/40 bg-starteq-card" : "border-starteq-line bg-starteq-coal"
                }`}
              >
                <div className="flex items-center gap-4 p-4">
                  <div
                    className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      selected ? "bg-starteq-green/15 text-starteq-green border border-starteq-green/40" : "bg-starteq-line/60 text-starteq-gold"
                    }`}
                  >
                    <Icon name={selected ? "check" : CAT_ICON[step.cat]} size={20} strokeWidth={selected ? 3 : 2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-mono text-starteq-muted">{idx + 1}</span>
                      <h3 className="font-display font-bold text-starteq-bone text-lg">{step.label}</h3>
                      {isOptional && !selected && (
                        <span className="text-[10px] font-display font-bold uppercase tracking-wider text-starteq-muted bg-starteq-line/50 px-2 py-0.5 rounded">
                          opcional
                        </span>
                      )}
                    </div>
                    {!selected && <div className="text-sm text-starteq-muted mt-0.5">{step.hint}</div>}
                  </div>
                  {selected && QTY_CATS.includes(step.cat) && (
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span onClick={() => setQtyFor(step.cat, -1)} className="w-7 h-7 rounded flex items-center justify-center bg-starteq-line text-starteq-bone hover:bg-starteq-gold hover:text-starteq-black cursor-pointer select-none font-mono text-lg leading-none">−</span>
                      <span className="font-mono text-sm text-starteq-bone w-4 text-center select-none">{q}</span>
                      <span onClick={() => setQtyFor(step.cat, +1)} className="w-7 h-7 rounded flex items-center justify-center bg-starteq-line text-starteq-bone hover:bg-starteq-gold hover:text-starteq-black cursor-pointer select-none font-mono text-lg leading-none">+</span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setModalCat(step.cat)}
                    className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-display font-bold text-xs uppercase tracking-wider transition-all ${
                      selected ? "bg-starteq-line/60 text-starteq-bone hover:bg-starteq-line" : "bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk"
                    }`}
                  >
                    {selected ? "Trocar" : <><Icon name="plus" size={14} strokeWidth={3} /> Escolher</>}
                  </button>
                  {selected && (
                    <button type="button" onClick={() => removeItem(step.cat)} className="flex-shrink-0 text-starteq-muted hover:text-starteq-red p-1" aria-label="Remover">
                      <Icon name="x" size={16} />
                    </button>
                  )}
                </div>

                {selected ? (
                  <div className="border-t border-starteq-line px-4 py-3 flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg border border-starteq-line bg-starteq-black flex-shrink-0 overflow-hidden p-1">
                      <ProductImage product={selected} category={selected.category} alt={selected.name} fit="contain" className="w-full h-full rounded" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-starteq-muted uppercase tracking-wider">{selected.brand}</div>
                      <div className="font-display font-semibold text-starteq-bone text-sm leading-snug truncate">{selected.name}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-mono font-bold text-starteq-pix">
                        {q > 1 && <span className="text-starteq-gold text-xs">{q}× </span>}
                        R$ {(selected.pix_price * q).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-[11px] text-starteq-muted">no PIX</div>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setModalCat(step.cat)}
                    className="w-full border-t border-dashed border-starteq-line/70 py-6 flex flex-col items-center justify-center gap-1.5 text-starteq-muted hover:text-starteq-gold hover:bg-starteq-card/40 transition-all"
                  >
                    <Icon name="plus" size={22} />
                    <span className="text-sm font-display font-semibold">
                      {isOptional ? "Adicionar (opcional)" : "Clique para adicionar este componente"}
                    </span>
                  </button>
                )}
              </div>
            );
          })}

          {/* PERIFÉRICOS E EXTRAS · opcional */}
          <div className={`border rounded-xl overflow-hidden ${chosenPeriphs.length > 0 ? "border-starteq-green/40 bg-starteq-card" : "border-starteq-line bg-starteq-coal"}`}>
            <div className="flex items-center gap-4 p-4">
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${chosenPeriphs.length > 0 ? "bg-starteq-green/15 text-starteq-green border border-starteq-green/40" : "bg-starteq-line/60 text-starteq-gold"}`}>
                <Icon name={chosenPeriphs.length > 0 ? "check" : "monitor"} size={20} strokeWidth={chosenPeriphs.length > 0 ? 3 : 2} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display font-bold text-starteq-bone text-lg">Periféricos e Extras</h3>
                  <span className="text-[10px] font-display font-bold uppercase tracking-wider text-starteq-muted bg-starteq-line/50 px-2 py-0.5 rounded">opcional</span>
                </div>
                <div className="text-sm text-starteq-muted mt-0.5">Monitor, teclado, mouse, headset, cadeira</div>
              </div>
              <button
                type="button"
                onClick={() => setModalCat("monitor")}
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-display font-bold text-xs uppercase tracking-wider"
              >
                <Icon name="plus" size={14} strokeWidth={3} /> Adicionar
              </button>
            </div>
            {chosenPeriphs.length > 0 && (
              <div className="border-t border-starteq-line p-3 space-y-2">
                {chosenPeriphs.map((c) => {
                  const p = build[c]!;
                  return (
                    <div key={c} className="flex items-center gap-3 bg-starteq-black rounded-lg border border-starteq-line p-2">
                      <div className="w-12 h-12 rounded border border-starteq-line bg-starteq-black flex-shrink-0 overflow-hidden p-1">
                        <ProductImage product={p} category={p.category} alt={p.name} fit="contain" className="w-full h-full rounded" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] text-starteq-gold uppercase tracking-wider">{categoryLabel(c)}</div>
                        <div className="font-display font-semibold text-starteq-bone text-sm truncate">{p.name}</div>
                      </div>
                      <div className="font-mono font-bold text-starteq-pix text-sm flex-shrink-0">
                        R$ {p.pix_price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </div>
                      <button type="button" onClick={() => removeItem(c)} className="text-starteq-muted hover:text-starteq-red p-1 flex-shrink-0" aria-label="Remover">
                        <Icon name="x" size={15} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ZERAR BUILD */}
          {Object.keys(build).length > 0 && (
            <button
              type="button"
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 mt-1 py-3.5 rounded-xl border border-starteq-red/40 text-starteq-red hover:bg-starteq-red hover:text-white font-display font-bold uppercase text-sm tracking-wide transition-all"
            >
              <Icon name="x" size={16} strokeWidth={3} /> Zerar build e recomeçar
            </button>
          )}
        </div>

        {/* COLUNA DIREITA · RESUMO STICKY */}
        <aside className="lg:sticky lg:top-24 h-fit space-y-4">
          {/* CARD PREÇO */}
          <div className="bg-starteq-card border border-starteq-line rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold text-starteq-bone text-base">Sua Build</h3>
              {Object.keys(build).length > 0 && (
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 text-xs text-starteq-red hover:bg-starteq-red hover:text-white border border-starteq-red/40 rounded-md px-2.5 py-1 font-display font-bold uppercase tracking-wider transition-all"
                >
                  <Icon name="x" size={13} strokeWidth={3} /> Zerar
                </button>
              )}
            </div>

            {/* PREÇO GIGANTE PIX */}
            <div className="bg-starteq-pix/5 border border-starteq-pix/30 rounded-lg p-4 mb-3">
              <div className="font-mono font-bold text-3xl text-starteq-pix leading-none">
                R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-starteq-pix mt-1.5 uppercase tracking-wider font-display font-semibold">à vista no PIX</div>
            </div>

            <div className="text-sm text-starteq-text">
              ou <span className="font-mono text-starteq-bone">R$ {totalRetail.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="text-xs text-starteq-muted mt-0.5">10x de R$ {(totalRetail / 10).toFixed(2)} sem juros no cartão</div>
          </div>

          {/* STATUS DO BUILD */}
          <div className="bg-starteq-card border border-starteq-line rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-display font-semibold text-starteq-bone text-sm uppercase tracking-wider">Status do build</h4>
              <span className="font-mono text-sm text-starteq-gold font-bold">{status.filled}/{status.required}</span>
            </div>
            <div className="w-full bg-starteq-black rounded-full h-2 overflow-hidden">
              <div className={`h-full transition-all duration-500 ${status.percent === 100 ? "bg-starteq-pix" : "bg-starteq-gold"}`} style={{ width: `${status.percent}%` }} />
            </div>
            <div className="text-xs text-starteq-muted mt-2">
              {status.percent === 100
                ? "Pronto pra finalizar"
                : `${status.required - status.filled} componente${status.required - status.filled > 1 ? "s" : ""} obrigatório${status.required - status.filled > 1 ? "s" : ""} pendente${status.required - status.filled > 1 ? "s" : ""}`}
            </div>
          </div>

          {/* ALERTAS */}
          {errors.length > 0 && (
            <div className="space-y-2">
              {errors.map((i, idx) => (
                <div key={idx} className="bg-starteq-red/10 border border-starteq-red/40 rounded-lg p-3 text-sm flex items-start gap-2">
                  <Icon name="alert" size={16} className="text-starteq-red flex-shrink-0 mt-0.5" />
                  <span className="text-starteq-bone leading-snug">{i.message}</span>
                </div>
              ))}
            </div>
          )}

          {/* CONSUMO */}
          {(build.cpu || build.gpu) && (
            <div className="bg-starteq-card border border-starteq-line rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="zap" size={16} className="text-starteq-gold" />
                <h4 className="font-display font-semibold text-starteq-bone text-sm uppercase tracking-wider">Consumo estimado</h4>
              </div>
              <div className="font-mono text-sm text-starteq-text">~{consumption}W reais</div>
              <div className="font-mono text-xs text-starteq-muted mt-1">
                Fonte recomendada: <span className="text-starteq-gold">{minWatts}W ou mais</span>
              </div>
              {build.fonte && (
                <div className={`mt-2 text-xs font-mono ${isFonteAdequate(build.fonte, build) ? "text-starteq-pix" : "text-starteq-warn"}`}>
                  Sua fonte: {build.fonte.specs.watts}W · {isFonteAdequate(build.fonte, build) ? "adequada" : "insuficiente"}
                </div>
              )}
            </div>
          )}

          {/* CTA */}
          {sentOs ? (
            <div className="rounded-lg border border-starteq-pix/40 bg-starteq-pix/10 p-4 text-center">
              <div className="font-display font-bold text-starteq-pix">✓ Enviado pra loja!</div>
              <p className="text-xs text-starteq-muted mt-1">Sua montagem virou uma ordem de serviço. A Starteq vai montar e te chamar.</p>
              {sentOs && sentOs !== "enviado" && (
                <p className="text-xs text-starteq-muted mt-2">Código da OS: <span className="font-mono font-bold text-starteq-gold">{sentOs}</span></p>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome (pra loja saber quem é)"
                className="w-full rounded-lg border border-starteq-line bg-starteq-coal px-3 py-3 text-sm text-starteq-bone outline-none focus:border-starteq-gold"
              />
              <button
                type="button"
                onClick={enviarPraLoja}
                disabled={!allRequiredSelected || sending}
                className={`w-full inline-flex items-center justify-center gap-2 font-display font-bold tracking-wide uppercase text-sm px-6 py-4 rounded-lg transition-all ${
                  allRequiredSelected && !sending ? "bg-starteq-pix text-white hover:opacity-90" : "bg-starteq-line text-starteq-muted cursor-not-allowed"
                }`}
              >
                {sending ? "Enviando…" : allRequiredSelected ? "Enviar montagem pra loja" : `Faltam ${status.required - status.filled} componente${status.required - status.filled > 1 ? "s" : ""}`}
              </button>
              <a
                href={buildWhatsAppLink(build, qty)}
                target="_blank"
                rel="noreferrer"
                className={`block text-center text-xs font-display font-semibold uppercase tracking-wider ${allRequiredSelected ? "text-starteq-gold hover:text-starteq-bone" : "text-starteq-muted pointer-events-none"}`}
              >
                ou finalizar no WhatsApp
              </a>
            </div>
          )}

          <div className="text-xs text-starteq-muted leading-relaxed text-center">
            Junior responde em até 30min em horário comercial · retirada na loja em Palmas ou entrega combinada no WhatsApp.
          </div>
        </aside>
      </div>

      {/* MODAL DE SELEÇÃO estilo Pichau */}
      <ComponentPickerModal
        openCat={modalCat}
        build={build}
        qty={qty}
        products={products}
        onClose={() => setModalCat(null)}
        onSelectCat={(c) => setModalCat(c)}
        onSelect={handleSelect}
      />
    </>
  );
}
