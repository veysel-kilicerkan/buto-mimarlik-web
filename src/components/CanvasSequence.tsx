"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TOTAL_FRAMES, LOCK_FRAME, SCROLL_HEIGHT } from "@/lib/constants";
import LockPad from "./LockPad";
import BrandMark from "./BrandMark";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface CanvasSequenceProps {
  onComplete: () => void;
}

// Source frames are 1920x1080; every frame is cropped to hide a fixed
// watermark before being drawn (see drawFrame below). Keeping the crop
// fractions here too lets us derive exactly where the door keypad lands
// on screen for any viewport size/aspect ratio, instead of guessing a
// fixed CSS percentage that only happens to line up at one window size.
const SRC_W = 1920;
const SRC_H = 1080;
const CROP_X_FRAC = 0.0;
const CROP_W_FRAC = 1.0;
const CROP_H_FRAC = 1.0;
// Keypad panel center/size measured directly on frame-0155.webp (LOCK_FRAME).
const KEYPAD_SRC = { x: 975, y: 540, width: 150 };

export default function CanvasSequence({ onComplete }: CanvasSequenceProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const frameIndexRef = useRef(0);
  const autoPlayRef = useRef<gsap.core.Tween | null>(null);

  const [showLock, setShowLock] = useState(false);
  const [keypadFit, setKeypadFit] = useState({ left: 0, top: 0, scale: 1 });
  const isLockedRef = useRef(false);
  const isUnlockedRef = useRef(false);
  const autoPlayRunningRef = useRef(false);

  // Welcome overlay refs — shown on first frame, fades when scroll starts
  const welcomeRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLSpanElement>(null);
  const topRuleRef = useRef<HTMLDivElement>(null);
  const bottomRuleRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const scrollDotRef = useRef<HTMLDivElement>(null);
  const showWelcomeRef = useRef(false); // managed by onUpdate based on scroll progress
  const introPlayedRef = useRef(false); // guards the one-time mark-then-text stagger

  // Keep the rules under/above BUTO exactly as wide as the rendered
  // wordmark — its font-size uses clamp(), so the width isn't a constant.
  useEffect(() => {
    const wordmark = wordmarkRef.current;
    if (!wordmark) return;
    const sync = () => {
      const w = `${wordmark.offsetWidth}px`;
      if (topRuleRef.current) topRuleRef.current.style.width = w;
      if (bottomRuleRef.current) bottomRuleRef.current.style.width = w;
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(wordmark);
    return () => observer.disconnect();
  }, []);

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
      const cropX = 0;
      const cropY = 0;
      const cropW = img.naturalWidth;
      const cropH = img.naturalHeight;

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

  // Mirrors drawFrame's crop/cover-fit math to find exactly where the door
  // keypad lands on screen for the current viewport, so the LockPad overlay
  // stays lined up with the video regardless of window size or aspect ratio.
  const updateKeypadFit = useCallback((w: number, h: number) => {
    const cropX = SRC_W * CROP_X_FRAC;
    const cropY = 0;
    const cropW = SRC_W * CROP_W_FRAC;
    const cropH = SRC_H * CROP_H_FRAC;
    const scale = Math.max(w / cropW, h / cropH);
    const sx = (w - cropW * scale) / 2;
    const sy = (h - cropH * scale) / 2;
    setKeypadFit({
      left: sx + (KEYPAD_SRC.x - cropX) * scale,
      top: sy + (KEYPAD_SRC.y - cropY) * scale,
      scale: (KEYPAD_SRC.width / 95) * scale, // 95px is LockPad's shell width at scale 1
    });
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctxRef.current = canvas.getContext("2d");
    drawFrame(frameIndexRef.current);
    updateKeypadFit(canvas.width, canvas.height);
  }, [drawFrame, updateKeypadFit]);

  const handleUnlock = useCallback(() => {
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

    // Staged welcome reveal: brand mark alone, then the wordmark block —
    // independent of showWelcomeRef (which tracks the outer wrapper's
    // scroll-driven visibility) so it always plays exactly once on load.
    const introTimer = setTimeout(() => {
      if (!markRef.current || !textBlockRef.current || introPlayedRef.current) return;
      introPlayedRef.current = true;
      showWelcomeRef.current = true;

      gsap.timeline()
        .fromTo(markRef.current,
          { opacity: 0, y: 16, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power2.out" }
        )
        .fromTo(textBlockRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" },
          "+=0.5"
        )
        .fromTo(scrollHintRef.current,
          { opacity: 0, y: -6 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        )
        .call(() => {
          gsap.timeline({ repeat: -1, repeatDelay: 0.3 })
            .fromTo(scrollDotRef.current,
              { y: 0, opacity: 0 },
              { y: 6, opacity: 1, duration: 0.35, ease: "power1.out" }
            )
            .to(scrollDotRef.current, {
              y: 18,
              opacity: 0,
              duration: 0.6,
              ease: "power1.in",
            });
        });
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
      clearTimeout(introTimer);
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
      >
        <div className="flex flex-col items-center" style={{ textAlign: "center" }}>

          {/* Brand mark — revealed first, alone, over the villa's glass wall */}
          <div ref={markRef} style={{ opacity: 0, marginBottom: 26 }}>
            <BrandMark size={44} invert />
          </div>

          <div ref={textBlockRef} className="flex flex-col items-center" style={{ opacity: 0 }}>
            {/* Top rule — width synced to the wordmark below */}
            <div ref={topRuleRef} style={{
              height: 1,
              background: "rgba(245,240,232,0.4)",
              marginBottom: 20,
            }} />

            {/* BUTO */}
            <span ref={wordmarkRef} style={{
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

            {/* Bottom rule — width synced to the wordmark above */}
            <div ref={bottomRuleRef} style={{
              height: 1,
              background: "rgba(245,240,232,0.4)",
              marginTop: 20,
              marginBottom: 16,
            }} />

            {/* MİMARLIK */}
            <span style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: 14,
              letterSpacing: "0.48em",
              paddingRight: "0.48em",
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

          {/* Scroll hint — invites the visitor to start scrolling */}
          <div
            ref={scrollHintRef}
            className="flex flex-col items-center gap-4"
            style={{ opacity: 0, marginTop: 40 }}
          >
            <span style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: 12,
              letterSpacing: "0.4em",
              color: "rgba(245,240,232,0.8)",
              textTransform: "uppercase",
              textShadow: "0 1px 10px rgba(0,0,0,0.5)",
            }}>
              Aşağı Kaydır
            </span>
            <div style={{
              width: 26,
              height: 42,
              borderRadius: 13,
              border: "1.5px solid rgba(245,240,232,0.55)",
              boxShadow: "0 1px 10px rgba(0,0,0,0.35)",
              display: "flex",
              justifyContent: "center",
              paddingTop: 8,
            }}>
              <div
                ref={scrollDotRef}
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "rgba(245,240,232,0.95)",
                  boxShadow: "0 0 6px rgba(245,240,232,0.6)",
                  opacity: 0,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {showLock && <LockPad onUnlock={handleUnlock} fit={keypadFit} />}
    </div>
  );
}
