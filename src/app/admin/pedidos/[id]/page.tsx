import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { ORDERS, ORDER_STATUS_LABEL, ORDER_STATUS_COLOR, PAYMENTS } from "@/lib/admin-mock";
import { NFeActions } from "../../nfe/NFeActions";
import { PedidoActions } from "./PedidoActions";

type Params = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return ORDERS.map((o) => ({ id: o.id }));
}

export default async function PedidoDetail({ params }: Params) {
  const { id } = await params;
  const order = ORDERS.find((o) => o.id === id);
  if (!order) notFound();

  const payments = PAYMENTS.filter((p) => p.order_id === order.id);

  return (
    <>
      <Link href="/admin/pedidos" className="inline-flex items-center gap-1 text-xs text-starteq-muted hover:text-starteq-gold mb-4 font-space font-bold uppercase tracking-wider">
        <Icon name="arrow-right" size={12} className="rotate-180" /> Voltar
      </Link>

      <header className="mb-6">
        <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
          <div>
            <div className="font-mono text-sm text-starteq-gold">{order.id}</div>
            <h1 className="font-space text-2xl lg:text-3xl font-black text-starteq-bone mt-1">{order.customer_name}</h1>
            <div className="text-starteq-muted text-sm mt-0.5">{order.customer_phone}</div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`text-[10px] font-space font-bold uppercase tracking-wider px-2 py-1 rounded border ${ORDER_STATUS_COLOR[order.status]}`}>
              {ORDER_STATUS_LABEL[order.status]}
            </span>
            <span className="text-[10px] text-starteq-muted uppercase tracking-wider font-space font-bold">
              {order.origin === "balcao" ? "Venda balcão" : "Loja online"}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <a
            href={`https://wa.me/55${order.customer_phone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-starteq-pix/10 text-starteq-pix border border-starteq-pix/40 hover:bg-starteq-pix/20 font-space font-bold uppercase text-xs px-4 py-2.5 rounded-lg"
          >
            <Icon name="whatsapp" size={14} /> WhatsApp
          </a>
          <NFeActions reference={order.id} customer={order.customer_name} value={order.total} type="pedido" />
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card title="Resumo" icon="info">
          <Field label="Total" value={brl(order.total)} highlight />
          <Field label="Método" value={order.payment_method.toUpperCase()} />
          <Field label="Itens" value={`${order.items_count} ${order.items_count === 1 ? "item" : "itens"}`} />
          <Field label="Criado em" value={new Date(order.created_at).toLocaleString("pt-BR")} />
          {order.paid_at && <Field label="Pago em" value={new Date(order.paid_at).toLocaleString("pt-BR")} />}
        </Card>

        <Card title="Ações" icon="zap">
          <PedidoActions orderId={order.id} status={order.status} method={order.payment_method} />
        </Card>

        {order.items && order.items.length > 0 && (
          <Card title="Itens do pedido" icon="package">
            <div className="divide-y divide-starteq-line">
              {order.items.map((it) => (
                <div key={it.sku} className="py-2 flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-semibold text-sm text-starteq-bone">{it.name}</div>
                    <div className="text-[10px] text-starteq-muted font-mono">{it.sku} · {it.qty} un · {brl(it.unit_price)} cada</div>
                  </div>
                  <div className="font-mono text-sm text-starteq-gold font-bold">{brl(it.qty * it.unit_price)}</div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {payments.length > 0 && (
          <Card title="Pagamentos" icon="credit-card">
            <div className="divide-y divide-starteq-line">
              {payments.map((p) => (
                <div key={p.id} className="py-2 flex items-start justify-between gap-3">
                  <div>
                    <div className="font-display font-semibold text-sm text-starteq-bone uppercase">{p.method}</div>
                    <div className="text-[10px] text-starteq-muted">
                      {new Date(p.received_at).toLocaleString("pt-BR")}
                      {p.forecast_at && ` · cai em ${new Date(p.forecast_at).toLocaleDateString("pt-BR")}`}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm text-starteq-gold font-bold">{brl(p.amount)}</div>
                    <span className={`text-[10px] font-space font-bold uppercase tracking-wider ${p.status === "recebido" ? "text-starteq-pix" : p.status === "previsto" ? "text-orange-400" : "text-starteq-red"}`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </>
  );
}

function Card({ title, icon, children }: { title: string; icon: import("@/components/Icon").IconName; children: React.ReactNode }) {
  return (
    <div className="bg-starteq-card border border-starteq-line rounded-xl p-5">
      <h3 className="font-space font-bold text-starteq-bone inline-flex items-center gap-2 mb-3">
        <Icon name={icon} size={18} className="text-starteq-gold" /> {title}
      </h3>
      {children}
    </div>
  );
}

function Field({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="py-2 border-b border-starteq-line last:border-0 flex items-start justify-between gap-3">
      <span className="text-starteq-muted text-xs uppercase tracking-wider font-space font-bold">{label}</span>
      <span className={`text-sm text-right ${highlight ? "text-starteq-gold font-mono font-bold" : "text-starteq-bone"}`}>{value}</span>
    </div>
  );
}

function brl(n: number) {
  return `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
