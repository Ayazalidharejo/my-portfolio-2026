"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor") as HTMLElement;
    const cursorFollower = document.querySelector(
      ".cursor-follower"
    ) as HTMLElement;

    if (!cursor || !cursorFollower) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      gsap.to(cursorFollower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 1.5, duration: 0.3 });
      gsap.to(cursorFollower, { scale: 1.5, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(cursorFollower, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const hoverElements = document.querySelectorAll("a, button, .hover-target");
    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      hoverElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="custom-cursor fixed w-4 h-4 bg-black rounded-full pointer-events-none z-[9999] mix-blend-difference" />
      <div className="cursor-follower fixed w-8 h-8 border-2 border-black rounded-full pointer-events-none z-[9998] opacity-50" />
    </>
  );
};

export default CustomCursor;

