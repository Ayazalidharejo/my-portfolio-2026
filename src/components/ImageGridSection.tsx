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

const ImageGridSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftImagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightImagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const centerImagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate left column images (move down on scroll)
    leftImagesRef.current.forEach((img, idx) => {
      if (img) {
        // Animate y position to move down
        gsap.to(img, {
          y: 50, // Move down - positive value
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 20, // Very high scrub = extremely smooth and slow
            id: `left-image-${idx}`,
          },
        });
      }
    });

    // Animate right column images (move down on scroll)
    rightImagesRef.current.forEach((img, idx) => {
      if (img) {
        // Animate y position to move down
        gsap.to(img, {
          y: 50, // Move down - positive value
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 20, // Very high scrub = extremely smooth and slow
            id: `right-image-${idx}`,
          },
        });
      }
    });

    // Animate center column images (move up on scroll)
    centerImagesRef.current.forEach((img, idx) => {
      if (img) {
        // Animate y position to move up
        gsap.to(img, {
          y: -100, // Move up - negative value
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2, // Smooth animation
            id: `center-image-${idx}`,
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-dark via-[#0f172a] to-dark py-24 overflow-hidden"
      style={{ position: 'relative' }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">My</span>{" "}
            <span className="bg-gradient-to-r from-primary via-[#7dd3fc] to-secondary bg-clip-text text-transparent">
              Gallery
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            A collection of beautiful moments and experiences
          </p>
        </div>

        {/* Image Grid - 3 rows, 3 images per row (9 total) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {IMAGES.map((image, index) => {
            // Determine column position: 0 = left, 1 = center, 2 = right
            const column = index % 3;
            // Left (0, 3, 6) and Right (2, 5, 8) columns get background-attachment: fixed
            const isLeft = column === 0;
            const isRight = column === 2;
            const isLeftOrRight = isLeft || isRight;
            
            return (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
              >
                {isLeftOrRight ? (
                  <div
                    id={isLeft ? `left-image-${index}` : `right-image-${index}`}
                    ref={(el) => {
                      if (isLeft) {
                        leftImagesRef.current[index] = el;
                      } else if (isRight) {
                        rightImagesRef.current[index] = el;
                      }
                    }}
                    className="absolute inset-0 w-full h-full"
                    style={{
                      backgroundImage: `url(${image.src})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center 0%',
                      backgroundAttachment: 'fixed',
                      backgroundRepeat: 'no-repeat',
                      willChange: 'background-position',
                    }}
                  />
                ) : (
                  <div
                    ref={(el) => {
                      centerImagesRef.current[index] = el;
                    }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      unoptimized
                    />
                  </div>
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImageGridSection;

