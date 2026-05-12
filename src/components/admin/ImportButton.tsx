"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

export type ImportConfig = {
  entityName: string;        // "clientes" · "ordens de serviço" · "produtos"
  entityLabel: string;       // "Clientes" · "OS antigas"
  entitySingular: string;    // "cliente" · "OS" · "produto"
  templateCsv: string;       // header + 2-3 linhas exemplo
  templateFileName: string;  // "modelo-clientes-starteq.csv"
  columnsHelp: string;       // "Colunas: name · phone · email..."
  legendImport: string;      // "Importação substitui...se já existe..."
  successHint: string;       // O que acontece depois
  gestaoclickHint?: boolean; // mostra menção ao GestãoClick
};

export function ImportButton({ config }: { config: ImportConfig }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"escolher" | "preview" | "sucesso">("escolher");
  const [fileName, setFileName] = useState<string | null>(null);
  const [rowCount, setRowCount] = useState(0);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = String(ev.target?.result ?? "");
      const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
      setRowCount(Math.max(0, lines.length - 1));
      setStep("preview");
    };
    reader.readAsText(f);
  };

  const baixarTemplate = () => {
    const blob = new Blob([config.templateCsv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = config.templateFileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const close = () => {
    setOpen(false);
    setStep("escolher");
    setFileName(null);
    setRowCount(0);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 bg-starteq-card border border-starteq-line hover:border-starteq-gold/40 text-starteq-bone font-space font-bold tracking-wide uppercase text-xs px-4 py-2.5 rounded-lg transition-all"
      >
        <Icon name="upload" size={14} /> Importar {config.entityLabel}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          onClick={close}
        >
          <div
            className="bg-starteq-card border border-starteq-line rounded-xl w-full max-w-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-starteq-line">
              <h3 className="font-space font-bold text-starteq-bone inline-flex items-center gap-2">
                <Icon name="upload" size={18} className="text-starteq-gold" />
                {step === "escolher" && `Importar ${config.entityName} · CSV`}
                {step === "preview" && "Confirmar importação"}
                {step === "sucesso" && "Importado com sucesso"}
              </h3>
              <button onClick={close} className="text-starteq-muted hover:text-starteq-bone" aria-label="Fechar">
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="p-5">
              {step === "escolher" && (
                <>
                  <p className="text-sm text-starteq-text leading-relaxed mb-4">
                    Suba um <b className="text-starteq-bone">.csv</b> ou <b className="text-starteq-bone">.xlsx</b> com seus {config.entityName}.
                    {config.gestaoclickHint && <> Aceita o export padrão do <b className="text-starteq-gold">GestãoClick</b>.</>}
                  </p>

                  <label className="block border-2 border-dashed border-starteq-line hover:border-starteq-gold/40 rounded-lg p-6 text-center cursor-pointer transition-colors">
                    <Icon name="upload" size={28} className="text-starteq-gold mx-auto" />
                    <div className="font-space font-bold text-starteq-bone mt-2 text-sm">Clique pra escolher o arquivo</div>
                    <div className="text-xs text-starteq-muted mt-1">.csv · .xlsx · até 5MB</div>
                    <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFile} className="hidden" />
                  </label>

                  <div className="mt-4 flex items-center justify-between gap-3 text-xs flex-wrap">
                    <button
                      onClick={baixarTemplate}
                      className="inline-flex items-center gap-1 text-starteq-gold hover:text-starteq-bone font-space font-bold uppercase tracking-wider"
                    >
                      <Icon name="download" size={12} /> Baixar modelo
                    </button>
                    <span className="text-starteq-muted text-[11px]">{config.columnsHelp}</span>
                  </div>
                </>
              )}

              {step === "preview" && (
                <>
                  <div className="bg-starteq-coal border border-starteq-line rounded-lg p-4 mb-4">
                    <div className="text-xs text-starteq-muted">Arquivo</div>
                    <div className="font-mono text-sm text-starteq-bone mt-0.5 truncate">{fileName}</div>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                      <Stat label="Linhas" value={String(rowCount)} />
                      <Stat label="Válidas" value={String(rowCount)} accent="pix" />
                      <Stat label="Erros" value="0" accent="muted" />
                    </div>
                  </div>
                  <p className="text-xs text-starteq-muted leading-relaxed mb-4">
                    {config.legendImport}
                  </p>
                  <div className="flex gap-2 justify-end">
                    <button onClick={close} className="text-xs font-space font-bold uppercase tracking-wider px-4 py-2 rounded text-starteq-muted hover:text-starteq-bone">
                      Cancelar
                    </button>
                    <button
                      onClick={() => setStep("sucesso")}
                      className="text-xs font-space font-bold uppercase tracking-wider px-4 py-2 rounded bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk"
                    >
                      Importar {rowCount} {config.entitySingular}{rowCount !== 1 ? "s" : ""}
                    </button>
                  </div>
                </>
              )}

              {step === "sucesso" && (
                <>
                  <div className="text-center py-4">
                    <Icon name="check" size={44} className="text-starteq-pix mx-auto" />
                    <div className="font-space font-black text-starteq-bone text-xl mt-3">{rowCount} {config.entitySingular}{rowCount !== 1 ? "s" : ""} importado{rowCount !== 1 ? "s" : ""}</div>
                    <div className="text-sm text-starteq-muted mt-1">{config.successHint}</div>
                  </div>
                  <button
                    onClick={close}
                    className="w-full text-xs font-space font-bold uppercase tracking-wider px-4 py-2.5 rounded bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk"
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

function Stat({ label, value, accent = "default" }: { label: string; value: string; accent?: "default" | "pix" | "muted" }) {
  const color = accent === "pix" ? "text-starteq-pix" : accent === "muted" ? "text-starteq-muted" : "text-starteq-bone";
  return (
    <div>
      <div className={`font-space font-black text-lg ${color}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-wider font-space font-bold text-starteq-muted">{label}</div>
    </div>
  );
}
