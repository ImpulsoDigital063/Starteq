import Link from "next/link";
import { redirect } from "next/navigation";
import { Icon } from "@/components/Icon";
import { getServerSession } from "@/lib/admin-auth";
import {
  CASH_SESSIONS,
  PAYMENTS,
  COMMISSIONS,
  getActiveCashSession,
  getMovementsBySession,
  computeExpected,
  getTotalApurada,
  type CashMovement,
  type CashSession,
} from "@/lib/admin-mock";
import { CaixaActions } from "./CaixaActions";
import { VendaBalcaoButton } from "./VendaBalcaoButton";

export const metadata = {
  title: "Caixa do dia · Painel Starteq",
};

type Search = { step?: string };

export default async function CaixaPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const session = await getServerSession();
  if (!session) redirect("/admin/login");

  const sp = await searchParams;
  const active = getActiveCashSession();
  const historicas = CASH_SESSIONS.filter((s) => s.status === "fechada")
    .sort((a, b) => (b.closed_at ?? "").localeCompare(a.closed_at ?? ""));

  // KPIs do dia · independentes do caixa físico (PIX/cartão também)
  const todayISO = new Date().toISOString().slice(0, 10);
  const todayPayments = PAYMENTS.filter((p) => p.received_at.startsWith(todayISO) && p.status === "recebido");
  const pixHoje = todayPayments.filter((p) => p.method === "pix").reduce((s, p) => s + p.amount, 0);
  const cartaoHoje = todayPayments.filter((p) => p.method === "cartao").reduce((s, p) => s + p.amount, 0);
  const dinheiroHoje = todayPayments.filter((p) => p.method === "dinheiro").reduce((s, p) => s + p.amount, 0);
  const apurada = getTotalApurada();

  return (
    <>
      <header className="mb-6 flex items-end justify-between flex-wrap gap-3">
        <div>
          <div className="text-starteq-gold text-xs font-space font-bold tracking-[0.3em] uppercase mb-1">
            Caixa do dia
          </div>
          <h1 className="font-space text-2xl lg:text-3xl font-black text-starteq-bone">
            {active ? "Caixa aberto" : "Caixa fechado"}
          </h1>
          <p className="text-starteq-muted mt-1 text-sm">
            Espécie passa pelo caixa físico · PIX e cartão vão direto pra conta
          </p>
        </div>
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border font-space font-bold uppercase text-xs ${active ? "bg-starteq-pix/10 text-starteq-pix border-starteq-pix/40" : "bg-starteq-line text-starteq-muted border-starteq-line"}`}>
          <Icon name={active ? "check" : "lock"} size={14} />
          {active ? `Sessão ${active.id}` : "Sem sessão ativa"}
        </div>
      </header>

      {/* KPIs do dia · 4 meios separados */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KPI label="Dinheiro hoje" value={brl(dinheiroHoje)} sub="passa pelo caixa" icon="credit-card" accent="gold" />
        <KPI label="PIX hoje" value={brl(pixHoje)} sub="direto na conta" icon="zap" accent="pix" />
        <KPI label="Cartão hoje" value={brl(cartaoHoje)} sub="cai em D+30" icon="credit-card" />
        <KPI label="Comissão a pagar" value={brl(apurada)} sub="OS quitadas" icon="trophy" accent="gold" />
      </section>

      {/* Tela de FECHAMENTO */}
      {active && sp.step === "fechar" && (
        <FechamentoBlock session={active} />
      )}

      {/* Sessão ATIVA · view normal */}
      {active && sp.step !== "fechar" && (
        <SessionBlock session={active} />
      )}

      {/* Sem sessão · ABRIR */}
      {!active && <AbrirBlock />}

      {/* HISTÓRICO */}
      {historicas.length > 0 && (
        <section className="mt-8">
          <h2 className="font-space text-xs font-bold uppercase tracking-[0.2em] text-starteq-muted mb-3">
            Histórico de fechamentos
          </h2>
          <div className="bg-starteq-card border border-starteq-line rounded-xl overflow-hidden">
            <div className="divide-y divide-starteq-line">
              {historicas.slice(0, 5).map((s) => (
                <HistoryRow key={s.id} session={s} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

// ============== Blocos ==============

function SessionBlock({ session }: { session: CashSession }) {
  const moves = getMovementsBySession(session.id);
  const expected = computeExpected(session);
  const entradas = moves.filter((m) => m.type === "venda" || m.type === "recebimento_os" || m.type === "suprimento");
  const sangrias = moves.filter((m) => m.type === "sangria");

  return (
    <div className="grid lg:grid-cols-3 gap-5">
      {/* Coluna principal · movimentos */}
      <div className="lg:col-span-2 bg-starteq-card border border-starteq-line rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-starteq-line bg-starteq-coal flex items-center justify-between">
          <h3 className="font-space font-bold text-starteq-bone inline-flex items-center gap-2">
            <Icon name="credit-card" size={16} className="text-starteq-gold" />
            Movimentos · {session.id}
          </h3>
          <span className="text-xs text-starteq-muted">
            Aberto às {fmtTime(session.opened_at)} por {session.opened_by}
          </span>
        </div>
        <div className="divide-y divide-starteq-line">
          {moves.map((m) => (
            <MovementRow key={m.id} m={m} />
          ))}
        </div>
      </div>

      {/* Coluna lateral · saldo + ações */}
      <div className="space-y-5">
        <div className="bg-starteq-card border border-starteq-line rounded-xl p-5">
          <div className="text-[10px] uppercase tracking-wider font-space font-bold text-starteq-muted">Saldo esperado em espécie</div>
          <div className="text-3xl font-space font-black text-starteq-gold mt-1">{brl(expected)}</div>
          <div className="mt-3 space-y-1 text-xs">
            <Line label="Abertura" value={brl(session.opening_amount)} />
            <Line label={`Entradas (${entradas.length})`} value={`+ ${brl(entradas.reduce((s, m) => s + m.amount, 0))}`} positive />
            <Line label={`Sangrias (${sangrias.length})`} value={`− ${brl(sangrias.reduce((s, m) => s + m.amount, 0))}`} negative />
          </div>
        </div>

        <VendaBalcaoButton hasOpenSession={true} />

        <CaixaActions sessionId={session.id} />

        <Link
          href="/admin/caixa?step=fechar"
          className="block w-full text-center bg-starteq-red/10 text-starteq-red border border-starteq-red/40 hover:bg-starteq-red/20 font-space font-bold uppercase text-xs px-4 py-3 rounded-lg"
        >
          <Icon name="lock" size={14} className="inline mr-1.5 -mt-0.5" />
          Fechar caixa
        </Link>
      </div>
    </div>
  );
}

function AbrirBlock() {
  return (
    <div className="bg-starteq-card border border-starteq-line rounded-xl p-8 text-center max-w-md mx-auto">
      <Icon name="lock" size={32} className="text-starteq-muted mx-auto mb-3" />
      <h3 className="font-space font-black text-starteq-bone text-lg mb-1">Nenhuma sessão de caixa aberta</h3>
      <p className="text-starteq-muted text-sm mb-4">
        Abra o caixa registrando o valor inicial de troco. Toda entrada em dinheiro a partir daqui amarra nessa sessão.
      </p>
      <CaixaActions sessionId="" openOnly />
    </div>
  );
}

function FechamentoBlock({ session }: { session: CashSession }) {
  const expected = computeExpected(session);
  return (
    <div className="bg-starteq-card border border-starteq-red/40 rounded-xl p-6 max-w-2xl mx-auto">
      <div className="flex items-start gap-3 mb-4">
        <Icon name="alert" size={20} className="text-starteq-red flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-space font-black text-starteq-bone text-lg">Fechar {session.id}</h3>
          <p className="text-starteq-muted text-sm">
            Conte o dinheiro no caixa e digite o valor abaixo. Se houver diferença, é obrigatório justificar — o sistema nunca ajusta sozinho.
          </p>
        </div>
      </div>

      <div className="bg-starteq-coal border border-starteq-line rounded-lg p-4 mb-4">
        <div className="text-[10px] uppercase tracking-wider font-space font-bold text-starteq-muted">Esperado em espécie</div>
        <div className="text-2xl font-space font-black text-starteq-gold mt-1">{brl(expected)}</div>
        <div className="text-xs text-starteq-muted mt-1">
          Abertura {brl(session.opening_amount)} + entradas em dinheiro − sangrias
        </div>
      </div>

      <CaixaActions sessionId={session.id} fechar fecharExpected={expected} />

      <Link
        href="/admin/caixa"
        className="block text-center text-xs text-starteq-muted hover:text-starteq-bone mt-4 font-space font-bold uppercase tracking-wider"
      >
        ← Voltar
      </Link>
    </div>
  );
}

// ============== Linha do movimento ==============

const MOVE_LABEL: Record<CashMovement["type"], string> = {
  abertura: "Abertura",
  venda: "Venda balcão",
  recebimento_os: "Recebimento OS",
  suprimento: "Suprimento",
  sangria: "Sangria",
  fechamento: "Fechamento",
};

const MOVE_ICON: Record<CashMovement["type"], import("@/components/Icon").IconName> = {
  abertura: "rocket",
  venda: "shopping-cart",
  recebimento_os: "wrench",
  suprimento: "plus",
  sangria: "arrow-right",
  fechamento: "lock",
};

function MovementRow({ m }: { m: CashMovement }) {
  const isSaida = m.type === "sangria";
  const isOpen = m.type === "abertura";
  const sign = isSaida ? "−" : isOpen ? " " : "+";
  return (
    <div className="px-5 py-3 flex items-start justify-between gap-3">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-starteq-coal border border-starteq-line flex items-center justify-center ${isSaida ? "text-starteq-red" : isOpen ? "text-starteq-muted" : "text-starteq-pix"}`}>
          <Icon name={MOVE_ICON[m.type]} size={14} className={m.type === "sangria" ? "rotate-180" : ""} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-display font-semibold text-sm text-starteq-bone">{MOVE_LABEL[m.type]}</div>
          {m.note && <div className="text-xs text-starteq-muted truncate">{m.note}</div>}
          {m.reference_id && (
            <div className="text-[10px] text-starteq-gold font-mono mt-0.5">{m.reference_id}</div>
          )}
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <div className={`font-mono font-bold ${isSaida ? "text-starteq-red" : isOpen ? "text-starteq-muted" : "text-starteq-pix"}`}>
          {sign} {brl(m.amount)}
        </div>
        <div className="text-[10px] text-starteq-muted mt-0.5">{fmtTime(m.created_at)} · {m.created_by}</div>
      </div>
    </div>
  );
}

