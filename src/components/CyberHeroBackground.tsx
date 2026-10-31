"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CyberHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      const darkActive =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark" ||
        (!document.documentElement.getAttribute("data-theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      setIsDark(darkActive);
    };

    checkTheme();
    const observer = new MutationObserver(() => checkTheme());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Floating digital energy particles
    const particleCount = 42;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 2 + 1,
      baseAlpha: Math.random() * 0.5 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }));

    let startTime = performance.now();

    const render = (now: number) => {
      const elapsed = Math.max(0, (now - startTime) / 1000);
      ctx.clearRect(0, 0, width, height);

      const colorAccent = isDark ? "63, 222, 201" : "15, 118, 107";
      const gridOpacity = isDark ? 0.045 : 0.035;

      // 1. Perspective grid lines
      const gridSize = 48;
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = `rgba(${colorAccent}, ${gridOpacity})`;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Center Ambient Concentric Radar Waves
      const centerX = width * 0.5;
      const centerY = height * 0.45;
      const maxRadius = Math.max(10, Math.min(width, height) * 0.55);

      for (let i = 0; i < 3; i++) {
        const rawProgress = (elapsed * 0.12 + i * 0.33) % 1;
        const ringProgress = rawProgress < 0 ? rawProgress + 1 : rawProgress;
        const currentR = Math.max(0, ringProgress * maxRadius);
        if (currentR <= 0) continue;

        const ringAlpha = Math.max(0, (1 - ringProgress) * (isDark ? 0.09 : 0.06));

        ctx.strokeStyle = `rgba(${colorAccent}, ${ringAlpha})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, currentR, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // 3. Floating Digital Energy Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pulse = Math.sin(elapsed * 2 + p.phase) * 0.25 + 0.75;
        const alpha = Math.max(0, p.baseAlpha * pulse * (isDark ? 0.6 : 0.4));

        ctx.fillStyle = `rgba(${colorAccent}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, p.size), 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Subtle Interconnecting Data Strands between close particles
      ctx.lineWidth = 0.4;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            const lineAlpha = (1 - dist / 90) * (isDark ? 0.12 : 0.08);
            ctx.strokeStyle = `rgba(${colorAccent}, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDark]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

