"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import type { ServiceOrder, ServiceOrderStatus } from "@/lib/admin-mock";

const NEXT_STATUS: Record<ServiceOrderStatus, ServiceOrderStatus | null> = {
  aguardando: "em_reparo",
  em_reparo: "pronto",
  pronto: "entregue",
  entregue: null,
  cancelado: null,
};

const NEXT_LABEL: Record<ServiceOrderStatus, string> = {
  aguardando: "Iniciar reparo",
  em_reparo: "Marcar pronto",
  pronto: "Marcar entregue",
  entregue: "",
  cancelado: "",
};

export function TecnicoActions({ os, phone }: { os: ServiceOrder; phone: string }) {
  const [status, setStatus] = useState<ServiceOrderStatus>(os.status);
  const [done, setDone] = useState(false);

  const next = NEXT_STATUS[status];
  const nextLabel = NEXT_LABEL[status];

  const advance = () => {
    if (!next) return;
    setStatus(next);
    setDone(true);
    setTimeout(() => setDone(false), 2400);
  };

  const wa = `https://wa.me/55${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Olá ${os.customer_name.split(" ")[0]}, sou ${os.technician_name ?? "técnico Starteq"}. Estou cuidando da sua ${os.id} (${os.device}).`,
  )}`;

  return (
    <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-starteq-line/60">
      {next && (
        <button
          onClick={advance}
          className="inline-flex items-center justify-center gap-1.5 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-space font-bold uppercase text-xs tracking-wider px-3 py-2 rounded-lg"
        >
          <Icon name="check" size={12} /> {nextLabel}
        </button>
      )}
      {done && (
        <span className="inline-flex items-center gap-1 text-xs text-starteq-pix font-space font-bold uppercase tracking-wider">
          <Icon name="check" size={12} /> atualizado
        </span>
      )}
      <a
        href={wa}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center gap-1.5 bg-starteq-pix/10 text-starteq-pix border border-starteq-pix/40 hover:bg-starteq-pix/20 font-space font-bold uppercase text-xs tracking-wider px-3 py-2 rounded-lg"
      >
        <Icon name="whatsapp" size={12} /> WhatsApp cliente
      </a>
      <Link
        href={`/admin/os/${os.id}`}
        className="inline-flex items-center justify-center gap-1.5 bg-starteq-card border border-starteq-line hover:border-starteq-gold/40 text-starteq-bone font-space font-bold uppercase text-xs tracking-wider px-3 py-2 rounded-lg"
      >
        Detalhes
      </Link>
    </div>
  );
}
