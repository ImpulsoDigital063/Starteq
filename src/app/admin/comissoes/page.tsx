import Link from "next/link";
import { redirect } from "next/navigation";
import { Icon } from "@/components/Icon";
import { getServerSession } from "@/lib/admin-auth";
import {
  COMMISSIONS,
  TECHNICIANS,
  SERVICE_ORDERS,
  type Commission,
  type Technician,
} from "@/lib/admin-mock";
import { ComissoesActions } from "./ComissoesActions";

export const metadata = {
  title: "Comissões · Painel Starteq",
};

type Bucket = {
  tec: Technician;
  apurada: Commission[];
  total: number;
};

export default async function ComissoesPage() {
  const session = await getServerSession();
  if (!session) redirect("/admin/login");

  // Agrupa comissões apuradas por técnico
  const buckets: Bucket[] = TECHNICIANS
    .filter((t) => t.active && t.commission_default > 0)
    .map((tec) => {
      const apurada = COMMISSIONS.filter((c) => c.technician_id === tec.id && c.status === "apurada");
      return {
        tec,
        apurada,
        total: apurada.reduce((s, c) => s + c.amount, 0),
      };
    })
    .filter((b) => b.apurada.length > 0);

  const totalGeral = buckets.reduce((s, b) => s + b.total, 0);

  // Histórico · últimas pagas
  const ultimasPagas = COMMISSIONS
    .filter((c) => c.status === "paga")
    .sort((a, b) => (b.paid_at ?? "").localeCompare(a.paid_at ?? ""))
    .slice(0, 8);

  return (
    <>
      <header className="mb-6 flex items-end justify-between flex-wrap gap-3">
        <div>
          <div className="text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-1">
            Folha de comissão
          </div>
          <h1 className="font-space text-2xl lg:text-3xl font-black text-starteq-bone">
            Comissões a pagar
          </h1>
          <p className="text-starteq-muted mt-1 text-sm">
            Só OS quitadas geram comissão · cancelamento não entra na conta
          </p>
        </div>
        <div className="bg-starteq-card border border-starteq-gold/40 rounded-xl px-4 py-2.5">
          <div className="text-[10px] uppercase tracking-wider font-space font-bold text-starteq-muted">Total devido</div>
          <div className="text-2xl font-space font-black text-starteq-gold font-mono">{brl(totalGeral)}</div>
        </div>
      </header>

      {buckets.length === 0 ? (
        <div className="bg-starteq-card border border-starteq-line rounded-xl p-8 text-center max-w-md mx-auto">
          <Icon name="check" size={32} className="text-starteq-pix mx-auto mb-3" />
          <h3 className="font-space font-black text-starteq-bone text-lg mb-1">Tudo em dia</h3>
          <p className="text-starteq-muted text-sm">
            Nenhuma comissão apurada pendente. Toda comissão de OS quitada já foi paga.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {buckets.map((b) => (
            <TecBucket key={b.tec.id} bucket={b} />
          ))}
        </div>
      )}

      {/* Histórico */}
      {ultimasPagas.length > 0 && (
        <section className="mt-8">
          <h2 className="font-space text-xs font-bold uppercase tracking-[0.2em] text-starteq-muted mb-3">
            Últimas pagas
          </h2>
          <div className="bg-starteq-card border border-starteq-line rounded-xl overflow-hidden">
            <div className="divide-y divide-starteq-line">
              {ultimasPagas.map((c) => (
                <div key={c.id} className="px-5 py-3 flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-xs text-starteq-gold">{c.os_id}</div>
                    <div className="text-sm text-starteq-bone truncate">{c.technician_name}</div>
                    <div className="text-[10px] text-starteq-muted">
                      Apurada em {fmtDate(c.generated_at)} · paga em {c.paid_at ? fmtDate(c.paid_at) : "—"}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-mono text-sm text-starteq-pix font-bold">+ {brl(c.amount)}</div>
                    <div className="text-[10px] text-starteq-muted">{c.pct}% sobre {brl(c.base_value)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function TecBucket({ bucket }: { bucket: Bucket }) {
  const { tec, apurada, total } = bucket;
  return (
    <div className="bg-starteq-card border border-starteq-line rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-starteq-line bg-starteq-coal flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="font-display font-bold text-starteq-bone">{tec.name}</div>
          <div className="text-xs text-starteq-muted">
            {apurada.length} OS quitada(s) · {tec.commission_default}% sobre serviço
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider font-space font-bold text-starteq-muted">A pagar</div>
            <div className="font-mono text-xl font-space font-black text-starteq-gold">{brl(total)}</div>
          </div>
          <ComissoesActions
            tecName={tec.name}
            total={total}
            comIds={apurada.map((c) => c.id)}
          />
        </div>
      </div>

      <div className="divide-y divide-starteq-line">
        {apurada.map((c) => {
          const os = SERVICE_ORDERS.find((o) => o.id === c.os_id);
          return (
            <Link
              key={c.id}
              href={`/admin/os/${c.os_id}`}
              className="px-5 py-3 flex items-center justify-between gap-3 hover:bg-starteq-coal/50"
            >
              <div className="flex-1 min-w-0">
                <div className="font-mono text-xs text-starteq-gold">{c.os_id}</div>
                <div className="text-sm text-starteq-bone truncate">
                  {os?.customer_name ?? "—"} · {os?.device ?? "—"}
                </div>
                <div className="text-[10px] text-starteq-muted mt-0.5">
                  Apurada {fmtDate(c.generated_at)} · base {brl(c.base_value)} × {c.pct}%
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-mono text-sm text-starteq-gold font-bold">+ {brl(c.amount)}</div>
                <span className="mt-1 inline-block text-[10px] font-space font-bold uppercase tracking-wider px-2 py-0.5 rounded border bg-starteq-gold/15 text-starteq-gold border-starteq-gold/40">
                  Apurada
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function brl(n: number) {
  return `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR");
}
