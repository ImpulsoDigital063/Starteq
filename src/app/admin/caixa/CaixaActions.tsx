"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

type Props = {
  sessionId: string;
  openOnly?: boolean;        // mostra só o form de abertura (quando não há sessão)
  fechar?: boolean;          // mostra só o form de fechamento
  fecharExpected?: number;   // valor esperado em espécie · pra calcular diff
};

type Form = null | "abrir" | "sangria" | "suprimento";

export function CaixaActions({ sessionId, openOnly, fechar, fecharExpected }: Props) {
  const [open, setOpen] = useState<Form>(openOnly ? "abrir" : null);

  if (fechar) {
    return <FecharForm expected={fecharExpected ?? 0} />;
  }

  if (openOnly) {
    return <AbrirForm />;
  }

  return (
    <div className="bg-starteq-card border border-starteq-line rounded-xl p-4 space-y-2">
      <div className="text-[10px] uppercase tracking-wider font-space font-bold text-starteq-muted mb-2">
        Ações
      </div>

      <ActionButton
        active={open === "suprimento"}
        onClick={() => setOpen(open === "suprimento" ? null : "suprimento")}
        icon="plus"
        label="Suprimento (entrada extra)"
        color="pix"
      />
      {open === "suprimento" && <SmallForm type="suprimento" onClose={() => setOpen(null)} />}

      <ActionButton
        active={open === "sangria"}
        onClick={() => setOpen(open === "sangria" ? null : "sangria")}
        icon="arrow-right"
        iconClass="rotate-180"
        label="Sangria (retirada)"
        color="red"
      />
      {open === "sangria" && <SmallForm type="sangria" onClose={() => setOpen(null)} />}
    </div>
  );
}

function ActionButton({
  active,
  onClick,
  icon,
  iconClass,
  label,
  color,
}: {
  active: boolean;
  onClick: () => void;
  icon: import("@/components/Icon").IconName;
  iconClass?: string;
  label: string;
  color: "pix" | "red";
}) {
  const colors = {
    pix: "bg-starteq-pix/10 text-starteq-pix border-starteq-pix/40 hover:bg-starteq-pix/20",
    red: "bg-starteq-red/10 text-starteq-red border-starteq-red/40 hover:bg-starteq-red/20",
  };
  return (
    <button
      onClick={onClick}
      className={`w-full inline-flex items-center gap-2 font-space font-bold uppercase text-xs px-3 py-2.5 rounded-lg border ${colors[color]} ${active ? "ring-2 ring-offset-2 ring-offset-starteq-card ring-current/40" : ""}`}
    >
      <Icon name={icon} size={14} className={iconClass} />
      <span className="flex-1 text-left">{label}</span>
      <Icon name={active ? "x" : "plus"} size={12} />
    </button>
  );
}

function AbrirForm() {
  const [amount, setAmount] = useState("150,00");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="bg-starteq-pix/10 border border-starteq-pix/40 rounded-lg p-3 text-xs text-starteq-pix">
        <Icon name="check" size={14} className="inline -mt-0.5 mr-1" />
        Sessão aberta no mock · em produção: cria CashSession status=aberta + CashMovement type=abertura.
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-3 mt-4 text-left"
    >
      <div>
        <label className="block text-[10px] uppercase tracking-wider font-space font-bold text-starteq-muted mb-1">
          Valor de troco (espécie)
        </label>
        <div className="flex items-center bg-starteq-coal border border-starteq-line rounded-lg overflow-hidden">
          <span className="px-3 py-2.5 text-starteq-muted text-sm font-mono">R$</span>
          <input
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 bg-transparent px-1 py-2.5 text-starteq-bone font-mono outline-none"
            placeholder="0,00"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-starteq-gold text-starteq-black font-space font-black uppercase text-xs px-4 py-3 rounded-lg hover:bg-starteq-gold-dk"
      >
        <Icon name="check" size={14} className="inline mr-1.5 -mt-0.5" />
        Abrir caixa
      </button>
    </form>
  );
}

