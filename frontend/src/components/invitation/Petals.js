import { useEffect, useRef } from "react";

const COLORS = [
  "rgba(224,122,95,0.55)",
  "rgba(217,119,6,0.45)",
  "rgba(212,175,55,0.45)",
  "rgba(255,255,255,0.85)",
  "rgba(27,59,43,0.30)",
];

export default function Petals() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let w;
    let h;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = Math.min(16, Math.max(8, Math.floor(window.innerWidth / 90)));
    const petals = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 3 + Math.random() * 5,
      vy: 0.25 + Math.random() * 0.45,
      sway: 20 + Math.random() * 30,
      phase: Math.random() * Math.PI * 2,
      speed: 0.002 + Math.random() * 0.003,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.01,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of petals) {
        p.y += p.vy;
        p.phase += p.speed * 16;
        p.rot += p.vr;
        if (p.y > h + 20) {
          p.y = -20;
          p.x = Math.random() * w;
        }
        const x = p.x + Math.sin(p.phase) * p.sway * 0.1;
        ctx.save();
        ctx.translate(x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30"
    />
  );
}
