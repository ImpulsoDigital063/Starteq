"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { type OrderStatus } from "@/lib/admin-mock";

type Props = {
  orderId: string;
  status: OrderStatus;
  method: string;
};

type Action = "pgto" | "enviado" | "entregue" | "estorno";

export function PedidoActions({ orderId, status, method }: Props) {
  const [done, setDone] = useState<Action | null>(null);

  if (done) {
    const label =
      done === "pgto" ? "Pagamento registrado"
      : done === "enviado" ? "Marcado como enviado"
      : done === "entregue" ? "Marcado como entregue"
      : "Estornado";
    return (
      <div className="bg-starteq-pix/10 border border-starteq-pix/40 rounded-lg p-3 text-sm text-starteq-pix">
        <Icon name="check" size={16} className="inline -mt-0.5 mr-1" />
        {label} no mock · {orderId}
      </div>
    );
  }

  // Quais ações fazem sentido nesse status
  const canPgto = status === "pending";
  const canEnviar = status === "paid" || status === "processing";
  const canEntregar = status === "shipped";
  const canEstornar = ["paid", "processing", "shipped", "delivered"].includes(status);

  if (!canPgto && !canEnviar && !canEntregar && !canEstornar) {
    return (
      <div className="text-xs text-starteq-muted py-3 text-center">
        Pedido em status final · nenhuma ação disponível.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {canPgto && (
        <Btn onClick={() => setDone("pgto")} color="pix" icon="check">
          Registrar pagamento ({method.toUpperCase()})
        </Btn>
      )}
      {canEnviar && (
        <Btn onClick={() => setDone("enviado")} color="gold" icon="package">
          Marcar como enviado
        </Btn>
      )}
      {canEntregar && (
        <Btn onClick={() => setDone("entregue")} color="gold" icon="check">
          Marcar como entregue
        </Btn>
      )}
      {canEstornar && (
        <Btn onClick={() => setDone("estorno")} color="red" icon="arrow-right" iconClass="rotate-180">
          Estornar pedido
        </Btn>
      )}
    </div>
  );
}

function Btn({
  children,
  onClick,
  color,
  icon,
  iconClass,
}: {
  children: React.ReactNode;
  onClick: () => void;
  color: "pix" | "gold" | "red";
  icon: import("@/components/Icon").IconName;
  iconClass?: string;
}) {
  const colors = {
    pix: "bg-starteq-pix/10 text-starteq-pix border-starteq-pix/40 hover:bg-starteq-pix/20",
    gold: "bg-starteq-gold/10 text-starteq-gold border-starteq-gold/40 hover:bg-starteq-gold/20",
    red: "bg-starteq-red/10 text-starteq-red border-starteq-red/40 hover:bg-starteq-red/20",
  };
  return (
    <button
      onClick={onClick}
      className={`w-full inline-flex items-center gap-2 font-space font-bold uppercase text-xs px-3 py-2.5 rounded-lg border ${colors[color]}`}
    >
      <Icon name={icon} size={14} className={iconClass} />
      <span className="flex-1 text-left">{children}</span>
    </button>
  );
}
