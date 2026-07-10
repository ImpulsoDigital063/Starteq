import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StarField } from "@/components/StarField";
import { Icon, type IconName } from "@/components/Icon";

export const metadata = {
  title: "Fale Conosco · Starteq Tocantins",
  description: "Fale com a Starteq · WhatsApp, email e loja física em Palmas-TO. Atendimento humano, não robô.",
};

const CONTACTS: { icon: IconName; title: string; lines: string[]; href?: string }[] = [
  {
    icon: "whatsapp",
    title: "WhatsApp",
    lines: ["(63) 99298-8916", "Atendimento humano em horário comercial"],
    href: "https://wa.me/5563992988916",
  },
  {
    icon: "mail",
    title: "E-mail",
    lines: ["starteqpalmas@gmail.com"],
    href: "mailto:starteqpalmas@gmail.com",
  },
  {
    icon: "map-pin",
    title: "Loja física",
    lines: ["104 Sul, SE 05, Lt. 19 · Sala 07", "Plano Diretor Sul · Palmas-TO · 77020-018"],
  },
  {
    icon: "instagram",
    title: "Instagram",
    lines: ["@starteq_to"],
    href: "https://instagram.com/starteq_to",
  },
];

export default function FaleConoscoPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-starteq-black">
        <section className="relative overflow-hidden nebula-bg py-20">
          <StarField className="opacity-60" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-3">
              Linha direta
            </div>
            <h1 className="font-space text-4xl lg:text-5xl font-black text-starteq-bone">
              Fale com a <span className="text-space-grad">Starteq</span>
            </h1>
            <p className="text-starteq-muted mt-4 max-w-2xl mx-auto">
              Aqui você fala com quem monta. Gente de Palmas, não robô impessoal.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {CONTACTS.map((c) => {
                const inner = (
                  <>
                    <div className="w-12 h-12 rounded-lg bg-starteq-gold/10 border border-starteq-gold/30 flex items-center justify-center text-starteq-gold mb-4">
                      <Icon name={c.icon} size={24} />
                    </div>
                    <div className="font-space font-bold text-lg text-starteq-bone mb-1">{c.title}</div>
                    <div className="text-starteq-muted text-sm leading-snug space-y-0.5">
                      {c.lines.map((l, i) => (
                        <div key={i}>{l}</div>
                      ))}
                    </div>
                  </>
                );
                return c.href ? (
                  <a
                    key={c.title}
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-starteq-card border border-starteq-line hover:border-starteq-gold/40 rounded-xl p-6 transition-colors block"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={c.title} className="bg-starteq-card border border-starteq-line rounded-xl p-6">
                    {inner}
                  </div>
                );
              })}
            </div>

            <div className="mt-10 bg-starteq-card border border-starteq-gold/30 rounded-xl p-8 text-center">
              <h2 className="font-space font-bold text-2xl text-starteq-bone mb-3">Bora resolver agora?</h2>
              <p className="text-starteq-muted mb-6">
                Manda mensagem que a gente responde rápido, em horário comercial.
              </p>
              <a
                href="https://wa.me/5563992988916"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-starteq-pix text-white hover:opacity-90 font-space font-bold tracking-wide uppercase text-sm px-8 py-4 rounded-lg transition-all"
              >
                <Icon name="whatsapp" size={18} /> Chamar no WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
