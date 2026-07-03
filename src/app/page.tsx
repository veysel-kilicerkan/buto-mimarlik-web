"use client";

import { useState } from "react";
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
