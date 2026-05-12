import { NextResponse } from "next/server";
import { findProduct } from "@/lib/catalog";

// GET /api/products/CPU-AMD-7600
// Retorna produto único pra IA referenciar SKU específico

type Params = { params: Promise<{ sku: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { sku } = await params;
  const p = findProduct(sku);

  if (!p) {
    return NextResponse.json({ error: "Produto não encontrado", sku }, { status: 404 });
  }

  return NextResponse.json(
    {
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
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
