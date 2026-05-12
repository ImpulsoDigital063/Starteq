import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";
import { Icon, type IconName } from "./Icon";

type ProductShelfProps = {
  eyebrow: string;
  eyebrowIcon?: IconName;
  title: string;
  subtitle?: string;
  products: Product[];
  ctaHref?: string;
  ctaLabel?: string;
  accentColor?: "gold" | "red" | "purple" | "pix";
  highlightFirst?: boolean;
};

const ACCENT_STYLES: Record<NonNullable<ProductShelfProps["accentColor"]>, string> = {
  gold: "text-starteq-gold",
  red: "text-starteq-red",
  purple: "text-purple-400",
  pix: "text-starteq-pix",
};

export function ProductShelf({
  eyebrow,
  eyebrowIcon,
  title,
  subtitle,
  products,
  ctaHref,
  ctaLabel,
  accentColor = "gold",
  highlightFirst = false,
}: ProductShelfProps) {
  if (products.length === 0) return null;

  const accent = ACCENT_STYLES[accentColor];

  return (
    <section className="bg-starteq-black py-12 lg:py-16 border-b border-starteq-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div className="flex-1 min-w-0">
            <div className={`flex items-center gap-2 text-xs font-space font-bold tracking-[0.3em] uppercase mb-2 ${accent}`}>
              {eyebrowIcon && <Icon name={eyebrowIcon} size={14} />}
              {eyebrow}
            </div>
            <h2 className="font-space text-2xl lg:text-4xl font-black text-starteq-bone leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-starteq-muted mt-2 max-w-2xl">{subtitle}</p>
            )}
          </div>
          {ctaHref && (
            <Link
              href={ctaHref}
              className="hidden sm:inline-flex items-center gap-1 text-sm text-starteq-gold hover:text-starteq-bone font-space font-bold uppercase tracking-wider whitespace-nowrap flex-shrink-0"
            >
              {ctaLabel ?? "Ver tudo"} →
            </Link>
          )}
        </div>

        {highlightFirst && products.length > 0 ? (
          <div className="grid lg:grid-cols-[1.4fr_1fr_1fr] gap-4">
            <ProductCard product={products[0]} size="large" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:col-span-2 lg:grid-cols-3">
              {products.slice(1, 7).map((p) => (
                <ProductCard key={p.sku} product={p} />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.sku} product={p} />
            ))}
          </div>
        )}

        {ctaHref && (
          <div className="mt-8 sm:hidden text-center">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-1 text-sm text-starteq-gold font-space font-bold uppercase tracking-wider"
            >
              {ctaLabel ?? "Ver tudo"} →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
