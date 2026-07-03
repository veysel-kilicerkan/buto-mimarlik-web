"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Mimari Tasarım",
    description:
      "Konseptten uygulamaya, insan ölçeğini ve doğal ışığı merkeze alan özgün yapı tasarımları.",
  },
  {
    number: "02",
    title: "İç Mekan",
    description:
      "Yaşam kalitesini artıran, malzeme ve doku zenginliğiyle tanımlanan iç mekan çözümleri.",
  },
  {
    number: "03",
    title: "Renovasyon",
    description:
      "Mevcut yapıların ruhunu koruyarak çağdaş ihtiyaçlara uyum sağlayan dönüşüm projeleri.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.15,
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hizmetler"
      ref={sectionRef}
      className="py-32 md:py-44 bg-cream-dark"
    >
      <div className="max-w-6xl mx-auto px-8 md:px-12 lg:px-16">

        {/* Centered header */}
        <div
          ref={headerRef}
          className="text-center mb-20 md:mb-28"
          style={{ opacity: 0 }}
        >
          <span
            className="text-xs tracking-[0.5em] text-mist uppercase"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Ne Sunuyoruz
          </span>
          <h2
            className="mt-5 text-4xl md:text-5xl text-ink"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Hizmetler
          </h2>
          <div className="mt-6 h-px w-12 bg-earth mx-auto" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-earth/20">
          {services.map((s, i) => (
            <div
              key={s.number}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="group bg-cream-dark p-10 md:p-12 hover:bg-earth transition-colors duration-500 cursor-none"
              style={{ opacity: 0 }}
            >
              <span
                className="block text-xs tracking-[0.45em] text-mist group-hover:text-cream/60 mb-8 transition-colors duration-500"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {s.number}
              </span>
              <h3
                className="text-xl md:text-2xl text-ink group-hover:text-cream mb-6 transition-colors duration-500"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {s.title}
              </h3>
              <p
                className="text-sm text-ink/60 group-hover:text-cream/70 leading-loose transition-colors duration-500"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
