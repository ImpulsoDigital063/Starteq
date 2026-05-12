// Astronauta realista NASA-style · Phoenix dourada como visor reflection
// SVG inline · zero dependência · responsivo

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
      aria-label="Astronauta Starteq"
    >
      {/* Glow ring atrás */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(245,197,24,0.35) 0%, rgba(245,197,24,0.10) 40%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <svg
        viewBox="0 0 320 320"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        <defs>
          {/* Suit white-gray gradient */}
          <linearGradient id="suit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5F5F5" />
            <stop offset="50%" stopColor="#E5E5E5" />
            <stop offset="100%" stopColor="#9CA3AF" />
          </linearGradient>
          {/* Suit shadow */}
          <linearGradient id="suitShadow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9CA3AF" />
            <stop offset="100%" stopColor="#4B5563" />
          </linearGradient>
          {/* Helmet visor · radial reflection */}
          <radialGradient id="visor" cx="0.35" cy="0.35" r="0.7">
            <stop offset="0%" stopColor="#F5C518" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#FFE066" stopOpacity="0.7" />
            <stop offset="55%" stopColor="#0A0A0A" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
          {/* Gold ring */}
          <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFE066" />
            <stop offset="50%" stopColor="#F5C518" />
            <stop offset="100%" stopColor="#C49A12" />
          </linearGradient>
          {/* Helmet glass curve */}
          <linearGradient id="visorCurve" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FAFAFA" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#FAFAFA" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#FAFAFA" stopOpacity="0.4" />
          </linearGradient>
          {/* Helmet outer shell */}
          <radialGradient id="helmetShell" cx="0.3" cy="0.3" r="0.8">
            <stop offset="0%" stopColor="#FAFAFA" />
            <stop offset="60%" stopColor="#D4D4D8" />
            <stop offset="100%" stopColor="#71717A" />
          </radialGradient>
        </defs>

        {/* Backpack life support · atrás do ombro */}
        <rect x="92" y="180" width="20" height="60" rx="4" fill="url(#suitShadow)" />
        <rect x="208" y="180" width="20" height="60" rx="4" fill="url(#suitShadow)" />

        {/* Torso (chest piece) */}
        <path
          d="M 95 175 L 95 250 Q 95 280 130 285 L 190 285 Q 225 280 225 250 L 225 175 Z"
          fill="url(#suit)"
        />

        {/* Chest control panel · gold accent */}
        <rect x="135" y="200" width="50" height="35" rx="4" fill="#0A0A0A" stroke="url(#gold)" strokeWidth="2" />
        <circle cx="145" cy="212" r="2.5" fill="#10B981">
          {animated && <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />}
        </circle>
        <circle cx="155" cy="212" r="2.5" fill="#F5C518" />
        <circle cx="165" cy="212" r="2.5" fill="#DC2626" />
        <rect x="138" y="220" width="44" height="3" rx="1.5" fill="#F5C518" />
        <rect x="138" y="226" width="32" height="3" rx="1.5" fill="#525252" />

        {/* Starteq logo on chest */}
        <text
          x="160"
          y="265"
          textAnchor="middle"
          fontFamily="var(--font-orbitron), sans-serif"
          fontWeight="900"
          fontSize="14"
          fill="#F5C518"
          letterSpacing="2"
        >
          STARTEQ
        </text>

        {/* Shoulders */}
        <ellipse cx="105" cy="178" rx="18" ry="14" fill="url(#suit)" />
        <ellipse cx="215" cy="178" rx="18" ry="14" fill="url(#suit)" />

        {/* Arms (simplificado · só ombros visíveis) */}
        <path d="M 85 180 Q 70 195 70 215 L 80 240 L 92 215 Z" fill="url(#suit)" />
        <path d="M 235 180 Q 250 195 250 215 L 240 240 L 228 215 Z" fill="url(#suit)" />

        {/* Neck ring (gold) */}
        <ellipse cx="160" cy="170" rx="42" ry="9" fill="url(#gold)" stroke="#C49A12" strokeWidth="1" />
        <ellipse cx="160" cy="167" rx="42" ry="6" fill="#FFE066" opacity="0.7" />

        {/* HELMET shell · branco metalizado */}
        <ellipse cx="160" cy="115" rx="62" ry="65" fill="url(#helmetShell)" />

        {/* Helmet outer ring */}
        <ellipse cx="160" cy="115" rx="62" ry="65" fill="none" stroke="#71717A" strokeWidth="2" />
        <ellipse cx="160" cy="115" rx="58" ry="61" fill="none" stroke="#F5C518" strokeWidth="1.5" opacity="0.6" />

        {/* VISOR (face glass) · dourado refletivo */}
        <ellipse cx="160" cy="112" rx="44" ry="44" fill="url(#visor)" />

        {/* Visor inner edge gold */}
        <ellipse cx="160" cy="112" rx="44" ry="44" fill="none" stroke="url(#gold)" strokeWidth="2.5" />

        {/* Reflection inside visor · planet/space scene */}
        <g opacity="0.5">
          <circle cx="145" cy="100" r="8" fill="#3B82F6" opacity="0.5" />
          <circle cx="175" cy="118" r="4" fill="#A855F7" opacity="0.5" />
          <ellipse cx="145" cy="100" rx="14" ry="3" fill="none" stroke="#3B82F6" strokeWidth="0.5" opacity="0.7" />
        </g>

        {/* Visor highlight (top-left curve) */}
        <ellipse cx="148" cy="95" rx="14" ry="20" fill="url(#visorCurve)" opacity="0.4" />
        <ellipse cx="142" cy="90" rx="6" ry="10" fill="#FAFAFA" opacity="0.5" />

        {/* Phoenix STQ mark dentro do visor */}
        <g transform="translate(160, 125)">
          <path d="M -8 -3 L 0 8 L 8 -3 Z" fill="url(#gold)" opacity="0.9" />
          <text
            x="0" y="0"
            textAnchor="middle"
            fontFamily="var(--font-orbitron), sans-serif"
            fontWeight="900"
            fontSize="9"
            fill="#F5C518"
          >
            STQ
          </text>
        </g>

        {/* Helmet top antenna */}
        <line x1="160" y1="48" x2="160" y2="30" stroke="#71717A" strokeWidth="2" />
        <circle cx="160" cy="28" r="4" fill="#F5C518">
          {animated && <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />}
        </circle>
        <circle cx="160" cy="28" r="2" fill="#FFE066" />

        {/* Side helmet antennas */}
        <rect x="93" y="100" width="6" height="14" rx="1" fill="#71717A" />
        <rect x="221" y="100" width="6" height="14" rx="1" fill="#71717A" />
        <circle cx="96" cy="107" r="2" fill="#10B981" opacity="0.8" />
        <circle cx="224" cy="107" r="2" fill="#DC2626" opacity="0.8" />

        {/* Top hatch detail */}
        <rect x="150" y="50" width="20" height="8" rx="2" fill="url(#suitShadow)" />
        <rect x="153" y="52" width="14" height="4" rx="1" fill="#F5C518" />
      </svg>
    </div>
  );
}
