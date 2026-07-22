"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type ProjectImage = {
  id: string;
  title: string;
  category: string;
  alt: string;
  src: string;
  aspect: string;
  video?: boolean;
  poster?: string;
};

type Firm = {
  id: string;
  name: string;
  tag?: string;
  scope?: string;
  location?: string;
  year: string;
  projects: ProjectImage[];
};

const firms: Firm[] = [
  {
    id: "toraman-tekstil",
    name: "Toraman Tekstil",
    tag: "İplik Fabrikası",
    scope: "Tasarım, Projelendirme ve Uygulama",
    location: "Elazığ",
    year: "2023-2026",
    projects: [
      { id: "tt-01", title: "Toraman Kuşbakışı", category: "Vaziyet Planı", alt: "Toraman Tekstil İplik Fabrikası kuşbakışı vaziyet planı - Elazığ mimari proje | BUTO Mimarlık", src: "/images/projects/toraman-tekstil/toraman-tekstil-mimari-proje-kusbakisi.jpg", aspect: "landscape" },
      { id: "tt-02", title: "İdari Bina Zemin Kat", category: "Kat Planı", alt: "Toraman Tekstil idari bina zemin kat planı - Elazığ iç mimari tasarım | BUTO Mimarlık", src: "/images/projects/toraman-tekstil/toraman-tekstil-idari-bina-zemin-kat.png", aspect: "landscape" },
      { id: "tt-03", title: "İdari Bina Bodrum Kat", category: "Kat Planı", alt: "Toraman Tekstil idari bina bodrum kat planı - Elazığ mimari projelendirme | BUTO Mimarlık", src: "/images/projects/toraman-tekstil/toraman-tekstil-idari-bina-bodrum-kat.jpg", aspect: "landscape" },
      { id: "tt-04", title: "Yönetim Odası 1", category: "İç Mimari", alt: "Toraman Tekstil yönetim odası iç mimari tasarımı - Elazığ | BUTO Mimarlık", src: "/images/projects/toraman-tekstil/toraman-tekstil-yonetim-odasi-ic-mimari.png", aspect: "landscape" },
      { id: "tt-05", title: "Yönetim Odası 2", category: "İç Mimari", alt: "Toraman Tekstil yönetim odası oturma alanı iç mimari tasarımı - Elazığ | BUTO Mimarlık", src: "/images/projects/toraman-tekstil/toraman-tekstil-yonetim-odasi-ic-mimari-2.png", aspect: "landscape" },
      { id: "tt-06", title: "Ofis", category: "Ofis Tasarımı", alt: "Toraman Tekstil ofis iç mekan tasarımı - Elazığ | BUTO Mimarlık", src: "/images/projects/toraman-tekstil/toraman-tekstil-ofis-tasarimi.jpg", aspect: "landscape" },
      { id: "tt-07", title: "Yemekhane 1", category: "Sosyal Alan", alt: "Toraman Tekstil yemekhane iç mekan tasarımı - Elazığ sosyal tesis mimarisi | BUTO Mimarlık", src: "/images/projects/toraman-tekstil/toraman-tekstil-yemekhane-ic-mekan.png", aspect: "landscape" },
      { id: "tt-08", title: "Yemekhane 2", category: "Sosyal Alan", alt: "Toraman Tekstil yemekhane oturma alanı tasarımı - Elazığ | BUTO Mimarlık", src: "/images/projects/toraman-tekstil/toraman-tekstil-yemekhane-ic-mekan-2.png", aspect: "landscape" },
      { id: "tt-09", title: "Soyunma Odası 1", category: "Sosyal Alan", alt: "Toraman Tekstil personel soyunma odası tasarımı - Elazığ fabrika sosyal tesisleri | BUTO Mimarlık", src: "/images/projects/toraman-tekstil/toraman-tekstil-soyunma-odasi-tasarimi.jpg", aspect: "landscape" },
      { id: "tt-10", title: "Soyunma Odası 2", category: "3D Görselleştirme", alt: "Toraman Tekstil soyunma odası 3D iç mimari render - Elazığ | BUTO Mimarlık", src: "/images/projects/toraman-tekstil/toraman-tekstil-soyunma-odasi-render.png", aspect: "landscape" },
      { id: "tt-11", title: "Soyunma Odası 3", category: "3D Görselleştirme", alt: "Toraman Tekstil soyunma odası 3D tasarım render - Elazığ | BUTO Mimarlık", src: "/images/projects/toraman-tekstil/toraman-tekstil-soyunma-odasi-render-2.png", aspect: "landscape" },
    ]
  },
  {
    id: "ramada-kazdaglari",
    name: "Ramada Kazdağları Termal Otel",
    scope: "Turizm ve Konaklama Tesisi",
    year: "2023",
    projects: [
      { id: "rk-01", title: "Dış Cephe 1", category: "Dış Cephe", alt: "Ramada Kazdağları Termal Otel dış cephe mimari tasarımı - turizm oteli mimarisi | BUTO Mimarlık", src: "/images/projects/ramada-kazdaglari/ramada-kazdaglari-termal-otel-dis-cephe.jpg", aspect: "landscape" },
      { id: "rk-02", title: "Dış Cephe 2", category: "Dış Cephe", alt: "Ramada Kazdağları Termal Otel dış cephe gece görünümü - otel mimarisi | BUTO Mimarlık", src: "/images/projects/ramada-kazdaglari/ramada-kazdaglari-termal-otel-dis-cephe-2.jpg", aspect: "landscape" },
      { id: "rk-03", title: "İç Mekan 1", category: "İç Mimari", alt: "Ramada Kazdağları Termal Otel lobi iç mimari tasarımı | BUTO Mimarlık", src: "/images/projects/ramada-kazdaglari/ramada-kazdaglari-termal-otel-ic-mekan.jpg", aspect: "landscape" },
      { id: "rk-04", title: "İç Mekan 2", category: "İç Mimari", alt: "Ramada Kazdağları Termal Otel oda iç mekan tasarımı | BUTO Mimarlık", src: "/images/projects/ramada-kazdaglari/ramada-kazdaglari-termal-otel-ic-mekan-2.jpg", aspect: "landscape" },
      { id: "rk-05", title: "İç Mekan 3", category: "İç Mimari", alt: "Ramada Kazdağları Termal Otel genel iç mekan tasarımı | BUTO Mimarlık", src: "/images/projects/ramada-kazdaglari/ramada-kazdaglari-termal-otel-ic-mekan-3.jpg", aspect: "landscape" },
    ]
  },
  {
    id: "boyahane",
    name: "Boyahane Mimari Projelendirme",
    scope: "Projelendirme",
    location: "Suriye",
    year: "2026",
    projects: [
      { id: "by-01", title: "Kontrol Ofisi", category: "Kontrol Ofisi", alt: "Boyahane tekstil fabrikası kontrol ofisi mimari tasarımı - Suriye | BUTO Mimarlık", src: "/images/projects/boyahane/boyahane-kontrol-ofisi-suriye.jpg", aspect: "portrait" },
      { id: "by-02", title: "Depo Genel Görünüm", category: "Depo Tasarımı", alt: "Boyahane fabrika deposu genel görünüm mimari projelendirme - Suriye | BUTO Mimarlık", src: "/images/projects/boyahane/boyahane-depo-genel-gorunum.jpg", aspect: "landscape" },
      { id: "by-03", title: "Kalite Kontrol Laboratuvarı", category: "Laboratuvar", alt: "Boyahane tekstil fabrikası kalite kontrol laboratuvarı tasarımı - Suriye | BUTO Mimarlık", src: "/images/projects/boyahane/boyahane-kalite-kontrol-lab-masalari.jpg", aspect: "landscape" },
      { id: "by-04", title: "Üretim Laboratuvarı", category: "Laboratuvar", alt: "Boyahane üretim laboratuvarı iç mekan tasarımı - Suriye | BUTO Mimarlık", src: "/images/projects/boyahane/boyahane-uretim-lab.jpg", aspect: "landscape" },
      { id: "by-05", title: "AR-GE ve Depo", category: "AR-GE Alanı", alt: "Boyahane fabrika AR-GE ve depo alanı mimari projelendirme - Suriye | BUTO Mimarlık", src: "/images/projects/boyahane/boyahane-arge-depo.jpg", aspect: "portrait" },
      { id: "by-06", title: "Tekstil Fabrikası", category: "Üretim Alanı", alt: "Boyahane tekstil fabrikası üretim atölyesi tasarımı - Suriye | BUTO Mimarlık", src: "/images/projects/boyahane/boyahane-tekstil-fabrikasi.jpg", aspect: "landscape" },
      { id: "by-07", title: "Vaziyet Planı (Kuşbakışı)", category: "Vaziyet Planı", alt: "Boyahane fabrika kuşbakışı vaziyet planı mimari proje - Suriye | BUTO Mimarlık", src: "/images/projects/boyahane/boyahane-vaziyet-plani-suriye.png", aspect: "portrait" },
      { id: "by-08", title: "Dış Cephe ve Yerleşke", category: "Dış Cephe", alt: "Boyahane fabrika yerleşkesi dış cephe mimari tasarımı - Suriye | BUTO Mimarlık", src: "/images/projects/boyahane/boyahane-dis-cephe-yerleske-suriye.png", aspect: "portrait" },
      { id: "by-09", title: "Üretim Koridoru", category: "Üretim Alanı", alt: "Boyahane fabrika üretim koridoru iç mekan tasarımı - Suriye | BUTO Mimarlık", src: "/images/projects/boyahane/boyahane-uretim-koridoru.jpg", aspect: "landscape" },
      { id: "by-10", title: "Forklift ile Taşıma", category: "Lojistik Alan", alt: "Boyahane fabrika lojistik ve taşıma alanı tasarımı - Suriye | BUTO Mimarlık", src: "/images/projects/boyahane/boyahane-forklift-tasima.jpg", aspect: "landscape" },
      { id: "by-11", title: "Kalite Kontrol Odası", category: "Laboratuvar", alt: "Boyahane kalite kontrol odası iç mimari tasarımı - Suriye | BUTO Mimarlık", src: "/images/projects/boyahane/boyahane-kalite-kontrol-laboratuvari.jpg", aspect: "landscape" },
      { id: "by-12", title: "Kumaş Rafları", category: "Depo Tasarımı", alt: "Boyahane fabrika kumaş depolama rafları tasarımı - Suriye | BUTO Mimarlık", src: "/images/projects/boyahane/boyahane-kumas-rafi.jpg", aspect: "landscape" },
      { id: "by-13", title: "Kalite Kontrol Masaları", category: "Kalite Kontrol", alt: "Boyahane kumaş kalite kontrol masaları düzeni - Suriye fabrika tasarımı | BUTO Mimarlık", src: "/images/projects/boyahane/boyahane-kalite-masalari.jpg", aspect: "landscape" },
      { id: "by-14", title: "Boyama Makineleri", category: "Üretim Alanı", alt: "Boyahane tekstil boyama makineleri üretim hattı - Suriye | BUTO Mimarlık", src: "/images/projects/boyahane/boyahane-boyama-makineleri.jpg", aspect: "landscape" },
      { id: "by-15", title: "Dikim Atölyesi", category: "Üretim Alanı", alt: "Boyahane dikim atölyesi iç mekan tasarımı - Suriye tekstil fabrikası | BUTO Mimarlık", src: "/images/projects/boyahane/boyahane-dikim-atolyesi.jpg", aspect: "landscape" },
      { id: "by-16", title: "Depo Koridoru", category: "Depo Tasarımı", alt: "Boyahane fabrika depo koridoru tasarımı - Suriye | BUTO Mimarlık", src: "/images/projects/boyahane/boyahane-depo-koridoru.jpg", aspect: "landscape" },
      { id: "by-17", title: "Tesisat Odası", category: "Tesisat Alanı", alt: "Boyahane fabrika tesisat ve makine dairesi tasarımı - Suriye | BUTO Mimarlık", src: "/images/projects/boyahane/boyahane-tesisat-odasi.jpg", aspect: "landscape" },
    ]
  },
  {
    id: "ges-keban",
    name: "GES",
    location: "Keban - Elazığ",
    year: "2026",
    projects: [
      { id: "ges-01", title: "GES Sahası", category: "GES Sahası", alt: "Keban Elazığ güneş enerjisi santrali (GES) proje sahası | BUTO Mimarlık", src: "/images/projects/ges-keban/ges-keban-elazig-santral-sahasi.jpeg", aspect: "portrait" },
      { id: "ges-02", title: "GES Sahası (Video)", category: "GES Sahası", alt: "Keban Elazığ güneş enerjisi santrali (GES) tanıtım videosu | BUTO Mimarlık", src: "/images/projects/ges-keban/ges-keban-elazig-clip.mp4", aspect: "portrait", video: true, poster: "/images/projects/ges-keban/ges-keban-elazig-poster.jpg" },
    ]
  },
  {
    id: "ofis-ivonova",
    name: "Ofis Tasarımı",
    scope: "Tasarım, Projelendirme ve 3D Görselleştirme",
    location: "Rusya - İvonova",
    year: "2023",
    projects: [
      { id: "oi-01a", title: "Kumaş Rafı", category: "Numune Odası", alt: "İvonova Rusya ofis kumaş numune rafı iç mimari tasarımı | BUTO Mimarlık", src: "/images/projects/ofis-ivonova/ofis-tasarimi-ivonova-kumas-rafi.jpg", aspect: "portrait" },
      { id: "oi-01b", title: "Çalışma Masası 1", category: "Ofis Tasarımı", alt: "İvonova Rusya ofis çalışma masası iç mekan tasarımı | BUTO Mimarlık", src: "/images/projects/ofis-ivonova/ofis-tasarimi-ivonova-calisma-masasi-1.jpg", aspect: "portrait" },
      { id: "oi-01c", title: "Kumaş Koridoru", category: "Numune Odası", alt: "İvonova Rusya ofis kumaş numune koridoru tasarımı | BUTO Mimarlık", src: "/images/projects/ofis-ivonova/ofis-tasarimi-ivonova-kumas-koridoru.jpg", aspect: "portrait" },
      { id: "oi-01d", title: "Numune Bölmesi", category: "Numune Odası", alt: "İvonova Rusya ofis kumaş numune bölmesi iç mimari tasarımı | BUTO Mimarlık", src: "/images/projects/ofis-ivonova/ofis-tasarimi-ivonova-numune-bolme.jpg", aspect: "portrait" },
      { id: "oi-01e", title: "Çalışma Masası 2", category: "Ofis Tasarımı", alt: "İvonova Rusya ofis ikinci çalışma masası tasarımı | BUTO Mimarlık", src: "/images/projects/ofis-ivonova/ofis-tasarimi-ivonova-calisma-masasi-2.jpg", aspect: "portrait" },
      { id: "oi-02", title: "Toplantı ve Numune Alanı", category: "Toplantı Odası", alt: "İvonova Rusya ofis toplantı ve numune alanı 3D tasarım | BUTO Mimarlık", src: "/images/projects/ofis-ivonova/ofis-tasarimi-ivonova-toplanti-numune-alani.png", aspect: "landscape" },
      { id: "oi-03", title: "Ofis Genel Görünüm", category: "Ofis Tasarımı", alt: "İvonova Rusya ofis genel iç mekan görünümü | BUTO Mimarlık", src: "/images/projects/ofis-ivonova/ofis-tasarimi-ivonova-genel-gorunum.png", aspect: "landscape" },
      { id: "oi-04", title: "Toplantı Odası", category: "Toplantı Odası", alt: "İvonova Rusya ofis toplantı odası iç mimari tasarımı | BUTO Mimarlık", src: "/images/projects/ofis-ivonova/ofis-tasarimi-ivonova-toplanti-odasi.png", aspect: "landscape" },
      { id: "oi-05", title: "Çalışma Alanı", category: "Ofis Tasarımı", alt: "İvonova Rusya ofis açık çalışma alanı tasarımı | BUTO Mimarlık", src: "/images/projects/ofis-ivonova/ofis-tasarimi-ivonova-calisma-alani.png", aspect: "landscape" },
      { id: "oi-06", title: "Ofis ve Toplantı Alanı", category: "Ofis Tasarımı", alt: "İvonova Rusya ofis ve toplantı alanı genel görünüm | BUTO Mimarlık", src: "/images/projects/ofis-ivonova/ofis-tasarimi-ivonova-ofis-toplanti-alani.png", aspect: "landscape" },
    ]
  },
  {
    id: "villa-silivri",
    name: "Villa Tasarımı",
    scope: "Tasarım, Projelendirme ve Uygulama",
    location: "Silivri - İstanbul",
    year: "2021-2022",
    projects: [
      { id: "vs-01", title: "Spor Alanı", category: "Spor Alanı", alt: "Silivri İstanbul villa özel spor salonu iç mimari tasarımı | BUTO Mimarlık", src: "/images/projects/villa-silivri/villa-tasarimi-silivri-spor-alani.png", aspect: "portrait" },
      { id: "vs-02", title: "Özel Spor Salonu", category: "Spor Alanı", alt: "Silivri İstanbul villa spor salonu ekipman alanı tasarımı | BUTO Mimarlık", src: "/images/projects/villa-silivri/villa-tasarimi-silivri-ozel-spor-salonu.png", aspect: "portrait" },
      { id: "vs-03", title: "Teras Dekorasyonu", category: "Teras Tasarımı", alt: "Silivri İstanbul villa teras dekorasyonu peyzaj tasarımı | BUTO Mimarlık", src: "/images/projects/villa-silivri/villa-tasarimi-silivri-teras-dekorasyonu.png", aspect: "landscape" },
      { id: "vs-04", title: "Döner Merdiven", category: "İç Mimari", alt: "Silivri İstanbul villa döner merdiven iç mimari tasarımı | BUTO Mimarlık", src: "/images/projects/villa-silivri/villa-tasarimi-silivri-doner-merdiven.png", aspect: "portrait" },
    ]
  },
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
        className="max-w-6xl mx-auto px-8 md:px-12 lg:px-16 pt-12 pb-12 text-center"
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
        <div className="mt-6 h-px w-16 bg-earth mx-auto" />
      </div>

      <div className="flex flex-col gap-24 md:gap-32 pb-24">
        {firms.map((firm, firmIndex) => {
          const metaLine = [
            firm.scope,
            firm.location ? `📍 ${firm.location}` : null,
            firm.year,
          ]
            .filter(Boolean)
            .join(" · ");

          return (
            <div key={firm.id} className="relative w-full flex flex-col justify-center">
              <div className="px-8 md:px-12 lg:px-16 mb-8 flex justify-between items-end">
                <div>
                  <div className="flex items-center gap-4 flex-wrap mb-2">
                    <h3
                      className="text-3xl md:text-5xl text-cream"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {firm.name}
                    </h3>
                    {firm.tag && (
                      <span
                        className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-earth border border-earth/50 rounded-full px-4 py-1.5"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {firm.tag}
                      </span>
                    )}
                  </div>
                  <p
                    className="text-mist text-sm md:text-base tracking-[0.1em]"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    {metaLine}
                  </p>
                </div>
              </div>

              {firm.projects.length > 0 ? (
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
                    {firm.projects.map((project, projectIndex) => (
                      <div
                        key={project.id}
                        className="group relative flex-shrink-0 snap-center overflow-hidden bg-ink-dark h-[50vh] md:h-[65vh]"
                        style={{
                          width: project.aspect === "landscape" ? "clamp(320px, 45vw, 640px)" : "clamp(220px, 28vw, 400px)",
                        }}
                      >
                        {project.video ? (
                          <video
                            src={project.src}
                            poster={project.poster}
                            className="absolute inset-0 w-full h-full object-cover"
                            controls
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            aria-label={project.alt}
                          />
                        ) : (
                          <Image
                            src={project.src}
                            alt={project.alt}
                            title={project.title}
                            fill
                            className="object-cover animate-breathe"
                            style={{ animationDelay: `${-(projectIndex % 5) * 1.4}s` }}
                          />
                        )}
                        <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/70 transition-all duration-500 flex flex-col justify-end p-8 pointer-events-none">
                          <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <span
                              className="block text-xs tracking-[0.4em] text-mist mb-2 uppercase"
                              style={{ fontFamily: "var(--font-jakarta)" }}
                            >
                              {project.category}
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
              ) : (
                <div className="px-8 md:px-12 lg:px-16">
                  <div className="h-[40vh] md:h-[50vh] border border-dashed border-earth/30 flex items-center justify-center">
                    <span
                      className="text-mist text-xs md:text-sm tracking-[0.3em] uppercase"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      Görseller Eklenecek
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
