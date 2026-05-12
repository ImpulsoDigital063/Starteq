import { Icon } from "@/components/Icon";
import { ACCOUNT_ENTRIES, getKPIs } from "@/lib/admin-mock";

const STATUS_LABEL: Record<string, string> = {
  pago: "Pago", pendente: "Pendente", atrasado: "Atrasado",
};
const STATUS_COLOR: Record<string, string> = {
  pago: "bg-starteq-pix/15 text-starteq-pix border-starteq-pix/40",
  pendente: "bg-orange-500/15 text-orange-400 border-orange-400/40",
  atrasado: "bg-starteq-red/15 text-starteq-red border-starteq-red/40",
};

export default function FinanceiroPage() {
  const kpis = getKPIs();
  const receitas = ACCOUNT_ENTRIES.filter((e) => e.type === "receita").sort((a, b) => b.due_date.localeCompare(a.due_date));
  const despesas = ACCOUNT_ENTRIES.filter((e) => e.type === "despesa").sort((a, b) => b.due_date.localeCompare(a.due_date));

  return (
    <>
      <header className="mb-6 flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-space text-2xl lg:text-3xl font-black text-starteq-bone">Financeiro</h1>
          <p className="text-starteq-muted mt-1 text-sm">DRE · contas a pagar/receber · comissões · fluxo de caixa</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 bg-starteq-pix/10 text-starteq-pix border border-starteq-pix/40 hover:bg-starteq-pix/20 font-space font-bold uppercase text-xs px-4 py-2.5 rounded-lg">
            <Icon name="check" size={14} /> + Receita
          </button>
          <button className="inline-flex items-center gap-2 bg-starteq-red/10 text-starteq-red border border-starteq-red/40 hover:bg-starteq-red/20 font-space font-bold uppercase text-xs px-4 py-2.5 rounded-lg">
            <Icon name="alert" size={14} /> + Despesa
          </button>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KPI label="Receitas (pago)" value={`R$ ${kpis.receitas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} accent="pix" />
        <KPI label="Despesas (pago)" value={`R$ ${kpis.despesas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} accent="red" />
        <KPI label="Lucro real" value={`R$ ${kpis.lucro.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} accent={kpis.lucro >= 0 ? "gold" : "red"} sub={`Margem ${kpis.margin.toFixed(1)}%`} />
        <KPI label="A pagar" value={`R$ ${kpis.pendingPagar.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} accent={kpis.atrasados > 0 ? "red" : "default"} sub={kpis.atrasados > 0 ? `${kpis.atrasados} atrasada(s)` : "em dia"} />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Section title="Receitas" entries={receitas} kind="receita" />
        <Section title="Despesas" entries={despesas} kind="despesa" />
      </div>
    </>
  );
}

function KPI({ label, value, sub, accent = "default" }: { label: string; value: string; sub?: string; accent?: "default" | "gold" | "pix" | "red" }) {
  const colors: Record<typeof accent, string> = {
    default: "text-starteq-bone",
    gold: "text-starteq-gold",
    pix: "text-starteq-pix",
    red: "text-starteq-red",
  };
  return (
    <div className="bg-starteq-card border border-starteq-line rounded-xl p-4">
      <div className="text-[10px] uppercase tracking-wider font-space font-bold text-starteq-muted">{label}</div>
      <div className={`text-lg lg:text-xl font-space font-black mt-1 ${colors[accent]}`}>{value}</div>
      {sub && <div className="text-xs text-starteq-muted mt-0.5">{sub}</div>}
    </div>
  );
}

function Section({ title, entries, kind }: { title: string; entries: typeof ACCOUNT_ENTRIES; kind: "receita" | "despesa" }) {
  const isReceita = kind === "receita";
  return (
    <div className="bg-starteq-card border border-starteq-line rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-starteq-line bg-starteq-coal flex items-center justify-between">
        <h3 className="font-space font-bold text-starteq-bone inline-flex items-center gap-2">
          <Icon name={isReceita ? "check" : "alert"} size={16} className={isReceita ? "text-starteq-pix" : "text-starteq-red"} />
          {title}
        </h3>
        <span className="text-xs text-starteq-muted">{entries.length}</span>
      </div>
      <div className="divide-y divide-starteq-line">
        {entries.map((e) => (
          <div key={e.id} className="px-5 py-3 flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-wider font-space font-bold text-starteq-muted">{e.category}</div>
              <div className="font-display font-semibold text-sm text-starteq-bone truncate">{e.description}</div>
              <div className="text-xs text-starteq-muted mt-0.5">Venc: {new Date(e.due_date).toLocaleDateString("pt-BR")}</div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className={`font-mono font-bold ${isReceita ? "text-starteq-pix" : "text-starteq-red"}`}>
                {isReceita ? "+" : "−"} R$ {e.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <span className={`mt-1 inline-block text-[10px] font-space font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${STATUS_COLOR[e.status]}`}>
                {STATUS_LABEL[e.status]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
