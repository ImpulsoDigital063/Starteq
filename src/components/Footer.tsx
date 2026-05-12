import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-starteq-coal border-t border-starteq-line mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 text-starteq-muted text-sm leading-relaxed max-w-sm">
              Hardware gamer e assistência técnica especializada em Palmas-TO.
              Monte seu PC, retire na hora ou receba no mesmo dia.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://instagram.com/starteq_to"
                target="_blank"
                rel="noreferrer"
                className="text-starteq-muted hover:text-starteq-gold transition-colors text-sm"
              >
                @starteq_to
              </a>
              <span className="text-starteq-line">·</span>
              <a
                href="https://wa.me/5563992528619"
                target="_blank"
                rel="noreferrer"
                className="text-starteq-muted hover:text-starteq-gold transition-colors text-sm"
              >
                (63) 99252-8619
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-starteq-bone font-space font-bold tracking-wide uppercase text-xs mb-4">
              Loja
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/montador" className="text-starteq-muted hover:text-starteq-gold">Monte seu PC</Link></li>
              <li><Link href="/produtos" className="text-starteq-muted hover:text-starteq-gold">Todos os produtos</Link></li>
              <li><Link href="/produtos/categoria/computadores" className="text-starteq-muted hover:text-starteq-gold">PCs prontos</Link></li>
              <li><Link href="/produtos/categoria/perifericos" className="text-starteq-muted hover:text-starteq-gold">Periféricos</Link></li>
              <li><Link href="/blog" className="text-starteq-muted hover:text-starteq-gold">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-starteq-bone font-space font-bold tracking-wide uppercase text-xs mb-4">
              Ajuda
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/como-comprar" className="text-starteq-muted hover:text-starteq-gold">Como comprar</Link></li>
              <li><Link href="/trocas-devolucoes" className="text-starteq-muted hover:text-starteq-gold">Trocas e devoluções</Link></li>
              <li><Link href="/quem-somos" className="text-starteq-muted hover:text-starteq-gold">Quem somos</Link></li>
              <li><a href="https://wa.me/5563992528619" target="_blank" rel="noreferrer" className="text-starteq-muted hover:text-starteq-gold">WhatsApp</a></li>
            </ul>
            <div className="mt-4 pt-3 border-t border-starteq-line text-xs text-starteq-muted">
              <div>104 Sul, SE 05, Lt. 19, Sala 07</div>
              <div>Palmas-TO · 77020-018</div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-starteq-line flex flex-col md:flex-row justify-between gap-4 text-xs text-starteq-muted">
          <div>© {new Date().getFullYear()} Starteq Tocantins · Todos os direitos reservados</div>
          <div className="flex items-center gap-2">
            Site desenvolvido por
            <a
              href="https://impulsodigital063.com"
              target="_blank"
              rel="noreferrer"
              className="text-starteq-gold hover:text-starteq-bone"
            >
              Impulso Digital
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
