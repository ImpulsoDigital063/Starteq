type LogoProps = {
  size?: number;
  className?: string;
};

export function Logo({ size = 36, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Starteq logo"
      >
        {/* Phoenix-style mark in gold */}
        <path
          d="M32 4 L42 18 L56 14 L48 28 L60 32 L46 36 L52 50 L38 46 L32 60 L26 46 L12 50 L18 36 L4 32 L16 28 L8 14 L22 18 Z"
          fill="#F5C518"
          stroke="#F5C518"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="32" cy="32" r="6" fill="#0A0A0A" />
      </svg>
      <div className="leading-none">
        <div className="text-starteq-bone font-display font-bold text-xl tracking-wide">
          STARTEQ
        </div>
        <div className="text-starteq-gold font-display text-[10px] tracking-[0.3em] mt-0.5">
          TOCANTINS
        </div>
      </div>
    </div>
  );
}
