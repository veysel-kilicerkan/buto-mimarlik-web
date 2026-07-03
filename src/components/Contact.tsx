"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="iletisim"
      ref={sectionRef}
      className="py-32 md:py-44 bg-cream"
    >
      <div
        ref={contentRef}
        className="max-w-6xl mx-auto px-8 md:px-12 lg:px-16"
        style={{ opacity: 0 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <span
              className="text-xs tracking-[0.5em] text-mist uppercase"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Bize Ulaşın
            </span>
            <h2
              className="mt-5 text-4xl md:text-5xl text-ink"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              İletişim
            </h2>
            <div className="mt-6 h-px w-16 bg-earth mb-14" />

            <div className="space-y-10">
              <div>
                <span
                  className="block text-xs tracking-[0.35em] text-mist uppercase mb-2"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  E-posta
                </span>
                <span
                  className="text-ink text-sm tracking-wide"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  info@butomimarlik.com
                </span>
              </div>
              <div>
                <span
                  className="block text-xs tracking-[0.35em] text-mist uppercase mb-2"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Telefon
                </span>
                <span
                  className="text-ink text-sm tracking-wide"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  +90 (212) 000 00 00
                </span>
              </div>
              <div>
                <span
                  className="block text-xs tracking-[0.35em] text-mist uppercase mb-2"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Adres
                </span>
                <span
                  className="text-ink text-sm leading-loose tracking-wide"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Balmumcu Mah. Barbaros Blv. No:XX<br />
                  Beşiktaş / İstanbul
                </span>
              </div>
            </div>
          </div>

          {/* Decorative */}
          <div className="flex items-center justify-center md:justify-end">
            <div className="relative">
              <span
                className="block text-[8rem] md:text-[12rem] leading-none text-earth/10 select-none"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                B
              </span>
              <span
                className="absolute bottom-4 right-4 text-xs tracking-[0.5em] text-mist uppercase"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                BUTO Mimarlık
              </span>
            </div>
          </div>
        </div>

        {/* Footer bar */}
        <div className="mt-28 pt-10 border-t border-cream-dark flex flex-col md:flex-row items-center justify-between gap-6">
          <span
            className="text-xs text-mist tracking-[0.25em]"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            © 2026 BUTO Mimarlık. Tüm hakları saklıdır.
          </span>
          <div className="flex items-center gap-10">
            <a
              href="#"
              className="text-xs text-mist hover:text-earth tracking-[0.25em] transition-colors duration-300"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Instagram
            </a>
            <span className="w-px h-3 bg-mist/30" />
            <a
              href="#"
              className="text-xs text-mist hover:text-earth tracking-[0.25em] transition-colors duration-300"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
