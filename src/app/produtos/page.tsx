import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Icon, type IconName } from "@/components/Icon";
import { PRODUCTS, type Category } from "@/lib/catalog";

export const metadata = {
  title: "Produtos · Starteq Tocantins",
  description: "Catálogo completo · processadores, placas, memória, fontes, periféricos. Entrega same-day em Palmas.",
};

const CATEGORIES: { slug: Category; label: string; icon: IconName }[] = [
  { slug: "computadores", label: "PCs Prontos", icon: "monitor" },
  { slug: "cpu", label: "Processadores", icon: "cpu" },
  { slug: "gpu", label: "Placas de vídeo", icon: "gamepad" },
  { slug: "mobo", label: "Placas-mãe", icon: "plug" },
  { slug: "ram", label: "Memória RAM", icon: "memory" },
  { slug: "ssd", label: "SSDs", icon: "disc" },
  { slug: "fonte", label: "Fontes", icon: "zap" },
  { slug: "cooler", label: "Coolers", icon: "snowflake" },
  { slug: "gabinete", label: "Gabinetes", icon: "package" },
  { slug: "mouse", label: "Mouse", icon: "mouse" },
  { slug: "teclado", label: "Teclados", icon: "keyboard" },
  { slug: "monitor", label: "Monitores", icon: "image" },
  { slug: "headset", label: "Headsets", icon: "headphones" },
  { slug: "cadeira", label: "Cadeiras", icon: "armchair" },
];

type SearchParams = { q?: string; ordem?: string };

export default async function ProdutosPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const query = (sp.q ?? "").trim().toLowerCase();
  const ordem = sp.ordem ?? "destaque";

  let items = PRODUCTS;

  if (query) {
    items = items.filter((p) =>
      [p.name, p.brand, p.category, p.sku]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }

  // ordenação
  switch (ordem) {
    case "menor":
      items = [...items].sort((a, b) => a.pix_price - b.pix_price);
      break;
    case "maior":
      items = [...items].sort((a, b) => b.pix_price - a.pix_price);
      break;
    case "nome":
      items = [...items].sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      // destaque: highlight primeiro
      items = [...items].sort((a, b) => Number(!!b.highlight) - Number(!!a.highlight));
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-starteq-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
          <header className="mb-8">
            <div className="text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-2">
              Catálogo
            </div>
            <h1 className="font-space text-3xl lg:text-5xl font-black text-starteq-bone">
              {query ? (
                <>Resultado para <span className="text-space-grad">&quot;{query}&quot;</span></>
              ) : (
                <>Todos os <span className="text-space-grad">produtos</span></>
              )}
            </h1>
            <p className="text-starteq-muted mt-2">
              {items.length} {items.length === 1 ? "produto" : "produtos"} disponíveis · estoque atualizado em tempo real
            </p>
          </header>

          {/* Search reaplicar + ordenação */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8 bg-starteq-card border border-starteq-line rounded-xl p-4">
            <form action="/produtos" method="get" className="flex-1 relative">
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Buscar processador, RTX, mouse..."
                className="w-full px-4 py-2.5 pl-11 rounded-lg bg-starteq-black border border-starteq-line focus:border-starteq-gold focus:outline-none text-starteq-bone placeholder:text-starteq-muted font-sans text-sm"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-starteq-muted"
                width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </form>
            <form action="/produtos" method="get" className="flex items-center gap-2">
              <input type="hidden" name="q" value={query} />
              <label className="text-xs text-starteq-muted uppercase tracking-wider font-space font-bold">
                Ordenar
              </label>
              <select
                name="ordem"
                defaultValue={ordem}
                className="px-3 py-2 rounded-lg bg-starteq-black border border-starteq-line text-starteq-bone text-sm font-sans focus:border-starteq-gold focus:outline-none"
              >
                <option value="destaque">Destaque</option>
                <option value="menor">Menor preço</option>
                <option value="maior">Maior preço</option>
                <option value="nome">Nome A-Z</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-starteq-gold text-starteq-black font-space font-bold text-xs uppercase tracking-wider"
              >
                Aplicar
              </button>
            </form>
          </div>

          <div className="grid lg:grid-cols-[240px_1fr] gap-6">
            {/* SIDEBAR · categorias */}
            <aside className="space-y-2">
              <div className="bg-starteq-card border border-starteq-line rounded-xl p-4">
                <h3 className="text-xs text-starteq-gold uppercase tracking-wider font-space font-bold mb-3">
                  Departamentos
                </h3>
                <nav className="space-y-1">
                  {CATEGORIES.map((c) => {
                    const count = PRODUCTS.filter((p) => p.category === c.slug).length;
                    if (count === 0) return null;
                    return (
                      <Link
                        key={c.slug}
                        href={`/produtos/categoria/${c.slug}`}
                        className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-starteq-coal text-starteq-text hover:text-starteq-gold transition-colors group"
                      >
                        <span className="flex items-center gap-2 text-sm">
                          <Icon name={c.icon} size={16} className="text-starteq-muted group-hover:text-starteq-gold" />
                          {c.label}
                        </span>
                        <span className="text-xs text-starteq-muted group-hover:text-starteq-gold font-mono">
                          {count}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="bg-starteq-gold/5 border border-starteq-gold/30 rounded-xl p-4">
                <div className="flex items-center gap-2 text-starteq-gold text-xs font-space font-bold uppercase tracking-wider mb-2">
                  <Icon name="cpu" size={14} />
                  Não acha o ideal?
                </div>
                <p className="text-sm text-starteq-text leading-relaxed mb-3">
                  Use o montador · valida compatibilidade peça a peça e envia direto pro WhatsApp.
                </p>
                <Link
                  href="/montador"
                  className="block w-full text-center px-4 py-2.5 rounded-lg bg-starteq-gold text-starteq-black font-space font-bold text-xs uppercase tracking-wider hover:bg-starteq-gold-dk transition-colors"
                >
                  Monte seu PC →
                </Link>
              </div>
            </aside>

            {/* GRID PRODUTOS */}
            {items.length === 0 ? (
              <div className="bg-starteq-card border border-starteq-line rounded-xl p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-starteq-gold/10 flex items-center justify-center">
                  <Icon name="search" size={36} className="text-starteq-gold" />
                </div>
                <h3 className="font-space font-bold text-xl text-starteq-bone mb-2">
                  Nada encontrado pra &quot;{query}&quot;
                </h3>
                <p className="text-starteq-muted mb-6">
                  Tenta outra palavra ou explora os departamentos ao lado.
                </p>
                <Link href="/produtos" className="text-starteq-gold hover:underline font-space font-bold uppercase tracking-wider text-sm">
                  Ver todos os produtos →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {items.map((p) => (
                  <ProductCard key={p.sku} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
