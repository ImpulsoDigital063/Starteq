"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import { COUPONS, computeCouponDiscount, type CouponKind, type CouponTarget } from "@/lib/admin-mock";

const brl = (n: number) => `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const num = (s: string) => {
  const n = parseFloat(s.replace(",", "."));
  return isNaN(n) ? 0 : n;
};

export function CuponsActions() {
  const [modal, setModal] = useState<"none" | "novo" | "testar">("none");

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={() => setModal("testar")}
          className="inline-flex items-center gap-2 bg-starteq-card text-starteq-bone border border-starteq-line hover:border-starteq-gold font-space font-bold uppercase text-xs px-4 py-2.5 rounded-lg"
        >
          <Icon name="cpu" size={14} /> Testar
        </button>
        <button
          onClick={() => setModal("novo")}
          className="inline-flex items-center gap-2 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-space font-black uppercase text-xs px-5 py-2.5 rounded-lg"
        >
          <Icon name="plus" size={14} /> Novo cupom
        </button>
      </div>

      {modal === "testar" && <TesterModal onClose={() => setModal("none")} />}
      {modal === "novo" && <NovoModal onClose={() => setModal("none")} />}
    </>
  );
}

// ---------- Testador · prova que o desconto reflete certo ----------
function TesterModal({ onClose }: { onClose: () => void }) {
  const [code, setCode] = useState(COUPONS[0]?.code ?? "");
  const [servico, setServico] = useState("100");
  const [peca, setPeca] = useState("50");
  const [pct, setPct] = useState("30");

  const coupon = COUPONS.find((c) => c.code === code);
  const s = num(servico);
  const p = num(peca);
  const commissionPct = num(pct);

  const result = useMemo(() => {
    if (!coupon) return null;
    return computeCouponDiscount(coupon, s, p);
  }, [coupon, s, p]);

  const comissao = (s * commissionPct) / 100; // BRUTO · não muda com desconto
  const desconto = result?.ok ? result.discount : null;
  const liquido = s + p - (desconto?.total ?? 0);
  const nfse = s - (desconto?.on_service ?? 0);
  const nfce = p - (desconto?.on_parts ?? 0);

  return (
    <Overlay onClose={onClose} title="Testar cupom" icon="cpu">
      <div className="space-y-3">
        <div>
          <Label>Cupom</Label>
          <div className="flex flex-wrap gap-1.5">
            {COUPONS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCode(c.code)}
                className={`font-mono text-xs px-2.5 py-1.5 rounded-lg border ${
                  code === c.code
                    ? "bg-starteq-gold/20 text-starteq-gold border-starteq-gold/50"
                    : "bg-starteq-black text-starteq-muted border-starteq-line hover:border-starteq-bone"
                }`}
              >
                {c.code}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <NumField label="Serviço R$" value={servico} onChange={setServico} />
          <NumField label="Peça R$" value={peca} onChange={setPeca} />
          <NumField label="Comissão %" value={pct} onChange={setPct} />
        </div>

        {!coupon ? (
          <p className="text-xs text-starteq-muted">Selecione um cupom.</p>
        ) : result && !result.ok ? (
          <div className="bg-starteq-red/10 border border-starteq-red/40 rounded-lg px-3 py-2 text-sm text-starteq-red inline-flex items-center gap-2">
            <Icon name="alert" size={14} /> {result.reason}
          </div>
        ) : desconto ? (
          <div className="bg-starteq-black border border-starteq-line rounded-lg p-3 space-y-2">
            <ResRow label="Desconto aplicado" value={`− ${brl(desconto.total)}`} tone="gold" />
            <div className="text-[10px] text-starteq-muted pl-1">
              abate {brl(desconto.on_service)} no serviço · {brl(desconto.on_parts)} na peça
            </div>
            <div className="border-t border-starteq-line pt-2 space-y-2">
              <ResRow label="Cliente paga (líquido)" value={brl(liquido)} tone="bone" strong />
              <ResRow label="Comissão do técnico" value={brl(comissao)} tone="pix" note="sobre serviço CHEIO · intacta" />
              <ResRow label="Base NFS-e (serviço)" value={brl(nfse)} tone="muted" />
              <ResRow label="Base NFC-e (peça)" value={brl(nfce)} tone="muted" />
            </div>
          </div>
        ) : null}
      </div>
    </Overlay>
  );
}

// ---------- Novo cupom · mock (sem backend ainda) ----------
function NovoModal({ onClose }: { onClose: () => void }) {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    code: "",
    description: "",
    kind: "percentual" as CouponKind,
    value: "",
    target: "servico" as CouponTarget,
    min_subtotal: "",
    max_discount: "",
    usage_limit: "",
    valid_until: "",
  });

  if (saved) {
    return (
      <Overlay onClose={onClose} title="Cupom criado" icon="check">
        <div className="text-center py-4">
          <Icon name="check" size={32} className="text-starteq-pix mx-auto mb-3" />
          <p className="text-starteq-bone font-space font-bold mb-1">
            Cupom <span className="font-mono text-starteq-gold">{form.code.toUpperCase()}</span> criado no mock
          </p>
          <p className="text-starteq-muted text-sm">Vai persistir de verdade quando entrar o Supabase (Fase 0.2).</p>
          <button
            onClick={onClose}
            className="mt-4 bg-starteq-gold text-starteq-black font-space font-black uppercase text-xs px-5 py-2.5 rounded-lg"
          >
            Fechar
          </button>
        </div>
      </Overlay>
    );
  }

  const valid = form.code.trim() && num(form.value) > 0;

  return (
    <Overlay onClose={onClose} title="Novo cupom" icon="tag">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) setSaved(true);
        }}
        className="space-y-3"
      >
        <div className="grid grid-cols-2 gap-2">
          <TextField label="Código" value={form.code} onChange={(v) => setForm({ ...form, code: v.toUpperCase() })} placeholder="VOLTA10" mono />
          <div>
            <Label>Tipo</Label>
            <Select
              value={form.kind}
              onChange={(v) => setForm({ ...form, kind: v as CouponKind })}
              options={[["percentual", "Percentual (%)"], ["valor", "Valor fixo (R$)"]]}
            />
          </div>
        </div>

        <TextField label="Descrição" value={form.description} onChange={(v) => setForm({ ...form, description: v })} placeholder="10% na mão de obra" />

        <div className="grid grid-cols-2 gap-2">
          <NumField label={form.kind === "percentual" ? "Valor (%)" : "Valor (R$)"} value={form.value} onChange={(v) => setForm({ ...form, value: v })} />
          <div>
            <Label>Incide sobre</Label>
            <Select
              value={form.target}
              onChange={(v) => setForm({ ...form, target: v as CouponTarget })}
              options={[["servico", "Mão de obra"], ["produto", "Peça / produto"], ["total", "Total (rateado)"]]}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <NumField label="Mínimo R$" value={form.min_subtotal} onChange={(v) => setForm({ ...form, min_subtotal: v })} placeholder="0" />
          <NumField label="Teto R$" value={form.max_discount} onChange={(v) => setForm({ ...form, max_discount: v })} placeholder="—" />
          <NumField label="Limite usos" value={form.usage_limit} onChange={(v) => setForm({ ...form, usage_limit: v })} placeholder="∞" />
        </div>

        <button
          type="submit"
          disabled={!valid}
          className="w-full bg-starteq-gold text-starteq-black font-space font-black uppercase text-sm px-5 py-3 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-starteq-gold-dk"
        >
          Criar cupom
        </button>
      </form>
    </Overlay>
  );
}

// ---------- primitivos de UI ----------
function Overlay({ children, onClose, title, icon }: { children: React.ReactNode; onClose: () => void; title: string; icon: Parameters<typeof Icon>[0]["name"] }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-start lg:items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-starteq-card border border-starteq-gold/40 rounded-2xl w-full max-w-md p-6 my-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-space font-bold text-xl text-starteq-bone inline-flex items-center gap-2">
            <Icon name={icon} size={20} className="text-starteq-gold" /> {title}
          </h2>
          <button onClick={onClose} className="text-starteq-muted hover:text-starteq-red">
            <Icon name="x" size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-[10px] font-space font-bold uppercase tracking-wider text-starteq-muted mb-1">{children}</label>;
}

function TextField({ label, value, onChange, placeholder, mono }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; mono?: boolean }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 rounded-lg bg-starteq-black border border-starteq-line focus:border-starteq-gold focus:outline-none text-starteq-bone text-sm ${mono ? "font-mono" : ""}`}
      />
    </div>
  );
}

function NumField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 rounded-lg bg-starteq-black border border-starteq-line focus:border-starteq-gold focus:outline-none text-starteq-bone text-sm font-mono"
      />
    </div>
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2.5 rounded-lg bg-starteq-black border border-starteq-line focus:border-starteq-gold focus:outline-none text-starteq-bone text-sm"
    >
      {options.map(([v, l]) => (
        <option key={v} value={v}>{l}</option>
      ))}
    </select>
  );
}

function ResRow({ label, value, tone, note, strong }: { label: string; value: string; tone: "gold" | "bone" | "pix" | "muted"; note?: string; strong?: boolean }) {
  const color = tone === "gold" ? "text-starteq-gold" : tone === "pix" ? "text-starteq-pix" : tone === "bone" ? "text-starteq-bone" : "text-starteq-muted";
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <div className={`text-xs ${strong ? "text-starteq-bone font-bold" : "text-starteq-text"}`}>{label}</div>
        {note && <div className="text-[10px] text-starteq-muted">{note}</div>}
      </div>
      <div className={`font-mono text-sm font-bold ${color}`}>{value}</div>
    </div>
  );
}
