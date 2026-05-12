// Catálogo Starteq · 70+ SKUs cobrindo TODO o catálogo real do site atual
// Marcas reais identificadas no CIC 2 starteqpalmas.com: Rise Mode · Bluecase · Attack Shark
// Redragon · Mancer · Gigabyte · Acer · Clanm · Pichau · Galax · MSI · Corsair · Kingston · etc

export type Category =
  | "cpu"
  | "cooler"
  | "mobo"
  | "ram"
  | "gpu"
  | "ssd"
  | "gabinete"
  | "fonte"
  | "mouse"
  | "teclado"
  | "mousepad"
  | "monitor"
  | "headset"
  | "cadeira"
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
  badge?: "Lançamento" | "Mais Vendido" | "Promo" | "OpenBox" | "Pichau Style";
};

export const PRODUCTS: Product[] = [
  // === PCs PRONTOS · 5 ===
  { sku: "PC-CRISIS-RYZEN3", slug: "pc-gamer-crisis-ryzen-3-vega-8", name: "PC Gamer CRISIS Ryzen 3 2200G + Vega 8 + 8GB DDR4 + SSD 256", category: "computadores", brand: "Starteq", price: 2390.00, pix_price: 2150.00, stock: 3, image: "/products/pc.svg", specs: { tier: "Entrada", uso: "Estudo + jogos leves" }, highlight: true, badge: "Mais Vendido" },
  { sku: "PC-CRISIS-i5", slug: "pc-gamer-crisis-i5-rx580", name: "PC Gamer CRISIS i5 2400 + RX 580 8GB + 16GB DDR3 + SSD 480 + Monitor 20\" + Kit", category: "computadores", brand: "Starteq", price: 2639.90, pix_price: 2390.00, stock: 2, image: "/products/pc.svg", specs: { tier: "Custo-benefício", uso: "1080p competitivo" }, highlight: true },
  { sku: "PC-ELITE-7600", slug: "pc-gamer-elite-ryzen-7600", name: "PC Gamer Elite Ryzen 5 7600 + RTX 4060 + 16GB DDR5 + SSD 500GB NVMe", category: "computadores", brand: "Starteq", price: 5290.00, pix_price: 4790.00, stock: 2, image: "/products/pc.svg", specs: { tier: "Médio", uso: "1080p Ultra · 1440p High" }, highlight: true, badge: "Lançamento" },
  { sku: "PC-PRO-7700", slug: "pc-gamer-pro-ryzen-7700", name: "PC Gamer Pro Ryzen 7 7700 + RTX 4070 Super + 32GB DDR5 + SSD 1TB NVMe", category: "computadores", brand: "Starteq", price: 7990.00, pix_price: 7190.00, stock: 1, image: "/products/pc.svg", specs: { tier: "Alto", uso: "1440p Ultra · streaming" } },
  { sku: "NB-ACER-NITRO", slug: "notebook-acer-nitro-v15-rtx-3050", name: "Notebook Gamer Acer Nitro V15 i5-13420H · 8GB · RTX 3050 · SSD 512GB · 144Hz", category: "computadores", brand: "Acer", price: 6997.54, pix_price: 6290.00, stock: 1, image: "/products/laptop.svg", specs: { tela_pol: 15.6, refresh_hz: 144, peso_kg: 2.5 } },

  // === CPU · 6 ===
  { sku: "CPU-AMD-5600", slug: "amd-ryzen-5-5600", name: "AMD Ryzen 5 5600", category: "cpu", brand: "AMD", price: 749.90, pix_price: 690.00, stock: 8, image: "/products/cpu.svg", specs: { socket: "AM4", tdp: 65, cores: 6, threads: 12, gen: "Zen 3", igpu: false, cooler_included: true } },
  { sku: "CPU-AMD-7600", slug: "amd-ryzen-5-7600", name: "AMD Ryzen 5 7600", category: "cpu", brand: "AMD", price: 1390.00, pix_price: 1290.00, stock: 5, image: "/products/cpu.svg", specs: { socket: "AM5", tdp: 65, cores: 6, threads: 12, gen: "Zen 4", igpu: true, cooler_included: true } },
  { sku: "CPU-AMD-5700X", slug: "amd-ryzen-7-5700x", name: "AMD Ryzen 7 5700X", category: "cpu", brand: "AMD", price: 1249.00, pix_price: 1150.00, stock: 4, image: "/products/cpu.svg", specs: { socket: "AM4", tdp: 65, cores: 8, threads: 16, gen: "Zen 3", igpu: false, cooler_included: false } },
  { sku: "CPU-AMD-7700", slug: "amd-ryzen-7-7700", name: "AMD Ryzen 7 7700", category: "cpu", brand: "AMD", price: 2390.00, pix_price: 2190.00, stock: 3, image: "/products/cpu.svg", specs: { socket: "AM5", tdp: 65, cores: 8, threads: 16, gen: "Zen 4", igpu: true, cooler_included: true }, highlight: true, badge: "Mais Vendido" },
  { sku: "CPU-INT-12400F", slug: "intel-i5-12400f", name: "Intel Core i5-12400F", category: "cpu", brand: "Intel", price: 990.00, pix_price: 890.00, stock: 6, image: "/products/cpu.svg", specs: { socket: "LGA1700", tdp: 65, cores: 6, threads: 12, gen: "12ª", igpu: false, cooler_included: true } },
  { sku: "CPU-INT-14400F", slug: "intel-i5-14400f", name: "Intel Core i5-14400F", category: "cpu", brand: "Intel", price: 1290.00, pix_price: 1190.00, stock: 4, image: "/products/cpu.svg", specs: { socket: "LGA1700", tdp: 65, cores: 10, threads: 16, gen: "14ª", igpu: false, cooler_included: true } },

  // === Cooler · 4 ===
  { sku: "COOL-DR-AK400", slug: "deepcool-ak400", name: "DeepCool AK400 Tower", category: "cooler", brand: "DeepCool", price: 199.00, pix_price: 179.00, stock: 8, image: "/products/cooler.svg", specs: { type: "Air", supports_socket: ["AM4", "AM5", "LGA1700"], max_tdp: 220, height_mm: 155 } },
  { sku: "COOL-TR-PA120", slug: "thermalright-peerless-assassin-120", name: "Thermalright Peerless Assassin 120 SE", category: "cooler", brand: "Thermalright", price: 299.00, pix_price: 269.00, stock: 5, image: "/products/cooler.svg", specs: { type: "Air Dual Tower", supports_socket: ["AM4", "AM5", "LGA1700"], max_tdp: 245, height_mm: 158 }, highlight: true, badge: "Mais Vendido" },
  { sku: "COOL-CR-H100", slug: "corsair-h100x-rgb", name: "Corsair iCUE H100x RGB 240mm AIO", category: "cooler", brand: "Corsair", price: 749.00, pix_price: 690.00, stock: 3, image: "/products/cooler.svg", specs: { type: "AIO 240mm", supports_socket: ["AM4", "AM5", "LGA1700"], max_tdp: 280, radiator_mm: 240 } },
  { sku: "COOL-CR-H150", slug: "corsair-h150-icue", name: "Corsair iCUE H150 ELITE 360mm AIO", category: "cooler", brand: "Corsair", price: 1190.00, pix_price: 1090.00, stock: 2, image: "/products/cooler.svg", specs: { type: "AIO 360mm", supports_socket: ["AM4", "AM5", "LGA1700"], max_tdp: 320, radiator_mm: 360 } },

  // === Mobo · 6 ===
  { sku: "MB-ASR-A520M", slug: "asrock-a520m-hvs", name: "ASRock A520M HVS", category: "mobo", brand: "ASRock", price: 489.90, pix_price: 449.00, stock: 5, image: "/products/mobo.svg", specs: { socket: "AM4", ram_type: "DDR4", form: "mATX", ram_slots: 2, sata_ports: 4 } },
  { sku: "MB-ASUS-B550M", slug: "asus-prime-b550m-k", name: "ASUS Prime B550M-K", category: "mobo", brand: "ASUS", price: 749.00, pix_price: 690.00, stock: 4, image: "/products/mobo.svg", specs: { socket: "AM4", ram_type: "DDR4", form: "mATX", ram_slots: 4, sata_ports: 4 } },
  { sku: "MB-ASR-B650M", slug: "asrock-b650m-hdv", name: "ASRock B650M-HDV/M.2", category: "mobo", brand: "ASRock", price: 1390.00, pix_price: 1290.00, stock: 3, image: "/products/mobo.svg", specs: { socket: "AM5", ram_type: "DDR5", form: "mATX", ram_slots: 4, sata_ports: 4 } },
  { sku: "MB-ASR-H610M", slug: "asrock-h610m-hdv", name: "ASRock H610M-HDV/M.2", category: "mobo", brand: "ASRock", price: 599.00, pix_price: 549.00, stock: 6, image: "/products/mobo.svg", specs: { socket: "LGA1700", ram_type: "DDR4", form: "mATX", ram_slots: 2, sata_ports: 4 } },
  { sku: "MB-ASUS-B760M", slug: "asus-prime-b760m-a", name: "ASUS Prime B760M-A", category: "mobo", brand: "ASUS", price: 1090.00, pix_price: 990.00, stock: 3, image: "/products/mobo.svg", specs: { socket: "LGA1700", ram_type: "DDR5", form: "mATX", ram_slots: 4, sata_ports: 6 } },
  { sku: "MB-GB-Z790M", slug: "gigabyte-z790m-aorus-elite-ax-ice", name: "Gigabyte Z790M AORUS ELITE AX ICE · DDR5 · RGB · Wi-Fi", category: "mobo", brand: "Gigabyte", price: 1990.00, pix_price: 1899.97, stock: 2, image: "/products/mobo.svg", specs: { socket: "LGA1700", ram_type: "DDR5", form: "mATX", ram_slots: 4, sata_ports: 6 }, highlight: true, badge: "Lançamento" },

  // === RAM · 5 ===
  { sku: "RAM-KS-16-3200", slug: "kingston-fury-beast-16gb-ddr4-3200", name: "Kingston Fury Beast 16GB DDR4 3200MHz", category: "ram", brand: "Kingston", price: 319.00, pix_price: 290.00, stock: 10, image: "/products/ram.svg", specs: { ram_type: "DDR4", capacity_gb: 16, freq_mhz: 3200, slots_used: 1 } },
  { sku: "RAM-CR-16-3600", slug: "corsair-vengeance-16gb-ddr4-3600", name: "Corsair Vengeance 16GB DDR4 3600MHz", category: "ram", brand: "Corsair", price: 389.00, pix_price: 350.00, stock: 7, image: "/products/ram.svg", specs: { ram_type: "DDR4", capacity_gb: 16, freq_mhz: 3600, slots_used: 1 } },
  { sku: "RAM-KS-16-5200", slug: "kingston-fury-beast-16gb-ddr5-5200", name: "Kingston Fury Beast 16GB DDR5 5200MHz", category: "ram", brand: "Kingston", price: 429.00, pix_price: 390.00, stock: 5, image: "/products/ram.svg", specs: { ram_type: "DDR5", capacity_gb: 16, freq_mhz: 5200, slots_used: 1 } },
  { sku: "RAM-CR-32-6000", slug: "corsair-vengeance-32gb-ddr5-6000", name: "Corsair Vengeance 32GB DDR5 6000MHz", category: "ram", brand: "Corsair", price: 990.00, pix_price: 890.00, stock: 4, image: "/products/ram.svg", specs: { ram_type: "DDR5", capacity_gb: 32, freq_mhz: 6000, slots_used: 2 }, highlight: true, badge: "Mais Vendido" },
  { sku: "RAM-MAN-16-3200", slug: "mancer-astrion-16gb-ddr4-3200", name: "Memória Mancer Astrion 16GB (1x16GB) DDR4 3200MHz", category: "ram", brand: "Mancer", price: 269.00, pix_price: 249.00, stock: 12, image: "/products/ram.svg", specs: { ram_type: "DDR4", capacity_gb: 16, freq_mhz: 3200, slots_used: 1 }, badge: "Promo" },

  // === GPU · 7 ===
  { sku: "GPU-MAN-2060S", slug: "mancer-rtx-2060-super-heimdall", name: "Mancer GeForce RTX 2060 Super Heimdall X 8GB GDDR6", category: "gpu", brand: "Mancer", price: 1590.00, pix_price: 1449.99, stock: 3, image: "/products/gpu.svg", specs: { tdp: 175, vram_gb: 8, chip: "RTX 2060 Super", length_mm: 240 }, badge: "Promo" },
  { sku: "GPU-GLX-4060", slug: "galax-rtx-4060", name: "GALAX GeForce RTX 4060 1-Click OC", category: "gpu", brand: "GALAX", price: 2490.00, pix_price: 2290.00, stock: 4, image: "/products/gpu.svg", specs: { tdp: 115, vram_gb: 8, chip: "RTX 4060", length_mm: 240 }, highlight: true, badge: "Mais Vendido" },
  { sku: "GPU-ASUS-4060TI", slug: "asus-dual-rtx-4060-ti", name: "ASUS Dual RTX 4060 Ti 8GB", category: "gpu", brand: "ASUS", price: 3490.00, pix_price: 3190.00, stock: 2, image: "/products/gpu.svg", specs: { tdp: 165, vram_gb: 8, chip: "RTX 4060 Ti", length_mm: 280 } },
  { sku: "GPU-MSI-4070S", slug: "msi-rtx-4070-super-ventus", name: "MSI RTX 4070 Super Ventus 12GB", category: "gpu", brand: "MSI", price: 4990.00, pix_price: 4690.00, stock: 2, image: "/products/gpu.svg", specs: { tdp: 220, vram_gb: 12, chip: "RTX 4070 Super", length_mm: 300 }, highlight: true },
  { sku: "GPU-GLX-5060", slug: "galax-rtx-5060", name: "GALAX GeForce RTX 5060 8GB", category: "gpu", brand: "GALAX", price: 3290.00, pix_price: 2990.00, stock: 3, image: "/products/gpu.svg", specs: { tdp: 150, vram_gb: 8, chip: "RTX 5060", length_mm: 250 }, badge: "Lançamento" },
  { sku: "GPU-GLX-5060TI", slug: "galax-rtx-5060-ti", name: "GALAX GeForce RTX 5060 Ti 16GB", category: "gpu", brand: "GALAX", price: 4190.00, pix_price: 3890.00, stock: 2, image: "/products/gpu.svg", specs: { tdp: 180, vram_gb: 16, chip: "RTX 5060 Ti", length_mm: 260 }, badge: "Lançamento" },
  { sku: "GPU-PLT-5070", slug: "palit-gamerock-rtx-5070", name: "Palit GameRock RTX 5070 Ti 12GB", category: "gpu", brand: "Palit", price: 6290.00, pix_price: 5890.00, stock: 1, image: "/products/gpu.svg", specs: { tdp: 250, vram_gb: 12, chip: "RTX 5070 Ti", length_mm: 310 }, highlight: true, badge: "Lançamento" },
  { sku: "GPU-OB-GTX1650", slug: "openbox-gtx-1650-oc-gigabyte", name: "OPENBOX Placa de Vídeo NVIDIA GTX 1650 4GB OC Gigabyte", category: "gpu", brand: "Gigabyte", price: 890.00, pix_price: 790.00, stock: 1, image: "/products/gpu.svg", specs: { tdp: 75, vram_gb: 4, chip: "GTX 1650", length_mm: 230 }, badge: "OpenBox" },

  // === SSD · 5 ===
  { sku: "SSD-KS-NV2-500", slug: "kingston-nv2-500gb", name: "Kingston NV2 500GB NVMe PCIe 4.0", category: "ssd", brand: "Kingston", price: 269.00, pix_price: 249.00, stock: 12, image: "/products/ssd.svg", specs: { capacity_gb: 500, interface: "NVMe PCIe 4.0", read_mb: 3500 } },
  { sku: "SSD-KS-NV2-1TB", slug: "kingston-nv2-1tb", name: "Kingston NV2 1TB NVMe PCIe 4.0", category: "ssd", brand: "Kingston", price: 449.00, pix_price: 419.00, stock: 8, image: "/products/ssd.svg", specs: { capacity_gb: 1000, interface: "NVMe PCIe 4.0", read_mb: 3500 }, highlight: true, badge: "Mais Vendido" },
  { sku: "SSD-TGT-EGON-480", slug: "tgt-egon-s35-480gb", name: "SSD TGT Egon S35 480GB SATA III · 500MB/s leitura", category: "ssd", brand: "TGT", price: 219.00, pix_price: 199.00, stock: 10, image: "/products/ssd.svg", specs: { capacity_gb: 480, interface: "SATA III", read_mb: 500 } },
  { sku: "SSD-CR-MX500-1TB", slug: "crucial-mx500-1tb", name: "Crucial MX500 1TB SATA III", category: "ssd", brand: "Crucial", price: 519.00, pix_price: 479.00, stock: 5, image: "/products/ssd.svg", specs: { capacity_gb: 1000, interface: "SATA III", read_mb: 560 } },
  { sku: "SSD-WD-SN770-2TB", slug: "wd-black-sn770-2tb", name: "WD Black SN770 2TB NVMe PCIe 4.0", category: "ssd", brand: "WD", price: 899.00, pix_price: 829.00, stock: 3, image: "/products/ssd.svg", specs: { capacity_gb: 2000, interface: "NVMe PCIe 4.0", read_mb: 5150 } },

  // === Gabinete · 5 ===
  { sku: "GAB-BLC-064", slug: "bluecase-bg-064-pure-pro", name: "Gabinete Bluecase BG-064 Pure Pro Branco Micro-ATX", category: "gabinete", brand: "Bluecase", price: 379.00, pix_price: 349.90, stock: 6, image: "/products/case.svg", specs: { form: "mATX", supports_mobo: ["mATX", "ITX"], max_gpu_mm: 320, max_cooler_mm: 160 } },
  { sku: "GAB-RIS-Z3", slug: "rise-mode-z3-glass", name: "Gabinete Rise Mode Z3 Glass ATX RGB", category: "gabinete", brand: "Rise Mode", price: 459.00, pix_price: 419.00, stock: 5, image: "/products/case.svg", specs: { form: "ATX", supports_mobo: ["ATX", "mATX", "ITX"], max_gpu_mm: 340, max_cooler_mm: 165 }, highlight: true },
  { sku: "GAB-CLM-MEGALON", slug: "clanm-megalon-aquario", name: "Gabinete Clanm Megalon Aquário · ATX RGB Triple Glass", category: "gabinete", brand: "Clanm", price: 519.00, pix_price: 479.00, stock: 4, image: "/products/case.svg", specs: { form: "ATX", supports_mobo: ["ATX", "mATX"], max_gpu_mm: 335, max_cooler_mm: 165 } },
  { sku: "GAB-CR-4000D", slug: "corsair-4000d-airflow", name: "Gabinete Corsair 4000D Airflow Mid Tower", category: "gabinete", brand: "Corsair", price: 749.00, pix_price: 690.00, stock: 3, image: "/products/case.svg", specs: { form: "ATX", supports_mobo: ["ATX", "mATX", "ITX"], max_gpu_mm: 360, max_cooler_mm: 170 }, badge: "Mais Vendido" },
  { sku: "GAB-PCH-KAZAN2", slug: "pichau-kazan-2-semi-novo", name: "Gabinete Pichau Kazan 2 PG-KZN2-BL01 (Semi-novo)", category: "gabinete", brand: "Pichau", price: 219.00, pix_price: 190.00, stock: 1, image: "/products/case.svg", specs: { form: "ATX", supports_mobo: ["ATX", "mATX"], max_gpu_mm: 330, max_cooler_mm: 160 }, badge: "OpenBox" },

  // === Fonte · 4 ===
  { sku: "PSU-CR-CV550", slug: "corsair-cv550", name: "Fonte Corsair CV550 550W 80+ White", category: "fonte", brand: "Corsair", price: 319.00, pix_price: 290.00, stock: 6, image: "/products/psu.svg", specs: { watts: 550, certification: "80+ White", modular: false } },
  { sku: "PSU-CR-CV650", slug: "corsair-cv650", name: "Fonte Corsair CV650 650W 80+ Bronze", category: "fonte", brand: "Corsair", price: 429.00, pix_price: 390.00, stock: 5, image: "/products/psu.svg", specs: { watts: 650, certification: "80+ Bronze", modular: false } },
  { sku: "PSU-CR-RM750", slug: "corsair-rm750e", name: "Fonte Corsair RM750e 750W 80+ Gold Full Modular", category: "fonte", brand: "Corsair", price: 849.00, pix_price: 790.00, stock: 4, image: "/products/psu.svg", specs: { watts: 750, certification: "80+ Gold", modular: true }, highlight: true },
  { sku: "PSU-CR-RM850X", slug: "corsair-rm850x", name: "Fonte Corsair RM850x 850W 80+ Gold Full Modular", category: "fonte", brand: "Corsair", price: 1190.00, pix_price: 1090.00, stock: 3, image: "/products/psu.svg", specs: { watts: 850, certification: "80+ Gold", modular: true } },

  // === MOUSE · 6 ===
  { sku: "MS-AS-X11", slug: "attack-shark-x11-branco", name: "Mouse Attack Shark X11 Branco Sem Fio 22000 DPI", category: "mouse", brand: "Attack Shark", price: 319.00, pix_price: 289.90, stock: 0, image: "/products/mouse.svg", specs: { dpi: 22000, wireless: true, color: "branco" }, badge: "Mais Vendido" },
  { sku: "MS-AS-X68", slug: "attack-shark-x68-magnetic", name: "Mouse Attack Shark X68 HE Magnetic 4000Hz Sem Fio", category: "mouse", brand: "Attack Shark", price: 459.00, pix_price: 419.00, stock: 4, image: "/products/mouse.svg", specs: { dpi: 26000, wireless: true, polling_hz: 4000 }, highlight: true, badge: "Lançamento" },
  { sku: "MS-RED-INV", slug: "redragon-invader-pro-m719", name: "Mouse Redragon Invader Pro M719 RGB", category: "mouse", brand: "Redragon", price: 229.00, pix_price: 208.98, stock: 8, image: "/products/mouse.svg", specs: { dpi: 10000, wireless: false, rgb: true } },
  { sku: "MS-RED-COBRA", slug: "redragon-cobra-m711", name: "Mouse Redragon Cobra M711 RGB · 10000 DPI", category: "mouse", brand: "Redragon", price: 159.00, pix_price: 139.00, stock: 12, image: "/products/mouse.svg", specs: { dpi: 10000, wireless: false, rgb: true } },
  { sku: "MS-LOG-G203", slug: "logitech-g203-lightsync", name: "Mouse Logitech G203 Lightsync RGB", category: "mouse", brand: "Logitech", price: 199.00, pix_price: 179.00, stock: 7, image: "/products/mouse.svg", specs: { dpi: 8000, wireless: false, rgb: true } },
  { sku: "MS-RAZ-DA-V3", slug: "razer-deathadder-v3", name: "Mouse Razer DeathAdder V3 Pro Sem Fio", category: "mouse", brand: "Razer", price: 1290.00, pix_price: 1190.00, stock: 2, image: "/products/mouse.svg", specs: { dpi: 30000, wireless: true, polling_hz: 4000 } },

  // === TECLADO · 5 ===
  { sku: "TC-AS-X66", slug: "attack-shark-x66-moonlight", name: "Teclado Mecânico Attack Shark X66 65% RGB Moonlight", category: "teclado", brand: "Attack Shark", price: 459.00, pix_price: 419.99, stock: 5, image: "/products/keyboard.svg", specs: { layout: "65%", switch: "Mecânico", rgb: true, wireless: true }, highlight: true, badge: "Mais Vendido" },
  { sku: "TC-AS-X75", slug: "attack-shark-x75-pro", name: "Teclado Attack Shark X75 Pro 75% Hot-Swap Triple Mode", category: "teclado", brand: "Attack Shark", price: 599.00, pix_price: 549.00, stock: 3, image: "/products/keyboard.svg", specs: { layout: "75%", switch: "Hot-Swap", rgb: true, wireless: true } },
  { sku: "TC-RED-K552", slug: "redragon-kumara-k552", name: "Teclado Redragon Kumara K552 TKL Mecânico", category: "teclado", brand: "Redragon", price: 269.00, pix_price: 239.00, stock: 10, image: "/products/keyboard.svg", specs: { layout: "TKL", switch: "Outemu Blue", rgb: true } },
  { sku: "TC-HYP-ALLOY", slug: "hyperx-alloy-origins", name: "Teclado HyperX Alloy Origins Core TKL RGB", category: "teclado", brand: "HyperX", price: 749.00, pix_price: 690.00, stock: 4, image: "/products/keyboard.svg", specs: { layout: "TKL", switch: "HyperX Red", rgb: true } },
  { sku: "TC-LOG-G915", slug: "logitech-g915-tkl", name: "Teclado Logitech G915 TKL Wireless RGB Lightspeed", category: "teclado", brand: "Logitech", price: 1990.00, pix_price: 1790.00, stock: 2, image: "/products/keyboard.svg", specs: { layout: "TKL", switch: "GL Tactile", rgb: true, wireless: true } },

  // === MOUSEPAD · 3 ===
  { sku: "MP-RIS-PRO", slug: "rise-mode-pro-90x40", name: "Mousepad Rise Mode Pro 900x400mm · Costura Lateral", category: "mousepad", brand: "Rise Mode", price: 99.00, pix_price: 89.90, stock: 18, image: "/products/mousepad.svg", specs: { size: "900x400mm", surface: "Speed" } },
  { sku: "MP-HYP-FURY-L", slug: "hyperx-fury-pro-l", name: "Mousepad HyperX Fury Pro Gaming · Tamanho L", category: "mousepad", brand: "HyperX", price: 159.00, pix_price: 139.00, stock: 10, image: "/products/mousepad.svg", specs: { size: "450x400mm", surface: "Control" } },
  { sku: "MP-RAZ-GOLI-XXL", slug: "razer-goliathus-xxl", name: "Mousepad Razer Goliathus Extended Chroma XXL RGB", category: "mousepad", brand: "Razer", price: 549.00, pix_price: 499.00, stock: 4, image: "/products/mousepad.svg", specs: { size: "900x300mm", surface: "Mixed", rgb: true } },

  // === MONITOR · 4 ===
  { sku: "MON-BLC-23-75", slug: "bluecase-23-curvo-75hz", name: "Monitor Gamer Bluecase 23,8\" Curvo 75Hz", category: "monitor", brand: "Bluecase", price: 879.00, pix_price: 797.14, stock: 3, image: "/products/monitor.svg", specs: { tela_pol: 23.8, refresh_hz: 75, painel: "VA Curvo" }, highlight: true },
  { sku: "MON-AOC-24-144", slug: "aoc-c24g3-24-144hz", name: "Monitor Gamer AOC Centauri C24G3 24\" Curvo 144Hz", category: "monitor", brand: "AOC", price: 1290.00, pix_price: 1190.00, stock: 4, image: "/products/monitor.svg", specs: { tela_pol: 24, refresh_hz: 144, painel: "VA Curvo" }, badge: "Mais Vendido" },
  { sku: "MON-LG-27-144", slug: "lg-ultragear-27-144hz", name: "Monitor LG UltraGear 27\" 144Hz IPS 1ms", category: "monitor", brand: "LG", price: 1990.00, pix_price: 1790.00, stock: 2, image: "/products/monitor.svg", specs: { tela_pol: 27, refresh_hz: 144, painel: "IPS" } },
  { sku: "MON-SAM-32-240", slug: "samsung-odyssey-g7-32", name: "Monitor Samsung Odyssey G7 32\" 240Hz QHD Curvo", category: "monitor", brand: "Samsung", price: 3990.00, pix_price: 3590.00, stock: 1, image: "/products/monitor.svg", specs: { tela_pol: 32, refresh_hz: 240, painel: "VA QHD Curvo" }, badge: "Lançamento" },

  // === HEADSET · 4 ===
  { sku: "HS-RED-ZEUS", slug: "redragon-zeus-h510", name: "Headset Redragon Zeus H510 7.1 Surround", category: "headset", brand: "Redragon", price: 269.00, pix_price: 239.00, stock: 8, image: "/products/headset.svg", specs: { conexao: "USB", surround: "7.1", mic: true } },
  { sku: "HS-HYP-CLD3", slug: "hyperx-cloud-iii", name: "Headset HyperX Cloud III · DTS Spatial Audio", category: "headset", brand: "HyperX", price: 749.00, pix_price: 690.00, stock: 5, image: "/products/headset.svg", specs: { conexao: "3.5mm + USB", surround: "DTS Spatial", mic: true }, highlight: true, badge: "Mais Vendido" },
  { sku: "HS-LOG-G733", slug: "logitech-g733-wireless", name: "Headset Logitech G733 Lightspeed Wireless RGB", category: "headset", brand: "Logitech", price: 1090.00, pix_price: 990.00, stock: 3, image: "/products/headset.svg", specs: { conexao: "Wireless", surround: "DTS Headphone:X 2.0", mic: true } },
  { sku: "HS-RAZ-KRAKEN-V3", slug: "razer-kraken-v3", name: "Headset Razer Kraken V3 RGB · THX 7.1", category: "headset", brand: "Razer", price: 1290.00, pix_price: 1190.00, stock: 2, image: "/products/headset.svg", specs: { conexao: "USB", surround: "THX 7.1", mic: true } },

  // === CADEIRA · 3 ===
  { sku: "CD-HKY-STORM", slug: "husky-storm", name: "Cadeira Gamer Husky Storm · Reclinável Apoio Lombar", category: "cadeira", brand: "Husky", price: 1990.00, pix_price: 1790.00, stock: 3, image: "/products/chair.svg", specs: { max_kg: 150, reclinavel: true }, highlight: true },
  { sku: "CD-DXR-FORMULA", slug: "dxracer-formula", name: "Cadeira DXRacer Formula · Tilt Mechanism", category: "cadeira", brand: "DXRacer", price: 3290.00, pix_price: 2990.00, stock: 1, image: "/products/chair.svg", specs: { max_kg: 120, reclinavel: true } },
  { sku: "CD-HKY-COMET", slug: "husky-comet", name: "Cadeira Gamer Husky Comet · Encosto Alto Apoio Cabeça", category: "cadeira", brand: "Husky", price: 1290.00, pix_price: 1190.00, stock: 5, image: "/products/chair.svg", specs: { max_kg: 130, reclinavel: true }, badge: "Promo" },
];

export const PRODUCTS_BY_SKU = Object.fromEntries(PRODUCTS.map((p) => [p.sku, p]));

export function productsByCategory(c: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === c && p.stock > 0);
}

export function productsByBadge(b: Product["badge"]): Product[] {
  return PRODUCTS.filter((p) => p.badge === b && p.stock > 0);
}

export function productsHighlight(): Product[] {
  return PRODUCTS.filter((p) => p.highlight && p.stock > 0);
}

export function findProduct(sku: string): Product | undefined {
  return PRODUCTS_BY_SKU[sku];
}

export const BRANDS = [
  "ASUS", "MSI", "Gigabyte", "AMD", "Intel", "NVIDIA",
  "Corsair", "Kingston", "Crucial", "WD",
  "Razer", "Logitech", "HyperX", "Redragon", "Attack Shark",
  "Rise Mode", "Bluecase", "Mancer", "GALAX", "Palit",
  "Acer", "Samsung", "LG", "AOC",
];
