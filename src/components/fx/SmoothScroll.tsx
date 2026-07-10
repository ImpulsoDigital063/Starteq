"use client";
// Scroll suave/inercial (Lenis) · espinha dorsal do feel premium.
// Respeita prefers-reduced-motion (cai pro scroll nativo).
import { useEffect } from "react";
import Lenis from "lenis";
// CSS do Lenis inlinado no globals.css (import do pacote faz o Turbopack panicar no Windows)

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
  return null;
}
