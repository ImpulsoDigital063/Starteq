// Config editável do SITE (hero, esteira, tiles, confiança, contato, SEO).
// Lê headless do ComandaPRO (/api/loja/[slug]/site-config), IGUAL ao catálogo.
// Enquanto o endpoint não existe (ou vem vazio): cai no DEFAULT abaixo = o site de hoje.
// Quando o módulo "Meu Site" do ComandaPRO publicar, o site assume automático. Zero acoplamento.
import type { IconName } from "@/components/Icon";

const BASE = process.env.NEXT_PUBLIC_COMANDAPRO_API || "https://comandapro.net.br";
const SLUG = process.env.NEXT_PUBLIC_STARTEQ_SLUG || "starteq";

export type CtaConfig = { label: string; href: string };
export type MarqueeItem = { icon: IconName; text: string };
export type ObjectiveItem = { icon: IconName; title: string; desc: string; href: string };
export type TrustCardItem = { icon: IconName; title: string; lines: string[] };
export type CategoryTileItem = { label: string; href: string; image: string; accent?: boolean };
export type ShelfConfig = {
  key: string;
  eyebrowIcon: IconName;
  eyebrow: string;
  title: string;
  subtitle: string;
  accentColor: "gold" | "red" | "purple";
  ctaHref?: string;
  ctaLabel?: string;
  enabled?: boolean;
};
export type BandCopy = {
  eyebrow: string;
  eyebrowIcon: IconName;
  title: string;
  titleAccent: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
};
export type ProcessStepItem = { num: string; title: string; stat: string; text: string };
export type StatItem = { value: string; label: string; sub: string };
export type BandHead = { eyebrow: string; eyebrowIcon: IconName; title: string; titleAccent: string; subtitle: string };

export type SiteConfig = {
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string; // linha com destaque (gradiente dourado)
    subtitle: string;
    ctaPrimary: CtaConfig;
    ctaSecondary: CtaConfig;
  };
  marquee: MarqueeItem[];
  objectives: ObjectiveItem[];
  trust: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    cards: TrustCardItem[];
  };
  categorias: { title: string; items: CategoryTileItem[] };
  shelves: ShelfConfig[];
  montador: BandCopy;
  marcasTitle: string;
  socialProof: { eyebrow: string; stats: StatItem[] };
  bands: {
    selos: BandHead & { steps: ProcessStepItem[] };
    newsletter: BandHead & { couponTitle: string; couponText: string };
    finalCta: { eyebrow: string; title: string; titleAccent: string; subtitle: string; ctaLabel: string };
  };
  contact: {
    whatsapp: string; // só dígitos, ex "5563992988916"
    whatsappDisplay: string;
    email: string;
    instagram: string; // handle sem @
  };
  seo: { title: string; description: string };
};

