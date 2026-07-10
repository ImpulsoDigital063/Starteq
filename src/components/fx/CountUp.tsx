"use client";
// Contador que sobe de 0 até o valor quando entra na tela (placar de game).
import { useEffect, useRef, useState } from "react";

type Props = { to: number; decimals?: number; prefix?: string; suffix?: string; duration?: number; className?: string };

export default function CountUp({ to, decimals = 0, prefix = "", suffix = "", duration = 1400, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVal(to); return; }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(to * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return <span ref={ref} className={className}>{prefix}{val.toFixed(decimals)}{suffix}</span>;
}
