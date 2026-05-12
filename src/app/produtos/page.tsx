import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PRODUCTS } from "@/lib/catalog";

export const metadata = {
  title: "Produtos · Starteq Tocantins",
  description: "Catálogo completo · processadores, placas, memória, fontes e periféricos. Entrega same-day em Palmas.",
};

const CATEGORIES = [
  { slug: "cpu", label: "Processadores" },
  { slug: "mobo", label: "Placas-mãe" },
  { slug: "gpu", label: "Placas de vídeo" },
  { slug: "ram", label: "Memória RAM" },
  { slug: "fonte", label: "Fontes" },
  { slug: "perifericos", label: "Periféricos" },
];

export default function ProdutosPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-starteq-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <header className="mb-10">
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-starteq-bone">
              Todos os <span className="text-gold-grad">produtos</span>
            </h1>
            <p className="text-starteq-muted mt-3 max-w-2xl">
              {PRODUCTS.length} SKUs disponíveis · estoque atualizado em tempo real · retire na loja ou receba no mesmo dia em Palmas.
            </p>
          </header>

          {/* CATEGORIAS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/produtos/categoria/${c.slug}`}
                className="bg-starteq-card border border-starteq-line hover:border-starteq-gold/40 rounded-lg p-4 text-center transition-all"
              >
                <div className="font-display font-semibold text-starteq-bone text-sm">{c.label}</div>
                <div className="text-xs text-starteq-muted mt-1">
                  {PRODUCTS.filter((p) => p.category === c.slug).length} produtos
                </div>
              </Link>
            ))}
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {PRODUCTS.map((p) => (
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
                      {p.stock > 0 ? "● em estoque" : "● esgotado"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
