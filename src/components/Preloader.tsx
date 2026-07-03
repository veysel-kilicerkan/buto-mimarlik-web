"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useImagePreloader } from "@/hooks/useImagePreloader";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const loadingWrapRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const { progress, isLoaded, images } = useImagePreloader();

  // Update loading bar & percent
  useEffect(() => {
    if (percentRef.current) percentRef.current.textContent = `${progress}%`;
    if (barRef.current) barRef.current.style.width = `${progress}%`;
  }, [progress]);

  // Entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(frameRef.current,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 1.1 }
    )
    .fromTo([topLineRef.current, bottomLineRef.current],
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, stagger: 0.1, transformOrigin: "left center" },
      "-=0.6"
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.4"
    )
    .fromTo(taglineRef.current,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.4"
    )
    .fromTo(loadingWrapRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      "-=0.2"
    );

    // Subtle breathing pulse on the logo frame
    gsap.to(frameRef.current, {
      opacity: 0.75,
      duration: 2.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1.2,
    });
  }, []);

  // Exit animation when loaded
  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    if (typeof window !== "undefined") {
      (window as Window & { __butoFrames?: HTMLImageElement[] }).__butoFrames = images;
    }

    gsap.to(containerRef.current, {
      yPercent: -100,
      duration: 1.1,
      ease: "power3.inOut",
      delay: 0.5,
      onComplete,
    });
  }, [isLoaded, images, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
    >
      {/* Logo lockup */}
      <div className="flex flex-col items-center">

        {/* Thin top rule */}
        <div
          ref={topLineRef}
          style={{
            width: 220,
            height: 1,
            background: "rgba(139,111,71,0.45)",
            marginBottom: 22,
            transformOrigin: "left center",
          }}
        />

        {/* BUTO wordmark — Playfair Display, generous tracking */}
        <div ref={frameRef} style={{ opacity: 0 }}>
          <span
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(52px, 8vw, 96px)",
              letterSpacing: "0.38em",
              color: "#1a1209",
              lineHeight: 1,
              display: "block",
              paddingRight: "0.38em", // compensate letter-spacing on last char
            }}
          >
            BUTO
          </span>
        </div>

        {/* Thin bottom rule */}
        <div
          ref={bottomLineRef}
          style={{
            width: 220,
            height: 1,
            background: "rgba(139,111,71,0.45)",
            marginTop: 22,
            transformOrigin: "left center",
          }}
        />

        {/* MİMARLIK subtitle */}
        <span
          ref={subtitleRef}
          style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: 10,
            letterSpacing: "0.6em",
            color: "#b8a898",
            textTransform: "uppercase",
            marginTop: 16,
            paddingRight: "0.6em",
            opacity: 0,
          }}
        >
          MİMARLIK
        </span>

        {/* Tagline */}
        <p
          ref={taglineRef}
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: 13,
            letterSpacing: "0.18em",
            color: "rgba(26,18,9,0.35)",
            marginTop: 28,
            fontStyle: "italic",
            opacity: 0,
          }}
        >
          Mimarlığın Ötesinde
        </p>
      </div>

      {/* Loading bar — clearly separated below logo */}
      <div
        ref={loadingWrapRef}
        style={{ marginTop: 60, width: 220, opacity: 0 }}
      >
        {/* Bar track */}
        <div
          style={{ width: "100%", height: 1, background: "rgba(237,229,214,0.9)", position: "relative" }}
        >
          <div
            ref={barRef}
            style={{
              height: 1,
              background: "#8b6f47",
              width: "0%",
              transition: "width 0.12s linear",
            }}
          />
        </div>

        {/* Percent — below bar, right-aligned, no overlap */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
          <span
            ref={percentRef}
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: 10,
              letterSpacing: "0.2em",
              color: "#b8a898",
            }}
          >
            0%
          </span>
        </div>
      </div>
    </div>
  );
}
