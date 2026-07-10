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
  contact: {
    whatsapp: string; // só dígitos, ex "5563992528619"
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
  contact: {
    whatsapp: "5563992528619",
    whatsappDisplay: "(63) 99252-8619",
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
