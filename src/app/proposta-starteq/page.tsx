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
              detail="GitHub, Vercel, Supabase, Asaas, Focus NFe · tudo no seu nome. Banco de dados real plugado. Importa cadastro do GestãoClick."
            />
            <Etapa
              when="2ª e 3ª semanas"
              what="Integração WhatsApp Business + IA"
              detail="Conecta sua IA com o painel · bot responde status de OS, dispara campanhas, captura leads. Treinamento de 4h com você."
            />
            <Etapa
              when="30 dias"
              what="Pagamento + Frete + NFe ao vivo"
              detail="Asaas (PIX, cartão 10x) operando · Melhor Envio integrado · NFe automática com seu certificado A1."
            />
            <Etapa
              when="90 dias"
              what="Otimização contínua"
              detail="Pixel Meta + GA4 + automações de marketing · campanhas sazonais ativas · relatórios mensais de performance."
            />
          </div>
        </section>

        {/* BLOCO · INVESTIMENTO · página 2 idealmente */}
        <section className="mb-6 page-break-inside-avoid">
          <h2 className="text-base font-bold uppercase tracking-wider text-[#1A1A1A] border-b border-[#E0E0E0] pb-1 mb-3">
            Investimento
          </h2>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* SETUP */}
            <div className="border-2 border-[#F5C518] rounded-md p-4">
              <div className="text-[10px] uppercase tracking-wider font-bold text-[#7A7A7A]">
                Setup único · à vista
              </div>
              <div className="text-3xl font-black mt-1 text-[#1A1A1A] font-mono">R$ 3.497</div>
              <div className="text-[11px] text-[#4A4A4A] mt-1">
                ou 3× R$ 1.199 sem juros no cartão
              </div>
              <ul className="text-xs text-[#2A2A2A] mt-3 space-y-1 leading-relaxed">
                <li>✓ Sistema completo entregue</li>
                <li>✓ Provisionamento contas próprias</li>
                <li>✓ Migração dos seus dados do GestãoClick</li>
                <li>✓ Treinamento 4h (você + técnico)</li>
                <li>✓ Domínio configurado</li>
                <li>✓ NFe + WhatsApp + Asaas plugados</li>
              </ul>
            </div>

            {/* MENSALIDADE */}
            <div className="border-2 border-[#1A1A1A] rounded-md p-4">
              <div className="text-[10px] uppercase tracking-wider font-bold text-[#7A7A7A]">
                Mensalidade · sem fidelidade
              </div>
              <div className="text-3xl font-black mt-1 text-[#1A1A1A] font-mono">
                R$ 397<span className="text-base font-normal text-[#7A7A7A]">/mês</span>
              </div>
              <div className="text-[11px] text-[#4A4A4A] mt-1">
                Inclui hospedagem · sem custo extra de servidor
              </div>
              <ul className="text-xs text-[#2A2A2A] mt-3 space-y-1 leading-relaxed">
                <li>✓ Hospedagem Vercel + Supabase</li>
                <li>✓ Suporte WhatsApp humano (mesmo dia)</li>
                <li>✓ Correções de bugs ilimitadas</li>
                <li>✓ 4h/mês de evolução (features novas)</li>
                <li>✓ Monitoramento + uptime garantido</li>
                <li>✓ Backup automático diário</li>
              </ul>
            </div>
          </div>

          {/* COMPARATIVO */}
          <div className="border border-[#E0E0E0] rounded-md p-3 bg-[#FAFAFA]">
            <div className="text-[10px] uppercase tracking-wider font-bold text-[#7A7A7A] mb-2">
              O que sai por R$ 397/mês equivale a contratar
            </div>
            <div className="grid grid-cols-4 gap-3 text-xs">
              <Comparativo name="Bling (ERP)" price="R$ 145/mês" />
              <Comparativo name="Tray (e-commerce)" price="R$ 99/mês" />
              <Comparativo name="Yampi (checkout)" price="R$ 99/mês" />
              <Comparativo name="RD Station (CRM)" price="R$ 250/mês" />
            </div>
            <div className="text-xs text-[#2A2A2A] mt-2 leading-relaxed">
              Soma de equivalentes: <strong className="font-mono">R$ 593/mês</strong> · sem integração entre eles ·
              sem identidade própria · sem suporte humano local.
            </div>
          </div>
        </section>

        {/* BLOCO · INFRAESTRUTURA GRATUITA */}
        <section className="mb-6 page-break-inside-avoid">
          <h2 className="text-base font-bold uppercase tracking-wider text-[#1A1A1A] border-b border-[#E0E0E0] pb-1 mb-3">
            Infraestrutura · zero custo até a Starteq escalar
          </h2>
          <p className="text-sm leading-relaxed text-[#2A2A2A] mb-3">
            A stack que escolhemos roda no <strong>plano gratuito</strong> da GitHub, Vercel
            e Supabase — três das maiores plataformas de tecnologia do mundo.
            <strong> Toda a operação atual da Starteq cabe dentro do free tier delas.</strong> Você
            só começa a pagar essas ferramentas quando o negócio crescer para escalas bem maiores
            que a atual — e mesmo aí, são valores baixos.
          </p>

          <div className="grid grid-cols-3 gap-3 mb-3">
            <Infra
              name="GitHub Free"
              role="Código-fonte"
              capacity="Repositórios privados ilimitados · 2.000 min/mês de automação"
              limit="Praticamente nunca paga"
              cost="—"
            />
            <Infra
              name="Vercel Hobby"
              role="Servidor + site"
              capacity="100 GB de tráfego/mês · ~50.000 visitas/mês"
              limit="Quando passar de 50k visitas/mês"
              cost="US$ 20/mês (~R$ 110)"
            />
            <Infra
              name="Supabase Free"
              role="Banco de dados + login"
              capacity="500 MB de dados · 50.000 usuários · backup diário"
              limit="Quando passar de ~3.000 clientes ativos"
              cost="US$ 25/mês (~R$ 137)"
            />
          </div>

          <div className="border border-[#E0E0E0] rounded-md p-3 bg-[#FAFAFA] text-xs leading-relaxed">
            <div className="font-bold text-[#1A1A1A] text-[11px] uppercase tracking-wider mb-1.5">
              Custos reais que aparecem no caixa da Starteq
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[#2A2A2A]">
              <div>
                <strong>Domínio (Registro.br):</strong> <span className="font-mono">R$ 40/ano</span> <span className="text-[#7A7A7A]">(~R$ 3,33/mês)</span>
              </div>
              <div>
                <strong>NFe (Focus NFe):</strong> <span className="font-mono">R$ 39/mês</span> <span className="text-[#7A7A7A]">(até 100 NFes/mês)</span>
              </div>
              <div>
                <strong>Asaas (PIX/cartão):</strong> <span className="font-mono">% por venda</span> <span className="text-[#7A7A7A]">(zero mensalidade)</span>
              </div>
              <div>
                <strong>WhatsApp Business:</strong> <span className="font-mono">grátis</span> <span className="text-[#7A7A7A]">(API que você já tem)</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#E0E0E0] text-[#2A2A2A]">
              <strong>Total fixo mensal de infra:</strong> <span className="font-mono text-[#1A1A1A] font-bold">R$ 42/mês</span> ·
              vendas pagam o Asaas como % (taxa de cartão/PIX normal de mercado).
            </div>
          </div>

          <p className="text-xs text-[#4A4A4A] mt-3 leading-relaxed">
            <strong className="text-[#1A1A1A]">Quando vai precisar pagar mais?</strong> Vercel Pro entra quando
            o site passar de <strong>~50.000 visitas/mês</strong>. Supabase Pro entra quando o cadastro passar
            de <strong>~3.000 clientes ativos</strong>. Hoje a loja roda em escala bem abaixo disso, então
            a infra continua gratuita por bastante tempo. Quando crescer ao ponto de precisar dos planos
            pagos, o faturamento já vai sustentar com folga (~R$ 250/mês de infra total).
          </p>
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

function Infra({
  name,
  role,
  capacity,
  limit,
  cost,
}: {
  name: string;
  role: string;
  capacity: string;
  limit: string;
  cost: string;
}) {
  return (
    <div className="border border-[#E0E0E0] rounded p-2.5">
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-[9px] uppercase tracking-wider font-bold text-[#F5C518] bg-[#1A1A1A] px-1.5 py-0.5 rounded">
          GRÁTIS
        </span>
        <h3 className="font-bold text-[12px] text-[#1A1A1A]">{name}</h3>
      </div>
      <div className="text-[10px] uppercase tracking-wider text-[#7A7A7A] font-bold mb-1.5">{role}</div>
      <div className="text-[11px] text-[#2A2A2A] leading-snug mb-2">{capacity}</div>
      <div className="border-t border-[#E0E0E0] pt-1.5">
        <div className="text-[9px] uppercase tracking-wider text-[#7A7A7A] font-bold">Quando paga</div>
        <div className="text-[10px] text-[#4A4A4A] leading-snug">{limit}</div>
        <div className="text-[11px] font-mono font-bold text-[#1A1A1A] mt-0.5">{cost}</div>
      </div>
    </div>
  );
}
