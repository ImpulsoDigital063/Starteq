import { PrintButton } from "./PrintButton";

export const metadata = {
  title: "Proposta · Impulso Digital × Starteq Tocantins",
  robots: { index: false, follow: false },
};

// Página de proposta impressa · evita áreas pretas grandes (regra impressão)
// Texto em cinza escuro (não puro preto) · acentos gold + branco
// Ctrl+P direto vira PDF formatado A4

export default function PropostaPage() {
  return (
    <div className="proposta-doc bg-white text-[#1A1A1A] min-h-screen print:min-h-0">
      <style>{`
        @page { size: A4; margin: 14mm 12mm; }
        @media print {
          html, body { background: white !important; }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; }
        }
        .proposta-doc { font-family: var(--font-inter), system-ui, sans-serif; }
        .proposta-doc h1, .proposta-doc h2, .proposta-doc h3 { font-family: var(--font-orbitron), sans-serif; letter-spacing: -0.01em; }
      `}</style>

      {/* Toolbar topo · não imprime */}
      <div className="no-print sticky top-0 z-50 bg-[#1A1A1A] text-white py-3 px-4 flex items-center justify-between gap-3 flex-wrap">
        <div className="text-sm">
          <strong className="font-bold">Proposta Impulso × Starteq</strong>
          <span className="ml-2 opacity-60">· Ctrl+P pra salvar PDF / imprimir</span>
        </div>
        <PrintButton />
      </div>

      <article className="max-w-3xl mx-auto px-6 py-8 print:px-0 print:py-0">

        {/* HEADER */}
        <header className="flex items-end justify-between gap-4 border-b-2 border-[#F5C518] pb-4 mb-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#7A7A7A] mb-1">
              Impulso Digital · Palmas-TO
            </div>
            <h1 className="text-3xl font-black leading-none text-[#1A1A1A]">
              Proposta Comercial
            </h1>
            <div className="text-sm text-[#4A4A4A] mt-1 font-medium">
              Sistema completo · Starteq Tocantins
            </div>
          </div>
          <div className="text-right text-xs text-[#7A7A7A]">
            <div>Palmas, 12 de maio de 2026</div>
            <div className="mt-0.5">Válida por 7 dias</div>
            <div className="mt-0.5 font-mono">PROP-2026-STARTEQ-01</div>
          </div>
        </header>

        {/* BLOCO · APRESENTAÇÃO */}
        <section className="mb-6">
          <p className="text-sm leading-relaxed text-[#2A2A2A]">
            Júnior, boa! Esta proposta cobre o sistema completo que você viu na demo —
            site público com identidade gamer própria, painel administrativo com
            17 telas, área separada para técnicos, emissão de Nota Fiscal e
            automações de reativação de cliente. Tudo conectado à sua IA do WhatsApp
            que você já usa.
          </p>
        </section>

        {/* BLOCO · O QUE ESTÁ PRONTO */}
        <section className="mb-6">
          <h2 className="text-base font-bold uppercase tracking-wider text-[#1A1A1A] border-b border-[#E0E0E0] pb-1 mb-3">
            O que já está no ar
          </h2>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <Bloco
              title="Site público"
              items={[
                "73 produtos · catálogo real",
                "Configurador 'Monte seu PC'",
                "Blog com 6 posts técnicos",
                "Universo visual próprio (6 peças)",
                "Mobile-first · iOS otimizado",
                "SEO + Schema.org",
              ]}
            />
            <Bloco
              title="Painel admin (17 telas)"
              items={[
                "Dashboard com KPIs",
                "Ordens de Serviço completo",
                "Pedidos · Produtos · Estoque",
                "Clientes (CRM) · Financeiro",
                "Notas Fiscais (Focus NFe)",
                "Campanhas · Reativação",
                "Editor do site sem código",
              ]}
            />
            <Bloco
              title="Diferenciais"
              items={[
                "Login técnico separado (Marcos)",
                "Comissionamento automático",
                "Etiqueta OS imprimível 80×60mm",
                "Importar GestãoClick CSV",
                "Bot status OS pelo WhatsApp",
                "Mini-mapa loja + status horário",
              ]}
            />
          </div>
        </section>

        {/* BLOCO · O QUE VAMOS ENTREGAR */}
        <section className="mb-6">
          <h2 className="text-base font-bold uppercase tracking-wider text-[#1A1A1A] border-b border-[#E0E0E0] pb-1 mb-3">
            O que vamos entregar após o fechamento
          </h2>
          <div className="space-y-2 text-sm">
            <Etapa
              when="Primeira semana"
              what="Setup de produção · contas próprias da Starteq"
              detail="GitHub, Vercel, Supabase, Focus NFe · tudo no seu nome. Banco de dados real plugado. Importa cadastro do GestãoClick."
            />
            <Etapa
              when="2ª e 3ª semanas"
              what="Integração WhatsApp Business + IA"
              detail="Conecta sua IA com o painel · bot responde status de OS, dispara campanhas, captura leads. Treinamento de 4h com você."
            />
            <Etapa
              when="30 dias"
              what="Pagamento + Frete + NFe ao vivo"
              detail="Checkout PIX + cartão operando · gateway escolhido junto com você (Mercado Pago, Pagar.me, Stripe ou similar) · Melhor Envio integrado · NFe automática com seu certificado A1."
            />
            <Etapa
              when="90 dias"
              what="Otimização contínua"
              detail="Pixel Meta + GA4 + automações de marketing · campanhas sazonais ativas · relatórios mensais de performance."
            />
          </div>
        </section>

        {/* BLOCO · INVESTIMENTO · 2 caminhos */}
        <section className="mb-6 page-break-inside-avoid">
          <h2 className="text-base font-bold uppercase tracking-wider text-[#1A1A1A] border-b border-[#E0E0E0] pb-1 mb-3">
            Investimento · dois caminhos
          </h2>

          <p className="text-sm leading-relaxed text-[#2A2A2A] mb-4">
            Pensei em duas formas de você fechar isso. Os dois caminhos entregam o <strong>mesmo
            sistema completo, no seu nome</strong>. O que muda é quem cuida dele depois da entrega.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* OPÇÃO A · OPERAÇÃO */}
            <div className="border-2 border-[#F5C518] rounded-md p-4 relative">
              <div className="absolute -top-2.5 left-3 bg-[#F5C518] text-[#1A1A1A] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                Recomendado
              </div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-[#7A7A7A] mt-1">
                Opção A · Impulso opera pra você
              </div>
              <div className="mt-1 flex items-baseline gap-2 flex-wrap">
                <span className="text-2xl font-black text-[#1A1A1A] font-mono">R$ 2.497</span>
                <span className="text-[11px] text-[#7A7A7A]">setup</span>
              </div>
              <div className="text-[11px] text-[#4A4A4A]">
                50% na assinatura · 50% na entrega
              </div>
              <div className="mt-2 flex items-baseline gap-2 flex-wrap">
                <span className="text-2xl font-black text-[#1A1A1A] font-mono">R$ 199</span>
                <span className="text-[11px] text-[#7A7A7A]">/mês · sem fidelidade</span>
              </div>

              <ul className="text-xs text-[#2A2A2A] mt-3 space-y-1 leading-relaxed">
                <li>✓ Sistema completo entregue + contas próprias</li>
                <li>✓ Migração dos dados do GestãoClick</li>
                <li>✓ Treinamento 4h (você + técnico)</li>
                <li>✓ Suporte WhatsApp humano (mesmo dia)</li>
                <li>✓ Correções de bugs ilimitadas</li>
                <li>✓ 4h/mês de evolução (features novas)</li>
                <li>✓ Monitoramento + backup diário</li>
                <li>✓ NFe + WhatsApp + checkout (gateway à sua escolha)</li>
              </ul>
            </div>

            {/* OPÇÃO B · SISTEMA SEU */}
            <div className="border-2 border-[#1A1A1A] rounded-md p-4">
              <div className="text-[10px] uppercase tracking-wider font-bold text-[#7A7A7A]">
                Opção B · Sistema 100% seu · zero amarra
              </div>
              <div className="mt-1 flex items-baseline gap-2 flex-wrap">
                <span className="text-2xl font-black text-[#1A1A1A] font-mono">R$ 3.497</span>
                <span className="text-[11px] text-[#7A7A7A]">setup único</span>
              </div>
              <div className="text-[11px] text-[#4A4A4A]">
                50% na assinatura · 50% na entrega
              </div>
              <div className="mt-2 flex items-baseline gap-2 flex-wrap">
                <span className="text-xl font-black text-[#1A1A1A] font-mono">Zero</span>
                <span className="text-[11px] text-[#7A7A7A]">mensalidade</span>
              </div>

              <ul className="text-xs text-[#2A2A2A] mt-3 space-y-1 leading-relaxed">
                <li>✓ Sistema completo entregue + contas próprias</li>
                <li>✓ Migração dos dados do GestãoClick</li>
                <li>✓ Treinamento 4h (você + técnico)</li>
                <li>✓ Documentação técnica completa</li>
                <li>✓ Garantia 30 dias · bugs do entregue</li>
                <li>✓ NFe + WhatsApp + checkout (gateway à sua escolha)</li>
                <li className="text-[#7A7A7A]">— Depois você opera sozinho ou contrata outro</li>
                <li className="text-[#7A7A7A]">— Impulso fica disponível por hora avulsa (R$ 150/h)</li>
              </ul>
            </div>
          </div>

          {/* COMPARATIVO SÓ DA OPÇÃO A */}
          <div className="border border-[#E0E0E0] rounded-md p-3 bg-[#FAFAFA]">
            <div className="text-[10px] uppercase tracking-wider font-bold text-[#7A7A7A] mb-2">
              Por que a Opção A faz sentido · R$ 199/mês equivale a contratar
            </div>
            <div className="grid grid-cols-4 gap-3 text-xs">
              <Comparativo name="Bling (ERP)" price="R$ 145/mês" />
              <Comparativo name="Tray (e-commerce)" price="R$ 99/mês" />
              <Comparativo name="Yampi (checkout)" price="R$ 99/mês" />
              <Comparativo name="RD Station (CRM)" price="R$ 250/mês" />
            </div>
            <div className="text-xs text-[#2A2A2A] mt-2 leading-relaxed">
              Soma de equivalentes: <strong className="font-mono">R$ 593/mês</strong> ·
              cada um isolado, sem integração, sem identidade própria, sem suporte humano local.
              Por <strong className="font-mono">R$ 199/mês</strong> você tem tudo isso integrado + Impulso operando junto.
            </div>
          </div>
        </section>

        {/* BLOCO · WHITE LABEL */}
        <section className="mb-6">
          <h2 className="text-base font-bold uppercase tracking-wider text-[#1A1A1A] border-b border-[#E0E0E0] pb-1 mb-3">
            O sistema é seu
          </h2>
          <p className="text-sm leading-relaxed text-[#2A2A2A]">
            Tudo é provisionado <strong>no seu nome desde o dia 1</strong>: o repositório
            de código fica no <strong>seu GitHub</strong>, o servidor no <strong>seu Vercel</strong>,
            o banco de dados no <strong>seu Supabase</strong>, o domínio no <strong>seu CNPJ</strong>.
            Se um dia você quiser cuidar sozinho ou trocar de fornecedor,
            sai daqui com <strong>tudo na mão</strong>. Você nunca fica refém da Impulso ·
            a mensalidade é para eu operar e evoluir o sistema para você.
          </p>
        </section>

        {/* BLOCO · ADD-ONS OPCIONAIS */}
        <section className="mb-6">
          <h2 className="text-base font-bold uppercase tracking-wider text-[#1A1A1A] border-b border-[#E0E0E0] pb-1 mb-3">
            Add-ons opcionais (futuro)
          </h2>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <AddOn name="Pixel Meta + GA4 + Google Ads" price="R$ 250" />
            <AddOn name="Modo Balcão (POS · TEF)" price="R$ 450" />
            <AddOn name="App PWA Android instalável" price="R$ 350" />
          </div>
          <div className="text-[11px] text-[#7A7A7A] mt-2">
            Preço de setup único · sem mensalidade adicional. Você decide se quer plugar ou não.
          </div>
        </section>

        {/* BLOCO · FECHAMENTO */}
        <section className="mt-8 border-t-2 border-[#F5C518] pt-4">
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-[#7A7A7A] mb-1">Aprovado por</div>
              <div className="border-b border-[#1A1A1A] pb-1 mb-1">&nbsp;</div>
              <div className="text-xs text-[#4A4A4A]">Júnior · Starteq Tocantins · CNPJ ____________________</div>
              <div className="text-xs text-[#4A4A4A] mt-1">Data: ___ / ___ / 2026</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-[#7A7A7A] mb-1">Por</div>
              <div className="border-b border-[#1A1A1A] pb-1 mb-1">&nbsp;</div>
              <div className="text-xs text-[#4A4A4A]">Eduardo Barros Chaves · Impulso Digital</div>
              <div className="text-xs text-[#4A4A4A] mt-1">edubchaves5@gmail.com · (63) 9____-____</div>
            </div>
          </div>

          <div className="text-center mt-6 text-[10px] uppercase tracking-[0.2em] text-[#7A7A7A]">
            Toda honra e toda glória seja dada a Deus
          </div>
        </section>
      </article>
    </div>
  );
}

function Bloco({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border border-[#E0E0E0] rounded p-2.5">
      <h3 className="font-bold text-[11px] uppercase tracking-wider text-[#1A1A1A] mb-1.5">{title}</h3>
      <ul className="space-y-0.5">
        {items.map((it) => (
          <li key={it} className="text-[#2A2A2A] leading-snug">
            <span className="text-[#F5C518] font-bold mr-1">•</span>{it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Etapa({ when, what, detail }: { when: string; what: string; detail: string }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="bg-[#F5C518] text-[#1A1A1A] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded flex-shrink-0 min-w-[110px] text-center">
        {when}
      </div>
      <div className="flex-1">
        <div className="font-bold text-[#1A1A1A] text-sm">{what}</div>
        <div className="text-xs text-[#4A4A4A] leading-relaxed">{detail}</div>
      </div>
    </div>
  );
}

function Comparativo({ name, price }: { name: string; price: string }) {
  return (
    <div>
      <div className="font-bold text-[#1A1A1A] text-[11px]">{name}</div>
      <div className="text-[#7A7A7A] text-[11px] font-mono">{price}</div>
    </div>
  );
}

function AddOn({ name, price }: { name: string; price: string }) {
  return (
    <div className="border border-[#E0E0E0] rounded p-2">
      <div className="font-bold text-[11px] text-[#1A1A1A] leading-tight">{name}</div>
      <div className="text-[#F5C518] font-bold font-mono text-sm mt-1">{price}</div>
    </div>
  );
}

