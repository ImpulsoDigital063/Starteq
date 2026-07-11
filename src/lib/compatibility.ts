// Regras de compatibilidade de PC · refinadas pós-CIC 3 Pichau
// Lógica híbrida: silenciosa pra socket/DDR · explícita pra TDP/cooler/iGPU

import type { Product } from "./catalog";

export type Build = Partial<Record<Product["category"], Product>>;

export type ValidationIssue = {
  type: "error" | "warn" | "info";
  field: Product["category"];
  message: string;
};

/**
 * Os 8 componentes obrigatórios + 1 opcional (periféricos)
 * GPU é condicionalmente obrigatório (depende de iGPU da CPU)
 */
export const REQUIRED_CATEGORIES: Product["category"][] = [
  "cpu",
  "cooler",
  "mobo",
  "ram",
  "gpu",
  "ssd",
  "gabinete",
  "fonte",
];

/**
 * GPU é obrigatória SE a CPU não tem iGPU
 */
export function isGpuRequired(build: Build): boolean {
  return !build.cpu?.specs.igpu;
}

/**
 * Cooler é obrigatório SE a CPU não vem com cooler box
 */
export function isCoolerRequired(build: Build): boolean {
  // Se ainda não escolheu CPU, default é obrigatório
  if (!build.cpu) return true;
  return !build.cpu.specs.cooler_included;
}

/**
 * Filtra produtos compatíveis com o que já foi escolhido (silencioso)
 */
export function filterCompatible(
  candidates: Product[],
  build: Build,
  category: Product["category"]
): Product[] {
  // Leniente: só EXCLUI quando temos dado dos DOIS lados e ele NÃO bate.
  // Se falta o dado de compatibilidade (catálogo real veio incompleto), mostra o produto
  // (a loja valida no WhatsApp) — melhor que travar o montador com "nenhuma opção".
  return candidates.filter((p) => {
    // mobo precisa bater socket do cpu
    if (category === "mobo" && build.cpu?.specs.socket && p.specs.socket) {
      return p.specs.socket === build.cpu.specs.socket;
    }
    // cpu (inverso) precisa bater socket da mobo
    if (category === "cpu" && build.mobo?.specs.socket && p.specs.socket) {
      return p.specs.socket === build.mobo.specs.socket;
    }
    // ram precisa bater tipo com mobo
    if (category === "ram" && build.mobo?.specs.ram_type && p.specs.ram_type) {
      return p.specs.ram_type === build.mobo.specs.ram_type;
    }
    // cooler: só filtra se o cooler DECLARA quais sockets suporta
    if (category === "cooler" && build.cpu?.specs.socket) {
      const supports = p.specs.supports_socket as string[] | undefined;
      if (Array.isArray(supports) && supports.length > 0) {
        return supports.includes(build.cpu.specs.socket as string);
      }
      return true; // sem dado de socket = mostra
    }
    // gabinete: só filtra se o gabinete DECLARA quais form factors aceita
    if (category === "gabinete" && build.mobo?.specs.form) {
      const supports = p.specs.supports_mobo as string[] | undefined;
      if (Array.isArray(supports) && supports.length > 0) {
        return supports.includes(build.mobo.specs.form as string);
      }
      return true; // sem dado de form factor = mostra
    }
    return true;
  });
}

/**
 * Estima wattagem total (TDP CPU + TDP GPU + 100W resto)
 */
export function estimateWattage(build: Build): number {
  const cpuTdp = Number(build.cpu?.specs.tdp ?? 0);
  const gpuTdp = Number(build.gpu?.specs.tdp ?? 0);
  const baseline = 100; // mobo + ram + ssd + fans + headroom
  return cpuTdp + gpuTdp + baseline;
}

/**
 * Wattagem mínima recomendada (estimativa × 1.5 = 50% margem ≈ regra Pichau)
 */
export function recommendedWattage(build: Build): number {
  const total = estimateWattage(build);
  return Math.ceil((total * 1.5) / 50) * 50;
}

/**
 * Verifica se a fonte tem watts suficientes pra build atual
 */
export function isFonteAdequate(fonte: Product, build: Build): boolean {
  const required = recommendedWattage(build);
  const watts = Number(fonte.specs.watts ?? 0);
  return watts >= required;
}

/**
 * Roda todas as regras e retorna lista de issues
 */
export function validateBuild(build: Build): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Cooler obrigatório se CPU não vem com box
  if (isCoolerRequired(build) && !build.cooler) {
    issues.push({
      type: "error",
      field: "cooler",
      message: build.cpu
        ? `Cooler é obrigatório para o ${build.cpu.name} (não acompanha cooler box)`
        : "Cooler é obrigatório",
    });
  }

  // GPU obrigatória se CPU não tem iGPU
  if (isGpuRequired(build) && !build.gpu) {
    issues.push({
      type: "error",
      field: "gpu",
      message: "Placa de vídeo obrigatória (processador sem gráficos integrados)",
    });
  }

  // Socket mobo vs cpu
  if (build.cpu && build.mobo && build.cpu.specs.socket !== build.mobo.specs.socket) {
    issues.push({
      type: "error",
      field: "mobo",
      message: `Placa-mãe ${build.mobo.specs.socket} não suporta CPU ${build.cpu.specs.socket}`,
    });
  }

  // RAM type vs mobo
  if (build.ram && build.mobo && build.ram.specs.ram_type !== build.mobo.specs.ram_type) {
    issues.push({
      type: "error",
      field: "ram",
      message: `Memória ${build.ram.specs.ram_type} não bate com placa-mãe (${build.mobo.specs.ram_type})`,
    });
  }

  // Fonte vs wattagem
  if (build.fonte && build.cpu) {
    const required = recommendedWattage(build);
    const fonteWatts = Number(build.fonte.specs.watts ?? 0);
    if (fonteWatts < required) {
      issues.push({
        type: "warn",
        field: "fonte",
        message: `Fonte ${fonteWatts}W abaixo do recomendado · mínimo ~${required}W para essa build`,
      });
    }
  }

  // GPU vs gabinete (comprimento)
  if (build.gpu && build.gabinete) {
    const gpuLength = Number(build.gpu.specs.length_mm ?? 0);
    const maxLength = Number(build.gabinete.specs.max_gpu_mm ?? 999);
    if (gpuLength > maxLength) {
      issues.push({
        type: "error",
        field: "gabinete",
        message: `GPU ${gpuLength}mm não cabe no gabinete (máx ${maxLength}mm)`,
      });
    }
  }

  return issues;
}

