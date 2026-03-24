"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";

import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import AMGScrollCanvas from "@/components/AMGScrollCanvas";
import AMGExperience from "@/components/AMGExperience";
import SpecsGrid from "@/components/SpecsGrid";
import RecordsSection from "@/components/RecordsSection";
import EngineSection from "@/components/EngineSection";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";

const TOTAL_FRAMES = 192;
const IMAGE_FOLDER = "/images/amg-sequence";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="bg-amg-black">
      <Navbar />
      <ScrollProgress />

      {/* SCROLL SEQUENCE - 700vh sticky lock */}
      <section ref={containerRef} className="relative" style={{ height: "700vh" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <AMGScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={TOTAL_FRAMES}
            imageFolderPath={IMAGE_FOLDER}
          />
          <AMGExperience scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* POST-SEQUENCE CONTENT */}
      <div className="relative z-20 bg-amg-black">
        <SpecsGrid />
        <RecordsSection />
        <EngineSection />
        <GallerySection />
        <Footer />
      </div>
    </main>
  );
}
