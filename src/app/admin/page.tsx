import { PRODUCTS } from "@/lib/catalog";

export default function AdminDashboard() {
  const totalSkus = PRODUCTS.length;
  const inStock = PRODUCTS.filter((p) => p.stock > 0).length;
  const lowStock = PRODUCTS.filter((p) => p.stock > 0 && p.stock <= 3).length;
  const totalValue = PRODUCTS.reduce((s, p) => s + p.price * p.stock, 0);

  return (
    <>
      <header className="mb-10">
        <h1 className="font-display text-4xl font-bold text-starteq-bone">Dashboard</h1>
        <p className="text-starteq-muted mt-2">Visão geral da operação · {new Date().toLocaleDateString("pt-BR", { dateStyle: "full" })}</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <KPI label="SKUs cadastrados" value={totalSkus.toString()} />
        <KPI label="Em estoque" value={inStock.toString()} accent />
        <KPI label="Estoque baixo (≤3)" value={lowStock.toString()} warn />
        <KPI label="Valor em estoque" value={`R$ ${(totalValue / 1000).toFixed(1)}k`} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Pedidos recentes">
          <div className="text-sm text-starteq-muted py-8 text-center">
            Nenhum pedido ainda. <br />
            Quando começar a vender pelo site, os pedidos aparecem aqui em tempo real.
          </div>
        </Card>

        <Card title="API · IA do Júnior">
          <p className="text-sm text-starteq-muted leading-relaxed mb-4">
            Sua IA do WhatsApp pode consumir o catálogo direto. Sem scraping · sem mandar pra Kabum.
          </p>
          <div className="bg-starteq-black border border-starteq-line rounded-lg p-3 font-mono text-xs text-starteq-gold">
            GET /api/products?category=gpu
          </div>
          <div className="bg-starteq-black border border-starteq-line rounded-lg p-3 font-mono text-xs text-starteq-gold mt-2">
            POST /api/quote · {"{ parts: [...] }"}
          </div>
        </Card>
      </div>
    </>
  );
}

function KPI({ label, value, accent = false, warn = false }: { label: string; value: string; accent?: boolean; warn?: boolean }) {
  return (
    <div className={`rounded-xl p-5 border ${
      accent ? "bg-starteq-gold/5 border-starteq-gold/30" :
      warn ? "bg-starteq-red/5 border-starteq-red/30" :
      "bg-starteq-card border-starteq-line"
    }`}>
      <div className="text-xs text-starteq-muted uppercase tracking-wider font-display font-semibold">{label}</div>
      <div className={`text-3xl font-display font-bold mt-2 ${
        accent ? "text-starteq-gold" : warn ? "text-starteq-red" : "text-starteq-bone"
      }`}>
        {value}
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-starteq-card border border-starteq-line rounded-xl p-6">
      <h3 className="font-display font-bold text-starteq-bone text-lg mb-4">{title}</h3>
      {children}
    </div>
  );
}
