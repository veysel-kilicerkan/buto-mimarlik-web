"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TOTAL_FRAMES, LOCK_FRAME, SCROLL_HEIGHT } from "@/lib/constants";
import LockPad from "./LockPad";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface CanvasSequenceProps {
  onComplete: () => void;
}

export default function CanvasSequence({ onComplete }: CanvasSequenceProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const frameIndexRef = useRef(0);
  const autoPlayRef = useRef<gsap.core.Tween | null>(null);

  const [showLock, setShowLock] = useState(false);
  const isLockedRef = useRef(false);
  const isUnlockedRef = useRef(false);
  const autoPlayRunningRef = useRef(false);
  const wheelPreventRef = useRef<((e: Event) => void) | null>(null);

  // Welcome overlay refs — shown on first frame, fades when scroll starts
  const welcomeRef = useRef<HTMLDivElement>(null);
  const showWelcomeRef = useRef(false); // managed by onUpdate based on scroll progress

  const getImages = useCallback((): HTMLImageElement[] => {
    return (
      (window as Window & { __butoFrames?: HTMLImageElement[] }).__butoFrames ?? []
    );
  }, []);

  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = ctxRef.current;
      if (!ctx) return;
      const images = getImages();
      const img = images[index];
      if (!img || !img.complete || !img.naturalWidth) return;

      const w = canvas.width;
      const h = canvas.height;

      // Crop out the AI-generation watermark fixed in the bottom-right corner
      // of every frame — keep top intact (roofline), trim mostly from the bottom.
      const cropX = img.naturalWidth * 0.13;
      const cropY = 0;
      const cropW = img.naturalWidth * 0.74;
      const cropH = img.naturalHeight * 0.74;

      const scale = Math.max(w / cropW, h / cropH);
      const sw = cropW * scale;
      const sh = cropH * scale;
      const sx = (w - sw) / 2;
      const sy = (h - sh) / 2;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, cropX, cropY, cropW, cropH, sx, sy, sw, sh);
    },
    [getImages]
  );

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctxRef.current = canvas.getContext("2d");
    drawFrame(frameIndexRef.current);
  }, [drawFrame]);

  // Block scroll while lock pad is active
  useEffect(() => {
    if (!showLock) {
      if (wheelPreventRef.current) {
        window.removeEventListener("wheel", wheelPreventRef.current);
        window.removeEventListener("touchmove", wheelPreventRef.current);
        wheelPreventRef.current = null;
      }
      return;
    }
    const prevent = (e: Event) => e.preventDefault();
    wheelPreventRef.current = prevent;
    window.addEventListener("wheel", prevent, { passive: false });
    window.addEventListener("touchmove", prevent, { passive: false });
    return () => {
      window.removeEventListener("wheel", prevent);
      window.removeEventListener("touchmove", prevent);
      wheelPreventRef.current = null;
    };
  }, [showLock]);

  const handleUnlock = useCallback(() => {
    if (wheelPreventRef.current) {
      window.removeEventListener("wheel", wheelPreventRef.current);
      window.removeEventListener("touchmove", wheelPreventRef.current);
      wheelPreventRef.current = null;
    }
    setShowLock(false);
    isLockedRef.current = false;
    isUnlockedRef.current = true;
    autoPlayRunningRef.current = true;

    const frameObj = { frame: LOCK_FRAME };
    autoPlayRef.current = gsap.to(frameObj, {
      frame: TOTAL_FRAMES - 1,
      duration: 3.5,
      ease: "power2.inOut",
      onUpdate: () => {
        const f = Math.round(frameObj.frame);
        frameIndexRef.current = f;
        drawFrame(f);
      },
      onComplete: () => {
        // Keep autoPlayRunning=true during scrollTo — prevents scroll-driven re-animation
        gsap.to(window, {
          scrollTo: { y: SCROLL_HEIGHT },
          duration: 1.2,
          ease: "power2.inOut",
          onComplete: () => {
            autoPlayRunningRef.current = false;
            onComplete();
          },
        });
      },
    });
  }, [drawFrame, onComplete]);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    ctxRef.current = canvas.getContext("2d");
    resizeCanvas();
    drawFrame(0);
    window.addEventListener("resize", resizeCanvas);

    // Animate welcome text in after first frame renders
    const welcomeTimer = setTimeout(() => {
      if (welcomeRef.current && !showWelcomeRef.current) {
        showWelcomeRef.current = true;
        gsap.fromTo(
          welcomeRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" }
        );
      }
    }, 250);

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${SCROLL_HEIGHT}`,
      pin: true,
      scrub: 0.3,
      onUpdate: (self) => {
        if (autoPlayRunningRef.current) return;

        const p = self.progress;

        // Welcome text: bidirectional — shows at top, hides when scrolled, re-appears on scroll-back
        if (welcomeRef.current) {
          if (p < 0.008 && !showWelcomeRef.current) {
            showWelcomeRef.current = true;
            gsap.to(welcomeRef.current, {
              opacity: 1, y: 0, duration: 0.9, ease: "power2.out", overwrite: true,
            });
          } else if (p > 0.013 && showWelcomeRef.current) {
            showWelcomeRef.current = false;
            gsap.to(welcomeRef.current, {
              opacity: 0, y: -24, duration: 0.6, ease: "power2.in", overwrite: true,
            });
          }
        }

        const targetFrame = Math.min(
          Math.floor(p * (TOTAL_FRAMES - 1)),
          TOTAL_FRAMES - 1
        );

        if (isUnlockedRef.current) {
          frameIndexRef.current = targetFrame;
          drawFrame(targetFrame);
          return;
        }

        if (targetFrame >= LOCK_FRAME) {
          if (!isLockedRef.current) {
            isLockedRef.current = true;
            setShowLock(true);
          }
          frameIndexRef.current = LOCK_FRAME;
          drawFrame(LOCK_FRAME);
        } else {
          if (isLockedRef.current) {
            isLockedRef.current = false;
            setShowLock(false);
          }
          frameIndexRef.current = targetFrame;
          drawFrame(targetFrame);
        }
      },
    });

    return () => {
      clearTimeout(welcomeTimer);
      window.removeEventListener("resize", resizeCanvas);
      autoPlayRef.current?.kill();
      st.kill();
    };
  }, [drawFrame, resizeCanvas]);

  return (
    <div ref={sectionRef} className="relative w-full h-screen">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: "contents" }}
      />

      {/* ── Welcome overlay ── Shown on first frame, fades when scroll starts */}
      <div
        ref={welcomeRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
        style={{ opacity: 0 }}
      >
        <div className="flex flex-col items-center" style={{ textAlign: "center" }}>
          {/* Top rule */}
          <div style={{
            width: 180,
            height: 1,
            background: "rgba(245,240,232,0.4)",
            marginBottom: 20,
          }} />

          {/* BUTO */}
          <span style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 700,
            fontSize: "clamp(48px, 6.5vw, 96px)",
            letterSpacing: "0.42em",
            paddingRight: "0.42em",
            color: "rgba(245,240,232,0.96)",
            textShadow: "0 2px 50px rgba(0,0,0,0.65), 0 0 80px rgba(0,0,0,0.3)",
            lineHeight: 1,
            display: "block",
          }}>
            BUTO
          </span>

          {/* Bottom rule */}
          <div style={{
            width: 180,
            height: 1,
            background: "rgba(245,240,232,0.4)",
            marginTop: 20,
            marginBottom: 16,
          }} />

          {/* MİMARLIK */}
          <span style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: 10,
            letterSpacing: "0.65em",
            paddingRight: "0.65em",
            color: "rgba(245,240,232,0.55)",
            textTransform: "uppercase",
            textShadow: "0 1px 12px rgba(0,0,0,0.5)",
            display: "block",
          }}>
            MİMARLIK
          </span>

          {/* Tagline */}
          <span style={{
            fontFamily: "var(--font-playfair)",
            fontSize: 13,
            letterSpacing: "0.18em",
            color: "rgba(245,240,232,0.32)",
            fontStyle: "italic",
            marginTop: 20,
            display: "block",
            textShadow: "0 1px 8px rgba(0,0,0,0.4)",
          }}>
            Mimarlığın Ötesinde
          </span>
        </div>
      </div>

      {showLock && <LockPad onUnlock={handleUnlock} />}
    </div>
  );
}