// ===== DEFAULT = o conteúdo do site hoje (fonte da verdade enquanto não há editor) =====
export const DEFAULT_SITE_CONFIG: SiteConfig = {
  hero: {
    eyebrow: "Estação Palmas · Tocantins",
    titleLine1: "Monte seu PC gamer",
    titleLine2: "do seu jeito.",
    subtitle:
      "Você escolhe as peças, a Starteq valida a compatibilidade, monta à mão e testa rodando de verdade. Sem risco de montar errado — e com gente de Palmas pra te ajudar.",
    ctaPrimary: { label: "Montar meu PC", href: "/montador" },
    ctaSecondary: { label: "PCs prontos", href: "/produtos/categoria/computadores" },
  },
  marquee: [
    { icon: "wrench", text: "Montado à mão em Palmas" },
    { icon: "credit-card", text: "10x sem juros no cartão" },
    { icon: "zap", text: "15% off no PIX à vista" },
    { icon: "shield", text: "Garantia por peça sem lacre" },
    { icon: "bot", text: "IA + atendimento humano no WhatsApp" },
    { icon: "rocket", text: "Build com compatibilidade validada" },
  ],
  objectives: [
    { icon: "flame", title: "Jogar pesado", desc: "Os lançamentos AAA no ultra, sem engasgo.", href: "/montador" },
    { icon: "zap", title: "Competitivo", desc: "Valorant, CS e LoL voando, FPS alto e estável.", href: "/montador" },
    { icon: "monitor", title: "Trabalho + jogo", desc: "Edita, faz live e joga na mesma máquina.", href: "/montador" },
    { icon: "rocket", title: "Começar bem", desc: "Seu primeiro PC gamer, montado sem erro.", href: "/montador" },
  ],
  trust: {
    eyebrow: "Por que a Starteq",
    title: "Aqui você",
    titleAccent: "fala com quem monta.",
    cards: [
      { icon: "map-pin", title: "Loja física em Palmas", lines: ["104 Sul, SE 05, Lt. 19 · Sala 07", "Seg–Sex 8h–18h · Sáb 9h–13h"] },
      { icon: "whatsapp", title: "Fala com quem monta", lines: ["Atendimento humano no WhatsApp", "Gente de Palmas, não robô impessoal"] },
      { icon: "shield", title: "Garantia dobrada", lines: ["Peça: garantia do fabricante", "Montagem: coberta pela Starteq"] },
      { icon: "credit-card", title: "PIX & parcelado", lines: ["Mais barato à vista no PIX", "Ou parcelado sem juros no cartão"] },
    ],
  },
  categorias: {
    title: "Onde quer começar?",
    items: [
      { label: "Monte seu PC", href: "/montador", image: "/products/starteq/47b95e4b58f6c3a4bba19cde1e5d827d.webp", accent: true },
      { label: "PCs prontos", href: "/produtos/categoria/computadores", image: "/products/starteq/2f2573d306e6188482f1a92060cdf37e.webp" },
      { label: "Placas de vídeo", href: "/produtos/categoria/gpu", image: "/products/starteq/46922faaaef1c8054c64455182263ddb.webp" },
      { label: "Mouse · Teclado", href: "/produtos/categoria/mouse", image: "/products/starteq/37aef31d63aaa19ffb12ec37971dff9d.webp" },
      { label: "Monitores", href: "/produtos/categoria/monitor", image: "/products/starteq/c185550437da2637f362154e3c732eef.webp" },
      { label: "Cadeiras", href: "/produtos/categoria/cadeira", image: "/products/starteq/a6ddc2f506c81e5cd9de4ecc85eaf260.webp" },
    ],
  },
  shelves: [
    { key: "lancamentos", eyebrowIcon: "zap", eyebrow: "Lançamentos", title: "Acabou de chegar", subtitle: "Últimas peças que chegaram em Palmas · do RTX 5070 ao Z790 DDR5", accentColor: "gold" },
    { key: "maisVendidos", eyebrowIcon: "flame", eyebrow: "Mais Vendidos", title: "Top de linha em Palmas", subtitle: "O que a comunidade gamer de Palmas mais pede aqui", accentColor: "red" },
    { key: "pcsProntos", eyebrowIcon: "monitor", eyebrow: "PCs Prontos", title: "Prontos pra levar", subtitle: "PCs montados, certificados e enviados com BIOS+drivers atualizados", accentColor: "gold" },
    { key: "hardware", eyebrowIcon: "cpu", eyebrow: "Hardware", title: "As peças que fazem a build", subtitle: "GPU · CPU · SSD · Fonte das melhores marcas", accentColor: "gold", ctaHref: "/produtos/categoria/gpu", ctaLabel: "Ver Hardware completo" },
    { key: "perifericos", eyebrowIcon: "gamepad", eyebrow: "Periféricos", title: "Setup completo na base", subtitle: "Mouse · teclado · monitor · headset · cadeira · tudo Husky/Razer/HyperX e mais", accentColor: "purple", ctaHref: "/produtos/categoria/mouse", ctaLabel: "Ver Periféricos" },
    { key: "promos", eyebrowIcon: "tag", eyebrow: "Promo · OpenBox", title: "Aproveita antes que esgote", subtitle: "Produtos com desconto especial ou em condição open-box (testados, NF, garantia mantida)", accentColor: "red" },
  ],
  montador: {
    eyebrow: "Configurador inteligente",
    eyebrowIcon: "cpu",
    title: "Monte seu PC",
    titleAccent: "do seu jeito.",
    subtitle: "8 passos · compatibilidade validada · orçamento direto no WhatsApp. A IA cuida pra você não comprar peça errada.",
    ctaLabel: "Iniciar montador",
    ctaHref: "/montador",
  },
  marcasTitle: "Marcas oficiais que vendemos",
  socialProof: {
    eyebrow: "Quem nos conhece",
    stats: [
      { value: "4.6", label: "67 reviews no Google", sub: "Operando há 6+ anos em Palmas" },
      { value: "~30 min", label: "Resposta no WhatsApp", sub: "Equipe real em Palmas · não bot impessoal" },
      { value: "23k+", label: "Curtidas no maior post", sub: "Comunidade gamer @starteq_to" },
    ],
  },
  bands: {
    selos: {
      eyebrow: "O jeito Starteq",
      eyebrowIcon: "wrench",
      title: "Comprou na Starteq,",
      titleAccent: "levou tranquilidade.",
      subtitle: "Cada PC sai da nossa bancada montado, certificado e embalado pra entrega segura.",
      steps: [
        { num: "01", title: "Montagem", stat: "2.300+ PCs montados", text: "BIOS e drivers atualizados · cabos pela parte de trás · acabamento de fábrica." },
        { num: "02", title: "Entrega", stat: "Entrega em Palmas", text: "Caixa de ondas duplas com fitas de segurança · prazo e forma combinados no WhatsApp." },
        { num: "03", title: "Garantia", stat: "0% lacre · 100% honrada", text: "Garantia por peça com prazo na NF · você pode abrir e modificar como quiser." },
      ],
    },
    newsletter: {
      eyebrow: "Transmissão Starteq",
      eyebrowIcon: "radio",
      title: "Lançamentos",
      titleAccent: "antes da galera.",
      subtitle: "Entra na lista e recebe drop de RTX nova, promo relâmpago e dicas de build · 1 email por semana, zero spam.",
      couponTitle: "Ganha 5% off já no cadastro",
      couponText: "Cupom enviado no seu email · vale na primeira compra",
    },
    finalCta: {
      eyebrow: "Linha direta · online agora",
      title: "Em dúvida?",
      titleAccent: "Fala com a gente.",
      subtitle: "Equipe real em Palmas · responde no WhatsApp de segunda a sábado, 8h às 18h. Sem bot impessoal · sem letrinha miúda.",
      ctaLabel: "Falar com a equipe",
    },
  },
  contact: {
    whatsapp: "5563992988916",
    whatsappDisplay: "(63) 99298-8916",
    email: "starteqpalmas@gmail.com",
    instagram: "starteq_to",
  },
  seo: {
    title: "Starteq Tocantins · Hardware Gamer e Assistência Técnica · Palmas-TO",
    description:
      "Loja gamer especializada em Palmas. Monte seu PC com peças validadas, montado à mão e testado. Atendimento humano no WhatsApp.",
  },
};

