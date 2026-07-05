"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

type Props = {
  count: number;
  totalValue: number;
};

type Step = "idle" | "confirmar" | "emitindo" | "sucesso";

export function NFeBatchActions({ count, totalValue }: Props) {
  const [step, setStep] = useState<Step>("idle");
  const [issued, setIssued] = useState<{ ok: number; fail: number }>({ ok: 0, fail: 0 });

  function start() {
    setStep("emitindo");
    setTimeout(() => {
      // Mock: ~90% sucesso, resto falha (cliente sem CPF, etc.)
      const fail = Math.max(0, Math.floor(count * 0.1));
      setIssued({ ok: count - fail, fail });
      setStep("sucesso");
    }, 1800);
  }

  function close() {
    setStep("idle");
    setIssued({ ok: 0, fail: 0 });
  }

  if (count === 0) return null;

  return (
    <>
      <button
        onClick={() => setStep("confirmar")}
        className="inline-flex items-center gap-2 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-space font-black uppercase text-xs px-4 py-2.5 rounded-lg"
      >
        <Icon name="file" size={14} />
        Emitir todas ({count})
      </button>

      {step !== "idle" && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4" onClick={() => step !== "emitindo" && close()}>
          <div className="bg-starteq-card border border-starteq-line rounded-xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-starteq-line">
              <h3 className="font-space font-bold text-starteq-bone inline-flex items-center gap-2">
                <Icon name="file" size={18} className="text-starteq-gold" />
                {step === "confirmar" && "Emitir NFes em lote"}
                {step === "emitindo" && "Emitindo lote…"}
                {step === "sucesso" && "Lote concluído"}
              </h3>
              {step !== "emitindo" && (
                <button onClick={close} className="text-starteq-muted hover:text-starteq-bone">
                  <Icon name="x" size={18} />
                </button>
              )}
            </div>

            <div className="p-5">
              {step === "confirmar" && (
                <>
                  <p className="text-sm text-starteq-text mb-4 leading-relaxed">
                    Vai emitir <strong className="text-starteq-bone">{count} NFe(s)</strong> de uma vez · soma de <strong className="text-starteq-gold font-mono">R$ {totalValue.toFixed(2)}</strong>. Cada uma é validada individualmente · falhas ficam pendentes pra reemissão.
                  </p>
                  <div className="bg-starteq-coal border border-starteq-line rounded-lg p-3 text-xs text-starteq-muted">
                    <Icon name="info" size={12} className="inline mr-1 text-starteq-gold" />
                    Tempo estimado · ~{count * 2} seg
                  </div>
                  <div className="flex gap-2 justify-end mt-5">
                    <button onClick={close} className="text-xs font-space font-bold uppercase tracking-wider px-4 py-2 rounded text-starteq-muted hover:text-starteq-bone">
                      Cancelar
                    </button>
                    <button
                      onClick={start}
                      className="text-xs font-space font-bold uppercase tracking-wider px-4 py-2 rounded bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk"
                    >
                      Emitir todas ({count})
                    </button>
                  </div>
                </>
              )}

              {step === "emitindo" && (
                <div className="py-8 text-center">
                  <div className="inline-block w-12 h-12 border-4 border-starteq-gold/30 border-t-starteq-gold rounded-full animate-spin mb-4" />
                  <div className="font-space font-bold text-starteq-bone">Comunicando com SEFAZ…</div>
                  <div className="text-xs text-starteq-muted mt-1">Processando {count} notas em paralelo</div>
                </div>
              )}

              {step === "sucesso" && (
                <>
                  <div className="text-center py-4">
                    <Icon name="check" size={44} className="text-starteq-pix mx-auto" />
                    <div className="font-space font-black text-starteq-bone text-xl mt-3">Lote concluído</div>
                    <div className="text-sm text-starteq-text mt-2">
                      <span className="text-starteq-pix font-bold">{issued.ok} autorizada(s)</span>
                      {issued.fail > 0 && <> · <span className="text-starteq-red font-bold">{issued.fail} rejeitada(s)</span></>}
                    </div>
                    {issued.fail > 0 && (
                      <div className="text-xs text-starteq-muted mt-2 max-w-xs mx-auto">
                        Notas rejeitadas ficam pendentes na lista · normalmente é cliente sem CPF ou dado incompleto.
                      </div>
                    )}
                  </div>
                  <button
                    onClick={close}
                    className="w-full bg-starteq-gold text-starteq-black font-space font-black uppercase text-xs px-4 py-3 rounded-lg hover:bg-starteq-gold-dk"
                  >
                    Fechar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
