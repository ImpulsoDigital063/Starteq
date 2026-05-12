import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StarField } from "@/components/StarField";
import { Meteors } from "@/components/Meteors";
import { ProductShelf } from "@/components/ProductShelf";
import { Icon, type IconName } from "@/components/Icon";
import { PRODUCTS, productsByBadge, BRANDS } from "@/lib/catalog";

export default function Home() {
  const lancamentos = productsByBadge("Lançamento");
  const maisVendidos = productsByBadge("Mais Vendido");
  const promos = [...productsByBadge("Promo"), ...productsByBadge("OpenBox")];
  const pcsProntos = PRODUCTS.filter((p) => p.category === "computadores");
  const perifericos = PRODUCTS.filter((p) =>
    ["mouse", "teclado", "monitor", "headset", "mousepad", "cadeira"].includes(p.category)
  ).slice(0, 8);
  const hardware = PRODUCTS.filter((p) =>
    ["gpu", "cpu", "ssd", "fonte"].includes(p.category)
  ).slice(0, 8);

  return (
    <>
      <Header />

      {/* HERO · imagem cinematográfica full-bleed + texto sobre negative space */}
      <section className="relative overflow-hidden bg-starteq-black min-h-[100svh] md:min-h-[88vh] flex items-end md:items-center">
        {/* Mobile: astronauta vertical no topo · texto embaixo */}
        <Image
          src="/hero-mobile.jpg"
          alt="Astronauta Starteq · capacete dourado refletindo o eclipse Phoenix"
          fill
          priority
          quality={88}
          sizes="(max-width: 768px) 100vw, 1px"
          className="object-cover object-top md:hidden"
        />
        {/* Desktop: astronauta wide na direita · texto na esquerda */}
        <Image
          src="/hero-desktop.jpg"
          alt="Astronauta Starteq · capacete dourado refletindo o eclipse Phoenix"
          fill
          priority
          quality={92}
          sizes="(min-width: 768px) 100vw, 1px"
          className="hidden md:block object-cover"
          style={{
            objectPosition: "right center",
            transform: "scale(1.18)",
            transformOrigin: "right center",
            filter: "brightness(1.18) saturate(1.12) contrast(1.05)",
          }}
        />

        {/* Gradient overlay mobile: vertical fade pra preto na metade inferior · esconde watermark AI */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-b from-transparent via-starteq-black/20 to-starteq-black pointer-events-none" />
        {/* Gradient overlay desktop: horizontal fade pra preto na esquerda */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-starteq-black via-starteq-black/85 to-transparent pointer-events-none" />
        {/* Gradient fino topo+base · fade pra preto puro · sutil pra preservar brilho */}
        <div className="absolute inset-0 bg-gradient-to-b from-starteq-black/25 via-transparent to-starteq-black/50 pointer-events-none" />

        {/* Meteoros sutis sobre a imagem · mantém movimento */}
        <Meteors />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-starteq-gold/40 bg-starteq-black/60 backdrop-blur-sm text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-starteq-gold animate-pulse" />
              Estação Palmas · Tocantins
            </div>
            <h1 className="font-space text-4xl sm:text-5xl lg:text-7xl font-black leading-[0.95] text-starteq-bone mb-6 drop-shadow-[0_2px_20px_rgba(0,0,0,0.85)]">
              Sua build pronta<br />
              <span className="text-space-grad">em Palmas. Hoje.</span>
            </h1>
            <p className="text-base sm:text-lg text-starteq-text leading-relaxed max-w-lg mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              PC gamer montado, testado e entregue no mesmo dia.
              Compatibilidade validada peça a peça · atendimento no WhatsApp em até 30 minutos.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/montador"
                className="inline-flex items-center justify-center gap-2 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-space font-bold tracking-wide uppercase text-sm px-8 py-4 rounded-lg transition-all animate-pulse-glow shadow-2xl shadow-starteq-gold/30"
              >
                Decolar montador
                <Icon name="arrow-right" size={18} strokeWidth={2.5} />
              </Link>
              <Link
                href="/produtos/categoria/computadores"
                className="inline-flex items-center justify-center gap-2 bg-starteq-black/60 backdrop-blur-sm border border-starteq-line hover:border-starteq-gold/40 text-starteq-bone hover:text-starteq-gold font-space font-bold tracking-wide uppercase text-sm px-8 py-4 rounded-lg transition-all"
              >
                PCs prontos
              </Link>
            </div>

            <div className="mt-8 md:mt-12 hidden md:grid grid-cols-3 gap-6 max-w-md">
              <div>
                <div className="text-2xl sm:text-3xl font-space font-black text-starteq-gold flex items-center gap-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                  4.6 <Icon name="star" size={20} className="text-starteq-gold" />
                </div>
                <div className="text-[10px] sm:text-xs text-starteq-muted uppercase tracking-wider mt-1">67 reviews Google</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-space font-black text-starteq-gold drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">6+</div>
                <div className="text-[10px] sm:text-xs text-starteq-muted uppercase tracking-wider mt-1">Anos em Palmas</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-space font-black text-starteq-gold drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">9k+</div>
                <div className="text-[10px] sm:text-xs text-starteq-muted uppercase tracking-wider mt-1">No Instagram</div>
              </div>
            </div>

            {/* Stats compactos pro mobile · linha única abaixo dos CTAs */}
            <div className="md:hidden mt-6 flex items-center gap-4 text-xs text-starteq-muted">
              <span className="inline-flex items-center gap-1 text-starteq-gold font-space font-bold">
                4.6 <Icon name="star" size={12} />
              </span>
              <span>·</span>
              <span>6 anos em Palmas</span>
              <span>·</span>
              <span className="text-starteq-gold font-space font-bold">9k+</span>
              <span>seguidores</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-starteq-coal pointer-events-none" />
      </section>

      {/* FAIXA PROMO · marquee */}
      <section className="bg-starteq-gold text-starteq-black py-3 overflow-hidden">
        <div className="flex items-center justify-center gap-12 whitespace-nowrap animate-[scroll_30s_linear_infinite] font-space font-bold uppercase tracking-wider text-sm">
          <PromoBadge icon="bike" text="Same-day em Palmas" />
          <span>·</span>
          <PromoBadge icon="credit-card" text="10x sem juros no cartão" />
          <span>·</span>
          <PromoBadge icon="zap" text="15% off no PIX à vista" />
          <span>·</span>
          <PromoBadge icon="shield" text="Garantia por peça sem lacre" />
          <span>·</span>
          <PromoBadge icon="bot" text="IA + atendimento humano no WhatsApp" />
          <span>·</span>
          <PromoBadge icon="rocket" text="Build com compatibilidade validada" />
        </div>
      </section>

      {/* CATEGORIAS · launch pad */}
      <section className="bg-starteq-coal py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-2">
            <Icon name="gamepad" size={16} />
            Categorias
          </div>
          <h2 className="font-space text-3xl lg:text-4xl font-black text-starteq-bone mb-8">Onde quer começar?</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <CategoryTile href="/montador" label="Monte seu PC" icon="wrench" accent />
            <CategoryTile href="/produtos/categoria/computadores" label="PCs prontos" icon="monitor" />
            <CategoryTile href="/produtos/categoria/gpu" label="Placas de vídeo" icon="gamepad" />
            <CategoryTile href="/produtos/categoria/mouse" label="Mouse · Teclado" icon="mouse" />
            <CategoryTile href="/produtos/categoria/monitor" label="Monitores" icon="image" />
            <CategoryTile href="/produtos/categoria/cadeira" label="Cadeiras" icon="armchair" />
          </div>
        </div>
      </section>

      {lancamentos.length > 0 && (
        <ProductShelf
          eyebrowIcon="zap"
          eyebrow="Lançamentos"
          title="Acabou de chegar"
          subtitle="Últimas peças que chegaram em Palmas · do RTX 5070 ao Z790 DDR5"
          products={lancamentos}
          accentColor="gold"
        />
      )}

      {/* BANNER CTA MONTADOR */}
      <section className="relative overflow-hidden bg-starteq-black py-16 lg:py-20 border-y border-starteq-line">
        <StarField className="opacity-40" />
        <Meteors className="opacity-50" />
        <div className="absolute inset-0 nebula-bg opacity-70" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-3">
              <Icon name="cpu" size={16} />
              Configurador inteligente
            </div>
            <h2 className="font-space text-3xl lg:text-5xl font-black text-starteq-bone leading-tight mb-3">
              Monte seu PC <span className="text-space-grad">do seu jeito.</span>
            </h2>
            <p className="text-starteq-muted text-base lg:text-lg max-w-xl">
              8 passos · compatibilidade validada · orçamento direto no WhatsApp.
              A IA cuida pra você não comprar peça errada.
            </p>
          </div>
          <Link
            href="/montador"
            className="inline-flex items-center justify-center gap-2 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-space font-bold tracking-wide uppercase text-base px-8 py-5 rounded-lg transition-all animate-pulse-glow whitespace-nowrap"
          >
            Iniciar montador <Icon name="arrow-right" size={20} strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      {maisVendidos.length > 0 && (
        <ProductShelf
          eyebrowIcon="flame"
          eyebrow="Mais Vendidos"
          title="Top de linha em Palmas"
          subtitle="O que a comunidade gamer de Palmas mais pede aqui"
          products={maisVendidos}
          accentColor="red"
        />
      )}

      {pcsProntos.length > 0 && (
        <ProductShelf
          eyebrowIcon="monitor"
          eyebrow="PCs Prontos"
          title="Leva pra casa hoje"
          subtitle="PCs montados, certificados e enviados com BIOS+drivers atualizados"
          products={pcsProntos}
          accentColor="gold"
          highlightFirst
        />
      )}

      {/* SOCIAL PROOF · transmissão da base */}
      <section className="bg-starteq-coal py-12 border-y border-starteq-line">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase">
              <Icon name="check" size={16} />
              Quem nos conhece
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="font-space text-4xl font-black text-starteq-gold inline-flex items-center gap-2 justify-center">
                4.6 <Icon name="star" size={28} className="text-starteq-gold" />
              </div>
              <div className="text-sm text-starteq-text mt-1">67 reviews no Google</div>
              <div className="text-xs text-starteq-muted mt-0.5">Operando há 6+ anos em Palmas</div>
            </div>
            <div>
              <div className="font-space text-4xl font-black text-starteq-gold">~30 min</div>
              <div className="text-sm text-starteq-text mt-1">Resposta no WhatsApp</div>
              <div className="text-xs text-starteq-muted mt-0.5">Equipe real em Palmas · não bot impessoal</div>
            </div>
            <div>
              <div className="font-space text-4xl font-black text-starteq-gold">23k+</div>
              <div className="text-sm text-starteq-text mt-1">Curtidas no maior post</div>
              <div className="text-xs text-starteq-muted mt-0.5">Comunidade gamer @starteq_to</div>
            </div>
          </div>
        </div>
      </section>

      {hardware.length > 0 && (
        <ProductShelf
          eyebrowIcon="cpu"
          eyebrow="Hardware"
          title="As peças que fazem a build"
          subtitle="GPU · CPU · SSD · Fonte das melhores marcas"
          products={hardware}
          ctaHref="/produtos/categoria/gpu"
          ctaLabel="Ver Hardware completo"
          accentColor="gold"
        />
      )}

      {perifericos.length > 0 && (
        <ProductShelf
          eyebrowIcon="gamepad"
          eyebrow="Periféricos"
          title="Setup completo na base"
          subtitle="Mouse · teclado · monitor · headset · cadeira · tudo Husky/Razer/HyperX e mais"
          products={perifericos}
          ctaHref="/produtos/categoria/mouse"
          ctaLabel="Ver Periféricos"
          accentColor="purple"
        />
      )}

      {promos.length > 0 && (
        <ProductShelf
          eyebrowIcon="tag"
          eyebrow="Promo · OpenBox"
          title="Aproveita antes que esgote"
          subtitle="Produtos com desconto especial ou em condição open-box (testados, NF, garantia mantida)"
          products={promos}
          accentColor="red"
        />
      )}

      {/* MARCAS · carrossel logos */}
      <section className="bg-starteq-coal py-12 border-y border-starteq-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <div className="text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase">
              Marcas oficiais que vendemos
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex gap-8 animate-[scroll_40s_linear_infinite] whitespace-nowrap">
              {[...BRANDS, ...BRANDS].map((b, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-6 py-3 bg-starteq-card border border-starteq-line rounded-lg text-starteq-muted hover:text-starteq-gold transition-colors font-space font-bold text-sm uppercase tracking-wider"
                >
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SELOS · Montagem · Entrega · Garantia */}
      <section className="bg-starteq-black py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-2">
              O jeito Starteq
            </div>
            <h2 className="font-space text-3xl lg:text-4xl font-black text-starteq-bone">
              Comprou na Starteq, levou tranquilidade
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Seal iconName="wrench" title="Montagem" text="PC enviado MONTADO e certificado · BIOS e drivers atualizados · cabos pela parte de trás · acabamento de fábrica." />
            <Seal iconName="package" title="Entrega" text="Caixa de papelão de ondas duplas exclusiva · fitas de segurança com cola ativa · motoboy mesmo dia em Palmas." />
            <Seal iconName="shield" title="Garantia" text="Garantia por peça · prazo na nota fiscal · sem lacre · você pode abrir e modificar como quiser." />
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-starteq-coal py-16 border-y border-starteq-line">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-3">
            <Icon name="radio" size={14} />
            Conexão direta
          </div>
          <h2 className="font-space text-3xl lg:text-4xl font-black text-starteq-bone mb-3">
            Receba lançamentos antes da galáxia
          </h2>
          <p className="text-starteq-muted mb-8">
            Cupons exclusivos, lançamentos em primeira mão, e dicas de build · uma vez por semana no email. Sem spam.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="seuemail@galaxia.com"
              className="flex-1 px-4 py-3 rounded-lg bg-starteq-black border border-starteq-line focus:border-starteq-gold focus:outline-none text-starteq-bone font-sans"
            />
            <button
              type="submit"
              className="bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-space font-bold tracking-wide uppercase text-sm px-6 py-3 rounded-lg transition-all"
            >
              Inscrever
            </button>
          </form>
        </div>
      </section>

      {/* CTA FINAL · ignição */}
      <section className="bg-starteq-black py-20 lg:py-32 relative overflow-hidden nebula-bg">
        <StarField className="opacity-50" />
        <Meteors className="opacity-60" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-4">
            <Icon name="zap" size={14} />
            Monte em 3 minutos
          </div>
          <h2 className="font-space text-4xl lg:text-6xl font-black text-starteq-bone leading-tight">
            Para de adiar<br />
            <span className="text-space-grad">o setup dos sonhos.</span>
          </h2>
          <p className="text-starteq-muted mt-6 text-lg max-w-xl mx-auto">
            8 passos · compatibilidade automática · orçamento direto no WhatsApp.
            Em 3 minutos sai daqui sabendo exatamente quanto custa.
          </p>
          <Link
            href="/montador"
            className="mt-10 inline-flex items-center justify-center gap-2 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-space font-bold tracking-wide uppercase text-base px-10 py-5 rounded-lg transition-all animate-pulse-glow"
          >
            Iniciar montador <Icon name="arrow-right" size={20} strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

function PromoBadge({ icon, text }: { icon: IconName; text: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Icon name={icon} size={16} strokeWidth={2.5} />
      {text}
    </span>
  );
}

function CategoryTile({
  href,
  label,
  icon,
  accent = false,
}: {
  href: string;
  label: string;
  icon: IconName;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group rounded-xl p-4 lg:p-5 border text-center transition-all hover:-translate-y-1 ${
        accent
          ? "bg-starteq-gold/5 border-starteq-gold/40 hover:border-starteq-gold animate-pulse-glow"
          : "bg-starteq-card border-starteq-line hover:border-starteq-gold/40"
      }`}
    >
      <div className="w-10 h-10 rounded-lg bg-starteq-coal mx-auto mb-2 flex items-center justify-center">
        <Icon name={icon} size={22} className={accent ? "text-starteq-gold" : "text-starteq-text group-hover:text-starteq-gold"} />
      </div>
      <div
        className={`font-space font-bold text-sm leading-tight ${
          accent ? "text-starteq-gold" : "text-starteq-bone group-hover:text-starteq-gold"
        }`}
      >
        {label}
      </div>
    </Link>
  );
}

function Seal({ iconName, title, text }: { iconName: IconName; title: string; text: string }) {
  return (
    <div className="bg-starteq-card border border-starteq-line hover:border-starteq-gold/40 rounded-xl p-8 text-center transition-all hover:-translate-y-1">
      <div className="w-20 h-20 rounded-full bg-starteq-gold/10 border-2 border-starteq-gold/30 flex items-center justify-center mx-auto mb-5">
        <Icon name={iconName} size={36} className="text-starteq-gold" />
      </div>
      <h3 className="font-space font-bold text-2xl text-starteq-bone mb-3">{title}</h3>
      <p className="text-sm text-starteq-muted leading-relaxed">{text}</p>
    </div>
  );
}
