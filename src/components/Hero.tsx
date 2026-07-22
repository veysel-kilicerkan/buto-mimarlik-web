"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.7"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.3"
        );

      gsap.to(scrollIndicatorRef.current, {
        y: 8,
        duration: 1.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.set(taglineRef.current, { y: self.progress * -50 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  function scrollToProjects() {
    const el = document.getElementById("projeler");
    el?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-cream overflow-hidden"
    >
      {/* Subtle background — tiled blueprint texture, not a single stretched photo */}
      <div
        className="absolute inset-0 z-0 opacity-[0.1] mix-blend-multiply"
        style={{
          backgroundImage:
            "url('/images/projects/mavi_arkaplan/mimari-teknik-cizim-arkaplan-deseni.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
          backgroundPosition: "center",
        }}
      />

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #1a1209 0px, #1a1209 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #1a1209 0px, #1a1209 1px, transparent 1px, transparent 60px)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center px-6">
        {/* Logo / page H1 — visually just the "BUTO / Mimarlık" wordmark, but carries
            the full keyword-rich brand line for search engines via sr-only text */}
        <h1 ref={logoRef} style={{ opacity: 0 }}>
          <span className="sr-only">
            BUTO Mimarlık — İstanbul Mimarlık ve İç Mimarlık Ofisi
          </span>
          <span aria-hidden="true">
            <span
              className="block text-6xl md:text-8xl lg:text-9xl tracking-[0.25em] text-ink"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              BUTO
            </span>
            <div className="mt-2 h-px w-24 md:w-32 mx-auto bg-earth" />
            <span
              className="block mt-2 text-xs tracking-[0.5em] text-mist uppercase"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Mimarlık
            </span>
          </span>
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-lg md:text-2xl lg:text-3xl text-earth-dark tracking-[0.15em] uppercase"
          style={{ fontFamily: "var(--font-playfair)", opacity: 0 }}
        >
          Mimarlığın Ötesinde
        </p>

        {/* CTA */}
        <div ref={ctaRef} style={{ opacity: 0 }}>
          <MagneticButton
            onClick={scrollToProjects}
            className="mt-4 px-10 py-4 border border-earth text-earth text-xs tracking-[0.3em] uppercase hover:bg-earth hover:text-cream transition-colors duration-500"
            style={{ fontFamily: "var(--font-jakarta)" } as React.CSSProperties}
          >
            Projelerimizi Keşfet →
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <span
          className="text-xs text-mist tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Aşağı Kaydır
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-mist to-transparent" />
      </div>
    </section>
  );
}
