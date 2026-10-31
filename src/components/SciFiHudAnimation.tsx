"use client";

import React, { useEffect, useRef, useState } from "react";

interface SciFiHudAnimationProps {
  className?: string;
  isBackground?: boolean;
}

interface HubNode {
  id: string;
  label: string;
  sublabel?: string;
  xPct: number;
  yPct: number;
  radius: number;
  pulsePhase: number;
  accent: boolean;
}

interface Packet {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  size: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

export default function SciFiHudAnimation({
  className = "",
  isBackground = false,
}: SciFiHudAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDark, setIsDark] = useState(true);

  // Monitor document theme for instant color transitions
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
    let width = (canvas.width = canvas.offsetWidth || 720);
    let height = (canvas.height = canvas.offsetHeight || 460);

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

    // Node topology layout matching reference HUD:
    // CONTACT (top left), DEAL (bottom left), ACCOUNT (center), TASK (top right), RENEWAL (right)
    const nodes: HubNode[] = [
      { id: "contact", label: "CONTACT", xPct: 0.16, yPct: 0.28, radius: 34, pulsePhase: 0, accent: false },
      { id: "deal", label: "DEAL", xPct: 0.28, yPct: 0.74, radius: 40, pulsePhase: 2.1, accent: false },
      { id: "account", label: "ACCOUNT", xPct: 0.42, yPct: 0.48, radius: 52, pulsePhase: 1.2, accent: true },
      { id: "task", label: "TASK", xPct: 0.64, yPct: 0.24, radius: 32, pulsePhase: 4.3, accent: false },
      { id: "renewal", label: "RENEWAL", sublabel: "PREVIEW", xPct: 0.78, yPct: 0.50, radius: 46, pulsePhase: 3.5, accent: true },
    ];

    const links: [number, number][] = [
      [2, 0], // Account <-> Contact
      [2, 1], // Account <-> Deal
      [2, 3], // Account <-> Task
      [2, 4], // Account <-> Renewal (main high-throughput pipeline)
      [0, 1], // Contact <-> Deal
      [1, 3], // Deal <-> Task
    ];

    // Data packets travelling between nodes
    const packets: Packet[] = [
      { fromIndex: 2, toIndex: 4, progress: 0.1, speed: 0.007, size: 4 },
      { fromIndex: 2, toIndex: 4, progress: 0.6, speed: 0.007, size: 3.5 },
      { fromIndex: 0, toIndex: 2, progress: 0.3, speed: 0.009, size: 3 },
      { fromIndex: 1, toIndex: 2, progress: 0.7, speed: 0.008, size: 3 },
      { fromIndex: 3, toIndex: 2, progress: 0.4, speed: 0.010, size: 3 },
      { fromIndex: 2, toIndex: 1, progress: 0.2, speed: 0.006, size: 3 },
    ];

    const shockwaves: Shockwave[] = [];

    let startTime = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;

      ctx.clearRect(0, 0, width, height);

      // Color palette adjusted for dark vs light theme
      const colors = isDark
        ? {
            bg: isBackground ? "transparent" : "#0d1112",
            gridMinor: "rgba(63, 222, 201, 0.045)",
            gridMajor: "rgba(63, 222, 201, 0.10)",
            primary: "#3fdec9",
            secondary: "#1daf9c",
            darkRamp: "#16645a",
            glow: "rgba(63, 222, 201, 0.45)",
            textPrimary: "#3fdec9",
            textMuted: "#84ebdd",
            boxStroke: "#1daf9c",
            spark: "#ffffff",
          }
        : {
            bg: isBackground ? "transparent" : "#ffffff",
            gridMinor: "rgba(15, 118, 107, 0.05)",
            gridMajor: "rgba(15, 118, 107, 0.11)",
            primary: "#0f766b",
            secondary: "#1daf9c",
            darkRamp: "#3fdec9",
            glow: "rgba(15, 118, 107, 0.25)",
            textPrimary: "#0f766b",
            textMuted: "#16645a",
            boxStroke: "#0f766b",
            spark: "#0f766b",
          };

      // Outer HUD frame background if not in ambient hero background mode
      if (!isBackground) {
        ctx.fillStyle = colors.bg;
        ctx.beginPath();
        ctx.roundRect(0, 0, width, height, 16);
        ctx.fill();
      }

