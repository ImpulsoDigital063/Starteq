"use client";

import { useState, useMemo } from "react";
import { PRODUCTS, type Product, type Category } from "@/lib/catalog";
import {
  filterCompatible,
  validateBuild,
  recommendedWattage,
  buildTotal,
  buildWhatsAppLink,
  categoryLabel,
  type Build,
} from "@/lib/compatibility";

const STEPS: { cat: Category; label: string; hint: string }[] = [
  { cat: "cpu", label: "Processador", hint: "O cérebro da máquina · define socket e plataforma" },
  { cat: "mobo", label: "Placa-mãe", hint: "Filtrada por socket do processador escolhido" },
  { cat: "ram", label: "Memória RAM", hint: "Filtrada por tipo (DDR4/DDR5) da placa-mãe" },
  { cat: "gpu", label: "Placa de vídeo", hint: "Define TDP e wattagem mínima da fonte" },
  { cat: "fonte", label: "Fonte", hint: "Filtrada por wattagem mínima recomendada" },
];

export function MontadorClient() {
  const [build, setBuild] = useState<Build>({});
  const [activeStep, setActiveStep] = useState(0);

  const issues = useMemo(() => validateBuild(build), [build]);
  const total = useMemo(() => buildTotal(build), [build]);
  const totalRetail = useMemo(() => buildTotal(build, false), [build]);
  const recWatts = useMemo(() => recommendedWattage(build), [build]);
  const allSelected = STEPS.every((s) => build[s.cat]);

  function select(cat: Category, product: Product) {
    setBuild((b) => ({ ...b, [cat]: product }));
    // auto-avança pro próximo passo se ainda não preencheu
    const idx = STEPS.findIndex((s) => s.cat === cat);
    const nextIdx = idx + 1;
    if (nextIdx < STEPS.length && !build[STEPS[nextIdx].cat]) {
      setTimeout(() => setActiveStep(nextIdx), 200);
    }
  }

  function clear(cat: Category) {
    setBuild((b) => {
      const next = { ...b };
      delete next[cat];
      // limpa os dependentes
      const idx = STEPS.findIndex((s) => s.cat === cat);
      for (let i = idx + 1; i < STEPS.length; i++) {
        delete next[STEPS[i].cat];
      }
      return next;
    });
    setActiveStep(STEPS.findIndex((s) => s.cat === cat));
  }

  function reset() {
    setBuild({});
    setActiveStep(0);
  }

  return (
    <div className="grid lg:grid-cols-[1fr_400px] gap-8">
      {/* COLUNA ESQUERDA · STEPS */}
      <div className="space-y-4">
        {STEPS.map((step, idx) => {
          const isActive = activeStep === idx;
          const selected = build[step.cat];
          const isPrevDone = idx === 0 || build[STEPS[idx - 1].cat];
          const candidates = filterCompatible(
            PRODUCTS.filter((p) => p.category === step.cat && p.stock > 0),
            build,
            step.cat
          );

          return (
            <div
              key={step.cat}
              className={`border rounded-xl overflow-hidden transition-all ${
                isActive
                  ? "border-starteq-gold bg-starteq-card"
                  : selected
                    ? "border-starteq-green/40 bg-starteq-card"
                    : "border-starteq-line bg-starteq-coal"
              }`}
            >
              <button
                type="button"
                onClick={() => isPrevDone && setActiveStep(idx)}
                disabled={!isPrevDone}
                className={`w-full flex items-center gap-4 p-5 text-left ${
                  isPrevDone ? "cursor-pointer hover:bg-starteq-card/50" : "cursor-not-allowed opacity-40"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0 ${
                    selected
                      ? "bg-starteq-green/20 text-starteq-green border border-starteq-green/40"
                      : isActive
                        ? "bg-starteq-gold text-starteq-black"
                        : "bg-starteq-line text-starteq-muted"
                  }`}
                >
                  {selected ? "✓" : idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display font-bold text-starteq-bone text-lg">{step.label}</h3>
                    {selected && (
                      <span className="text-xs font-mono text-starteq-green">selecionado</span>
                    )}
                  </div>
                  {selected ? (
                    <div className="text-sm text-starteq-muted mt-1 truncate">
                      {selected.name} · R$ {selected.pix_price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </div>
                  ) : (
                    <div className="text-sm text-starteq-muted mt-1">{step.hint}</div>
                  )}
                </div>
                {selected && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      clear(step.cat);
                    }}
                    className="text-xs text-starteq-muted hover:text-starteq-red px-2 cursor-pointer"
                  >
                    trocar
                  </span>
                )}
              </button>

              {isActive && (
                <div className="border-t border-starteq-line p-5 space-y-2">
                  {candidates.length === 0 ? (
                    <div className="text-sm text-starteq-muted py-8 text-center">
                      Nenhuma opção compatível com sua escolha anterior · reveja a etapa anterior
                    </div>
                  ) : (
                    candidates.map((p) => (
                      <button
                        key={p.sku}
                        type="button"
                        onClick={() => select(step.cat, p)}
                        className="w-full flex items-center justify-between gap-3 p-4 rounded-lg border border-starteq-line hover:border-starteq-gold/40 bg-starteq-black hover:bg-starteq-card text-left transition-all group"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-starteq-muted uppercase tracking-wider">{p.brand}</div>
                          <div className="font-display font-semibold text-starteq-bone group-hover:text-starteq-gold transition-colors leading-snug">
                            {p.name}
                          </div>
                          <div className="text-xs text-starteq-muted mt-1 font-mono">
                            {Object.entries(p.specs)
                              .slice(0, 3)
                              .map(([k, v]) => `${k}=${v}`)
                              .join(" · ")}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="font-mono font-bold text-lg text-starteq-gold">
                            R$ {p.pix_price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </div>
                          <div className="text-xs text-starteq-muted">PIX à vista</div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}

        {issues.length > 0 && (
          <div className="bg-starteq-red/10 border border-starteq-red/40 rounded-xl p-5">
            <div className="font-display font-bold text-starteq-red mb-2">⚠️ Atenção na sua build</div>
            {issues.map((i, idx) => (
              <div key={idx} className="text-sm text-starteq-bone mt-1">
                · {i.message}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* COLUNA DIREITA · RESUMO STICKY */}
      <aside className="lg:sticky lg:top-24 h-fit">
        <div className="bg-starteq-card border border-starteq-line rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-starteq-bone text-lg">Sua Build</h3>
            {Object.keys(build).length > 0 && (
              <button
                onClick={reset}
                className="text-xs text-starteq-muted hover:text-starteq-red"
              >
                limpar tudo
              </button>
            )}
          </div>

          {Object.keys(build).length === 0 ? (
            <div className="text-sm text-starteq-muted py-8 text-center">
              Comece escolhendo o processador →
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-6">
                {STEPS.map((s) => {
                  const p = build[s.cat];
                  if (!p) return (
                    <div key={s.cat} className="flex items-center justify-between text-sm text-starteq-muted">
                      <span>{s.label}</span>
                      <span>—</span>
                    </div>
                  );
                  return (
                    <div key={s.cat} className="flex items-start justify-between text-sm gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-starteq-muted uppercase tracking-wider">{s.label}</div>
                        <div className="text-starteq-bone truncate">{p.name}</div>
                      </div>
                      <div className="font-mono text-starteq-gold flex-shrink-0">
                        R$ {p.pix_price.toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {build.cpu && build.gpu && (
                <div className="text-xs text-starteq-muted bg-starteq-black rounded-lg p-3 mb-4 font-mono">
                  Consumo estimado: <span className="text-starteq-gold">~{recommendedWattage(build)}W</span> · fonte mínima recomendada
                </div>
              )}

              <div className="border-t border-starteq-line pt-4 mb-4">
                {total !== totalRetail && (
                  <div className="flex items-center justify-between text-sm text-starteq-muted line-through mb-1">
                    <span>Preço de tabela</span>
                    <span className="font-mono">R$ {totalRetail.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                  </div>
                )}
                <div className="flex items-end justify-between">
                  <span className="font-display font-bold text-starteq-bone">Total à vista PIX</span>
                  <span className="font-mono font-bold text-3xl text-starteq-gold">
                    R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="text-xs text-starteq-muted text-right mt-1">
                  ou 10x de R$ {(totalRetail / 10).toFixed(2)} sem juros
                </div>
              </div>

              <a
                href={buildWhatsAppLink(build)}
                target="_blank"
                rel="noreferrer"
                className={`w-full inline-flex items-center justify-center gap-2 font-display font-bold tracking-wide uppercase text-sm px-6 py-4 rounded-lg transition-all ${
                  allSelected && issues.filter((i) => i.type === "error").length === 0
                    ? "bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk border-glow-gold"
                    : "bg-starteq-line text-starteq-muted cursor-not-allowed pointer-events-none"
                }`}
              >
                {allSelected ? "Receber orçamento no WhatsApp" : `Faltam ${5 - Object.keys(build).length} peças`}
              </a>

              {allSelected && (
                <p className="text-xs text-starteq-muted text-center mt-3">
                  Junior te responde em até 30min em horário comercial · retire na loja em Palmas no mesmo dia
                </p>
              )}
            </>
          )}
        </div>

        <div className="mt-4 bg-starteq-coal border border-starteq-line rounded-xl p-5 text-xs text-starteq-muted leading-relaxed">
          <div className="font-display font-bold text-starteq-bone text-sm mb-2">Como funciona</div>
          A cada peça que você escolhe, o sistema filtra automaticamente as próximas opções pra você só ver o que é compatível.
          Sem dor de cabeça com socket errado ou RAM que não bate.
        </div>
      </aside>
    </div>
  );
}
