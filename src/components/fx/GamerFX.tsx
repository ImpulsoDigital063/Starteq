"use client";
// Camada de interação gamer (sem libs além do DOM):
// · Cursor de mira (reticle) que trava em elementos interativos  [desktop/fine]
// · Botão magnético   [data-magnetic]                            [desktop/fine]
// · Tilt 3D nos cards  [data-tilt]                               [desktop/fine]
// · Glitch/reveal ao entrar na tela  [data-glitch] / [data-reveal]  [todos, respeita reduced-motion]

import { useEffect, useRef } from "react";

export default function GamerFX() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- reveal/glitch ao entrar na tela (todos os aparelhos) ----
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          if (el.hasAttribute("data-glitch") && !reduce) el.classList.add("glitched");
          el.classList.add("in-view");
          io.unobserve(el);
        }
      },
      { threshold: 0.35 }
    );
    document.querySelectorAll("[data-glitch],[data-reveal]").forEach((el) => io.observe(el));

    // ---- cursor / magnetic / tilt só em ponteiro fino (desktop) ----
    const fine = window.matchMedia("(pointer: fine)").matches;
    let raf = 0;
    let onMove: ((e: MouseEvent) => void) | null = null;
    let onLeave: (() => void) | null = null;

    if (fine) {
      document.body.classList.add("gamer-cursor");
      const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const ring = { x: mouse.x, y: mouse.y };
      let curMag: HTMLElement | null = null;
      let curTilt: HTMLElement | null = null;

      onMove = (e: MouseEvent) => {
        mouse.x = e.clientX; mouse.y = e.clientY;
        if (dotRef.current) dotRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;

        const t = e.target as HTMLElement;
        const interactive = t.closest("a, button, input, textarea, select, [data-magnetic], [data-tilt]");
        ringRef.current?.classList.toggle("lock", !!interactive);

        const mag = t.closest("[data-magnetic]") as HTMLElement | null;
        if (mag !== curMag) { if (curMag) curMag.style.transform = ""; curMag = mag; }
        if (mag) {
          const r = mag.getBoundingClientRect();
          const dx = mouse.x - (r.left + r.width / 2);
          const dy = mouse.y - (r.top + r.height / 2);
          mag.style.transform = `translate(${dx * 0.3}px, ${dy * 0.45}px)`;
        }

        const tilt = t.closest("[data-tilt]") as HTMLElement | null;
        if (tilt !== curTilt) { if (curTilt) curTilt.style.transform = ""; curTilt = tilt; }
        if (tilt && !reduce) {
          const r = tilt.getBoundingClientRect();
          const px = (mouse.x - r.left) / r.width - 0.5;
          const py = (mouse.y - r.top) / r.height - 0.5;
          tilt.style.transform = `perspective(800px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg)`;
        }
      };
      window.addEventListener("mousemove", onMove, { passive: true });

      const loop = () => {
        ring.x += (mouse.x - ring.x) * 0.2;
        ring.y += (mouse.y - ring.y) * 0.2;
        if (ringRef.current) ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`;
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      onLeave = () => { if (curMag) { curMag.style.transform = ""; curMag = null; } };
      document.addEventListener("mouseleave", onLeave);
    }

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      if (onMove) window.removeEventListener("mousemove", onMove);
      if (onLeave) document.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("gamer-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="gamer-ring" aria-hidden="true" />
      <div ref={dotRef} className="gamer-dot" aria-hidden="true" />
    </>
  );
}
