import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PRODUCTS, type Category } from "@/lib/catalog";

const VALID: Record<string, { label: string; intro: string }> = {
  cpu: { label: "Processadores", intro: "AMD e Intel · validados peça a peça" },
  mobo: { label: "Placas-mãe", intro: "Compatíveis com seu processador" },
  gpu: { label: "Placas de vídeo", intro: "RTX 4060 a 5070 · NVIDIA e AMD" },
  ram: { label: "Memória RAM", intro: "DDR4 e DDR5 das melhores marcas" },
  fonte: { label: "Fontes", intro: "Calculadas pra sua build" },
  perifericos: { label: "Periféricos", intro: "Mouse · teclado · monitor · gabinete" },
  computadores: { label: "Computadores", intro: "PCs prontos curados" },
};

type Params = { params: Promise<{ c: string }> };

export async function generateStaticParams() {
  return Object.keys(VALID).map((c) => ({ c }));
}

export async function generateMetadata({ params }: Params) {
  const { c } = await params;
  const meta = VALID[c];
  if (!meta) return { title: "Categoria" };
  return { title: `${meta.label} · Starteq Tocantins` };
}

export default async function CategoriaPage({ params }: Params) {
  const { c } = await params;
  const meta = VALID[c];
  if (!meta) notFound();

  const items = PRODUCTS.filter((p) => p.category === (c as Category));

  return (
    <>
      <Header />
      <main className="flex-1 bg-starteq-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <nav className="text-xs text-starteq-muted mb-4 font-mono">
            <Link href="/produtos" className="hover:text-starteq-gold">produtos</Link>
            <span className="mx-2">/</span>
            <span className="text-starteq-gold">{c}</span>
          </nav>

          <header className="mb-10">
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-starteq-bone">
              {meta.label}
            </h1>
            <p className="text-starteq-muted mt-2">{meta.intro} · {items.length} produtos</p>
          </header>

          {items.length === 0 ? (
            <div className="bg-starteq-card border border-starteq-line rounded-xl p-12 text-center">
              <div className="text-starteq-muted">Nenhum produto cadastrado nessa categoria ainda.</div>
              <Link href="/produtos" className="inline-block mt-4 text-starteq-gold hover:underline text-sm">
                Ver todos os produtos →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {items.map((p) => (
                <Link
                  key={p.sku}
                  href={`/produtos/${p.slug}`}
                  className="group bg-starteq-card border border-starteq-line hover:border-starteq-gold/40 rounded-xl p-5 transition-all"
                >
                  <div className="aspect-square bg-starteq-coal rounded-lg mb-4 flex items-center justify-center text-starteq-line text-xs font-mono">
                    {p.category.toUpperCase()}
                  </div>
                  <div className="text-xs text-starteq-muted uppercase tracking-wider mb-1">{p.brand}</div>
                  <h3 className="font-display font-semibold text-starteq-bone group-hover:text-starteq-gold transition-colors leading-snug min-h-[3rem]">
                    {p.name}
                  </h3>
                  <div className="mt-4 pt-4 border-t border-starteq-line">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="font-mono font-bold text-xl text-starteq-gold">
                          R$ {p.pix_price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-xs text-starteq-muted">à vista PIX</div>
                      </div>
                      <span className={`text-xs ${p.stock > 0 ? "text-starteq-green" : "text-starteq-red"}`}>
                        {p.stock > 0 ? "● estoque" : "● esgotado"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
