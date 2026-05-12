import { NextResponse } from "next/server";
import { findProduct, type Product, type Category } from "@/lib/catalog";
import { validateBuild, buildTotal, buildWhatsAppLink, type Build } from "@/lib/compatibility";

// POST /api/quote
// body: { parts: ["CPU-AMD-7600", "MB-GB-B650M-AE", ...] }
// resp: { compatible, total, total_retail, parts_detail, issues, whatsapp_link }
//
// IA do Júnior monta orçamento programaticamente.
// Cliente envia "monta um PC pra rodar Valorant", IA seleciona SKUs e chama
// esse endpoint pra validar + receber link WhatsApp pronto.

export async function POST(req: Request) {
  let body: { parts?: string[] } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const skus = body.parts ?? [];
  if (!Array.isArray(skus) || skus.length === 0) {
    return NextResponse.json({ error: "Forneça um array 'parts' com pelo menos 1 SKU" }, { status: 400 });
  }

  // Monta o build agrupado por categoria
  const build: Build = {};
  const notFound: string[] = [];
  for (const sku of skus) {
    const p = findProduct(sku);
    if (!p) {
      notFound.push(sku);
      continue;
    }
    build[p.category] = p;
  }

  if (notFound.length > 0) {
    return NextResponse.json(
      { error: "Alguns SKUs não foram encontrados", not_found: notFound },
      { status: 400 }
    );
  }

  const issues = validateBuild(build);
  const total = buildTotal(build);
  const total_retail = buildTotal(build, false);
  const whatsapp_link = buildWhatsAppLink(build);

  const parts_detail = (Object.entries(build) as [Category, Product][]).map(([cat, p]) => ({
    category: cat,
    sku: p.sku,
    name: p.name,
    pix_price: p.pix_price,
    price: p.price,
  }));

  return NextResponse.json(
    {
      compatible: issues.filter((i) => i.type === "error").length === 0,
      total,
      total_retail,
      installments: { count: 10, value: Number((total_retail / 10).toFixed(2)) },
      parts_detail,
      issues,
      whatsapp_link,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
