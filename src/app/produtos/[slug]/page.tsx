import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { Icon, type IconName } from "@/components/Icon";
import { PRODUCTS } from "@/lib/catalog";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!p) return { title: "Produto não encontrado" };
  return {
    title: `${p.name} · Starteq Tocantins`,
    description: `${p.brand} · R$ ${p.pix_price.toFixed(2)} à vista PIX · entrega same-day em Palmas`,
  };
}

const BADGE_STYLES: Record<string, string> = {
  "Lançamento": "bg-starteq-gold/15 text-starteq-gold border-starteq-gold/40",
  "Mais Vendido": "bg-starteq-pix/15 text-starteq-pix border-starteq-pix/40",
  "Promo": "bg-starteq-red/15 text-starteq-red border-starteq-red/40",
  "OpenBox": "bg-orange-500/15 text-orange-400 border-orange-400/40",
};

export default async function ProdutoPage({ params }: Params) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.sku !== product.sku
  ).slice(0, 4);

  const whatsappLink = `https://wa.me/5563992528619?text=${encodeURIComponent(
    `Oi! Tenho interesse no ${product.name} (SKU ${product.sku}). Qual a disponibilidade?`
  )}`;

  const discount = product.price > product.pix_price
    ? Math.round(((product.price - product.pix_price) / product.price) * 100)
    : 0;

  return (
    <>
      <Header />
      <main className="flex-1 bg-starteq-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <nav className="text-xs text-starteq-muted mb-6 font-space font-bold uppercase tracking-wider">
            <Link href="/" className="hover:text-starteq-gold">Início</Link>
            <span className="mx-2 text-starteq-line">/</span>
            <Link href="/produtos" className="hover:text-starteq-gold">Produtos</Link>
            <span className="mx-2 text-starteq-line">/</span>
            <Link href={`/produtos/categoria/${product.category}`} className="hover:text-starteq-gold capitalize">
              {product.category}
            </Link>
          </nav>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12">
            {/* GALERIA */}
            <div>
              <div className="relative bg-starteq-card border border-starteq-line rounded-2xl overflow-hidden">
                <ProductImage
                  category={product.category}
                  product={product}
                  alt={product.name}
                  className="aspect-square"
                />
                {product.badge && (
                  <div className={`absolute top-4 left-4 px-3 py-1.5 rounded text-xs font-space font-bold uppercase tracking-wider border ${BADGE_STYLES[product.badge] ?? "bg-starteq-card border-starteq-line"}`}>
                    {product.badge}
                  </div>
                )}
                {discount > 0 && (
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded text-sm font-space font-black bg-starteq-pix text-white">
                    -{discount}%
                  </div>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2 mt-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`aspect-square rounded-lg border ${i === 1 ? "border-starteq-gold" : "border-starteq-line"} bg-starteq-card overflow-hidden`}>
                    <ProductImage category={product.category} product={product} alt={`${product.name} foto ${i}`} className="w-full h-full opacity-70 hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>

            {/* INFO + PREÇO */}
            <div>
              <div className="text-xs text-starteq-muted uppercase tracking-[0.2em] font-space font-bold mb-2">
                {product.brand}
              </div>
              <h1 className="font-space text-2xl lg:text-4xl font-black text-starteq-bone leading-tight mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-4 text-sm">
                <span className="text-starteq-muted font-mono">SKU {product.sku}</span>
                <span className="text-starteq-line">·</span>
                {product.stock > 0 ? (
                  <span className="inline-flex items-center gap-2 text-starteq-pix">
                    <span className="w-2 h-2 rounded-full bg-starteq-pix animate-pulse" />
                    Em estoque · {product.stock} un
                  </span>
                ) : (
                  <span className="text-starteq-red">Esgotado</span>
                )}
              </div>

              <div className="bg-starteq-card border border-starteq-line rounded-xl p-6 mb-5">
                {discount > 0 && (
                  <div className="text-sm text-starteq-muted line-through font-mono">
                    De R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </div>
                )}
                <div className="text-xs text-starteq-muted uppercase tracking-wider font-space font-bold mb-1">
                  a partir de
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono font-black text-5xl text-starteq-pix">
                    R$ {product.pix_price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="text-sm text-starteq-pix mt-1 font-space font-bold uppercase tracking-wider">
                  no PIX com {discount > 0 ? `${discount}%` : "15%"} de desconto
                </div>
                <div className="border-t border-starteq-line my-4" />
                <div className="text-sm text-starteq-text">
                  Ou R$ <span className="font-mono">{product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="text-sm text-starteq-text mt-0.5">
                  Em até <strong className="text-starteq-bone font-mono">10x de R$ {(product.price / 10).toFixed(2)}</strong> sem juros
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-starteq-pix text-white hover:opacity-90 font-space font-bold tracking-wide uppercase text-sm px-6 py-4 rounded-lg transition-all"
                >
                  <Icon name="whatsapp" size={18} /> Comprar pelo WhatsApp
                </a>
                <Link
                  href="/carrinho"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-space font-bold tracking-wide uppercase text-sm px-6 py-4 rounded-lg transition-all"
                >
                  Adicionar ao carrinho
                </Link>
              </div>

              {/* Selos institucionais compactos · padrão Pichau */}
              <div className="grid grid-cols-3 gap-2 mb-6 text-center text-xs">
                <Seal icon="wrench" title="Montagem" sub="Certificada" />
                <Seal icon="bike" title="Same-day" sub="Em Palmas" />
                <Seal icon="shield" title="Garantia" sub="Por peça · NF" />
              </div>

              {/* Specs */}
              <div className="bg-starteq-coal border border-starteq-line rounded-xl p-5">
                <h3 className="font-space font-bold text-starteq-bone text-sm uppercase tracking-wider mb-3">
                  Especificações
                </h3>
                <dl className="space-y-2 text-sm">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-3 py-1 border-b border-starteq-line/50 last:border-0">
                      <dt className="text-starteq-muted capitalize">{k.replace(/_/g, " ")}</dt>
                      <dd className="text-starteq-bone font-mono text-right">{Array.isArray(v) ? v.join(" · ") : String(v)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          {/* 3 CARDS GIGANTES institucionais · padrão Pichau */}
          <section className="mt-16 grid md:grid-cols-3 gap-4">
            <BigSeal
              icon="wrench"
              title="Montagem"
              text="Acompanha BIOS e drivers atualizados. Todos os cabos são posicionados pela parte traseira do gabinete, dando uma aparência limpa e profissional."
            />
            <BigSeal
              icon="package"
              title="Entrega"
              text="Embalado com caixa de papelão de ondas duplas exclusiva e fitas de segurança com cola quimicamente ativa. Motoboy mesmo dia em Palmas."
            />
            <BigSeal
              icon="shield"
              title="Garantia"
              text="A garantia é por peça, o prazo será indicado na nota fiscal. Não acompanha lacre, portanto você pode abrir o gabinete e modificar como quiser."
            />
          </section>

          {/* RELACIONADOS */}
          {related.length > 0 && (
            <section className="mt-20">
              <h2 className="font-space text-2xl lg:text-3xl font-black text-starteq-bone mb-6">
                Você também pode gostar
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {related.map((p) => (
                  <ProductCard key={p.sku} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function Seal({ icon, title, sub }: { icon: IconName; title: string; sub: string }) {
  return (
    <div className="bg-starteq-card border border-starteq-line rounded-lg p-3">
      <div className="text-starteq-gold font-space font-bold text-sm flex items-center justify-center gap-1.5">
        <Icon name={icon} size={14} /> {title}
      </div>
      <div className="text-starteq-muted mt-1 text-[10px] uppercase tracking-wider font-space font-bold">{sub}</div>
    </div>
  );
}

function BigSeal({ icon, title, text }: { icon: IconName; title: string; text: string }) {
  return (
    <div className="bg-starteq-card border border-starteq-line hover:border-starteq-gold/40 rounded-xl p-8 transition-all">
      <div className="w-16 h-16 rounded-full bg-starteq-gold/10 border-2 border-starteq-gold/30 flex items-center justify-center mb-4">
        <Icon name={icon} size={32} className="text-starteq-gold" />
      </div>
      <h3 className="font-space font-bold text-xl text-starteq-bone mb-3">{title}</h3>
      <p className="text-sm text-starteq-muted leading-relaxed">{text}</p>
    </div>
  );
}
