// Mock data pro painel admin · espelha schema Supabase que vai entrar fase 2

// ====================== TIPOS ======================

export type OrderStatus = "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";

// Status simplificado · 5 estados (era 8 · reduzido após auditoria λ.logica-primeiro)
// "diagnostico" e "entrada" viraram "aguardando"
// "garantia" virou variante de "aguardando" com flag
export type ServiceOrderStatus =
  | "aguardando"     // OS criada · diagnóstico · aguardando peça · aguardando aprovação cliente
  | "em_reparo"      // técnico trabalhando
  | "pronto"         // serviço concluído · cliente avisado · aguarda retirada
  | "entregue"       // entregue pro cliente · OS fechada
  | "cancelado";     // cliente desistiu ou cancelou

// Status de pagamento separado do status da OS · regra cravada 13/05
// Comissão só nasce com payment_status = "quitada"
export type PaymentStatus = "aberta" | "parcial" | "quitada";
export type PaymentMethod = "pix" | "dinheiro" | "cartao" | "misto";

// Peça usada na OS · gera baixa de estoque automática quando OS quita
export type OSPart = {
  sku: string;
  name: string;
  qty: number;
  unit_cost: number;
};

export type ServiceOrder = {
  id: string;             // OS-2026-0001
  customer_name: string;
  customer_phone: string;
  device: string;         // "Notebook Acer Nitro V15"
  problem: string;        // "tela não liga"
  diagnosis?: string;
  status: ServiceOrderStatus;
  technician_id?: string;
  technician_name?: string;
  commission_pct: number; // 30 = 30%
  service_value: number;
  parts_value: number;
  parts_used?: OSPart[];           // peças usadas · baixa do estoque na quitação
  total: number;                   // LÍQUIDO · service_value + parts_value − desconto do cupom
  discount?: DiscountBreakdown;    // cupom aplicado · NÃO afeta base de comissão (loja absorve)
  payment_status: PaymentStatus;   // aberta · parcial · quitada
  payment_method?: PaymentMethod;  // só definido quando há ao menos 1 Payment
  paid_at?: string;                // quando virou quitada
  created_at: string;
  updated_at: string;
  estimated_at?: string;  // prazo previsto
  delivered_at?: string;
  notes?: string;
  warranty_days?: number; // 90 padrão
  whatsapp_log?: WhatsAppMessage[];
};

export type WhatsAppMessage = {
  id: string;
  sent_at: string;
  template: "os_diagnosticada" | "os_aguardando" | "os_pronto" | "os_entregue" | "pedido_pago" | "pedido_enviado" | "manual";
  text: string;
  status: "sent" | "delivered" | "read" | "failed";
};

export type OrderItem = {
  sku: string;
  name: string;
  qty: number;
  unit_price: number;
};

export type Order = {
  id: string;
  customer_name: string;
  customer_phone: string;
  total: number;                 // LÍQUIDO · subtotal − desconto do cupom
  discount?: DiscountBreakdown;  // cupom aplicado (venda balcão/site)
  status: OrderStatus;
  payment_method: "pix" | "card" | "boleto" | "dinheiro";
  items_count: number;
  items?: OrderItem[];           // populado em venda balcão
  origin?: "site" | "balcao";    // default site
  created_at: string;
  paid_at?: string;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  cpf?: string;
  total_spent: number;
  total_orders: number;
  total_os: number;
  last_purchase_at?: string;
  tag: "vip" | "recorrente" | "casual" | "novo" | "sumido";
  notes?: string;
};

export type StockMovement = {
  id: string;
  sku: string;
  product_name: string;
  type: "entrada" | "saida" | "ajuste" | "perda";
  qty: number;
  unit_cost: number;
  total_cost: number;
  reason: string;          // "Venda OS-2026-0042" / "Compra fornecedor X"
  reference_id?: string;   // OS-2026-0042 ou order-X
  created_at: string;
  created_by: string;
};

export type Technician = {
  id: string;
  name: string;
  email: string;
  phone: string;
  commission_default: number; // 30 = 30%
  active: boolean;
  os_count: number;
  total_commission_month: number;
};

export type AccountEntry = {
  id: string;
  type: "receita" | "despesa";
  category: string;           // "Venda", "Salário", "Fornecedor", "Aluguel", "Internet"
  description: string;
  amount: number;
  status: "pago" | "pendente" | "atrasado";
  due_date: string;
  paid_at?: string;
  reference_id?: string;
};

// =============== Caixa + Comissão · cravado 13/05 ===============
// Modelo separa Venda (OS/Order) · Recebimento (Payment) · Caixa físico (CashSession)
// PIX e cartão NÃO passam pelo caixa físico · só dinheiro. Cartão tem forecast D+30.

export type Payment = {
  id: string;
  os_id?: string;             // OS-2026-XXXX OU
  order_id?: string;          // ORD-2026-XXXX
  method: PaymentMethod;      // pix · dinheiro · cartao
  amount: number;
  received_at: string;        // quando entrou (dinheiro/pix=instantâneo, cartão=quando captura)
  forecast_at?: string;       // só cartão · quando cai na conta (D+30 padrão)
  cash_session_id?: string;   // só dinheiro · amarra à sessão de caixa que recebeu
  status: "recebido" | "previsto" | "estornado";
  note?: string;
};

