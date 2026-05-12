import { Icon } from "@/components/Icon";
import { ORDERS, SERVICE_ORDERS } from "@/lib/admin-mock";
import { NFeActions } from "./NFeActions";

export const metadata = {
  title: "Notas Fiscais · Painel Starteq",
};

// Mock · histórico de NFes emitidas (data, número, valor, status)
const NFES_EMITIDAS = [
  { id: "NFe-000123", reference: "Pedido #1248", customer: "Pedro Macedo", value: 4790.00, issued_at: "2026-05-10T14:32:00", status: "autorizada" as const },
  { id: "NFe-000122", reference: "OS-2026-0041", customer: "Carla Mendes", value: 225.00, issued_at: "2026-05-10T11:15:00", status: "autorizada" as const },
  { id: "NFe-000121", reference: "Pedido #1247", customer: "Bruno Castro", value: 1290.00, issued_at: "2026-05-09T17:48:00", status: "autorizada" as const },
  { id: "NFe-000120", reference: "OS-2026-0038", customer: "Júlia Ramos", value: 480.00, issued_at: "2026-05-09T10:20:00", status: "rejeitada" as const },
  { id: "NFe-000119", reference: "Pedido #1246", customer: "Diego Almeida", value: 2890.00, issued_at: "2026-05-08T16:05:00", status: "autorizada" as const },
];

export default function NFePage() {
  // Pendentes · Pedidos pagos sem NFe + OS entregues sem NFe
  const pedidosPagosSemNFe = ORDERS.filter((o) => o.status === "paid" || o.status === "delivered" || o.status === "shipped").slice(0, 4);
  const osPendentes = SERVICE_ORDERS.filter((o) => o.status === "entregue" || o.status === "pronto").slice(0, 3);

  const valorMes = NFES_EMITIDAS.filter((n) => n.status === "autorizada").reduce((s, n) => s + n.value, 0);

  return (
    <>
      <header className="mb-6 flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h1 className="font-space text-2xl lg:text-3xl font-black text-starteq-bone">Notas Fiscais Eletrônicas</h1>
          <p className="text-starteq-muted mt-1 text-sm">Emissão NFe + NFCe · pedidos e OS</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-wider font-space font-bold text-starteq-muted">NFes emitidas este mês</div>
          <div className="font-mono text-xl text-starteq-gold font-bold">R$ {valorMes.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>
        </div>
      </header>

      {/* Status integração */}
      <div className="bg-starteq-coal border border-starteq-gold/30 rounded-xl p-4 mb-6 flex items-start gap-3">
        <Icon name="info" size={20} className="text-starteq-gold flex-shrink-0 mt-0.5" />
        <div className="flex-1 text-sm">
          <div className="font-space font-bold text-starteq-bone">Integração Focus NFe · pronta pra ativar</div>
          <p className="text-starteq-text mt-1">
            Provedor configurado · falta upload do certificado digital A1 (.pfx) + senha em Configurações → Integrações.
            Após ativação, NFe sai automática a cada pedido pago.
          </p>
        </div>
        <span className="text-[10px] font-space font-bold uppercase tracking-wider text-starteq-gold bg-starteq-gold/10 border border-starteq-gold/40 px-2 py-1 rounded flex-shrink-0">
          Aguardando cert
        </span>
      </div>

      {/* Pendentes · pedidos + OS sem NFe */}
      <section className="mb-8">
        <h2 className="font-space text-xs font-bold uppercase tracking-[0.2em] text-starteq-gold mb-3 inline-flex items-center gap-2">
          <Icon name="alert" size={14} /> Pendente de emissão ({pedidosPagosSemNFe.length + osPendentes.length})
        </h2>

        <div className="bg-starteq-card border border-starteq-line rounded-xl overflow-hidden">
          <div className="divide-y divide-starteq-line">
            {pedidosPagosSemNFe.map((p) => (
              <div key={p.id} className="px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-space font-bold uppercase tracking-wider text-starteq-pix bg-starteq-pix/10 border border-starteq-pix/40 px-2 py-0.5 rounded">
                      Pedido
                    </span>
                    <span className="font-mono text-xs text-starteq-muted">{p.id}</span>
                  </div>
                  <div className="text-sm text-starteq-bone mt-0.5 font-display font-semibold">{p.customer_name}</div>
                  <div className="text-xs text-starteq-text mt-0.5">
                    {p.items_count} item{p.items_count !== 1 ? "s" : ""} · pago via {p.payment_method.toUpperCase()}
                  </div>
                </div>
                <div className="text-right flex items-center gap-3">
                  <div className="font-mono text-sm text-starteq-gold font-bold">R$ {p.total.toFixed(2)}</div>
                  <NFeActions reference={p.id} customer={p.customer_name} value={p.total} type="pedido" />
                </div>
              </div>
            ))}
            {osPendentes.map((o) => (
              <div key={o.id} className="px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-space font-bold uppercase tracking-wider text-starteq-gold bg-starteq-gold/10 border border-starteq-gold/40 px-2 py-0.5 rounded">
                      OS
                    </span>
                    <span className="font-mono text-xs text-starteq-muted">{o.id}</span>
                  </div>
                  <div className="text-sm text-starteq-bone mt-0.5 font-display font-semibold">{o.customer_name}</div>
                  <div className="text-xs text-starteq-text mt-0.5 truncate">{o.device}</div>
                </div>
                <div className="text-right flex items-center gap-3">
                  <div className="font-mono text-sm text-starteq-gold font-bold">R$ {o.total.toFixed(2)}</div>
                  <NFeActions reference={o.id} customer={o.customer_name} value={o.total} type="os" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Histórico · NFes emitidas */}
      <section>
        <h2 className="font-space text-xs font-bold uppercase tracking-[0.2em] text-starteq-muted mb-3 inline-flex items-center gap-2">
          <Icon name="file" size={14} /> Histórico de NFes
        </h2>

        <div className="bg-starteq-card border border-starteq-line rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-starteq-line bg-starteq-coal text-[10px] uppercase tracking-wider font-space font-bold text-starteq-muted">
                <th className="text-left p-3">NFe</th>
                <th className="text-left p-3 hidden md:table-cell">Referência</th>
                <th className="text-left p-3">Cliente</th>
                <th className="text-right p-3">Valor</th>
                <th className="text-center p-3">Status</th>
                <th className="text-right p-3">Ação</th>
              </tr>
            </thead>
            <tbody>
              {NFES_EMITIDAS.map((n) => (
                <tr key={n.id} className="border-b border-starteq-line last:border-0 hover:bg-starteq-coal/40">
                  <td className="p-3">
                    <div className="font-mono text-xs text-starteq-bone">{n.id}</div>
                    <div className="text-[10px] text-starteq-muted mt-0.5">{new Date(n.issued_at).toLocaleString("pt-BR")}</div>
                  </td>
                  <td className="p-3 hidden md:table-cell text-xs text-starteq-muted">{n.reference}</td>
                  <td className="p-3 text-sm text-starteq-text">{n.customer}</td>
                  <td className="p-3 text-right font-mono text-starteq-gold font-bold">R$ {n.value.toFixed(2)}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`text-[10px] font-space font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                        n.status === "autorizada"
                          ? "bg-starteq-pix/10 text-starteq-pix border-starteq-pix/40"
                          : "bg-starteq-red/10 text-starteq-red border-starteq-red/40"
                      }`}
                    >
                      {n.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button className="text-xs text-starteq-gold hover:text-starteq-bone font-space font-bold uppercase tracking-wider inline-flex items-center gap-1">
                      <Icon name="download" size={12} /> XML / PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
