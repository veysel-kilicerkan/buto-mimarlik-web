"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface TopBarProps {
  visible: boolean;
  phase: "scrolling" | "site";
}

export default function TopBar({ visible, phase }: TopBarProps) {
  const logoRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Logo and Nav fade in as soon as bar is mounted (canvas animation starts)
  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.6 }
      );
    }
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.6 }
      );
    }
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
    <div 
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 lg:px-16 py-4 md:py-6 pointer-events-none transition-all duration-700 ${
        phase === "site" ? "bg-cream/90 backdrop-blur-md shadow-sm" : ""
      }`}
    >
      {/* Logo — always visible top-left */}
      <div ref={logoRef} className="pointer-events-auto" style={{ opacity: 0 }}>
        <a href="#" aria-label="BUTO Mimarlık — ana sayfa" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 md:w-10 md:h-10 flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
            <Image
              src="/brand/buto-mark.png"
              alt="BUTO Logo"
              fill
              className="object-contain transition-all duration-500"
              style={{
                filter: onDark ? "invert(1) brightness(0.9)" : "none",
              }}
            />
          </div>
          <div>
            <span
              className="block leading-none tracking-[0.32em] text-lg md:text-xl lg:text-2xl transition-colors duration-500"
              style={{
                fontFamily: "var(--font-playfair)",
                color: onDark ? "rgba(245,240,232,0.92)" : "#1a1209",
                textShadow: onDark ? "0 1px 12px rgba(0,0,0,0.5)" : "none",
              }}
            >
              BUTO
            </span>
            <span
              className="block tracking-[0.45em] text-[9px] md:text-[10px] lg:text-[11px] transition-colors duration-500"
              style={{
                fontFamily: "var(--font-jakarta)",
                color: onDark ? "rgba(245,240,232,0.45)" : "#b8a898",
                marginTop: 2,
              }}
            >
              MİMARLIK
            </span>
          </div>
        </a>
      </div>

      {/* Center Navigation */}
      <div
        ref={navRef}
        className="hidden md:flex items-center gap-10 lg:gap-14 pointer-events-auto absolute left-1/2 -translate-x-1/2"
        style={{ opacity: 0 }}
      >
        <a
          href="#hakkimizda"
          className="text-xs tracking-[0.25em] uppercase hover:text-earth transition-colors duration-300"
          style={{
            fontFamily: "var(--font-jakarta)",
            color: onDark ? "rgba(245,240,232,0.75)" : "#1a1209",
          }}
        >
          Hakkımızda
        </a>
        <a
          href="#projeler"
          className="text-xs tracking-[0.25em] uppercase hover:text-earth transition-colors duration-300"
          style={{
            fontFamily: "var(--font-jakarta)",
            color: onDark ? "rgba(245,240,232,0.75)" : "#1a1209",
          }}
        >
          Projeler
        </a>
        <a
          href="#iletisim"
          className="text-xs tracking-[0.25em] uppercase hover:text-earth transition-colors duration-300"
          style={{
            fontFamily: "var(--font-jakarta)",
            color: onDark ? "rgba(245,240,232,0.75)" : "#1a1209",
          }}
        >
          İletişim
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
          href="https://www.instagram.com/butomimarlik/"
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

        <a
          href="https://www.linkedin.com/company/buto-mi%CC%87marlik-ve-i%CC%87n%C5%9Faat-ltd-%C5%9Fti%CC%87/posts/?feedView=all"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
          aria-label="LinkedIn"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-ink/50 group-hover:text-earth transition-colors duration-300"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
      </div>
    </div>
  );
}