export type CashMovementType =
  | "abertura"        // valor inicial colocado pra troco
  | "venda"           // entrada por venda de produto (balcão)
  | "recebimento_os"  // entrada por OS quitada em dinheiro
  | "suprimento"      // entrada de dinheiro extra (Júnior repondo)
  | "sangria"         // saída de dinheiro (deposito banco, despesa imediata)
  | "fechamento";     // movimento que marca encerramento

export type CashMovement = {
  id: string;
  session_id: string;
  type: CashMovementType;
  amount: number;             // sempre positivo · o type define se soma/subtrai
  note?: string;
  reference_id?: string;      // OS-XXX · ORD-XXX · payment-X
  created_at: string;
  created_by: string;
};

export type CashSession = {
  id: string;                       // CX-2026-001
  opened_at: string;
  opened_by: string;
  opening_amount: number;           // troco inicial
  closed_at?: string;
  closed_by?: string;
  closing_amount_declared?: number; // o que o operador contou no fim
  closing_amount_expected?: number; // o que o sistema calculou
  diff?: number;                    // declared - expected (positivo=sobra · negativo=falta)
  diff_note?: string;               // obrigatório se diff !== 0
  status: "aberta" | "fechada";
};

export type CommissionStatus = "apurada" | "paga" | "estornada";

export type Commission = {
  id: string;
  os_id: string;
  technician_id: string;
  technician_name: string;
  base_value: number;       // = service_value
  pct: number;              // ex: 30
  amount: number;           // base × pct
  generated_at: string;     // quando OS virou quitada
  status: CommissionStatus;
  paid_at?: string;
  paid_entry_id?: string;   // amarra ao AccountEntry (despesa) que pagou
};

// =============== Cupom / Desconto · cravado 05/07 ===============
// REGRAS DURAS (Eduardo 05/07):
//  1. Desconto NUNCA reduz a base de comissão. Commission.base_value = service_value BRUTO.
//     A loja absorve o desconto na margem; o técnico recebe cheio.
//  2. Incidência configurável por cupom: servico | produto | total (rateado serv/peça pro fiscal).
// O breakdown alimenta 3 agregadores: total líquido (caixa/DRE) · base fiscal por nota · e
// NUNCA a comissão. Nunca guardar só o "total já descontado" sem o breakdown (bug Palace: desconto some).

export type CouponKind = "percentual" | "valor";        // % ou R$ fixo
export type CouponTarget = "servico" | "produto" | "total";

export type Coupon = {
  id: string;
  code: string;                 // "VOLTA10" · sempre comparar em UPPER
  description: string;
  kind: CouponKind;
  value: number;                // 10 (=10% se percentual) ou 20 (=R$20 se valor)
  target: CouponTarget;         // sobre o que incide
  min_subtotal?: number;        // exige subtotal mínimo pra valer
  max_discount?: number;        // teto de desconto em R$ (útil pra percentual)
  valid_from?: string;
  valid_until?: string;
  usage_limit?: number;         // undefined = ilimitado
  used_count: number;
  active: boolean;
  created_at: string;
};

// O que a aplicação de um cupom produz · vai gravado na OS/Order
export type DiscountBreakdown = {
  coupon_code: string;
  target: CouponTarget;
  total: number;                // desconto total em R$ (positivo)
  on_service: number;           // parte que abate serviço → base NFS-e/ISS · NÃO afeta comissão
  on_parts: number;             // parte que abate peça/produto → base NFC-e/ICMS
};

const r2 = (n: number) => Math.round(n * 100) / 100;

// Valida e calcula o desconto de um cupom sobre uma base serviço/peça.
// Retorna o breakdown pronto pra gravar, ou o motivo da recusa (mostrar pro operador).
export function computeCouponDiscount(
  coupon: Coupon,
  serviceValue: number,
  partsValue: number,
  now: Date = new Date(),
): { ok: true; discount: DiscountBreakdown } | { ok: false; reason: string } {
  const subtotal = serviceValue + partsValue;
  if (!coupon.active) return { ok: false, reason: "Cupom inativo" };
  if (coupon.valid_from && new Date(coupon.valid_from) > now) return { ok: false, reason: "Cupom ainda não vigente" };
  if (coupon.valid_until && new Date(coupon.valid_until) < now) return { ok: false, reason: "Cupom expirado" };
  if (coupon.usage_limit != null && coupon.used_count >= coupon.usage_limit) return { ok: false, reason: "Cupom esgotado" };
  if (coupon.min_subtotal && subtotal < coupon.min_subtotal) return { ok: false, reason: `Exige mínimo de R$ ${coupon.min_subtotal.toFixed(2)}` };

  // base sobre a qual o cupom incide
  const base = coupon.target === "servico" ? serviceValue
    : coupon.target === "produto" ? partsValue
    : subtotal;
  if (base <= 0) return { ok: false, reason: "Sem valor pra descontar nesse alvo (serviço/produto)" };

  let total = coupon.kind === "percentual" ? base * (coupon.value / 100) : coupon.value;
  if (coupon.max_discount != null) total = Math.min(total, coupon.max_discount);
  total = r2(Math.min(total, base));  // nunca desconta mais que a base

  // rateio serviço/peça — só o target "total" divide; os outros vão direto
  let on_service = 0;
  let on_parts = 0;
  if (coupon.target === "servico") on_service = total;
  else if (coupon.target === "produto") on_parts = total;
  else {
    on_service = subtotal > 0 ? r2(total * (serviceValue / subtotal)) : 0;
    on_parts = r2(total - on_service);  // o resto, pra não perder centavo no arredondamento
  }
  return { ok: true, discount: { coupon_code: coupon.code, target: coupon.target, total, on_service, on_parts } };
}

