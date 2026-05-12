"use client";

import { useState, useMemo } from "react";
import { Icon } from "@/components/Icon";
import { PRODUCTS, type Product, type Category } from "@/lib/catalog";
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

export function MontadorClient() {
  const [build, setBuild] = useState<Build>({});
  const [activeStep, setActiveStep] = useState(0);
  const [showIgpuModal, setShowIgpuModal] = useState(false);

  const issues = useMemo(() => validateBuild(build), [build]);
  const errors = useMemo(() => issues.filter((i) => i.type === "error"), [issues]);
  const total = useMemo(() => buildTotal(build), [build]);
  const totalRetail = useMemo(() => buildTotal(build, false), [build]);
  const status = useMemo(() => buildStatus(build), [build]);
  const consumption = useMemo(() => estimateWattage(build), [build]);
  const minWatts = useMemo(() => recommendedWattage(build), [build]);

  const allRequiredSelected = status.filled === status.required && errors.length === 0;

  function select(cat: Category, product: Product) {
    setBuild((b) => ({ ...b, [cat]: product }));

    // Se acabou de escolher CPU com iGPU · mostra modal antes de pular GPU
    if (cat === "cpu" && product.specs.igpu) {
      // não mostra modal agora · só quando chegar no step de GPU
    }

    // Auto-avança próximo step pendente
    const idx = STEPS.findIndex((s) => s.cat === cat);
    const nextIdx = idx + 1;
    if (nextIdx < STEPS.length) {
      const nextStep = STEPS[nextIdx];
      // Pula step opcional automaticamente se condição já bate
      const newBuild = { ...build, [cat]: product };
      if (nextStep.optional?.(newBuild) && !newBuild[nextStep.cat]) {
        // step opcional · mostra modal pra GPU/cooler
        if (nextStep.cat === "gpu") setShowIgpuModal(true);
        else setTimeout(() => setActiveStep(nextIdx + 1), 200);
      } else {
        setTimeout(() => setActiveStep(nextIdx), 200);
      }
    }
  }

  function clear(cat: Category) {
    setBuild((b) => {
      const next = { ...b };
      delete next[cat];
      // limpa dependentes
      const idx = STEPS.findIndex((s) => s.cat === cat);
      for (let i = idx + 1; i < STEPS.length; i++) {
        delete next[STEPS[i].cat];
      }
      return next;
    });
    setActiveStep(STEPS.findIndex((s) => s.cat === cat));
  }

  function skipGpu() {
    setShowIgpuModal(false);
    const gpuIdx = STEPS.findIndex((s) => s.cat === "gpu");
    setActiveStep(gpuIdx + 1);
  }

  function chooseGpu() {
    setShowIgpuModal(false);
    const gpuIdx = STEPS.findIndex((s) => s.cat === "gpu");
    setActiveStep(gpuIdx);
  }

  function reset() {
    setBuild({});
    setActiveStep(0);
  }

  return (
    <>
      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        {/* COLUNA ESQUERDA · STEPS */}
        <div className="space-y-3">
          {STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            const selected = build[step.cat];
            const isPrevDone = idx === 0 || build[STEPS[idx - 1].cat] || STEPS[idx - 1].optional?.(build);
            const isOptional = step.optional?.(build);

            const baseCandidates = PRODUCTS.filter(
              (p) => p.category === step.cat && p.stock > 0
            );
            const candidates = filterCompatible(baseCandidates, build, step.cat);

            return (
              <div
                key={step.cat}
                className={`border rounded-xl overflow-hidden transition-all ${
                  isActive
                    ? "border-starteq-gold bg-starteq-card"
                    : selected
                      ? "border-starteq-green/40 bg-starteq-card"
                      : isOptional
                        ? "border-starteq-line bg-starteq-coal opacity-70"
                        : "border-starteq-line bg-starteq-coal"
                }`}
              >
                <button
                  type="button"
                  onClick={() => isPrevDone && setActiveStep(idx)}
                  disabled={!isPrevDone}
                  className={`w-full flex items-center gap-4 p-4 text-left ${
                    isPrevDone ? "cursor-pointer hover:bg-starteq-card/50" : "cursor-not-allowed opacity-40"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0 ${
                      selected
                        ? "bg-starteq-green/20 text-starteq-green border border-starteq-green/40"
                        : isOptional && !selected
                          ? "bg-starteq-line text-starteq-muted border border-starteq-line"
                          : isActive
                            ? "bg-starteq-gold text-starteq-black"
                            : "bg-starteq-line text-starteq-muted"
                    }`}
                  >
                    {selected ? <Icon name="check" size={16} strokeWidth={3} /> : idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-bold text-starteq-bone text-lg">{step.label}</h3>
                      {isOptional && !selected && (
                        <span className="text-[10px] font-display font-bold uppercase tracking-wider text-starteq-muted bg-starteq-line/50 px-2 py-0.5 rounded">
                          opcional
                        </span>
                      )}
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
                  <div className="border-t border-starteq-line p-4 space-y-2">
                    {candidates.length === 0 ? (
                      <div className="text-sm text-starteq-muted py-8 text-center">
                        Nenhuma opção compatível · reveja a etapa anterior
                      </div>
                    ) : (
                      candidates.map((p) => {
                        const isFonte = step.cat === "fonte";
                        const fonteInadequate = isFonte && build.cpu && !isFonteAdequate(p, build);
                        return (
                          <button
                            key={p.sku}
                            type="button"
                            onClick={() => !fonteInadequate && select(step.cat, p)}
                            disabled={!!fonteInadequate}
                            className={`w-full flex items-center justify-between gap-3 p-3 rounded-lg border text-left transition-all group ${
                              fonteInadequate
                                ? "border-starteq-line bg-starteq-coal opacity-50 cursor-not-allowed"
                                : "border-starteq-line hover:border-starteq-gold/40 bg-starteq-black hover:bg-starteq-card"
                            }`}
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs text-starteq-muted uppercase tracking-wider">{p.brand}</span>
                                {fonteInadequate && (
                                  <span className="text-[10px] font-display font-bold uppercase tracking-wider text-starteq-warn bg-starteq-warn/10 border border-starteq-warn/30 px-2 py-0.5 rounded">
                                    Potência Insuficiente
                                  </span>
                                )}
                                {p.specs.cooler_included && (
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
                              <div className="font-display font-semibold text-starteq-bone group-hover:text-starteq-gold transition-colors leading-snug">
                                {p.name}
                              </div>
                              <div className="text-xs text-starteq-muted mt-1 font-mono">
                                {Object.entries(p.specs)
                                  .filter(([k]) => !["cooler_included", "igpu", "supports_socket", "supports_mobo"].includes(k))
                                  .slice(0, 3)
                                  .map(([k, v]) => `${k}=${Array.isArray(v) ? v.join("/") : v}`)
                                  .join(" · ")}
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="font-mono font-bold text-lg text-starteq-pix">
                                R$ {p.pix_price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                              </div>
                              <div className="text-xs text-starteq-muted">PIX</div>
                            </div>
                          </button>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })}
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
                  className="text-xs text-starteq-red hover:text-starteq-bone font-display font-semibold uppercase tracking-wider"
                >
                  ↻ Reiniciar
                </button>
              )}
            </div>

            {/* PREÇO GIGANTE PIX */}
            <div className="bg-starteq-pix/5 border border-starteq-pix/30 rounded-lg p-4 mb-3">
              <div className="font-mono font-bold text-3xl text-starteq-pix leading-none">
                R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-starteq-pix mt-1.5 uppercase tracking-wider font-display font-semibold">
                à vista no PIX
              </div>
            </div>

            <div className="text-sm text-starteq-text">
              ou <span className="font-mono text-starteq-bone">R$ {totalRetail.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="text-xs text-starteq-muted mt-0.5">
              10x de R$ {(totalRetail / 10).toFixed(2)} sem juros no cartão
            </div>
          </div>

          {/* STATUS DO BUILD */}
          <div className="bg-starteq-card border border-starteq-line rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-display font-semibold text-starteq-bone text-sm uppercase tracking-wider">
                Status do build
              </h4>
              <span className="font-mono text-sm text-starteq-gold font-bold">
                {status.filled}/{status.required}
              </span>
            </div>
            <div className="w-full bg-starteq-black rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  status.percent === 100 ? "bg-starteq-pix" : "bg-starteq-gold"
                }`}
                style={{ width: `${status.percent}%` }}
              />
            </div>
            <div className="text-xs text-starteq-muted mt-2">
              {status.percent === 100
                ? "Pronto pra finalizar"
                : `${status.required - status.filled} componente${status.required - status.filled > 1 ? "s" : ""} obrigatório${status.required - status.filled > 1 ? "s" : ""} pendente${status.required - status.filled > 1 ? "s" : ""}`}
            </div>
          </div>

          {/* ALERTAS · cards individuais vermelhos */}
          {errors.length > 0 && (
            <div className="space-y-2">
              {errors.map((i, idx) => (
                <div
                  key={idx}
                  className="bg-starteq-red/10 border border-starteq-red/40 rounded-lg p-3 text-sm flex items-start gap-2"
                >
                  <Icon name="alert" size={16} className="text-starteq-red flex-shrink-0 mt-0.5" />
                  <span className="text-starteq-bone leading-snug">{i.message}</span>
                </div>
              ))}
            </div>
          )}

          {/* CONSUMO DE ENERGIA */}
          {(build.cpu || build.gpu) && (
            <div className="bg-starteq-card border border-starteq-line rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="zap" size={16} className="text-starteq-gold" />
                <h4 className="font-display font-semibold text-starteq-bone text-sm uppercase tracking-wider">
                  Consumo estimado
                </h4>
              </div>
              <div className="font-mono text-sm text-starteq-text">
                ~{consumption}W reais
              </div>
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

          {/* CTA WhatsApp */}
          <a
            href={buildWhatsAppLink(build)}
            target="_blank"
            rel="noreferrer"
            className={`w-full inline-flex items-center justify-center gap-2 font-display font-bold tracking-wide uppercase text-sm px-6 py-4 rounded-lg transition-all ${
              allRequiredSelected
                ? "bg-starteq-pix text-white hover:opacity-90"
                : "bg-starteq-line text-starteq-muted cursor-not-allowed pointer-events-none"
            }`}
          >
            {allRequiredSelected
              ? "Finalizar no WhatsApp"
              : `Faltam ${status.required - status.filled} componente${status.required - status.filled > 1 ? "s" : ""}`}
          </a>

          <div className="text-xs text-starteq-muted leading-relaxed text-center">
            Junior responde em até 30min em horário comercial · retire na loja em Palmas no mesmo dia ou recebe motoboy.
          </div>
        </aside>
      </div>

      {/* MODAL iGPU · CPU com video integrado */}
      {showIgpuModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-starteq-card border border-starteq-gold/40 rounded-xl max-w-md w-full p-6 border-glow-gold">
            <div className="inline-flex items-center gap-2 text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-3">
              <Icon name="cpu" size={14} /> Processador com vídeo integrado
            </div>
            <h3 className="font-display font-bold text-starteq-bone text-2xl mb-3">
              Você precisa de placa de vídeo dedicada?
            </h3>
            <p className="text-sm text-starteq-muted leading-relaxed mb-6">
              O <strong className="text-starteq-bone">{build.cpu?.name}</strong> já tem gráficos integrados, então roda jogos leves e tarefas do dia a dia sem GPU.
              Pra jogos pesados ou renderização, recomendo escolher uma placa dedicada.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={skipGpu}
                className="flex-1 px-4 py-3 rounded-lg border border-starteq-line bg-starteq-coal text-starteq-bone hover:bg-starteq-card font-display font-semibold text-sm uppercase tracking-wide transition-all"
              >
                Pular GPU
              </button>
              <button
                onClick={chooseGpu}
                className="flex-1 px-4 py-3 rounded-lg bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-display font-bold text-sm uppercase tracking-wide transition-all"
              >
                Escolher GPU
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
