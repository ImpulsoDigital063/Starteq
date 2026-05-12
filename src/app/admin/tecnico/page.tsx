import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession, requireSession } from "@/lib/admin-auth";
import { SERVICE_ORDERS, TECHNICIANS, SERVICE_STATUS_LABEL, SERVICE_STATUS_COLOR } from "@/lib/admin-mock";
import { Icon } from "@/components/Icon";
import { TecnicoActions } from "./TecnicoActions";

export const metadata = {
  title: "Minhas OS · Painel Starteq",
};

export default async function TecnicoPage() {
  const session = await getServerSession();
  if (!session) redirect("/admin/login");

  // Busca o técnico pelo email da session
  const tec = TECHNICIANS.find((t) => t.email === session.email) ?? TECHNICIANS[1];

  // Filtra OS atribuídas a esse técnico
  const minhasOS = SERVICE_ORDERS.filter((o) => o.technician_id === tec.id);
  const ativas = minhasOS.filter((o) => ["aguardando", "em_reparo", "pronto"].includes(o.status));
  const concluidas = minhasOS.filter((o) => o.status === "entregue");

  // KPIs mensais
  const totalServico = minhasOS.reduce((s, o) => s + o.service_value, 0);
  const comissaoMes = totalServico * (tec.commission_default / 100);
  const osPendentes = ativas.length;
  const osAtrasadas = ativas.filter(
    (o) => o.estimated_at && new Date(o.estimated_at).getTime() < Date.now() && o.status !== "pronto",
  ).length;

  return (
    <>
      <header className="mb-6">
        <div className="text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-1">
          Área do técnico
        </div>
        <h1 className="font-space text-3xl lg:text-4xl font-black text-starteq-bone">
          Olá, {tec.name.split(" ")[0]} 👋
        </h1>
        <p className="text-starteq-muted mt-1 text-sm">
          {osPendentes} OS ativas · {osAtrasadas > 0 ? <span className="text-starteq-red">{osAtrasadas} atrasada{osAtrasadas !== 1 ? "s" : ""}</span> : "nenhuma atrasada"}
        </p>
      </header>

      {/* KPIs do mês */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KPI label="OS Ativas" value={String(osPendentes)} icon="wrench" accent="gold" />
        <KPI label="Concluídas" value={String(concluidas.length)} sub="este mês" icon="check" accent="pix" />
        <KPI label="Comissão %" value={`${tec.commission_default}%`} sub="sobre serviço" icon="trophy" />
        <KPI label="A receber" value={`R$ ${comissaoMes.toFixed(2)}`} sub="comissão mês" icon="credit-card" accent="gold" />
      </section>

      {/* OS ATIVAS · principal */}
      <section className="mb-8">
        <h2 className="font-space text-xs font-bold uppercase tracking-[0.2em] text-starteq-gold mb-3 inline-flex items-center gap-2">
          <Icon name="wrench" size={14} /> Minhas OS ativas
        </h2>

        {ativas.length === 0 ? (
          <div className="bg-starteq-card border border-starteq-line rounded-xl p-8 text-center">
            <Icon name="check" size={32} className="text-starteq-pix mx-auto mb-2" />
            <p className="text-starteq-muted">Nenhuma OS ativa atribuída agora.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {ativas.map((os) => {
              const isAtrasada = os.estimated_at && new Date(os.estimated_at).getTime() < Date.now() && os.status !== "pronto";
              return (
                <div key={os.id} className={`bg-starteq-card border rounded-xl p-4 ${isAtrasada ? "border-starteq-red/40" : "border-starteq-line"}`}>
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-mono text-sm text-starteq-gold font-bold">{os.id}</span>
                        <span className={`text-[10px] font-space font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${SERVICE_STATUS_COLOR[os.status]}`}>
                          {SERVICE_STATUS_LABEL[os.status]}
                        </span>
                        {isAtrasada && (
                          <span className="text-[10px] font-space font-bold uppercase tracking-wider text-starteq-red inline-flex items-center gap-1">
                            <Icon name="alert" size={10} /> Atrasada
                          </span>
                        )}
                      </div>
                      <div className="font-display font-semibold text-starteq-bone">{os.customer_name}</div>
                      <div className="text-xs text-starteq-muted mt-0.5">{os.device}</div>
                      <div className="text-xs text-starteq-text mt-1.5 line-clamp-2">{os.problem}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-[10px] text-starteq-muted uppercase tracking-wider font-space font-bold">Comissão</div>
                      <div className="font-mono text-sm text-starteq-gold font-bold">
                        R$ {(os.service_value * tec.commission_default / 100).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <TecnicoActions os={os} phone={os.customer_phone} />
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Histórico recente · concluídas */}
      {concluidas.length > 0 && (
        <section>
          <h2 className="font-space text-xs font-bold uppercase tracking-[0.2em] text-starteq-muted mb-3">
            Últimas concluídas
          </h2>
          <div className="bg-starteq-card border border-starteq-line rounded-xl overflow-hidden">
            <div className="divide-y divide-starteq-line">
              {concluidas.slice(0, 5).map((os) => (
                <Link
                  key={os.id}
                  href={`/admin/os/${os.id}`}
                  className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-starteq-coal/50"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-xs text-starteq-muted">{os.id}</div>
                    <div className="text-sm text-starteq-bone truncate">{os.customer_name} · {os.device}</div>
                  </div>
                  <div className="text-right text-xs text-starteq-pix font-space font-bold">
                    +R$ {(os.service_value * tec.commission_default / 100).toFixed(2)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
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