// Total líquido da OS (o que o cliente paga) = bruto − desconto. É o valor que vai pro caixa/DRE.
export function osNetTotal(os: ServiceOrder): number {
  return r2(os.service_value + os.parts_value - (os.discount?.total ?? 0));
}

// Base de cada nota fiscal · bruto do bucket − desconto do respectivo bucket.
// Comissão NÃO usa isso: comissão é sobre service_value BRUTO.
export function osFiscalBase(os: ServiceOrder): { nfse: number; nfce: number } {
  return {
    nfse: r2(os.service_value - (os.discount?.on_service ?? 0)),  // ISS · mão de obra
    nfce: r2(os.parts_value - (os.discount?.on_parts ?? 0)),      // ICMS · peça
  };
}

// ====================== MOCK DATA ======================

const today = new Date();
const iso = (daysAgo = 0) => {
  const d = new Date(today);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
};

export const COUPONS: Coupon[] = [
  // 10% na mão de obra pra cliente que volta · incide só no serviço (não mexe em peça)
  { id: "cup-1", code: "VOLTA10", description: "10% na mão de obra (cliente recorrente)", kind: "percentual", value: 10, target: "servico", used_count: 3, active: true, created_at: iso(20) },
  // R$20 off em peça, exige subtotal ≥ R$150 · incide só no produto
  { id: "cup-2", code: "PECA20", description: "R$20 off em peça (mínimo R$150)", kind: "valor", value: 20, target: "produto", min_subtotal: 150, usage_limit: 50, used_count: 12, active: true, created_at: iso(15) },
  // 15% no total (campanha), teto R$80 · rateia serviço/peça pro fiscal
  { id: "cup-3", code: "BLACK15", description: "15% no total · teto R$80 (campanha)", kind: "percentual", value: 15, target: "total", max_discount: 80, valid_until: iso(-15), used_count: 0, active: true, created_at: iso(3) },
];

export const TECHNICIANS: Technician[] = [
  { id: "tec-1", name: "Júnior (você)", email: "junior@starteq.com.br", phone: "(63) 99252-8619", commission_default: 0, active: true, os_count: 12, total_commission_month: 0 },
  { id: "tec-2", name: "Marcos Silva", email: "marcos@starteq.com.br", phone: "(63) 99888-2233", commission_default: 30, active: true, os_count: 8, total_commission_month: 1240.00 },
  { id: "tec-3", name: "Lucas Pereira", email: "lucas@starteq.com.br", phone: "(63) 98777-4455", commission_default: 30, active: true, os_count: 5, total_commission_month: 720.00 },
];

