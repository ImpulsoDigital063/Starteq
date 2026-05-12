import { Icon } from "@/components/Icon";
import { SERVICE_ORDERS } from "@/lib/admin-mock";

// 3 templates ATIVOS por default · outros ocultos · simplificação após auditoria
const ACTIVE_TEMPLATES = [
  {
    id: "os_pronto",
    name: "OS pronta · retirada",
    text: "Oi {nome}, seu {equipamento} está pronto! Pode retirar a partir das 14h. Total: R$ {total} (PIX 15% off = R$ {pix_total}).",
    trigger: "Automático ao clicar 'Avisar Pronto' na lista de OS",
  },
  {
    id: "pedido_pago",
    name: "Pedido pago · confirmação",
    text: "Pedido {id} confirmado! Preparando pra envio. Acompanhe em starteqpalmas.com.br/pedido/{id}",
    trigger: "Automático quando Asaas confirma pagamento (webhook)",
  },
  {
    id: "pedido_enviado",
    name: "Motoboy a caminho",
    text: "Motoboy a caminho! Seu pedido {id} chega em ~30min em Palmas.",
    trigger: "Manual ao clicar 'Despachar' na tela de pedido",
  },
];

const INACTIVE_TEMPLATES = [
  { id: "os_diagnosticada", name: "OS diagnosticada · orçamento", note: "Ative quando quiser orçamento automático após diagnóstico" },
  { id: "os_aguardando_peca", name: "OS aguardando peça", note: "Útil quando peça vem do fornecedor" },
  { id: "os_entregue", name: "OS entregue · NPS", note: "Pesquisa de satisfação 24h pós-entrega" },
  { id: "reativacao", name: "Reativação · cliente sumido", note: "Cupom 10% pra cliente 90+ dias sem comprar" },
];

