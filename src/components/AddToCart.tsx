"use client";
import { useState } from "react";
import { useCart } from "@/lib/cart";

// Botão "Adicionar ao carrinho" da página do produto. Só precisa de sku/nome/preço.
export function AddToCart({ sku, name, price }: { sku: string; name: string; price: number }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        add({ sku, name, price });
        setAdded(true);
        setTimeout(() => setAdded(false), 1600);
      }}
      className="flex-1 inline-flex items-center justify-center gap-2 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-space font-bold tracking-wide uppercase text-sm px-6 py-4 rounded-lg transition-all"
    >
      {added ? "Adicionado ✓" : "Adicionar ao carrinho"}
    </button>
  );
}
