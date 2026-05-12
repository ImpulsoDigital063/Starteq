import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StarField } from "@/components/StarField";
import { Icon } from "@/components/Icon";
import { POSTS } from "@/lib/posts";

export const metadata = {
  title: "Blog · Starteq Tocantins",
  description: "Hardware gamer, builds, tutoriais e setup. Transmissões diretas da tripulação Starteq em Palmas-TO.",
};

const CATEGORY_COLORS: Record<string, string> = {
  Build: "text-starteq-gold border-starteq-gold/40 bg-starteq-gold/5",
  Hardware: "text-blue-400 border-blue-400/40 bg-blue-400/5",
  Setup: "text-purple-400 border-purple-400/40 bg-purple-400/5",
  Tutorial: "text-starteq-pix border-starteq-pix/40 bg-starteq-pix/5",
  Mercado: "text-orange-400 border-orange-400/40 bg-orange-400/5",
};

export default function BlogPage() {
  const sorted = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const featured = sorted[0];
  const rest = sorted.slice(1);

  return (
    <>
      <Header />
      <main className="flex-1 bg-starteq-black">
        <section className="relative overflow-hidden nebula-bg py-20">
          <StarField className="opacity-60" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-3">
              <Icon name="radio" size={14} /> Transmissões da base
            </div>
            <h1 className="font-space text-4xl lg:text-6xl font-black text-starteq-bone">
              Blog <span className="text-space-grad">Starteq</span>
            </h1>
            <p className="text-starteq-muted mt-4 max-w-2xl mx-auto">
              Hardware, builds, tutoriais e setup. Conteúdo prático de quem monta PC todo dia em Palmas-TO.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* FEATURED */}
            <Link
              href={`/blog/${featured.slug}`}
              className="group block bg-starteq-card border border-starteq-line hover:border-starteq-gold/40 rounded-2xl overflow-hidden mb-12 transition-all"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-starteq-gold/20 to-starteq-coal flex items-center justify-center text-9xl">
                  <Icon name={featured.cover_icon} size={120} className="text-starteq-gold" strokeWidth={1.5} />
                </div>
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs mb-4">
                    <span className={`px-2.5 py-1 rounded border font-space font-bold uppercase tracking-wider ${CATEGORY_COLORS[featured.category]}`}>
                      {featured.category}
                    </span>
                    <span className="text-starteq-muted">·</span>
                    <time className="text-starteq-muted font-mono">{formatDate(featured.date)}</time>
                    <span className="text-starteq-muted">·</span>
                    <span className="text-starteq-muted">{featured.read_min} min</span>
                  </div>
                  <h2 className="font-space text-2xl lg:text-3xl font-black text-starteq-bone group-hover:text-starteq-gold transition-colors leading-tight mb-3">
                    {featured.title}
                  </h2>
                  <p className="text-starteq-muted leading-relaxed">{featured.excerpt}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-starteq-gold font-space font-bold tracking-wide uppercase text-sm">
                    Ler post completo →
                  </div>
                </div>
              </div>
            </Link>

            {/* GRID DEMAIS POSTS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group bg-starteq-card border border-starteq-line hover:border-starteq-gold/40 rounded-xl overflow-hidden transition-all hover:-translate-y-1"
                >
                  <div className="aspect-video bg-gradient-to-br from-starteq-coal to-starteq-card flex items-center justify-center text-6xl">
                    <Icon name={p.cover_icon} size={72} className="text-starteq-gold" strokeWidth={1.5} />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs mb-3">
                      <span className={`px-2 py-0.5 rounded border font-space font-bold uppercase tracking-wider text-[10px] ${CATEGORY_COLORS[p.category]}`}>
                        {p.category}
                      </span>
                      <span className="text-starteq-muted">·</span>
                      <span className="text-starteq-muted">{p.read_min} min</span>
                    </div>
                    <h3 className="font-space font-bold text-lg text-starteq-bone group-hover:text-starteq-gold transition-colors leading-snug mb-2">
                      {p.title}
                    </h3>
                    <p className="text-sm text-starteq-muted leading-relaxed line-clamp-3">{p.excerpt}</p>
                    <div className="mt-4 text-xs text-starteq-muted font-mono">
                      {formatDate(p.date)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}
