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
    a: "O frete é por conta do comprador e calculado de acordo com o peso do pedido. Para pedidos maiores, dá pra negociar o frete — fala com a gente no WhatsApp. Em Palmas, entrega ou retirada é combinada no WhatsApp.",
  },
  {
    q: "Quanto tempo demora pra chegar?",
    a: "Depende da aprovação do pagamento. Para fora de Palmas, o envio é feito pelos Correios (Sedex ou PAC) e o prazo segue o estabelecido pelos Correios. Em Palmas, prazo e forma de entrega são combinados no WhatsApp.",
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
      <main className="flex-1 bg-starteq-black">
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
            {FAQ.map((f) => (
              <div key={f.q} className="bg-starteq-card border border-starteq-line rounded-xl p-6 lg:p-7">
                <h2 className="font-space font-bold text-lg text-starteq-bone mb-2">{f.q}</h2>
                <p className="text-starteq-muted leading-relaxed">{f.a}</p>
              </div>
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
