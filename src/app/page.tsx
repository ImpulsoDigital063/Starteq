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
            objectPosition: "calc(100% + 80px) center",
            filter: "brightness(1.05) saturate(1.05)",
          }}
        />

        {/* Gradient overlay mobile: vertical fade pra preto na metade inferior · esconde watermark AI */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-b from-transparent via-starteq-black/20 to-starteq-black pointer-events-none" />
        {/* Gradient overlay desktop: horizontal fade pra preto na esquerda */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-starteq-black via-starteq-black/85 to-transparent pointer-events-none" />
        {/* Gradient fino topo+base · fade pra preto puro · sutil pra preservar brilho */}
        <div className="absolute inset-0 bg-gradient-to-b from-starteq-black/25 via-transparent to-starteq-black/50 pointer-events-none" />

        {/* Meteoros · mix-blend-mode screen faz eles "passarem atrás" do astronauta
           (visíveis nas zonas pretas do fundo, invisíveis nas zonas claras da imagem) */}
        <div className="absolute inset-0 pointer-events-none" style={{ mixBlendMode: "screen" }}>
          <Meteors />
        </div>

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

      {/* BANNER CTA MONTADOR · nave Starteq atravessando o fundo */}
      <section className="relative overflow-hidden bg-starteq-black py-20 md:py-28 lg:py-36 border-y border-starteq-line min-h-[560px] md:min-h-[560px] lg:min-h-[640px]">
        {/* Mobile: nave vertical no topo · texto embaixo */}
        <Image
          src="/nave-mobile.jpg"
          alt="Nave Starteq atravessando o espaço com propulsores dourados"
          fill
          quality={90}
          sizes="(max-width: 768px) 100vw, 1px"
          className="object-cover object-top md:hidden animate-nave-glide"
        />
        {/* Desktop: nave wide centralizada · STARTEQ visível na fuselagem */}
        <Image
          src="/nave-desktop.jpg"
          alt="Nave Starteq atravessando o espaço com propulsores dourados"
          fill
          quality={92}
          sizes="(min-width: 768px) 100vw, 1px"
          className="hidden md:block object-cover animate-nave-glide"
          style={{
            objectPosition: "60% center",
            transform: "scale(1.15)",
            transformOrigin: "65% center",
            filter: "brightness(1.08) saturate(1.08) contrast(1.03)",
          }}
        />

        {/* Gradient overlay mobile · vertical fade pra preto na metade inferior */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-b from-transparent via-starteq-black/30 to-starteq-black pointer-events-none" />
        {/* Gradient overlay desktop · horizontal fade pra preto na esquerda (mais agressivo no canto pra texto ler) */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-starteq-black via-starteq-black/70 via-50% to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-starteq-black/40 via-transparent to-starteq-black/60 pointer-events-none" />

        {/* Meteoros sutis · mix-blend-screen pra passar atrás da nave */}
        <div className="absolute inset-0 pointer-events-none" style={{ mixBlendMode: "screen" }}>
          <Meteors className="opacity-60" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-8 items-end lg:items-center h-full pt-32 md:pt-0">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              <Icon name="cpu" size={16} />
              Configurador inteligente
            </div>
            <h2 className="font-space text-3xl lg:text-5xl font-black text-starteq-bone leading-tight mb-3 drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)]">
              Monte seu PC <span className="text-space-grad">do seu jeito.</span>
            </h2>
            <p className="text-starteq-text text-base lg:text-lg max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              8 passos · compatibilidade validada · orçamento direto no WhatsApp.
              A IA cuida pra você não comprar peça errada.
            </p>
          </div>
          <Link
            href="/montador"
            className="inline-flex items-center justify-center gap-2 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-space font-bold tracking-wide uppercase text-base px-8 py-5 rounded-lg transition-all animate-pulse-glow whitespace-nowrap shadow-2xl shadow-starteq-gold/30"
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

      {/* SELOS · O jeito Starteq · engenheiro espacial no fundo + 3 etapas numeradas */}
      <section className="relative overflow-hidden bg-starteq-black py-20 md:py-24 lg:py-28 min-h-[600px] md:min-h-[640px]">
        {/* Mobile: engenheiro vertical no topo */}
        <Image
          src="/engenheiro-mobile.jpg"
          alt="Engenheiro Starteq montando PC com placa-mãe holográfica"
          fill
          quality={88}
          sizes="(max-width: 768px) 100vw, 1px"
          className="md:hidden object-cover object-top"
        />
        {/* Desktop: engenheiro wide à direita · object-contain mostra a CENA INTEIRA
           (engenheiro + holograma + arco + sparks) sem zoom in close-up */}
        <Image
          src="/engenheiro-desktop.jpg"
          alt="Engenheiro Starteq montando PC com placa-mãe holográfica"
          fill
          quality={90}
          sizes="(min-width: 768px) 100vw, 1px"
          className="hidden md:block object-contain"
          style={{
            objectPosition: "right center",
            filter: "brightness(1.08) saturate(1.08)",
          }}
        />

        {/* Gradient mobile · vertical fade pra preto inferior */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-b from-transparent via-starteq-black/50 to-starteq-black pointer-events-none" />
        {/* Gradient desktop · cobre 55% da esquerda pra texto+cards lerem · imagem brilha na direita */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-starteq-black via-starteq-black/90 via-45% to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[inherit] h-full grid md:grid-cols-2 gap-8 items-end md:items-center pt-32 md:pt-0">
          {/* Coluna esquerda · texto + 3 cards stacked · imagem ocupa direita naturalmente */}
          <div>
            <div className="text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              <Icon name="wrench" size={14} className="inline mr-2" />
              O jeito Starteq
            </div>
            <h2 className="font-space text-3xl lg:text-5xl font-black text-starteq-bone leading-tight mb-3 drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)]">
              Comprou na Starteq,<br />
              <span className="text-space-grad">levou tranquilidade.</span>
            </h2>
            <p className="text-starteq-text text-base mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              Cada PC sai da nossa bancada montado, certificado e embalado pra entrega segura.
            </p>

            <div className="space-y-3">
              <ProcessStep
                num="01"
                title="Montagem"
                stat="2.300+ PCs montados"
                text="BIOS e drivers atualizados · cabos pela parte de trás · acabamento de fábrica."
              />
              <ProcessStep
                num="02"
                title="Entrega"
                stat="Same-day em Palmas"
                text="Caixa de ondas duplas com fitas de segurança · motoboy próprio mesmo dia."
              />
              <ProcessStep
                num="03"
                title="Garantia"
                stat="0% lacre · 100% honrada"
                text="Garantia por peça com prazo na NF · você pode abrir e modificar como quiser."
              />
            </div>
          </div>
          {/* Coluna direita vazia · imagem do engenheiro flui aqui naturalmente como background */}
          <div className="hidden md:block" aria-hidden />
        </div>
      </section>

      {/* NEWSLETTER · centro de comando Starteq · cockpit ao fundo */}
      <section className="relative overflow-hidden bg-starteq-black py-20 md:py-24 lg:py-28 border-y border-starteq-line min-h-[560px] md:min-h-[520px] lg:min-h-[560px]">
        {/* Mobile: cockpit vertical com STARTEQ COMMAND no topo · console + waveforms */}
        <Image
          src="/cockpit-mobile.jpg"
          alt="Centro de comando Starteq · displays gold transmitindo sinais"
          fill
          quality={88}
          sizes="(max-width: 768px) 100vw, 1px"
          className="md:hidden object-cover object-top"
        />
        {/* Desktop: cockpit panorâmico full-bleed */}
        <Image
          src="/cockpit-desktop.jpg"
          alt="Centro de comando Starteq · displays gold transmitindo sinais"
          fill
          quality={90}
          sizes="(min-width: 768px) 100vw, 1px"
          className="hidden md:block object-cover"
          style={{ objectPosition: "center center", filter: "brightness(1.05) saturate(1.05)" }}
        />

        {/* Gradient mobile · vertical fade pra preto inferior · texto+form aterrissam na zona escura */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-b from-transparent via-starteq-black/50 to-starteq-black pointer-events-none" />
        {/* Gradient desktop · horizontal fade pra preto na esquerda · texto+form na zona escura */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-starteq-black via-starteq-black/85 via-50% to-transparent pointer-events-none" />

        {/* Meteoros sutis com mix-blend-screen */}
        <div className="absolute inset-0 pointer-events-none" style={{ mixBlendMode: "screen" }}>
          <Meteors className="opacity-50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[inherit] h-full grid md:grid-cols-2 gap-8 items-end md:items-center pt-32 md:pt-0">
          <div>
            <div className="inline-flex items-center gap-2 text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              <Icon name="radio" size={14} />
              Transmissão Starteq
            </div>
            <h2 className="font-space text-3xl lg:text-5xl font-black text-starteq-bone leading-tight mb-3 drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
              Lançamentos<br />
              <span className="text-space-grad">antes da galera.</span>
            </h2>
            <p className="text-starteq-text text-base max-w-lg mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              Entra na lista e recebe drop de RTX nova, promo relâmpago e dicas de build · 1 email por semana, zero spam.
            </p>

            {/* Isca · cupom 5% off na primeira compra */}
            <div className="inline-flex items-center gap-3 mb-6 bg-starteq-gold/10 border border-starteq-gold/40 backdrop-blur-sm rounded-lg px-4 py-3">
              <Icon name="tag" size={20} className="text-starteq-gold flex-shrink-0" />
              <div>
                <div className="text-starteq-gold font-space font-bold text-sm uppercase tracking-wider">Ganha 5% off já no cadastro</div>
                <div className="text-xs text-starteq-text mt-0.5">Cupom enviado no seu email · vale na primeira compra</div>
              </div>
            </div>

            <form className="flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="seu@email.com.br"
                className="flex-1 px-4 py-3.5 rounded-lg bg-starteq-black/80 backdrop-blur-sm border border-starteq-line focus:border-starteq-gold focus:outline-none text-starteq-bone placeholder:text-starteq-muted font-sans text-sm"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-space font-bold tracking-wide uppercase text-sm px-6 py-3.5 rounded-lg transition-all whitespace-nowrap shadow-lg shadow-starteq-gold/20"
              >
                Receber cupom <Icon name="arrow-right" size={14} strokeWidth={2.5} />
              </button>
            </form>
            <p className="text-[10px] text-starteq-muted mt-3 uppercase tracking-wider font-space font-bold">
              Sem spam · cancela quando quiser · LGPD compliance
            </p>
          </div>
          <div className="hidden md:block" aria-hidden />
        </div>
      </section>

      {/* CTA FINAL · linha direta WhatsApp · satélite Starteq comunica com Palmas */}
      <section className="relative overflow-hidden bg-starteq-black py-20 md:py-24 lg:py-32 min-h-[560px] md:min-h-[560px] lg:min-h-[620px]">
        {/* Mobile: satélite vertical (usa desktop até mobile dedicada chegar) */}
        <Image
          src="/satelite-desktop.jpg"
          alt="Satélite Starteq · linha direta de comunicação com Palmas"
          fill
          quality={88}
          sizes="(max-width: 768px) 100vw, 1px"
          className="md:hidden object-cover object-center"
        />
        {/* Desktop: satélite wide · mostra raio gold inteiro saindo da antena pra esquerda */}
        <Image
          src="/satelite-desktop.jpg"
          alt="Satélite Starteq · linha direta de comunicação com Palmas"
          fill
          quality={92}
          sizes="(min-width: 768px) 100vw, 1px"
          className="hidden md:block object-cover"
          style={{ objectPosition: "center center", filter: "brightness(1.08) saturate(1.08)" }}
        />

        {/* Gradient mobile · vertical fade pra preto inferior */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-b from-transparent via-starteq-black/55 to-starteq-black pointer-events-none" />
        {/* Gradient desktop · horizontal fade pra preto na esquerda */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-starteq-black via-starteq-black/85 via-50% to-transparent pointer-events-none" />

        {/* Meteoros mix-blend-screen */}
        <div className="absolute inset-0 pointer-events-none" style={{ mixBlendMode: "screen" }}>
          <Meteors className="opacity-50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[inherit] h-full grid md:grid-cols-2 gap-8 items-end md:items-center pt-32 md:pt-0">
          <div>
            <div className="inline-flex items-center gap-2 text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-starteq-pix opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-starteq-pix" />
              </span>
              Linha direta · online agora
            </div>
            <h2 className="font-space text-4xl lg:text-6xl font-black text-starteq-bone leading-[0.95] mb-4 drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
              Em dúvida?<br />
              <span className="text-space-grad">Fala com a gente.</span>
            </h2>
            <p className="text-starteq-text text-lg max-w-xl mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              Equipe real em Palmas · responde no WhatsApp em até <strong className="text-starteq-bone">30 minutos</strong> de segunda a sábado, 8h às 18h.
              Sem bot impessoal · sem letrinha miúda.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/5563992528619?text=Oi!%20Cheguei%20pelo%20site%20da%20Starteq%2C%20preciso%20de%20uma%20ajuda%20pra%20escolher%20um%20produto."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-starteq-pix text-white hover:opacity-90 font-space font-bold tracking-wide uppercase text-base px-8 py-5 rounded-lg transition-all shadow-2xl shadow-starteq-pix/30"
              >
                <Icon name="whatsapp" size={20} strokeWidth={2.2} />
                Falar com a equipe
              </a>
              <Link
                href="/montador"
                className="inline-flex items-center justify-center gap-2 bg-starteq-black/60 backdrop-blur-sm border border-starteq-gold/40 hover:border-starteq-gold text-starteq-gold font-space font-bold tracking-wide uppercase text-sm px-6 py-5 rounded-lg transition-all"
              >
                Prefiro montar sozinho
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-4 text-xs text-starteq-muted">
              <span className="inline-flex items-center gap-1">
                <Icon name="check" size={12} className="text-starteq-pix" /> Sem bot
              </span>
              <span className="inline-flex items-center gap-1">
                <Icon name="check" size={12} className="text-starteq-pix" /> Sem fila
              </span>
              <span className="inline-flex items-center gap-1">
                <Icon name="check" size={12} className="text-starteq-pix" /> Time em Palmas
              </span>
            </div>
          </div>
          <div className="hidden md:block" aria-hidden />
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

function ProcessStep({ num, title, stat, text }: { num: string; title: string; stat: string; text: string }) {
  return (
    <div className="group relative rounded-xl p-4 transition-all hover:-translate-x-1 flex items-start gap-4 border-l-2 border-starteq-gold/30 hover:border-starteq-gold">
      <div className="font-space text-4xl lg:text-5xl font-black text-starteq-gold leading-none flex-shrink-0 w-14 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
        {num}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <h3 className="font-space font-bold text-lg text-starteq-bone drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">{title}</h3>
          <span className="text-[10px] font-space font-bold uppercase tracking-wider text-starteq-gold bg-starteq-black/60 backdrop-blur-sm border border-starteq-gold/40 px-2 py-0.5 rounded">
            {stat}
          </span>
        </div>
        <p className="text-sm text-starteq-text leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">{text}</p>
      </div>
    </div>
  );
}
