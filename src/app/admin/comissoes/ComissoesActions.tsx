"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

type Props = {
  tecName: string;
  total: number;
  comIds: string[];
};

export function ComissoesActions({ tecName, total, comIds }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [paid, setPaid] = useState(false);

  if (paid) {
    return (
      <div className="inline-flex items-center gap-2 bg-starteq-pix/10 text-starteq-pix border border-starteq-pix/40 font-space font-bold uppercase text-xs px-3 py-2 rounded-lg">
        <Icon name="check" size={14} />
        Pago no mock
      </div>
    );
  }

  if (confirming) {
    return (
      <div className="flex flex-col items-end gap-2">
        <div className="text-xs text-starteq-muted text-right max-w-[200px]">
          Vai criar despesa de {brl(total)} e marcar {comIds.length} comissão(ões) como paga.
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setConfirming(false)}
            className="bg-starteq-card text-starteq-muted border border-starteq-line hover:border-starteq-bone font-space font-bold uppercase text-xs px-3 py-2 rounded-lg"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              setPaid(true);
              setConfirming(false);
            }}
            className="bg-starteq-pix text-starteq-black font-space font-black uppercase text-xs px-4 py-2 rounded-lg hover:bg-starteq-pix/80"
          >
            <Icon name="check" size={14} className="inline mr-1.5 -mt-0.5" />
            Confirmar pagamento
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="inline-flex items-center gap-2 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-space font-black uppercase text-xs px-4 py-2.5 rounded-lg"
    >
      <Icon name="credit-card" size={14} />
      Pagar {tecName.split(" ")[0]}
    </button>
  );
}

function brl(n: number) {
  return `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
