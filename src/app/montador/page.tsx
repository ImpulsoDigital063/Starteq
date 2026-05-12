import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MontadorClient } from "./MontadorClient";

export const metadata = {
  title: "Monte seu PC · Starteq Tocantins",
  description: "Monte um PC compatível em 5 passos. Compatibilidade validada peça a peça · orçamento no WhatsApp.",
};

export default function MontadorPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-starteq-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <header className="mb-10">
            <div className="text-starteq-gold text-xs font-display font-semibold tracking-[0.3em] uppercase mb-2">
              ⚙️ Monte seu PC
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-starteq-bone">
              Configurador de PC <span className="text-gold-grad">Starteq</span>
            </h1>
            <p className="text-starteq-muted mt-3 max-w-2xl">
              Escolha os componentes na ordem. A cada passo, só mostramos o que é compatível com o que você já escolheu.
              No final, leve o orçamento direto pro WhatsApp ou retire na loja em Palmas.
            </p>
          </header>
          <MontadorClient />
        </div>
      </main>
      <Footer />
    </>
  );
}
