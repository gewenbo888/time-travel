"use client";

import { useEffect, useRef } from "react";

/* Hero canvas: a flowing spacetime grid seen in perspective, warped by two
   drifting gravitational wells, over a field of slowly-twinkling stars. The grid
   lines bend toward the masses — gravity rendered as geometry. Cosmic, alive, light. */

type Mass = { x: number; y: number; m: number; vx: number; vy: number };

export default function TimeField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const STARS: { x: number; y: number; r: number; tw: number; ph: number }[] = [];
    const masses: Mass[] = [];

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      STARS.length = 0;
      const count = w < 768 ? 70 : 150;
      for (let i = 0; i < count; i++) {
        STARS.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.3 + 0.2, tw: 0.5 + Math.random() * 2, ph: Math.random() * Math.PI * 2 });
      }
      masses.length = 0;
      masses.push({ x: w * 0.34, y: h * 0.46, m: 1, vx: 0.18, vy: 0.10 });
      masses.push({ x: w * 0.7, y: h * 0.58, m: 0.7, vx: -0.14, vy: -0.08 });
    }

    resize();
    init();

    // grid spacing in screen space
    const GAP = w < 768 ? 46 : 60;

    function warp(x: number, y: number): [number, number] {
      let dx = 0, dy = 0;
      for (const ms of masses) {
        const ax = x - ms.x, ay = y - ms.y;
        const d2 = ax * ax + ay * ay;
        const d = Math.sqrt(d2) + 0.001;
        // pull toward the mass, ~1/d falloff, capped
        const pull = (ms.m * 2600) / (d2 + 2600);
        dx -= (ax / d) * pull;
        dy -= (ay / d) * pull;
      }
      return [x + dx, y + dy];
    }

    let t = 0;
    function frame() {
      t += 1;
      ctx!.clearRect(0, 0, w, h);

      // stars
      for (const s of STARS) {
        const a = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(t * 0.01 * s.tw + s.ph));
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(200,220,255,${a})`;
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      // move masses, bounce gently off edges
      for (const ms of masses) {
        ms.x += ms.vx; ms.y += ms.vy;
        if (ms.x < w * 0.12 || ms.x > w * 0.88) ms.vx *= -1;
        if (ms.y < h * 0.18 || ms.y > h * 0.82) ms.vy *= -1;
      }

      ctx!.lineWidth = 1;

      // horizontal grid lines
      for (let gy = -GAP; gy <= h + GAP; gy += GAP) {
        ctx!.beginPath();
        for (let gx = -GAP; gx <= w + GAP; gx += 6) {
          const [px, py] = warp(gx, gy);
          if (gx === -GAP) ctx!.moveTo(px, py);
          else ctx!.lineTo(px, py);
        }
        ctx!.strokeStyle = "rgba(54,230,255,0.12)";
        ctx!.stroke();
      }
      // vertical grid lines
      for (let gx = -GAP; gx <= w + GAP; gx += GAP) {
        ctx!.beginPath();
        for (let gy = -GAP; gy <= h + GAP; gy += 6) {
          const [px, py] = warp(gx, gy);
          if (gy === -GAP) ctx!.moveTo(px, py);
          else ctx!.lineTo(px, py);
        }
        ctx!.strokeStyle = "rgba(155,108,255,0.10)";
        ctx!.stroke();
      }

      // mass glows
      ctx!.globalCompositeOperation = "lighter";
      for (const ms of masses) {
        const R = 70 * ms.m;
        const g = ctx!.createRadialGradient(ms.x, ms.y, 0, ms.x, ms.y, R);
        g.addColorStop(0, "rgba(255,227,166,0.5)");
        g.addColorStop(0.4, "rgba(255,210,119,0.16)");
        g.addColorStop(1, "rgba(255,210,119,0)");
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(ms.x, ms.y, R, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalCompositeOperation = "source-over";

      if (!reduce) raf = requestAnimationFrame(frame);
    }

    frame();
    if (reduce) for (let i = 0; i < 40; i++) frame();

    const onResize = () => { resize(); init(); };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="h-full w-full" aria-hidden />;
}
