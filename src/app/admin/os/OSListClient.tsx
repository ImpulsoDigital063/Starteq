"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { SERVICE_STATUS_LABEL, SERVICE_STATUS_COLOR, TECHNICIANS, type ServiceOrder, type ServiceOrderStatus } from "@/lib/admin-mock";

type QuickFilter = "todos" | "hoje" | "prontas" | "atrasadas";
type StatusFilter = ServiceOrderStatus | "todos";

const STATUS_TABS: { slug: StatusFilter; label: string }[] = [
  { slug: "todos", label: "Todas" },
  { slug: "aguardando", label: "Aguardando" },
  { slug: "em_reparo", label: "Em reparo" },
  { slug: "pronto", label: "Pronto" },
  { slug: "entregue", label: "Entregue" },
];

const QUICK_TABS: { slug: QuickFilter; label: string; icon: import("@/components/Icon").IconName }[] = [
  { slug: "hoje", label: "Hoje", icon: "zap" },
  { slug: "prontas", label: "Prontas", icon: "check" },
  { slug: "atrasadas", label: "Atrasadas", icon: "alert" },
];

export function OSListClient({ initialOrders }: { initialOrders: ServiceOrder[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos");
  const [quickFilter, setQuickFilter] = useState<QuickFilter | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filtered = useMemo(() => {
    let items = orders;

    // Quick filter sobrescreve status
    if (quickFilter === "hoje") {
      items = items.filter((o) => new Date(o.created_at) >= today);
    } else if (quickFilter === "prontas") {
      items = items.filter((o) => o.status === "pronto");
    } else if (quickFilter === "atrasadas") {
      items = items.filter((o) => {
        if (!o.estimated_at) return false;
        if (["entregue", "cancelado"].includes(o.status)) return false;
        return new Date(o.estimated_at).getTime() < Date.now();
      });
    } else if (statusFilter !== "todos") {
      items = items.filter((o) => o.status === statusFilter);
    }

    return items.sort((a, b) => b.created_at.localeCompare(a.created_at));
  }, [orders, statusFilter, quickFilter, today]);

  function setQuick(f: QuickFilter) {
    setQuickFilter(quickFilter === f ? null : f);
    setStatusFilter("todos");
  }

  function setStatus(s: StatusFilter) {
    setStatusFilter(s);
    setQuickFilter(null);
  }

  function avisarPronto(id: string) {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              status: "pronto" as const,
              whatsapp_log: [
                ...(o.whatsapp_log ?? []),
                {
                  id: `w-${Date.now()}`,
                  sent_at: new Date().toISOString(),
                  template: "os_pronto" as const,
                  text: `${o.customer_name}, seu ${o.device} está pronto! Pode retirar a partir das 14h. Total: R$ ${o.total.toFixed(2)} (PIX 15% off = R$ ${(o.total * 0.85).toFixed(2)}).`,
                  status: "sent" as const,
                },
              ],
            }
          : o
      )
    );
  }

  function marcarEntregue(id: string) {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, status: "entregue" as const, delivered_at: new Date().toISOString() }
          : o
      )
    );
  }

  function atribuirTecnico(id: string, tecId: string, tecName: string) {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, technician_id: tecId, technician_name: tecName, commission_pct: 30 } : o,
      ),
    );
  }

  function criarOS(data: { customer_name: string; customer_phone: string; device: string; problem: string }) {
    const newId = `OS-2026-${String(orders.length + 1).padStart(4, "0")}`;
    setOrders((prev) => [
      {
        id: newId,
        customer_name: data.customer_name,
        customer_phone: data.customer_phone,
        device: data.device,
        problem: data.problem,
        status: "aguardando",
        commission_pct: 0,
        service_value: 0,
        parts_value: 0,
        total: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        warranty_days: 90,
      },
      ...prev,
    ]);
    setShowNewModal(false);
  }

  const counts = {
    hoje: orders.filter((o) => new Date(o.created_at) >= today).length,
    prontas: orders.filter((o) => o.status === "pronto").length,
    atrasadas: orders.filter((o) => {
      if (!o.estimated_at) return false;
      if (["entregue", "cancelado"].includes(o.status)) return false;
      return new Date(o.estimated_at).getTime() < Date.now();
    }).length,
  };

  return (
    <>
      <header className="mb-5 flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h1 className="font-space text-2xl lg:text-3xl font-black text-starteq-bone">Ordens de Serviço</h1>
          <p className="text-starteq-muted mt-1 text-sm">{orders.length} OS · {filtered.length} no filtro</p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="inline-flex items-center gap-2 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-space font-bold tracking-wide uppercase text-xs px-5 py-3 rounded-lg transition-all"
        >
          <Icon name="wrench" size={16} /> Nova OS
        </button>
      </header>

      {/* Filtros RÁPIDOS · destaque */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {QUICK_TABS.map((q) => {
          const active = quickFilter === q.slug;
          const count = counts[q.slug as keyof typeof counts];
          return (
            <button
              key={q.slug}
              onClick={() => setQuick(q.slug)}
              className={`p-3 rounded-lg border transition-all text-left ${
                active
                  ? q.slug === "atrasadas"
                    ? "bg-starteq-red/10 border-starteq-red text-starteq-red"
                    : "bg-starteq-gold/10 border-starteq-gold text-starteq-gold"
                  : "bg-starteq-card border-starteq-line hover:border-starteq-gold/40 text-starteq-text"
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon name={q.icon} size={16} />
                <span className="font-space font-bold uppercase tracking-wider text-xs">{q.label}</span>
              </div>
              <div className="font-space font-black text-xl mt-1">{count}</div>
            </button>
          );
        })}
      </div>

      {/* Status filters · secundário */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
        {STATUS_TABS.map((s) => {
          const active = !quickFilter && statusFilter === s.slug;
          return (
            <button
              key={s.slug}
              onClick={() => setStatus(s.slug)}
              className={`px-3 py-1.5 rounded-md text-[11px] font-space font-bold uppercase tracking-wider whitespace-nowrap border transition-colors ${
                active
                  ? "bg-starteq-gold text-starteq-black border-starteq-gold"
                  : "bg-transparent text-starteq-muted border-starteq-line hover:border-starteq-gold/40 hover:text-starteq-text"
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Lista */}
      <div className="bg-starteq-card border border-starteq-line rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-starteq-muted">
            Nenhuma OS encontrada nesse filtro.
          </div>
        ) : (
          <div className="divide-y divide-starteq-line">
            {filtered.map((os) => {
              const isAtrasada =
                os.estimated_at &&
                !["entregue", "cancelado"].includes(os.status) &&
                new Date(os.estimated_at).getTime() < Date.now();

              return (
                <div key={os.id} className="p-4 hover:bg-starteq-coal/40 transition-colors">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <Link href={`/admin/os/${os.id}`} className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-mono text-xs text-starteq-gold">{os.id}</span>
                        <span className={`text-[10px] font-space font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${SERVICE_STATUS_COLOR[os.status]}`}>
                          {SERVICE_STATUS_LABEL[os.status]}
                        </span>
                        {isAtrasada && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-space font-bold uppercase tracking-wider text-starteq-red">
                            <Icon name="alert" size={10} /> Atrasada
                          </span>
                        )}
                      </div>
                      <div className="font-display font-semibold text-sm text-starteq-bone">{os.customer_name}</div>
                      <div className="text-xs text-starteq-muted truncate mt-0.5">{os.device}</div>
                      <div className="text-xs text-starteq-muted truncate mt-0.5">{os.problem}</div>
                      {os.total > 0 && (
                        <div className="text-xs text-starteq-gold font-mono mt-1.5">
                          R$ {os.total.toFixed(2)}
                          {os.technician_name && <span className="text-starteq-muted"> · {os.technician_name}</span>}
                        </div>
                      )}
                    </Link>

                    {/* AÇÕES 1-CLICK */}
                    <div className="flex flex-wrap gap-2">
                      {(os.status === "em_reparo" || os.status === "aguardando") && (
                        <button
                          onClick={() => avisarPronto(os.id)}
                          className="inline-flex items-center gap-1.5 bg-starteq-pix/10 text-starteq-pix border border-starteq-pix/40 hover:bg-starteq-pix/20 font-space font-bold uppercase text-[10px] px-3 py-2 rounded-lg transition-all"
                          title="Marca como pronto + dispara WhatsApp pro cliente"
                        >
                          <Icon name="whatsapp" size={12} /> Avisar Pronto
                        </button>
                      )}
                      {os.status === "pronto" && (
                        <button
                          onClick={() => marcarEntregue(os.id)}
                          className="inline-flex items-center gap-1.5 bg-starteq-gold/10 text-starteq-gold border border-starteq-gold/40 hover:bg-starteq-gold/20 font-space font-bold uppercase text-[10px] px-3 py-2 rounded-lg transition-all"
                        >
                          <Icon name="check" size={12} /> Marcar Entregue
                        </button>
                      )}
                      <a
                        href={`https://wa.me/55${os.customer_phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Oi ${os.customer_name}, sobre sua OS ${os.id}...`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 bg-starteq-card border border-starteq-line hover:border-starteq-gold/40 text-starteq-text hover:text-starteq-gold font-space font-bold uppercase text-[10px] px-3 py-2 rounded-lg transition-all"
                      >
                        <Icon name="whatsapp" size={12} />
                      </a>
                      <AtribuirTecnicoButton os={os} onAssign={(tecId, tecName) => atribuirTecnico(os.id, tecId, tecName)} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL · Nova OS rápida */}
      {showNewModal && <NewOSModal onClose={() => setShowNewModal(false)} onSubmit={criarOS} />}
    </>
  );
}

function NewOSModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (data: { customer_name: string; customer_phone: string; device: string; problem: string }) => void }) {
  const [form, setForm] = useState({ customer_name: "", customer_phone: "", device: "", problem: "" });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-starteq-card border border-starteq-gold/40 rounded-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-space font-bold text-xl text-starteq-bone inline-flex items-center gap-2">
            <Icon name="wrench" size={20} className="text-starteq-gold" /> Nova OS rápida
          </h2>
          <button onClick={onClose} className="text-starteq-muted hover:text-starteq-bone">
            <Icon name="x" size={18} />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!form.customer_name || !form.customer_phone || !form.device) return;
            onSubmit(form);
          }}
          className="space-y-3"
        >
          <Field label="Nome do cliente" value={form.customer_name} onChange={(v) => setForm({ ...form, customer_name: v })} placeholder="Pedro Macedo" required />
          <Field label="WhatsApp" value={form.customer_phone} onChange={(v) => setForm({ ...form, customer_phone: v })} placeholder="(63) 99111-2233" required />
          <Field label="Equipamento" value={form.device} onChange={(v) => setForm({ ...form, device: v })} placeholder="Notebook Acer Nitro 5" required />
          <Field label="Problema relatado" value={form.problem} onChange={(v) => setForm({ ...form, problem: v })} placeholder="Não liga · tela preta" textarea />

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-starteq-card border border-starteq-line text-starteq-bone font-space font-bold uppercase text-xs px-4 py-3 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-starteq-gold text-starteq-black hover:bg-starteq-gold-dk font-space font-bold uppercase text-xs px-4 py-3 rounded-lg"
            >
              Criar OS
            </button>
          </div>

          <p className="text-[10px] text-starteq-muted text-center pt-1">
            A OS entra como &quot;Aguardando&quot;. Você completa diagnóstico + orçamento depois.
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, required, textarea }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean; textarea?: boolean }) {
  const cls = "w-full px-3 py-2.5 rounded-lg bg-starteq-black border border-starteq-line focus:border-starteq-gold focus:outline-none text-starteq-bone text-sm";
  return (
    <div>
      <label className="block text-[10px] font-space font-bold uppercase tracking-wider text-starteq-muted mb-1">{label}{required && " *"}</label>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={2} className={cls} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} className={cls} />
      )}
    </div>
  );
}


