import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { ProductImage } from "./ProductImage";

type ProductCardProps = {
  product: Product;
  size?: "default" | "large";
};

const BADGE_STYLES: Record<NonNullable<Product["badge"]>, string> = {
  "Lançamento": "bg-starteq-gold/15 text-starteq-gold border-starteq-gold/40",
  "Mais Vendido": "bg-starteq-pix/15 text-starteq-pix border-starteq-pix/40",
  "Promo": "bg-starteq-red/15 text-starteq-red border-starteq-red/40",
  "OpenBox": "bg-orange-500/15 text-orange-400 border-orange-400/40",
  "Pichau Style": "bg-purple-500/15 text-purple-400 border-purple-400/40",
};

export function ProductCard({ product, size = "default" }: ProductCardProps) {
  const discount = product.price > product.pix_price
    ? Math.round(((product.price - product.pix_price) / product.price) * 100)
    : 0;

  const imageUrl = (product.specs.image_url as string | undefined) || undefined;

  return (
    <Link
      href={`/produtos/${product.slug}`}
      data-tilt
      className={`group bg-starteq-card border border-starteq-line hover:border-starteq-gold/40 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-starteq-gold/10 flex flex-col ${
        size === "large" ? "min-h-[480px]" : ""
      }`}
    >
      <div className="relative">
        <ProductImage
          url={imageUrl}
          category={product.category}
          alt={product.name}
          product={product}
          className={size === "large" ? "aspect-[4/3]" : "aspect-square"}
        />
        {product.badge && (
          <div className={`absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] font-space font-bold uppercase tracking-wider border ${BADGE_STYLES[product.badge]}`}>
            {product.badge}
          </div>
        )}
        {discount > 0 && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded text-xs font-space font-black bg-starteq-gold text-starteq-black shadow-lg shadow-starteq-gold/20">
            -{discount}% OFF
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-starteq-black/70 flex items-center justify-center">
            <span className="px-3 py-1.5 rounded font-space font-bold text-xs uppercase tracking-wider bg-starteq-red/90 text-white">
              Esgotado
            </span>
          </div>
        )}
        {product.stock > 0 && (
          <div className="absolute bottom-3 left-3 flex flex-col items-start gap-1.5">
            {product.category === "computadores" && !product.name.toLowerCase().includes("notebook") && (
              <span className="px-2 py-0.5 rounded text-[10px] font-space font-bold uppercase tracking-wider bg-starteq-black/80 border border-starteq-gold/40 text-starteq-gold backdrop-blur-sm">
                Montado e testado
              </span>
            )}
            {product.stock <= 5 && (
              <span className="px-2 py-0.5 rounded text-[10px] font-space font-bold uppercase tracking-wider bg-starteq-warn/90 text-starteq-black">
                Últimas {product.stock} un.
              </span>
            )}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="text-[10px] text-starteq-muted uppercase tracking-wider font-space font-bold mb-1">
          {product.brand}
        </div>
        <h3 className={`font-display font-semibold text-starteq-bone group-hover:text-starteq-gold transition-colors leading-snug flex-1 ${
          size === "large" ? "text-base" : "text-sm"
        }`}>
          {product.name}
        </h3>

        <div className="mt-4 pt-3 border-t border-starteq-line">
          {product.price > product.pix_price && (
            <div className="text-xs text-starteq-muted line-through font-mono">
              R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
          )}
          <div className="font-mono font-bold text-xl text-starteq-pix leading-none">
            R$ {product.pix_price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-starteq-muted uppercase tracking-wider font-bold mt-1">
            à vista no PIX
          </div>
          {product.price > product.pix_price && (
            <div className="text-[10px] text-starteq-pix font-bold mt-0.5">
              economia de R$ {(product.price - product.pix_price).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
          )}
          <div className="text-xs text-starteq-text mt-1.5">
            ou 10x de R$ {(product.price / 10).toFixed(2)} <span className="text-starteq-muted">sem juros</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
