import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { PRODUCTS } from "@/lib/catalog";
import { ProdutoEditClient } from "../ProdutoEditClient";

type Params = { params: Promise<{ sku: string }> };

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ sku: p.sku }));
}

export default async function ProdutoEditPage({ params }: Params) {
  const { sku } = await params;
  const product = PRODUCTS.find((p) => p.sku === sku);
  if (!product) notFound();

  return (
    <>
      <Link href="/admin/produtos" className="inline-flex items-center gap-1 text-xs text-starteq-muted hover:text-starteq-gold mb-4 font-space font-bold uppercase tracking-wider">
        <Icon name="arrow-right" size={12} className="rotate-180" /> Voltar pra lista
      </Link>

      <header className="mb-6">
        <div className="text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-1">
          Editar produto
        </div>
        <h1 className="font-space text-2xl lg:text-3xl font-black text-starteq-bone">{product.name}</h1>
        <div className="text-starteq-muted text-sm mt-1 font-mono">{product.sku} · {product.brand}</div>
      </header>

      <ProdutoEditClient product={product} />
    </>
  );
}
