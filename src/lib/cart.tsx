"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// Carrinho do cliente (client-side, persiste no localStorage). O pedido em si é criado no ComandaPRO
// via postPedido no checkout — aqui só guardamos a seleção enquanto o cliente navega.
export type CartItem = { sku: string; name: string; price: number; qty: number };

type CartCtx = {
  items: CartItem[];
  add: (item: { sku: string; name: string; price: number }, qty?: number) => void;
  setQty: (sku: string, qty: number) => void;
  remove: (sku: string) => void;
  clear: () => void;
  count: number;
  totalCents: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "starteq_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  // hidrata do localStorage só no cliente (evita mismatch de SSR)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignora storage corrompido */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* storage cheio/indisponível */
    }
  }, [items, ready]);

  function add(item: { sku: string; name: string; price: number }, qty = 1) {
    setItems((c) => {
      const i = c.findIndex((l) => l.sku === item.sku);
      if (i >= 0) {
        const n = [...c];
        n[i] = { ...n[i], qty: n[i].qty + qty };
        return n;
      }
      return [...c, { ...item, qty }];
    });
  }
  function setQty(sku: string, qty: number) {
    setItems((c) => c.map((l) => (l.sku === sku ? { ...l, qty: Math.max(1, qty) } : l)));
  }
  function remove(sku: string) {
    setItems((c) => c.filter((l) => l.sku !== sku));
  }
  function clear() {
    setItems([]);
  }

  const count = items.reduce((n, l) => n + l.qty, 0);
  const totalCents = items.reduce((n, l) => n + Math.round(l.price * 100) * l.qty, 0);

  return <Ctx.Provider value={{ items, add, setQty, remove, clear, count, totalCents }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart precisa estar dentro do CartProvider");
  return c;
}
