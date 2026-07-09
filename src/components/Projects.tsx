"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const firms = [
  {
    id: "toraman-tekstil",
    name: "Toraman Tekstil",
    description: "İdari Bina, Sosyal Tesisler ve Fabrika Alanı",
    year: "2024",
    projects: [
      { id: "tt-01", title: "Toraman Kuşbakışı", src: "/images/projects/toraman-tekstil/toraman-tekstil-mimari-proje-kusbakisi.jpg", aspect: "landscape" },
      { id: "tt-02", title: "İdari Bina Zemin Kat", src: "/images/projects/toraman-tekstil/toraman-tekstil-idari-bina-zemin-kat.png", aspect: "landscape" },
      { id: "tt-03", title: "İdari Bina Bodrum Kat", src: "/images/projects/toraman-tekstil/toraman-tekstil-idari-bina-bodrum-kat.jpg", aspect: "landscape" },
      { id: "tt-04", title: "Yönetim Odası 1", src: "/images/projects/toraman-tekstil/toraman-tekstil-yonetim-odasi-ic-mimari.png", aspect: "landscape" },
      { id: "tt-05", title: "Yönetim Odası 2", src: "/images/projects/toraman-tekstil/toraman-tekstil-yonetim-odasi-ic-mimari-2.png", aspect: "landscape" },
      { id: "tt-06", title: "Ofis", src: "/images/projects/toraman-tekstil/toraman-tekstil-ofis-tasarimi.jpg", aspect: "landscape" },
      { id: "tt-07", title: "Yemekhane 1", src: "/images/projects/toraman-tekstil/toraman-tekstil-yemekhane-ic-mekan.png", aspect: "landscape" },
      { id: "tt-08", title: "Yemekhane 2", src: "/images/projects/toraman-tekstil/toraman-tekstil-yemekhane-ic-mekan-2.png", aspect: "landscape" },
      { id: "tt-09", title: "Soyunma Odası 1", src: "/images/projects/toraman-tekstil/toraman-tekstil-soyunma-odasi-tasarimi.jpg", aspect: "landscape" },
      { id: "tt-10", title: "Soyunma Odası 1 (Render)", src: "/images/projects/toraman-tekstil/toraman-tekstil-soyunma-odasi-render.png", aspect: "landscape" },
      { id: "tt-11", title: "Soyunma Odası 3", src: "/images/projects/toraman-tekstil/toraman-tekstil-soyunma-odasi-render-2.png", aspect: "landscape" },
    ]
  },
  {
    id: "ramada-kazdaglari",
    name: "Ramada Kazdağları Termal Otel",
    description: "Turizm ve Konaklama Tesisi",
    year: "2023",
    projects: [
      { id: "rk-01", title: "Dış Cephe 1", src: "/images/projects/ramada-kazdaglari/ramada-kazdaglari-termal-otel-dis-cephe.jpg", aspect: "landscape" },
      { id: "rk-02", title: "Dış Cephe 2", src: "/images/projects/ramada-kazdaglari/ramada-kazdaglari-termal-otel-dis-cephe-2.jpg", aspect: "landscape" },
      { id: "rk-03", title: "İç Mekan 1", src: "/images/projects/ramada-kazdaglari/ramada-kazdaglari-termal-otel-ic-mekan.jpg", aspect: "landscape" },
      { id: "rk-04", title: "İç Mekan 2", src: "/images/projects/ramada-kazdaglari/ramada-kazdaglari-termal-otel-ic-mekan-2.jpg", aspect: "landscape" },
      { id: "rk-05", title: "İç Mekan 3", src: "/images/projects/ramada-kazdaglari/ramada-kazdaglari-termal-otel-ic-mekan-3.jpg", aspect: "landscape" },
    ]
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      firms.forEach((_, index) => {
        const track = trackRefs.current[index];
        if (track) {
          // If we reached the end, scroll back to start
          if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
            track.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            // otherwise scroll right
            track.scrollBy({ left: track.clientWidth > 768 ? 640 : 320, behavior: "smooth" });
          }
        }
      });
    }, 4500); // Auto-scroll every 4.5 seconds

    return () => clearInterval(interval);
  }, []);

  const scrollLeft = (index: number) => {
    if (trackRefs.current[index]) {
      trackRefs.current[index]!.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = (index: number) => {
    if (trackRefs.current[index]) {
      trackRefs.current[index]!.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section
      id="projeler"
      ref={containerRef}
      className="bg-ink overflow-hidden py-12"
    >
      {/* Heading */}
      <div
        ref={headingRef}
        className="max-w-6xl mx-auto px-8 md:px-12 lg:px-16 pt-12 pb-12"
        style={{ opacity: 0 }}
      >
        <span
          className="text-xs tracking-[0.5em] text-mist uppercase"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Portföy
        </span>
        <h2
          className="mt-4 text-4xl md:text-5xl lg:text-6xl text-white"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Projeler
        </h2>
        <div className="mt-6 h-px w-16 bg-earth" />
      </div>

      <div className="flex flex-col gap-24 md:gap-32 pb-24">
        {firms.map((firm, firmIndex) => (
          <div key={firm.id} className="relative w-full flex flex-col justify-center">
            <div className="px-8 md:px-12 lg:px-16 mb-8 flex justify-between items-end">
              <div>
                <h3 
                  className="text-3xl md:text-5xl text-cream mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {firm.name}
                </h3>
                <p 
                  className="text-mist text-sm md:text-base tracking-[0.1em]"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {firm.description} — {firm.year}
                </p>
              </div>
            </div>

            <div className="relative w-full group/track">
              {/* Overlay Buttons */}
              <button 
                onClick={() => scrollLeft(firmIndex)}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/track:opacity-100 group w-10 h-10 md:w-12 md:h-12 rounded-full border border-earth/50 bg-ink/80 backdrop-blur flex items-center justify-center text-cream hover:bg-earth hover:border-earth transition-all duration-300 shadow-lg hover:scale-110"
                aria-label="Sola kaydır"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:-translate-x-1">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button 
                onClick={() => scrollRight(firmIndex)}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/track:opacity-100 group w-10 h-10 md:w-12 md:h-12 rounded-full border border-earth/50 bg-ink/80 backdrop-blur flex items-center justify-center text-cream hover:bg-earth hover:border-earth transition-all duration-300 shadow-lg hover:scale-110"
                aria-label="Sağa kaydır"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              <div
                ref={(el) => { trackRefs.current[firmIndex] = el; }}
                className="flex gap-6 px-8 md:px-12 lg:px-16 overflow-x-auto snap-x snap-mandatory hide-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {firm.projects.map((project) => (
                  <div
                    key={project.id}
                    className="group relative flex-shrink-0 snap-center overflow-hidden bg-ink-dark h-[50vh] md:h-[65vh]"
                    style={{
                      width: project.aspect === "landscape" ? "clamp(320px, 45vw, 640px)" : "clamp(220px, 28vw, 400px)",
                    }}
                  >
                    <Image 
                      src={project.src} 
                      alt={project.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/70 transition-all duration-500 flex flex-col justify-end p-8 pointer-events-none">
                      <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <span
                          className="block text-xs tracking-[0.4em] text-mist mb-2"
                          style={{ fontFamily: "var(--font-jakarta)" }}
                        >
                          {project.id}
                        </span>
                        <h4
                          className="text-xl md:text-2xl text-cream mb-1"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          {project.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

