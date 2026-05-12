import Link from "next/link";
import { Logo } from "@/components/Logo";

export const metadata = {
  title: "Painel · Starteq Tocantins",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-starteq-black flex">
      <aside className="w-64 bg-starteq-coal border-r border-starteq-line flex flex-col">
        <div className="p-6 border-b border-starteq-line">
          <Link href="/admin">
            <Logo />
          </Link>
          <div className="mt-3 text-xs text-starteq-muted uppercase tracking-wider font-display font-semibold">
            Painel Administrativo
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavItem href="/admin" label="Dashboard" />
          <NavItem href="/admin/produtos" label="Produtos" />
          <NavItem href="/admin/pedidos" label="Pedidos" />
          <NavItem href="/admin/estoque" label="Estoque" />
          <NavItem href="/admin/clientes" label="Clientes" />
          <NavItem href="/admin/api-ia" label="API · IA" />
        </nav>

        <div className="p-4 border-t border-starteq-line">
          <Link href="/" className="text-xs text-starteq-muted hover:text-starteq-gold flex items-center gap-2">
            ← Voltar pra loja
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <div className="p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2.5 rounded-lg text-sm text-starteq-text hover:bg-starteq-card hover:text-starteq-gold transition-colors font-display font-medium"
    >
      {label}
    </Link>
  );
}
