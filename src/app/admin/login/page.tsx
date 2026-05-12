import Link from "next/link";
import { redirect } from "next/navigation";
import { StarField } from "@/components/StarField";
import { Meteors } from "@/components/Meteors";
import { AstroPhoenix } from "@/components/AstroPhoenix";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";
import { getServerSession } from "@/lib/admin-auth";

export const metadata = {
  title: "Login · Painel Starteq",
};

// Form POSTa pra /api/admin/login (route handler tradicional)
// Era Server Action · troquei pra route handler porque Next 16 + Server Action
// tinha issue de cookie não propagar entre navegações

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const session = await getServerSession();
  if (session) redirect("/admin");

  const sp = await searchParams;
  const error = sp.error;

  return (
    <div className="min-h-screen bg-starteq-black relative overflow-hidden nebula-bg flex items-center justify-center px-4 py-12">
      <StarField />
      <Meteors />

      <div className="relative z-10 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <AstroPhoenix size={120} />
        </div>

        <div className="bg-starteq-card border border-starteq-line rounded-2xl p-8 backdrop-blur">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>

          <h1 className="font-space text-2xl font-black text-starteq-bone text-center">
            Painel Starteq
          </h1>
          <p className="text-center text-starteq-muted text-sm mt-2 mb-2">
            Acesso restrito · equipe Starteq
          </p>
          <p className="text-center text-starteq-muted/70 text-xs mb-6">
            Pedidos · OS · estoque · clientes · financeiro
          </p>

          {error && (
            <div className="mb-4 flex items-start gap-2 bg-starteq-red/10 border border-starteq-red/40 rounded-lg p-3 text-sm text-starteq-bone">
              <Icon name="alert" size={16} className="text-starteq-red flex-shrink-0 mt-0.5" />
              <span>Email ou senha incorretos. Tenta de novo.</span>
            </div>
          )}

          <form action="/api/admin/login" method="POST" className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-space font-bold uppercase tracking-wider text-starteq-muted mb-2">
                Email
              </label>
              <div className="relative">
                <Icon name="mail" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-starteq-muted" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="seu@email.com.br"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-starteq-black border border-starteq-line focus:border-starteq-gold focus:outline-none text-starteq-bone text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-space font-bold uppercase tracking-wider text-starteq-muted mb-2">
                Senha
              </label>
              <div className="relative">
                <Icon name="lock" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-starteq-muted" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="sua senha"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-starteq-black border border-starteq-line focus:border-starteq-gold focus:outline-none text-starteq-bone text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-space font-bold tracking-wide uppercase text-sm px-6 py-3.5 rounded-lg transition-all animate-pulse-glow"
            >
              Entrar no painel <Icon name="arrow-right" size={16} strokeWidth={3} />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-starteq-line text-center">
            <p className="text-xs text-starteq-muted">
              Esqueceu a senha? Fala com o Júnior pelo{" "}
              <a href="https://wa.me/5563992528619" target="_blank" rel="noreferrer" className="text-starteq-gold hover:text-starteq-bone">
                WhatsApp
              </a>
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-xs text-starteq-muted hover:text-starteq-gold inline-flex items-center gap-1.5">
            <Icon name="arrow-right" size={12} className="rotate-180" />
            Voltar pra loja
          </Link>
        </div>

        <div className="mt-6 bg-starteq-coal/50 border border-starteq-line rounded-lg p-3 text-xs text-starteq-muted">
          <div className="font-space font-bold text-starteq-gold mb-1.5 text-[10px] uppercase tracking-wider">
            Demo · credenciais teste
          </div>
          <div className="font-mono text-[11px] space-y-0.5">
            <div>junior@starteq.com.br · starteq2026 <span className="text-starteq-muted">(admin)</span></div>
            <div>marcos@starteq.com.br · marcos2026 <span className="text-starteq-muted">(técnico)</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
