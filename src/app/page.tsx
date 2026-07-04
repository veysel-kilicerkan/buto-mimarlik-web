"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "@/components/Preloader";
import CanvasSequence from "@/components/CanvasSequence";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import TopBar from "@/components/TopBar";
import WhatsAppButton from "@/components/WhatsAppButton";

type Phase = "loading" | "scrolling" | "site";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("loading");

  // Late-loading fonts/images can shift section heights after ScrollTrigger's
  // pin spacers are first measured, which throws off scroll distance the most
  // at the very end of the page. Refresh once everything has settled.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return (
    <>
      {phase === "loading" && (
        <Preloader onComplete={() => setPhase("scrolling")} />
      )}

      {(phase === "scrolling" || phase === "site") && (
        <>
          <main>
            <CanvasSequence
              onComplete={() => {
                if (phase === "scrolling") setPhase("site");
              }}
            />
            <Hero />
            <About />
            <Services />
            <Projects />
            <Contact />
          </main>
          <TopBar visible={phase === "site"} phase={phase} />
          <WhatsAppButton />
        </>
      )}
    </>
  );
}
