"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MinimalHero = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Fade in animation on load
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      }
    );

    // Scroll-based fade out
    gsap.to(textRef.current, {
      opacity: 0,
      y: -50,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center bg-white px-6 sm:px-12 lg:px-24"
    >
      <div ref={textRef} className="text-center">
        <h1 className="text-[20vw] sm:text-[25vw] lg:text-[30vw] font-bold leading-[0.9] text-gray-900 tracking-tight">
          Creative
          <br />
          <span className="text-gray-400">Portfolio</span>
        </h1>
      </div>
    </section>
  );
};

export default MinimalHero;

