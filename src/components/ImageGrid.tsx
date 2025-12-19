"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";

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
    layoutEffect: false,
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

    // Parallax effect for background - moves slower than container
    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 50], {
      ease: easeOutCubic,
    });

    return (
      <motion.div
        ref={ref}
        style={{ 
          y, 
          x, 
          rotate,
          willChange: "transform",
          opacity: 1,
          transition: "transform 0.15s ease-out",
          zIndex: 10002,
          backgroundColor: '#1d1d1f'
        }}
        className="rounded-3xl overflow-hidden shadow-md h-[380px] hover-target image-card relative"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        {/* Background image with parallax effect */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-3xl"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            y: backgroundY,
            scale: 1.1, // Slight scale to prevent gaps during parallax
          }}
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
          willChange: "transform",
          opacity: 1,
          transition: "transform 0.15s ease-out",
          zIndex: 10002,
          backgroundColor: '#1d1d1f'
        }}
        className="rounded-3xl overflow-hidden shadow-md h-[380px] hover-target image-card"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <Image
          src={src}
          alt={`Portfolio ${index + 1}`}
          fill
          className="object-cover rounded-3xl transition-transform duration-300"
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

    // Parallax effect for background - moves slower than container
    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 50], {
      ease: easeOutCubic,
    });

    return (
      <motion.div
        ref={ref}
        style={{ 
          y, 
          x, 
          rotate,
          willChange: "transform",
          opacity: 1,
          transition: "transform 0.15s ease-out",
          zIndex: 10002,
          backgroundColor: '#1d1d1f'
        }}
        className="rounded-3xl overflow-hidden shadow-md h-[380px] hover-target image-card relative"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
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
        {/* Background image with parallax effect */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-3xl"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            y: backgroundY,
            scale: 1.1, // Slight scale to prevent gaps during parallax
          }}
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
          willChange: "transform",
          transition: "transform 0.15s ease-out",
          zIndex: 10002,
          backgroundColor: '#1d1d1f'
        }}
        className="rounded-3xl overflow-hidden shadow-md h-[380px] hover-target image-card"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <Image
          src={src}
          alt={`Portfolio ${index + 1}`}
          fill
          className="object-cover rounded-3xl transition-transform duration-300"
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
  const sectionRef = useRef<HTMLElement>(null);
  
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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Get original cursors to hide them in ImageGrid section
    const originalCursor = document.querySelector(".custom-cursor") as HTMLElement;
    const originalCursorFollower = document.querySelector(".cursor-follower") as HTMLElement;

    // Create separate black cursor ONLY for ImageGrid section
    const imageGridCursor = document.createElement("div");
    imageGridCursor.className = "imagegrid-cursor";
    imageGridCursor.style.position = "fixed";
    imageGridCursor.style.width = "8px";
    imageGridCursor.style.height = "8px";
    imageGridCursor.style.backgroundColor = "#000000";
    imageGridCursor.style.borderRadius = "50%";
    imageGridCursor.style.pointerEvents = "none";
    imageGridCursor.style.zIndex = "10001";
    imageGridCursor.style.opacity = "0";
    imageGridCursor.style.left = "0px";
    imageGridCursor.style.top = "0px";
    imageGridCursor.style.transform = "translate(-50%, -50%)";
    imageGridCursor.style.mixBlendMode = "normal";
    imageGridCursor.style.display = "flex";
    imageGridCursor.style.alignItems = "center";
    imageGridCursor.style.justifyContent = "center";
    imageGridCursor.style.transition = "width 0.3s ease, height 0.3s ease";
    
    // Add text element for "View Detail"
    const cursorText = document.createElement("span");
    cursorText.textContent = "View Detail";
    cursorText.style.color = "#ffffff";
    cursorText.style.fontSize = "10px";
    cursorText.style.fontWeight = "600";
    cursorText.style.whiteSpace = "nowrap";
    cursorText.style.opacity = "0";
    cursorText.style.transition = "opacity 0.3s ease";
    cursorText.style.pointerEvents = "none";
    imageGridCursor.appendChild(cursorText);
    
    document.body.appendChild(imageGridCursor);

    let isInsideSection = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let isHoveringImage = false;
    let currentHoveredImage: HTMLElement | null = null;
    let mousePositionKnown = false;

    const updateCursor = (x: number, y: number, forceUpdate = false) => {
      // Always update last known position
      lastMouseX = x;
      lastMouseY = y;

      // Get element at current mouse position
      // Get element at point - try multiple times if needed during scroll
      let point = document.elementFromPoint(x, y) as HTMLElement;
      if (!point && forceUpdate) {
        // Retry after a small delay if element not found (scroll might be in progress)
        setTimeout(() => {
          point = document.elementFromPoint(x, y) as HTMLElement;
        }, 10);
      }
      
      const insideSection = point && section.contains(point);
      let hoveringImage = false;
      if (point) {
        let current: HTMLElement | null = point;
        // Check up to 10 levels up to find image-card (increased for better detection)
        let levels = 0;
        while (current && current !== section && levels < 10) {
          if (current.classList && current.classList.contains("image-card")) {
            hoveringImage = true;
            break;
          }
          current = current.parentElement;
          levels++;
        }
        // Also check if point is inside an image element
        if (!hoveringImage && point.tagName === "IMG") {
          const imgParent = point.closest(".image-card");
          if (imgParent) {
            hoveringImage = true;
          }
        }
        // Also check if point is inside motion div (framer-motion wrapper)
        if (!hoveringImage) {
          let checkCurrent: HTMLElement | null = point;
          while (checkCurrent && checkCurrent !== section) {
            if (checkCurrent.classList && checkCurrent.classList.contains("image-card")) {
              hoveringImage = true;
              break;
            }
            checkCurrent = checkCurrent.parentElement;
          }
        }
      }
      
      // Check if hovering over image
      if (hoveringImage) {
        if (!isHoveringImage) {
          isHoveringImage = true;
          // Increase cursor size
          imageGridCursor.style.width = "100px";
          imageGridCursor.style.height = "100px";
          imageGridCursor.style.borderRadius = "50%";
          // Show text
          cursorText.style.opacity = "1";
          
          // Trigger hover on image card for scale
          if (point) {
            let imageCard: HTMLElement | null = null;
            let current: HTMLElement | null = point;
            while (current && current !== section) {
              if (current.classList && current.classList.contains("image-card")) {
                imageCard = current;
                break;
              }
              current = current.parentElement;
            }
            if (imageCard) {
              // Add hover class to trigger scale
              imageCard.classList.add("image-hover");
              // Dispatch mouseenter event to trigger framer-motion hover
              const mouseEnterEvent = new MouseEvent("mouseenter", {
                bubbles: true,
                cancelable: true,
                view: window
              });
              imageCard.dispatchEvent(mouseEnterEvent);
            }
          }
        }
      } else {
        if (isHoveringImage) {
          isHoveringImage = false;
          // Reset cursor size
          imageGridCursor.style.width = "8px";
          imageGridCursor.style.height = "8px";
          imageGridCursor.style.borderRadius = "50%";
          // Hide text
          cursorText.style.opacity = "0";
          
          // Remove hover class and trigger mouseleave on all image cards
          const allImageCards = section.querySelectorAll(".image-card");
          allImageCards.forEach((card) => {
            card.classList.remove("image-hover");
            const mouseLeaveEvent = new MouseEvent("mouseleave", {
              bubbles: true,
              cancelable: true,
              view: window
            });
            card.dispatchEvent(mouseLeaveEvent);
          });
        }
      }
      
      if (insideSection) {
        // Hide original cursors instantly
        if (originalCursor) {
          originalCursor.style.display = "none";
        }
        if (originalCursorFollower) {
          originalCursorFollower.style.display = "none";
        }

        // Show ImageGrid cursor instantly
        if (!isInsideSection || forceUpdate) {
          isInsideSection = true;
          imageGridCursor.style.opacity = "1";
          imageGridCursor.style.display = "flex";
        }
        // Always update cursor position
        imageGridCursor.style.left = x + "px";
        imageGridCursor.style.top = y + "px";
      } else {
        // Show original cursors instantly
        if (originalCursor) {
          originalCursor.style.display = "block";
        }
        if (originalCursorFollower) {
          originalCursorFollower.style.display = "block";
        }

        // Hide ImageGrid cursor instantly
        if (isInsideSection || forceUpdate) {
          isInsideSection = false;
          imageGridCursor.style.opacity = "0";
          imageGridCursor.style.display = "none";
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Always update mouse position
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      mousePositionKnown = true;
      updateCursor(e.clientX, e.clientY);
    };

    // Function to check hover on all images
    const checkImageHover = () => {
      let foundImage: HTMLElement | null = null;
      
      // Always check all image cards using bounding boxes - this is more reliable during scroll
      const allImageCards = Array.from(section.querySelectorAll(".image-card")) as HTMLElement[];
      
      // Use last known mouse position, or viewport center as fallback
      let checkX = lastMouseX;
      let checkY = lastMouseY;
      
      // If mouse position not known or invalid, use viewport center
      if (!mousePositionKnown || (checkX === 0 && checkY === 0)) {
        checkX = window.innerWidth / 2;
        checkY = window.innerHeight / 2;
      }
      
      // Always check bounding boxes FIRST - this is the most reliable method for Y-axis scroll
      allImageCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        // Check both X and Y coordinates properly
        const isXInside = checkX >= rect.left && checkX <= rect.right;
        const isYInside = checkY >= rect.top && checkY <= rect.bottom;
        
        if (isXInside && isYInside) {
          foundImage = card;
        }
      });
      
      // Fallback: Try elementFromPoint if bounding box check didn't find anything
      if (!foundImage) {
        const elementAtPoint = document.elementFromPoint(checkX, checkY) as HTMLElement;
        if (elementAtPoint) {
          let current: HTMLElement | null = elementAtPoint;
          let levels = 0;
          while (current && current !== section && levels < 10) {
            if (current.classList && current.classList.contains("image-card")) {
              foundImage = current;
              break;
            }
            current = current.parentElement;
            levels++;
          }
        }
      }
      
      // If hovering over image, trigger hover immediately
      if (foundImage && foundImage !== currentHoveredImage) {
        // Remove hover from previous image
        if (currentHoveredImage) {
          currentHoveredImage.classList.remove("image-hover");
          const mouseLeaveEvent = new MouseEvent("mouseleave", {
            bubbles: true,
            cancelable: true,
            view: window
          });
          currentHoveredImage.dispatchEvent(mouseLeaveEvent);
        }
        
        // Add hover to new image
        currentHoveredImage = foundImage;
        const imageEl = foundImage as HTMLElement;
        imageEl.classList.add("image-hover");
        const mouseEnterEvent = new MouseEvent("mouseenter", {
          bubbles: true,
          cancelable: true,
          view: window
        });
        imageEl.dispatchEvent(mouseEnterEvent);
      } else if (!foundImage && currentHoveredImage) {
        // Not hovering over any image, remove hover
        currentHoveredImage.classList.remove("image-hover");
        const mouseLeaveEvent = new MouseEvent("mouseleave", {
          bubbles: true,
          cancelable: true,
          view: window
        });
        currentHoveredImage.dispatchEvent(mouseLeaveEvent);
        currentHoveredImage = null;
      }
      
      // Also call updateCursor for cursor position
      if (lastMouseX > 0 || lastMouseY > 0) {
        updateCursor(lastMouseX, lastMouseY, true);
      }
    };
    
    // Throttled scroll handler to prevent excessive checks
    let scrollTimeout: number | null = null;
    let scrollStopTimeout: number | null = null;
    let lastScrollTime = 0;
    const SCROLL_THROTTLE = 16; // ~60fps
    
    const handleScroll = () => {
      const now = Date.now();
      
      // Throttle scroll checks
      if (now - lastScrollTime < SCROLL_THROTTLE) {
        return;
      }
      lastScrollTime = now;
      
      // Clear previous timeout
      if (scrollStopTimeout !== null) {
        clearTimeout(scrollStopTimeout);
      }
      
      // Cancel previous frame
      if (scrollTimeout !== null) {
        cancelAnimationFrame(scrollTimeout);
      }
      
      // Check immediately on every scroll - don't wait for next frame
      // This ensures detection works even during fast Y-axis scrolling
      checkImageHover();
      
      // Also check on next frame for smooth updates
      scrollTimeout = requestAnimationFrame(() => {
        checkImageHover();
        scrollTimeout = null;
      });
      
      // Stop checking after scroll stops (debounce)
      scrollStopTimeout = window.setTimeout(() => {
        // Final check when scroll stops
        checkImageHover();
      }, 150);
    };

    // Also track mouse position even when not moving (for scroll scenarios)
    const handleMouseOver = (e: MouseEvent) => {
      // Update mouse position
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      mousePositionKnown = true;
      updateCursor(e.clientX, e.clientY);
    };

    // Track mouse position globally - this is critical for Y-axis scroll detection
    const trackMousePosition = (e: MouseEvent) => {
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      mousePositionKnown = true;
    };
    
    // Also track on document to catch all mouse movements
    const handleDocumentMouseMove = (e: MouseEvent) => {
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      mousePositionKnown = true;
    };
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousemove", trackMousePosition, { passive: true });
    document.addEventListener("mousemove", handleDocumentMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: false, capture: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    
    // Also add wheel event for better scroll detection
    window.addEventListener("wheel", handleScroll, { passive: false, capture: true });
    
    // Touch handler for touch devices
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
        mousePositionKnown = true;
        handleScroll();
      }
    };
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      // Remove all event listeners
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", trackMousePosition);
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseover", handleMouseOver);
      
      // Cancel all pending operations
      if (scrollTimeout !== null) {
        cancelAnimationFrame(scrollTimeout);
        scrollTimeout = null;
      }
      if (scrollStopTimeout !== null) {
        clearTimeout(scrollStopTimeout);
        scrollStopTimeout = null;
      }
      
      // Restore original cursors
      if (originalCursor) {
        originalCursor.style.display = "block";
      }
      if (originalCursorFollower) {
        originalCursorFollower.style.display = "block";
      }
      if (imageGridCursor.parentNode) {
        imageGridCursor.parentNode.removeChild(imageGridCursor);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full min-h-screen py-20 px-6 md:px-16 bg-white relative">
      {/* Overlay div with black border and z-index 1000 */}
      <div 
        className="absolute inset-0 border-black pointer-events-none"
        style={{ 
          zIndex: 1,
          borderWidth: '30px',
          borderRadius: '50px',
          backgroundColor: '#1d1d1f',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
        {/* TITLE */}
        <h1 className="text-[14vw] leading-none font-bold tracking-tight mb-20 text-black text-center relative z-10">
          Portfolio
        </h1>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
          {IMAGES.map((item, i) => (
            <ImageCard key={i} src={item.src} type={item.type} index={i} />
          ))}
        </div>
    </section>
  );
};

export default ImageGrid;
