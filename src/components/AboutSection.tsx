"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import ScrollReveal from "./ScrollReveal";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    const ctx = gsap.context(() => {
      // Use SplitType instead of SplitText (premium plugin)
      const split = new SplitType(titleRef.current!, { types: "chars" });
      const chars = titleRef.current!.querySelectorAll(".char");

      gsap.from(chars, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        opacity: 0,
        y: 40,
        stagger: 0.03,
        duration: 0.5,
        ease: "power3.out",
      });

      // Image ScrollReveal-style animations
      if (imageRef.current && imageContainerRef.current) {
        // Rotation animation
        gsap.fromTo(
          imageContainerRef.current,
          { transformOrigin: "50% 50%", rotate: -8, scale: 0.85 },
          {
            ease: "none",
            rotate: 0,
            scale: 1,
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          }
        );

        // Opacity and blur animation
        gsap.fromTo(
          imageRef.current,
          {
            opacity: 0,
            filter: "blur(15px)",
            scale: 1.1,
          },
          {
            ease: "none",
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: "top bottom-=20%",
              end: "bottom bottom",
              scrub: true,
            },
          }
        );

        // Parallax effect
        gsap.to(imageContainerRef.current, {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Parallax floating layers
      gsap.to(".float-layer", {
        y: -120,
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
        },
      });

      // Dark → Light auto theme animation
      gsap.to("body", {
        backgroundColor: "#ffffff",
        color: "#000000",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom bottom",
          end: "+=500",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden px-6 py-12"
    >
      {/* Floating Layers */}
      <div className="float-layer absolute top-10 left-10 w-40 h-40 rounded-full bg-purple-500/20 blur-3xl"></div>
      <div className="float-layer absolute bottom-10 right-10 w-52 h-52 rounded-full bg-blue-500/20 blur-3xl"></div>

      <div className="max-w-7xl mx-auto">
        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Experience Timeline
        </h1>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Side - ScrollReveal */}
          <div className="relative z-10">
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={5}
              blurStrength={10}
            >
              When does a man die? When he is hit by a bullet? No! When he suffers a disease?
              No! When he ate a soup made out of a poisonous mushroom?
              No! A man dies when he is forgotten!
            </ScrollReveal>
          </div>

          {/* Right Side - Animated Image */}
          <div
            ref={imageContainerRef}
            className="relative w-full h-[350px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl will-change-transform"
          >
            <div
              ref={imageRef}
              className="relative w-full h-full will-change-transform"
            >
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80"
                alt="About Me"
                fill
                className="object-cover rounded-3xl"
                unoptimized
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-transparent" />
              {/* Glow effect */}
              <div className="absolute -inset-8 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-3xl blur-3xl -z-10 opacity-70" />
              {/* Border glow */}
              <div className="absolute inset-0 border-2 border-white/20 rounded-3xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
