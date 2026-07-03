"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface PasswordScreenProps {
  onUnlock: () => void;
}

export default function PasswordScreen({ onUnlock }: PasswordScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [value, setValue] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  // Draw first frame on canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const frames = (window as Window & { __butoFrames?: HTMLImageElement[] }).__butoFrames;
    if (frames && frames[0] && frames[0].complete) {
      drawCover(ctx, frames[0], canvas.width, canvas.height);
    }

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (frames && frames[0] && frames[0].complete) {
        drawCover(ctx, frames[0], canvas.width, canvas.height);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Entrance animation
  useEffect(() => {
    if (!formRef.current) return;
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
    );
    inputRef.current?.focus();
  }, []);

  function drawCover(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    w: number,
    h: number
  ) {
    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const sw = img.naturalWidth * scale;
    const sh = img.naturalHeight * scale;
    const sx = (w - sw) / 2;
    const sy = (h - sh) / 2;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, sx, sy, sw, sh);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim() || unlocked) return;
    setUnlocked(true);

    if (statusRef.current) {
      statusRef.current.textContent = "Kapı Açılıyor...";
      gsap.to(statusRef.current, { opacity: 1, duration: 0.3 });
    }

    gsap.to(inputRef.current, {
      borderColor: "#8b6f47",
      duration: 0.4,
    });

    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      delay: 0.8,
      ease: "power2.inOut",
      onComplete: onUnlock,
    });
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[90] flex items-center justify-center"
    >
      {/* Canvas background showing first frame */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-ink/40" />

      {/* Password form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="relative z-10 flex flex-col items-center gap-6 px-8"
        style={{ opacity: 0 }}
      >
        <div className="text-center mb-4">
          <span
            className="block text-4xl md:text-5xl tracking-[0.3em] text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            BUTO
          </span>
        </div>

        <div className="relative w-72 md:w-96">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Şifrenizi girin"
            className="w-full bg-transparent border-b border-white/60 text-white placeholder:text-white/40 text-center py-3 px-4 text-sm tracking-[0.2em] outline-none focus:border-earth transition-colors duration-300"
            style={{ fontFamily: "var(--font-jakarta)" }}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          className="mt-2 px-8 py-3 border border-white/60 text-white/80 text-xs tracking-[0.3em] uppercase hover:border-earth hover:text-white transition-all duration-300"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Giriş
        </button>

        <div className="text-center mt-1">
          <span
            ref={statusRef}
            className="block text-xs text-white/40 tracking-widest opacity-100"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Herhangi bir şifre girebilirsiniz
          </span>
        </div>
      </form>
    </div>
  );
}
