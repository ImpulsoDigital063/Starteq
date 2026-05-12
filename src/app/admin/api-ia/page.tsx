export default function ApiIaPage() {
  return (
    <>
      <header className="mb-10">
        <h1 className="font-display text-4xl font-bold text-starteq-bone">API para a IA</h1>
        <p className="text-starteq-muted mt-2 max-w-2xl">
          Sua IA do WhatsApp pode consumir o catálogo, estoque e preço direto do site.
          Sem scraping · sem mandar pra Kabum quando não tem · resposta em tempo real.
        </p>
      </header>

      <div className="space-y-6">
        <Endpoint
          method="GET"
          path="/api/products"
          desc="Catálogo completo paginado"
          example={`curl https://starteq-palmas.vercel.app/api/products?category=gpu&limit=20`}
          response={`{
  "meta": { "total": 5, "page": 1, "limit": 20, "has_more": false },
  "data": [
    {
      "sku": "GPU-MSI-4070S",
      "name": "MSI RTX 4070 Super Ventus 12GB",
      "category": "gpu",
      "brand": "MSI",
      "price": 4990.00,
      "pix_price": 4690.00,
      "in_stock": true,
      "stock": 2,
      "specs": { "tdp": 220, "vram_gb": 12 },
      "url": "/produtos/msi-rtx-4070-super-ventus"
    }
  ]
}`}
        />

        <Endpoint
          method="GET"
          path="/api/products/:sku"
          desc="Produto único por SKU"
          example={`curl https://starteq-palmas.vercel.app/api/products/CPU-AMD-7600`}
          response={`{
  "sku": "CPU-AMD-7600",
  "name": "AMD Ryzen 5 7600",
  "in_stock": true,
  "stock": 5,
  "pix_price": 1290.00,
  ...
}`}
        />

        <Endpoint
          method="POST"
          path="/api/quote"
          desc="Cliente pediu PC pra rodar Valorant · IA seleciona SKUs · chama esse endpoint · recebe validação + link WhatsApp pronto"
          example={`curl -X POST https://starteq-palmas.vercel.app/api/quote \\
  -H "Content-Type: application/json" \\
  -d '{"parts": ["CPU-AMD-5600", "MB-ASR-A520M", "RAM-KS-16-3200", "GPU-GLX-4060", "PSU-CR-CV550"]}'`}
          response={`{
  "compatible": true,
  "total": 5070.00,
  "total_retail": 5530.00,
  "installments": { "count": 10, "value": 553.00 },
  "parts_detail": [...],
  "issues": [],
  "whatsapp_link": "https://wa.me/5563992528619?text=..."
}`}
        />
      </div>

      <div className="mt-10 bg-starteq-gold/5 border border-starteq-gold/30 rounded-xl p-6">
        <h3 className="font-display font-bold text-starteq-gold text-lg mb-2">🤖 Como a IA usa</h3>
        <ol className="text-sm text-starteq-text space-y-2 list-decimal list-inside">
          <li>Cliente manda mensagem no WhatsApp: <em>"quero um PC pra jogar Valorant até R$ 5 mil"</em></li>
          <li>IA chama <code className="font-mono text-starteq-gold">GET /api/products?category=cpu&limit=50</code> pra ver estoque atual</li>
          <li>IA seleciona componentes compatíveis dentro do orçamento</li>
          <li>IA chama <code className="font-mono text-starteq-gold">POST /api/quote</code> com a lista de SKUs</li>
          <li>API retorna validação + link WhatsApp pronto · IA encaminha pro cliente</li>
          <li>Cliente clica no link e fecha com você direto</li>
        </ol>
        <p className="text-sm text-starteq-text mt-4">
          <strong className="text-starteq-gold">Resultado:</strong> a IA para de mandar pra Kabum quando não tem · porque agora ela sabe o estoque REAL da Starteq em tempo real.
        </p>
      </div>
    </>
  );
}

function Endpoint({
  method,
  path,
  desc,
  example,
  response,
}: {
  method: string;
  path: string;
  desc: string;
  example: string;
  response: string;
}) {
  return (
    <div className="bg-starteq-card border border-starteq-line rounded-xl overflow-hidden">
      <div className="p-5 border-b border-starteq-line">
        <div className="flex items-center gap-3">
          <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
            method === "GET" ? "bg-starteq-green/15 text-starteq-green" : "bg-starteq-gold/15 text-starteq-gold"
          }`}>
            {method}
          </span>
          <code className="font-mono text-starteq-bone">{path}</code>
        </div>
        <p className="text-sm text-starteq-muted mt-2">{desc}</p>
      </div>
      <div className="p-5 space-y-4">
        <div>
          <div className="text-xs text-starteq-muted uppercase tracking-wider mb-2 font-display font-semibold">Exemplo</div>
          <pre className="bg-starteq-black border border-starteq-line rounded-lg p-3 text-xs text-starteq-text font-mono overflow-x-auto">
            <code>{example}</code>
          </pre>
        </div>
        <div>
          <div className="text-xs text-starteq-muted uppercase tracking-wider mb-2 font-display font-semibold">Resposta</div>
          <pre className="bg-starteq-black border border-starteq-line rounded-lg p-3 text-xs text-starteq-gold font-mono overflow-x-auto">
            <code>{response}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
