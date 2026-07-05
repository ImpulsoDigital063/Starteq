"use client";

import { useState, useMemo } from "react";
import { Icon } from "@/components/Icon";
import { PRODUCTS, type Product } from "@/lib/catalog";
import { CUSTOMERS, type Customer } from "@/lib/admin-mock";

type CartItem = {
  sku: string;
  name: string;
  unit_price: number;
  qty: number;
  stock: number;
};

type Method = "pix" | "dinheiro" | "cartao";

export function VendaBalcaoButton({ hasOpenSession }: { hasOpenSession: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={!hasOpenSession}
        className="w-full inline-flex items-center gap-2 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk disabled:bg-starteq-line disabled:text-starteq-muted disabled:cursor-not-allowed font-space font-black uppercase text-xs px-4 py-3 rounded-lg"
        title={hasOpenSession ? "Registrar venda no balcão" : "Abra o caixa primeiro"}
      >
        <Icon name="shopping-cart" size={14} />
        Venda balcão
      </button>
      {open && <VendaBalcaoModal onClose={() => setOpen(false)} />}
    </>
  );
}

function VendaBalcaoModal({ onClose }: { onClose: () => void }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [productSearch, setProductSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [customerSearch, setCustomerSearch] = useState("");
  const [showCustomerSearch, setShowCustomerSearch] = useState(false);
  const [method, setMethod] = useState<Method>("dinheiro");
  const [submitted, setSubmitted] = useState<null | { id: string; ops: string[] }>(null);

  const productMatches = useMemo(() => {
    if (!productSearch.trim()) return [];
    const q = productSearch.toLowerCase();
    return PRODUCTS
      .filter((p) => p.stock > 0)
      .filter((p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q))
      .slice(0, 6);
  }, [productSearch]);

  const customerMatches = useMemo(() => {
    if (!customerSearch.trim()) return [];
    const q = customerSearch.toLowerCase();
    return CUSTOMERS
      .filter((c) => c.name.toLowerCase().includes(q) || c.phone.includes(q))
      .slice(0, 5);
  }, [customerSearch]);

  function addProduct(p: Product) {
    setCart((prev) => {
      const existing = prev.find((c) => c.sku === p.sku);
      if (existing) {
        if (existing.qty >= p.stock) return prev;
        return prev.map((c) => (c.sku === p.sku ? { ...c, qty: c.qty + 1 } : c));
      }
      // Em balcão, PIX já tem desconto. Aqui o unit_price padrão é o preço cheio · ajuste por método na hora do total.
      return [...prev, { sku: p.sku, name: p.name, unit_price: p.price, qty: 1, stock: p.stock }];
    });
    setProductSearch("");
    setShowSearch(false);
  }

  function changeQty(sku: string, delta: number) {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.sku !== sku) return c;
          const next = c.qty + delta;
          if (next < 1) return c;
          if (next > c.stock) return c;
          return { ...c, qty: next };
        })
    );
  }

  function removeItem(sku: string) {
    setCart((prev) => prev.filter((c) => c.sku !== sku));
  }

  const subtotal = cart.reduce((s, c) => s + c.unit_price * c.qty, 0);
  // PIX 15% off à vista · cartão e dinheiro mantêm preço cheio (operação manual de loja)
  const total = method === "pix" ? subtotal * 0.85 : subtotal;
  const desconto = subtotal - total;

  function confirmar() {
    if (cart.length === 0) return;
    const orderId = `ORD-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    const ops: string[] = [];
    ops.push(`Order ${orderId} criado · origin=balcao · ${cart.length} item(s) · total ${brl(total)}`);
    ops.push(`Payment ${method} ${method === "cartao" ? "previsto (D+30)" : "recebido"} · ${brl(total)}`);
    cart.forEach((c) => ops.push(`StockMovement saída · ${c.sku} · −${c.qty} un`));
    if (method === "dinheiro") {
      ops.push(`CashMovement venda · ${brl(total)} · amarrado à sessão aberta`);
    }
    setSubmitted({ id: orderId, ops });
  }

  if (submitted) {
    return (
      <Modal onClose={onClose}>
        <div className="text-center mb-4">
          <Icon name="check" size={32} className="text-starteq-pix mx-auto mb-2" />
          <h2 className="font-space font-black text-starteq-bone text-lg">Venda registrada</h2>
          <p className="text-starteq-muted text-sm">{submitted.id} · {brl(total)} via {method.toUpperCase()}</p>
        </div>
        <div className="bg-starteq-coal border border-starteq-line rounded-lg p-3 mb-4">
          <div className="text-[10px] uppercase tracking-wider font-space font-bold text-starteq-muted mb-2">
            Operações no mock
          </div>
          <ul className="space-y-1 text-xs font-mono text-starteq-text">
            {submitted.ops.map((o, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-starteq-pix">✓</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={onClose}
          className="w-full bg-starteq-gold text-starteq-black font-space font-black uppercase text-xs px-4 py-3 rounded-lg hover:bg-starteq-gold-dk"
        >
          Fechar
        </button>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-space font-black text-xl text-starteq-bone inline-flex items-center gap-2">
          <Icon name="shopping-cart" size={20} className="text-starteq-gold" />
          Venda balcão
        </h2>
        <button onClick={onClose} className="text-starteq-muted hover:text-starteq-bone">
          <Icon name="x" size={20} />
        </button>
      </div>

      {/* PRODUTOS */}
      <div className="mb-4">
        <label className="block text-[10px] uppercase tracking-wider font-space font-bold text-starteq-muted mb-1">
          Produtos
        </label>
        <div className="relative">
          <input
            value={productSearch}
            onChange={(e) => {
              setProductSearch(e.target.value);
              setShowSearch(true);
            }}
            onFocus={() => setShowSearch(true)}
            placeholder="Buscar por nome ou SKU…"
            className="w-full bg-starteq-coal border border-starteq-line rounded-lg px-3 py-2.5 text-starteq-bone text-sm outline-none focus:border-starteq-gold placeholder:text-starteq-muted"
          />
          {showSearch && productMatches.length > 0 && (
            <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-starteq-coal border border-starteq-line rounded-lg shadow-xl max-h-60 overflow-y-auto">
              {productMatches.map((p) => (
                <button
                  key={p.sku}
                  onClick={() => addProduct(p)}
                  className="w-full text-left px-3 py-2 hover:bg-starteq-card border-b border-starteq-line last:border-0"
                >
                  <div className="font-display font-semibold text-sm text-starteq-bone truncate">{p.name}</div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-starteq-muted font-mono">{p.sku}</span>
                    <span className="text-starteq-gold font-mono">{brl(p.price)} · {p.stock} un</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="mt-3 bg-starteq-coal border border-starteq-line rounded-lg divide-y divide-starteq-line">
            {cart.map((c) => (
              <div key={c.sku} className="px-3 py-2 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-starteq-bone truncate">{c.name}</div>
                  <div className="text-[10px] text-starteq-muted font-mono">
                    {c.sku} · {brl(c.unit_price)} un · estoque {c.stock}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => changeQty(c.sku, -1)}
                    className="w-6 h-6 rounded bg-starteq-card border border-starteq-line text-starteq-bone hover:border-starteq-gold/40"
                  >
                    −
                  </button>
                  <span className="font-mono text-sm text-starteq-bone w-8 text-center">{c.qty}</span>
                  <button
                    onClick={() => changeQty(c.sku, +1)}
                    disabled={c.qty >= c.stock}
                    className="w-6 h-6 rounded bg-starteq-card border border-starteq-line text-starteq-bone hover:border-starteq-gold/40 disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
                <div className="font-mono text-sm text-starteq-gold font-bold w-24 text-right">
                  {brl(c.unit_price * c.qty)}
                </div>
                <button
                  onClick={() => removeItem(c.sku)}
                  className="text-starteq-muted hover:text-starteq-red"
                >
                  <Icon name="x" size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CLIENTE */}
      <div className="mb-4">
        <label className="block text-[10px] uppercase tracking-wider font-space font-bold text-starteq-muted mb-1">
          Cliente (opcional)
        </label>
        {customer ? (
          <div className="bg-starteq-coal border border-starteq-line rounded-lg px-3 py-2 flex items-center justify-between">
            <div>
              <div className="text-sm text-starteq-bone">{customer.name}</div>
              <div className="text-xs text-starteq-muted">{customer.phone}</div>
            </div>
            <button onClick={() => setCustomer(null)} className="text-starteq-muted hover:text-starteq-red">
              <Icon name="x" size={14} />
            </button>
          </div>
        ) : (
          <div className="relative">
            <input
              value={customerSearch}
              onChange={(e) => {
                setCustomerSearch(e.target.value);
                setShowCustomerSearch(true);
              }}
              onFocus={() => setShowCustomerSearch(true)}
              placeholder="Buscar nome ou telefone… (deixe vazio = cliente avulso)"
              className="w-full bg-starteq-coal border border-starteq-line rounded-lg px-3 py-2.5 text-starteq-bone text-sm outline-none focus:border-starteq-gold placeholder:text-starteq-muted"
            />
            {showCustomerSearch && customerMatches.length > 0 && (
              <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-starteq-coal border border-starteq-line rounded-lg shadow-xl max-h-48 overflow-y-auto">
                {customerMatches.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setCustomer(c);
                      setCustomerSearch("");
                      setShowCustomerSearch(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-starteq-card border-b border-starteq-line last:border-0"
                  >
                    <div className="text-sm text-starteq-bone">{c.name}</div>
                    <div className="text-xs text-starteq-muted">{c.phone}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* MÉTODO PGTO */}
      <div className="mb-4">
        <label className="block text-[10px] uppercase tracking-wider font-space font-bold text-starteq-muted mb-1">
          Método de pagamento
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(["dinheiro", "pix", "cartao"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`px-3 py-2.5 rounded-lg border text-xs font-space font-bold uppercase tracking-wider ${
                method === m
                  ? "bg-starteq-gold/10 border-starteq-gold text-starteq-gold"
                  : "bg-starteq-coal border-starteq-line text-starteq-muted hover:border-starteq-gold/40"
              }`}
            >
              {m === "cartao" ? "Cartão" : m === "dinheiro" ? "Dinheiro" : "PIX"}
            </button>
          ))}
        </div>
        <div className="text-[10px] text-starteq-muted mt-1.5">
          {method === "pix" && "15% off à vista · cai direto na conta"}
          {method === "dinheiro" && "passa pelo caixa físico aberto"}
          {method === "cartao" && "cai na conta em D+30 · status previsto até lá"}
        </div>
      </div>

      {/* TOTAIS */}
      <div className="bg-starteq-coal border border-starteq-line rounded-lg p-3 mb-4 space-y-1.5">
        <div className="flex justify-between text-sm">
          <span className="text-starteq-muted">Subtotal</span>
          <span className="font-mono text-starteq-bone">{brl(subtotal)}</span>
        </div>
        {desconto > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-starteq-muted">Desconto PIX (15%)</span>
            <span className="font-mono text-starteq-pix">− {brl(desconto)}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-starteq-line pt-1.5">
          <span className="font-space font-bold text-starteq-bone uppercase text-xs tracking-wider">Total</span>
          <span className="font-mono font-black text-lg text-starteq-gold">{brl(total)}</span>
        </div>
      </div>

      <button
        onClick={confirmar}
        disabled={cart.length === 0}
        className="w-full bg-starteq-gold text-starteq-black font-space font-black uppercase text-xs px-4 py-3 rounded-lg hover:bg-starteq-gold-dk disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Icon name="check" size={14} className="inline mr-1.5 -mt-0.5" />
        Confirmar venda
      </button>
    </Modal>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-start lg:items-center justify-center p-4 overflow-y-auto">
      <div className="bg-starteq-card border border-starteq-gold/40 rounded-2xl w-full max-w-lg p-6 my-8" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
      <button onClick={onClose} className="fixed inset-0 -z-10" aria-label="Fechar" />
    </div>
  );
}

function brl(n: number) {
  return `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
