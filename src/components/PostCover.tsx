// Capa editorial premium do blog · gera uma arte coesa por categoria
// (glow temático + grid técnico + ícone grande deslocado + selo mono),
// no lugar do ícone solto centralizado que parecia "faltando foto".
import { Icon, type IconName } from "@/components/Icon";
import type { Post } from "@/lib/posts";

const CAT_ACCENT: Record<Post["category"], string> = {
  Build: "#F5C518",     // dourado
  Hardware: "#3B82F6",  // azul
  Setup: "#A855F7",     // roxo
  Tutorial: "#10B981",  // verde
  Mercado: "#F59E0B",   // laranja
};

type Props = {
  category: Post["category"];
  icon: IconName;
  className?: string;
  iconSize?: number;
  showLabel?: boolean;
};

export function PostCover({ category, icon, className = "", iconSize = 128, showLabel = true }: Props) {
  const accent = CAT_ACCENT[category];
  return (
    <div className={`relative overflow-hidden bg-starteq-coal ${className}`}>
      {/* glow temático da categoria */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at 82% -10%, ${accent}2e, transparent 58%), radial-gradient(90% 90% at 6% 110%, ${accent}1a, transparent 60%)`,
        }}
      />
      {/* grid técnico mascarado */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `linear-gradient(${accent}20 1px, transparent 1px), linear-gradient(90deg, ${accent}20 1px, transparent 1px)`,
          backgroundSize: "34px 34px",
          WebkitMaskImage: "radial-gradient(circle at 72% 28%, #000, transparent 82%)",
          maskImage: "radial-gradient(circle at 72% 28%, #000, transparent 82%)",
        }}
      />
      {/* ícone grande deslocado (decorativo) */}
      <div className="absolute -right-6 -bottom-8 opacity-90" style={{ color: accent }}>
        <Icon name={icon} size={iconSize} strokeWidth={1.15} />
      </div>
      {/* marcadores de canto + selo da categoria */}
      {showLabel && (
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.18em] px-2 py-1 rounded border"
            style={{ color: accent, borderColor: `${accent}55`, background: `${accent}12` }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
            {category}
          </span>
        </div>
      )}
      {/* brilho de vidro no topo */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]" />
    </div>
  );
}
