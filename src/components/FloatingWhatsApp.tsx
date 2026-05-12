import { Icon } from "./Icon";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/5563992528619?text=Oi%21%20Cheguei%20pelo%20site%20da%20Starteq%2C%20preciso%20de%20uma%20ajuda%20pra%20escolher%20um%20produto."
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed right-5 z-40 group inline-flex items-center gap-2 bg-starteq-pix hover:bg-starteq-pix/90 text-white px-4 py-3 rounded-full shadow-lg shadow-starteq-pix/30 transition-all hover:scale-105 print:hidden"
      style={{ bottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
    >
      <span className="relative">
        <Icon name="whatsapp" size={22} strokeWidth={2.2} />
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-starteq-gold border-2 border-starteq-pix animate-pulse" />
      </span>
      <span className="hidden sm:inline font-space font-bold text-xs uppercase tracking-wider">
        Atendimento agora
      </span>
    </a>
  );
}