export default function WhatsAppPage() {
  const allLogs = SERVICE_ORDERS.flatMap((s) => (s.whatsapp_log ?? []).map((m) => ({ ...m, os_id: s.id, customer: s.customer_name }))).sort((a, b) => b.sent_at.localeCompare(a.sent_at));

  return (
    <>
      <header className="mb-5">
        <h1 className="font-space text-2xl lg:text-3xl font-black text-starteq-bone inline-flex items-center gap-2">
          <Icon name="whatsapp" size={28} className="text-starteq-pix" /> WhatsApp
        </h1>
        <p className="text-starteq-muted mt-1 text-sm">Avisos automáticos · log de envios · IA integrada</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KPI label="Ativos" value="3" sub="de 7 templates" accent="pix" />
        <KPI label="Enviadas hoje" value={String(allLogs.filter((l) => isToday(l.sent_at)).length)} />
        <KPI label="Lidas" value={`${Math.round((allLogs.filter((l) => l.status === "read").length / Math.max(1, allLogs.length)) * 100)}%`} accent="gold" />
        <KPI label="Total" value={String(allLogs.length)} />
      </div>

      {/* Bot de status · diferencial */}
      <div className="bg-starteq-gold/5 border border-starteq-gold/30 rounded-xl p-5 mb-6">
        <h3 className="font-space font-bold text-starteq-gold text-base inline-flex items-center gap-2">
          <Icon name="bot" size={18} /> Bot de status automático
        </h3>
        <p className="text-sm text-starteq-text mt-2 leading-relaxed">
          Quando cliente manda &quot;status&quot; ou &quot;andamento&quot; no WhatsApp + o número da OS, sua IA responde automaticamente com o estado atual.
        </p>
        <div className="bg-starteq-black border border-starteq-line rounded-lg p-3 mt-3 font-mono text-xs">
          <div className="text-starteq-muted">Cliente: <span className="text-starteq-bone">&quot;Qual status da OS-2026-0042?&quot;</span></div>
          <div className="text-starteq-muted mt-1">Bot: <span className="text-starteq-pix">&quot;Sua OS-2026-0042 está em reparo · prazo previsto: 15/05. Te aviso quando estiver pronta.&quot;</span></div>
        </div>
      </div>

      <h2 className="font-space text-xs font-bold uppercase tracking-[0.2em] text-starteq-muted mb-3 inline-flex items-center gap-2">
        <Icon name="check" size={14} /> Templates ativos
      </h2>
      <div className="space-y-3 mb-8">
        {ACTIVE_TEMPLATES.map((t) => (
          <div key={t.id} className="bg-starteq-card border border-starteq-pix/30 rounded-xl p-5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-display font-semibold text-starteq-bone text-sm">{t.name}</h3>
              <span className="text-[10px] font-space font-bold uppercase tracking-wider text-starteq-pix bg-starteq-pix/15 border border-starteq-pix/40 px-2 py-0.5 rounded">
                Ativo
              </span>
            </div>
            <p className="text-xs text-starteq-muted italic leading-relaxed mb-2">&quot;{t.text}&quot;</p>
            <div className="text-[10px] text-starteq-muted font-space font-bold uppercase tracking-wider">
              Gatilho: <span className="text-starteq-text normal-case font-display font-normal">{t.trigger}</span>
            </div>
          </div>
        ))}
      </div>

      <details className="mb-8">
        <summary className="font-space text-xs font-bold uppercase tracking-[0.2em] text-starteq-muted cursor-pointer hover:text-starteq-gold mb-3 inline-flex items-center gap-2">
          Templates inativos (4) · ativar quando quiser
          <Icon name="arrow-right" size={12} />
        </summary>
        <div className="mt-3 space-y-2">
          {INACTIVE_TEMPLATES.map((t) => (
            <div key={t.id} className="bg-starteq-coal border border-starteq-line rounded-lg p-3 flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="font-display font-semibold text-sm text-starteq-text">{t.name}</div>
                <div className="text-xs text-starteq-muted">{t.note}</div>
              </div>
              <button className="text-xs text-starteq-gold hover:text-starteq-bone font-space font-bold uppercase tracking-wider">
                Ativar
              </button>
            </div>
          ))}
        </div>
      </details>

      <h2 className="font-space text-xs font-bold uppercase tracking-[0.2em] text-starteq-muted mb-3">
        Últimas mensagens
      </h2>
      <div className="bg-starteq-card border border-starteq-line rounded-xl overflow-hidden">
        {allLogs.length === 0 ? (
          <div className="p-8 text-center text-starteq-muted text-sm">
            Sem mensagens enviadas ainda.
          </div>
        ) : (
          <div className="divide-y divide-starteq-line">
            {allLogs.map((m) => (
              <div key={m.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-semibold text-sm text-starteq-bone">{m.customer}</div>
                    <div className="text-xs text-starteq-muted font-mono">{m.os_id}</div>
                  </div>
                  <span className={`text-[10px] font-space font-bold uppercase tracking-wider ${
                    m.status === "read" ? "text-starteq-pix" :
                    m.status === "delivered" ? "text-starteq-gold" :
                    m.status === "failed" ? "text-starteq-red" : "text-starteq-muted"
                  }`}>
                    {m.status}
                  </span>
                </div>
                <p className="text-sm text-starteq-text italic mt-1">&quot;{m.text}&quot;</p>
                <div className="text-xs text-starteq-muted mt-2 font-mono">
                  {new Date(m.sent_at).toLocaleString("pt-BR")}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function isToday(iso: string): boolean {
  const d = new Date(iso);
  const today = new Date();
  return d.toDateString() === today.toDateString();
}

function KPI({ label, value, sub, accent = "default" }: { label: string; value: string; sub?: string; accent?: "default" | "gold" | "pix" | "red" }) {
  const colors: Record<typeof accent, string> = {
    default: "text-starteq-bone", gold: "text-starteq-gold", pix: "text-starteq-pix", red: "text-starteq-red",
  };
  return (
    <div className="bg-starteq-card border border-starteq-line rounded-xl p-4">
      <div className="text-[10px] uppercase tracking-wider font-space font-bold text-starteq-muted">{label}</div>
      <div className={`text-xl font-space font-black mt-1 ${colors[accent]}`}>{value}</div>
      {sub && <div className="text-xs text-starteq-muted mt-0.5">{sub}</div>}
    </div>
  );
}
