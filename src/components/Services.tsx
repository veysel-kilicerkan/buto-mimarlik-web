"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = "905305494893";

function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const services = [
  {
    number: "01",
    title: "Dekorasyon ve Tadilat",
    description:
      "Mekanlarınızı yenileyen, işlevsellik ve estetiği bir araya getiren dekorasyon ve tadilat çözümleri.",
    whatsappMessage:
      "Merhaba, Dekorasyon ve Tadilat hizmetiniz hakkında bilgi almak istiyorum.",
  },
  {
    number: "02",
    title: "Restorasyon ve Renovasyon",
    description:
      "Yapının özgün karakterini koruyarak günümüz ihtiyaçlarına uyarlayan restorasyon ve renovasyon çalışmaları.",
    whatsappMessage:
      "Merhaba, Restorasyon ve Renovasyon hizmetiniz hakkında bilgi almak istiyorum.",
  },
  {
    number: "03",
    title: "İnşaat Taahhüt",
    description:
      "Projeden teslimata, güvenilir ve zamanında yürütülen inşaat taahhüt hizmetleri.",
    whatsappMessage:
      "Merhaba, İnşaat Taahhüt hizmetiniz hakkında bilgi almak istiyorum.",
  },
  {
    number: "04",
    title: "Yapı Güçlendirme",
    description:
      "Yapının dayanıklılığını ve güvenliğini artıran, ihtiyaca özel güçlendirme çözümleri.",
    whatsappMessage:
      "Merhaba, Yapı Güçlendirme hizmetiniz hakkında bilgi almak istiyorum.",
  },
  {
    number: "05",
    title: "Proje ve Danışmanlık Hizmetleri",
    description:
      "Fikir aşamasından uygulamaya, her adımda uzman proje ve danışmanlık desteği.",
    whatsappMessage:
      "Merhaba, Proje ve Danışmanlık hizmetleriniz hakkında bilgi almak istiyorum.",
  },
];

function TypewriterText({ text, active }: { text: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active || count >= text.length) return;
    const id = setTimeout(() => setCount((c) => c + 1), 16);
    return () => clearTimeout(id);
  }, [active, count, text.length]);

  return (
    <>
      {text.slice(0, count)}
      {active && count < text.length && (
        <span className="inline-block w-[2px] h-[1em] align-middle bg-current ml-0.5 animate-caret" />
      )}
    </>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLAnchorElement[]>([]);
  const [activeCards, setActiveCards] = useState<boolean[]>(() =>
    services.map(() => false)
  );

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
              onEnter: () =>
                setActiveCards((prev) =>
                  prev.map((v, idx) => (idx === i ? true : v))
                ),
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
            <a
              key={s.number}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              href={buildWhatsAppLink(s.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${s.title} hakkında WhatsApp'tan iletişime geç`}
              className="group relative block bg-cream-dark p-10 md:p-12 hover:bg-earth transition-colors duration-500 cursor-none overflow-hidden"
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
                className="text-sm text-ink/60 group-hover:text-cream/70 leading-loose transition-colors duration-500 min-h-[6.5em]"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                <TypewriterText text={s.description} active={activeCards[i]} />
              </p>

              {/* Hover CTA overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-earth-dark/95 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <span
                  className="flex items-center gap-3 text-cream text-xs md:text-sm tracking-[0.35em] uppercase"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  İletişime Geç
                </span>
              </div>
            </a>
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
