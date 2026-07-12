import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StarField } from "@/components/StarField";

export const metadata = {
  title: "Dúvidas Frequentes · Starteq Tocantins",
  description: "Perguntas frequentes sobre comprar na Starteq · pagamento, frete, prazo de entrega e mais.",
};

const FAQ: { q: string; a: string }[] = [
  {
    q: "Como efetuar a compra?",
    a: "Você compra direto pelo site: escolhe um produto do catálogo, monta um PC no /montador (com compatibilidade validada), ou fala com a equipe no WhatsApp. Também dá pra retirar na loja física em Palmas.",
  },
  {
    q: "Preciso ter CNPJ pra comprar?",
    a: "Não. Atendemos pessoa física e pessoa jurídica.",
  },
  {
    q: "Quem paga o frete?",
    a: "O frete é por conta do comprador e a gente acerta o valor junto com você no fechamento. Para pedidos maiores dá pra negociar. Em Palmas e região, entrega ou retirada é combinada no WhatsApp.",
  },
  {
    q: "Quanto tempo demora pra chegar?",
    a: "Depende de onde você está e da aprovação do pagamento. A forma de envio e o prazo a gente combina direto no WhatsApp: em Palmas e região, entrega local ou retirada na loja; para outras cidades, acertamos o envio no atendimento.",
  },
  {
    q: "Quais as formas de pagamento?",
    a: "PIX (com desconto à vista), cartão de crédito (parcelado sem juros), boleto bancário e transferência bancária.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function DuvidasFrequentesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <section className="relative overflow-hidden nebula-bg py-20">
          <StarField className="opacity-60" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-3">
              Central de ajuda
            </div>
            <h1 className="font-space text-4xl lg:text-5xl font-black text-starteq-bone">
              Dúvidas <span className="text-space-grad">Frequentes</span>
            </h1>
            <p className="text-starteq-muted mt-4 max-w-2xl mx-auto">
              As perguntas que mais chegam. Não achou a sua? Chama no WhatsApp.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            {FAQ.map((f, i) => (
              <details
                key={f.q}
                open={i === 0}
                className="group bg-starteq-card border border-starteq-line rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden p-6 lg:p-7 select-none">
                  <h2 className="font-space font-bold text-lg text-starteq-bone group-hover:text-starteq-gold transition-colors">{f.q}</h2>
                  <svg
                    className="w-5 h-5 flex-shrink-0 text-starteq-gold transition-transform group-open:rotate-180"
                    fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <p className="text-starteq-muted leading-relaxed px-6 lg:px-7 pb-6 lg:pb-7 -mt-1">{f.a}</p>
              </details>
            ))}

            <div className="mt-8 text-center">
              <a
                href="https://wa.me/5563992988916"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-starteq-pix text-white hover:opacity-90 font-space font-bold tracking-wide uppercase text-sm px-8 py-4 rounded-lg transition-all"
              >
                Perguntar no WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
