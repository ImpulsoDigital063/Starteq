import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { requireSession } from "@/lib/admin-auth";

export const metadata = {
  title: "Editar Site · Painel Starteq",
};

type SiteSection = {
  id: string;
  label: string;
  description: string;
  icon: IconName;
  publicHref: string;
  fields: string[];
  status: "publicado" | "rascunho" | "sincronizado";
  lastEdit: string;
};

const SECTIONS: SiteSection[] = [
  {
    id: "hero",
    label: "Hero · capa principal",
    description: "Título, subtítulo, CTAs e imagem do astronauta no topo da home",
    icon: "rocket",
    publicHref: "/",
    fields: ["H1", "Subtítulo", "CTA primário", "CTA secundário", "Stats (3)"],
    status: "publicado",
    lastEdit: "Hoje · 11:23",
  },
  {
    id: "categorias",
    label: "Categorias destacadas",
    description: "6 tiles da seção 'Onde quer começar?' com fotos",
    icon: "package",
    publicHref: "/#categorias",
    fields: ["6 categorias · ordem · destaque (1)"],
    status: "publicado",
    lastEdit: "Ontem · 17:42",
  },
  {
    id: "promo",
    label: "Faixa promocional",
    description: "Marquee dourada · benefícios de vendas (PIX off, 10x, garantia)",
    icon: "zap",
    publicHref: "/#promo",
    fields: ["6 itens da faixa · ícone + texto"],
    status: "sincronizado",
    lastEdit: "Há 3 dias",
  },
  {
    id: "marcas",
    label: "Marcas oficiais",
    description: "Carrossel infinito com 11 logos · velocidade acelera mobile",
    icon: "trophy",
    publicHref: "/#marcas",
    fields: ["Lista de marcas · logos SVG · ordem"],
    status: "sincronizado",
    lastEdit: "Há 2 dias",
  },
  {
    id: "selos",
    label: "O jeito Starteq · 3 etapas",
    description: "Background engenheiro + 3 cards numerados (Montagem, Entrega, Garantia)",
    icon: "shield",
    publicHref: "/#selos",
    fields: ["3 cards · número · título · stat · texto"],
    status: "publicado",
    lastEdit: "Hoje · 09:15",
  },
  {
    id: "newsletter",
    label: "Newsletter + Cupom",
    description: "Centro de Comando · texto + isca de cupom 5% off",
    icon: "mail",
    publicHref: "/#newsletter",
    fields: ["Título", "Subtítulo", "Texto cupom", "Disclaimer"],
    status: "publicado",
    lastEdit: "Hoje · 10:50",
  },
  {
    id: "cta-final",
    label: "CTA final · WhatsApp humano",
    description: "Satélite · 'Em dúvida? Fala com a gente' · linha direta",
    icon: "whatsapp",
    publicHref: "/#cta-final",
    fields: ["Headline", "Subhead", "CTA 1 (WhatsApp)", "CTA 2 (Montador)"],
    status: "publicado",
    lastEdit: "Hoje · 11:10",
  },
  {
    id: "blog",
    label: "Blog · posts e tags",
    description: "Tutoriais e dicas técnicas · cada cliente que lê vira lead morno",
    icon: "file",
    publicHref: "/blog",
    fields: ["6 posts · publicar/despublicar · tags"],
    status: "publicado",
    lastEdit: "Há 5 dias",
  },
  {
    id: "footer",
    label: "Footer · endereço, horários, links",
    description: "Loja física · contato · pagamento · versículo bíblico",
    icon: "map-pin",
    publicHref: "/#footer",
    fields: ["Endereço", "Horários (auto)", "WhatsApp", "Email", "Versículo", "Redes"],
    status: "publicado",
    lastEdit: "Hoje · 13:00",
  },
  {
    id: "brand",
    label: "Identidade visual",
    description: "Logo, cores principais, fonte · changes propagam pra todo o site",
    icon: "sparkles",
    publicHref: "/",
    fields: ["Logo SVG", "Cor primária (gold)", "Cor PIX (verde)", "Fonte display"],
    status: "sincronizado",
    lastEdit: "Há 7 dias",
  },
];

const STATUS_STYLE: Record<SiteSection["status"], string> = {
  publicado: "bg-starteq-pix/10 text-starteq-pix border-starteq-pix/40",
  rascunho: "bg-starteq-gold/10 text-starteq-gold border-starteq-gold/40",
  sincronizado: "bg-starteq-card text-starteq-muted border-starteq-line",
};

