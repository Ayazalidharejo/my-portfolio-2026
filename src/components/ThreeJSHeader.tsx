"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const ThreeJSHeader = () => {
  const headerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !isClient || !headerRef.current || !canvasRef.current) {
      return;
    }

    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch (error) {
      console.error("Error registering ScrollTrigger:", error);
    }

    const header = headerRef.current;
    const canvas = canvasRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50,
      header.clientWidth / header.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 3);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(header.clientWidth, header.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x0ea5e9, 0.8);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    // Create 3D geometry - Small Icosahedron for header
    const geometry = new THREE.IcosahedronGeometry(0.8, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x0b1120,
      emissiveIntensity: 0.3,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    meshRef.current = mesh;
    scene.add(mesh);

    // Small particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 4;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.03,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.4,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      if (meshRef.current) {
        meshRef.current.rotation.x += 0.005;
        meshRef.current.rotation.y += 0.005;
      }

      if (particles) {
        particles.rotation.y += 0.0005;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Scroll-based animation - header width increase
    if (headerRef.current) {
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (meshRef.current) {
            meshRef.current.scale.setScalar(1 - progress * 0.3);
            meshRef.current.position.x = progress * 1;
          }
        },
      });

      // Sticky header on scroll
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "bottom top",
        onEnter: () => setIsScrolled(true),
        onLeaveBack: () => setIsScrolled(false),
      });
    }

    // Handle resize
    const handleResize = () => {
      if (!headerRef.current || !cameraRef.current || !rendererRef.current) {
        return;
      }
      const { clientWidth, clientHeight } = headerRef.current;
      cameraRef.current.aspect = clientWidth / clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(clientWidth, clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === headerRef.current) {
          trigger.kill();
        }
      });
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, [isClient]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-dark/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 py-4">
        {/* Three.js Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
        />

        {/* Navigation Content */}
        <nav className="relative z-10 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="text-xl font-bold text-white transition hover:text-primary"
          >
            Portfolio
          </a>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-white/70 transition hover:text-white relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/"
              aria-label="GitHub"
              className="text-white/60 transition hover:text-white"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://linkedin.com/"
              aria-label="LinkedIn"
              className="text-white/60 transition hover:text-white"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://twitter.com/"
              aria-label="Twitter / X"
              className="text-white/60 transition hover:text-white"
            >
              <FaXTwitter size={16} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default ThreeJSHeader;
