import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StarField } from "@/components/StarField";
import HeroParallax from "@/components/hero3d/HeroParallax";
import { getSiteConfig, type ShelfConfig } from "@/lib/site-config";
import type { Metadata } from "next";
import { ProductShelf } from "@/components/ProductShelf";
import { Icon, type IconName } from "@/components/Icon";
import { getProducts } from "@/lib/comandapro";
import type { Product } from "@/lib/catalog";

export const dynamic = "force-dynamic";

// Marcas com SVG logo local · ordenadas por relevância pro nicho gamer
const BRAND_LOGOS = [
  { slug: "intel", name: "Intel" },
  { slug: "amd", name: "AMD" },
  { slug: "nvidia", name: "NVIDIA" },
  { slug: "asus", name: "ASUS" },
  { slug: "msi", name: "MSI" },
  { slug: "corsair", name: "Corsair" },
  { slug: "samsung", name: "Samsung" },
  { slug: "hyperx", name: "HyperX" },
  { slug: "razer", name: "Razer" },
  { slug: "acer", name: "Acer" },
  { slug: "lg", name: "LG" },
];

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteConfig();
  return { title: site.seo.title, description: site.seo.description };
}

export default async function Home() {
  const PRODUCTS = await getProducts();
  const site = await getSiteConfig();
  const shelf = (k: string) => site.shelves.find((s) => s.key === k);
  const byBadge = (b: Product["badge"]) => PRODUCTS.filter((p) => p.badge === b && p.stock > 0);
  const lancamentos = byBadge("Lançamento");
  const maisVendidos = byBadge("Mais Vendido");
  const promos = [...byBadge("Promo"), ...byBadge("OpenBox")];
  const inStockFirst = (a: Product, b: Product) => (b.stock > 0 ? 1 : 0) - (a.stock > 0 ? 1 : 0);
  const pcsProntos = [...PRODUCTS.filter((p) => p.category === "computadores")].sort(inStockFirst);
  // spread por subcategoria: evita a prateleira virar 8 itens do mesmo tipo
  const spread = (cats: Product["category"][], perCat: number, total: number) =>
    cats.flatMap((c) => PRODUCTS.filter((p) => p.category === c && p.stock > 0).slice(0, perCat)).slice(0, total);
  const perifericos = spread(["mouse", "teclado", "monitor", "headset", "cadeira", "mousepad"], 2, 8);
  const hardware = spread(["gpu", "cpu", "ssd", "fonte"], 2, 8);

  return (
    <>
      <Header />

      {/* HERO · imagem cinematográfica full-bleed + texto sobre negative space */}
      <section className="relative overflow-hidden bg-starteq-black min-h-[85svh] md:min-h-[88vh] flex items-end md:items-center">
        {/* Hero 2.5D · foto cinematográfica + parallax/profundidade + surpresa no scroll (decolagem) · responsivo */}
        <HeroParallax
          desktopSrc="/hero-desktop.jpg"
          mobileSrc="/hero-mobile.jpg"
          objectPosition="calc(100% + 80px) center"
          mobileObjectPosition="center top"
        />

        {/* Gradient overlay mobile: vertical fade pra preto na metade inferior · esconde watermark AI */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-b from-transparent via-starteq-black/20 to-starteq-black pointer-events-none" />
        {/* Gradient overlay desktop: preto sólido cobrindo a metade esquerda (esconde o
            gibberish da imagem AI atrás do título) e desvanecendo pro astronauta à direita */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-starteq-black from-[48%] via-starteq-black/75 via-[72%] to-transparent pointer-events-none" />
        {/* Gradient fino topo+base · fade pra preto puro · sutil pra preservar brilho */}
        <div className="absolute inset-0 bg-gradient-to-b from-starteq-black/25 via-transparent to-starteq-black/50 pointer-events-none" />

        {/* poeira/warp já vêm do HeroParallax */}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-starteq-gold/40 bg-starteq-black/60 backdrop-blur-sm text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-starteq-gold animate-pulse" />
              {site.hero.eyebrow}
            </div>
            <h1 className="font-space text-4xl sm:text-5xl lg:text-7xl font-black leading-[0.95] text-starteq-bone mb-6 drop-shadow-[0_2px_20px_rgba(0,0,0,0.85)]">
              {site.hero.titleLine1}<br />
              <span className="text-space-grad">{site.hero.titleLine2}</span>
            </h1>
            <p className="text-base sm:text-lg text-starteq-text leading-relaxed max-w-lg mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              {site.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={site.hero.ctaPrimary.href}
                data-magnetic
                className="inline-flex items-center justify-center gap-2 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-space font-bold tracking-wide uppercase text-sm px-8 py-4 rounded-lg transition-all animate-pulse-glow shadow-2xl shadow-starteq-gold/30"
              >
                {site.hero.ctaPrimary.label}
                <Icon name="arrow-right" size={18} strokeWidth={2.5} />
              </Link>
              <Link
                href={site.hero.ctaSecondary.href}
                data-magnetic
                className="inline-flex items-center justify-center gap-2 bg-starteq-black/60 backdrop-blur-sm border border-starteq-line hover:border-starteq-gold/40 text-starteq-bone hover:text-starteq-gold font-space font-bold tracking-wide uppercase text-sm px-8 py-4 rounded-lg transition-all"
              >
                {site.hero.ctaSecondary.label}
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-starteq-coal pointer-events-none" />
      </section>

      {/* FAIXA PROMO · marquee */}
      <section className="bg-starteq-gold text-starteq-black py-3 overflow-hidden">
        <div className="flex items-center justify-center gap-12 whitespace-nowrap animate-[scroll_30s_linear_infinite] font-space font-bold uppercase tracking-wider text-sm">
          {site.marquee.flatMap((m, i) => [
            i > 0 ? <span key={`sep-${i}`}>·</span> : null,
            <PromoBadge key={`badge-${i}`} icon={m.icon} text={m.text} />,
          ])}
        </div>
      </section>

      {/* QUAL PC VOCÊ PROCURA · tiles por objetivo → montador */}
      <section className="bg-starteq-black py-12 lg:py-16 border-b border-starteq-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-2">
            <Icon name="gamepad" size={16} />
            Pra que vai ser a máquina
          </div>
          <h2 data-glitch className="font-space text-3xl lg:text-4xl font-black text-starteq-bone mb-8">Qual PC você procura?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {site.objectives.map((o, i) => (
              <ObjectiveTile key={i} icon={o.icon} title={o.title} desc={o.desc} href={o.href} />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIAS · launch pad */}
      <section className="bg-starteq-coal py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-2">
            <Icon name="gamepad" size={16} />
            Categorias
          </div>
          <h2 className="font-space text-3xl lg:text-4xl font-black text-starteq-bone mb-8">{site.categorias.title}</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {site.categorias.items.map((c, i) => (
              <CategoryTile key={i} href={c.href} label={c.label} image={c.image} accent={c.accent} />
            ))}
          </div>
        </div>
      </section>

      <ConfigShelf cfg={shelf("lancamentos")} products={lancamentos} />

      {/* BANNER CTA MONTADOR · nave Starteq atravessando o fundo */}
      <section className="relative overflow-hidden bg-starteq-black py-12 md:py-24 lg:py-32 border-y border-starteq-line min-h-[460px] md:min-h-[520px] lg:min-h-[600px]">
        {/* Banda 2.5D · nave + parallax/profundidade + warp no scroll */}
        <HeroParallax
          desktopSrc="/nave-desktop.jpg"
          mobileSrc="/nave-mobile.jpg"
          objectPosition="60% center"
          mobileObjectPosition="center top"
          filter="brightness(1.08) saturate(1.08) contrast(1.03)"
        />

        {/* Gradient overlay mobile · vertical fade pra preto na metade inferior */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-b from-transparent via-starteq-black/30 to-starteq-black pointer-events-none" />
        {/* Gradient overlay desktop · horizontal fade pra preto na esquerda (mais agressivo no canto pra texto ler) */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-starteq-black via-starteq-black/70 via-50% to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-starteq-black/40 via-transparent to-starteq-black/60 pointer-events-none" />

        {/* poeira/warp vêm do HeroParallax */}

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-8 items-end lg:items-center h-full pt-20 md:pt-0 text-center lg:text-left">
          <div className="max-w-xl mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              <Icon name={site.montador.eyebrowIcon} size={16} />
              {site.montador.eyebrow}
            </div>
            <h2 className="font-space text-3xl lg:text-5xl font-black text-starteq-bone leading-tight mb-3 drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)]">
              {site.montador.title} <span className="text-space-grad">{site.montador.titleAccent}</span>
            </h2>
            <p className="text-starteq-text text-base lg:text-lg max-w-xl mx-auto lg:mx-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              {site.montador.subtitle}
            </p>
          </div>
          <Link
            href={site.montador.ctaHref}
            className="inline-flex items-center justify-center gap-2 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-space font-bold tracking-wide uppercase text-base px-8 py-5 rounded-lg transition-all animate-pulse-glow whitespace-nowrap shadow-2xl shadow-starteq-gold/30 mx-auto lg:mx-0"
          >
            {site.montador.ctaLabel} <Icon name="arrow-right" size={20} strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      <ConfigShelf cfg={shelf("maisVendidos")} products={maisVendidos} />

      <ConfigShelf cfg={shelf("pcsProntos")} products={pcsProntos} highlightFirst />

      {/* SOCIAL PROOF · transmissão da base */}
      <section className="bg-starteq-coal py-12 border-y border-starteq-line">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase">
              <Icon name="check" size={16} />
              {site.socialProof.eyebrow}
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {site.socialProof.stats.map((s, i) => (
              <div key={i}>
                <div className="font-space text-4xl font-black text-starteq-gold">{s.value}</div>
                <div className="text-sm text-starteq-text mt-1">{s.label}</div>
                <div className="text-xs text-starteq-muted mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConfigShelf cfg={shelf("hardware")} products={hardware} />


      {/* MARCAS · carrossel logos reais (SVG simpleicons) */}
      <section className="bg-starteq-coal py-12 border-y border-starteq-line overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="text-center">
            <div className="text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase">
              {site.marcasTitle}
            </div>
          </div>
        </div>
        <div className="overflow-hidden">
          {/* duplicar a lista pra criar loop infinito · velocidade acelera no mobile via CSS */}
          <div className="flex gap-12 lg:gap-16 marquee-brands whitespace-nowrap items-center">
            {[...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS].map((b, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center justify-center h-10 opacity-60 hover:opacity-100 transition-opacity"
                title={b.name}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/brands/${b.slug}.svg`}
                  alt={b.name}
                  className="h-full w-auto max-w-[120px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SELOS · O jeito Starteq · engenheiro espacial no fundo + 3 etapas numeradas */}
      <section className="relative overflow-hidden bg-starteq-black py-12 md:py-20 lg:py-24 min-h-[480px] md:min-h-[560px]">
        {/* Banda 2.5D · engenheiro (contain, cena inteira) + parallax + warp no scroll */}
        <HeroParallax
          desktopSrc="/engenheiro-desktop.jpg"
          mobileSrc="/engenheiro-mobile.jpg"
          objectPosition="right center"
          mobileObjectPosition="center top"
          fit="contain"
          baseScale={1}
          filter="brightness(1.08) saturate(1.08)"
        />

        {/* Gradient mobile · vertical fade pra preto inferior */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-b from-transparent via-starteq-black/50 to-starteq-black pointer-events-none" />
        {/* Gradient desktop · cobre 55% da esquerda pra texto+cards lerem · imagem brilha na direita */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-starteq-black via-starteq-black/90 via-45% to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[inherit] h-full grid md:grid-cols-2 gap-8 items-end md:items-center pt-16 md:pt-0">
          {/* Coluna esquerda · texto + 3 cards stacked · imagem ocupa direita naturalmente */}
          <div>
            <div className="text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              <Icon name={site.bands.selos.eyebrowIcon} size={14} className="inline mr-2" />
              {site.bands.selos.eyebrow}
            </div>
            <h2 className="font-space text-3xl lg:text-5xl font-black text-starteq-bone leading-tight mb-3 drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)]">
              {site.bands.selos.title}<br />
              <span className="text-space-grad">{site.bands.selos.titleAccent}</span>
            </h2>
            <p className="text-starteq-text text-base mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              {site.bands.selos.subtitle}
            </p>

            <div className="space-y-3">
              {site.bands.selos.steps.map((s, i) => (
                <ProcessStep key={i} num={s.num} title={s.title} stat={s.stat} text={s.text} />
              ))}
            </div>
          </div>
          {/* Coluna direita vazia · imagem do engenheiro flui aqui naturalmente como background */}
          <div className="hidden md:block" aria-hidden />
        </div>
      </section>

      <ConfigShelf cfg={shelf("perifericos")} products={perifericos} />

      {/* NEWSLETTER · centro de comando Starteq · cockpit ao fundo */}
      <section className="relative overflow-hidden bg-starteq-black py-12 md:py-20 lg:py-24 border-y border-starteq-line min-h-[460px] md:min-h-[480px] lg:min-h-[520px]">
        {/* Banda 2.5D · cockpit + parallax + warp no scroll */}
        <HeroParallax
          desktopSrc="/cockpit-desktop.jpg"
          mobileSrc="/cockpit-mobile.jpg"
          objectPosition="center center"
          mobileObjectPosition="center top"
          filter="brightness(1.05) saturate(1.05)"
        />

        {/* Gradient mobile · vertical fade pra preto inferior · texto+form aterrissam na zona escura */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-b from-transparent via-starteq-black/50 to-starteq-black pointer-events-none" />
        {/* Gradient desktop · horizontal fade pra preto na esquerda · texto+form na zona escura */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-starteq-black via-starteq-black/85 via-50% to-transparent pointer-events-none" />

        {/* poeira/warp vêm do HeroParallax */}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[inherit] h-full grid md:grid-cols-2 gap-8 items-end md:items-center pt-16 md:pt-0">
          <div>
            <div className="inline-flex items-center gap-2 text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              <Icon name={site.bands.newsletter.eyebrowIcon} size={14} />
              {site.bands.newsletter.eyebrow}
            </div>
            <h2 className="font-space text-3xl lg:text-5xl font-black text-starteq-bone leading-tight mb-3 drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
              {site.bands.newsletter.title}<br />
              <span className="text-space-grad">{site.bands.newsletter.titleAccent}</span>
            </h2>
            <p className="text-starteq-text text-base max-w-lg mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              {site.bands.newsletter.subtitle}
            </p>

            {/* Isca · cupom */}
            <div className="inline-flex items-center gap-3 mb-6 bg-starteq-gold/10 border border-starteq-gold/40 backdrop-blur-sm rounded-lg px-4 py-3">
              <Icon name="tag" size={20} className="text-starteq-gold flex-shrink-0" />
              <div>
                <div className="text-starteq-gold font-space font-bold text-sm uppercase tracking-wider">{site.bands.newsletter.couponTitle}</div>
                <div className="text-xs text-starteq-text mt-0.5">{site.bands.newsletter.couponText}</div>
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

      <ConfigShelf cfg={shelf("promos")} products={promos} />

      {/* CONFIANÇA / LOCAL · a vantagem que loja nacional não tem */}
      <section className="bg-starteq-coal py-14 border-y border-starteq-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-2">
            <Icon name="shield" size={16} />
            {site.trust.eyebrow}
          </div>
          <h2 data-glitch className="font-space text-3xl lg:text-4xl font-black text-starteq-bone mb-8">
            {site.trust.title} <span className="text-space-grad">{site.trust.titleAccent}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {site.trust.cards.map((c, i) => (
              <TrustCard key={i} icon={c.icon} title={c.title} lines={c.lines} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL · linha direta WhatsApp · satélite Starteq comunica com Palmas */}
      <section className="relative overflow-hidden bg-starteq-black py-12 md:py-24 lg:py-32 min-h-[460px] md:min-h-[520px] lg:min-h-[580px]">
        {/* Banda 2.5D · satélite + parallax + warp no scroll */}
        <HeroParallax
          desktopSrc="/satelite-desktop.jpg"
          mobileSrc="/satelite-mobile.jpg"
          objectPosition="center center"
          mobileObjectPosition="center top"
          filter="brightness(1.08) saturate(1.08)"
        />

        {/* Gradient mobile · vertical fade pra preto inferior */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-b from-transparent via-starteq-black/55 to-starteq-black pointer-events-none" />
        {/* Gradient desktop · horizontal fade pra preto na esquerda */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-starteq-black via-starteq-black/85 via-50% to-transparent pointer-events-none" />

        {/* poeira/warp vêm do HeroParallax */}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[inherit] h-full grid md:grid-cols-2 gap-8 items-end md:items-center pt-16 md:pt-0">
          <div>
            <div className="inline-flex items-center gap-2 text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-starteq-pix opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-starteq-pix" />
              </span>
              {site.bands.finalCta.eyebrow}
            </div>
            <h2 className="font-space text-4xl lg:text-6xl font-black text-starteq-bone leading-[0.95] mb-4 drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
              {site.bands.finalCta.title}<br />
              <span className="text-space-grad">{site.bands.finalCta.titleAccent}</span>
            </h2>
            <p className="text-starteq-text text-lg max-w-xl mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              {site.bands.finalCta.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${site.contact.whatsapp}?text=Oi!%20Cheguei%20pelo%20site%20da%20Starteq%2C%20preciso%20de%20uma%20ajuda%20pra%20escolher%20um%20produto.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-starteq-pix text-white hover:opacity-90 font-space font-bold tracking-wide uppercase text-base px-8 py-5 rounded-lg transition-all shadow-2xl shadow-starteq-pix/30"
              >
                <Icon name="whatsapp" size={20} strokeWidth={2.2} />
                {site.bands.finalCta.ctaLabel}
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
  image,
  accent = false,
}: {
  href: string;
  label: string;
  image: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative rounded-xl border overflow-hidden transition-all hover:-translate-y-1 ${
        accent
          ? "bg-starteq-gold/5 border-starteq-gold/40 hover:border-starteq-gold"
          : "bg-starteq-card border-starteq-line hover:border-starteq-gold/40"
      }`}
    >
      <div className="aspect-square overflow-hidden bg-gradient-to-b from-starteq-card to-starteq-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={label}
          loading="lazy"
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
        {/* Gradient bottom pra leitura do título */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-starteq-black via-starteq-black/80 to-transparent pointer-events-none" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-3 lg:p-4">
        <div
          className={`font-space font-bold text-sm lg:text-base leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] ${
            accent ? "text-starteq-gold" : "text-starteq-bone group-hover:text-starteq-gold"
          }`}
        >
          {label}
        </div>
      </div>
      {accent && (
        <div className="absolute top-2 right-2 text-[10px] font-space font-bold uppercase tracking-wider text-starteq-gold bg-starteq-black/70 border border-starteq-gold/40 px-2 py-0.5 rounded backdrop-blur-sm">
          Destaque
        </div>
      )}
    </Link>
  );
}

function ObjectiveTile({ icon, title, desc, href }: { icon: IconName; title: string; desc: string; href: string }) {
  return (
    <Link
      href={href}
      data-tilt
      className="group relative bg-starteq-card border border-starteq-line hover:border-starteq-gold/50 rounded-xl p-5 flex flex-col gap-3 overflow-hidden hover:shadow-2xl hover:shadow-starteq-gold/10 transition-colors"
    >
      <div className="w-12 h-12 rounded-lg bg-starteq-gold/10 border border-starteq-gold/30 flex items-center justify-center text-starteq-gold group-hover:bg-starteq-gold/20 transition-colors">
        <Icon name={icon} size={24} />
      </div>
      <div className="font-space font-black text-lg text-starteq-bone group-hover:text-starteq-gold transition-colors">{title}</div>
      <p className="text-sm text-starteq-muted leading-snug flex-1">{desc}</p>
      <div className="inline-flex items-center gap-1.5 text-starteq-gold font-space font-bold text-xs uppercase tracking-wider">
        Montar meu PC <Icon name="arrow-right" size={14} strokeWidth={2.5} />
      </div>
    </Link>
  );
}

function ConfigShelf({ cfg, products, highlightFirst }: { cfg?: ShelfConfig; products: Product[]; highlightFirst?: boolean }) {
  if (!cfg || cfg.enabled === false || products.length === 0) return null;
  return (
    <ProductShelf
      eyebrowIcon={cfg.eyebrowIcon}
      eyebrow={cfg.eyebrow}
      title={cfg.title}
      subtitle={cfg.subtitle}
      products={products}
      accentColor={cfg.accentColor}
      ctaHref={cfg.ctaHref}
      ctaLabel={cfg.ctaLabel}
      highlightFirst={highlightFirst}
    />
  );
}

function TrustCard({ icon, title, lines }: { icon: IconName; title: string; lines: string[] }) {
  return (
    <div
      data-tilt
      className="bg-starteq-card border border-starteq-line hover:border-starteq-gold/40 rounded-xl p-5 flex flex-col gap-3 transition-colors"
    >
      <div className="w-12 h-12 rounded-lg bg-starteq-gold/10 border border-starteq-gold/30 flex items-center justify-center text-starteq-gold">
        <Icon name={icon} size={24} />
      </div>
      <div className="font-space font-bold text-base text-starteq-bone">{title}</div>
      <div className="text-sm text-starteq-muted leading-snug space-y-0.5">
        {lines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
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
