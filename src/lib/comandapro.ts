// Ponte site → ComandaPRO (headless). O site é a VITRINE; o ComandaPRO é o ERP/fonte única.
// Catálogo e estoque vêm do sistema; a montagem do cliente vira uma OS lá.
// Base configurável: dev = localhost:3000; prod = https://comandapro.net.br (via env).
import { PRODUCTS } from "@/lib/catalog";
import type { Product, Category } from "@/lib/catalog";

const BASE = process.env.NEXT_PUBLIC_COMANDAPRO_API || "https://comandapro.net.br";
const SLUG = process.env.NEXT_PUBLIC_STARTEQ_SLUG || "starteq";

type ApiProduct = {
  sku: string; name: string; category: string; brand: string | null;
  priceCents: number; pixPriceCents?: number; stock: number; specs: Record<string, unknown>;
  badge?: Product["badge"]; highlight?: boolean;
};

/** Catálogo da loja, lido do ComandaPRO. Mapeia pro shape Product do site. */
export async function getProducts(): Promise<Product[]> {
  try {
    const r = await fetch(`${BASE}/api/loja/${SLUG}/produtos`, { cache: "no-store" });
    if (!r.ok) return PRODUCTS; // backend fora → catálogo estático (nunca vitrine vazia)
    const d = await r.json();
    const mapped = ((d.products as ApiProduct[]) ?? []).map((p) => ({
      sku: p.sku,
      slug: p.sku,
      name: p.name,
      category: p.category as Category,
      brand: p.brand ?? "",
      price: p.priceCents / 100,
      pix_price: (p.pixPriceCents ?? p.priceCents) / 100,
      stock: p.stock,
      image: `/products/${p.category}.svg`,
      specs: p.specs as Product["specs"],
      highlight: p.highlight,
      badge: p.badge,
    }));
    // ComandaPRO com dado real ganha; só cai no snapshot quando vier vazio
    return mapped.length > 0 ? mapped : PRODUCTS;
  } catch {
    return PRODUCTS;
  }
}

// Helpers async (espelham os do catalog.ts, mas leem do ComandaPRO). Cada página busca 1x.
export async function productsByBadge(badge: Product["badge"]): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.badge === badge && p.stock > 0);
}
export async function productsByCategory(c: Category): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.category === c && p.stock > 0);
}
export async function productsHighlight(): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.highlight && p.stock > 0);
}
export async function findProductBySlug(slug: string): Promise<Product | undefined> {
  return (await getProducts()).find((p) => p.slug === slug);
}

/** Envia o build do cliente pro ComandaPRO → vira uma OS de montagem (pendente). */
export async function postMontagem(
  skus: string[],
  customerName?: string,
  customerPhone?: string,
): Promise<{ ok: boolean; osId?: string; code?: string; error?: string }> {
  try {
    const r = await fetch(`${BASE}/api/loja/${SLUG}/montagem`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skus, customerName, customerPhone }),
    });
    return await r.json();
  } catch {
    return { ok: false, error: "sem conexão com o sistema" };
  }
}

// Carrinho → pedido: o cliente compra produtos avulsos; vira um pedido "recebido" no ComandaPRO
// que o balcão confirma. Preço é resolvido no servidor (só mandamos sku + qty).
export async function postPedido(
  items: { sku: string; qty: number }[],
  customerName?: string,
  customerPhone?: string,
): Promise<{ ok: boolean; display?: string; code?: string; error?: string }> {
  try {
    const r = await fetch(`${BASE}/api/loja/${SLUG}/pedido`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, customerName, customerPhone }),
    });
    return await r.json();
  } catch {
    return { ok: false, error: "sem conexão com o sistema" };
  }
}
