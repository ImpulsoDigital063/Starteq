import { PRODUCTS, type Category } from "@/lib/catalog";
import { Icon } from "@/components/Icon";
import { ImportarCSVButton } from "./ImportarCSVButton";

const CATEGORY_LABEL: Record<Category, string> = {
  cpu: "Processadores",
  cooler: "Coolers",
  mobo: "Placas-mãe",
  ram: "Memória RAM",
  gpu: "Placa de vídeo",
  fonte: "Fonte",
  ssd: "SSD",
  gabinete: "Gabinete",
  mouse: "Mouse",
  teclado: "Teclado",
  mousepad: "Mousepad",
  monitor: "Monitor",
  headset: "Headset",
  cadeira: "Cadeira",
  computadores: "Computadores",
};

export default function AdminProdutos() {
  return (
    <>
      <header className="mb-8 flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-4xl font-bold text-starteq-bone">Produtos</h1>
          <p className="text-starteq-muted mt-2">{PRODUCTS.length} SKUs cadastrados · gerencie estoque, preço e disponibilidade</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ImportarCSVButton />
          <button className="inline-flex items-center gap-2 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-display font-bold tracking-wide uppercase text-sm px-6 py-3 rounded-lg transition-all">
            <Icon name="plus" size={14} /> Novo produto
          </button>
        </div>
      </header>

      <div className="bg-starteq-card border border-starteq-line rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-starteq-line bg-starteq-coal">
              <th className="text-left p-4 font-display font-semibold uppercase tracking-wider text-xs text-starteq-muted">SKU</th>
              <th className="text-left p-4 font-display font-semibold uppercase tracking-wider text-xs text-starteq-muted">Produto</th>
              <th className="text-left p-4 font-display font-semibold uppercase tracking-wider text-xs text-starteq-muted">Categoria</th>
              <th className="text-right p-4 font-display font-semibold uppercase tracking-wider text-xs text-starteq-muted">Preço</th>
              <th className="text-right p-4 font-display font-semibold uppercase tracking-wider text-xs text-starteq-muted">PIX</th>
              <th className="text-right p-4 font-display font-semibold uppercase tracking-wider text-xs text-starteq-muted">Estoque</th>
              <th className="text-right p-4 font-display font-semibold uppercase tracking-wider text-xs text-starteq-muted">Ação</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((p) => (
              <tr key={p.sku} className="border-b border-starteq-line hover:bg-starteq-coal/50 transition-colors">
                <td className="p-4 font-mono text-xs text-starteq-muted">{p.sku}</td>
                <td className="p-4">
                  <div className="font-display font-semibold text-starteq-bone leading-tight">{p.name}</div>
                  <div className="text-xs text-starteq-muted mt-0.5">{p.brand}</div>
                </td>
                <td className="p-4 text-starteq-text">{CATEGORY_LABEL[p.category]}</td>
                <td className="p-4 text-right font-mono text-starteq-text">R$ {p.price.toFixed(2)}</td>
                <td className="p-4 text-right font-mono text-starteq-gold font-bold">R$ {p.pix_price.toFixed(2)}</td>
                <td className="p-4 text-right">
                  <span className={`font-mono ${
                    p.stock === 0 ? "text-starteq-red" :
                    p.stock <= 3 ? "text-starteq-gold" : "text-starteq-green"
                  }`}>
                    {p.stock} un
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-xs text-starteq-gold hover:text-starteq-bone font-display font-semibold uppercase tracking-wider">
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-xs text-starteq-muted">
        Em produção · cada edição atualiza estoque em tempo real · o site público + a IA do Júnior consomem os preços novos imediatamente
      </div>
    </>
  );
}
