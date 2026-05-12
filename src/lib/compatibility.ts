// Regras de compatibilidade de PC · MVP
// Replica lógica Pichau de "esconder o que não bate" + alertar wattagem

import type { Product } from "./catalog";

export type Build = Partial<Record<Product["category"], Product>>;

export type ValidationIssue = {
  type: "error" | "warn";
  field: Product["category"];
  message: string;
};

/**
 * Filtra produtos compatíveis com o que já foi escolhido.
 * Ex: ao escolher Mobo AM5 · só mostra RAM DDR5
 */
export function filterCompatible(
  candidates: Product[],
  build: Build,
  category: Product["category"]
): Product[] {
  return candidates.filter((p) => {
    // mobo precisa bater socket do cpu
    if (category === "mobo" && build.cpu) {
      return p.specs.socket === build.cpu.specs.socket;
    }
    // cpu (na ordem inversa) precisa bater socket da mobo se já escolhida
    if (category === "cpu" && build.mobo) {
      return p.specs.socket === build.mobo.specs.socket;
    }
    // ram precisa bater tipo (DDR4/DDR5) com mobo
    if (category === "ram" && build.mobo) {
      return p.specs.ram_type === build.mobo.specs.ram_type;
    }
    return true;
  });
}

/**
 * Estima wattagem total da build (TDP CPU + TDP GPU + 100W resto)
 */
export function estimateWattage(build: Build): number {
  const cpuTdp = Number(build.cpu?.specs.tdp ?? 0);
  const gpuTdp = Number(build.gpu?.specs.tdp ?? 0);
  const baseline = 100; // mobo + ram + ssd + fans + headroom
  return cpuTdp + gpuTdp + baseline;
}

/**
 * Wattagem mínima recomendada (estimativa × 1.3 = 30% margem)
 */
export function recommendedWattage(build: Build): number {
  const total = estimateWattage(build);
  return Math.ceil((total * 1.3) / 50) * 50; // arredonda pra cima em múltiplos de 50
}

/**
 * Roda todas as regras e retorna lista de issues
 */
export function validateBuild(build: Build): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // socket CPU vs mobo
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
      message: `Memória ${build.ram.specs.ram_type} não bate com a placa-mãe (${build.mobo.specs.ram_type})`,
    });
  }

  // Fonte vs wattagem total
  if (build.fonte) {
    const required = recommendedWattage(build);
    const fonteWatts = Number(build.fonte.specs.watts ?? 0);
    if (fonteWatts < required) {
      issues.push({
        type: "warn",
        field: "fonte",
        message: `Fonte de ${fonteWatts}W está abaixo do recomendado para essa build (mínimo ~${required}W)`,
      });
    }
  }

  return issues;
}

/**
 * Total da build · usa pix_price se disponível
 */
export function buildTotal(build: Build, useDiscount = true): number {
  return Object.values(build).reduce((sum, p) => {
    if (!p) return sum;
    return sum + (useDiscount ? p.pix_price : p.price);
  }, 0);
}

/**
 * Gera link WhatsApp com resumo da build
 */
export function buildWhatsAppLink(build: Build): string {
  const parts = Object.entries(build)
    .filter(([, p]) => p)
    .map(([cat, p]) => `${categoryLabel(cat as Product["category"])}: ${p!.name} — R$ ${p!.pix_price.toFixed(2)}`)
    .join("\n");
  const total = buildTotal(build);
  const msg = `Oi! Montei esse PC no site da Starteq:\n\n${parts}\n\nTotal: R$ ${total.toFixed(2)} (à vista PIX)`;
  return `https://wa.me/5563992528619?text=${encodeURIComponent(msg)}`;
}

export function categoryLabel(c: Product["category"]): string {
  return {
    cpu: "Processador",
    mobo: "Placa-mãe",
    ram: "Memória RAM",
    gpu: "Placa de vídeo",
    fonte: "Fonte",
    ssd: "SSD",
    gabinete: "Gabinete",
    perifericos: "Periféricos",
    computadores: "Computador",
  }[c];
}
