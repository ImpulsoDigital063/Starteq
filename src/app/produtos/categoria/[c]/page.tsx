import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Icon, type IconName } from "@/components/Icon";
import { PRODUCTS, type Category } from "@/lib/catalog";

const VALID: Record<string, { label: string; intro: string; icon: IconName }> = {
  computadores: { label: "PCs Prontos", intro: "Builds montadas, certificadas e prontas pra decolar", icon: "monitor" },
  cpu: { label: "Processadores", intro: "AMD e Intel · validados peça a peça", icon: "cpu" },
  mobo: { label: "Placas-mãe", intro: "Compatíveis com seu processador", icon: "plug" },
  gpu: { label: "Placas de vídeo", intro: "RTX 4060 a 5070 Ti · NVIDIA e AMD", icon: "gamepad" },
  ram: { label: "Memória RAM", intro: "DDR4 e DDR5 das melhores marcas", icon: "memory" },
  ssd: { label: "Armazenamento SSD", intro: "NVMe PCIe 4.0 e SATA III", icon: "disc" },
  fonte: { label: "Fontes", intro: "Calculadas pra build · 550W a 1000W", icon: "zap" },
  cooler: { label: "Coolers", intro: "Ar tower · AIO 240/360mm", icon: "snowflake" },
  gabinete: { label: "Gabinetes", intro: "ATX · mATX · ITX · airflow ou silêncio", icon: "package" },
  mouse: { label: "Mouse", intro: "Sem fio · 4K Hz · DPI alto", icon: "mouse" },
  teclado: { label: "Teclados", intro: "Mecânico · TKL · 65% · 75%", icon: "keyboard" },
  mousepad: { label: "Mousepads", intro: "Speed · Control · XXL · RGB", icon: "ruler" },
  monitor: { label: "Monitores", intro: "144Hz · 240Hz · 1080p · 1440p · QHD", icon: "image" },
  headset: { label: "Headsets", intro: "Surround 7.1 · wireless · com mic", icon: "headphones" },
  cadeira: { label: "Cadeiras", intro: "Apoio lombar · reclinável · gamer", icon: "armchair" },
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
          <nav className="text-xs text-starteq-muted mb-4 font-space font-bold uppercase tracking-wider">
            <Link href="/" className="hover:text-starteq-gold">Início</Link>
            <span className="mx-2 text-starteq-line">/</span>
            <Link href="/produtos" className="hover:text-starteq-gold">Produtos</Link>
            <span className="mx-2 text-starteq-line">/</span>
            <span className="text-starteq-gold">{meta.label}</span>
          </nav>

          <header className="mb-10 flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-starteq-gold/10 border-2 border-starteq-gold/30 flex items-center justify-center flex-shrink-0">
              <Icon name={meta.icon} size={42} className="text-starteq-gold" />
            </div>
            <div>
              <h1 className="font-space text-3xl lg:text-5xl font-black text-starteq-bone leading-tight">
                {meta.label}
              </h1>
              <p className="text-starteq-muted mt-1">{meta.intro} · <span className="text-starteq-gold">{items.length} produto{items.length !== 1 ? "s" : ""}</span></p>
            </div>
          </header>

          {items.length === 0 ? (
            <div className="bg-starteq-card border border-starteq-line rounded-xl p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-starteq-gold/10 flex items-center justify-center">
                <Icon name="ufo" size={36} className="text-starteq-gold" />
              </div>
              <h3 className="font-space font-bold text-xl text-starteq-bone mb-2">Nenhum produto nessa órbita ainda</h3>
              <p className="text-starteq-muted mb-6">Estamos repondo estoque · volta em alguns dias.</p>
              <Link href="/produtos" className="inline-block text-starteq-gold hover:underline text-sm font-space font-bold uppercase tracking-wider">
                Ver todos os produtos →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((p) => (
                <ProductCard key={p.sku} product={p} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