/**
 * Total da build · usa pix_price se disponível
 */
export function buildTotal(
  build: Build,
  useDiscount = true,
  qty: Partial<Record<Product["category"], number>> = {}
): number {
  return Object.entries(build).reduce((sum, [cat, p]) => {
    if (!p) return sum;
    const q = qty[cat as Product["category"]] ?? 1;
    return sum + (useDiscount ? p.pix_price : p.price) * q;
  }, 0);
}

/**
 * Análise estimada de Performance e Custo-Benefício (referência, estilo Pichau).
 * Heurística transparente sobre specs reais (CPU/GPU/RAM) — não é benchmark.
 */
const clamp100 = (n: number) => Math.max(0, Math.min(100, n));

export type BuildAnalysis = {
  performance: number;      // 0-100
  performanceLabel: string;
  costBenefit: number;      // 0-100
  costBenefitLabel: string;
};

export function analyzeBuild(build: Build, qty: Partial<Record<Product["category"], number>> = {}): BuildAnalysis {
  const cores = Number(build.cpu?.specs.cores ?? 0);
  const clock = Number(build.cpu?.specs.clock_ghz ?? build.cpu?.specs.turbo_ghz ?? 3);
  const cpuPart = clamp100(cores * 8 + clock * 8);

  // GPU dedicada pesa; só iGPU tem baseline baixo
  const gpuPart = build.gpu ? clamp100(Number(build.gpu.specs.vram_gb ?? 4) * 7 + 30) : 15;

  const ramGb = Number(build.ram?.specs.capacity_gb ?? 0) * (qty.ram ?? 1);
  const ramPart = clamp100(ramGb * 3);

  const performance = Math.round(cpuPart * 0.45 + gpuPart * 0.45 + ramPart * 0.1);

  const total = buildTotal(build, true, qty);
  const cbRaw = total > 0 ? (performance / total) * 1000 : 0; // pontos de performance por mil reais
  const costBenefit = Math.round(clamp100((cbRaw / 28) * 100));

  return {
    performance,
    performanceLabel: performance < 25 ? "Básico" : performance < 50 ? "Intermediário" : performance < 75 ? "Avançado" : "Extremo",
    costBenefit,
    costBenefitLabel: costBenefit < 30 ? "Baixo" : costBenefit < 55 ? "Razoável" : costBenefit < 78 ? "Bom" : "Ótimo",
  };
}

/**
 * Status do build pra UI: X de N obrigatórios + percentual
 */
export function buildStatus(build: Build): {
  filled: number;
  required: number;
  pending: Product["category"][];
  percent: number;
} {
  const requiredCats = REQUIRED_CATEGORIES.filter((c) => {
    if (c === "gpu" && !isGpuRequired(build)) return false;
    if (c === "cooler" && !isCoolerRequired(build)) return false;
    return true;
  });
  const filled = requiredCats.filter((c) => build[c]).length;
  const pending = requiredCats.filter((c) => !build[c]);
  return {
    filled,
    required: requiredCats.length,
    pending,
    percent: Math.round((filled / requiredCats.length) * 100),
  };
}

/**
 * Link WhatsApp com resumo da build
 */
export function buildWhatsAppLink(
  build: Build,
  qty: Partial<Record<Product["category"], number>> = {}
): string {
  const parts = Object.entries(build)
    .filter(([, p]) => p)
    .map(([cat, p]) => {
      const q = qty[cat as Product["category"]] ?? 1;
      const prefix = q > 1 ? `${q}x ` : "";
      return `${prefix}${categoryLabel(cat as Product["category"])}: ${p!.name} — R$ ${(p!.pix_price * q).toFixed(2)}`;
    })
    .join("\n");
  const total = buildTotal(build, true, qty);
  const msg = `Oi! Montei esse PC no site da Starteq:\n\n${parts}\n\nTotal: R$ ${total.toFixed(2)} (à vista PIX)`;
  return `https://wa.me/5563992988916?text=${encodeURIComponent(msg)}`;
}

export function categoryLabel(c: Product["category"]): string {
  return {
    cpu: "Processador",
    cooler: "Cooler",
    mobo: "Placa-mãe",
    ram: "Memória RAM",
    gpu: "Placa de vídeo",
    ssd: "Armazenamento",
    gabinete: "Gabinete",
    fonte: "Fonte",
    mouse: "Mouse",
    teclado: "Teclado",
    mousepad: "Mousepad",
    monitor: "Monitor",
    headset: "Headset",
    cadeira: "Cadeira",
    computadores: "Computador",
  }[c];
}
