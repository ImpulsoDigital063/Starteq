import Link from "next/link";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-starteq-black/95 backdrop-blur border-b border-starteq-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-display text-sm font-semibold tracking-wide uppercase">
            <Link href="/montador" className="text-starteq-gold hover:text-starteq-bone transition-colors">
              Monte Seu PC
            </Link>
            <Link href="/produtos" className="text-starteq-text hover:text-starteq-gold transition-colors">
              Produtos
            </Link>
            <Link href="/produtos/categoria/computadores" className="text-starteq-text hover:text-starteq-gold transition-colors">
              PCs Prontos
            </Link>
            <Link href="/produtos/categoria/perifericos" className="text-starteq-text hover:text-starteq-gold transition-colors">
              Periféricos
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/5563992528619"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 text-xs font-display font-semibold uppercase tracking-wider text-starteq-bone bg-starteq-card hover:bg-starteq-line border border-starteq-line hover:border-starteq-gold/40 px-4 py-2 rounded-lg transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-starteq-green animate-pulse"></span>
              WhatsApp
            </a>
            <Link
              href="/carrinho"
              className="relative p-2 rounded-lg hover:bg-starteq-card transition-colors"
              aria-label="Carrinho"
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-starteq-bone">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
