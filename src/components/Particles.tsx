"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  phase: number;
  opacity: number;
};

// rgb triplets for --color-earth / --color-mist (see globals.css)
const PARTICLE_COLORS = ["139, 111, 71", "184, 168, 152"];

export default function Particles({ count = 46 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;

    const spawn = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1 + Math.random() * 2.2,
      speed: 6 + Math.random() * 14,
      drift: (Math.random() - 0.5) * 10,
      phase: Math.random() * Math.PI * 2,
      opacity: 0.15 + Math.random() * 0.35,
    });

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: count }, spawn);
    };

    resize();
    window.addEventListener("resize", resize);

    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (document.visibilityState === "visible") {
        ctx.clearRect(0, 0, width, height);
        particles.forEach((p, i) => {
          p.y -= p.speed * dt;
          p.phase += dt;
          if (p.y < -10) {
            particles[i] = { ...spawn(), y: height + 10 };
            return;
          }
          const x = p.x + Math.sin(p.phase) * p.drift;
          const color = PARTICLE_COLORS[i % PARTICLE_COLORS.length];
          ctx.beginPath();
          ctx.arc(x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
          ctx.fill();
        });
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
