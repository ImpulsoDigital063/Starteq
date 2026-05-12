import { Icon } from "@/components/Icon";
import { requireSession } from "@/lib/admin-auth";
import { CampanhaToggle, CupomCard, TemplateEditor } from "./CampanhasClient";

export const metadata = {
  title: "Campanhas · Painel Starteq",
};

// Automações ativas · cada uma é um gatilho que dispara WhatsApp + email + cupom
const AUTOMACOES = [
  {
    id: "carrinho",
    name: "Carrinho abandonado",
    description: "Cliente adicionou produto mas não finalizou em 24h · dispara WhatsApp + email com cupom 5%",
    icon: "shopping-cart" as const,
    interval: "24h após abandono",
    metric: "12 disparos · 4 conversões",
    enabled: true,
    accent: "gold" as const,
  },
  {
    id: "cotacao",
    name: "Cotou e sumiu",
    description: "Pediu preço pelo WhatsApp mas não voltou em 3 dias · dispara mensagem de retomada",
    icon: "whatsapp" as const,
    interval: "3 dias após cotação",
    metric: "8 disparos · 3 venda",
    enabled: true,
    accent: "pix" as const,
  },
  {
    id: "sumido",
    name: "Cliente sumido (60d)",
    description: "Não compra ou faz OS há 60 dias · oferece cupom 10% pra reativar",
    icon: "ufo" as const,
    interval: "Diariamente · marca como sumido após 60d",
    metric: "5 disparos · 2 retornaram",
    enabled: true,
    accent: "gold" as const,
  },
  {
    id: "os-pos",
    name: "Pós-atendimento (OS)",
    description: "30 dias após retirar a OS · pede review + oferece desconto pra próxima",
    icon: "star" as const,
    interval: "30d após entrega",
    metric: "15 disparos · 11 reviews 5★",
    enabled: true,
    accent: "pix" as const,
  },
  {
    id: "aniversario",
    name: "Aniversário do cliente",
    description: "Manda parabéns + cupom 10% válido por 7 dias",
    icon: "trophy" as const,
    interval: "Diariamente · checa data nascimento",
    metric: "3 este mês",
    enabled: false,
    accent: "gold" as const,
  },
  {
    id: "estoque",
    name: "Voltou ao estoque",
    description: "Cliente clicou em 'Avise quando voltar' · dispara quando reposição entra",
    icon: "package" as const,
    interval: "Webhook reposição",
    metric: "Aguardando 7 alertas",
    enabled: false,
    accent: "pix" as const,
  },
];

// Cupons ativos · gerados pelas automações ou criados manualmente
const CUPONS_ATIVOS = [
  { code: "VOLTEI10", discount: "10% off", scope: "Geral · uso único", usos: 23, criados: 45, expira: "2026-06-15", type: "Sumido" as const },
  { code: "PRIMEIRA5", discount: "5% off", scope: "1ª compra · qualquer SKU", usos: 47, criados: 100, expira: "Permanente", type: "Newsletter" as const },
  { code: "BFEXTRA15", discount: "15% off", scope: "Black Friday · PCs", usos: 0, criados: 200, expira: "2026-11-30", type: "Sazonal" as const },
  { code: "ANIVER10", discount: "10% off", scope: "Aniversário · 7 dias", usos: 3, criados: 50, expira: "Auto", type: "Aniversário" as const },
];

// Campanhas sazonais agendadas
const SAZONAIS = [
  { date: "2026-05-12", label: "Hoje · Dia das Mães", emoji: "🌹", status: "ativa" as const, target: "Clientes com mães cadastradas" },
  { date: "2026-06-12", label: "Dia dos Namorados", emoji: "💝", status: "agendada" as const, target: "Casais · headset duplo + cadeira" },
  { date: "2026-08-11", label: "Dia dos Pais", emoji: "🎁", status: "agendada" as const, target: "Filhos comprando · PC + monitor" },
  { date: "2026-10-12", label: "Dia das Crianças", emoji: "🎮", status: "agendada" as const, target: "Pais comprando · entrada R$ 2.5k" },
  { date: "2026-11-28", label: "Black Friday Starteq", emoji: "🔥", status: "agendada" as const, target: "Todos · -15% PIX cashback" },
  { date: "2026-12-24", label: "Natal", emoji: "🎄", status: "agendada" as const, target: "Última semana · estoque restante" },
];

// Próximos disparos · simulação da fila
const PROXIMOS_DISPAROS = [
  { when: "Em 2h", customer: "Pedro Macedo", template: "carrinho_abandonado", channel: "WhatsApp", value: "R$ 4.790" },
  { when: "Em 6h", customer: "Carla Mendes", template: "os_review_pedido", channel: "WhatsApp + Email", value: "—" },
  { when: "Amanhã 09:00", customer: "Bruno Castro", template: "cotacao_3d", channel: "WhatsApp", value: "R$ 1.290" },
  { when: "Amanhã 10:30", customer: "Júlia Ramos", template: "sumido_60d", channel: "WhatsApp", value: "—" },
  { when: "Em 3 dias", customer: "Diego Almeida", template: "pos_entrega_30d", channel: "Email", value: "—" },
];