export const SERVICE_ORDERS: ServiceOrder[] = [
  {
    id: "OS-2026-0042",
    customer_name: "Pedro Macedo",
    customer_phone: "(63) 99111-2233",
    device: "Notebook Acer Nitro 5 i7-12700H",
    problem: "Não liga após queda · tela preta · LED de power piscando",
    diagnosis: "Placa-mãe com curto · necessária troca da fonte interna + chip de alimentação",
    status: "aguardando",
    technician_id: "tec-2",
    technician_name: "Marcos Silva",
    commission_pct: 30,
    service_value: 350.00,
    parts_value: 480.00,
    parts_used: [
      { sku: "RAM-CR-32-6000", name: "Corsair Vengeance 32GB DDR5 6000MHz", qty: 1, unit_cost: 480.00 },
    ],
    total: 830.00,
    payment_status: "aberta",
    created_at: iso(3),
    updated_at: iso(1),
    estimated_at: iso(-4),
    warranty_days: 90,
    notes: "Cliente autorizou orçamento via WhatsApp · aguardando peça chegar do fornecedor",
    whatsapp_log: [
      { id: "w1", sent_at: iso(3), template: "os_diagnosticada", text: "Pedro, sua OS-2026-0042 foi diagnosticada. Orçamento total R$ 830,00 (peças + serviço). Confirma pra prosseguirmos?", status: "read" },
      { id: "w2", sent_at: iso(2), template: "manual", text: "Pedro, peça encomendada. Prazo 4 dias úteis. Te aviso quando chegar.", status: "delivered" },
    ],
  },
  {
    id: "OS-2026-0041",
    customer_name: "Carla Mendes",
    customer_phone: "(63) 99222-7788",
    device: "PC Gamer Ryzen 5 5600",
    problem: "Trava em jogos pesados após 30min · temperatura alta suspeita",
    diagnosis: "Pasta térmica ressecada + ventoinha do gabinete sem girar · limpeza geral",
    status: "pronto",
    technician_id: "tec-3",
    technician_name: "Lucas Pereira",
    commission_pct: 30,
    service_value: 180.00,
    parts_value: 45.00,
    total: 225.00,
    payment_status: "aberta",
    created_at: iso(5),
    updated_at: iso(0),
    estimated_at: iso(-2),
    warranty_days: 90,
    whatsapp_log: [
      { id: "w3", sent_at: iso(0, ), template: "os_pronto", text: "Carla, seu PC está pronto! Pode retirar a partir das 14h. Total: R$ 225,00 (PIX 15% off = R$ 191,25).", status: "read" },
    ],
  },
  {
    id: "OS-2026-0040",
    customer_name: "Ricardo Alves",
    customer_phone: "(63) 99333-1144",
    device: "Notebook Dell Inspiron 15",
    problem: "Tela quebrada · linha vertical no LCD",
    status: "em_reparo",
    technician_id: "tec-2",
    technician_name: "Marcos Silva",
    commission_pct: 30,
    service_value: 200.00,
    parts_value: 650.00,
    total: 850.00,
    payment_status: "aberta",
    created_at: iso(2),
    updated_at: iso(1),
    estimated_at: iso(-1),
    warranty_days: 90,
  },
  {
    id: "OS-2026-0039",
    customer_name: "Beatriz Souza",
    customer_phone: "(63) 99444-9988",
    device: "PC Office Intel i3",
    problem: "Lentidão extrema · suspeita de HDD ruim",
    diagnosis: "HDD com badblocks · recomendado SSD",
    status: "entregue",
    technician_id: "tec-3",
    technician_name: "Lucas Pereira",
    commission_pct: 30,
    service_value: 120.00,
    parts_value: 249.00,
    parts_used: [
      { sku: "SSD-KS-NV2-1TB", name: "Kingston NV2 1TB NVMe PCIe 4.0", qty: 1, unit_cost: 249.00 },
    ],
    total: 369.00,
    payment_status: "quitada",
    payment_method: "dinheiro",
    paid_at: iso(0),
    created_at: iso(8),
    updated_at: iso(5),
    delivered_at: iso(5),
    estimated_at: iso(-2),
    warranty_days: 90,
  },
  {
    id: "OS-2026-0038",
    customer_name: "André Junqueira",
    customer_phone: "(63) 99555-2266",
    device: "Notebook Lenovo IdeaPad",
    problem: "Teclado com teclas falhando",
    status: "aguardando",
    technician_id: "tec-1",
    technician_name: "Júnior (você)",
    commission_pct: 0,
    service_value: 0,
    parts_value: 0,
    total: 0,
    payment_status: "aberta",
    created_at: iso(0),
    updated_at: iso(0),
    warranty_days: 90,
  },
  {
    id: "OS-2026-0037",
    customer_name: "Larissa Pinto",
    customer_phone: "(63) 99666-3322",
    device: "PC Gamer Ryzen 7 7700",
    problem: "Upgrade · troca de fonte + adição de SSD",
    status: "aguardando",
    commission_pct: 0,
    service_value: 0,
    parts_value: 0,
    total: 0,
    payment_status: "aberta",
    created_at: iso(0),
    updated_at: iso(0),
    warranty_days: 90,
  },
  // Histórico · OS quitadas no mês passado (pra gerar commissions já pagas)
  {
    id: "OS-2026-0035",
    customer_name: "Helena Ribeiro",
    customer_phone: "(63) 99777-1122",
    device: "Notebook Samsung Book",
    problem: "Bateria não segura carga",
    status: "entregue",
    technician_id: "tec-2",
    technician_name: "Marcos Silva",
    commission_pct: 30,
    service_value: 150.00,
    parts_value: 320.00,
    total: 470.00,
    payment_status: "quitada",
    payment_method: "pix",
    paid_at: iso(28),
    created_at: iso(32),
    updated_at: iso(28),
    delivered_at: iso(28),
    estimated_at: iso(29),
    warranty_days: 90,
  },
  {
    id: "OS-2026-0034",
    customer_name: "Diego Martins",
    customer_phone: "(63) 99777-3344",
    device: "PC Gamer Intel i5",
    problem: "Fonte queimou · não liga",
    status: "entregue",
    technician_id: "tec-2",
    technician_name: "Marcos Silva",
    commission_pct: 30,
    service_value: 220.00,
    parts_value: 380.00,
    total: 600.00,
    payment_status: "quitada",
    payment_method: "cartao",
    paid_at: iso(34),
    created_at: iso(38),
    updated_at: iso(34),
    delivered_at: iso(34),
    estimated_at: iso(35),
    warranty_days: 90,
  },
];

