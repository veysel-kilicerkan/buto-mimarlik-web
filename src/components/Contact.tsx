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
        <div className="text-center mb-16 md:mb-20">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
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
              src="https://www.google.com/maps?q=15+Temmuz+Mah.+Ko%C3%A7man+Cad.+Demirkol+Plaza+B2+Blok+No%3A54+Kat%3A4+G%C3%BCne%C5%9Fli-Ba%C4%9Fc%C4%B1lar+%C4%B0stanbul&output=embed"
              className="absolute inset-0 w-full h-full grayscale-[35%] contrast-[1.05] sepia-[8%]"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
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
              href="https://www.instagram.com/butomimarlik/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-mist hover:text-earth tracking-[0.25em] transition-colors duration-300"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Instagram
            </a>
            <span className="w-px h-3 bg-mist/30" />
            <a
              href="https://www.linkedin.com/company/buto-mi%CC%87marlik-ve-i%CC%87n%C5%9Faat-ltd-%C5%9Fti%CC%87/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-mist hover:text-earth tracking-[0.25em] transition-colors duration-300"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Credit */}
        <div className="mt-10 text-center">
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
