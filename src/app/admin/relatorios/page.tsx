import { Icon } from "@/components/Icon";
import { getKPIs, TECHNICIANS, CUSTOMERS, SERVICE_ORDERS } from "@/lib/admin-mock";
import { PRODUCTS } from "@/lib/catalog";
import { requireSession } from "@/lib/admin-auth";


export default function RelatoriosPage() {
  const kpis = getKPIs();

  // Top produtos por estoque
  const topStock = [...PRODUCTS].sort((a, b) => b.stock - a.stock).slice(0, 5);
  // Top clientes por LTV
  const topCustomers = [...CUSTOMERS].sort((a, b) => b.total_spent - a.total_spent).slice(0, 5);
  // OS por técnico
  const osByTech = TECHNICIANS.map((t) => ({
    ...t,
    count: SERVICE_ORDERS.filter((s) => s.technician_id === t.id).length,
  })).sort((a, b) => b.count - a.count);

  return (
    <>
      <header className="mb-6 flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-space text-2xl lg:text-3xl font-black text-starteq-bone">Relatórios</h1>
          <p className="text-starteq-muted mt-1 text-sm">Vendas · ranking · margens · operação</p>
        </div>
        <a
          href="data:text/csv;charset=utf-8,Relatorio,Periodo,Valor%0AFaturamento,30d,25400%0ALucro,30d,9100%0ATicket%20medio,30d,387%0AOS%20abertas,Atual,12"
          download="relatorio-starteq.csv"
          className="inline-flex items-center gap-2 bg-starteq-card border border-starteq-line hover:border-starteq-gold/40 text-starteq-bone font-display font-bold tracking-wide uppercase text-xs px-4 py-2.5 rounded-lg"
        >
          <Icon name="download" size={14} /> Exportar
        </a>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <KPI label="Faturamento 30d" value={`R$ ${kpis.revenue30d.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} accent="gold" />
        <KPI label="Lucro 30d" value={`R$ ${kpis.lucro.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} sub={`Margem ${kpis.margin.toFixed(1)}%`} accent="pix" />
        <KPI label="Ticket médio" value={`R$ ${kpis.avgTicket.toFixed(2)}`} />
        <KPI label="OS abertas" value={String(kpis.osOpen)} accent="gold" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card title="Top produtos · maior estoque" icon="package">
          <div className="divide-y divide-starteq-line">
            {topStock.map((p, i) => (
              <div key={p.sku} className="flex items-center justify-between py-3 gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-starteq-gold/10 flex items-center justify-center text-sm font-space font-bold text-starteq-gold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-semibold text-sm text-starteq-bone truncate">{p.name}</div>
                    <div className="text-xs text-starteq-muted">{p.brand}</div>
                  </div>
                </div>
                <div className="font-mono text-sm text-starteq-gold font-bold">{p.stock} un</div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Top clientes · maior LTV" icon="trophy">
          <div className="divide-y divide-starteq-line">
            {topCustomers.map((c, i) => (
              <div key={c.id} className="flex items-center justify-between py-3 gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-starteq-gold/10 flex items-center justify-center text-sm font-space font-bold text-starteq-gold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-semibold text-sm text-starteq-bone truncate">{c.name}</div>
                    <div className="text-xs text-starteq-muted">{c.total_orders} pedidos · {c.total_os} OS</div>
                  </div>
                </div>
                <div className="font-mono text-sm text-starteq-gold font-bold">
                  R$ {c.total_spent.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="OS por técnico" icon="user">
          <div className="divide-y divide-starteq-line">
            {osByTech.map((t) => (
              <div key={t.id} className="flex items-center justify-between py-3 gap-3">
                <div className="flex-1 min-w-0">
                  <div className="font-display font-semibold text-sm text-starteq-bone">{t.name}</div>
                  <div className="text-xs text-starteq-muted">{t.email}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-mono text-sm text-starteq-gold font-bold">{t.count} OS</div>
                  {t.total_commission_month > 0 && (
                    <div className="text-xs text-starteq-muted font-mono">
                      Comissão: R$ {t.total_commission_month.toFixed(0)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </>
  );
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

function Card({ title, icon, children }: { title: string; icon: import("@/components/Icon").IconName; children: React.ReactNode }) {
  return (
    <div className="bg-starteq-card border border-starteq-line rounded-xl p-5">
      <h3 className="font-space font-bold text-starteq-bone inline-flex items-center gap-2 mb-3">
        <Icon name={icon} size={18} className="text-starteq-gold" />
        {title}
      </h3>
      {children}
    </div>
  );
}

