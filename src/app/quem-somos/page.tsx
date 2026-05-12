import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StarField } from "@/components/StarField";
import { AstroPhoenix } from "@/components/AstroPhoenix";

export const metadata = {
  title: "Quem Somos · Starteq Tocantins",
  description: "História da Starteq · loja gamer em Palmas há 6+ anos · da assistência técnica à montagem premium.",
};

export default function QuemSomosPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-starteq-black">
        <section className="relative overflow-hidden nebula-bg py-20">
          <StarField className="opacity-60" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-3">
                  Nossa origem
                </div>
                <h1 className="font-space text-4xl lg:text-5xl font-black text-starteq-bone mb-6">
                  Tripulação <span className="text-space-grad">Starteq</span>
                </h1>
                <p className="text-starteq-muted text-lg leading-relaxed">
                  Há mais de 6 anos em Palmas montando, consertando e ajudando gamer a jogar mais
                  e quebrar a cabeça menos. Começou como assistência técnica de PC e celular ·
                  hoje é referência local em hardware gamer.
                </p>
              </div>
              <div className="hidden lg:flex justify-center">
                <AstroPhoenix size={300} />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <Block title="Por que existimos">
              Porque ninguém devia comprar PC online no escuro, sem saber se a fonte aguenta, se a placa cabe, se a RAM
              roda no clock anunciado. Na Starteq cada peça é checada antes de sair da loja, montada com BIOS atualizada
              e cabos pela parte de trás · acabamento de fábrica.
            </Block>

            <Block title="Quem está por trás">
              Júnior fundou a loja em Palmas-TO depois de anos consertando computador na 104 Sul. Hoje atende
              presencialmente, monta cada PC pessoalmente, responde no WhatsApp e mantém um Instagram (@starteq_to)
              com 9 mil seguidores · onde a comunidade gamer local tira dúvida, posta meme e divide setup.
            </Block>

            <Block title="O que entregamos">
              <ul className="space-y-2 mt-2">
                <li>· Hardware gamer top de linha com NF e garantia por peça</li>
                <li>· Montagem de PC com compatibilidade validada via /montador</li>
                <li>· Assistência técnica especializada (limpeza, troca SSD/HD, upgrade)</li>
                <li>· Entrega same-day em Palmas via motoboy próprio</li>
                <li>· Atendimento humano no WhatsApp · resposta em ~30 minutos</li>
              </ul>
            </Block>

            <Block title="Nossa promessa">
              Comprou na Starteq, levou tranquilidade. Sem lacre na garantia, sem letrinha miúda, sem cobrança escondida.
              Se algo der errado, você tem nome e número pra falar · não um SAC ralo de marca nacional.
            </Block>
          </div>
        </section>

        {/* Stats da operação */}
        <section className="bg-starteq-coal py-16 border-y border-starteq-line">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <Stat number="6+" label="Anos de operação em Palmas" />
              <Stat number="9k" label="Seguidores no Instagram" />
              <Stat number="4.6" label="67 reviews Google · 5 estrelas" />
              <Stat number="Same" label="Day em Palmas" />
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-space text-3xl lg:text-4xl font-black text-starteq-bone mb-4">
              Encontre a base
            </h2>
            <p className="text-starteq-muted mb-2">104 Sul, SE 05, Lt. 19, Sala 07</p>
            <p className="text-starteq-muted mb-2">Plano Diretor Sul · Palmas-TO · CEP 77020-018</p>
            <p className="text-starteq-muted mb-8">Horário comercial · Seg a sáb</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/5563992528619"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-starteq-pix text-white hover:opacity-90 font-space font-bold tracking-wide uppercase text-sm px-8 py-4 rounded-lg transition-all"
              >
                WhatsApp (63) 99252-8619
              </a>
              <a
                href="https://instagram.com/starteq_to"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-starteq-card border border-starteq-line hover:border-starteq-gold/40 text-starteq-bone font-space font-bold tracking-wide uppercase text-sm px-8 py-4 rounded-lg transition-all"
              >
                @starteq_to
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-starteq-card border border-starteq-line rounded-xl p-8">
      <h2 className="font-space font-bold text-2xl text-starteq-bone mb-3">{title}</h2>
      <div className="text-starteq-muted leading-relaxed">{children}</div>
    </div>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="font-space text-4xl font-black text-starteq-gold">{number}</div>
      <div className="text-sm text-starteq-text mt-1">{label}</div>
    </div>
  );
}