      // ─── 1. CRT Vertical Phosphor Scanlines & Major Grid ───────────────────────
      const colSpacing = 7;
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = colors.gridMinor;
      for (let x = 0; x < width; x += colSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Major coordinate cross grid
      const majorCol = 96;
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = colors.gridMajor;
      for (let x = 0; x < width; x += majorCol) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += majorCol) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // ─── 2. Conduits / Link Lines ─────────────────────────────────────────────
      links.forEach(([fromIdx, toIdx]) => {
        const from = nodes[fromIdx];
        const to = nodes[toIdx];
        const x1 = from.xPct * width;
        const y1 = from.yPct * height;
        const x2 = to.xPct * width;
        const y2 = to.yPct * height;

        const isMainBridge = (fromIdx === 2 && toIdx === 4) || (fromIdx === 4 && toIdx === 2);

        // Underline glow
        ctx.lineWidth = isMainBridge ? 2.4 : 1.2;
        ctx.strokeStyle = isMainBridge ? colors.secondary : colors.darkRamp;
        ctx.setLineDash(isMainBridge ? [5, 3] : [3, 4]);
        ctx.lineDashOffset = -elapsed * 18;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // ─── 3. Packets Simulation ────────────────────────────────────────────────
      packets.forEach((pkt) => {
        pkt.progress += pkt.speed;
        if (pkt.progress >= 1) {
          pkt.progress = 0;
          // Spawn shockwave at destination
          const dest = nodes[pkt.toIndex];
          shockwaves.push({
            x: dest.xPct * width,
            y: dest.yPct * height,
            radius: dest.radius * 0.8,
            maxRadius: dest.radius * 2.2,
            opacity: 0.7,
          });
        }

        const from = nodes[pkt.fromIndex];
        const to = nodes[pkt.toIndex];
        const x = from.xPct * width + (to.xPct * width - from.xPct * width) * pkt.progress;
        const y = from.yPct * height + (to.yPct * height - from.yPct * height) * pkt.progress;

        // Draw packet raster block
        ctx.fillStyle = colors.spark;
        ctx.fillRect(x - 2, y - 4, 4, 8);

        // Glowing packet aura
        ctx.fillStyle = colors.primary;
        ctx.beginPath();
        ctx.arc(x, y, pkt.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // ─── 4. Node Shockwaves ───────────────────────────────────────────────────
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 0.8;
        sw.opacity -= 0.015;
        if (sw.opacity <= 0) {
          shockwaves.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = colors.primary;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = sw.opacity;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }

      // ─── 5. Node Voxel Clusters (Phosphor Dot Matrix Hubs) ────────────────────
      nodes.forEach((node, idx) => {
        const cx = node.xPct * width;
        const cy = node.yPct * height;
        const baseR = node.radius;

        // Outer pulsing orbital ring
        const pulse = Math.sin(elapsed * 2.2 + node.pulsePhase) * 3;
        ctx.strokeStyle = node.accent ? colors.primary : colors.secondary;
        ctx.lineWidth = 1.0;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(cx, cy, baseR + pulse, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Voxel matrix grid generation inside node
        const step = 4.2;
        const maxDist = baseR * 0.92;
        for (let ox = -maxDist; ox <= maxDist; ox += step) {
          for (let oy = -maxDist; oy <= maxDist; oy += step) {
            const dist = Math.sqrt(ox * ox + oy * oy);
            if (dist < maxDist) {
              const noise = Math.sin(ox * 0.15 + oy * 0.15 + elapsed * 3 + idx);
              const density = (1 - dist / maxDist) * (0.8 + noise * 0.2);
              if (density > 0.28) {
                const cellHeight = 2.2 + density * 4.0;
                ctx.fillStyle =
                  density > 0.75
                    ? colors.spark
                    : density > 0.5
                    ? colors.primary
                    : colors.darkRamp;
                ctx.fillRect(cx + ox - 1, cy + oy - cellHeight / 2, 2, cellHeight);
              }
            }
          }
        }

        // Bounding Reticles / Target Brackets around hubs
        const boxPad = baseR * 1.15;
        const bLeft = cx - boxPad;
        const bRight = cx + boxPad;
        const bTop = cy - boxPad;
        const bBottom = cy + boxPad;
        const cornerLen = 10;

        ctx.strokeStyle = colors.boxStroke;
        ctx.lineWidth = 1.2;

        if (node.accent) {
          // Full enclosure box with corner pins (like ACCOUNT & RENEWAL in reference)
          ctx.strokeRect(bLeft, bTop, boxPad * 2, boxPad * 2);
          // Corner dots
          ctx.fillStyle = colors.primary;
          [[bLeft, bTop], [bRight, bTop], [bLeft, bBottom], [bRight, bBottom]].forEach(([px, py]) => {
            ctx.beginPath();
            ctx.arc(px, py, 2.4, 0, Math.PI * 2);
            ctx.fill();
          });

          // Label chip banner
          const labelW = 62;
          const labelH = 14;
          ctx.fillStyle = colors.boxStroke;
          ctx.fillRect(bLeft, bTop - labelH, labelW, labelH);
          ctx.fillStyle = isDark ? "#0b0e10" : "#ffffff";
          ctx.font = "bold 9px monospace";
          ctx.fillText(node.label, bLeft + 5, bTop - 3.5);

          if (node.sublabel) {
            ctx.fillStyle = colors.textMuted;
            ctx.font = "bold 8.5px monospace";
            ctx.fillText(node.sublabel, bLeft + (boxPad * 2 - 44) / 2, bBottom + 13);
          }
        } else {
          // Corner brackets ┌ ┐ └ ┘
          ctx.beginPath();
          // Top-left
          ctx.moveTo(bLeft, bTop + cornerLen);
          ctx.lineTo(bLeft, bTop);
          ctx.lineTo(bLeft + cornerLen, bTop);
          // Top-right
          ctx.moveTo(bRight - cornerLen, bTop);
          ctx.lineTo(bRight, bTop);
          ctx.lineTo(bRight, bTop + cornerLen);
          // Bottom-left
          ctx.moveTo(bLeft, bBottom - cornerLen);
          ctx.lineTo(bLeft, bBottom);
          ctx.lineTo(bLeft + cornerLen, bBottom);
          // Bottom-right
          ctx.moveTo(bRight - cornerLen, bBottom);
          ctx.lineTo(bRight, bBottom);
          ctx.lineTo(bRight, bBottom - cornerLen);
          ctx.stroke();

          // Monospace node label above corner
          ctx.fillStyle = colors.textPrimary;
          ctx.font = "bold 9px monospace";
          ctx.fillText(node.label, bLeft, bTop - 4);
        }
      });

      // ─── 6. HUD Header Status Chip: "OBJECTS 5" / "LINKED" ─────────────────────
      const chipX = width * 0.74;
      const chipY = height * 0.09;
      ctx.fillStyle = colors.boxStroke;
      ctx.fillRect(chipX, chipY, 68, 14);
      ctx.fillStyle = isDark ? "#0b0e10" : "#ffffff";
      ctx.font = "bold 9px monospace";
      ctx.fillText("OBJECTS 5", chipX + 6, chipY + 10.5);

      ctx.fillStyle = colors.boxStroke;
      ctx.fillRect(chipX, chipY + 18, 52, 14);
      ctx.fillStyle = isDark ? "#0b0e10" : "#ffffff";
      ctx.fillText("LINKED", chipX + 6, chipY + 28.5);

      // ─── 7. HUD Telemetry Bar Chart: "SCHEMA STEPS" (OBJ, LINK, REC) ───────────
      const chartX = width * 0.58;
      const chartY = height * 0.70;
      const chartW = width * 0.22;
      const chartH = height * 0.22;

      // Label header
      ctx.fillStyle = colors.boxStroke;
      ctx.fillRect(chartX, chartY - 14, 86, 14);
      ctx.fillStyle = isDark ? "#0b0e10" : "#ffffff";
      ctx.font = "bold 9px monospace";
      ctx.fillText("SCHEMA STEPS", chartX + 6, chartY - 3.5);

      // Coordinate axes
      ctx.strokeStyle = colors.boxStroke;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      // Y-axis with ticks
      ctx.moveTo(chartX, chartY);
      ctx.lineTo(chartX, chartY + chartH);
      // X-axis
      ctx.lineTo(chartX + chartW, chartY + chartH);
      for (let t = 0; t <= chartH; t += chartH / 4) {
        ctx.moveTo(chartX - 3, chartY + t);
        ctx.lineTo(chartX, chartY + t);
      }
      ctx.stroke();

      // Dynamic animated bars
      const barData = [
        { label: "OBJ", heightPct: 0.45 + Math.sin(elapsed * 1.5) * 0.15 },
        { label: "LINK", heightPct: 0.75 + Math.sin(elapsed * 2.1 + 1) * 0.12 },
        { label: "REC", heightPct: 0.30 + Math.cos(elapsed * 1.8) * 0.18 },
      ];

      const barSlot = chartW / 3;
      barData.forEach((b, bIdx) => {
        const bx = chartX + bIdx * barSlot + barSlot * 0.35;
        const bHeight = chartH * b.heightPct;
        const by = chartY + chartH - bHeight;

        // Dotted raster bar fill
        ctx.fillStyle = colors.primary;
        for (let ry = by; ry < chartY + chartH; ry += 5) {
          ctx.fillRect(bx - 3, ry, 6, 3.5);
        }

        // Axis label
        ctx.fillStyle = colors.textMuted;
        ctx.font = "8px monospace";
        ctx.fillText(b.label, bx - 8, chartY + chartH + 11);
      });

      // ─── 8. Outer Monitor Bezel & Border Accents ──────────────────────────────
      if (!isBackground) {
        ctx.strokeStyle = colors.boxStroke;
        ctx.lineWidth = 1.0;
        ctx.strokeRect(8, 8, width - 16, height - 16);

        // Four corner ticks on outer frame
        const tick = 14;
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.moveTo(8, 8 + tick);
        ctx.lineTo(8, 8);
        ctx.lineTo(8 + tick, 8);
        ctx.moveTo(width - 8 - tick, 8);
        ctx.lineTo(width - 8, 8);
        ctx.lineTo(width - 8, 8 + tick);
        ctx.moveTo(8, height - 8 - tick);
        ctx.lineTo(8, height - 8);
        ctx.lineTo(8 + tick, height - 8);
        ctx.moveTo(width - 8 - tick, height - 8);
        ctx.lineTo(width - 8, height - 8);
        ctx.lineTo(width - 8, height - 8 - tick);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDark, isBackground]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          filter: isDark ? "drop-shadow(0 0 16px rgba(63, 222, 201, 0.15))" : "none",
        }}
      />
    </div>
  );
}
