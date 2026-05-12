// Mapeamento determinístico SKU/categoria → foto real em /public/products/photos/
// Fotos Unsplash baixadas localmente · CDN próprio · sem hotlink que pode quebrar

import type { Category, Product } from "./catalog";

const BASE = "/products/photos";

const CATEGORY_DEFAULT: Record<Category, string> = {
  computadores: `${BASE}/pc-rgb.jpg`,
  cpu: `${BASE}/cpu-ryzen.jpg`,
  cooler: `${BASE}/cooler.jpg`,
  mobo: `${BASE}/mobo.jpg`,
  ram: `${BASE}/ram.jpg`,
  gpu: `${BASE}/pc-build.jpg`,
  ssd: `${BASE}/ssd.jpg`,
  gabinete: `${BASE}/gabinete.jpg`,
  fonte: `${BASE}/gabinete.jpg`,
  mouse: `${BASE}/mouse.jpg`,
  teclado: `${BASE}/keyboard-mech.jpg`,
  mousepad: `${BASE}/mousepad.jpg`,
  monitor: `${BASE}/monitor.jpg`,
  headset: `${BASE}/headset.jpg`,
  cadeira: `${BASE}/cadeira.jpg`,
};

const PC_VARIANTS = [
  `${BASE}/pc-rgb.jpg`,
  `${BASE}/pc-build.jpg`,
  `${BASE}/pc-budget.jpg`,
  `${BASE}/pc-pro.jpg`,
];

export function getProductPhoto(product: Pick<Product, "sku" | "slug" | "category" | "brand">): string {
  const slug = product.slug.toLowerCase();
  const sku = product.sku.toLowerCase();
  const brand = product.brand.toLowerCase();

  // Computadores: notebook · variante por tier
  if (product.category === "computadores") {
    if (slug.includes("notebook") || sku.includes("nb-")) return `${BASE}/notebook.jpg`;
    if (slug.includes("pro") || slug.includes("7700") || slug.includes("elite")) return `${BASE}/pc-pro.jpg`;
    if (slug.includes("crisis") || slug.includes("budget") || slug.includes("ryzen-3")) return `${BASE}/pc-budget.jpg`;
    // Determinístico por hash do SKU
    const idx = simpleHash(product.sku) % PC_VARIANTS.length;
    return PC_VARIANTS[idx];
  }

  // CPU: AMD vs Intel
  if (product.category === "cpu") {
    return brand === "intel" ? `${BASE}/cpu-intel.jpg` : `${BASE}/cpu-ryzen.jpg`;
  }

  // Cooler: AIO/líquido usa foto RGB · ar usa cooler
  if (product.category === "cooler") {
    if (slug.includes("aio") || slug.includes("h100") || slug.includes("h150") || slug.includes("icue")) {
      return `${BASE}/pc-rgb.jpg`;
    }
    return `${BASE}/cooler.jpg`;
  }

  // SSD: rotação entre 2 variantes pra dar variação visual
  if (product.category === "ssd") {
    return simpleHash(product.sku) % 2 === 0 ? `${BASE}/ssd.jpg` : `${BASE}/ssd-2.jpg`;
  }

  // Teclado: alternância
  if (product.category === "teclado") {
    return simpleHash(product.sku) % 2 === 0 ? `${BASE}/keyboard-mech.jpg` : `${BASE}/teclado.jpg`;
  }

  return CATEGORY_DEFAULT[product.category];
}

function simpleHash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}
