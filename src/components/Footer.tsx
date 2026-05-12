import Link from "next/link";
import { Logo } from "./Logo";
import { Icon } from "./Icon";

export function Footer() {
  return (
    <footer className="bg-starteq-coal border-t border-starteq-line">
      {/* Top bar · 2 cards de atendimento (Pichau-style) */}
      <div className="bg-starteq-card border-b border-starteq-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid md:grid-cols-2 gap-6">
          <ContactCard
            title="Atendimento Loja Virtual"
            lines={[
              "Segunda a sexta · 8h às 12h e 14h às 18h",
              "Sábado · 9h às 13h",
              "WhatsApp: (63) 99252-8619",
              "Email: starteqpalmas@gmail.com",
            ]}
            cta={{ href: "https://wa.me/5563992528619", label: "Chamar no WhatsApp" }}
          />
          <ContactCard
            title="Loja Física em Palmas-TO"
            lines={[
              "104 Sul · SE 05 · Lt. 19 · Sala 07",
              "Plano Diretor Sul · Palmas-TO",
              "CEP 77020-018",
              "Seg a sex · 8h às 18h",
            ]}
            cta={{ href: "https://www.google.com/maps/search/?api=1&query=104+Sul+SE+05+Palmas+TO", label: "Ver no Maps" }}
          />
        </div>
      </div>

      {/* 4 colunas Pichau-style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* COL 1 · LOGO + REDES (span 2 no lg) */}
          <div className="col-span-2 lg:col-span-2">
            <Logo />
            <p className="mt-4 text-starteq-muted text-sm leading-relaxed max-w-sm">
              Hardware gamer e assistência técnica especializada em Palmas-TO.
              Monte seu PC, retire na hora ou receba no mesmo dia.
              6+ anos cuidando do setup dos gamers do Tocantins.
            </p>

            <div className="mt-6">
              <div className="text-starteq-bone font-space font-bold tracking-wide uppercase text-xs mb-3">
                Nos siga
              </div>
              <div className="flex gap-2">
                <SocialIcon
                  href="https://instagram.com/starteq_to"
                  label="Instagram @starteq_to"
                  icon={
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 00-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z" />
                    </svg>
                  }
                />
                <SocialIcon
                  href="https://wa.me/5563992528619"
                  label="WhatsApp"
                  icon={
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  }
                />
                <SocialIcon
                  href="https://www.google.com/maps/search/?api=1&query=Starteq+Palmas+TO"
                  label="Google Maps"
                  icon={
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                    </svg>
                  }
                />
              </div>
            </div>
          </div>

          {/* COL 2 · LOJA */}
          <div>
            <h4 className="text-starteq-bone font-space font-bold tracking-wide uppercase text-xs mb-4">
              Loja
            </h4>
            <ul className="space-y-2 text-sm">
              <FooterLink href="/montador">Monte seu PC</FooterLink>
              <FooterLink href="/produtos">Todos os produtos</FooterLink>
              <FooterLink href="/produtos/categoria/computadores">PCs prontos</FooterLink>
              <FooterLink href="/produtos/categoria/gpu">Placas de vídeo</FooterLink>
              <FooterLink href="/produtos/categoria/cpu">Processadores</FooterLink>
              <FooterLink href="/produtos/categoria/mouse">Mouse</FooterLink>
              <FooterLink href="/produtos/categoria/teclado">Teclado</FooterLink>
              <FooterLink href="/produtos/categoria/monitor">Monitores</FooterLink>
              <FooterLink href="/produtos/categoria/cadeira">Cadeiras</FooterLink>
              <FooterLink href="/blog">Blog tech</FooterLink>
            </ul>
          </div>

          {/* COL 3 · DÚVIDAS */}
          <div>
            <h4 className="text-starteq-bone font-space font-bold tracking-wide uppercase text-xs mb-4">
              Dúvidas
            </h4>
            <ul className="space-y-2 text-sm">
              <FooterLink href="/como-comprar">Como comprar</FooterLink>
              <FooterLink href="/trocas-devolucoes">Trocas e devoluções</FooterLink>
              <FooterLink href="/trocas-devolucoes#garantia">Garantia</FooterLink>
              <FooterLink href="/como-comprar#pagamento">Formas de pagamento</FooterLink>
              <FooterLink href="/como-comprar#frete">Frete e entrega</FooterLink>
              <FooterLink href="/como-comprar#boleto">Sobre boletos</FooterLink>
            </ul>
          </div>

          {/* COL 4 · AJUDA */}
          <div>
            <h4 className="text-starteq-bone font-space font-bold tracking-wide uppercase text-xs mb-4">
              Ajuda
            </h4>
            <ul className="space-y-2 text-sm">
              <FooterLink external href="https://wa.me/5563992528619">SAC · WhatsApp</FooterLink>
              <FooterLink external href="https://wa.me/5563992528619">Fale conosco</FooterLink>
              <FooterLink href="/quem-somos">Quem somos</FooterLink>
              <FooterLink href="/blog">Blog · Tutoriais</FooterLink>
              <FooterLink href="/termos">Termos de uso</FooterLink>
              <FooterLink href="/privacidade">Política de privacidade</FooterLink>
            </ul>
          </div>
        </div>

        {/* FORMAS DE PAGAMENTO · faixa */}
        <div className="mt-12 pt-8 border-t border-starteq-line">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h4 className="text-starteq-bone font-space font-bold tracking-wide uppercase text-xs mb-3">
                Formas de pagamento
              </h4>
              <div className="flex flex-wrap gap-2">
                <PayBadge label="PIX" highlight />
                <PayBadge label="Visa" />
                <PayBadge label="Master" />
                <PayBadge label="Elo" />
                <PayBadge label="Amex" />
                <PayBadge label="Hipercard" />
                <PayBadge label="Boleto" />
              </div>
              <div className="text-xs text-starteq-muted mt-3 inline-flex items-center gap-2 flex-wrap">
                <Icon name="credit-card" size={14} /> Em até <strong className="text-starteq-bone">10x sem juros</strong> no cartão
                · <Icon name="zap" size={14} /> <strong className="text-starteq-pix">15% off</strong> à vista no PIX
              </div>
            </div>

            <div>
              <h4 className="text-starteq-bone font-space font-bold tracking-wide uppercase text-xs mb-3">
                Compra Segura
              </h4>
              <div className="flex flex-wrap gap-2">
                <PayBadge icon="lock" label="SSL" />
                <PayBadge icon="shield" label="Garantia" />
                <PayBadge icon="file" label="NF-e" />
                <PayBadge icon="check" label="CDC 7d" />
              </div>
              <div className="text-xs text-starteq-muted mt-3">
                Conexão criptografada · seus dados protegidos · garantia por peça via NF
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-starteq-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between gap-4 text-xs text-starteq-muted">
          <div>
            © {new Date().getFullYear()} <strong className="text-starteq-bone">Starteq Tocantins</strong>
            · CNPJ XX.XXX.XXX/0001-XX · Todos os direitos reservados
          </div>
          <div className="flex items-center gap-2">
            Site desenvolvido por
            <a
              href="https://impulsodigital063.com"
              target="_blank"
              rel="noreferrer"
              className="text-starteq-gold hover:text-starteq-bone font-space font-bold"
            >
              Impulso Digital
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ContactCard({
  title,
  lines,
  cta,
}: {
  title: string;
  lines: string[];
  cta: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start">
      <div className="w-12 h-12 rounded-lg bg-starteq-gold/10 border border-starteq-gold/30 flex items-center justify-center flex-shrink-0">
        <svg width="22" height="22" fill="none" stroke="#F5C518" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.836 3.342a2 2 0 01-.541 1.857l-1.43 1.43a16 16 0 006.586 6.586l1.43-1.43a2 2 0 011.857-.541l3.342.836A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-space font-bold text-starteq-bone text-base mb-2">{title}</h3>
        <ul className="space-y-0.5 text-xs text-starteq-muted">
          {lines.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <a
          href={cta.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 mt-3 text-xs text-starteq-gold hover:text-starteq-bone font-space font-bold uppercase tracking-wider"
        >
          {cta.label} →
        </a>
      </div>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <li>
        <a href={href} target="_blank" rel="noreferrer" className="text-starteq-muted hover:text-starteq-gold transition-colors">
          {children}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link href={href} className="text-starteq-muted hover:text-starteq-gold transition-colors">
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-lg bg-starteq-card border border-starteq-line hover:border-starteq-gold/40 hover:text-starteq-gold flex items-center justify-center text-starteq-muted transition-all"
    >
      {icon}
    </a>
  );
}

function PayBadge({
  label,
  icon,
  highlight = false,
}: {
  label: string;
  icon?: import("./Icon").IconName;
  highlight?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-space font-bold border ${
        highlight
          ? "bg-starteq-pix/10 border-starteq-pix/40 text-starteq-pix"
          : "bg-starteq-card border-starteq-line text-starteq-text"
      }`}
    >
      {icon && <Icon name={icon} size={14} />}
      {label}
    </span>
  );
}
