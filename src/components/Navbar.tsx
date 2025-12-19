"use client";

import { useState, useEffect } from "react";
import "./Button53.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-sm bg-white/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <div className="font-extrabold text-2xl">Bfolio</div>

        <nav className="hidden md:flex gap-10 font-medium">
          <a href="#home" className="hover:opacity-80 transition-opacity duration-120">
            Home
          </a>
          <a href="#about" className="hover:opacity-80 transition-opacity duration-120">
            About
          </a>
          <a href="#pages" className="hover:opacity-80 transition-opacity duration-120">
            Pages
          </a>
          <a href="#blog" className="hover:opacity-80 transition-opacity duration-120">
            Blog
          </a>
          <a href="#contact" className="hover:opacity-80 transition-opacity duration-120">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="btn-53 hidden md:inline-block">
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

          <button className="md:hidden p-2 rounded-md">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
