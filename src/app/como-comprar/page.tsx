import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StarField } from "@/components/StarField";

export const metadata = {
  title: "Como comprar · Starteq Tocantins",
  description: "Passo a passo pra comprar na Starteq · PIX · cartão · entrega same-day em Palmas.",
};

const STEPS = [
  {
    n: "01",
    title: "Monte ou escolha",
    text: "Use o /montador pra criar uma build personalizada com compatibilidade validada, ou pegue um PC pronto do catálogo.",
  },
  {
    n: "02",
    title: "Adicione ao carrinho",
    text: "Revise as peças, confira a wattagem da fonte e o consumo estimado. Tudo conferido? Adiciona ao carrinho.",
  },
  {
    n: "03",
    title: "Finalize no checkout",
    text: "Cadastro rápido ou guest. CEP pra calcular frete. Escolhe forma de pagamento. Tudo no mesmo fluxo, sem fricção.",
  },
  {
    n: "04",
    title: "Pague pelo PIX, cartão ou boleto",
    text: "PIX é instantâneo e tem desconto à vista. Cartão em até 10x sem juros. Boleto bancário também aceito.",
  },
  {
    n: "05",
    title: "Receba ou retire",
    text: "Mesmo dia em Palmas via motoboy. Pra fora, frete calculado por transportadora. Tudo montado, com NF, garantia por peça.",
  },
];

export default function ComoComprarPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-starteq-black">
        <section className="relative overflow-hidden nebula-bg py-20">
          <StarField className="opacity-60" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-3">
              Protocolo de compra
            </div>
            <h1 className="font-space text-4xl lg:text-5xl font-black text-starteq-bone">
              Como comprar na <span className="text-space-grad">Starteq</span>
            </h1>
            <p className="text-starteq-muted mt-4 max-w-2xl mx-auto">
              5 passos do clique ao gamer ligado. Sem letrinha miúda, sem cobrança escondida.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="space-y-6">
              {STEPS.map((s) => (
                <li
                  key={s.n}
                  className="bg-starteq-card border border-starteq-line rounded-xl p-6 lg:p-8 flex gap-6"
                >
                  <div className="text-starteq-gold font-space font-black text-4xl lg:text-5xl leading-none flex-shrink-0">
                    {s.n}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-space font-bold text-xl text-starteq-bone mb-2">{s.title}</h3>
                    <p className="text-starteq-muted leading-relaxed">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-12 bg-starteq-card border border-starteq-gold/30 rounded-xl p-8 text-center">
              <h3 className="font-space font-bold text-2xl text-starteq-bone mb-3">Dúvida no meio do caminho?</h3>
              <p className="text-starteq-muted mb-6">
                Tripulação humana no WhatsApp em horário comercial. Resposta em 30 minutos médios.
              </p>
              <a
                href="https://wa.me/5563992528619"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-starteq-pix text-white hover:opacity-90 font-space font-bold tracking-wide uppercase text-sm px-8 py-4 rounded-lg transition-all"
              >
                Falar com a Starteq
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