function HistoryRow({ session }: { session: CashSession }) {
  const declared = session.closing_amount_declared ?? 0;
  const expected = session.closing_amount_expected ?? 0;
  const diff = session.diff ?? 0;
  const hasDiff = diff !== 0;
  return (
    <div className="px-5 py-3 flex items-start justify-between gap-3 flex-wrap">
      <div className="flex-1 min-w-0">
        <div className="font-mono text-xs text-starteq-gold">{session.id}</div>
        <div className="text-sm text-starteq-bone">
          {fmtDate(session.opened_at)} · fechado por {session.closed_by}
        </div>
        {session.diff_note && (
          <div className="text-xs text-starteq-muted italic mt-1">&quot;{session.diff_note}&quot;</div>
        )}
      </div>
      <div className="text-right flex-shrink-0">
        <div className="text-xs text-starteq-muted">Declarado · Esperado</div>
        <div className="font-mono text-sm text-starteq-bone">
          {brl(declared)} · {brl(expected)}
        </div>
        <div className={`mt-1 inline-block text-[10px] font-space font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${hasDiff ? (diff < 0 ? "bg-starteq-red/15 text-starteq-red border-starteq-red/40" : "bg-orange-500/15 text-orange-400 border-orange-400/40") : "bg-starteq-pix/15 text-starteq-pix border-starteq-pix/40"}`}>
          {hasDiff ? `${diff < 0 ? "falta" : "sobra"} ${brl(Math.abs(diff))}` : "bateu"}
        </div>
      </div>
    </div>
  );
}

