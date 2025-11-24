"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";

const MinimalHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-6 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-semibold text-gray-900">Portfolio</div>

        {/* Center Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#work"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Work
          </a>
          <a
            href="#about"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Right CTA Button */}
        <button className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors">
          Get in Touch
        </button>
      </nav>
    </header>
  );
};

export default MinimalHeader;