export const ORDERS: Order[] = [
  { id: "ORD-2026-1234", customer_name: "João Maranhão", customer_phone: "(63) 99100-1111", total: 6997.54, status: "paid", payment_method: "pix", items_count: 1, created_at: iso(0), paid_at: iso(0) },
  { id: "ORD-2026-1233", customer_name: "Mariana Costa", customer_phone: "(63) 99100-2222", total: 2390.00, status: "shipped", payment_method: "card", items_count: 1, created_at: iso(1), paid_at: iso(1) },
  { id: "ORD-2026-1232", customer_name: "Felipe Oliveira", customer_phone: "(63) 99100-3333", total: 419.99, status: "paid", payment_method: "pix", items_count: 1, created_at: iso(1), paid_at: iso(1) },
  { id: "ORD-2026-1231", customer_name: "Rafael Almeida", customer_phone: "(63) 99100-4444", total: 4690.00, status: "delivered", payment_method: "pix", items_count: 1, created_at: iso(2), paid_at: iso(2) },
  { id: "ORD-2026-1230", customer_name: "Daniel Sousa", customer_phone: "(63) 99100-5555", total: 1190.00, status: "pending", payment_method: "boleto", items_count: 2, created_at: iso(2) },
  { id: "ORD-2026-1229", customer_name: "Patrícia Lima", customer_phone: "(63) 99100-6666", total: 289.90, status: "cancelled", payment_method: "card", items_count: 1, created_at: iso(3) },
  { id: "ORD-2026-1228", customer_name: "Bruno Rocha", customer_phone: "(63) 99100-7777", total: 7190.00, status: "delivered", payment_method: "card", items_count: 1, created_at: iso(4), paid_at: iso(4) },
];

export const CUSTOMERS: Customer[] = [
  { id: "cus-1", name: "Pedro Macedo", phone: "(63) 99111-2233", email: "pedro@email.com", total_spent: 3450.00, total_orders: 4, total_os: 2, last_purchase_at: iso(3), tag: "vip" },
  { id: "cus-2", name: "Carla Mendes", phone: "(63) 99222-7788", email: "carla@email.com", total_spent: 1850.00, total_orders: 2, total_os: 3, last_purchase_at: iso(0), tag: "recorrente" },
  { id: "cus-3", name: "João Maranhão", phone: "(63) 99100-1111", total_spent: 6997.54, total_orders: 1, total_os: 0, last_purchase_at: iso(0), tag: "novo" },
  { id: "cus-4", name: "Mariana Costa", phone: "(63) 99100-2222", total_spent: 5870.00, total_orders: 3, total_os: 1, last_purchase_at: iso(1), tag: "recorrente" },
  { id: "cus-5", name: "Roberto Velho", phone: "(63) 99700-1122", total_spent: 12450.00, total_orders: 8, total_os: 3, last_purchase_at: iso(95), tag: "sumido" },
  { id: "cus-6", name: "Beatriz Souza", phone: "(63) 99444-9988", total_spent: 869.00, total_orders: 1, total_os: 1, last_purchase_at: iso(8), tag: "casual" },
];

export const STOCK_MOVEMENTS: StockMovement[] = [
  { id: "mov-1", sku: "GPU-MSI-4070S", product_name: "MSI RTX 4070 Super Ventus 12GB", type: "saida", qty: -1, unit_cost: 3800.00, total_cost: 3800.00, reason: "Venda ORD-2026-1231", reference_id: "ORD-2026-1231", created_at: iso(2), created_by: "Júnior" },
  { id: "mov-2", sku: "SSD-KS-NV2-1TB", product_name: "Kingston NV2 1TB NVMe PCIe 4.0", type: "saida", qty: -1, unit_cost: 320.00, total_cost: 320.00, reason: "Uso OS-2026-0039", reference_id: "OS-2026-0039", created_at: iso(5), created_by: "Lucas Pereira" },
  { id: "mov-3", sku: "RAM-CR-32-6000", product_name: "Corsair Vengeance 32GB DDR5 6000MHz", type: "entrada", qty: 5, unit_cost: 690.00, total_cost: 3450.00, reason: "Compra Fornecedor TecnoSul", created_at: iso(7), created_by: "Júnior" },
  { id: "mov-4", sku: "MS-AS-X11", product_name: "Mouse Attack Shark X11 Branco Sem Fio", type: "perda", qty: -2, unit_cost: 220.00, total_cost: 440.00, reason: "Avaria no estoque · embalagem danificada", created_at: iso(10), created_by: "Júnior" },
];

export const ACCOUNT_ENTRIES: AccountEntry[] = [
  // Receitas
  { id: "ae-1", type: "receita", category: "Venda PIX", description: "Pedido ORD-2026-1234 · Notebook Acer Nitro V15", amount: 6997.54, status: "pago", due_date: iso(0), paid_at: iso(0), reference_id: "ORD-2026-1234" },
  { id: "ae-2", type: "receita", category: "OS · Serviço", description: "OS-2026-0039 · Troca SSD Beatriz Souza", amount: 369.00, status: "pago", due_date: iso(5), paid_at: iso(5), reference_id: "OS-2026-0039" },
  { id: "ae-3", type: "receita", category: "Venda Cartão", description: "Pedido ORD-2026-1228 · PC Gamer Pro", amount: 7190.00, status: "pago", due_date: iso(4), paid_at: iso(4), reference_id: "ORD-2026-1228" },

  // Despesas
  { id: "ae-4", type: "despesa", category: "Fornecedor", description: "TecnoSul · 5x RAM Corsair 32GB DDR5", amount: 3450.00, status: "pago", due_date: iso(7), paid_at: iso(7) },
  { id: "ae-5", type: "despesa", category: "Aluguel", description: "Aluguel loja 104 Sul · maio/2026", amount: 1800.00, status: "pago", due_date: iso(2), paid_at: iso(2) },
  { id: "ae-6", type: "despesa", category: "Energia", description: "Energisa · maio/2026", amount: 380.00, status: "pendente", due_date: iso(-5) },
  { id: "ae-7", type: "despesa", category: "Internet", description: "Algar Telecom · maio/2026", amount: 220.00, status: "pago", due_date: iso(3), paid_at: iso(3) },
  // ae-8 e ae-9 removidos · comissões pendentes agora vêm de COMMISSIONS (status=apurada) em /admin/comissoes
  { id: "ae-10", type: "despesa", category: "Imposto", description: "Simples Nacional · DAS abril/2026", amount: 890.00, status: "atrasado", due_date: iso(15) },
  { id: "ae-11", type: "despesa", category: "Comissão Técnico", description: "Marcos Silva · abril/2026 · 2 OS quitadas", amount: 111.00, status: "pago", due_date: iso(28), paid_at: iso(28), reference_id: "com-paid-marcos-abril" },
];

