import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StarField } from "@/components/StarField";
import { Meteors } from "@/components/Meteors";
import { AstroPhoenix } from "@/components/AstroPhoenix";
import { Icon, type IconName } from "@/components/Icon";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-starteq-black relative overflow-hidden nebula-bg">
        <StarField />
        <Meteors />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
          <div className="inline-flex justify-center mb-8">
            <AstroPhoenix size={220} />
          </div>

          <div className="inline-flex items-center gap-2 text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-3">
            <Icon name="alert" size={14} /> Sinal perdido
          </div>

          <h1 className="font-space text-7xl lg:text-9xl font-black text-space-grad leading-none mb-4">
            404
          </h1>

          <h2 className="font-space text-2xl lg:text-3xl font-bold text-starteq-bone mb-4">
            Essa página tá perdida no espaço.
          </h2>

          <p className="text-starteq-muted text-lg max-w-xl mx-auto mb-10">
            Pode ter sido um link antigo, um endereço errado, ou um buraco negro digital.
            Volta pra base e nós te ajudamos a achar o que tava procurando.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-space font-bold tracking-wide uppercase text-sm px-8 py-4 rounded-lg transition-all animate-pulse-glow"
            >
              Voltar pra base
            </Link>
            <Link
              href="/montador"
              className="inline-flex items-center justify-center gap-2 bg-transparent border border-starteq-line hover:border-starteq-gold/40 text-starteq-bone hover:text-starteq-gold font-space font-bold tracking-wide uppercase text-sm px-8 py-4 rounded-lg transition-all"
            >
              Montar PC
            </Link>
            <a
              href="https://wa.me/5563992528619"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-starteq-pix text-white hover:opacity-90 font-space font-bold tracking-wide uppercase text-sm px-8 py-4 rounded-lg transition-all"
            >
              <Icon name="whatsapp" size={16} /> Falar com a tripulação
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            <QuickLink href="/produtos" icon="package" label="Produtos" />
            <QuickLink href="/produtos/categoria/computadores" icon="monitor" label="PCs prontos" />
            <QuickLink href="/blog" icon="radio" label="Blog" />
            <QuickLink href="/quem-somos" icon="user" label="Quem somos" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function QuickLink({ href, icon, label }: { href: string; icon: IconName; label: string }) {
  return (
    <Link
      href={href}
      className="bg-starteq-card border border-starteq-line hover:border-starteq-gold/40 rounded-lg p-4 text-sm text-starteq-text hover:text-starteq-gold transition-all flex flex-col items-center gap-2"
    >
      <Icon name={icon} size={20} />
      {label}
    </Link>
  );
}
