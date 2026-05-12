"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

type Props = {
  reference: string;
  customer: string;
  value: number;
  type: "pedido" | "os";
};

export function NFeActions({ reference, customer, value, type }: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"confirmar" | "emitindo" | "sucesso">("confirmar");
  const [nfeNumber, setNfeNumber] = useState("");

  const emit = () => {
    setStep("emitindo");
    setTimeout(() => {
      // Gera número fictício baseado em timestamp
      const num = `NFe-000${Math.floor(124 + Math.random() * 999)}`;
      setNfeNumber(num);
      setStep("sucesso");
    }, 1400);
  };

  const close = () => {
    setOpen(false);
    setTimeout(() => setStep("confirmar"), 300);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 bg-starteq-gold/10 text-starteq-gold border border-starteq-gold/40 hover:bg-starteq-gold/20 font-space font-bold uppercase text-[10px] px-3 py-2 rounded-lg"
      >
        <Icon name="file" size={12} /> Emitir NFe
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4" onClick={close}>
          <div className="bg-starteq-card border border-starteq-line rounded-xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-starteq-line">
              <h3 className="font-space font-bold text-starteq-bone inline-flex items-center gap-2">
                <Icon name="file" size={18} className="text-starteq-gold" />
                {step === "confirmar" && "Emitir NFe"}
                {step === "emitindo" && "Emitindo NFe..."}
                {step === "sucesso" && "NFe emitida"}
              </h3>
              {step !== "emitindo" && (
                <button onClick={close} className="text-starteq-muted hover:text-starteq-bone" aria-label="Fechar">
                  <Icon name="x" size={18} />
                </button>
              )}
            </div>

            <div className="p-5">
              {step === "confirmar" && (
                <>
                  <p className="text-sm text-starteq-text mb-4 leading-relaxed">
                    Confirma os dados pra emissão da nota fiscal eletrônica:
                  </p>
                  <div className="bg-starteq-coal border border-starteq-line rounded-lg p-4 space-y-2 text-sm">
                    <Row label={type === "pedido" ? "Pedido" : "OS"} value={reference} />
                    <Row label="Cliente" value={customer} />
                    <Row label="Valor total" value={`R$ ${value.toFixed(2)}`} accent />
                    <Row label="CFOP" value={type === "pedido" ? "5102 (venda)" : "5933 (serviço)"} />
                    <Row label="Natureza" value={type === "pedido" ? "Venda de mercadoria" : "Prestação de serviço"} />
                  </div>
                  <div className="mt-4 text-xs text-starteq-muted bg-starteq-gold/5 border border-starteq-gold/20 rounded p-3">
                    <Icon name="info" size={12} className="inline mr-1 text-starteq-gold" />
                    Provedor · <strong className="text-starteq-bone">Focus NFe</strong> · ambiente homologação
                  </div>
                  <div className="flex gap-2 justify-end mt-5">
                    <button onClick={close} className="text-xs font-space font-bold uppercase tracking-wider px-4 py-2 rounded text-starteq-muted hover:text-starteq-bone">
                      Cancelar
                    </button>
                    <button
                      onClick={emit}
                      className="text-xs font-space font-bold uppercase tracking-wider px-4 py-2 rounded bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk"
                    >
                      Confirmar e emitir
                    </button>
                  </div>
                </>
              )}

              {step === "emitindo" && (
                <div className="py-8 text-center">
                  <div className="inline-block w-12 h-12 border-4 border-starteq-gold/30 border-t-starteq-gold rounded-full animate-spin mb-4" />
                  <div className="font-space font-bold text-starteq-bone">Comunicando com SEFAZ...</div>
                  <div className="text-xs text-starteq-muted mt-1">Geralmente leva ~3 segundos</div>
                </div>
              )}

              {step === "sucesso" && (
                <>
                  <div className="text-center py-4">
                    <Icon name="check" size={44} className="text-starteq-pix mx-auto" />
                    <div className="font-space font-black text-starteq-bone text-xl mt-3">NFe Autorizada</div>
                    <div className="font-mono text-sm text-starteq-gold mt-2">{nfeNumber}</div>
                    <div className="text-xs text-starteq-muted mt-1">SEFAZ-TO · {new Date().toLocaleString("pt-BR")}</div>
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                    <button className="w-full inline-flex items-center justify-center gap-2 bg-starteq-gold text-starteq-black font-space font-bold uppercase text-xs tracking-wider px-4 py-2.5 rounded">
                      <Icon name="download" size={14} /> Baixar PDF (DANFE)
                    </button>
                    <button className="w-full inline-flex items-center justify-center gap-2 bg-starteq-card border border-starteq-line text-starteq-bone font-space font-bold uppercase text-xs tracking-wider px-4 py-2.5 rounded">
                      <Icon name="download" size={14} /> Baixar XML
                    </button>
                    <button className="w-full inline-flex items-center justify-center gap-2 bg-starteq-pix/10 text-starteq-pix border border-starteq-pix/40 font-space font-bold uppercase text-xs tracking-wider px-4 py-2.5 rounded">
                      <Icon name="whatsapp" size={14} /> Enviar XML pro cliente
                    </button>
                    <button onClick={close} className="text-xs text-starteq-muted hover:text-starteq-bone py-2 font-space font-bold uppercase tracking-wider">
                      Fechar
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-xs text-starteq-muted uppercase tracking-wider font-space font-bold">{label}</span>
      <span className={`text-right ${accent ? "text-starteq-gold font-bold font-mono" : "text-starteq-bone"}`}>{value}</span>
    </div>
  );
}
