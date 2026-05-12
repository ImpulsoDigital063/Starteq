import { Icon } from "@/components/Icon";
import { TECHNICIANS } from "@/lib/admin-mock";
import { requireSession } from "@/lib/admin-auth";


// Configurações simplificadas · 3 cards principais (era 6 · auditoria λ.logica-primeiro)
export default function ConfiguracoesPage() {
  return (
    <>
      <header className="mb-6">
        <h1 className="font-space text-2xl lg:text-3xl font-black text-starteq-bone">Configurações</h1>
        <p className="text-starteq-muted mt-1 text-sm">Equipe · integrações · loja</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* CARD 1 · EQUIPE */}
        <Card title="Equipe · técnicos e admins" icon="user">
          <div className="divide-y divide-starteq-line">
            {TECHNICIANS.map((t) => (
              <div key={t.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="font-display font-semibold text-sm text-starteq-bone">{t.name}</div>
                  <div className="text-xs text-starteq-muted">{t.email}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-starteq-gold font-mono">{t.commission_default}% comissão</div>
                  <span className={`text-[10px] font-space font-bold uppercase tracking-wider ${t.active ? "text-starteq-pix" : "text-starteq-muted"}`}>
                    {t.active ? "Ativo" : "Inativo"}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-3 text-xs text-starteq-gold hover:text-starteq-bone font-space font-bold uppercase tracking-wider inline-flex items-center gap-1">
            <Icon name="user" size={12} /> + Adicionar técnico
          </button>
        </Card>

        {/* CARD 2 · INTEGRAÇÕES */}
        <Card title="Integrações" icon="bot">
          <div className="space-y-3">
            <Integration name="IA do Júnior · API" status="Configurado" desc="Endpoint público /api/products + /api/quote · IA consome direto" connected />
            <Integration name="Asaas · PIX e Cartão" status="Conectar" desc="Pagamentos · webhook automático · 15% off PIX" />
            <Integration name="WhatsApp Business API" status="Conectar" desc="Envia template OS pronta · pedido pago automático" />
            <Integration name="GestãoClick · Importação" status="Pendente" desc="Importar produtos + clientes do ERP atual em CSV" />
            <Integration name="Melhor Envio · Frete" status="Conectar" desc="Cálculo multi-transportadora pra fora de Palmas" />
          </div>
        </Card>

        {/* CARD 3 · LOJA */}
        <Card title="Loja · informações públicas" icon="info">
          <div className="space-y-3 text-sm">
            <Field label="Nome" value="Starteq Tocantins" />
            <Field label="Endereço" value="104 Sul, SE 05, Lt. 19, Sala 07" />
            <Field label="CEP" value="77020-018" />
            <Field label="WhatsApp" value="(63) 99252-8619" />
            <Field label="Email" value="starteqpalmas@gmail.com" />
            <Field label="Horário" value="Seg-sex 8-18 · Sáb 9-13" />
            <Field label="Desconto PIX" value="15% off à vista" />
            <Field label="Parcelamento" value="Até 10x sem juros" />
            <Field label="Garantia OS" value="90 dias por peça" />
            <Field label="Comissão técnico padrão" value="30% sobre serviço" />
          </div>
        </Card>

        {/* CARD 4 · API DOCS rápido */}
        <Card title="API · IA do Júnior" icon="bot">
          <div className="text-xs text-starteq-muted mb-3">
            Endpoints públicos · CORS aberto · IA dele consome direto. Mais detalhes em <a href="/admin/api-ia" className="text-starteq-gold hover:text-starteq-bone">API · IA</a>.
          </div>
          <div className="space-y-2 text-xs font-mono">
            <CodeRow method="GET" path="/api/products" />
            <CodeRow method="GET" path="/api/products/:sku" />
            <CodeRow method="POST" path="/api/quote" />
          </div>
        </Card>
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

function Integration({ name, status, desc, connected = false }: { name: string; status: string; desc: string; connected?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-starteq-line last:border-0">
      <div className="flex-1 min-w-0">
        <div className="font-display font-semibold text-sm text-starteq-bone">{name}</div>
        <div className="text-xs text-starteq-muted">{desc}</div>
      </div>
      <button className={`flex-shrink-0 text-xs font-space font-bold uppercase tracking-wider px-3 py-1.5 rounded border ${
        connected
          ? "bg-starteq-pix/10 text-starteq-pix border-starteq-pix/40"
          : "bg-starteq-gold/10 text-starteq-gold border-starteq-gold/40 hover:bg-starteq-gold/20"
      }`}>
        {status}
      </button>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 py-1.5 border-b border-starteq-line last:border-0">
      <span className="text-starteq-muted text-xs uppercase tracking-wider font-space font-bold">{label}</span>
      <span className="text-starteq-bone text-right text-sm">{value}</span>
    </div>
  );
}

function CodeRow({ method, path }: { method: string; path: string }) {
  return (
    <div className="bg-starteq-black border border-starteq-line rounded p-2 flex items-center gap-2">
      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${method === "GET" ? "bg-starteq-pix/15 text-starteq-pix" : "bg-starteq-gold/15 text-starteq-gold"}`}>
        {method}
      </span>
      <span className="text-starteq-bone flex-1">{path}</span>
    </div>
  );
}
