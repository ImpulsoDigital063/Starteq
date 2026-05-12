import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { POSTS, findPost, getRelatedPosts } from "@/lib/posts";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return { title: "Post não encontrado" };
  return {
    title: `${post.title} · Blog Starteq`,
    description: post.excerpt,
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  Build: "text-starteq-gold border-starteq-gold/40 bg-starteq-gold/5",
  Hardware: "text-blue-400 border-blue-400/40 bg-blue-400/5",
  Setup: "text-purple-400 border-purple-400/40 bg-purple-400/5",
  Tutorial: "text-starteq-pix border-starteq-pix/40 bg-starteq-pix/5",
  Mercado: "text-orange-400 border-orange-400/40 bg-orange-400/5",
};

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();
  const related = getRelatedPosts(slug, 3);

  return (
    <>
      <Header />
      <main className="flex-1 bg-starteq-black">
        <article>
          {/* HERO POST */}
          <header className="bg-gradient-to-b from-starteq-coal to-starteq-black py-16 lg:py-24 border-b border-starteq-line">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link href="/blog" className="inline-flex items-center gap-1 text-xs text-starteq-muted hover:text-starteq-gold mb-6 font-space font-bold uppercase tracking-wider">
                ← Blog
              </Link>

              <div className="flex items-center gap-3 text-xs mb-6">
                <span className={`px-2.5 py-1 rounded border font-space font-bold uppercase tracking-wider ${CATEGORY_COLORS[post.category]}`}>
                  {post.category}
                </span>
                <span className="text-starteq-muted">·</span>
                <time className="text-starteq-muted font-mono">{formatDate(post.date)}</time>
                <span className="text-starteq-muted">·</span>
                <span className="text-starteq-muted">{post.read_min} min de leitura</span>
              </div>

              <h1 className="font-space text-3xl lg:text-5xl font-black text-starteq-bone leading-tight mb-4">
                {post.title}
              </h1>
              <p className="text-lg text-starteq-muted leading-relaxed">
                {post.excerpt}
              </p>

              <div className="mt-6 flex items-center gap-3 pt-6 border-t border-starteq-line">
                <div className="w-10 h-10 rounded-full bg-starteq-gold/20 border border-starteq-gold/40 flex items-center justify-center text-sm font-display font-bold text-starteq-gold">
                  ST
                </div>
                <div>
                  <div className="font-display font-semibold text-starteq-bone text-sm">{post.author}</div>
                  <div className="text-xs text-starteq-muted">Palmas-TO</div>
                </div>
              </div>
            </div>
          </header>

          {/* COVER */}
          <div className="aspect-[2/1] max-w-4xl mx-auto bg-gradient-to-br from-starteq-gold/20 to-starteq-coal flex items-center justify-center text-9xl">
            {post.cover_emoji}
          </div>

          {/* BODY */}
          <section className="py-12 lg:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="prose prose-invert max-w-none">
                {post.body.split("\n\n").map((para, idx) => {
                  if (para.startsWith("## ")) {
                    return (
                      <h2 key={idx} className="font-space text-2xl font-bold text-starteq-bone mt-10 mb-4">
                        {para.replace(/^## /, "")}
                      </h2>
                    );
                  }
                  if (para.startsWith("- ") || para.startsWith("* ")) {
                    return (
                      <ul key={idx} className="space-y-2 mb-4">
                        {para.split("\n").map((line, j) => (
                          <li key={j} className="text-starteq-text leading-relaxed">
                            {renderInline(line.replace(/^[-*] /, ""))}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (para.startsWith("| ")) {
                    // Markdown table simples
                    const rows = para.split("\n").filter((l) => l.startsWith("|"));
                    const [headerRow, , ...bodyRows] = rows;
                    const headers = headerRow.split("|").slice(1, -1).map((s) => s.trim());
                    return (
                      <div key={idx} className="overflow-x-auto my-6">
                        <table className="w-full text-sm border border-starteq-line rounded-lg overflow-hidden">
                          <thead className="bg-starteq-card">
                            <tr>
                              {headers.map((h, i) => (
                                <th key={i} className="text-left px-4 py-3 font-space font-bold uppercase tracking-wider text-xs text-starteq-gold border-b border-starteq-line">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {bodyRows.map((row, ri) => (
                              <tr key={ri} className="border-b border-starteq-line last:border-0 hover:bg-starteq-card/30">
                                {row.split("|").slice(1, -1).map((c, ci) => (
                                  <td key={ci} className="px-4 py-3 text-starteq-text">
                                    {renderInline(c.trim())}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }
                  return (
                    <p key={idx} className="text-starteq-text leading-relaxed mb-5 text-base">
                      {renderInline(para)}
                    </p>
                  );
                })}
              </div>

              {/* CTA Build */}
              <div className="mt-16 bg-starteq-card border border-starteq-gold/30 rounded-xl p-8 text-center">
                <h3 className="font-space font-bold text-2xl text-starteq-bone mb-3">Pronto pra montar a sua?</h3>
                <p className="text-starteq-muted mb-6 max-w-md mx-auto">
                  Use o /montador da Starteq · compatibilidade validada peça a peça · orçamento direto no WhatsApp.
                </p>
                <Link
                  href="/montador"
                  className="inline-flex items-center gap-2 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-space font-bold tracking-wide uppercase text-sm px-8 py-4 rounded-lg transition-all"
                >
                  Decolar montador →
                </Link>
              </div>
            </div>
          </section>

          {/* RELACIONADOS */}
          {related.length > 0 && (
            <section className="bg-starteq-coal py-16 border-t border-starteq-line">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-space font-bold text-2xl text-starteq-bone mb-8">Leia também</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {related.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="group bg-starteq-card border border-starteq-line hover:border-starteq-gold/40 rounded-xl overflow-hidden transition-all"
                    >
                      <div className="aspect-video bg-gradient-to-br from-starteq-coal to-starteq-card flex items-center justify-center text-5xl">
                        {p.cover_emoji}
                      </div>
                      <div className="p-4">
                        <h3 className="font-space font-bold text-sm text-starteq-bone group-hover:text-starteq-gold leading-snug">
                          {p.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}

function renderInline(text: string): React.ReactNode {
  // bold simples **texto**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return <strong key={i} className="text-starteq-bone font-semibold">{p.slice(2, -2)}</strong>;
    }
    return <span key={i}>{p}</span>;
  });
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}
