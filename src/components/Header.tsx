"use client";

import { useEffect, useRef } from "react";
import "./Button53.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!headerRef.current || !logoRef.current || !navRef.current || !ctaRef.current) return;

    // Initial header animation
    gsap.from([logoRef.current, navRef.current.children, ctaRef.current], {
      y: -20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });

    // Header scroll animation - width increase on scroll
    ScrollTrigger.create({
      trigger: document.body,
      start: "top -100",
      onEnter: () => {
        gsap.to(headerRef.current, {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          width: "calc(100% - 100px)",
          left: "50px",
          right: "50px",
          duration: 0.5,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(headerRef.current, {
          backgroundColor: "rgba(255, 255, 255, 0)",
          backdropFilter: "blur(0px)",
          boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
          width: "70%",
          left: "15%",
          right: "15%",
          duration: 0.5,
          ease: "power2.out",
        });
      },
    });

    // Listen for hover events from image section
    const handleImageHover = (e: CustomEvent) => {
      const { type, isHovering } = e.detail;
      
      if (type === "right" && isHovering) {
        // Amazing header animation on right image hover
        gsap.to(logoRef.current, {
          scale: 1.15,
          rotation: 8,
          color: "#000",
          duration: 0.6,
          ease: "back.out(1.7)",
        });
        
        if (navRef.current) {
          gsap.to(navRef.current.children, {
            y: -8,
            opacity: 0.7,
            scale: 1.05,
            stagger: 0.08,
            duration: 0.4,
            ease: "power2.out",
          });
        }
        
        gsap.to(ctaRef.current, {
          scale: 1.1,
          backgroundColor: "#000",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        // Reset animations
        gsap.to(logoRef.current, {
          scale: 1,
          rotation: 0,
          color: "#000",
          duration: 0.5,
          ease: "power2.out",
        });
        
        if (navRef.current) {
          gsap.to(navRef.current.children, {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.05,
            duration: 0.4,
            ease: "power2.out",
          });
        }
        
        gsap.to(ctaRef.current, {
          scale: 1,
          backgroundColor: "#000",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("imageHover" as any, handleImageHover);

    return () => {
      window.removeEventListener("imageHover" as any, handleImageHover);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-6 md:px-10 bg-white/0"
      style={{ width: "70%", left: "15%", right: "15%" }}
    >
      <div className="w-full flex items-center justify-between relative">
        {/* Logo */}
        <div
          ref={logoRef}
          className="font-extrabold text-2xl text-black cursor-pointer flex-shrink-0 z-10"
        >
          Bfolio
        </div>

        {/* Navigation - Centered */}
        <nav ref={navRef} className="hidden md:flex gap-10 font-medium absolute left-1/2 transform -translate-x-1/2">
          <a
            href="#home"
            className="text-black hover:text-gray-600 transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-black hover:text-gray-600 transition-colors duration-200"
          >
            About
          </a>
          <a
            href="#pages"
            className="text-black hover:text-gray-600 transition-colors duration-200"
          >
            Pages
          </a>
          <a
            href="#blog"
            className="text-black hover:text-gray-600 transition-colors duration-200"
          >
            Blog
          </a>
          <a
            href="#contact"
            className="text-black hover:text-gray-600 transition-colors duration-200"
          >
            Contact
          </a>
        </nav>

        {/* CTA Button */}
        <button
          ref={ctaRef}
          className="btn-53 hidden md:inline-block flex-shrink-0 z-10 ml-auto mt-10"
        >
          <div className="original">Let's Talk</div>
          <div className="letters">
            <span>L</span>
            <span>E</span>
            <span>T</span>
            <span>'</span>
            <span>S</span>
            <span> </span>
            <span>T</span>
            <span>A</span>
            <span>L</span>
            <span>K</span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
