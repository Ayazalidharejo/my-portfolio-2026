"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ImageGrid from "@/components/ImageGrid";
import CustomCursor from "@/components/CustomCursor";
import Lenis from "lenis";

export default function HomePage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black antialiased cursor-none">
      <CustomCursor />
      <Header />
      <main id="home">
        <Hero />
        <AboutSection />
        <ImageGrid />
      </main>

      <a
        href="#home"
        className="fixed right-6 bottom-8 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-105 transition-transform duration-120 hover-target"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12l7-7 7 7" />
        </svg>
      </a>
    </div>
  );
}
