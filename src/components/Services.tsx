"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Dekorasyon ve Tadilat",
    description:
      "Mekanlarınızı yenileyen, işlevsellik ve estetiği bir araya getiren dekorasyon ve tadilat çözümleri.",
  },
  {
    number: "02",
    title: "Restorasyon ve Renovasyon",
    description:
      "Yapının özgün karakterini koruyarak günümüz ihtiyaçlarına uyarlayan restorasyon ve renovasyon çalışmaları.",
  },
  {
    number: "03",
    title: "İnşaat Taahhüt",
    description:
      "Projeden teslimata, güvenilir ve zamanında yürütülen inşaat taahhüt hizmetleri.",
  },
  {
    number: "04",
    title: "Yapı Güçlendirme",
    description:
      "Yapının dayanıklılığını ve güvenliğini artıran, ihtiyaca özel güçlendirme çözümleri.",
  },
  {
    number: "05",
    title: "Proje ve Danışmanlık Hizmetleri",
    description:
      "Fikir aşamasından uygulamaya, her adımda uzman proje ve danışmanlık desteği.",
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
            className="mt-5 text-4xl md:text-5xl lg:text-6xl text-ink"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Hizmetler
          </h2>
          <p
            className="mt-6 max-w-2xl mx-auto text-sm text-ink/60 leading-relaxed"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            BUTO MİMARLIK LTD. ŞTİ. olarak aşağıda belirtilmiş olan hizmetleri sunmaktayız;
          </p>
          <div className="mt-6 h-px w-12 bg-earth mx-auto" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-earth/20">
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
                className="text-2xl md:text-3xl text-ink group-hover:text-cream mb-6 transition-colors duration-500"
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

          {/* CTA tile — fills the grid's trailing empty cell, invites contact */}
          <a
            href="#iletisim"
            className="group flex flex-col justify-center bg-ink p-10 md:p-12 hover:bg-earth-dark transition-colors duration-500 cursor-none"
          >
            <span
              className="block text-xs tracking-[0.45em] text-mist uppercase mb-6 transition-colors duration-500"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Aklınızda Bir Proje mi Var?
            </span>
            <h3
              className="text-2xl md:text-3xl text-cream mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Bize Ulaşın →
            </h3>
          </a>
        </div>
      </div>
    </section>
  );
}
