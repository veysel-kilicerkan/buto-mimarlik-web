"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Particles from "./Particles";

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
      className="pt-32 md:pt-44 pb-14 md:pb-16 bg-cream"
    >
      <div
        ref={contentRef}
        className="relative overflow-hidden max-w-6xl mx-auto px-8 md:px-12 lg:px-16"
        style={{ opacity: 0 }}
      >
        <Particles count={70} />

        <div className="relative z-10 text-center mb-16 md:mb-20">
          <span
            className="text-xs tracking-[0.5em] text-mist uppercase"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Bize Ulaşın
          </span>
          <h2
            className="mt-5 text-4xl md:text-5xl lg:text-6xl text-ink"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            İletişim
          </h2>
          <div className="mt-6 h-px w-12 bg-earth mx-auto" />
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
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
                  Şahsi Mail
                </span>
                <span
                  className="text-ink text-sm tracking-wide"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  busratoraman.f@gmail.com
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
                  +90 530 549 48 93
                </span>
              </div>
              <div>
                <span
                  className="block text-xs tracking-[0.35em] text-mist uppercase mb-2"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Faks
                </span>
                <span
                  className="text-ink text-sm tracking-wide"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  0212 664 49 38
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
                  15 Temmuz Mah. Koçman Cad. Demirkol Plaza B2 Blok No:54 Kat:4<br />
                  Güneşli-Bağcılar / İSTANBUL
                </span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="relative h-80 md:h-full min-h-[320px] border border-earth/20 overflow-hidden">
            <iframe
              title="BUTO Mimarlık Konum"
              src="https://maps.google.com/maps?q=Demirkol%20Plaza%20G%C3%BCne%C5%9Fli%20Ba%C4%9Fc%C4%B1lar&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 w-full h-full grayscale-[25%] contrast-[1.05]"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Footer bar */}
        <div className="relative z-10 mt-16 pt-8 border-t border-cream-dark flex flex-col md:flex-row items-center justify-between gap-6">
          <span
            className="text-xs text-mist tracking-[0.25em]"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            © 2026 BUTO Mimarlık. Tüm hakları saklıdır.
          </span>

          <div className="flex items-center gap-8">
            <a href="#hakkimizda" className="text-xs text-ink/70 hover:text-earth tracking-[0.2em] uppercase transition-colors" style={{ fontFamily: "var(--font-jakarta)" }}>
              Hakkımızda
            </a>
            <a href="#projeler" className="text-xs text-ink/70 hover:text-earth tracking-[0.2em] uppercase transition-colors" style={{ fontFamily: "var(--font-jakarta)" }}>
              Projeler
            </a>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/butomimarlik/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-10 h-10 rounded-full bg-ink text-cream hover:bg-earth transition-colors duration-300 shadow-md"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/buto-mi%CC%87marlik-ve-i%CC%87n%C5%9Faat-ltd-%C5%9Fti%CC%87/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-10 h-10 rounded-full bg-ink text-cream hover:bg-earth transition-colors duration-300 shadow-md"
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>

        <div className="relative z-10 mt-6 flex justify-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 group"
            aria-label="Yukarı Dön"
          >
            <div className="w-12 h-12 rounded-full border border-earth/40 flex items-center justify-center text-earth group-hover:bg-earth group-hover:text-cream transition-all duration-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </div>
            <span className="text-[10px] tracking-[0.2em] text-mist group-hover:text-earth transition-colors" style={{ fontFamily: "var(--font-jakarta)" }}>
              YUKARI DÖN
            </span>
          </button>
        </div>

        {/* Credit */}
        <div className="relative z-10 mt-6 text-center">
          <span
            className="text-[10px] text-mist/60 tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Created by Aklera
          </span>
        </div>
      </div>
    </section>
  );
}
