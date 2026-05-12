"use client";

import { useState } from "react";
import { Icon, type IconName } from "@/components/Icon";

type Automacao = {
  id: string;
  name: string;
  description: string;
  icon: IconName;
  interval: string;
  metric: string;
  enabled: boolean;
  accent: "gold" | "pix";
};

export function CampanhaToggle({ automacao }: { automacao: Automacao }) {
  const [on, setOn] = useState(automacao.enabled);
  const accent = automacao.accent;

  return (
    <div
      className={`relative rounded-xl border p-4 transition-all ${
        on
          ? accent === "pix"
            ? "bg-starteq-pix/5 border-starteq-pix/40"
            : "bg-starteq-gold/5 border-starteq-gold/40"
          : "bg-starteq-card border-starteq-line"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
              accent === "pix"
                ? "bg-starteq-pix/10 text-starteq-pix"
                : "bg-starteq-gold/10 text-starteq-gold"
            }`}
          >
            <Icon name={automacao.icon} size={18} />
          </div>
          <div>
            <h3 className="font-space font-bold text-starteq-bone text-sm">{automacao.name}</h3>
            <div className="text-[10px] text-starteq-muted font-mono mt-0.5">{automacao.interval}</div>
          </div>
        </div>

        <button
          onClick={() => setOn(!on)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
            on
              ? accent === "pix"
                ? "bg-starteq-pix"
                : "bg-starteq-gold"
              : "bg-starteq-line"
          }`}
          role="switch"
          aria-checked={on}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              on ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <p className="text-xs text-starteq-text leading-relaxed mb-3">{automacao.description}</p>

      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-space font-bold">
        <span className={on ? "text-starteq-pix" : "text-starteq-muted"}>
          {on ? "● ATIVA" : "○ INATIVA"}
        </span>
        <span className="text-starteq-muted">{automacao.metric}</span>
      </div>
    </div>
  );
}

type Cupom = {
  code: string;
  discount: string;
  scope: string;
  usos: number;
  criados: number;
  expira: string;
  type: "Sumido" | "Newsletter" | "Sazonal" | "Aniversário";
};

const TYPE_COLOR: Record<Cupom["type"], string> = {
  Sumido: "bg-starteq-red/10 text-starteq-red border-starteq-red/40",
  Newsletter: "bg-starteq-pix/10 text-starteq-pix border-starteq-pix/40",
  Sazonal: "bg-starteq-gold/10 text-starteq-gold border-starteq-gold/40",
  Aniversário: "bg-purple-500/10 text-purple-400 border-purple-400/40",
};

export function CupomCard({ cupom }: { cupom: Cupom }) {
  const [copied, setCopied] = useState(false);
  const pct = Math.round((cupom.usos / cupom.criados) * 100);

  const copy = () => {
    navigator.clipboard.writeText(cupom.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="bg-starteq-card border border-starteq-line rounded-xl p-4">
      <div className="flex items-center justify-between gap-2 mb-2">
        <button
          onClick={copy}
          className="font-mono text-starteq-gold font-bold text-base hover:text-starteq-bone inline-flex items-center gap-1.5"
          title="Copiar código"
        >
          {cupom.code}
          {copied ? <Icon name="check" size={12} className="text-starteq-pix" /> : <Icon name="file" size={12} />}
        </button>
        <span className={`text-[9px] font-space font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${TYPE_COLOR[cupom.type]}`}>
          {cupom.type}
        </span>
      </div>
      <div className="text-2xl font-space font-black text-starteq-bone mb-1">{cupom.discount}</div>
      <div className="text-[10px] text-starteq-muted mb-3">{cupom.scope}</div>
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[10px] font-space font-bold uppercase tracking-wider text-starteq-muted">
          <span>{cupom.usos} de {cupom.criados} usados</span>
          <span>{pct}%</span>
        </div>
        <div className="w-full h-1.5 bg-starteq-black rounded-full overflow-hidden">
          <div className="h-full bg-starteq-gold" style={{ width: `${pct}%` }} />
        </div>
        <div className="text-[10px] text-starteq-muted mt-1">Expira: {cupom.expira}</div>
      </div>
    </div>
  );
}

const TEMPLATES = [
  {
    id: "carrinho",
    label: "Carrinho abandonado",
    default: `Oi {nome}! Vi que você tava de olho no {produto} 👀. Sua build te espera · agora com cupom {cupom} de 5% off (válido só hoje). Quer fechar?`,
  },
  {
    id: "cotacao",
    label: "Cotou e sumiu (3d)",
    default: `Fala {nome}! Já decidiu sobre o {produto} que você cotou? Posso reservar uma unidade ou ajustar a build pro seu orçamento. Tô por aqui!`,
  },
  {
    id: "sumido",
    label: "Cliente sumido (60d)",
    default: `{nome}, faz tempo! 🚀 Aqui na Starteq tá tudo bem? Tô te mandando esse cupom {cupom} (10% off em qualquer compra) só pra você lembrar da gente. Vai até {data}.`,
  },
  {
    id: "pos-entrega",
    label: "Pós-entrega (30d)",
    default: `{nome}, e aí, como tá rodando seu {equipamento}? Se gostou do atendimento, deixa uma estrelinha no Google: {link_google}. Pra próxima compra: 5% off com {cupom}.`,
  },
];

export function TemplateEditor() {
  const [selected, setSelected] = useState(TEMPLATES[0].id);
  const [drafts, setDrafts] = useState<Record<string, string>>(
    Object.fromEntries(TEMPLATES.map((t) => [t.id, t.default])),
  );
  const [saved, setSaved] = useState(false);

  const current = TEMPLATES.find((t) => t.id === selected)!;

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="bg-starteq-card border border-starteq-line rounded-xl overflow-hidden">
      {/* Tabs */}
      <div className="flex gap-1 p-2 border-b border-starteq-line overflow-x-auto">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelected(t.id)}
            className={`text-xs font-space font-bold uppercase tracking-wider px-3 py-1.5 rounded whitespace-nowrap ${
              selected === t.id
                ? "bg-starteq-gold text-starteq-black"
                : "text-starteq-muted hover:text-starteq-bone hover:bg-starteq-coal"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Editor */}
      <div className="p-4">
        <textarea
          value={drafts[selected]}
          onChange={(e) => setDrafts({ ...drafts, [selected]: e.target.value })}
          rows={4}
          className="w-full bg-starteq-black border border-starteq-line rounded-lg p-3 text-sm text-starteq-bone font-mono leading-relaxed focus:border-starteq-gold focus:outline-none resize-none"
        />

        <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
          <div className="text-[10px] text-starteq-muted">
            Variáveis: <span className="font-mono text-starteq-gold">{"{nome}"}</span> · <span className="font-mono text-starteq-gold">{"{produto}"}</span> · <span className="font-mono text-starteq-gold">{"{cupom}"}</span> · <span className="font-mono text-starteq-gold">{"{equipamento}"}</span> · <span className="font-mono text-starteq-gold">{"{data}"}</span>
          </div>

          <div className="flex items-center gap-2">
            {saved && (
              <span className="text-[10px] text-starteq-pix font-space font-bold uppercase tracking-wider inline-flex items-center gap-1">
                <Icon name="check" size={12} /> salvo
              </span>
            )}
            <button
              onClick={save}
              className="text-xs font-space font-bold uppercase tracking-wider px-4 py-2 rounded bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk"
            >
              Salvar template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
