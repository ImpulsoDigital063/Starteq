import { redirect } from "next/navigation";
import { Icon } from "@/components/Icon";
import { getServerSession } from "@/lib/admin-auth";
import { COUPONS, type Coupon } from "@/lib/admin-mock";
import { CuponsActions } from "./CuponsActions";

export const metadata = {
  title: "Cupons · Painel Starteq",
};

const TARGET_LABEL: Record<Coupon["target"], string> = {
  servico: "Mão de obra",
  produto: "Peça / produto",
  total: "Total (rateado)",
};

type Tone = "ativo" | "off" | "warn";
function couponStatus(c: Coupon, now = new Date()): { label: string; tone: Tone } {
  if (!c.active) return { label: "Inativo", tone: "off" };
  if (c.valid_until && new Date(c.valid_until) < now) return { label: "Expirado", tone: "off" };
  if (c.valid_from && new Date(c.valid_from) > now) return { label: "Agendado", tone: "warn" };
  if (c.usage_limit != null && c.used_count >= c.usage_limit) return { label: "Esgotado", tone: "off" };
  return { label: "Ativo", tone: "ativo" };
}

const TONE_CLASS: Record<Tone, string> = {
  ativo: "bg-starteq-pix/15 text-starteq-pix border-starteq-pix/40",
  warn: "bg-starteq-gold/15 text-starteq-gold border-starteq-gold/40",
  off: "bg-starteq-line/40 text-starteq-muted border-starteq-line",
};

export default async function CuponsPage() {
  const session = await getServerSession();
  if (!session) redirect("/admin/login");

  const now = new Date();
  const ativos = COUPONS.filter((c) => couponStatus(c, now).tone === "ativo").length;

  return (
    <>
      <header className="mb-6 flex items-end justify-between flex-wrap gap-3">
        <div>
          <div className="text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-1">
            Descontos
          </div>
          <h1 className="font-space text-2xl lg:text-3xl font-black text-starteq-bone">
            Cupons de desconto
          </h1>
          <p className="text-starteq-muted mt-1 text-sm">
            {ativos} ativo{ativos === 1 ? "" : "s"} · o desconto sai da margem da loja, nunca da comissão do técnico
          </p>
        </div>
        <CuponsActions />
      </header>

      {/* Regra em destaque · o que faz o cupom ser confiável */}
      <div className="bg-starteq-card border border-starteq-gold/30 rounded-xl p-4 mb-6 flex items-start gap-3">
        <Icon name="shield" size={18} className="text-starteq-gold flex-shrink-0 mt-0.5" />
        <div className="text-sm text-starteq-text">
          <span className="font-space font-bold text-starteq-bone">Como o desconto se comporta:</span>{" "}
          a comissão do técnico é sempre calculada sobre o serviço <span className="text-starteq-bone font-semibold">cheio</span> — a loja
          absorve o cupom. No financeiro entra o valor líquido, e na nota o desconto abate o serviço (NFS-e) ou a peça (NFC-e)
          conforme o alvo do cupom.
        </div>
      </div>

      {COUPONS.length === 0 ? (
        <div className="bg-starteq-card border border-starteq-line rounded-xl p-8 text-center max-w-md mx-auto">
          <Icon name="tag" size={32} className="text-starteq-muted mx-auto mb-3" />
          <h3 className="font-space font-black text-starteq-bone text-lg mb-1">Nenhum cupom ainda</h3>
          <p className="text-starteq-muted text-sm">Crie o primeiro cupom pra usar na OS ou na venda de balcão.</p>
        </div>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {COUPONS.map((c) => {
            const st = couponStatus(c, now);
            return (
              <div key={c.id} className="bg-starteq-card border border-starteq-line rounded-xl p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon name="tag" size={16} className="text-starteq-gold flex-shrink-0" />
                    <span className="font-mono font-bold text-starteq-gold tracking-wide truncate">{c.code}</span>
                  </div>
                  <span className={`text-[10px] font-space font-bold uppercase tracking-wider px-2 py-0.5 rounded border flex-shrink-0 ${TONE_CLASS[st.tone]}`}>
                    {st.label}
                  </span>
                </div>

                <div className="text-sm text-starteq-bone mb-3">{c.description}</div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                  <Row label="Desconto" value={c.kind === "percentual" ? `${c.value}%` : brl(c.value)} />
                  <Row label="Incide sobre" value={TARGET_LABEL[c.target]} />
                  {c.min_subtotal != null && <Row label="Mínimo" value={brl(c.min_subtotal)} />}
                  {c.max_discount != null && <Row label="Teto" value={brl(c.max_discount)} />}
                  <Row
                    label="Usos"
                    value={c.usage_limit != null ? `${c.used_count} / ${c.usage_limit}` : `${c.used_count} · ilimitado`}
                  />
                  {c.valid_until != null && <Row label="Válido até" value={fmtDate(c.valid_until)} />}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-starteq-muted">{label}</span>
      <span className="text-starteq-text font-medium text-right">{value}</span>
    </div>
  );
}

function brl(n: number) {
  return `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR");
}
