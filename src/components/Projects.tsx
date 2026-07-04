"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: "01", title: "Koru Rezidans", location: "İstanbul, Beşiktaş", year: "2024", aspect: "landscape" },
  { id: "02", title: "Çarşı Pasajı", location: "İzmir, Alsancak", year: "2023", aspect: "portrait" },
  { id: "03", title: "Sahil Villası", location: "Bodrum, Yalıkavak", year: "2023", aspect: "landscape" },
  { id: "04", title: "Atölye Loft", location: "İstanbul, Karaköy", year: "2022", aspect: "portrait" },
  { id: "05", title: "Orman Evi", location: "Sapanca", year: "2022", aspect: "landscape" },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

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

      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${Math.abs(getScrollAmount()) + window.innerHeight * 0.5}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        animation: gsap.to(track, {
          x: getScrollAmount,
          ease: "none",
        }),
      });

      return () => st.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projeler"
      ref={sectionRef}
      className="bg-ink overflow-hidden"
    >
      {/* Heading */}
      <div
        ref={headingRef}
        className="max-w-6xl mx-auto px-8 md:px-12 lg:px-16 pt-24 pb-12"
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

      {/* Horizontal scroll track */}
      <div className="relative h-[65vh] overflow-hidden">
        <div
          ref={trackRef}
          className="absolute inset-y-0 left-0 flex gap-6 px-6 md:px-16 lg:px-24 items-center"
          style={{ willChange: "transform" }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative flex-shrink-0 overflow-hidden bg-ink-dark"
              style={{
                width: project.aspect === "landscape" ? "clamp(320px, 45vw, 640px)" : "clamp(220px, 28vw, 400px)",
                height: "100%",
              }}
            >
              {/* Placeholder image */}
              <div className="absolute inset-0 bg-cream-dark/10 flex items-center justify-center">
                <span
                  className="text-mist text-xs tracking-[0.3em] uppercase"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {project.title}
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/70 transition-all duration-500 flex flex-col justify-end p-8">
                <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span
                    className="block text-xs tracking-[0.4em] text-mist mb-2"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    {project.id}
                  </span>
                  <h3
                    className="text-2xl md:text-3xl text-cream mb-1"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm text-mist"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    {project.location} — {project.year}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 md:px-12 lg:px-16 py-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/10" />
        <span
          className="text-xs text-mist tracking-[0.3em]"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Kaydırarak Keşfet →
        </span>
      </div>
    </section>
  );
}