// ============== Componentes auxiliares ==============

function KPI({
  label,
  value,
  sub,
  icon,
  accent = "default",
}: {
  label: string;
  value: string;
  sub?: string;
  icon: import("@/components/Icon").IconName;
  accent?: "default" | "gold" | "pix" | "red";
}) {
  const colors: Record<typeof accent, string> = {
    default: "text-starteq-bone",
    gold: "text-starteq-gold",
    pix: "text-starteq-pix",
    red: "text-starteq-red",
  };
  return (
    <div className="bg-starteq-card border border-starteq-line rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2 text-starteq-muted">
        <Icon name={icon} size={14} />
        <div className="text-[10px] uppercase tracking-wider font-space font-bold">{label}</div>
      </div>
      <div className={`text-xl lg:text-2xl font-space font-black ${colors[accent]}`}>{value}</div>
      {sub && <div className="text-xs text-starteq-muted mt-0.5">{sub}</div>}
    </div>
  );
}

function Line({ label, value, positive, negative }: { label: string; value: string; positive?: boolean; negative?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-starteq-muted">{label}</span>
      <span className={`font-mono ${positive ? "text-starteq-pix" : negative ? "text-starteq-red" : "text-starteq-bone"}`}>{value}</span>
    </div>
  );
}

function brl(n: number) {
  return `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR");
}
