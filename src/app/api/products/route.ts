import { NextResponse } from "next/server";
import { PRODUCTS, type Category } from "@/lib/catalog";

// GET /api/products
// GET /api/products?category=cpu
// GET /api/products?category=gpu&page=1&limit=20
//
// Endpoint público pra IA do Júnior consumir estoque em tempo real
// Quando o site novo entrar no ar, a IA dele para de mandar pro Kabum
// porque agora ela sabe o que tem no estoque DA STARTEQ.

export async function GET(req: Request) {
  const url = new URL(req.url);
  const category = url.searchParams.get("category") as Category | null;
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const limit = Math.min(100, Math.max(1, Number(url.searchParams.get("limit") ?? 50)));

  let items = PRODUCTS;

  if (category) {
    items = items.filter((p) => p.category === category);
  }

  const total = items.length;
  const start = (page - 1) * limit;
  const paged = items.slice(start, start + limit);

  return NextResponse.json(
    {
      meta: {
        total,
        page,
        limit,
        has_more: start + limit < total,
      },
      data: paged.map((p) => ({
        sku: p.sku,
        slug: p.slug,
        name: p.name,
        category: p.category,
        brand: p.brand,
        price: p.price,
        pix_price: p.pix_price,
        in_stock: p.stock > 0,
        stock: p.stock,
        specs: p.specs,
        url: `/produtos/${p.slug}`,
      })),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        // CORS aberto pra IA dele consumir direto
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
    }
  );
}
