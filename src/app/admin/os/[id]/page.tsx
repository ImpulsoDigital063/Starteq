import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { SERVICE_ORDERS, SERVICE_STATUS_LABEL, SERVICE_STATUS_COLOR } from "@/lib/admin-mock";
import { NFeActions } from "../../nfe/NFeActions";

type Params = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return SERVICE_ORDERS.map((o) => ({ id: o.id }));
}

export default async function OSDetail({ params }: Params) {
  const { id } = await params;
  const os = SERVICE_ORDERS.find((o) => o.id === id);
  if (!os) notFound();

  const isAtrasada =
    os.estimated_at &&
    !["entregue", "cancelado"].includes(os.status) &&
    new Date(os.estimated_at).getTime() < Date.now();

  return (
    <>
      <Link href="/admin/os" className="inline-flex items-center gap-1 text-xs text-starteq-muted hover:text-starteq-gold mb-4 font-space font-bold uppercase tracking-wider">
        <Icon name="arrow-right" size={12} className="rotate-180" /> Voltar
      </Link>

      <header className="mb-6">
        <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
          <div>
            <div className="font-mono text-sm text-starteq-gold">{os.id}</div>
            <h1 className="font-space text-2xl lg:text-3xl font-black text-starteq-bone mt-1">{os.customer_name}</h1>
            <div className="text-starteq-muted text-sm mt-0.5">{os.customer_phone}</div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`text-[10px] font-space font-bold uppercase tracking-wider px-2 py-1 rounded border ${SERVICE_STATUS_COLOR[os.status]}`}>
              {SERVICE_STATUS_LABEL[os.status]}
            </span>
            {isAtrasada && (
              <span className="inline-flex items-center gap-1 text-[10px] font-space font-bold uppercase tracking-wider text-starteq-red">
                <Icon name="alert" size={10} /> Atrasada
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <a
            href={`https://wa.me/55${os.customer_phone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-starteq-pix/10 text-starteq-pix border border-starteq-pix/40 hover:bg-starteq-pix/20 font-space font-bold uppercase text-xs px-4 py-2.5 rounded-lg"
          >
            <Icon name="whatsapp" size={14} /> WhatsApp
          </a>
          <Link
            href={`/admin/os/${os.id}/etiqueta`}
            target="_blank"
            className="inline-flex items-center gap-2 bg-starteq-card border border-starteq-line hover:border-starteq-gold/40 text-starteq-bone font-space font-bold uppercase text-xs px-4 py-2.5 rounded-lg"
          >
            <Icon name="file" size={14} /> Imprimir etiqueta
          </Link>
          <NFeActions reference={os.id} customer={os.customer_name} value={os.total} type="os" />
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card title="Equipamento e problema" icon="wrench">
          <Field label="Equipamento" value={os.device} />
          <Field label="Problema relatado" value={os.problem} multiline />
          {os.diagnosis && <Field label="Diagnóstico" value={os.diagnosis} multiline />}
          {os.notes && <Field label="Notas internas" value={os.notes} multiline />}
        </Card>

        <Card title="Técnico e valores" icon="user">
          <Field label="Técnico" value={os.technician_name ?? "—"} />
          <Field label="Comissão" value={`${os.commission_pct}%`} />
          <Field label="Serviço" value={`R$ ${os.service_value.toFixed(2)}`} />
          <Field label="Peças" value={`R$ ${os.parts_value.toFixed(2)}`} />
          <div className="border-t border-starteq-line mt-2 pt-2">
            <div className="flex items-center justify-between font-space font-black">
              <span className="text-starteq-bone">Total</span>
              <span className="text-starteq-gold text-lg">R$ {os.total.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-starteq-muted">PIX (15% off)</span>
              <span className="text-starteq-pix font-mono">R$ {(os.total * 0.85).toFixed(2)}</span>
            </div>
          </div>
        </Card>

        <Card title="Datas" icon="info">
          <Field label="Criada em" value={new Date(os.created_at).toLocaleString("pt-BR")} />
          <Field label="Atualizada em" value={new Date(os.updated_at).toLocaleString("pt-BR")} />
          {os.estimated_at && <Field label="Prazo previsto" value={new Date(os.estimated_at).toLocaleDateString("pt-BR")} />}
          {os.delivered_at && <Field label="Entregue em" value={new Date(os.delivered_at).toLocaleString("pt-BR")} />}
          <Field label="Garantia" value={`${os.warranty_days ?? 90} dias por peça`} />
        </Card>

        <Card title="WhatsApp · histórico" icon="whatsapp">
          {!os.whatsapp_log || os.whatsapp_log.length === 0 ? (
            <div className="text-sm text-starteq-muted py-4 text-center">
              Sem mensagens enviadas ainda.
            </div>
          ) : (
            <div className="space-y-3">
              {os.whatsapp_log.map((m) => (
                <div key={m.id} className="bg-starteq-coal border border-starteq-line rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-space font-bold uppercase tracking-wider text-starteq-gold">
                      {m.template.replace(/_/g, " ")}
                    </span>
                    <span className={`text-[10px] font-space font-bold uppercase ${m.status === "read" ? "text-starteq-pix" : "text-starteq-muted"}`}>
                      {m.status}
                    </span>
                  </div>
                  <p className="text-xs text-starteq-text italic leading-relaxed">&quot;{m.text}&quot;</p>
                  <div className="text-[10px] text-starteq-muted mt-1.5 font-mono">
                    {new Date(m.sent_at).toLocaleString("pt-BR")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </>
  );
}

function Card({ title, icon, children }: { title: string; icon: import("@/components/Icon").IconName; children: React.ReactNode }) {
  return (
    <div className="bg-starteq-card border border-starteq-line rounded-xl p-5">
      <h3 className="font-space font-bold text-starteq-bone inline-flex items-center gap-2 mb-3">
        <Icon name={icon} size={18} className="text-starteq-gold" /> {title}
      </h3>
      {children}
    </div>
  );
}

function Field({ label, value, multiline = false }: { label: string; value: string; multiline?: boolean }) {
  return (
    <div className={`py-2 border-b border-starteq-line last:border-0 ${multiline ? "" : "flex items-start justify-between gap-3"}`}>
      <span className="text-starteq-muted text-xs uppercase tracking-wider font-space font-bold">{label}</span>
      <span className={`text-starteq-bone text-sm ${multiline ? "block mt-1" : "text-right"}`}>{value}</span>
    </div>
  );
}
