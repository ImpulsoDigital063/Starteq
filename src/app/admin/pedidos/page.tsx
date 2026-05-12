import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ORDERS, ORDER_STATUS_LABEL, ORDER_STATUS_COLOR, type OrderStatus } from "@/lib/admin-mock";

const FILTERS: { slug: OrderStatus | "todos"; label: string }[] = [
  { slug: "todos", label: "Todos" },
  { slug: "pending", label: "Aguard. pgto" },
  { slug: "paid", label: "Pago" },
  { slug: "shipped", label: "Enviado" },
  { slug: "delivered", label: "Entregue" },
  { slug: "cancelled", label: "Cancelado" },
];

export default async function PedidosPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const sp = await searchParams;
  const filter = sp.status ?? "todos";
  const items = filter === "todos" ? ORDERS : ORDERS.filter((o) => o.status === filter);
  const total = items.reduce((s, o) => (["paid", "shipped", "delivered"].includes(o.status) ? s + o.total : s), 0);

  return (
    <>
      <header className="mb-6">
        <h1 className="font-space text-2xl lg:text-3xl font-black text-starteq-bone">Pedidos da loja</h1>
        <p className="text-starteq-muted mt-1 text-sm">
          {items.length} pedidos · R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} faturado
        </p>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {FILTERS.map((f) => (
          <Link
            key={f.slug}
            href={f.slug === "todos" ? "/admin/pedidos" : `/admin/pedidos?status=${f.slug}`}
            className={`px-4 py-2 rounded-lg text-xs font-space font-bold uppercase tracking-wider whitespace-nowrap border transition-colors ${
              filter === f.slug
                ? "bg-starteq-gold text-starteq-black border-starteq-gold"
                : "bg-starteq-card text-starteq-text border-starteq-line hover:border-starteq-gold/40"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <div className="bg-starteq-card border border-starteq-line rounded-xl overflow-hidden">
        <div className="hidden lg:grid grid-cols-[1.2fr_1.5fr_120px_100px_140px_100px] gap-3 px-5 py-3 border-b border-starteq-line bg-starteq-coal text-[10px] font-space font-bold uppercase tracking-wider text-starteq-muted">
          <div>Pedido</div>
          <div>Cliente</div>
          <div className="text-right">Total</div>
          <div>Pagto</div>
          <div>Status</div>
          <div>Data</div>
        </div>

        <div className="divide-y divide-starteq-line">
          {items.map((o) => (
            <div key={o.id} className="grid grid-cols-[1fr_auto] lg:grid-cols-[1.2fr_1.5fr_120px_100px_140px_100px] gap-3 px-5 py-4 items-center">
              <div>
                <div className="font-mono text-xs text-starteq-gold">{o.id}</div>
                <div className="text-[10px] text-starteq-muted">{o.items_count} item{o.items_count > 1 ? "s" : ""}</div>
              </div>
              <div className="hidden lg:block">
                <div className="font-display font-semibold text-sm text-starteq-bone">{o.customer_name}</div>
                <div className="text-xs text-starteq-muted">{o.customer_phone}</div>
              </div>
              <div className="hidden lg:block text-right font-mono text-starteq-gold font-bold">
                R$ {o.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <div className="hidden lg:block text-xs text-starteq-text uppercase font-space font-bold">{o.payment_method}</div>
              <span className={`text-[10px] font-space font-bold uppercase tracking-wider px-2 py-1 rounded border w-fit ${ORDER_STATUS_COLOR[o.status]}`}>
                {ORDER_STATUS_LABEL[o.status]}
              </span>
              <div className="hidden lg:block text-xs text-starteq-muted font-mono">
                {new Date(o.created_at).toLocaleDateString("pt-BR")}
              </div>

              <div className="col-span-2 lg:hidden">
                <div className="font-display font-semibold text-sm text-starteq-bone">{o.customer_name}</div>
                <div className="text-xs text-starteq-gold font-mono">
                  R$ {o.total.toFixed(2)} · {o.payment_method.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
