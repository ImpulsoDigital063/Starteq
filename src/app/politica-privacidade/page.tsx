import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StarField } from "@/components/StarField";

export const metadata = {
  title: "Política de Privacidade · Starteq Tocantins",
  description: "Como a Starteq trata os dados dos clientes · privacidade e segurança em toda a navegação e compra.",
};

const BLOCKS: { title: string; text: string }[] = [
  {
    title: "Nosso compromisso",
    text: "A Starteq tem o compromisso com a privacidade e a segurança de seus clientes durante todo o processo de navegação e compra pelo site.",
  },
  {
    title: "Seus dados",
    text: "Os dados cadastrais dos clientes não são vendidos, trocados ou divulgados a terceiros, exceto quando necessário para a entrega, o faturamento ou promoções solicitadas pelo cliente. Os dados pessoais são essenciais para a entrega segura dos pedidos dentro do prazo estabelecido.",
  },
  {
    title: "Cookies e navegação",
    text: "Utilizamos cookies e informações da sua navegação (sessão do browser) com o objetivo de traçar um perfil do público que visita o site e aperfeiçoar sempre nossos serviços, produtos, conteúdos e garantir as melhores ofertas e promoções para você.",
  },
  {
    title: "Sigilo",
    text: "As informações são mantidas em absoluto sigilo. O cadastro dos dados ocorre de forma automática, sem manipulação humana. A divulgação da senha a terceiros, incluindo amigos e parentes, é expressamente desaconselhada.",
  },
  {
    title: "Alterações",
    text: "As alterações sobre nossa política de privacidade serão devidamente informadas neste espaço.",
  },
];

export default function PoliticaPrivacidadePage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-starteq-black">
        <section className="relative overflow-hidden nebula-bg py-20">
          <StarField className="opacity-60" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-3">
              Privacidade & segurança
            </div>
            <h1 className="font-space text-4xl lg:text-5xl font-black text-starteq-bone">
              Política de <span className="text-space-grad">Privacidade</span>
            </h1>
            <p className="text-starteq-muted mt-4 max-w-2xl mx-auto">
              Seus dados protegidos em toda a navegação e compra na Starteq.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {BLOCKS.map((b) => (
              <div key={b.title} className="bg-starteq-card border border-starteq-line rounded-xl p-6 lg:p-8">
                <h2 className="font-space font-bold text-xl text-starteq-bone mb-2">{b.title}</h2>
                <p className="text-starteq-muted leading-relaxed">{b.text}</p>
              </div>
            ))}
            <p className="text-xs text-starteq-muted text-center pt-4">
              Starteq Tocantins · CNPJ 28.623.696/0001-21 · Palmas-TO · contato: starteqpalmas@gmail.com
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