function SmallForm({ type, onClose }: { type: "sangria" | "suprimento"; onClose: () => void }) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="bg-starteq-pix/10 border border-starteq-pix/40 rounded-lg p-3 text-xs text-starteq-pix">
        <Icon name="check" size={14} className="inline -mt-0.5 mr-1" />
        Mock · em produção: cria CashMovement type={type}.
        <button onClick={onClose} className="ml-2 underline">fechar</button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="bg-starteq-coal border border-starteq-line rounded-lg p-3 space-y-2"
    >
      <div className="flex items-center bg-starteq-card border border-starteq-line rounded">
        <span className="px-2 py-1.5 text-starteq-muted text-xs font-mono">R$</span>
        <input
          type="text"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="flex-1 bg-transparent px-1 py-1.5 text-starteq-bone font-mono text-sm outline-none"
          placeholder="0,00"
          required
        />
      </div>
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full bg-starteq-card border border-starteq-line rounded px-2 py-1.5 text-starteq-bone text-sm outline-none placeholder:text-starteq-muted"
        placeholder={type === "sangria" ? "Motivo (ex: depósito banco)" : "Origem (ex: troco extra)"}
        required={type === "sangria"}
      />
      <button
        type="submit"
        className="w-full bg-starteq-gold text-starteq-black font-space font-bold uppercase text-xs px-3 py-2 rounded hover:bg-starteq-gold-dk"
      >
        Confirmar
      </button>
    </form>
  );
}

function FecharForm({ expected }: { expected: number }) {
  const [declared, setDeclared] = useState(expected.toFixed(2).replace(".", ","));
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const declaredNum = parseFloat(declared.replace(/\./g, "").replace(",", ".")) || 0;
  const diff = +(declaredNum - expected).toFixed(2);
  const hasDiff = diff !== 0;
  const noteRequired = hasDiff;
  const canSubmit = !noteRequired || note.trim().length > 0;

  if (submitted) {
    return (
      <div className="bg-starteq-pix/10 border border-starteq-pix/40 rounded-lg p-4 text-sm text-starteq-pix">
        <Icon name="check" size={16} className="inline -mt-0.5 mr-1" />
        Caixa fechado no mock · em produção: marca CashSession status=fechada com diff registrado.
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSubmit) return;
        setSubmitted(true);
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-[10px] uppercase tracking-wider font-space font-bold text-starteq-muted mb-1">
          Valor contado em espécie
        </label>
        <div className="flex items-center bg-starteq-coal border border-starteq-line rounded-lg overflow-hidden">
          <span className="px-3 py-2.5 text-starteq-muted text-sm font-mono">R$</span>
          <input
            type="text"
            inputMode="decimal"
            value={declared}
            onChange={(e) => setDeclared(e.target.value)}
            className="flex-1 bg-transparent px-1 py-2.5 text-starteq-bone font-mono text-lg outline-none"
          />
        </div>
      </div>

      <div className={`bg-starteq-coal border rounded-lg p-3 ${hasDiff ? (diff < 0 ? "border-starteq-red/40" : "border-orange-400/40") : "border-starteq-pix/40"}`}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider font-space font-bold text-starteq-muted">Diferença</span>
          <span className={`font-mono font-bold text-lg ${hasDiff ? (diff < 0 ? "text-starteq-red" : "text-orange-400") : "text-starteq-pix"}`}>
            {hasDiff ? (diff > 0 ? "+ " : "− ") : ""}R$ {Math.abs(diff).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>
        </div>
        {hasDiff && (
          <div className="text-xs text-starteq-muted mt-1">
            {diff < 0 ? "Falta dinheiro no caixa físico." : "Sobra de dinheiro no caixa físico."} Nota obrigatória.
          </div>
        )}
      </div>

      {noteRequired && (
        <div>
          <label className="block text-[10px] uppercase tracking-wider font-space font-bold text-starteq-muted mb-1">
            Justificativa da diferença
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="w-full bg-starteq-coal border border-starteq-line rounded-lg px-3 py-2 text-starteq-bone text-sm outline-none placeholder:text-starteq-muted"
            placeholder="ex: faltou conferir moedas de troco · sobra de cliente sem recibo · ..."
            required
          />
        </div>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full bg-starteq-red text-starteq-bone font-space font-black uppercase text-xs px-4 py-3 rounded-lg hover:bg-starteq-red/80 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Icon name="lock" size={14} className="inline mr-1.5 -mt-0.5" />
        Confirmar fechamento
      </button>
    </form>
  );
}
