import { Icon } from "@/components/Icon";
import { CUSTOMERS, CUSTOMER_TAG_LABEL, CUSTOMER_TAG_COLOR, type Customer } from "@/lib/admin-mock";
import Link from "next/link";

const FILTERS: { slug: Customer["tag"] | "todos"; label: string }[] = [
  { slug: "todos", label: "Todos" },
  { slug: "vip", label: "VIP" },
  { slug: "recorrente", label: "Recorrentes" },
  { slug: "novo", label: "Novos" },
  { slug: "casual", label: "Casuais" },
  { slug: "sumido", label: "Sumidos" },
];

export default async function ClientesPage({ searchParams }: { searchParams: Promise<{ tag?: string }> }) {
  const sp = await searchParams;
  const filter = sp.tag ?? "todos";
  const items = filter === "todos" ? CUSTOMERS : CUSTOMERS.filter((c) => c.tag === filter);

  return (
    <>
      <header className="mb-6">
        <h1 className="font-space text-2xl lg:text-3xl font-black text-starteq-bone">Clientes</h1>
        <p className="text-starteq-muted mt-1 text-sm">CRM · histórico · LTV · campanhas de reativação</p>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {FILTERS.map((f) => (
          <Link
            key={f.slug}
            href={f.slug === "todos" ? "/admin/clientes" : `/admin/clientes?tag=${f.slug}`}
            className={`px-4 py-2 rounded-lg text-xs font-space font-bold uppercase tracking-wider whitespace-nowrap border transition-colors ${
              filter === f.slug
                ? "bg-starteq-gold text-starteq-black border-starteq-gold"
                : "bg-starteq-card text-starteq-text border-starteq-line hover:border-starteq-gold/40"
            }`}
          >
            {f.label} <span className="opacity-60">{CUSTOMERS.filter((c) => f.slug === "todos" || c.tag === f.slug).length}</span>
          </Link>
        ))}
      </div>

      <div className="bg-starteq-card border border-starteq-line rounded-xl overflow-hidden">
        <div className="hidden lg:grid grid-cols-[1.5fr_120px_140px_100px_100px_100px_100px] gap-3 px-5 py-3 border-b border-starteq-line bg-starteq-coal text-[10px] font-space font-bold uppercase tracking-wider text-starteq-muted">
          <div>Cliente</div>
          <div>WhatsApp</div>
          <div className="text-right">Total gasto</div>
          <div className="text-center">Pedidos</div>
          <div className="text-center">OS</div>
          <div>Última compra</div>
          <div>Tag</div>
        </div>

        <div className="divide-y divide-starteq-line">
          {items.map((c) => (
            <div key={c.id} className="grid grid-cols-[1fr_auto] lg:grid-cols-[1.5fr_120px_140px_100px_100px_100px_100px] gap-3 px-5 py-4 items-center">
              <div>
                <div className="font-display font-semibold text-sm text-starteq-bone">{c.name}</div>
                <div className="text-xs text-starteq-muted">{c.email ?? "sem email"}</div>
              </div>
              <div className="hidden lg:block text-xs text-starteq-text font-mono">{c.phone}</div>
              <div className="hidden lg:block text-right font-mono text-starteq-gold font-bold">
                R$ {c.total_spent.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <div className="hidden lg:block text-center text-sm text-starteq-text">{c.total_orders}</div>
              <div className="hidden lg:block text-center text-sm text-starteq-text">{c.total_os}</div>
              <div className="hidden lg:block text-xs text-starteq-muted font-mono">
                {c.last_purchase_at ? new Date(c.last_purchase_at).toLocaleDateString("pt-BR") : "nunca"}
              </div>
              <span className={`text-[10px] font-space font-bold uppercase tracking-wider px-2 py-1 rounded border w-fit ${CUSTOMER_TAG_COLOR[c.tag]}`}>
                {CUSTOMER_TAG_LABEL[c.tag]}
              </span>

              <div className="lg:hidden col-span-2 flex items-center justify-between gap-3 mt-1">
                <div className="text-xs text-starteq-muted">{c.phone}</div>
                <div className="font-mono text-starteq-gold font-bold text-sm">
                  R$ {c.total_spent.toFixed(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filter === "sumido" && items.length > 0 && (
        <div className="mt-6 bg-starteq-gold/5 border border-starteq-gold/30 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <Icon name="zap" size={20} className="text-starteq-gold flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-space font-bold text-starteq-bone">Campanha de reativação</h3>
              <p className="text-sm text-starteq-muted mt-1">
                {items.length} cliente{items.length > 1 ? "s" : ""} sem comprar há 90+ dias.
                Envia uma mensagem WhatsApp com cupom de 10% pra trazer de volta.
              </p>
              <button className="mt-3 inline-flex items-center gap-2 bg-starteq-gold text-starteq-black font-space font-bold tracking-wide uppercase text-xs px-5 py-2.5 rounded-lg">
                <Icon name="whatsapp" size={14} /> Enviar campanha
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
