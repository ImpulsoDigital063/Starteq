"use client";

import { useEffect, useState } from "react";

type Status =
  | { open: true; closesAt: string }
  | { open: false; opensAt: string; opensDay: string };

// Horário Starteq: seg-sex 8h-12h + 14h-18h · sáb 9h-13h · dom fechado
function computeStatus(now: Date): Status {
  const day = now.getDay(); // 0=dom, 1-5=seg-sex, 6=sáb
  const minutes = now.getHours() * 60 + now.getMinutes();

  if (day >= 1 && day <= 5) {
    if (minutes >= 8 * 60 && minutes < 12 * 60) return { open: true, closesAt: "12h · pausa almoço" };
    if (minutes >= 14 * 60 && minutes < 18 * 60) return { open: true, closesAt: "18h" };
    if (minutes < 8 * 60) return { open: false, opensAt: "8h", opensDay: "hoje" };
    if (minutes >= 12 * 60 && minutes < 14 * 60) return { open: false, opensAt: "14h", opensDay: "hoje" };
    // após 18h sex = abre sáb
    if (day === 5) return { open: false, opensAt: "9h", opensDay: "amanhã (sáb)" };
    return { open: false, opensAt: "8h", opensDay: "amanhã" };
  }

  if (day === 6) {
    if (minutes >= 9 * 60 && minutes < 13 * 60) return { open: true, closesAt: "13h" };
    if (minutes < 9 * 60) return { open: false, opensAt: "9h", opensDay: "hoje" };
    return { open: false, opensAt: "8h", opensDay: "segunda" };
  }

  // domingo · próximo seg 8h
  return { open: false, opensAt: "8h", opensDay: "segunda" };
}

export function OpenNowBadge({ variant = "default" }: { variant?: "default" | "compact" }) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const update = () => setStatus(computeStatus(new Date()));
    update();
    const id = setInterval(update, 60_000); // recalcula a cada 1min
    return () => clearInterval(id);
  }, []);

  // SSR/loading state · neutro pra não causar layout shift
  if (!status) {
    return (
      <span className={`inline-flex items-center gap-1.5 text-[10px] font-space font-bold uppercase tracking-wider text-starteq-muted ${variant === "compact" ? "" : ""}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-starteq-muted" />
        Horário · seg-sex 8-18
      </span>
    );
  }

  if (status.open) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[10px] font-space font-bold uppercase tracking-wider text-starteq-pix">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-starteq-pix opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-starteq-pix" />
        </span>
        Aberto agora · fecha às {status.closesAt}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-space font-bold uppercase tracking-wider text-starteq-gold">
      <span className="w-2 h-2 rounded-full bg-starteq-gold/60" />
      Fechado · abre {status.opensDay} às {status.opensAt}
    </span>
  );
}
