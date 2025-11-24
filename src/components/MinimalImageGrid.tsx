"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    alt: "Image 1",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    alt: "Image 2",
  },
  {
    src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80",
    alt: "Image 3",
  },
  {
    src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80",
    alt: "Image 4",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    alt: "Image 5",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    alt: "Image 6",
  },
  {
    src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
    alt: "Image 7",
  },
  {
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80",
    alt: "Image 8",
  },
  {
    src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
    alt: "Image 9",
  },
];

const MinimalImageGrid = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Staggered animation for images on scroll
    imageRefs.current.forEach((img, index) => {
      if (img) {
        gsap.fromTo(
          img,
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none none",
            },
            delay: index * 0.1, // Stagger delay
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="min-h-screen bg-white py-24 px-6 sm:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-16">
          <h2 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 mb-4">
            Selected
            <br />
            <span className="text-gray-400">Work</span>
          </h2>
        </div>

        {/* Image Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {IMAGES.map((image, index) => (
            <div
              key={index}
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
              className="relative aspect-square overflow-hidden rounded-[24px] group cursor-pointer"
              style={{
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                unoptimized
              />
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MinimalImageGrid;

