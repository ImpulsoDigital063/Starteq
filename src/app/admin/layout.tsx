import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Icon, type IconName } from "@/components/Icon";
import { getServerSession } from "@/lib/admin-auth";

export const metadata = {
  title: "Painel · Starteq Tocantins",
};

// Force dynamic · garante que cada navegação reavalia session
// (Next 16 tinha race condition com middleware Edge · agora valido no layout Node)
export const dynamic = "force-dynamic";

const NAV: { href: string; label: string; icon: IconName }[] = [
  { href: "/admin", label: "Dashboard", icon: "rocket" },
  { href: "/admin/tecnico", label: "Minha área (técnico)", icon: "wrench" },
  { href: "/admin/os", label: "Ordens de Serviço", icon: "wrench" },
  { href: "/admin/pedidos", label: "Pedidos", icon: "shopping-cart" },
  { href: "/admin/nfe", label: "Notas Fiscais", icon: "file" },
  { href: "/admin/produtos", label: "Produtos", icon: "package" },
  { href: "/admin/estoque", label: "Estoque", icon: "memory" },
  { href: "/admin/clientes", label: "Clientes", icon: "user" },
  { href: "/admin/financeiro", label: "Financeiro", icon: "credit-card" },
  { href: "/admin/whatsapp", label: "WhatsApp", icon: "whatsapp" },
  { href: "/admin/relatorios", label: "Relatórios", icon: "trophy" },
  { href: "/admin/api-ia", label: "API · IA", icon: "bot" },
  { href: "/admin/configuracoes", label: "Configurações", icon: "info" },
];

const BOTTOM_NAV: { href: string; label: string; icon: IconName }[] = [
  { href: "/admin", label: "Início", icon: "rocket" },
  { href: "/admin/os", label: "OS", icon: "wrench" },
  { href: "/admin/pedidos", label: "Vendas", icon: "shopping-cart" },
  { href: "/admin/estoque", label: "Estoque", icon: "memory" },
  { href: "/admin/financeiro", label: "$", icon: "credit-card" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  // Proteção feita pelo proxy.ts · este layout apenas renderiza condicional
  // ao status da session (mostra sidebar se logado, sem sidebar se /admin/login)

  return (
    <div className="min-h-screen bg-starteq-black flex flex-col lg:flex-row">
      {session && (
        <>
          {/* SIDEBAR DESKTOP */}
          <aside className="hidden lg:flex w-64 bg-starteq-coal border-r border-starteq-line flex-col flex-shrink-0 fixed top-0 bottom-0">
            <div className="p-6 border-b border-starteq-line">
              <Link href="/admin">
                <Logo />
              </Link>
              <div className="mt-3 text-xs text-starteq-muted uppercase tracking-wider font-space font-bold">
                Painel Administrativo
              </div>
            </div>

            <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-starteq-text hover:bg-starteq-card hover:text-starteq-gold transition-colors font-space font-semibold group"
                >
                  <Icon name={item.icon} size={18} className="text-starteq-muted group-hover:text-starteq-gold flex-shrink-0" />
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="p-3 border-t border-starteq-line space-y-2">
              <div className="px-3 py-2 bg-starteq-card border border-starteq-line rounded-lg">
                <div className="text-[10px] text-starteq-muted uppercase tracking-wider font-space font-bold">Logado como</div>
                <div className="text-sm text-starteq-bone font-display font-semibold truncate">{session.name}</div>
                <div className="text-xs text-starteq-gold capitalize">{session.role}</div>
              </div>
              <Link
                href="/api/admin/logout"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-starteq-muted hover:text-starteq-red hover:bg-starteq-red/5 transition-colors font-space font-bold uppercase tracking-wider"
              >
                <Icon name="x" size={14} /> Sair
              </Link>
              <Link href="/" className="block text-xs text-starteq-muted hover:text-starteq-gold flex items-center gap-1.5 px-3 py-1.5">
                <Icon name="arrow-right" size={12} className="rotate-180" /> Voltar pra loja
              </Link>
            </div>
          </aside>

          {/* HEADER MOBILE */}
          <header className="lg:hidden sticky top-0 z-30 bg-starteq-coal border-b border-starteq-line">
            <div className="flex items-center justify-between p-4">
              <Link href="/admin"><Logo /></Link>
              <div className="flex items-center gap-2">
                <div className="text-xs text-starteq-bone font-display font-semibold">{session.name.split(" ")[0]}</div>
                <Link href="/api/admin/logout" className="text-starteq-muted hover:text-starteq-red p-1">
                  <Icon name="x" size={16} />
                </Link>
              </div>
            </div>
          </header>
        </>
      )}

      <main className={`flex-1 overflow-x-hidden pb-20 lg:pb-0 ${session ? "lg:ml-64" : ""}`}>
        {session ? (
          <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">{children}</div>
        ) : (
          children
        )}
      </main>

      {session && (
        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-starteq-coal border-t border-starteq-line">
          <div className="grid grid-cols-5">
            {BOTTOM_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-1 py-2.5 text-[10px] text-starteq-muted hover:text-starteq-gold font-space font-bold uppercase tracking-wider"
              >
                <Icon name={item.icon} size={20} />
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