// =============== Caixa + Comissão · mock data ===============

// Tempo "agora" pro mock (h:mm relativos)
const hour = (h: number, m = 0) => {
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};
const hourYesterday = (h: number, m = 0) => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};

export const CASH_SESSIONS: CashSession[] = [
  // Sessão de HOJE · aberta
  {
    id: "CX-2026-003",
    opened_at: hour(8, 30),
    opened_by: "Júnior",
    opening_amount: 150.00,
    status: "aberta",
  },
  // Ontem · fechada COM diferença (mostra fluxo de falta)
  {
    id: "CX-2026-002",
    opened_at: hourYesterday(8, 15),
    opened_by: "Júnior",
    opening_amount: 100.00,
    closed_at: hourYesterday(18, 30),
    closed_by: "Júnior",
    closing_amount_declared: 280.00,
    closing_amount_expected: 300.00,
    diff: -20.00,
    diff_note: "Falta de R$ 20 · diferença em moedas de troco · sem identificação clara",
    status: "fechada",
  },
  // Anteontem · fechada certa
  {
    id: "CX-2026-001",
    opened_at: iso(2).replace(/T.*/, "T08:00:00.000Z"),
    opened_by: "Júnior",
    opening_amount: 100.00,
    closed_at: iso(2).replace(/T.*/, "T18:15:00.000Z"),
    closed_by: "Júnior",
    closing_amount_declared: 450.00,
    closing_amount_expected: 450.00,
    diff: 0,
    status: "fechada",
  },
];

export const CASH_MOVEMENTS: CashMovement[] = [
  // Sessão de HOJE
  { id: "cm-1", session_id: "CX-2026-003", type: "abertura", amount: 150.00, note: "Troco inicial", created_at: hour(8, 30), created_by: "Júnior" },
  { id: "cm-2", session_id: "CX-2026-003", type: "venda", amount: 50.00, note: "Pasta térmica balcão", reference_id: "venda-balcao-1", created_at: hour(11, 12), created_by: "Júnior" },
  { id: "cm-3", session_id: "CX-2026-003", type: "sangria", amount: 200.00, note: "Depósito banco Bradesco", created_at: hour(14, 5), created_by: "Júnior" },
  { id: "cm-4", session_id: "CX-2026-003", type: "recebimento_os", amount: 369.00, note: "Beatriz Souza · OS quitada", reference_id: "OS-2026-0039", created_at: hour(16, 55), created_by: "Lucas Pereira" },
  // Sessão ONTEM (resumida)
  { id: "cm-5", session_id: "CX-2026-002", type: "abertura", amount: 100.00, created_at: hourYesterday(8, 15), created_by: "Júnior" },
  { id: "cm-6", session_id: "CX-2026-002", type: "venda", amount: 200.00, note: "Cabo HDMI + adaptador", created_at: hourYesterday(11, 30), created_by: "Júnior" },
  { id: "cm-7", session_id: "CX-2026-002", type: "fechamento", amount: 280.00, note: "Diff -20 · troco", created_at: hourYesterday(18, 30), created_by: "Júnior" },
];

// Payments derivados das OS quitadas + ORDERS pagos
export const PAYMENTS: Payment[] = [
  // OS-2026-0039 quitada em dinheiro hoje · linkada à sessão de caixa aberta
  { id: "pay-1", os_id: "OS-2026-0039", method: "dinheiro", amount: 369.00, received_at: hour(16, 55), cash_session_id: "CX-2026-003", status: "recebido" },
  // OS histórico
  { id: "pay-2", os_id: "OS-2026-0035", method: "pix", amount: 470.00, received_at: iso(28), status: "recebido" },
  { id: "pay-3", os_id: "OS-2026-0034", method: "cartao", amount: 600.00, received_at: iso(34), forecast_at: iso(34 - 30), status: "recebido" },
  // ORDERS · venda do site
  { id: "pay-4", order_id: "ORD-2026-1234", method: "pix", amount: 6997.54, received_at: iso(0), status: "recebido" },
  { id: "pay-5", order_id: "ORD-2026-1233", method: "cartao", amount: 2390.00, received_at: iso(1), forecast_at: iso(1 - 30), status: "previsto" },
  { id: "pay-6", order_id: "ORD-2026-1232", method: "pix", amount: 419.99, received_at: iso(1), status: "recebido" },
  { id: "pay-7", order_id: "ORD-2026-1231", method: "pix", amount: 4690.00, received_at: iso(2), status: "recebido" },
  { id: "pay-8", order_id: "ORD-2026-1228", method: "cartao", amount: 7190.00, received_at: iso(4), forecast_at: iso(4 - 30), status: "previsto" },
];

