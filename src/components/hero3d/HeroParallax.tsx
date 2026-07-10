"use client";
// Camada 2.5D reutilizável · movimento + profundidade sobre foto que já existe. SEM WebGL.
// Profundidade: parallax multi-camada (foto lenta + poeira rápida).
// SURPRESA no scroll: poeira vira riscos de warp/decolagem + zoom conforme a SEÇÃO sai do topo.
// Progresso é relativo ao viewport da própria seção → funciona em qualquer banda do site.
// RESPONSIVO: imagem própria do mobile; no mobile o movimento vem do SCROLL. reduced-motion = estático.

import { useEffect, useRef } from "react";

type Props = {
  desktopSrc: string;
  mobileSrc?: string;
  objectPosition?: string;
  mobileObjectPosition?: string;
  fit?: "cover" | "contain";
  baseScale?: number;
  filter?: string;
  className?: string;
};

export default function HeroParallax({
  desktopSrc,
  mobileSrc,
  objectPosition = "center",
  mobileObjectPosition = "center top",
  fit = "cover",
  baseScale = 1.08,
  filter = "",
  className = "",
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 767px)");
    let mobile = mqMobile.matches;

    const applyImage = () => {
      if (!imgRef.current) return;
      imgRef.current.style.backgroundImage = `url(${mobile && mobileSrc ? mobileSrc : desktopSrc})`;
      imgRef.current.style.backgroundPosition = mobile ? mobileObjectPosition : objectPosition;
      imgRef.current.style.backgroundSize = mobile ? "cover" : fit;
    };
    applyImage();
    if (mqReduce.matches) return; // fallback: estático

    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!mobile) window.addEventListener("mousemove", onMove, { passive: true });
    const onMqMobile = (e: MediaQueryListEvent) => {
      mobile = e.matches;
      applyImage();
      if (mobile) window.removeEventListener("mousemove", onMove);
      else window.addEventListener("mousemove", onMove, { passive: true });
    };
    mqMobile.addEventListener("change", onMqMobile);

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let seed = 7;
    const rnd = () => {
      seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const N = mobile ? 22 : 42;
    const dust = Array.from({ length: N }, () => ({
      x: rnd(), y: rnd(), r: 0.5 + rnd() * 1.7, vy: 0.02 + rnd() * 0.06,
      sway: rnd() * Math.PI * 2, swaySpd: 0.2 + rnd() * 0.4, depth: 0.4 + rnd() * 1.0, tw: rnd() * Math.PI * 2,
    }));
    const zoomAmt = fit === "contain" ? 0.05 : 0.16;

    let raf = 0, last = performance.now(), running = true, cleared = false;
    const loop = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const rect = rootRef.current?.getBoundingClientRect();
      const vh = window.innerHeight;
      // fora do viewport → não desenha (perf), limpa uma vez
      if (!rect || rect.bottom < 0 || rect.top > vh) {
        if (!cleared) { ctx.clearRect(0, 0, W, H); cleared = true; }
        raf = requestAnimationFrame(loop);
        return;
      }
      cleared = false;

      cur.current.x += (target.current.x - cur.current.x) * 0.06;
      cur.current.y += (target.current.y - cur.current.y) * 0.06;
      const mx = cur.current.x, my = cur.current.y;

      // p = "decolagem" (seção saindo pelo topo) · vp = parallax pela travessia do viewport
      const p = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.9)));
      const vp = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      const drift = (vp - 0.5) * 44;

      if (imgRef.current)
        imgRef.current.style.transform = `scale(${baseScale + p * zoomAmt}) translate(${mx * -14}px, ${my * -10 + drift}px)`;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${mx * 22}px, ${my * 18}px) scale(${1 + p * 0.6})`;
        glowRef.current.style.opacity = String(0.6 + p * 0.4);
      }

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      const rush = 1 + p * 6;
      const streakLen = p * 90;
      for (const d of dust) {
        d.y -= d.vy * rush * dt;
        if (d.y < -0.08) { d.y = 1.08; d.x = rnd(); }
        const px = d.x * W + Math.sin(now / 1000 * d.swaySpd + d.sway) * 12 + mx * -40 * d.depth;
        const py = d.y * H + my * -32 * d.depth;
        const a = 0.2 + (Math.sin(now / 1000 * 1.4 + d.tw) * 0.5 + 0.5) * 0.5;
        const len = streakLen * d.depth;
        if (len > 2) {
          const g = ctx.createLinearGradient(px, py, px, py + len);
          g.addColorStop(0, `rgba(245,197,24,${a})`);
          g.addColorStop(1, "rgba(245,197,24,0)");
          ctx.strokeStyle = g; ctx.lineWidth = d.r * 1.4;
          ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py + len); ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(px, py, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,224,120,${a})`; ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onVis = () => { running = document.visibilityState === "visible"; if (running) { last = performance.now(); raf = requestAnimationFrame(loop); } };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      mqMobile.removeEventListener("change", onMqMobile);
      document.removeEventListener("visibilitychange", onVis);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={rootRef} className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div
        ref={imgRef}
        className="absolute inset-0 will-change-transform kenburns"
        style={{ backgroundImage: `url(${desktopSrc})`, backgroundSize: fit, backgroundPosition: objectPosition, backgroundRepeat: "no-repeat", transform: `scale(${baseScale})`, filter }}
      />
      <div
        ref={glowRef}
        className="absolute inset-0 will-change-[transform,opacity] breathe pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 55% at 72% 45%, rgba(245,197,24,0.16), transparent 60%)" }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <style>{`
        @keyframes kb { 0%,100%{} 50%{ transform: scale(1.13) translate(0,-8px);} }
        .kenburns { animation: kb 20s ease-in-out infinite; }
        @keyframes br { 0%,100%{opacity:.6} 50%{opacity:1} }
        .breathe { animation: br 8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce){ .kenburns,.breathe{animation:none!important} }
        @media (max-width: 767px){ .kenburns{animation:none!important} }
      `}</style>
    </div>
  );
}
