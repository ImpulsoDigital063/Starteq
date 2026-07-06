// Ponte site → ComandaPRO (headless). O site é a VITRINE; o ComandaPRO é o ERP/fonte única.
// Catálogo e estoque vêm do sistema; a montagem do cliente vira uma OS lá.
// Base configurável: dev = localhost:3000; prod = https://comandapro.net.br (via env).
import type { Product, Category } from "@/lib/catalog";

const BASE = process.env.NEXT_PUBLIC_COMANDAPRO_API || "http://localhost:3000";
const SLUG = process.env.NEXT_PUBLIC_STARTEQ_SLUG || "starteq";

type ApiProduct = {
  sku: string; name: string; category: string; brand: string | null;
  priceCents: number; stock: number; specs: Record<string, unknown>;
};

/** Catálogo da loja, lido do ComandaPRO. Mapeia pro shape Product do site. */
export async function getProducts(): Promise<Product[]> {
  try {
    const r = await fetch(`${BASE}/api/loja/${SLUG}/produtos`, { cache: "no-store" });
    if (!r.ok) return [];
    const d = await r.json();
    return ((d.products as ApiProduct[]) ?? []).map((p) => ({
      sku: p.sku,
      slug: p.sku,
      name: p.name,
      category: p.category as Category,
      brand: p.brand ?? "",
      price: p.priceCents / 100,
      pix_price: p.priceCents / 100,
      stock: p.stock,
      image: `/products/${p.category}.svg`,
      specs: p.specs as Product["specs"],
    }));
  } catch {
    return [];
  }
}

/** Envia o build do cliente pro ComandaPRO → vira uma OS de montagem (pendente). */
export async function postMontagem(
  skus: string[],
  customerName?: string,
  customerPhone?: string,
): Promise<{ ok: boolean; osId?: string; error?: string }> {
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
