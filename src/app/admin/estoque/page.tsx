import { Icon } from "@/components/Icon";
import { STOCK_MOVEMENTS } from "@/lib/admin-mock";
import { PRODUCTS } from "@/lib/catalog";

const TYPE_LABEL: Record<string, string> = {
  entrada: "Entrada", saida: "Saída", ajuste: "Ajuste", perda: "Perda",
};
const TYPE_COLOR: Record<string, string> = {
  entrada: "text-starteq-pix",
  saida: "text-blue-400",
  ajuste: "text-starteq-gold",
  perda: "text-starteq-red",
};

export default function EstoquePage() {
  const lowStock = PRODUCTS.filter((p) => p.stock > 0 && p.stock <= 3);
  const outOfStock = PRODUCTS.filter((p) => p.stock === 0);
  const totalValue = PRODUCTS.reduce((s, p) => s + p.price * p.stock, 0);
  const totalSKUs = PRODUCTS.length;
  const totalUnits = PRODUCTS.reduce((s, p) => s + p.stock, 0);

  return (
    <>
      <header className="mb-6 flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-space text-2xl lg:text-3xl font-black text-starteq-bone">Estoque</h1>
          <p className="text-starteq-muted mt-1 text-sm">Controle de entrada/saída · alertas · movimentações</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-space font-bold tracking-wide uppercase text-xs px-5 py-3 rounded-lg transition-all">
          <Icon name="package" size={16} /> Nova entrada
        </button>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KPI label="SKUs cadastrados" value={String(totalSKUs)} icon="package" />
        <KPI label="Unidades em estoque" value={String(totalUnits)} icon="memory" accent="pix" />
        <KPI label="Estoque baixo (≤3)" value={String(lowStock.length)} icon="alert" accent={lowStock.length > 0 ? "gold" : "default"} />
        <KPI label="Valor em estoque" value={`R$ ${(totalValue / 1000).toFixed(1)}k`} icon="credit-card" />
      </div>

      {/* Alertas estoque crítico */}
      {(lowStock.length > 0 || outOfStock.length > 0) && (
        <section className="mb-8">
          <h2 className="font-space text-xs font-bold uppercase tracking-[0.2em] text-starteq-gold mb-3 inline-flex items-center gap-2">
            <Icon name="alert" size={14} /> Atenção · estoque crítico
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...outOfStock, ...lowStock].slice(0, 6).map((p) => (
              <div key={p.sku} className="bg-starteq-red/5 border border-starteq-red/30 rounded-lg p-4">
                <div className="text-[10px] text-starteq-muted uppercase tracking-wider font-space font-bold">{p.brand}</div>
                <div className="font-display font-semibold text-sm text-starteq-bone leading-snug mt-1">{p.name}</div>
                <div className="flex items-center justify-between mt-3">
                  <span className={`font-mono text-sm font-bold ${p.stock === 0 ? "text-starteq-red" : "text-starteq-gold"}`}>
                    {p.stock === 0 ? "ESGOTADO" : `${p.stock} un`}
                  </span>
                  <button className="text-xs text-starteq-gold hover:text-starteq-bone font-space font-bold uppercase tracking-wider">
                    Repor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <h2 className="font-space text-xs font-bold uppercase tracking-[0.2em] text-starteq-muted mb-3">
        Últimas movimentações
      </h2>
      <div className="bg-starteq-card border border-starteq-line rounded-xl overflow-hidden">
        <div className="hidden lg:grid grid-cols-[100px_1.5fr_80px_80px_120px_120px_120px] gap-3 px-5 py-3 border-b border-starteq-line bg-starteq-coal text-[10px] font-space font-bold uppercase tracking-wider text-starteq-muted">
          <div>Tipo</div>
          <div>Produto</div>
          <div className="text-center">Qtd</div>
          <div className="text-right">Custo un.</div>
          <div className="text-right">Total</div>
          <div>Motivo</div>
          <div>Data</div>
        </div>
        <div className="divide-y divide-starteq-line">
          {STOCK_MOVEMENTS.map((m) => (
            <div key={m.id} className="grid grid-cols-[1fr_auto] lg:grid-cols-[100px_1.5fr_80px_80px_120px_120px_120px] gap-3 px-5 py-4 items-center">
              <span className={`text-[10px] font-space font-bold uppercase tracking-wider ${TYPE_COLOR[m.type]} w-fit`}>
                {TYPE_LABEL[m.type]}
              </span>
              <div className="hidden lg:block min-w-0">
                <div className="font-display font-semibold text-sm text-starteq-bone truncate">{m.product_name}</div>
                <div className="text-xs text-starteq-muted font-mono">{m.sku}</div>
              </div>
              <div className={`hidden lg:block text-center font-mono font-bold ${m.qty > 0 ? "text-starteq-pix" : "text-starteq-red"}`}>
                {m.qty > 0 ? "+" : ""}{m.qty}
              </div>
              <div className="hidden lg:block text-right font-mono text-sm text-starteq-text">R$ {m.unit_cost.toFixed(2)}</div>
              <div className="hidden lg:block text-right font-mono text-sm text-starteq-gold font-bold">R$ {m.total_cost.toFixed(2)}</div>
              <div className="hidden lg:block text-xs text-starteq-text truncate">{m.reason}</div>
              <div className="hidden lg:block text-xs text-starteq-muted font-mono">{new Date(m.created_at).toLocaleDateString("pt-BR")}</div>

              <div className="lg:hidden col-span-2">
                <div className="font-display font-semibold text-sm text-starteq-bone truncate">{m.product_name}</div>
                <div className="text-xs text-starteq-muted flex items-center gap-2 mt-1">
                  <span className={`font-mono font-bold ${m.qty > 0 ? "text-starteq-pix" : "text-starteq-red"}`}>
                    {m.qty > 0 ? "+" : ""}{m.qty} un
                  </span>
                  ·
                  <span>{m.reason}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function KPI({ label, value, icon, accent = "default" }: { label: string; value: string; icon: import("@/components/Icon").IconName; accent?: "default" | "gold" | "pix" | "red" }) {
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
        <Icon name={icon} size={16} className="text-starteq-muted" />
      </div>
      <div className={`text-xl font-space font-black ${colors[accent]}`}>{value}</div>
    </div>
  );
}
