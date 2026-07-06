"use client";
import { useCart } from "@/lib/cart";

// Contador do ícone de carrinho no Header (client — o Header em si é server).
export function CartBadge() {
  const { count } = useCart();
  if (!count) return null;
  return (
    <span className="absolute -top-0.5 -right-0.5 grid h-4 min-w-[16px] place-items-center rounded-full bg-starteq-gold px-1 text-[10px] font-bold text-starteq-black">
      {count}
    </span>
  );
}
