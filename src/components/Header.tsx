import Link from "next/link";
import { Logo } from "./Logo";

export function Header() {
  return (
    <>
      {/* Top bar · slogan + WhatsApp */}
      <div className="bg-starteq-coal border-b border-starteq-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9 text-xs font-space font-medium tracking-wide">
          <span className="text-starteq-muted hidden sm:inline">
            🛵 Same-day em Palmas · 💳 10x sem juros · ⚡ 15% off no PIX
          </span>
          <span className="text-starteq-muted sm:hidden">⚡ 15% off no PIX</span>
          <a
            href="https://wa.me/5563992528619"
            target="_blank"
            rel="noreferrer"
            className="text-starteq-gold hover:text-starteq-bone transition-colors"
          >
            (63) 99252-8619
          </a>
        </div>
      </div>

      {/* Header principal · logo + search + carrinho */}
      <header className="sticky top-0 z-50 bg-starteq-black/95 backdrop-blur border-b border-starteq-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 h-16">
            <Link href="/" className="hover:opacity-90 transition-opacity flex-shrink-0">
              <Logo />
            </Link>

            {/* Search bar */}
            <form
              action="/produtos"
              method="get"
              className="hidden md:flex flex-1 max-w-2xl relative"
            >
              <input
                type="search"
                name="q"
                placeholder="Buscar processador, GPU, mouse, monitor..."
                className="w-full px-4 py-2.5 pl-11 rounded-lg bg-starteq-card border border-starteq-line focus:border-starteq-gold focus:outline-none text-starteq-bone placeholder:text-starteq-muted font-sans text-sm"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-starteq-muted"
                width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 rounded bg-starteq-gold text-starteq-black font-space font-bold text-xs uppercase tracking-wider hover:bg-starteq-gold-dk transition-colors"
              >
                Buscar
              </button>
            </form>

            <div className="flex items-center gap-2 ml-auto">
              <a
                href="https://wa.me/5563992528619"
                target="_blank"
                rel="noreferrer"
                className="hidden lg:flex items-center gap-2 text-xs font-space font-bold uppercase tracking-wider text-starteq-bone bg-starteq-card hover:bg-starteq-line border border-starteq-line hover:border-starteq-pix/40 px-4 py-2 rounded-lg transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-starteq-pix animate-pulse"></span>
                WhatsApp
              </a>
              <Link
                href="/admin/login"
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-starteq-card transition-colors text-starteq-text"
                aria-label="Entrar"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-xs font-space font-bold uppercase tracking-wider">Entrar</span>
              </Link>
              <Link
                href="/carrinho"
                className="relative p-2 rounded-lg hover:bg-starteq-card transition-colors flex items-center gap-2"
                aria-label="Carrinho"
              >
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-starteq-bone">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Departamentos · faixa abaixo do header */}
          <nav className="hidden md:flex items-center gap-1 h-11 border-t border-starteq-line text-xs font-space font-bold tracking-wider uppercase overflow-x-auto">
            <Link href="/produtos" className="px-3 py-2 text-starteq-bone hover:text-starteq-gold rounded transition-colors flex items-center gap-1.5 whitespace-nowrap">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Departamentos
            </Link>
            <span className="text-starteq-line">|</span>
            <Link href="/montador" className="px-3 py-2 text-starteq-gold hover:text-starteq-bone transition-colors whitespace-nowrap">
              ⚙ Monte Seu PC
            </Link>
            <Link href="/produtos/categoria/computadores" className="px-3 py-2 text-starteq-text hover:text-starteq-gold transition-colors whitespace-nowrap">
              PCs Prontos
            </Link>
            <Link href="/produtos/categoria/gpu" className="px-3 py-2 text-starteq-text hover:text-starteq-gold transition-colors whitespace-nowrap">
              Placas de Vídeo
            </Link>
            <Link href="/produtos/categoria/cpu" className="px-3 py-2 text-starteq-text hover:text-starteq-gold transition-colors whitespace-nowrap">
              Processadores
            </Link>
            <Link href="/produtos/categoria/mouse" className="px-3 py-2 text-starteq-text hover:text-starteq-gold transition-colors whitespace-nowrap">
              Mouse
            </Link>
            <Link href="/produtos/categoria/teclado" className="px-3 py-2 text-starteq-text hover:text-starteq-gold transition-colors whitespace-nowrap">
              Teclado
            </Link>
            <Link href="/produtos/categoria/monitor" className="px-3 py-2 text-starteq-text hover:text-starteq-gold transition-colors whitespace-nowrap">
              Monitores
            </Link>
            <Link href="/produtos/categoria/cadeira" className="px-3 py-2 text-starteq-text hover:text-starteq-gold transition-colors whitespace-nowrap">
              Cadeiras
            </Link>
            <Link href="/blog" className="px-3 py-2 text-starteq-text hover:text-starteq-gold transition-colors whitespace-nowrap">
              Blog
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