// merge por seção: o que vier do editor ganha; o resto cai no default (partial-safe)
function merge(remote: Partial<SiteConfig> | null | undefined): SiteConfig {
  const d = DEFAULT_SITE_CONFIG;
  if (!remote) return d;
  return {
    hero: { ...d.hero, ...(remote.hero ?? {}) },
    marquee: remote.marquee?.length ? remote.marquee : d.marquee,
    objectives: remote.objectives?.length ? remote.objectives : d.objectives,
    trust: {
      ...d.trust,
      ...(remote.trust ?? {}),
      cards: remote.trust?.cards?.length ? remote.trust.cards : d.trust.cards,
    },
    categorias: {
      ...d.categorias,
      ...(remote.categorias ?? {}),
      items: remote.categorias?.items?.length ? remote.categorias.items : d.categorias.items,
    },
    shelves: remote.shelves?.length ? remote.shelves : d.shelves,
    montador: { ...d.montador, ...(remote.montador ?? {}) },
    marcasTitle: remote.marcasTitle ?? d.marcasTitle,
    socialProof: {
      ...d.socialProof,
      ...(remote.socialProof ?? {}),
      stats: remote.socialProof?.stats?.length ? remote.socialProof.stats : d.socialProof.stats,
    },
    bands: {
      selos: {
        ...d.bands.selos,
        ...(remote.bands?.selos ?? {}),
        steps: remote.bands?.selos?.steps?.length ? remote.bands.selos.steps : d.bands.selos.steps,
      },
      newsletter: { ...d.bands.newsletter, ...(remote.bands?.newsletter ?? {}) },
      finalCta: { ...d.bands.finalCta, ...(remote.bands?.finalCta ?? {}) },
    },
    contact: { ...d.contact, ...(remote.contact ?? {}) },
    seo: { ...d.seo, ...(remote.seo ?? {}) },
  };
}

/** Config do site, lida do ComandaPRO. Cai no DEFAULT se o endpoint não existir/vazio/erro. */
export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const r = await fetch(`${BASE}/api/loja/${SLUG}/site-config`, { cache: "no-store" });
    if (!r.ok) return DEFAULT_SITE_CONFIG;
    const d = await r.json();
    return merge((d?.config ?? d) as Partial<SiteConfig>);
  } catch {
    return DEFAULT_SITE_CONFIG;
  }
}