function AtribuirTecnicoButton({
  os,
  onAssign,
}: {
  os: ServiceOrder;
  onAssign: (tecId: string, tecName: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const tecsAtivos = TECHNICIANS.filter((t) => t.active);

  const select = (tecId: string, tecName: string, tecPhone: string) => {
    onAssign(tecId, tecName);
    setOpen(false);
    // Pré-monta msg WhatsApp pro técnico (abre em nova aba)
    const text = encodeURIComponent(
      `${tecName.split(" ")[0]}, nova OS atribuída pra você: ${os.id} · Cliente: ${os.customer_name} · ${os.device}. Verifica no painel.`,
    );
    window.open(`https://wa.me/55${tecPhone.replace(/\D/g, "")}?text=${text}`, "_blank");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 bg-starteq-card border border-starteq-line hover:border-starteq-gold/40 text-starteq-text hover:text-starteq-gold font-space font-bold uppercase text-[10px] px-3 py-2 rounded-lg transition-all"
        title="Atribuir OS pra um técnico"
      >
        <Icon name="user" size={12} /> {os.technician_name ? "Trocar técnico" : "Atribuir técnico"}
      </button>
      {open && (
        <>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
            aria-label="Fechar"
          />
          <div className="absolute right-0 mt-1 z-50 w-56 bg-starteq-coal border border-starteq-line rounded-lg shadow-xl py-1">
            {tecsAtivos.map((t) => (
              <button
                key={t.id}
                onClick={() => select(t.id, t.name, t.phone)}
                className={`w-full text-left px-3 py-2 text-xs hover:bg-starteq-card flex items-center justify-between gap-2 ${
                  os.technician_id === t.id ? "text-starteq-gold" : "text-starteq-bone"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="font-display font-semibold truncate">{t.name}</div>
                  <div className="text-[10px] text-starteq-muted">{t.commission_default}% comissão</div>
                </div>
                {os.technician_id === t.id && <Icon name="check" size={12} />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