// Commissions · 1 por OS quitada · regra cravada
export const COMMISSIONS: Commission[] = [
  // OS-2026-0039 (Lucas · serviço 120 · 30%) · QUITADA hoje → apurada, ainda não paga
  { id: "com-1", os_id: "OS-2026-0039", technician_id: "tec-3", technician_name: "Lucas Pereira", base_value: 120.00, pct: 30, amount: 36.00, generated_at: iso(0), status: "apurada" },
  // OS-2026-0035 (Marcos · serviço 150) · quitada e PAGA mês passado
  { id: "com-2", os_id: "OS-2026-0035", technician_id: "tec-2", technician_name: "Marcos Silva", base_value: 150.00, pct: 30, amount: 45.00, generated_at: iso(28), status: "paga", paid_at: iso(28), paid_entry_id: "ae-11" },
  // OS-2026-0034 (Marcos · serviço 220) · quitada e PAGA mês passado
  { id: "com-3", os_id: "OS-2026-0034", technician_id: "tec-2", technician_name: "Marcos Silva", base_value: 220.00, pct: 30, amount: 66.00, generated_at: iso(34), status: "paga", paid_at: iso(28), paid_entry_id: "ae-11" },
];

// =============== Helpers caixa + comissão ===============

export function getActiveCashSession(): CashSession | undefined {
  return CASH_SESSIONS.find((s) => s.status === "aberta");
}

export function getMovementsBySession(sessionId: string): CashMovement[] {
  return CASH_MOVEMENTS.filter((m) => m.session_id === sessionId).sort((a, b) => a.created_at.localeCompare(b.created_at));
}

/** Calcula o esperado em espécie · abertura + entradas em dinheiro − sangrias */
export function computeExpected(session: CashSession): number {
  const moves = getMovementsBySession(session.id);
  return moves.reduce((acc, m) => {
    if (m.type === "fechamento") return acc;
    if (m.type === "sangria") return acc - m.amount;
    // abertura · venda · recebimento_os · suprimento somam
    return acc + m.amount;
  }, 0);
}

/** Comissões apuradas (devidas mas não pagas) por técnico */
export function getApuradaByTec(technicianId: string): Commission[] {
  return COMMISSIONS.filter((c) => c.technician_id === technicianId && c.status === "apurada");
}

/** Soma de comissões apuradas pra todos os técnicos */
export function getTotalApurada(): number {
  return COMMISSIONS.filter((c) => c.status === "apurada").reduce((s, c) => s + c.amount, 0);
}

/**
 * Computa os StockMovements que devem ser gerados quando uma OS quita.
 * Cravado 13/05 · regra D · estoque é fonte da verdade, baixa automática evita
 * o erro do GestãoClick de "vendeu peça mas estoque não saiu".
 * Idempotente · chame em transição payment_status: aberta → quitada.
 */
export function buildStockMovementsForOS(os: ServiceOrder): Omit<StockMovement, "id">[] {
  if (!os.parts_used || os.parts_used.length === 0) return [];
  return os.parts_used.map((p) => ({
    sku: p.sku,
    product_name: p.name,
    type: "saida" as const,
    qty: -p.qty,
    unit_cost: p.unit_cost,
    total_cost: p.unit_cost * p.qty,
    reason: `Uso ${os.id}`,
    reference_id: os.id,
    created_at: os.paid_at ?? new Date().toISOString(),
    created_by: os.technician_name ?? "Sistema",
  }));
}

// ====================== KPIs computados ======================

export function getKPIs() {
  const paidOrders = ORDERS.filter((o) => ["paid", "shipped", "delivered"].includes(o.status));
  const revenue30d = paidOrders.reduce((s, o) => s + o.total, 0);
  const avgTicket = paidOrders.length > 0 ? revenue30d / paidOrders.length : 0;
  const osOpen = SERVICE_ORDERS.filter((s) => !["entregue", "cancelado"].includes(s.status)).length;
  const osTotal = SERVICE_ORDERS.length;
  const receitas = ACCOUNT_ENTRIES.filter((e) => e.type === "receita" && e.status === "pago").reduce((s, e) => s + e.amount, 0);
  const despesas = ACCOUNT_ENTRIES.filter((e) => e.type === "despesa" && e.status === "pago").reduce((s, e) => s + e.amount, 0);
  const lucro = receitas - despesas;
  const pendingPagar = ACCOUNT_ENTRIES.filter((e) => e.type === "despesa" && ["pendente", "atrasado"].includes(e.status)).reduce((s, e) => s + e.amount, 0);
  const atrasados = ACCOUNT_ENTRIES.filter((e) => e.status === "atrasado").length;

  return {
    revenue30d,
    avgTicket,
    osOpen,
    osTotal,
    receitas,
    despesas,
    lucro,
    margin: receitas > 0 ? (lucro / receitas) * 100 : 0,
    pendingPagar,
    atrasados,
    sumidos: CUSTOMERS.filter((c) => c.tag === "sumido").length,
    customersVip: CUSTOMERS.filter((c) => c.tag === "vip").length,
  };
}

