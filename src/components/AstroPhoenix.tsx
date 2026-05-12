// Mascote · Phoenix astronauta · ave dourada com capacete espacial
// SVG inline pra animar via CSS · paleta Starteq

type AstroPhoenixProps = {
  size?: number;
  className?: string;
  animated?: boolean;
};

export function AstroPhoenix({ size = 240, className = "", animated = true }: AstroPhoenixProps) {
  return (
    <div
      className={`relative ${animated ? "animate-float-slow" : ""} ${className}`}
      style={{ width: size, height: size }}
      aria-label="Phoenix astronauta · mascote Starteq"
    >
      {/* Glow ring atrás */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(245,197,24,0.3) 0%, rgba(245,197,24,0.1) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <svg
        viewBox="0 0 240 240"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFE066" />
            <stop offset="50%" stopColor="#F5C518" />
            <stop offset="100%" stopColor="#C49A12" />
          </linearGradient>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A1A1A" />
            <stop offset="100%" stopColor="#0A0A0A" />
          </linearGradient>
          <linearGradient id="helmetGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FAFAFA" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#9A9A9A" stopOpacity="0.7" />
          </linearGradient>
          <radialGradient id="visorGrad" cx="0.5" cy="0.4" r="0.6">
            <stop offset="0%" stopColor="#F5C518" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#0A0A0A" />
            <stop offset="100%" stopColor="#0A0A0A" />
          </radialGradient>
        </defs>

        {/* Asas externas (phoenix) */}
        <path
          d="M40 100 Q20 80 30 60 L50 90 Z M50 130 Q20 150 35 175 L60 140 Z"
          fill="url(#goldGrad)"
          opacity="0.95"
        />
        <path
          d="M200 100 Q220 80 210 60 L190 90 Z M190 130 Q220 150 205 175 L180 140 Z"
          fill="url(#goldGrad)"
          opacity="0.95"
        />

        {/* Corpo / traje espacial */}
        <ellipse cx="120" cy="145" rx="48" ry="55" fill="url(#bodyGrad)" stroke="#F5C518" strokeWidth="2" />

        {/* Detalhe peito · símbolo Starteq */}
        <circle cx="120" cy="155" r="14" fill="#F5C518" />
        <text
          x="120"
          y="160"
          textAnchor="middle"
          fontFamily="var(--font-orbitron), sans-serif"
          fontWeight="900"
          fontSize="11"
          fill="#0A0A0A"
        >
          STQ
        </text>

        {/* Pescoço · anel do capacete */}
        <ellipse cx="120" cy="92" rx="34" ry="6" fill="#F5C518" />

        {/* Capacete */}
        <ellipse cx="120" cy="65" rx="42" ry="44" fill="url(#helmetGrad)" stroke="#F5C518" strokeWidth="2" />

        {/* Visor */}
        <ellipse cx="120" cy="62" rx="32" ry="32" fill="url(#visorGrad)" />

        {/* Bico phoenix dourado dentro do visor */}
        <path d="M115 60 L120 75 L125 60 Z" fill="url(#goldGrad)" />

        {/* Olhos brilhantes dourados */}
        <circle cx="110" cy="55" r="3" fill="#F5C518" />
        <circle cx="130" cy="55" r="3" fill="#F5C518" />
        <circle cx="110" cy="55" r="1" fill="#FFE066" />
        <circle cx="130" cy="55" r="1" fill="#FFE066" />

        {/* Reflexo no visor */}
        <ellipse cx="108" cy="50" rx="6" ry="10" fill="#FAFAFA" opacity="0.25" />

        {/* Antena no topo */}
        <line x1="120" y1="21" x2="120" y2="8" stroke="#F5C518" strokeWidth="2" />
        <circle cx="120" cy="6" r="3" fill="#F5C518">
          {animated && <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />}
        </circle>

        {/* Plumas (chama phoenix) embaixo */}
        <path
          d="M85 195 Q90 215 95 200 M105 200 Q110 220 115 205 M125 205 Q130 225 135 210 M145 200 Q150 220 155 205"
          stroke="url(#goldGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
