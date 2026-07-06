"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { postPedido } from "@/lib/comandapro";

const brl = (n: number) => "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

export default function CarrinhoClient() {
  const { items, setQty, remove, clear, totalCents } = useCart();
  const [nome, setNome] = useState("");
  const [tel, setTel] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ display?: string; code?: string } | null>(null);
  const [err, setErr] = useState("");

  async function finalizar() {
    if (!items.length || busy) return;
    if (!nome.trim() || !tel.trim()) {
      setErr("Preencha nome e telefone.");
      return;
    }
    setBusy(true);
    setErr("");
    try {
      const r = await postPedido(items.map((i) => ({ sku: i.sku, qty: i.qty })), nome.trim(), tel.trim());
      if (!r.ok) throw new Error(r.error || "Não consegui enviar o pedido.");
      setDone({ display: r.display, code: r.code });
      clear();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Erro ao enviar.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="mb-4 text-5xl text-starteq-gold">✓</div>
        <h1 className="font-space text-2xl font-black text-starteq-bone mb-2">Pedido enviado pra loja!</h1>
        <p className="text-starteq-muted">
          Guarde o código <span className="font-mono text-starteq-gold">{done.code}</span> (pedido {done.display}). A Starteq vai
          confirmar e combinar pagamento + retirada/entrega.
        </p>
        <Link href="/produtos" className="mt-6 inline-block rounded-lg bg-starteq-gold px-6 py-3 font-space text-sm font-bold uppercase text-starteq-black">
          Continuar comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 lg:py-12">
      <h1 className="font-space text-3xl lg:text-4xl font-black text-starteq-bone mb-6">Carrinho</h1>

      {items.length === 0 ? (
        <div className="bg-starteq-card border border-starteq-line rounded-xl p-12 text-center">
          <p className="text-starteq-muted mb-4">Seu carrinho está vazio.</p>
          <Link href="/produtos" className="font-space text-sm font-bold uppercase text-starteq-gold hover:underline">
            Ver produtos →
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-3">
            {items.map((l) => (
              <div key={l.sku} className="flex items-center gap-3 rounded-xl border border-starteq-line bg-starteq-card p-4">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-starteq-bone">{l.name}</div>
                  <div className="font-mono text-xs text-starteq-muted">{brl(l.price)}</div>
                </div>
                <input
                  type="number"
                  min={1}
                  value={l.qty}
                  onChange={(e) => setQty(l.sku, parseInt(e.target.value) || 1)}
                  className="w-14 rounded-lg border border-starteq-line bg-starteq-black px-2 py-1.5 text-center text-sm text-starteq-bone outline-none focus:border-starteq-gold"
                  aria-label={`Quantidade de ${l.name}`}
                />
                <div className="w-24 text-right font-mono text-sm font-bold text-starteq-bone">{brl(l.price * l.qty)}</div>
                <button onClick={() => remove(l.sku)} className="text-sm font-bold text-red-400" aria-label={`Remover ${l.name}`}>
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="h-fit space-y-3 rounded-xl border border-starteq-line bg-starteq-card p-5">
            <div className="flex justify-between text-starteq-bone">
              <span>Total</span>
              <span className="font-mono font-bold">{brl(totalCents / 100)}</span>
            </div>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              className="w-full rounded-lg border border-starteq-line bg-starteq-black px-3 py-2.5 text-sm text-starteq-bone outline-none focus:border-starteq-gold"
            />
            <input
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              placeholder="WhatsApp / telefone"
              inputMode="tel"
              className="w-full rounded-lg border border-starteq-line bg-starteq-black px-3 py-2.5 text-sm text-starteq-bone outline-none focus:border-starteq-gold"
            />
            {err && <div className="text-xs text-red-400">{err}</div>}
            <button
              onClick={finalizar}
              disabled={busy}
              className="w-full rounded-lg bg-starteq-gold px-6 py-3 font-space text-sm font-bold uppercase text-starteq-black transition-all hover:bg-starteq-gold-dk disabled:opacity-50"
            >
              {busy ? "Enviando…" : "Finalizar pedido"}
            </button>
            <p className="text-center text-[11px] text-starteq-muted">
              O pedido é enviado pra loja confirmar. Pagamento e retirada/entrega combinados na confirmação.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
