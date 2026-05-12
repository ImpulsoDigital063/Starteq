import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { getKPIs, getFocusItems, SERVICE_ORDERS, ORDERS, SERVICE_STATUS_LABEL, SERVICE_STATUS_COLOR, ORDER_STATUS_LABEL, ORDER_STATUS_COLOR } from "@/lib/admin-mock";

export default function AdminDashboard() {
  const kpis = getKPIs();
  const focus = getFocusItems();
  const recentOS = SERVICE_ORDERS.slice(0, 5);
  const recentOrders = ORDERS.slice(0, 5);

  return (
    <>
      <header className="mb-8 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-space text-3xl lg:text-4xl font-black text-starteq-bone">Dashboard</h1>
          <p className="text-starteq-muted mt-1 text-sm">
            Operação Starteq · {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })}
          </p>
        </div>
        <Link
          href="/admin/os?action=new"
          className="inline-flex items-center gap-2 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-space font-bold tracking-wide uppercase text-xs px-5 py-3 rounded-lg transition-all"
        >
          <Icon name="wrench" size={16} /> Nova OS
        </Link>
      </header>

      {/* FOCO DO DIA */}
      {focus.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="zap" size={16} className="text-starteq-gold" />
            <h2 className="font-space text-xs font-bold uppercase tracking-[0.2em] text-starteq-gold">
              Foco do dia
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {focus.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className={`block rounded-xl p-5 border transition-all hover:-translate-y-0.5 ${
                  item.urgency === "high"
                    ? "bg-starteq-red/5 border-starteq-red/30 hover:border-starteq-red/60"
                    : item.urgency === "med"
                      ? "bg-orange-500/5 border-orange-500/30 hover:border-orange-500/60"
                      : "bg-starteq-card border-starteq-line hover:border-starteq-gold/40"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="text-3xl font-space font-black text-starteq-bone">
                    {item.count}
                  </div>
                  <Icon
                    name={item.urgency === "high" ? "alert" : "info"}
                    size={18}
                    className={
                      item.urgency === "high" ? "text-starteq-red" :
                      item.urgency === "med" ? "text-orange-400" : "text-starteq-muted"
                    }
                  />
                </div>
                <div className="text-sm text-starteq-text leading-snug">{item.title}</div>
                <div className="mt-3 text-xs text-starteq-gold font-space font-bold uppercase tracking-wider inline-flex items-center gap-1">
                  Ver detalhes <Icon name="arrow-right" size={12} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* KPIs · financeiro */}
      <section className="mb-8">
        <h2 className="font-space text-xs font-bold uppercase tracking-[0.2em] text-starteq-muted mb-3">
          Financeiro · últimos 30 dias
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KPI label="Faturamento" value={`R$ ${kpis.revenue30d.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} icon="zap" accent="gold" />
          <KPI label="Ticket médio" value={`R$ ${kpis.avgTicket.toFixed(2)}`} icon="credit-card" />
          <KPI label="Lucro" value={`R$ ${kpis.lucro.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} sub={`Margem ${kpis.margin.toFixed(1)}%`} icon="trophy" accent={kpis.lucro >= 0 ? "pix" : "red"} />
          <KPI label="A pagar" value={`R$ ${kpis.pendingPagar.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} sub={kpis.atrasados > 0 ? `${kpis.atrasados} atrasada(s)` : "em dia"} icon="alert" accent={kpis.atrasados > 0 ? "red" : "default"} />
        </div>
      </section>

      {/* KPIs · operação */}
      <section className="mb-8">
        <h2 className="font-space text-xs font-bold uppercase tracking-[0.2em] text-starteq-muted mb-3">
          Operação
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KPI label="OS abertas" value={String(kpis.osOpen)} sub={`de ${kpis.osTotal} totais`} icon="wrench" />
          <KPI label="Clientes VIP" value={String(kpis.customersVip)} sub="LTV top 10%" icon="star" accent="gold" />
          <KPI label="Sumidos" value={String(kpis.sumidos)} sub="90+ dias sem compra" icon="user" accent={kpis.sumidos > 0 ? "red" : "default"} />
          <KPI label="Receitas" value={`R$ ${kpis.receitas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} icon="check" accent="pix" />
        </div>
      </section>

      {/* TABELAS · OS + PEDIDOS recentes */}
      <section className="grid lg:grid-cols-2 gap-6">
        {/* OS RECENTES */}
        <Card title="Ordens de Serviço recentes" href="/admin/os" icon="wrench">
          <div className="divide-y divide-starteq-line">
            {recentOS.map((os) => (
              <Link key={os.id} href={`/admin/os/${os.id}`} className="flex items-center justify-between gap-3 py-3 px-1 hover:bg-starteq-coal/50 transition-colors -mx-2 px-3 rounded-lg">
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-xs text-starteq-muted">{os.id}</div>
                  <div className="font-display font-semibold text-sm text-starteq-bone truncate">{os.customer_name}</div>
                  <div className="text-xs text-starteq-muted truncate">{os.device}</div>
                </div>
                <span className={`text-[10px] font-space font-bold uppercase tracking-wider px-2 py-1 rounded border ${SERVICE_STATUS_COLOR[os.status]}`}>
                  {SERVICE_STATUS_LABEL[os.status]}
                </span>
              </Link>
            ))}
          </div>
        </Card>

        {/* PEDIDOS RECENTES */}
        <Card title="Pedidos recentes" href="/admin/pedidos" icon="shopping-cart">
          <div className="divide-y divide-starteq-line">
            {recentOrders.map((o) => (
              <Link key={o.id} href={`/admin/pedidos/${o.id}`} className="flex items-center justify-between gap-3 py-3 hover:bg-starteq-coal/50 transition-colors -mx-2 px-3 rounded-lg">
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-xs text-starteq-muted">{o.id}</div>
                  <div className="font-display font-semibold text-sm text-starteq-bone truncate">{o.customer_name}</div>
                  <div className="text-xs text-starteq-muted truncate">
                    R$ {o.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} · {o.payment_method.toUpperCase()}
                  </div>
                </div>
                <span className={`text-[10px] font-space font-bold uppercase tracking-wider px-2 py-1 rounded border ${ORDER_STATUS_COLOR[o.status]}`}>
                  {ORDER_STATUS_LABEL[o.status]}
                </span>
              </Link>
            ))}
          </div>
        </Card>
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
  icon?: IconName;
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
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] uppercase tracking-wider font-space font-bold text-starteq-muted">{label}</span>
        {icon && <Icon name={icon} size={16} className="text-starteq-muted" />}
      </div>
      <div className={`text-lg lg:text-xl font-space font-black ${colors[accent]} truncate`}>{value}</div>
      {sub && <div className="text-xs text-starteq-muted mt-0.5">{sub}</div>}
    </div>
  );
}

function Card({ title, href, icon, children }: { title: string; href: string; icon: IconName; children: React.ReactNode }) {
  return (
    <div className="bg-starteq-card border border-starteq-line rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-space font-bold text-starteq-bone text-base inline-flex items-center gap-2">
          <Icon name={icon} size={18} className="text-starteq-gold" /> {title}
        </h3>
        <Link href={href} className="text-xs text-starteq-gold hover:text-starteq-bone font-space font-bold uppercase tracking-wider">
          Ver todos →
        </Link>
      </div>
      {children}
    </div>
  );
}
