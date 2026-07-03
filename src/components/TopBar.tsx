"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface TopBarProps {
  visible: boolean;
  phase: "scrolling" | "site";
}

export default function TopBar({ visible, phase }: TopBarProps) {
  const logoRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  // Logo fades in as soon as bar is mounted (canvas animation starts)
  useEffect(() => {
    if (!logoRef.current) return;
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.6 }
    );
  }, []);

  // Right icons appear only after canvas animation completes
  useEffect(() => {
    if (!iconsRef.current) return;
    gsap.to(iconsRef.current, {
      opacity: visible ? 1 : 0,
      y: visible ? 0 : -10,
      duration: 0.6,
      ease: "power2.out",
    });
  }, [visible]);

  // Canvas phase = dark video background → white logo
  // Site phase = cream sections → dark logo
  const onDark = phase === "scrolling";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-9 py-6 pointer-events-none">
      {/* Logo — always visible top-left */}
      <div ref={logoRef} className="pointer-events-auto" style={{ opacity: 0 }}>
        <a href="#" aria-label="BUTO Mimarlık — ana sayfa">
          <span
            className="block leading-none transition-colors duration-500"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: 22,
              letterSpacing: "0.32em",
              color: onDark ? "rgba(245,240,232,0.92)" : "#1a1209",
              textShadow: onDark ? "0 1px 12px rgba(0,0,0,0.5)" : "none",
            }}
          >
            BUTO
          </span>
          <span
            className="block transition-colors duration-500"
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: 9,
              letterSpacing: "0.45em",
              color: onDark ? "rgba(245,240,232,0.45)" : "#b8a898",
              marginTop: 2,
            }}
          >
            MİMARLIK
          </span>
        </a>
      </div>

      {/* Right icons — appear after canvas animation */}
      <div
        ref={iconsRef}
        className="flex items-center gap-6 pointer-events-auto"
        style={{ opacity: 0 }}
      >
        <a
          href="#iletisim"
          className="group flex items-center gap-2"
          aria-label="İletişim"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-ink/50 group-hover:text-earth transition-colors duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
        </a>

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
          aria-label="Instagram"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-ink/50 group-hover:text-earth transition-colors duration-300"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
          </svg>
        </a>
      </div>
    </div>
  );
}