// ====================== Foco do Dia ======================

export type FocusItem = {
  type: "os_pronta" | "os_atrasada" | "pagamento_pendente" | "estoque_critico" | "cliente_sumido" | "comissao_pendente";
  title: string;
  count: number;
  href: string;
  urgency: "low" | "med" | "high";
};

export function getFocusItems(): FocusItem[] {
  const osPronto = SERVICE_ORDERS.filter((s) => s.status === "pronto").length;
  const today = Date.now();
  const osAtrasada = SERVICE_ORDERS.filter((s) => {
    if (!s.estimated_at) return false;
    if (["entregue", "cancelado"].includes(s.status)) return false;
    return new Date(s.estimated_at).getTime() < today;
  }).length;
  const pagamentoPendente = ORDERS.filter((o) => o.status === "pending").length;
  const atrasados = ACCOUNT_ENTRIES.filter((e) => e.status === "atrasado" && e.type === "despesa").length;
  const sumidos = CUSTOMERS.filter((c) => c.tag === "sumido").length;
  // Comissão pendente · lê de COMMISSIONS apurada · não de AccountEntry
  const comissaoApurada = COMMISSIONS.filter((c) => c.status === "apurada").length;

  const items: FocusItem[] = [];

  if (osPronto > 0) items.push({ type: "os_pronta", title: `${osPronto} OS pronta${osPronto > 1 ? "s" : ""} pra retirada · avise cliente`, count: osPronto, href: "/admin/os?status=pronto", urgency: "high" });
  if (osAtrasada > 0) items.push({ type: "os_atrasada", title: `${osAtrasada} OS passou do prazo previsto`, count: osAtrasada, href: "/admin/os?status=atrasada", urgency: "high" });
  if (pagamentoPendente > 0) items.push({ type: "pagamento_pendente", title: `${pagamentoPendente} pedido${pagamentoPendente > 1 ? "s" : ""} aguardando pagamento`, count: pagamentoPendente, href: "/admin/pedidos?status=pending", urgency: "med" });
  if (atrasados > 0) items.push({ type: "pagamento_pendente", title: `${atrasados} despesa${atrasados > 1 ? "s atrasadas" : " atrasada"}`, count: atrasados, href: "/admin/financeiro", urgency: "high" });
  if (sumidos > 0) items.push({ type: "cliente_sumido", title: `${sumidos} cliente${sumidos > 1 ? "s VIP sumido" : " VIP sumido"} · campanha de reativação`, count: sumidos, href: "/admin/clientes?tag=sumido", urgency: "med" });
  if (comissaoApurada > 0) items.push({ type: "comissao_pendente", title: `${comissaoApurada} comissão${comissaoApurada > 1 ? "s" : ""} apurada${comissaoApurada > 1 ? "s" : ""} aguardando pagamento`, count: comissaoApurada, href: "/admin/comissoes", urgency: "low" });

  return items;
}

// ====================== Labels ======================

export const SERVICE_STATUS_LABEL: Record<ServiceOrderStatus, string> = {
  aguardando: "Aguardando",
  em_reparo: "Em reparo",
  pronto: "Pronto",
  entregue: "Entregue",
  cancelado: "Cancelado",
};

export const SERVICE_STATUS_COLOR: Record<ServiceOrderStatus, string> = {
  aguardando: "bg-orange-500/15 text-orange-400 border-orange-400/40",
  em_reparo: "bg-purple-500/15 text-purple-400 border-purple-400/40",
  pronto: "bg-starteq-pix/15 text-starteq-pix border-starteq-pix/40",
  entregue: "bg-starteq-line text-starteq-muted",
  cancelado: "bg-starteq-red/15 text-starteq-red border-starteq-red/40",
};

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Aguardando pgto",
  paid: "Pago",
  processing: "Em preparo",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado",
  refunded: "Estornado",
};

export const ORDER_STATUS_COLOR: Record<OrderStatus, string> = {
  pending: "bg-orange-500/15 text-orange-400 border-orange-400/40",
  paid: "bg-starteq-pix/15 text-starteq-pix border-starteq-pix/40",
  processing: "bg-blue-500/15 text-blue-400 border-blue-400/40",
  shipped: "bg-purple-500/15 text-purple-400 border-purple-400/40",
  delivered: "bg-starteq-line text-starteq-muted",
  cancelled: "bg-starteq-red/15 text-starteq-red border-starteq-red/40",
  refunded: "bg-starteq-red/15 text-starteq-red border-starteq-red/40",
};

export const CUSTOMER_TAG_LABEL: Record<Customer["tag"], string> = {
  vip: "VIP",
  recorrente: "Recorrente",
  casual: "Casual",
  novo: "Novo",
  sumido: "Sumido",
};

export const CUSTOMER_TAG_COLOR: Record<Customer["tag"], string> = {
  vip: "bg-starteq-gold/15 text-starteq-gold border-starteq-gold/40",
  recorrente: "bg-starteq-pix/15 text-starteq-pix border-starteq-pix/40",
  casual: "bg-starteq-line text-starteq-text",
  novo: "bg-blue-500/15 text-blue-400 border-blue-400/40",
  sumido: "bg-starteq-red/15 text-starteq-red border-starteq-red/40",
};
