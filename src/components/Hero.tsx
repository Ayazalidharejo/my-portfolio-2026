"use client";

import { useRef, useEffect, useState, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { FaReact, FaNodeJs, FaBootstrap, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiExpress, SiTailwindcss, SiMui } from "react-icons/si";
import "./Button53.css";

gsap.registerPlugin(ScrollTrigger);

type Skill = {
  name: string;
  icon: ReactNode;
  color: string;
  image: string;
};

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const orbitContainerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);
  const socialRefs = useRef<HTMLAnchorElement[]>([]);
  const orbitAnimationsRef = useRef<gsap.core.Tween[]>([]);
  const rotationAnimationsRef = useRef<gsap.core.Tween[]>([]);
  const tooltipRefs = useRef<HTMLDivElement[]>([]);

  const skills: Skill[] = [
    {
      name: "React",
      icon: <FaReact className="text-blue-500" />,
      color: "#61DAFB",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    },
    {
      name: "Shadcn",
      icon: <div className="text-black font-bold text-[10px]">shadcn</div>,
      color: "#000000",
      image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=1200&q=80",
    },
    {
      name: "Next.js",
      icon: <SiNextdotjs className="text-black" />,
      color: "#000000",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80",
    },
    {
      name: "TypeScript",
      icon: <SiTypescript className="text-blue-600" />,
      color: "#3178C6",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
    },
    {
      name: "Node.js",
      icon: <FaNodeJs className="text-green-600" />,
      color: "#339933",
      image: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1200&q=80",
    },
    {
      name: "Express",
      icon: <SiExpress className="text-gray-800" />,
      color: "#000000",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&q=80",
    },
    {
      name: "Bootstrap",
      icon: <FaBootstrap className="text-purple-600" />,
      color: "#7952B3",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
    },
    {
      name: "Tailwind",
      icon: <SiTailwindcss className="text-cyan-500" />,
      color: "#06B6D4",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
    },
    {
      name: "Material UI",
      icon: <SiMui className="text-blue-600" />,
      color: "#007FFF",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
    },
  ];

  const defaultProfileImage = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80";
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  const stats = [
    { number: "50+", label: "Projects" },
    { number: "3+", label: "Years Experience" },
    { number: "100%", label: "Client Satisfaction" },
  ];

  const socialLinks = [
    { icon: <FaGithub />, href: "#", name: "GitHub" },
    { icon: <FaLinkedin />, href: "#", name: "LinkedIn" },
    { icon: <FaTwitter />, href: "#", name: "Twitter" },
  ];

  const activeImage = activeSkill?.image ?? defaultProfileImage;

  const pauseSkillAnimations = () => {
    orbitAnimationsRef.current.forEach((animation) => animation?.pause());
    rotationAnimationsRef.current.forEach((animation) => animation?.pause());
  };

  const resumeSkillAnimations = () => {
    orbitAnimationsRef.current.forEach((animation) => animation?.resume());
    rotationAnimationsRef.current.forEach((animation) => animation?.resume());
  };

  const handleSkillEnter = (skill: Skill) => {
    setActiveSkill(skill);
  };

  const handleSkillLeave = () => {
    setActiveSkill(null);
  };

  const handleOrbitEnter = () => {
    pauseSkillAnimations();
  };

  const handleOrbitLeave = () => {
    resumeSkillAnimations();
    setActiveSkill(null);
  };

  useEffect(() => {
    if (!heroRef.current || !titleRef.current || !imageRef.current) return;
    
    // Ensure button is visible before any animations - set initial state
    const initButton = () => {
      if (buttonRef.current) {
        gsap.set(buttonRef.current, { 
          opacity: 1, 
          visibility: 'visible', 
          display: 'block',
          scale: 1,
          rotation: 0,
          clearProps: "all"
        });
      }
    };
    
    // Set immediately
    initButton();
    
    // Also set after a small delay to ensure it's set after render
    setTimeout(initButton, 50);

    // Split title into characters
    const titleText = titleRef.current.textContent || "";
    titleRef.current.innerHTML = titleText
      .split("")
      .map(
        (char) =>
          `<span class="char" style="display: inline-block;">${
            char === " " ? "&nbsp;" : char
          }</span>`
      )
      .join("");

    const chars = titleRef.current.querySelectorAll(".char");

    // Main timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Name animation
    tl.from(nameRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
      // Role animation
      .from(
        roleRef.current,
        {
          y: -30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      )
      // Title character animation
      .from(
        chars,
        {
          y: 100,
          opacity: 0,
          rotationX: -90,
          duration: 1.2,
          stagger: 0.03,
          ease: "back.out(1.4)",
        },
        "-=0.3"
      )
      // Subtitle animation
      .from(
        subtitleRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6"
      )
      // Stats animation
      .from(
        statsRef.current,
        {
          y: 40,
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      )
      // Button animation - ensure button exists first
      buttonRef.current && tl.fromTo(
        buttonRef.current,
        {
          scale: 0.8,
          opacity: 0,
          rotation: -90,
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          immediateRender: false,
        },
        "-=0.5"
      )
      // Social icons animation
      .from(
        socialRefs.current,
        {
          scale: 0,
          opacity: 0,
          rotation: 180,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      )
      // Image animation
      .from(
        imageRef.current,
        {
          scale: 0.5,
          opacity: 0,
          rotation: 360,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
        },
        "-=1"
      );

    // Infinite circular orbit for skill icons
    if (orbitContainerRef.current) {
      orbitAnimationsRef.current = [];
      rotationAnimationsRef.current = [];

      const icons = orbitContainerRef.current.querySelectorAll(".skill-icon");
      const orbitDuration = 25;

      icons.forEach((icon, index) => {
        const startAngle = (index / skills.length) * 360;
        const element = icon as HTMLElement;
        const orbitRadius = 220;

        const proxy = { angle: startAngle };

        // Set initial position
        const initialX = Math.cos((startAngle * Math.PI) / 180) * orbitRadius;
        const initialY = Math.sin((startAngle * Math.PI) / 180) * orbitRadius;

        gsap.set(element, {
          x: initialX,
          y: initialY,
          xPercent: -50,
          yPercent: -50,
          transformOrigin: "center center",
        });

        // Circular orbit animation
        const orbitTween = gsap.to(proxy, {
          angle: startAngle + 360,
          duration: orbitDuration,
          repeat: -1,
          ease: "none",
          onUpdate: () => {
            const angle = (proxy.angle * Math.PI) / 180;
            const x = Math.cos(angle) * orbitRadius;
            const y = Math.sin(angle) * orbitRadius;
            gsap.set(element, {
              x: x,
              y: y,
              xPercent: -50,
              yPercent: -50,
            });
          },
        });
        orbitAnimationsRef.current.push(orbitTween);

        // Individual icon rotation
        const rotationTween = gsap.to(element, {
          rotation: 360,
          duration: 10,
          repeat: -1,
          ease: "none",
        });
        rotationAnimationsRef.current.push(rotationTween);

        // Counter-rotate tooltip to keep it horizontal
        const tooltip = element.querySelector('[data-tooltip]') as HTMLElement;
        if (tooltip) {
          const tooltipRotationTween = gsap.to(tooltip, {
            rotation: -360,
            duration: 10,
            repeat: -1,
            ease: "none",
          });
          rotationAnimationsRef.current.push(tooltipRotationTween);
        }

        // Icon entrance animation
        gsap.from(element, {
          scale: 0,
          opacity: 0,
          duration: 0.8,
          delay: 2 + index * 0.1,
          ease: "back.out(1.7)",
        });
      });
    }

    // ScrollTrigger animations
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1.5,
      onUpdate: (self) => {
        const progress = self.progress;

        // Title scroll animation
        if (titleRef.current) {
          gsap.to(chars, {
            y: -120 * progress,
            opacity: 1 - progress * 0.5,
            scale: 1 - progress * 0.1,
            duration: 0.1,
          });
        }

        // Name and role scroll animation
        if (nameRef.current) {
          gsap.to(nameRef.current, {
            y: -80 * progress,
            opacity: 1 - progress * 0.4,
            duration: 0.1,
          });
        }

        if (roleRef.current) {
          gsap.to(roleRef.current, {
            y: -60 * progress,
            opacity: 1 - progress * 0.4,
            duration: 0.1,
          });
        }

        // Subtitle scroll animation
        if (subtitleRef.current) {
          gsap.to(subtitleRef.current, {
            y: -80 * progress,
            opacity: 1 - progress * 0.5,
            duration: 0.1,
          });
        }

        // Stats scroll animation
        statsRef.current.forEach((stat) => {
          if (stat) {
            gsap.to(stat, {
              y: -40 * progress,
              opacity: 1 - progress * 0.6,
              duration: 0.1,
            });
          }
        });

        // Button scroll animation - removed to keep buttons fixed
        // if (buttonRef.current) {
        //   gsap.to(buttonRef.current, {
        //     y: -60 * progress,
        //     opacity: 1 - progress * 0.6,
        //     scale: 1 - progress * 0.1,
        //     duration: 0.1,
        //   });
        // }

        // Image scroll animation - stays centered but scales
        if (imageRef.current) {
          gsap.to(imageRef.current, {
            scale: 1 - progress * 0.15,
            opacity: 1 - progress * 0.2,
            duration: 0.1,
          });
        }
      },
    });

    // Image floating animation
    gsap.to(imageRef.current, {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Stats counter animation
    statsRef.current.forEach((stat) => {
      if (stat) {
        const numberEl = stat.querySelector(".stat-number");
        const target = numberEl?.textContent || "0";
        const isNumber = !isNaN(parseInt(target));

        if (isNumber && numberEl) {
          const targetNum = parseInt(target);
          gsap.to(
            { value: 0 },
            {
              value: targetNum,
              duration: 2,
              delay: 1.5,
              ease: "power2.out",
              onUpdate: function () {
                if (numberEl) {
                  numberEl.textContent = Math.round(this.targets()[0].value) + "+";
                }
              },
            }
          );
        }
      }
    });

    // Ensure button is visible immediately and after animation
    const ensureButtonVisible = () => {
      if (buttonRef.current) {
        gsap.set(buttonRef.current, { 
          opacity: 1, 
          visibility: 'visible', 
          display: 'block',
          scale: 1 
        });
      }
    };
    
    ensureButtonVisible();
    
    // Also ensure after a delay in case animation interferes
    setTimeout(ensureButtonVisible, 100);
    setTimeout(ensureButtonVisible, 1000);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      orbitAnimationsRef.current.forEach((animation) => animation.kill());
      rotationAnimationsRef.current.forEach((animation) => animation.kill());
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden"
      style={{ paddingTop: "80px", paddingBottom: "80px" }}
    >
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, black 1px, transparent 1px),
              linear-gradient(to bottom, black 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center min-h-[85vh]">
          {/* Left Side */}
          <div className="space-y-8 flex flex-col justify-center">
            {/* Name and Role */}
            <div className="space-y-2">
              <div
                ref={nameRef}
                className="text-4xl md:text-5xl font-bold text-gray-800"
              >
                Hi, I'm <span className="text-black">John Doe</span>
              </div>
              <div
                ref={roleRef}
                className="text-2xl md:text-3xl font-semibold text-gray-600"
              >
                Full Stack Web Developer
              </div>
            </div>

            {/* Main Title */}
            <h1
              ref={titleRef}
              className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] text-black"
            onMouseEnter={handleOrbitEnter}
            onMouseLeave={handleOrbitLeave}
          >
              Creative Developer
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl"
            >
              I craft beautiful, functional, and user-friendly web experiences.
              Specialized in modern web technologies and passionate about creating
              digital solutions that make a difference.
            </p>

            {/* Stats */}
            <div className="flex gap-8 flex-wrap">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) statsRef.current[index] = el;
                  }}
                  className="flex flex-col"
                >
                  <div className="stat-number text-3xl md:text-4xl font-bold text-black">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 flex-wrap">
              <button
                ref={buttonRef}
                className="btn-53"
                style={{ opacity: 1, visibility: 'visible' }}
              >
                <div className="original">View Portfolio</div>
                <div className="letters">
                  <span>V</span>
                  <span>I</span>
                  <span>E</span>
                  <span>W</span>
                  <span> </span>
                  <span>P</span>
                  <span>O</span>
                  <span>R</span>
                  <span>T</span>
                  <span>F</span>
                  <span>O</span>
                  <span>L</span>
                  <span>I</span>
                  <span>O</span>
                </div>
              </button>

              <button 
                className="btn-53"
                style={{ opacity: 1, visibility: 'visible' }}
              >
                <div className="original">Contact Me</div>
                <div className="letters">
                  <span>C</span>
                  <span>O</span>
                  <span>N</span>
                  <span>T</span>
                  <span>A</span>
                  <span>C</span>
                  <span>T</span>
                  <span> </span>
                  <span>M</span>
                  <span>E</span>
                </div>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  ref={(el) => {
                    if (el) socialRefs.current[index] = el;
                  }}
                  href={social.href}
                  className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Side - Image with Orbiting Skills */}
          <div className="relative flex items-center justify-center w-full h-full" style={{ minHeight: '600px' }}>
            {/* Orbit Container */}
            <div
              ref={orbitContainerRef}
              className="absolute top-1/2 left-1/2 pointer-events-auto"
              style={{ 
                width: "500px", 
                height: "500px",
                transform: 'translate(-50%, -50%)',
                margin: '0',
              }}
              onMouseEnter={handleOrbitEnter}
              onMouseLeave={handleOrbitLeave}
            >
              {/* Center Image - Always in center */}
              <div
                ref={imageRef}
                className="absolute rounded-full overflow-hidden shadow-2xl group cursor-pointer z-30"
                style={{ 
                  width: '220px',
                  height: '220px',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  position: 'absolute',
                  margin: '0',
                }}
              >
                <div className="relative w-full h-full rounded-full">
                  <Image
                    key={activeImage}
                    src={activeImage}
                    alt="Developer"
                    fill
                    className="object-cover rounded-full group-hover:scale-110 transition-transform duration-700"
                    unoptimized
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-transparent z-10 group-hover:from-black/30 transition-all duration-500 rounded-full" />
                  <div className="absolute inset-0 border-4 border-white/30 rounded-full group-hover:border-white/50 transition-all duration-500 pointer-events-none" />
                  <div className="absolute -inset-8 bg-gradient-to-r from-black/30 via-transparent to-black/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </div>
              </div>

              {/* Skill Icons Orbiting */}
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="skill-icon absolute w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-xl border-2 border-black/10 hover:scale-125 transition-transform duration-300 cursor-pointer group z-10"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: "center center",
                  }}
                  onMouseEnter={() => handleSkillEnter(skill)}
                  onMouseLeave={handleSkillLeave}
                >
                  <div className="text-2xl group-hover:scale-110 transition-transform duration-300 flex items-center justify-center relative z-10">
                    {skill.icon}
                  </div>
                  <div 
                    data-tooltip
                    ref={(el) => {
                      if (el) tooltipRefs.current[index] = el;
                    }}
                    className="absolute -top-14 left-1/2 text-xs font-bold text-white bg-black px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg z-50 pointer-events-none"
                    style={{
                      transform: 'translateX(-50%)',
                      transformOrigin: 'center center',
                    }}
                  >
                    {skill.name}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-black"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 z-20">
        <span className="text-xs text-gray-400 font-bold tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-[2px] h-24 bg-gradient-to-b from-black via-black/50 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
