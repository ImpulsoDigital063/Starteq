// Astronauta NASA-style · foto realista gerada via Flux 1.1 Pro (Replicate)
// Substituiu o SVG mascote anterior · 1.1MB JPG otimizado pelo Next/Image

import Image from "next/image";

type AstroPhoenixProps = {
  size?: number;
  className?: string;
  animated?: boolean;
  priority?: boolean;
};

export function AstroPhoenix({
  size = 360,
  className = "",
  animated = true,
  priority = false,
}: AstroPhoenixProps) {
  // Foto original 3:2 (2496×1664) · mantém aspect natural cinematográfico
  const width = size;
  const height = Math.round(size * (2 / 3) * 1.2); // ratio levemente mais alto pra dar volume

  return (
    <div
      className={`relative ${animated ? "animate-float-slow" : ""} ${className}`}
      style={{ width, height }}
      aria-label="Astronauta Starteq"
    >
      {/* Glow gold radial atrás · combina com o arco amarelo natural da foto */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(245,197,24,0.45) 0%, rgba(245,197,24,0.12) 45%, transparent 75%)",
          filter: "blur(50px)",
          transform: "scale(1.25)",
        }}
      />

      <Image
        src="/astronaut.jpg"
        alt="Astronauta Starteq · capacete dourado refletindo o glow Phoenix"
        width={2496}
        height={1664}
        priority={priority}
        sizes={`${width}px`}
        className="relative z-10 w-full h-full object-cover rounded-2xl"
        style={{
          objectPosition: "center 30%",
        }}
      />
    </div>
  );
}
