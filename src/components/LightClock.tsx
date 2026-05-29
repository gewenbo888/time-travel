"use client";

import { useEffect, useRef } from "react";

/* Two light clocks side by side: one at rest, one moving at fraction beta of c.
   A photon bounces between mirrors at the speed of light. The moving clock's
   photon must travel a longer diagonal path, so it completes fewer round trips —
   it ticks slower by exactly the Lorentz factor. Time dilation, shown not asserted. */

export default function LightClock({ beta }: { beta: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const betaRef = useRef(beta);
  betaRef.current = beta;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, raf = 0;
    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    let pRest = 0;  // 0..1 round-trip phase
    let pMove = 0;
    let ticksRest = 0, ticksMove = 0;
    let last = performance.now();

    function photonXY(cx: number, p: number, half: number, top: number, bot: number, mh: number): [number, number] {
      if (p < 0.5) {
        const f = p / 0.5;            // bottom-left → top-centre
        return [cx - half + f * half, bot - f * mh];
      }
      const f = (p - 0.5) / 0.5;      // top-centre → bottom-right
      return [cx + f * half, top + f * mh];
    }

    function drawClock(cx: number, label: string, color: string, p: number, half: number, ticks: number) {
      const top = h * 0.14;
      const mh = h * 0.56;
      const bot = top + mh;
      // mirrors
      ctx!.strokeStyle = "rgba(180,190,230,0.6)";
      ctx!.lineWidth = 2.4;
      ctx!.beginPath(); ctx!.moveTo(cx - 26, top); ctx!.lineTo(cx + 26, top); ctx!.stroke();
      ctx!.beginPath(); ctx!.moveTo(cx - 26, bot); ctx!.lineTo(cx + 26, bot); ctx!.stroke();
      // light path V
      ctx!.strokeStyle = color + "40";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(cx - half, bot); ctx!.lineTo(cx, top); ctx!.lineTo(cx + half, bot);
      ctx!.stroke();
      // photon
      const [px, py] = photonXY(cx, p, half, top, bot, mh);
      const g = ctx!.createRadialGradient(px, py, 0, px, py, 10);
      g.addColorStop(0, color); g.addColorStop(1, color + "00");
      ctx!.fillStyle = g;
      ctx!.beginPath(); ctx!.arc(px, py, 10, 0, Math.PI * 2); ctx!.fill();
      ctx!.fillStyle = "#fff";
      ctx!.beginPath(); ctx!.arc(px, py, 2.6, 0, Math.PI * 2); ctx!.fill();
      // labels
      ctx!.fillStyle = "rgba(190,194,224,0.9)";
      ctx!.font = "10px 'JetBrains Mono', monospace";
      ctx!.textAlign = "center";
      ctx!.fillText(label, cx, bot + 20);
      ctx!.fillStyle = color;
      ctx!.fillText(`${ticks} ticks`, cx, bot + 36);
    }

    function frame(now: number) {
      const dt = Math.min(40, now - last); last = now;
      ctx!.clearRect(0, 0, w, h);
      const b = Math.min(betaRef.current, 0.99999);
      const gamma = 1 / Math.sqrt(1 - b * b);
      const baseRate = 0.0009 * dt;       // round trips per ms, rest clock
      const moveRate = baseRate / gamma;  // moving clock slower

      const prevR = pRest, prevM = pMove;
      pRest = (pRest + baseRate) % 1;
      pMove = (pMove + moveRate) % 1;
      if (pRest < prevR) ticksRest++;
      if (pMove < prevM) ticksMove++;

      // a moving clock leans more as beta rises
      const leanMove = Math.min(b, 0.96) * (w * 0.13);
      drawClock(w * 0.27, "AT REST", "#86f1ff", pRest, 0, ticksRest);
      drawClock(w * 0.73, "MOVING", "#ffd277", pMove, leanMove, ticksMove);

      if (!reduce) raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={ref} className="h-48 w-full" aria-hidden />;
}
