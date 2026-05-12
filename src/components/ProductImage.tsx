// Imagem do produto com fallback inteligente
// 1. Se tiver image_url externa, usa
// 2. Senão, renderiza SVG estilizado por categoria (sempre profissional)

import type { Category } from "@/lib/catalog";

type ProductImageProps = {
  url?: string;
  category: Category;
  alt: string;
  className?: string;
};

const CATEGORY_GRADIENTS: Record<Category, [string, string]> = {
  cpu: ["#1A1A1A", "#3B82F6"],            // azul · processador
  cooler: ["#1A1A1A", "#06B6D4"],         // ciano · cooler
  mobo: ["#1A1A1A", "#10B981"],           // verde · placa-mãe
  ram: ["#1A1A1A", "#A855F7"],            // roxo · ram
  gpu: ["#1A1A1A", "#10B981"],            // verde · GPU
  ssd: ["#1A1A1A", "#F59E0B"],            // laranja · SSD
  gabinete: ["#1A1A1A", "#6B7280"],       // cinza · gabinete
  fonte: ["#1A1A1A", "#EF4444"],          // vermelho · fonte
  mouse: ["#1A1A1A", "#EC4899"],          // rosa · mouse
  teclado: ["#1A1A1A", "#8B5CF6"],        // violeta · teclado
  mousepad: ["#1A1A1A", "#14B8A6"],       // teal · mousepad
  monitor: ["#1A1A1A", "#0EA5E9"],        // sky · monitor
  headset: ["#1A1A1A", "#F97316"],        // orange · headset
  cadeira: ["#1A1A1A", "#84CC16"],        // lime · cadeira
  computadores: ["#1A1A1A", "#F5C518"],   // dourado Starteq · PC
};

const CATEGORY_ICONS: Record<Category, string> = {
  cpu: "M9 3v2h6V3h2v2h3v2h-3v6h3v2h-3v3h-2v-3H9v3H7v-3H4v-2h3v-6H4V5h3V3h2zm6 4H9v6h6V7z",
  cooler: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zM12 6v2M12 16v2M6 12h2M16 12h2",
  mobo: "M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h4v4H7V7zm6 0h4v2h-4V7zm0 4h4v2h-4v-2zm-6 6h10v2H7v-2z",
  ram: "M3 6h18v3h-1v6h1v3H3v-3h1V9H3V6zm2 2v8h2v-1h2v1h2v-1h2v1h2v-1h2v1h2V8h-1v1h-2V8h-2v1h-2V8h-2v1h-2V8H7v1H5V8z",
  gpu: "M3 6h18v12H3V6zm2 2v8h14V8H5zm2 2h4v4H7v-4zm6 0h4v4h-4v-4z",
  ssd: "M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm0 2v14h14V5H5zm2 2h10v6H7V7zm0 8h4v2H7v-2z",
  gabinete: "M5 2h14a2 2 0 012 2v16a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v16h14V4H5zm2 2h6v2H7V6zm0 4h10v2H7v-2zm0 4h6v2H7v-2z",
  fonte: "M5 6h14v12H5V6zm2 2v8h10V8H7zm4 2h2v4h-2v-4zm-4 6h10v2H7v-2z",
  mouse: "M12 2C8 2 5 5 5 9v6c0 4 3 7 7 7s7-3 7-7V9c0-4-3-7-7-7zm0 2c2.8 0 5 2.2 5 5h-4V5a1 1 0 011-1zm0 16c-2.8 0-5-2.2-5-5V9h10v6c0 2.8-2.2 5-5 5z",
  teclado: "M3 6h18a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V7a1 1 0 011-1zm1 2v8h16V8H4zm2 1h2v2H6V9zm3 0h2v2H9V9zm3 0h2v2h-2V9zm3 0h2v2h-2V9zm-9 3h2v2H6v-2zm3 0h7v2H9v-2zm8 0h1v2h-1v-2z",
  mousepad: "M3 7h18v10H3V7zm2 2v6h14V9H5z",
  monitor: "M3 4h18a1 1 0 011 1v12a1 1 0 01-1 1h-7v2h3v2H7v-2h3v-2H3a1 1 0 01-1-1V5a1 1 0 011-1zm1 2v10h16V6H4z",
  headset: "M12 2C7 2 3 6 3 11v6a3 3 0 003 3h1a2 2 0 002-2v-5a2 2 0 00-2-2H5v-1c0-3.9 3.1-7 7-7s7 3.1 7 7v1h-2a2 2 0 00-2 2v5a2 2 0 002 2h1a3 3 0 003-3v-6c0-5-4-9-9-9z",
  cadeira: "M7 3h10v8h-3v3l4 4-2 2-3-3v4h-2v-4l-3 3-2-2 4-4v-3H7V3zm2 2v4h6V5H9z",
  computadores: "M3 3h18a1 1 0 011 1v12a1 1 0 01-1 1h-8v2h2v2H9v-2h2v-2H3a1 1 0 01-1-1V4a1 1 0 011-1zm1 2v10h16V5H4z",
};

export function ProductImage({ url, category, alt, className = "" }: ProductImageProps) {
  if (url) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  const [bg1, bg2] = CATEGORY_GRADIENTS[category];
  const iconPath = CATEGORY_ICONS[category];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        aria-label={alt}
      >
        <defs>
          <radialGradient id={`grad-${category}`} cx="0.5" cy="0.5" r="0.8">
            <stop offset="0%" stopColor={bg2} stopOpacity="0.25" />
            <stop offset="60%" stopColor={bg1} />
            <stop offset="100%" stopColor="#0A0A0A" />
          </radialGradient>
          <pattern id={`grid-${category}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={bg2} strokeOpacity="0.08" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill={`url(#grad-${category})`} />
        <rect width="400" height="300" fill={`url(#grid-${category})`} />

        {/* Glow halo */}
        <circle cx="200" cy="150" r="80" fill={bg2} opacity="0.15" />
        <circle cx="200" cy="150" r="50" fill={bg2} opacity="0.1" />

        {/* Ícone categoria */}
        <g transform="translate(176, 126) scale(2)">
          <path d={iconPath} fill={bg2} opacity="0.9" />
        </g>

        {/* Sparkles */}
        <circle cx="80" cy="60" r="2" fill="#FAFAFA" opacity="0.6" />
        <circle cx="340" cy="80" r="1.5" fill="#FAFAFA" opacity="0.5" />
        <circle cx="60" cy="240" r="1.5" fill="#FAFAFA" opacity="0.4" />
        <circle cx="350" cy="230" r="2" fill="#FAFAFA" opacity="0.5" />
      </svg>
    </div>
  );
}