export default async function EditarSitePage() {
  return (
    <>
      <header className="mb-6 flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h1 className="font-space text-2xl lg:text-3xl font-black text-starteq-bone">Editar Site</h1>
          <p className="text-starteq-muted mt-1 text-sm">10 seções · alterações vão ao ar em ~30s</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 bg-starteq-card border border-starteq-line hover:border-starteq-gold/40 text-starteq-bone font-space font-bold tracking-wide uppercase text-xs px-4 py-2.5 rounded-lg"
          >
            <Icon name="eye" size={14} /> Ver site público
          </Link>
          <button className="inline-flex items-center gap-2 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-space font-bold tracking-wide uppercase text-xs px-4 py-2.5 rounded-lg">
            <Icon name="check" size={14} /> Publicar mudanças
          </button>
        </div>
      </header>

      {/* Banner explicativo */}
      <div className="bg-starteq-coal border border-starteq-gold/30 rounded-xl p-4 mb-6 flex items-start gap-3">
        <Icon name="info" size={20} className="text-starteq-gold flex-shrink-0 mt-0.5" />
        <div className="flex-1 text-sm">
          <div className="font-space font-bold text-starteq-bone">Como funciona</div>
          <p className="text-starteq-text mt-1 leading-relaxed">
            Cada seção do site abre um <b>editor visual</b> · você muda texto, imagem ou ordem · clica em <b className="text-starteq-gold">Publicar mudanças</b> e em ~30s tá no ar.
            Mudanças importantes (cor, logo) pedem confirmação.
          </p>
        </div>
      </div>

      {/* Grid das seções editáveis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {SECTIONS.map((s) => (
          <div
            key={s.id}
            className="bg-starteq-card border border-starteq-line hover:border-starteq-gold/40 rounded-xl p-4 transition-colors"
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="w-10 h-10 rounded-lg bg-starteq-gold/10 border border-starteq-gold/30 flex items-center justify-center flex-shrink-0">
                <Icon name={s.icon} size={18} className="text-starteq-gold" />
              </div>
              <span className={`text-[10px] font-space font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${STATUS_STYLE[s.status]}`}>
                {s.status}
              </span>
            </div>

            <h3 className="font-space font-bold text-starteq-bone text-base mb-1">{s.label}</h3>
            <p className="text-xs text-starteq-muted leading-relaxed mb-3 line-clamp-2">{s.description}</p>

            <div className="text-[10px] text-starteq-muted mb-3 font-mono">
              {s.fields.length} campo{s.fields.length !== 1 ? "s" : ""} editável{s.fields.length !== 1 ? "s" : ""} · {s.lastEdit}
            </div>

            <div className="flex gap-2">
              <button className="flex-1 inline-flex items-center justify-center gap-1.5 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-space font-bold uppercase text-xs tracking-wider px-3 py-2 rounded-lg">
                <Icon name="wrench" size={12} /> Editar
              </button>
              <Link
                href={s.publicHref}
                target="_blank"
                className="inline-flex items-center justify-center gap-1.5 bg-starteq-coal border border-starteq-line hover:border-starteq-gold/40 text-starteq-text hover:text-starteq-gold font-space font-bold uppercase text-xs tracking-wider px-3 py-2 rounded-lg"
                title="Ver no site"
              >
                <Icon name="eye" size={12} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Histórico de mudanças */}
      <section className="mt-8">
        <h2 className="font-space text-xs font-bold uppercase tracking-[0.2em] text-starteq-gold mb-3 inline-flex items-center gap-2">
          <Icon name="info" size={14} /> Últimas mudanças publicadas
        </h2>

        <div className="bg-starteq-card border border-starteq-line rounded-xl overflow-hidden">
          <div className="divide-y divide-starteq-line">
            <HistoryRow when="Hoje · 13:00" section="Footer" what="Adicionou versículo bíblico" who="Júnior" />
            <HistoryRow when="Hoje · 11:23" section="Hero" what="Trocou H1 e CTA · 'em órbita' → 'em Palmas. Hoje.'" who="Eduardo" />
            <HistoryRow when="Hoje · 11:10" section="CTA final" what="Mudou foco · montador → WhatsApp humano" who="Eduardo" />
            <HistoryRow when="Hoje · 10:50" section="Newsletter" what="Adicionou cupom 5% como isca" who="Eduardo" />
            <HistoryRow when="Hoje · 09:15" section="Selos" what="Substituiu 3 ícones genéricos por engenheiro + stats reais" who="Eduardo" />
          </div>
        </div>
      </section>
    </>
  );
}

function HistoryRow({ when, section, what, who }: { when: string; section: string; what: string; who: string }) {
  return (
    <div className="px-4 py-3 flex items-center justify-between gap-3 flex-wrap text-sm">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="text-[10px] font-space font-bold uppercase tracking-wider text-starteq-muted w-20 flex-shrink-0">{when}</div>
        <div className="flex-1 min-w-0">
          <span className="font-space font-bold text-starteq-bone">{section}</span>
          <span className="text-starteq-text"> · {what}</span>
        </div>
      </div>
      <span className="text-[10px] font-space font-bold uppercase tracking-wider text-starteq-gold flex-shrink-0">por {who}</span>
    </div>
  );
}
