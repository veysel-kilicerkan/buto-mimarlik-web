"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.to(imageRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hakkimizda"
      ref={sectionRef}
      className="py-32 md:py-44 bg-cream overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-8 md:px-12 lg:px-16">

        {/* Centered section label */}
        <div className="text-center mb-16 md:mb-20">
          <span
            className="text-xs tracking-[0.5em] text-mist uppercase"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Hakkımızda
          </span>
          <div className="mt-4 h-px w-12 bg-earth mx-auto" />
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-center">

          {/* Text */}
          <div ref={headingRef} style={{ opacity: 0 }}>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl text-ink leading-tight mb-12"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Mekanı <br />
              <span className="text-earth italic">Şiire</span> Dönüştürüyoruz
            </h2>

            <div className="h-px w-16 bg-earth mb-12" />

            <div ref={textRef} className="space-y-8" style={{ opacity: 0 }}>
              <p
                className="text-ink/70 text-base leading-loose"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                BUTO Mimarlık, tasarımın yalnızca estetik bir pratik olmadığına,
                aynı zamanda insan deneyimini şekillendiren derin bir dil olduğuna inanır.
                Her proje, bir mekanın potansiyelini keşfetme yolculuğudur.
              </p>
              <p
                className="text-ink/70 text-base leading-loose"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Fonksiyonel sınırlar içinde özgürce hareket eden tasarım anlayışımızla;
                konut, ticari ve karma kullanımlı projelerde insanı merkeze alan
                çözümler üretiyoruz.
              </p>

              <div className="pt-6">
                <span
                  className="text-xs tracking-[0.45em] text-mist uppercase"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Kuruluş — 2018
                </span>
              </div>
            </div>
          </div>

          {/* Image placeholder */}
          <div
            ref={imageRef}
            className="relative h-80 md:h-[540px] bg-cream-dark overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-mist text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Görsel Eklenecek
              </span>
            </div>
            <div className="absolute top-5 left-5 right-5 bottom-5 border border-earth/20 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
