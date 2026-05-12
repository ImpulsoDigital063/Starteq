"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Icon } from "./Icon";

const LINKS: { href: string; label: string; icon?: Parameters<typeof Icon>[0]["name"] }[] = [
  { href: "/produtos", label: "Todos os produtos", icon: "package" },
  { href: "/montador", label: "Monte seu PC", icon: "wrench" },
  { href: "/produtos/categoria/computadores", label: "PCs prontos", icon: "monitor" },
  { href: "/produtos/categoria/gpu", label: "Placas de vídeo", icon: "gamepad" },
  { href: "/produtos/categoria/cpu", label: "Processadores", icon: "cpu" },
  { href: "/produtos/categoria/mobo", label: "Placas-mãe", icon: "plug" },
  { href: "/produtos/categoria/ram", label: "Memória RAM", icon: "memory" },
  { href: "/produtos/categoria/ssd", label: "SSD", icon: "disc" },
  { href: "/produtos/categoria/cooler", label: "Coolers", icon: "snowflake" },
  { href: "/produtos/categoria/fonte", label: "Fontes", icon: "plug" },
  { href: "/produtos/categoria/gabinete", label: "Gabinetes", icon: "package" },
  { href: "/produtos/categoria/monitor", label: "Monitores", icon: "monitor" },
  { href: "/produtos/categoria/mouse", label: "Mouse gamer", icon: "mouse" },
  { href: "/produtos/categoria/teclado", label: "Teclado gamer", icon: "keyboard" },
  { href: "/produtos/categoria/headset", label: "Headsets", icon: "headphones" },
  { href: "/produtos/categoria/cadeira", label: "Cadeiras", icon: "armchair" },
  { href: "/blog", label: "Blog", icon: "file" },
  { href: "/como-comprar", label: "Como comprar", icon: "info" },
  { href: "/quem-somos", label: "Quem somos", icon: "shield" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="md:hidden p-2 rounded-lg hover:bg-starteq-card transition-colors text-starteq-bone"
        aria-label="Abrir menu"
      >
        <Icon name="menu" size={24} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute top-0 left-0 bottom-0 w-[88%] max-w-sm bg-starteq-black border-r border-starteq-line overflow-y-auto">
            <div className="sticky top-0 bg-starteq-black border-b border-starteq-line flex items-center justify-between px-4 py-3">
              <span className="font-space text-sm font-bold uppercase tracking-wider text-starteq-gold">
                Departamentos
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg hover:bg-starteq-card text-starteq-bone"
                aria-label="Fechar menu"
              >
                <Icon name="x" size={20} />
              </button>
            </div>

            <form action="/produtos" method="get" className="p-4 border-b border-starteq-line">
              <div className="relative">
                <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-starteq-muted" />
                <input
                  type="search"
                  name="q"
                  placeholder="Buscar produto..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-starteq-card border border-starteq-line focus:border-starteq-gold focus:outline-none text-starteq-bone placeholder:text-starteq-muted text-sm"
                />
              </div>
            </form>

            <nav className="py-2">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-starteq-bone hover:bg-starteq-card hover:text-starteq-gold border-b border-starteq-line/40 last:border-0"
                >
                  {l.icon && <Icon name={l.icon} size={18} className="text-starteq-gold flex-shrink-0" />}
                  <span className="flex-1">{l.label}</span>
                  <Icon name="arrow-right" size={14} className="text-starteq-muted" />
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-starteq-line space-y-2">
              <a
                href="https://wa.me/5563992528619"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-starteq-pix text-white font-space font-bold uppercase text-xs tracking-wider px-4 py-3 rounded-lg"
              >
                <Icon name="whatsapp" size={16} />
                Atendimento WhatsApp
              </a>
              <Link
                href="/admin/login"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-starteq-card border border-starteq-line text-starteq-bone font-space font-bold uppercase text-xs tracking-wider px-4 py-3 rounded-lg"
              >
                <Icon name="user" size={16} />
                Painel da equipe
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
