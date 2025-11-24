"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

// Custom easing functions
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// =========================
// IMAGE CARD WITH ARC MOTION & CURVED PATHS
// =========================
function ImageCard({
  src,
  type,
  index,
}: {
  src: string;
  type: "left" | "center" | "right" | "phone";
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  if (type === "left") {
    // LEFT: VERY SLOW movement - barely visible
    const y = useTransform(scrollYProgress, [0, 1], [0, -30], {
      ease: easeOutCubic,
    });

    // Arc motion: very subtle curve to left
    const x = useTransform(scrollYProgress, [0, 0.5, 1], [0, -5, -12], {
      ease: easeInOutCubic,
    });

    // Very slight rotation
    const rotate = useTransform(scrollYProgress, [0, 1], [0, -0.5], {
      ease: easeOutCubic,
    });

    return (
      <motion.div
        ref={ref}
        style={{ 
          y, 
          x, 
          rotate,
          willChange: "transform" 
        }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.12, 
          ease: [0.25, 0.46, 0.45, 0.94] 
        }}
        viewport={{ once: true, amount: 0.3 }}
        className="rounded-3xl overflow-hidden shadow-md h-[380px] bg-gray-100 hover-target"
      >
        <Image
          src={src}
          alt={`Portfolio ${index + 1}`}
          fill
          className="object-cover rounded-3xl"
          unoptimized
        />
      </motion.div>
    );
  }

  if (type === "center") {
    // CENTER: VERY FAST upward movement
    const y = useTransform(scrollYProgress, [0, 1], [0, -400], {
      ease: easeOutCubic,
    });

    // Minimal x movement
    const x = useTransform(scrollYProgress, [0, 1], [0, -8], {
      ease: easeOutCubic,
    });

    // Slight tilt (2 degrees)
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 2], {
      ease: easeOutCubic,
    });

    return (
      <motion.div
        ref={ref}
        style={{ 
          y, 
          x, 
          rotate,
          willChange: "transform" 
        }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.12, 
          ease: [0.25, 0.46, 0.45, 0.94] 
        }}
        viewport={{ once: true, amount: 0.3 }}
        className="rounded-3xl overflow-hidden shadow-md h-[380px] bg-gray-100 hover-target"
      >
        <Image
          src={src}
          alt={`Portfolio ${index + 1}`}
          fill
          className="object-cover rounded-3xl"
          unoptimized
        />
      </motion.div>
    );
  }

  if (type === "right") {
    // RIGHT: VERY SLOW movement - barely visible
    const y = useTransform(scrollYProgress, [0, 1], [0, -30], {
      ease: easeOutCubic,
    });

    // Arc motion: very subtle curve to right
    const x = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, 12], {
      ease: easeInOutCubic,
    });

    // Very slight rotation
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 0.5], {
      ease: easeOutCubic,
    });

    return (
      <motion.div
        ref={ref}
        style={{ 
          y, 
          x, 
          rotate,
          willChange: "transform" 
        }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.12, 
          ease: [0.25, 0.46, 0.45, 0.94] 
        }}
        viewport={{ once: true, amount: 0.3 }}
        className="rounded-3xl overflow-hidden shadow-md h-[380px] bg-gray-100 hover-target"
        onMouseEnter={() => {
          window.dispatchEvent(
            new CustomEvent("imageHover", {
              detail: { type: "right", isHovering: true },
            })
          );
        }}
        onMouseLeave={() => {
          window.dispatchEvent(
            new CustomEvent("imageHover", {
              detail: { type: "right", isHovering: false },
            })
          );
        }}
      >
        <Image
          src={src}
          alt={`Portfolio ${index + 1}`}
          fill
          className="object-cover rounded-3xl"
          unoptimized
        />
      </motion.div>
    );
  }

  if (type === "phone") {
    // PHONE: Fastest movement, rotation, floats forward
    const y = useTransform(scrollYProgress, [0, 1], [0, -280], {
      ease: easeOutCubic,
    });

    // Forward float effect
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05], {
      ease: easeOutCubic,
    });

    // Rotation on scroll
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 3], {
      ease: easeInOutCubic,
    });

    return (
      <motion.div
        ref={ref}
        style={{ 
          y, 
          scale,
          rotate,
          willChange: "transform" 
        }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.12, 
          ease: [0.25, 0.46, 0.45, 0.94] 
        }}
        viewport={{ once: true, amount: 0.3 }}
        className="rounded-3xl overflow-hidden shadow-md h-[380px] bg-gray-100 hover-target"
      >
        <Image
          src={src}
          alt={`Portfolio ${index + 1}`}
          fill
          className="object-cover rounded-3xl"
          unoptimized
        />
      </motion.div>
    );
  }

  return null;
}

// =========================
// MAIN PORTFOLIO SECTION
// =========================
const ImageGrid = () => {
  const IMAGES = [
    // Row 1
    { src: "https://picsum.photos/id/1015/800/800", type: "left" as const },
    { src: "https://picsum.photos/id/1011/800/800", type: "center" as const },
    { src: "https://picsum.photos/id/984/800/800", type: "right" as const },
    // Row 2
    { src: "https://picsum.photos/id/1050/800/800", type: "left" as const },
    { src: "https://picsum.photos/id/1044/800/800", type: "center" as const },
    { src: "https://picsum.photos/id/1041/800/800", type: "right" as const },
    // Row 3
    { src: "https://picsum.photos/id/1035/800/800", type: "left" as const },
    { src: "https://picsum.photos/id/1025/800/800", type: "center" as const },
    { src: "https://picsum.photos/id/1020/800/800", type: "right" as const },
  ];

  return (
    <section className="w-full min-h-screen py-20 px-6 md:px-16 bg-white relative">
      {/* Main Div - overlay with 20% gray bg */}
     
        {/* TITLE */}
        <h1 className="text-[14vw] leading-none font-bold tracking-tight mb-20 text-black text-center">
          Portfolio
        </h1>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {IMAGES.map((item, i) => (
            <ImageCard key={i} src={item.src} type={item.type} index={i} />
          ))}
        </div>
    
    </section>
  );
};

export default ImageGrid;
