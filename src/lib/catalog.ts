// Catálogo mock · 35 SKUs cobrindo 8 categorias do montador
// Refinado pós-CIC 3 Pichau · com igpu/cooler_included nas CPUs · supports_socket nos coolers

export type Category =
  | "cpu"
  | "cooler"
  | "mobo"
  | "ram"
  | "gpu"
  | "ssd"
  | "gabinete"
  | "fonte"
  | "perifericos"
  | "computadores";

export type Product = {
  sku: string;
  slug: string;
  name: string;
  category: Category;
  brand: string;
  price: number;
  pix_price: number;
  stock: number;
  image: string;
  specs: Record<string, string | number | boolean | string[]>;
  highlight?: boolean;
};

export const PRODUCTS: Product[] = [
  // === CPU · 6 (atualizadas com igpu + cooler_included) ===
  { sku: "CPU-AMD-5600", slug: "amd-ryzen-5-5600", name: "AMD Ryzen 5 5600", category: "cpu", brand: "AMD", price: 749.90, pix_price: 690.00, stock: 8, image: "/products/cpu.svg", specs: { socket: "AM4", tdp: 65, cores: 6, threads: 12, gen: "Zen 3", igpu: false, cooler_included: true } },
  { sku: "CPU-AMD-7600", slug: "amd-ryzen-5-7600", name: "AMD Ryzen 5 7600", category: "cpu", brand: "AMD", price: 1390.00, pix_price: 1290.00, stock: 5, image: "/products/cpu.svg", specs: { socket: "AM5", tdp: 65, cores: 6, threads: 12, gen: "Zen 4", igpu: true, cooler_included: true } },
  { sku: "CPU-AMD-5700X", slug: "amd-ryzen-7-5700x", name: "AMD Ryzen 7 5700X", category: "cpu", brand: "AMD", price: 1249.00, pix_price: 1150.00, stock: 4, image: "/products/cpu.svg", specs: { socket: "AM4", tdp: 65, cores: 8, threads: 16, gen: "Zen 3", igpu: false, cooler_included: false } },
  { sku: "CPU-AMD-7700", slug: "amd-ryzen-7-7700", name: "AMD Ryzen 7 7700", category: "cpu", brand: "AMD", price: 2390.00, pix_price: 2190.00, stock: 3, image: "/products/cpu.svg", specs: { socket: "AM5", tdp: 65, cores: 8, threads: 16, gen: "Zen 4", igpu: true, cooler_included: true }, highlight: true },
  { sku: "CPU-INT-12400F", slug: "intel-i5-12400f", name: "Intel Core i5-12400F", category: "cpu", brand: "Intel", price: 990.00, pix_price: 890.00, stock: 6, image: "/products/cpu.svg", specs: { socket: "LGA1700", tdp: 65, cores: 6, threads: 12, gen: "12ª", igpu: false, cooler_included: true } },
  { sku: "CPU-INT-14400F", slug: "intel-i5-14400f", name: "Intel Core i5-14400F", category: "cpu", brand: "Intel", price: 1290.00, pix_price: 1190.00, stock: 4, image: "/products/cpu.svg", specs: { socket: "LGA1700", tdp: 65, cores: 10, threads: 16, gen: "14ª", igpu: false, cooler_included: true } },

  // === Cooler · 4 (NOVO) ===
  { sku: "COOL-DR-H410R", slug: "deepcool-ak400", name: "DeepCool AK400 Tower", category: "cooler", brand: "DeepCool", price: 199.00, pix_price: 179.00, stock: 8, image: "/products/cooler.svg", specs: { type: "Air", supports_socket: ["AM4", "AM5", "LGA1700"], max_tdp: 220, height_mm: 155 } },
  { sku: "COOL-TR-PA120", slug: "thermalright-peerless-assassin-120", name: "Thermalright Peerless Assassin 120 SE", category: "cooler", brand: "Thermalright", price: 299.00, pix_price: 269.00, stock: 5, image: "/products/cooler.svg", specs: { type: "Air Dual Tower", supports_socket: ["AM4", "AM5", "LGA1700"], max_tdp: 245, height_mm: 158 }, highlight: true },
  { sku: "COOL-CR-H100", slug: "corsair-h100x-rgb", name: "Corsair iCUE H100x RGB 240mm AIO", category: "cooler", brand: "Corsair", price: 749.00, pix_price: 690.00, stock: 3, image: "/products/cooler.svg", specs: { type: "AIO 240mm", supports_socket: ["AM4", "AM5", "LGA1700"], max_tdp: 280, radiator_mm: 240 } },
  { sku: "COOL-CR-H150", slug: "corsair-h150-icue", name: "Corsair iCUE H150 ELITE 360mm AIO", category: "cooler", brand: "Corsair", price: 1190.00, pix_price: 1090.00, stock: 2, image: "/products/cooler.svg", specs: { type: "AIO 360mm", supports_socket: ["AM4", "AM5", "LGA1700"], max_tdp: 320, radiator_mm: 360 } },

  // === Mobo · 6 ===
  { sku: "MB-ASR-A520M", slug: "asrock-a520m-hvs", name: "ASRock A520M HVS", category: "mobo", brand: "ASRock", price: 489.90, pix_price: 449.00, stock: 5, image: "/products/mobo.svg", specs: { socket: "AM4", ram_type: "DDR4", form: "mATX", ram_slots: 2, sata_ports: 4 } },
  { sku: "MB-ASUS-B550M", slug: "asus-prime-b550m-k", name: "ASUS Prime B550M-K", category: "mobo", brand: "ASUS", price: 749.00, pix_price: 690.00, stock: 4, image: "/products/mobo.svg", specs: { socket: "AM4", ram_type: "DDR4", form: "mATX", ram_slots: 4, sata_ports: 4 } },
  { sku: "MB-ASR-B650M", slug: "asrock-b650m-hdv", name: "ASRock B650M-HDV/M.2", category: "mobo", brand: "ASRock", price: 1390.00, pix_price: 1290.00, stock: 3, image: "/products/mobo.svg", specs: { socket: "AM5", ram_type: "DDR5", form: "mATX", ram_slots: 4, sata_ports: 4 } },
  { sku: "MB-ASR-H610M", slug: "asrock-h610m-hdv", name: "ASRock H610M-HDV/M.2", category: "mobo", brand: "ASRock", price: 599.00, pix_price: 549.00, stock: 6, image: "/products/mobo.svg", specs: { socket: "LGA1700", ram_type: "DDR4", form: "mATX", ram_slots: 2, sata_ports: 4 } },
  { sku: "MB-ASUS-B760M", slug: "asus-prime-b760m-a", name: "ASUS Prime B760M-A", category: "mobo", brand: "ASUS", price: 1090.00, pix_price: 990.00, stock: 3, image: "/products/mobo.svg", specs: { socket: "LGA1700", ram_type: "DDR5", form: "mATX", ram_slots: 4, sata_ports: 6 } },
  { sku: "MB-GB-B650M-AE", slug: "gigabyte-b650m-aorus-elite", name: "Gigabyte B650M Aorus Elite", category: "mobo", brand: "Gigabyte", price: 1590.00, pix_price: 1490.00, stock: 2, image: "/products/mobo.svg", specs: { socket: "AM5", ram_type: "DDR5", form: "mATX", ram_slots: 4, sata_ports: 6 } },

  // === RAM · 4 ===
  { sku: "RAM-KS-16-3200", slug: "kingston-fury-beast-16gb-ddr4-3200", name: "Kingston Fury Beast 16GB DDR4 3200MHz", category: "ram", brand: "Kingston", price: 319.00, pix_price: 290.00, stock: 10, image: "/products/ram.svg", specs: { ram_type: "DDR4", capacity_gb: 16, freq_mhz: 3200, slots_used: 1 } },
  { sku: "RAM-CR-16-3600", slug: "corsair-vengeance-16gb-ddr4-3600", name: "Corsair Vengeance 16GB DDR4 3600MHz", category: "ram", brand: "Corsair", price: 389.00, pix_price: 350.00, stock: 7, image: "/products/ram.svg", specs: { ram_type: "DDR4", capacity_gb: 16, freq_mhz: 3600, slots_used: 1 } },
  { sku: "RAM-KS-16-5200", slug: "kingston-fury-beast-16gb-ddr5-5200", name: "Kingston Fury Beast 16GB DDR5 5200MHz", category: "ram", brand: "Kingston", price: 429.00, pix_price: 390.00, stock: 5, image: "/products/ram.svg", specs: { ram_type: "DDR5", capacity_gb: 16, freq_mhz: 5200, slots_used: 1 } },
  { sku: "RAM-CR-32-6000", slug: "corsair-vengeance-32gb-ddr5-6000", name: "Corsair Vengeance 32GB DDR5 6000MHz", category: "ram", brand: "Corsair", price: 990.00, pix_price: 890.00, stock: 4, image: "/products/ram.svg", specs: { ram_type: "DDR5", capacity_gb: 32, freq_mhz: 6000, slots_used: 2 }, highlight: true },

  // === GPU · 5 ===
  { sku: "GPU-GLX-4060", slug: "galax-rtx-4060", name: "GALAX GeForce RTX 4060 1-Click OC", category: "gpu", brand: "GALAX", price: 2490.00, pix_price: 2290.00, stock: 3, image: "/products/gpu.svg", specs: { tdp: 115, vram_gb: 8, chip: "RTX 4060", length_mm: 240 } },
  { sku: "GPU-ASUS-4060TI", slug: "asus-dual-rtx-4060-ti", name: "ASUS Dual RTX 4060 Ti 8GB", category: "gpu", brand: "ASUS", price: 3490.00, pix_price: 3190.00, stock: 2, image: "/products/gpu.svg", specs: { tdp: 165, vram_gb: 8, chip: "RTX 4060 Ti", length_mm: 280 } },
  { sku: "GPU-MSI-4070S", slug: "msi-rtx-4070-super-ventus", name: "MSI RTX 4070 Super Ventus 12GB", category: "gpu", brand: "MSI", price: 4990.00, pix_price: 4690.00, stock: 2, image: "/products/gpu.svg", specs: { tdp: 220, vram_gb: 12, chip: "RTX 4070 Super", length_mm: 300 }, highlight: true },
  { sku: "GPU-GLX-5060TI", slug: "galax-rtx-5060-ti", name: "GALAX GeForce RTX 5060 Ti 16GB", category: "gpu", brand: "GALAX", price: 4190.00, pix_price: 3890.00, stock: 2, image: "/products/gpu.svg", specs: { tdp: 180, vram_gb: 16, chip: "RTX 5060 Ti", length_mm: 260 } },
  { sku: "GPU-PLT-5070", slug: "palit-gamerock-rtx-5070", name: "Palit GameRock RTX 5070 12GB", category: "gpu", brand: "Palit", price: 6290.00, pix_price: 5890.00, stock: 1, image: "/products/gpu.svg", specs: { tdp: 250, vram_gb: 12, chip: "RTX 5070", length_mm: 310 } },

  // === SSD · 4 (NOVO) ===
  { sku: "SSD-KS-NV2-500", slug: "kingston-nv2-500gb", name: "Kingston NV2 500GB NVMe PCIe 4.0", category: "ssd", brand: "Kingston", price: 269.00, pix_price: 249.00, stock: 12, image: "/products/ssd.svg", specs: { capacity_gb: 500, interface: "NVMe PCIe 4.0", read_mb: 3500 } },
  { sku: "SSD-KS-NV2-1TB", slug: "kingston-nv2-1tb", name: "Kingston NV2 1TB NVMe PCIe 4.0", category: "ssd", brand: "Kingston", price: 449.00, pix_price: 419.00, stock: 8, image: "/products/ssd.svg", specs: { capacity_gb: 1000, interface: "NVMe PCIe 4.0", read_mb: 3500 }, highlight: true },
  { sku: "SSD-CR-MX500-1TB", slug: "crucial-mx500-1tb", name: "Crucial MX500 1TB SATA III", category: "ssd", brand: "Crucial", price: 519.00, pix_price: 479.00, stock: 5, image: "/products/ssd.svg", specs: { capacity_gb: 1000, interface: "SATA III", read_mb: 560 } },
  { sku: "SSD-WD-SN770-2TB", slug: "wd-black-sn770-2tb", name: "WD Black SN770 2TB NVMe PCIe 4.0", category: "ssd", brand: "WD", price: 899.00, pix_price: 829.00, stock: 3, image: "/products/ssd.svg", specs: { capacity_gb: 2000, interface: "NVMe PCIe 4.0", read_mb: 5150 } },

  // === Gabinete · 4 (NOVO) ===
  { sku: "GAB-BLC-064", slug: "bluecase-bg-064-pure-pro", name: "Bluecase BG-064 Pure Pro · Micro-ATX", category: "gabinete", brand: "Bluecase", price: 379.00, pix_price: 349.00, stock: 6, image: "/products/case.svg", specs: { form: "mATX", supports_mobo: ["mATX", "ITX"], max_gpu_mm: 320, max_cooler_mm: 160 } },
  { sku: "GAB-RIS-Z3", slug: "rise-mode-z3-glass", name: "Rise Mode Z3 Glass · ATX RGB", category: "gabinete", brand: "Rise Mode", price: 459.00, pix_price: 419.00, stock: 5, image: "/products/case.svg", specs: { form: "ATX", supports_mobo: ["ATX", "mATX", "ITX"], max_gpu_mm: 340, max_cooler_mm: 165 } },
  { sku: "GAB-CR-4000D", slug: "corsair-4000d-airflow", name: "Corsair 4000D Airflow · Mid Tower", category: "gabinete", brand: "Corsair", price: 749.00, pix_price: 690.00, stock: 3, image: "/products/case.svg", specs: { form: "ATX", supports_mobo: ["ATX", "mATX", "ITX"], max_gpu_mm: 360, max_cooler_mm: 170 }, highlight: true },
  { sku: "GAB-LIA-A4H2O", slug: "lian-li-a4-h2o", name: "Lian Li A4-H2O · Mini-ITX Premium", category: "gabinete", brand: "Lian Li", price: 1290.00, pix_price: 1190.00, stock: 2, image: "/products/case.svg", specs: { form: "ITX", supports_mobo: ["ITX"], max_gpu_mm: 322, max_cooler_mm: 53 } },

  // === Fonte · 4 ===
  { sku: "PSU-CR-CV550", slug: "corsair-cv550", name: "Corsair CV550 550W 80+ White", category: "fonte", brand: "Corsair", price: 319.00, pix_price: 290.00, stock: 6, image: "/products/psu.svg", specs: { watts: 550, certification: "80+ White", modular: false } },
  { sku: "PSU-CR-CV650", slug: "corsair-cv650", name: "Corsair CV650 650W 80+ Bronze", category: "fonte", brand: "Corsair", price: 429.00, pix_price: 390.00, stock: 5, image: "/products/psu.svg", specs: { watts: 650, certification: "80+ Bronze", modular: false } },
  { sku: "PSU-CR-RM750", slug: "corsair-rm750e", name: "Corsair RM750e 750W 80+ Gold", category: "fonte", brand: "Corsair", price: 849.00, pix_price: 790.00, stock: 4, image: "/products/psu.svg", specs: { watts: 750, certification: "80+ Gold", modular: true } },
  { sku: "PSU-CR-RM850X", slug: "corsair-rm850x", name: "Corsair RM850x 850W 80+ Gold", category: "fonte", brand: "Corsair", price: 1190.00, pix_price: 1090.00, stock: 3, image: "/products/psu.svg", specs: { watts: 850, certification: "80+ Gold", modular: true } },
];

export const PRODUCTS_BY_SKU = Object.fromEntries(PRODUCTS.map((p) => [p.sku, p]));

export function productsByCategory(c: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === c && p.stock > 0);
}

export function findProduct(sku: string): Product | undefined {
  return PRODUCTS_BY_SKU[sku];
}
