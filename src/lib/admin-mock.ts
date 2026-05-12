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
  total: number;
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

export type Order = {
  id: string;
  customer_name: string;
  customer_phone: string;
  total: number;
  status: OrderStatus;
  payment_method: "pix" | "card" | "boleto";
  items_count: number;
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

// ====================== MOCK DATA ======================

const today = new Date();
const iso = (daysAgo = 0) => {
  const d = new Date(today);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
};

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
    total: 830.00,
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
    total: 369.00,
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
    created_at: iso(0),
    updated_at: iso(0),
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
  { id: "ae-8", type: "despesa", category: "Comissão Técnico", description: "Marcos Silva · 8 OS · 30%", amount: 1240.00, status: "pendente", due_date: iso(-3) },
  { id: "ae-9", type: "despesa", category: "Comissão Técnico", description: "Lucas Pereira · 5 OS · 30%", amount: 720.00, status: "pendente", due_date: iso(-3) },
  { id: "ae-10", type: "despesa", category: "Imposto", description: "Simples Nacional · DAS abril/2026", amount: 890.00, status: "atrasado", due_date: iso(15) },
];

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
  const comissaoPendente = ACCOUNT_ENTRIES.filter((e) => e.status === "pendente" && e.category === "Comissão Técnico").length;

  const items: FocusItem[] = [];

  if (osPronto > 0) items.push({ type: "os_pronta", title: `${osPronto} OS pronta${osPronto > 1 ? "s" : ""} pra retirada · avise cliente`, count: osPronto, href: "/admin/os?status=pronto", urgency: "high" });
  if (osAtrasada > 0) items.push({ type: "os_atrasada", title: `${osAtrasada} OS passou do prazo previsto`, count: osAtrasada, href: "/admin/os?status=atrasada", urgency: "high" });
  if (pagamentoPendente > 0) items.push({ type: "pagamento_pendente", title: `${pagamentoPendente} pedido${pagamentoPendente > 1 ? "s" : ""} aguardando pagamento`, count: pagamentoPendente, href: "/admin/pedidos?status=pending", urgency: "med" });
  if (atrasados > 0) items.push({ type: "comissao_pendente", title: `${atrasados} despesa${atrasados > 1 ? "s atrasadas" : " atrasada"}`, count: atrasados, href: "/admin/financeiro", urgency: "high" });
  if (sumidos > 0) items.push({ type: "cliente_sumido", title: `${sumidos} cliente${sumidos > 1 ? "s VIP sumido" : " VIP sumido"} · campanha de reativação`, count: sumidos, href: "/admin/clientes?tag=sumido", urgency: "med" });
  if (comissaoPendente > 0) items.push({ type: "comissao_pendente", title: `${comissaoPendente} comissão${comissaoPendente > 1 ? "s" : ""} pendente${comissaoPendente > 1 ? "s" : ""} de pagamento`, count: comissaoPendente, href: "/admin/financeiro?cat=comissao", urgency: "low" });

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
