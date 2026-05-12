import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PRODUCTS } from "@/lib/catalog";

export default function Home() {
  const highlights = PRODUCTS.filter((p) => p.highlight).slice(0, 3);

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-starteq-black grid-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-starteq-black via-starteq-black to-starteq-coal pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-starteq-gold/30 bg-starteq-gold/5 text-starteq-gold text-xs font-display font-semibold tracking-[0.2em] uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-starteq-gold animate-pulse" />
                Palmas-TO · Entrega same-day
              </div>
              <h1 className="font-display text-5xl lg:text-7xl font-bold leading-[0.95] text-starteq-bone mb-6">
                Monte seu PC<br />
                <span className="text-gold-grad">do seu jeito.</span>
              </h1>
              <p className="text-lg text-starteq-muted leading-relaxed max-w-lg mb-8">
                Hardware gamer com compatibilidade validada peça a peça.
                Atendimento humano · IA no WhatsApp · entrega no mesmo dia em Palmas.
                Quem joga em Palmas joga conosco.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/montador"
                  className="inline-flex items-center justify-center gap-2 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-display font-bold tracking-wide uppercase text-sm px-8 py-4 rounded-lg transition-all border-glow-gold"
                >
                  Monte seu PC agora
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/produtos/categoria/computadores"
                  className="inline-flex items-center justify-center gap-2 bg-transparent border border-starteq-line hover:border-starteq-gold/40 text-starteq-bone hover:text-starteq-gold font-display font-semibold tracking-wide uppercase text-sm px-8 py-4 rounded-lg transition-all"
                >
                  Ver PCs prontos
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
                <div>
                  <div className="text-3xl font-display font-bold text-starteq-gold">9k+</div>
                  <div className="text-xs text-starteq-muted uppercase tracking-wider mt-1">Comunidade Insta</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-starteq-gold">4.6★</div>
                  <div className="text-xs text-starteq-muted uppercase tracking-wider mt-1">67 reviews Google</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-starteq-gold">Same</div>
                  <div className="text-xs text-starteq-muted uppercase tracking-wider mt-1">Day Palmas</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-starteq-gold/10 rounded-full blur-3xl" />
                <div className="relative h-full flex items-center justify-center">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <path
                      d="M100 10 L130 60 L180 50 L160 100 L195 120 L150 130 L165 175 L120 155 L100 200 L80 155 L35 175 L50 130 L5 120 L40 100 L20 50 L70 60 Z"
                      fill="#F5C518"
                      opacity="0.9"
                    />
                    <circle cx="100" cy="100" r="20" fill="#0A0A0A" />
                    <text x="100" y="108" textAnchor="middle" fontFamily="var(--font-rajdhani)" fontWeight="700" fontSize="14" fill="#F5C518">
                      STQ
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="bg-starteq-coal py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-starteq-bone">Por onde começar</h2>
              <p className="text-starteq-muted mt-2">Escolha o caminho · monte do zero ou pegue pronto</p>
            </div>
            <Link href="/produtos" className="hidden sm:inline-flex text-sm text-starteq-gold hover:text-starteq-bone font-display font-semibold uppercase tracking-wider">
              Ver tudo →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CategoryCard
              href="/montador"
              title="Monte seu PC"
              subtitle="Compatibilidade validada"
              accent
            />
            <CategoryCard
              href="/produtos/categoria/computadores"
              title="PCs prontos"
              subtitle="Builds curados"
            />
            <CategoryCard
              href="/produtos/categoria/gpu"
              title="Placas de vídeo"
              subtitle="RTX 4060 → 5070"
            />
            <CategoryCard
              href="/produtos/categoria/perifericos"
              title="Periféricos"
              subtitle="Mouse · teclado · monitor"
            />
          </div>
        </div>
      </section>

      {/* DESTAQUES */}
      {highlights.length > 0 && (
        <section className="bg-starteq-black py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="text-starteq-gold text-xs font-display font-semibold tracking-[0.3em] uppercase mb-2">
                  ⚡ Destaques
                </div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-starteq-bone">Top de linha em Palmas</h2>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {highlights.map((p) => (
                <Link
                  key={p.sku}
                  href={`/produtos/${p.slug}`}
                  className="group bg-starteq-card border border-starteq-line hover:border-starteq-gold/40 rounded-xl p-6 transition-all"
                >
                  <div className="aspect-video bg-starteq-coal rounded-lg mb-4 flex items-center justify-center text-starteq-line text-xs font-mono">
                    {p.category.toUpperCase()}
                  </div>
                  <div className="text-xs text-starteq-muted uppercase tracking-wider mb-1">{p.brand}</div>
                  <div className="font-display font-semibold text-starteq-bone group-hover:text-starteq-gold transition-colors leading-snug">
                    {p.name}
                  </div>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <div className="font-mono font-bold text-2xl text-starteq-gold">
                        R$ {p.pix_price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-xs text-starteq-muted">à vista no PIX</div>
                    </div>
                    <span className="text-xs text-starteq-green">● em estoque</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SOCIAL PROOF · Google reviews + atendimento humano */}
      <section className="bg-starteq-coal py-12 border-y border-starteq-line">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="font-display text-4xl font-bold text-starteq-gold">4.6 ★</div>
              <div className="text-sm text-starteq-text mt-1">67 reviews no Google</div>
              <div className="text-xs text-starteq-muted mt-0.5">Mantida há 6+ anos em Palmas</div>
            </div>
            <div>
              <div className="font-display text-4xl font-bold text-starteq-gold">~30 min</div>
              <div className="text-sm text-starteq-text mt-1">Resposta no WhatsApp</div>
              <div className="text-xs text-starteq-muted mt-0.5">Atendimento humano em horário comercial</div>
            </div>
            <div>
              <div className="font-display text-4xl font-bold text-starteq-gold">23k+</div>
              <div className="text-sm text-starteq-text mt-1">Curtidas no maior post</div>
              <div className="text-xs text-starteq-muted mt-0.5">Comunidade gamer local @starteq_to</div>
            </div>
          </div>
        </div>
      </section>

      {/* SELOS INSTITUCIONAIS · Montagem · Entrega · Garantia */}
      <section className="bg-starteq-black py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-starteq-gold text-xs font-display font-semibold tracking-[0.3em] uppercase mb-2">
              Como funciona
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-starteq-bone">
              Comprou na Starteq, levou tranquilidade
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Seal
              icon="🔧"
              title="Montagem"
              text="PC enviado MONTADO e certificado · BIOS e drivers atualizados · cabos pela parte de trás · aparência limpa de fábrica."
            />
            <Seal
              icon="📦"
              title="Entrega"
              text="Caixa de papelão de ondas duplas exclusiva · fitas de segurança com cola quimicamente ativa · motoboy mesmo dia em Palmas."
            />
            <Seal
              icon="🛡️"
              title="Garantia"
              text="Garantia por peça · prazo indicado na nota fiscal · sem lacre · você pode abrir e modificar como quiser."
            />
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="bg-starteq-coal py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-starteq-bone text-center mb-3">
            O que nos diferencia
          </h2>
          <p className="text-starteq-muted text-center max-w-2xl mx-auto mb-12">
            Atendimento de gente, em Palmas. Não somos call center, somos seu vizinho.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Differential
              icon="⚙️"
              title="Compatibilidade validada"
              text="Cada peça do montador é checada por software antes de você pagar. Sem erro de socket, RAM, wattagem ou gabinete."
            />
            <Differential
              icon="🛵"
              title="Same-day em Palmas"
              text="Comprou de manhã, joga à tarde. Motoboy nosso entrega no mesmo dia em todo Plano Diretor."
            />
            <Differential
              icon="🤖"
              title="IA + atendimento humano"
              text="Tira dúvida no WhatsApp com IA treinada no nosso estoque · finaliza com gente real sempre."
            />
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-starteq-black py-20 lg:py-32 grid-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl lg:text-6xl font-bold text-starteq-bone leading-tight">
            Para de adiar<br />
            <span className="text-gold-grad">o setup dos sonhos.</span>
          </h2>
          <p className="text-starteq-muted mt-6 text-lg max-w-xl mx-auto">
            5 passos · compatibilidade automática · orçamento direto no WhatsApp.
            Em 3 minutos sai daqui sabendo exatamente quanto custa.
          </p>
          <Link
            href="/montador"
            className="mt-10 inline-flex items-center justify-center gap-2 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-display font-bold tracking-wide uppercase text-base px-10 py-5 rounded-lg transition-all border-glow-gold"
          >
            Começar agora
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

function CategoryCard({
  href,
  title,
  subtitle,
  accent = false,
}: {
  href: string;
  title: string;
  subtitle: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group rounded-xl p-6 border transition-all ${
        accent
          ? "bg-starteq-gold/5 border-starteq-gold/40 hover:border-starteq-gold hover:bg-starteq-gold/10"
          : "bg-starteq-card border-starteq-line hover:border-starteq-gold/40"
      }`}
    >
      <div
        className={`font-display font-bold text-xl mb-1 ${
          accent ? "text-starteq-gold" : "text-starteq-bone group-hover:text-starteq-gold"
        } transition-colors`}
      >
        {title}
      </div>
      <div className="text-sm text-starteq-muted">{subtitle}</div>
      <div className="mt-4 text-starteq-muted group-hover:text-starteq-gold transition-colors">→</div>
    </Link>
  );
}

function Differential({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="bg-starteq-card border border-starteq-line rounded-xl p-6">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-display font-bold text-xl text-starteq-bone mb-2">{title}</h3>
      <p className="text-sm text-starteq-muted leading-relaxed">{text}</p>
    </div>
  );
}

function Seal({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="bg-starteq-card border border-starteq-line hover:border-starteq-gold/40 rounded-xl p-8 text-center transition-all">
      <div className="w-20 h-20 rounded-full bg-starteq-gold/10 border-2 border-starteq-gold/30 flex items-center justify-center mx-auto mb-5 text-4xl">
        {icon}
      </div>
      <h3 className="font-display font-bold text-2xl text-starteq-bone mb-3">{title}</h3>
      <p className="text-sm text-starteq-muted leading-relaxed">{text}</p>
    </div>
  );
}
