import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Trocas e Devoluções · Starteq Tocantins",
  description: "Política de trocas, devoluções e arrependimento · 7 dias por CDC + garantia por peça.",
};

export default function TrocasPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-starteq-black">
        <section className="py-20 lg:py-28">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-3">
              Procedimentos
            </div>
            <h1 className="font-space text-4xl lg:text-5xl font-black text-starteq-bone mb-8">
              Trocas e <span className="text-space-grad">devoluções</span>
            </h1>

            <div className="prose prose-invert max-w-none space-y-8 text-starteq-text">
              <Card title="Direito de arrependimento · 7 dias">
                Pelo Código de Defesa do Consumidor (CDC, art. 49), você tem 7 dias corridos a partir do recebimento pra desistir da compra,
                sem precisar justificar. Vale pra qualquer compra feita pelo site. O valor pago volta integral, incluindo frete.
              </Card>

              <Card title="Como pedir devolução">
                Manda mensagem no WhatsApp <strong className="text-starteq-gold">(63) 99252-8619</strong> com o número do pedido e o motivo
                (arrependimento, defeito, peça errada). Em até 24h úteis a tripulação Starteq retorna com o procedimento de coleta.
              </Card>

              <Card title="Produto chegou com defeito">
                Não tente arrumar. Chama a gente que iniciamos a troca ou reparo dentro da garantia. PCs montados na Starteq saem com BIOS,
                drivers atualizados e teste de estabilidade · se algo vier errado, é com a gente.
              </Card>

              <Card title="Garantia por peça">
                Cada componente tem prazo de garantia próprio, indicado na nota fiscal. A garantia segue o fabricante (NVIDIA, AMD, Corsair, etc).
                A Starteq intermedia o RMA quando precisa, sem você bater na porta do fabricante.
              </Card>

              <Card title="Sem lacre na garantia">
                Diferente da maioria das lojas, você pode <strong className="text-starteq-gold">abrir o gabinete e modificar</strong> sem perder garantia.
                A garantia é por peça, não pela montagem. Se quiser trocar a fonte semana que vem ou adicionar mais RAM, é livre.
              </Card>

              <Card title="Estorno">
                PIX: até 5 dias úteis<br />
                Cartão: até 2 faturas (regra Visa/Master)<br />
                Boleto: até 10 dias úteis em conta indicada por você
              </Card>
            </div>

            <div className="mt-12 bg-starteq-card border border-starteq-gold/30 rounded-xl p-8 text-center">
              <p className="text-starteq-muted mb-4">Dúvida sobre garantia ou troca?</p>
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

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-starteq-card border border-starteq-line rounded-xl p-6">
      <h2 className="font-space font-bold text-xl text-starteq-bone mb-3">{title}</h2>
      <p className="text-starteq-muted leading-relaxed">{children}</p>
    </div>
  );
}