export default async function CampanhasPage() {
  return (
    <>
      <header className="mb-6 flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h1 className="font-space text-2xl lg:text-3xl font-black text-starteq-bone">Campanhas e Reativação</h1>
          <p className="text-starteq-muted mt-1 text-sm">Sistema automático de retenção · WhatsApp + email + cupom</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-space font-bold tracking-wide uppercase text-xs px-4 py-2.5 rounded-lg transition-all">
          <Icon name="plus" size={14} /> Nova campanha
        </button>
      </header>

      {/* KPIs · resultados das automações no mês */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <KPI label="Em fila" value="42" sub="clientes ativos" icon="radio" accent="gold" />
        <KPI label="Reativados" value="11" sub="este mês" icon="check" accent="pix" />
        <KPI label="Receita gerada" value="R$ 9.840" sub="campanhas mês" icon="credit-card" accent="gold" />
        <KPI label="ROI" value="14.2×" sub="vs custo zero" icon="trophy" accent="pix" />
      </section>

      {/* AUTOMAÇÕES · 6 cards on/off */}
      <section className="mb-8">
        <h2 className="font-space text-xs font-bold uppercase tracking-[0.2em] text-starteq-gold mb-3 inline-flex items-center gap-2">
          <Icon name="bot" size={14} /> Automações
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {AUTOMACOES.map((a) => (
            <CampanhaToggle key={a.id} automacao={a} />
          ))}
        </div>
      </section>

      {/* PRÓXIMOS DISPAROS · fila */}
      <section className="mb-8">
        <h2 className="font-space text-xs font-bold uppercase tracking-[0.2em] text-starteq-gold mb-3 inline-flex items-center gap-2">
          <Icon name="zap" size={14} /> Próximos disparos (5)
        </h2>

        <div className="bg-starteq-card border border-starteq-line rounded-xl overflow-hidden">
          <div className="divide-y divide-starteq-line">
            {PROXIMOS_DISPAROS.map((p, i) => (
              <div key={i} className="px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-12 text-center flex-shrink-0">
                    <div className="text-[10px] font-space font-bold uppercase tracking-wider text-starteq-gold">{p.when}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-semibold text-sm text-starteq-bone">{p.customer}</div>
                    <div className="text-[10px] text-starteq-muted mt-0.5 font-mono">{p.template} · {p.channel}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {p.value !== "—" && (
                    <span className="text-xs text-starteq-gold font-mono font-bold">{p.value}</span>
                  )}
                  <button className="text-[10px] text-starteq-muted hover:text-starteq-red font-space font-bold uppercase tracking-wider">
                    Adiar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUPONS ATIVOS · lista */}
      <section className="mb-8">
        <h2 className="font-space text-xs font-bold uppercase tracking-[0.2em] text-starteq-gold mb-3 inline-flex items-center gap-2">
          <Icon name="tag" size={14} /> Cupons ativos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CUPONS_ATIVOS.map((c) => (
            <CupomCard key={c.code} cupom={c} />
          ))}
        </div>
      </section>

      {/* CAMPANHAS SAZONAIS · calendário */}
      <section className="mb-8">
        <h2 className="font-space text-xs font-bold uppercase tracking-[0.2em] text-starteq-gold mb-3 inline-flex items-center gap-2">
          <Icon name="trophy" size={14} /> Calendário sazonal
        </h2>

        <div className="bg-starteq-card border border-starteq-line rounded-xl overflow-hidden">
          <div className="divide-y divide-starteq-line">
            {SAZONAIS.map((s) => (
              <div key={s.date} className="px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="text-2xl">{s.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-semibold text-sm text-starteq-bone">{s.label}</div>
                    <div className="text-xs text-starteq-muted mt-0.5">
                      {new Date(s.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long" })} · {s.target}
                    </div>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-space font-bold uppercase tracking-wider px-2 py-1 rounded border ${
                    s.status === "ativa"
                      ? "bg-starteq-pix/10 text-starteq-pix border-starteq-pix/40"
                      : "bg-starteq-card text-starteq-muted border-starteq-line"
                  }`}
                >
                  {s.status === "ativa" ? "Disparando hoje" : "Agendada"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMPLATES · editor de mensagens */}
      <section>
        <h2 className="font-space text-xs font-bold uppercase tracking-[0.2em] text-starteq-gold mb-3 inline-flex items-center gap-2">
          <Icon name="whatsapp" size={14} /> Templates WhatsApp · editáveis
        </h2>

        <TemplateEditor />
      </section>
    </>
  );
}

function KPI({
  label,
  value,
  sub,
  icon,
  accent = "default",
}: {
  label: string;
  value: string;
  sub?: string;
  icon: import("@/components/Icon").IconName;
  accent?: "default" | "gold" | "pix" | "red";
}) {
  const colors: Record<typeof accent, string> = {
    default: "text-starteq-bone",
    gold: "text-starteq-gold",
    pix: "text-starteq-pix",
    red: "text-starteq-red",
  };
  return (
    <div className="bg-starteq-card border border-starteq-line rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2 text-starteq-muted">
        <Icon name={icon} size={14} />
        <div className="text-[10px] uppercase tracking-wider font-space font-bold">{label}</div>
      </div>
      <div className={`text-2xl font-space font-black ${colors[accent]}`}>{value}</div>
      {sub && <div className="text-xs text-starteq-muted mt-0.5">{sub}</div>}
    </div>
  );
}
