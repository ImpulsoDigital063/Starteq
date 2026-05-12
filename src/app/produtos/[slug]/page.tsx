import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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

export default async function ProdutoPage({ params }: Params) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.sku !== product.sku
  ).slice(0, 3);

  const whatsappLink = `https://wa.me/5563992528619?text=${encodeURIComponent(
    `Oi! Tenho interesse no ${product.name} (SKU ${product.sku}). Qual a disponibilidade?`
  )}`;

  return (
    <>
      <Header />
      <main className="flex-1 bg-starteq-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="text-xs text-starteq-muted mb-6 font-mono">
            <Link href="/" className="hover:text-starteq-gold">início</Link>
            <span className="mx-2">/</span>
            <Link href="/produtos" className="hover:text-starteq-gold">produtos</Link>
            <span className="mx-2">/</span>
            <Link href={`/produtos/categoria/${product.category}`} className="hover:text-starteq-gold">
              {product.category}
            </Link>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="aspect-square bg-starteq-coal border border-starteq-line rounded-2xl flex items-center justify-center text-starteq-line text-2xl font-mono">
                {product.category.toUpperCase()}
              </div>
            </div>

            <div>
              <div className="text-xs text-starteq-muted uppercase tracking-[0.2em] font-display font-semibold">
                {product.brand}
              </div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-starteq-bone mt-2 leading-tight">
                {product.name}
              </h1>

              <div className="mt-6 flex items-center gap-3">
                {product.stock > 0 ? (
                  <span className="inline-flex items-center gap-2 text-sm text-starteq-green">
                    <span className="w-2 h-2 rounded-full bg-starteq-green animate-pulse" />
                    Em estoque · {product.stock} unidade{product.stock > 1 ? "s" : ""}
                  </span>
                ) : (
                  <span className="text-sm text-starteq-red">Esgotado</span>
                )}
              </div>

              <div className="mt-6 bg-starteq-card border border-starteq-line rounded-xl p-6">
                {product.pix_price < product.price && (
                  <div className="text-sm text-starteq-muted line-through">
                    De R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </div>
                )}
                <div className="flex items-baseline gap-3">
                  <span className="font-mono font-bold text-4xl text-starteq-gold">
                    R$ {product.pix_price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-sm text-starteq-muted">à vista PIX</span>
                </div>
                <div className="text-sm text-starteq-text mt-2">
                  ou <span className="font-mono">10x de R$ {(product.price / 10).toFixed(2)}</span> sem juros
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-display font-bold tracking-wide uppercase text-sm px-6 py-4 rounded-lg transition-all border-glow-gold"
                >
                  Comprar pelo WhatsApp
                </a>
                <Link
                  href="/carrinho"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-starteq-card border border-starteq-line hover:border-starteq-gold/40 text-starteq-bone font-display font-semibold tracking-wide uppercase text-sm px-6 py-4 rounded-lg transition-all"
                >
                  Adicionar ao carrinho
                </Link>
              </div>

              <div className="mt-8 bg-starteq-coal border border-starteq-line rounded-xl p-5">
                <h3 className="font-display font-bold text-starteq-bone text-sm uppercase tracking-wider mb-3">
                  Especificações
                </h3>
                <dl className="space-y-2 text-sm">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-3 py-1 border-b border-starteq-line/50 last:border-0">
                      <dt className="text-starteq-muted capitalize">{k.replace(/_/g, " ")}</dt>
                      <dd className="text-starteq-bone font-mono">{String(v)}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs">
                <div className="bg-starteq-card border border-starteq-line rounded-lg p-3">
                  <div className="text-starteq-gold font-display font-bold text-sm">🛵 Same-day</div>
                  <div className="text-starteq-muted mt-1">Palmas</div>
                </div>
                <div className="bg-starteq-card border border-starteq-line rounded-lg p-3">
                  <div className="text-starteq-gold font-display font-bold text-sm">🛡️ Garantia</div>
                  <div className="text-starteq-muted mt-1">Original</div>
                </div>
                <div className="bg-starteq-card border border-starteq-line rounded-lg p-3">
                  <div className="text-starteq-gold font-display font-bold text-sm">📄 NF-e</div>
                  <div className="text-starteq-muted mt-1">Sempre</div>
                </div>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-20">
              <h2 className="font-display text-2xl font-bold text-starteq-bone mb-6">
                Você também pode gostar
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map((p) => (
                  <Link
                    key={p.sku}
                    href={`/produtos/${p.slug}`}
                    className="group bg-starteq-card border border-starteq-line hover:border-starteq-gold/40 rounded-xl p-5 transition-all"
                  >
                    <div className="aspect-square bg-starteq-coal rounded-lg mb-3 flex items-center justify-center text-starteq-line text-xs font-mono">
                      {p.category.toUpperCase()}
                    </div>
                    <div className="text-xs text-starteq-muted uppercase tracking-wider">{p.brand}</div>
                    <div className="font-display font-semibold text-starteq-bone group-hover:text-starteq-gold text-sm leading-snug mt-1">
                      {p.name}
                    </div>
                    <div className="mt-3 font-mono font-bold text-starteq-gold">
                      R$ {p.pix_price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </div>
                  </Link>
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
