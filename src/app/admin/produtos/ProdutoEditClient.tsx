"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { type Product } from "@/lib/catalog";

type Mode = "edit" | "new";

type FormData = {
  sku: string;
  name: string;
  brand: string;
  price: string;
  pix_price: string;
  stock: string;
  active: boolean;
  description: string;
};

const empty: FormData = {
  sku: "",
  name: "",
  brand: "",
  price: "",
  pix_price: "",
  stock: "0",
  active: true,
  description: "",
};

function fromProduct(p: Product): FormData {
  return {
    sku: p.sku,
    name: p.name,
    brand: p.brand,
    price: p.price.toFixed(2).replace(".", ","),
    pix_price: p.pix_price.toFixed(2).replace(".", ","),
    stock: String(p.stock),
    active: true,
    description: "",
  };
}

export function ProdutoEditClient({ product, mode = "edit" }: { product?: Product; mode?: Mode }) {
  const [form, setForm] = useState<FormData>(product ? fromProduct(product) : empty);
  const [submitted, setSubmitted] = useState(false);

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-starteq-card border border-starteq-pix/40 rounded-xl p-6 max-w-2xl">
        <Icon name="check" size={28} className="text-starteq-pix mb-2" />
        <h3 className="font-space font-black text-starteq-bone text-lg">
          {mode === "new" ? "Produto criado" : "Produto atualizado"} no mock
        </h3>
        <p className="text-starteq-muted text-sm mt-1">
          Em produção: grava na tabela <span className="font-mono text-starteq-gold">products</span> · IA do Júnior pega o novo preço instantâneo via <span className="font-mono">/api/products</span>.
        </p>
        <div className="flex gap-2 mt-4">
          <Link
            href="/admin/produtos"
            className="bg-starteq-gold text-starteq-black font-space font-black uppercase text-xs px-4 py-2.5 rounded-lg hover:bg-starteq-gold-dk inline-flex items-center gap-2"
          >
            <Icon name="arrow-right" size={14} className="rotate-180" /> Voltar pra lista
          </Link>
          {mode === "edit" && (
            <button
              onClick={() => setSubmitted(false)}
              className="bg-starteq-card border border-starteq-line text-starteq-bone hover:border-starteq-gold/40 font-space font-bold uppercase text-xs px-4 py-2.5 rounded-lg"
            >
              Editar de novo
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid lg:grid-cols-2 gap-5 max-w-4xl">
      {/* Identificação */}
      <Card title="Identificação" icon="package">
        <Field label="SKU" value={form.sku} onChange={(v) => set("sku", v)} disabled={mode === "edit"} required />
        <Field label="Nome do produto" value={form.name} onChange={(v) => set("name", v)} required />
        <Field label="Marca" value={form.brand} onChange={(v) => set("brand", v)} required />
      </Card>

      {/* Preço */}
      <Card title="Preço" icon="credit-card">
        <Field label="Preço cheio" value={form.price} onChange={(v) => set("price", v)} prefix="R$" required />
        <Field label="Preço PIX (15% off recomendado)" value={form.pix_price} onChange={(v) => set("pix_price", v)} prefix="R$" required />
        <div className="text-[10px] text-starteq-muted mt-1">
          Sugestão: PIX = preço cheio × 0,85
        </div>
      </Card>

      {/* Estoque */}
      <Card title="Estoque" icon="memory">
        <Field label="Quantidade em estoque" value={form.stock} onChange={(v) => set("stock", v)} required />
        <label className="flex items-center gap-2 cursor-pointer pt-3 border-t border-starteq-line">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => set("active", e.target.checked)}
            className="w-4 h-4 rounded border-starteq-line bg-starteq-coal accent-starteq-gold"
          />
          <span className="text-sm text-starteq-bone">Produto ativo (aparece no site)</span>
        </label>
      </Card>

      {/* Descrição */}
      <Card title="Descrição" icon="info">
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          rows={5}
          placeholder="Descrição que aparece na PDP do site e na resposta da IA…"
          className="w-full bg-starteq-coal border border-starteq-line rounded-lg px-3 py-2.5 text-starteq-bone text-sm outline-none focus:border-starteq-gold placeholder:text-starteq-muted"
        />
      </Card>

      <div className="lg:col-span-2 flex gap-2 justify-end">
        <Link
          href="/admin/produtos"
          className="bg-starteq-card border border-starteq-line text-starteq-bone hover:border-starteq-gold/40 font-space font-bold uppercase text-xs px-4 py-3 rounded-lg inline-flex items-center"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          className="bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-space font-black uppercase text-xs px-6 py-3 rounded-lg inline-flex items-center gap-2"
        >
          <Icon name="check" size={14} />
          {mode === "new" ? "Criar produto" : "Salvar alterações"}
        </button>
      </div>
    </form>
  );
}

function Card({ title, icon, children }: { title: string; icon: import("@/components/Icon").IconName; children: React.ReactNode }) {
  return (
    <div className="bg-starteq-card border border-starteq-line rounded-xl p-5">
      <h3 className="font-space font-bold text-starteq-bone inline-flex items-center gap-2 mb-3">
        <Icon name={icon} size={18} className="text-starteq-gold" /> {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  prefix,
  disabled,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  disabled?: boolean;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-wider font-space font-bold text-starteq-muted mb-1">
        {label}{required && " *"}
      </label>
      <div className="flex items-center bg-starteq-coal border border-starteq-line rounded-lg overflow-hidden focus-within:border-starteq-gold">
        {prefix && <span className="px-3 py-2.5 text-starteq-muted text-sm font-mono">{prefix}</span>}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required={required}
          className="flex-1 bg-transparent px-3 py-2.5 text-starteq-bone text-sm outline-none disabled:text-starteq-muted disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
}
