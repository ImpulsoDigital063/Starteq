"use client";

import { useEffect } from "react";
import type { ServiceOrder } from "@/lib/admin-mock";

export function EtiquetaPrint({ os, statusLabel }: { os: ServiceOrder; statusLabel: string }) {
  useEffect(() => {
    const t = setTimeout(() => window.print(), 400);
    return () => clearTimeout(t);
  }, []);

  const created = new Date(os.created_at).toLocaleDateString("pt-BR");
  const estimated = os.estimated_at ? new Date(os.estimated_at).toLocaleDateString("pt-BR") : "—";
  const phoneOnly = os.customer_phone.replace(/\D/g, "");

  return (
    <>
      <style>{`
        @page { size: 80mm 60mm; margin: 0; }
        @media print {
          html, body { background: #fff !important; margin: 0; padding: 0; }
          body * { visibility: hidden; }
          .etiqueta-print, .etiqueta-print * { visibility: visible; }
          .etiqueta-print { position: absolute; inset: 0; }
          .no-print { display: none !important; }
        }
        .etiqueta-print {
          width: 80mm;
          min-height: 60mm;
          padding: 4mm;
          background: #fff;
          color: #000;
          font-family: 'Courier New', monospace;
          font-size: 9pt;
          line-height: 1.25;
        }
        .etiqueta-print .brand {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1.5px solid #000;
          padding-bottom: 1mm;
          margin-bottom: 1.5mm;
        }
        .etiqueta-print .brand b { font-size: 11pt; letter-spacing: 1px; }
        .etiqueta-print .id { font-size: 13pt; font-weight: 900; text-align: center; margin: 1.5mm 0; letter-spacing: 1px; }
        .etiqueta-print .row { display: flex; justify-content: space-between; gap: 2mm; margin-bottom: 0.8mm; }
        .etiqueta-print .row .lbl { font-weight: 700; text-transform: uppercase; font-size: 7pt; }
        .etiqueta-print .row .val { text-align: right; font-size: 9pt; }
        .etiqueta-print .problem {
          border-top: 1px dashed #000;
          margin-top: 1.5mm;
          padding-top: 1.5mm;
          font-size: 8pt;
        }
        .etiqueta-print .footer {
          border-top: 1.5px solid #000;
          margin-top: 1.5mm;
          padding-top: 1mm;
          display: flex;
          justify-content: space-between;
          font-size: 7pt;
        }
      `}</style>

      <div className="no-print fixed top-0 left-0 right-0 z-50 bg-starteq-card border-b border-starteq-line px-4 py-2 flex items-center justify-between gap-3">
        <div className="text-xs text-starteq-muted">
          Pré-visualização da etiqueta (80×60mm). A impressão abre automática.
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="text-xs font-space font-bold uppercase tracking-wider bg-starteq-gold text-starteq-black px-3 py-1.5 rounded">
            Imprimir
          </button>
          <button onClick={() => window.close()} className="text-xs font-space font-bold uppercase tracking-wider bg-starteq-coal border border-starteq-line text-starteq-bone px-3 py-1.5 rounded">
            Fechar
          </button>
        </div>
      </div>

      <div className="no-print min-h-screen bg-starteq-black flex items-center justify-center pt-16 pb-8">
        <div className="shadow-2xl">
          <div className="etiqueta-print">
            <Conteudo os={os} statusLabel={statusLabel} created={created} estimated={estimated} phoneOnly={phoneOnly} />
          </div>
        </div>
      </div>

      <div className="etiqueta-print" style={{ display: "none" }} aria-hidden>
        <Conteudo os={os} statusLabel={statusLabel} created={created} estimated={estimated} phoneOnly={phoneOnly} />
      </div>
    </>
  );
}

function Conteudo({
  os,
  statusLabel,
  created,
  estimated,
  phoneOnly,
}: {
  os: ServiceOrder;
  statusLabel: string;
  created: string;
  estimated: string;
  phoneOnly: string;
}) {
  return (
    <>
      <div className="brand">
        <b>STARTEQ</b>
        <span style={{ fontSize: "7pt" }}>Tocantins · (63) 99252-8619</span>
      </div>

      <div className="id">{os.id}</div>

      <div className="row">
        <span className="lbl">Cliente</span>
        <span className="val">{os.customer_name}</span>
      </div>
      <div className="row">
        <span className="lbl">WhatsApp</span>
        <span className="val">{os.customer_phone}</span>
      </div>
      <div className="row">
        <span className="lbl">Equip.</span>
        <span className="val">{os.device}</span>
      </div>
      <div className="row">
        <span className="lbl">Entrada</span>
        <span className="val">{created}</span>
      </div>
      <div className="row">
        <span className="lbl">Previsão</span>
        <span className="val">{estimated}</span>
      </div>
      <div className="row">
        <span className="lbl">Status</span>
        <span className="val">{statusLabel}</span>
      </div>

      <div className="problem">
        <b style={{ fontSize: "7pt", textTransform: "uppercase" }}>Problema:</b>{" "}
        {os.problem.length > 90 ? os.problem.slice(0, 90) + "…" : os.problem}
      </div>

      <div className="footer">
        <span>Garantia {os.warranty_days ?? 90}d</span>
        <span>wa.me/55{phoneOnly}</span>
      </div>
    </>
  );
}
