"use client";

import React, { useEffect, useRef, useState } from "react";

interface SciFiHudAnimationProps {
  className?: string;
}

interface HudNode {
  id: string;
  name: string;
  role: string;
  xPct: number;
  yPct: number;
  radius: number;
  isPrimary?: boolean;
}

interface Packet {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  size: number;
  color: string;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

export default function SciFiHudAnimation({ className = "" }: SciFiHudAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDark, setIsDark] = useState(true);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Synchronize with application dark/light theme
  useEffect(() => {
    const updateTheme = () => {
      const darkActive =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark" ||
        (!document.documentElement.getAttribute("data-theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      setIsDark(darkActive);
    };

    updateTheme();
    const observer = new MutationObserver(() => updateTheme());
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

    // Nodes according to user specification:
    // 1. Account -> Server (central hub)
    // 2. Deal -> Agent (bottom left)
    // 3. Task -> Microsoft (top right)
    // 4. Contact -> Dashboard (top left)
    // 5. Renewal -> CVE (right primary destination)
    const nodes: HudNode[] = [
      { id: "dashboard", name: "DASHBOARD", role: "MONITOR", xPct: 0.17, yPct: 0.28, radius: 36 },
      { id: "agent", name: "AGENT", role: "ENDPOINT", xPct: 0.28, yPct: 0.73, radius: 42 },
      { id: "server", name: "SERVER", role: "CORE HUB", xPct: 0.44, yPct: 0.48, radius: 54, isPrimary: true },
      { id: "microsoft", name: "MICROSOFT", role: "INTEGRATION", xPct: 0.65, yPct: 0.23, radius: 34 },
      { id: "cve", name: "CVE", role: "AUDIT SWARM", xPct: 0.79, yPct: 0.50, radius: 48, isPrimary: true },
    ];

    // Conduits linking the nodes
    const links: [number, number][] = [
      [2, 0], // Server <-> Dashboard
      [2, 1], // Server <-> Agent
      [2, 3], // Server <-> Microsoft
      [2, 4], // Server <-> CVE (high bandwidth patch pipeline)
      [0, 1], // Dashboard <-> Agent
      [1, 3], // Agent <-> Microsoft
    ];

    // Data packets travelling between nodes
    const packets: Packet[] = [
      { fromIndex: 2, toIndex: 4, progress: 0.05, speed: 0.007, size: 4.5, color: "#3fdec9" },
      { fromIndex: 2, toIndex: 4, progress: 0.55, speed: 0.007, size: 4.0, color: "#3fdec9" },
      { fromIndex: 1, toIndex: 2, progress: 0.30, speed: 0.008, size: 3.5, color: "#1daf9c" },
      { fromIndex: 0, toIndex: 2, progress: 0.70, speed: 0.009, size: 3.5, color: "#1daf9c" },
      { fromIndex: 3, toIndex: 2, progress: 0.45, speed: 0.008, size: 3.5, color: "#3fdec9" },
      { fromIndex: 2, toIndex: 1, progress: 0.15, speed: 0.006, size: 3.5, color: "#1daf9c" },
    ];

    const shockwaves: Shockwave[] = [];
    let startTime = performance.now();

    // Mouse hover detection
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let hovered: string | null = null;
      nodes.forEach((n) => {
        const nx = n.xPct * width;
        const ny = n.yPct * height;
        const dist = Math.hypot(mouseX - nx, mouseY - ny);
        if (dist <= n.radius + 15) {
          hovered = n.id;
        }
      });
      setHoveredNode(hovered);
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      ctx.clearRect(0, 0, width, height);

      // Sci-Fi HUD color palettes
      const themeColors = isDark
        ? {
            bg: "#090d0e",
            panelBorder: "#1a2c28",
            gridMinor: "rgba(63, 222, 201, 0.045)",
            gridMajor: "rgba(63, 222, 201, 0.10)",
            primary: "#3fdec9",
            secondary: "#1daf9c",
            accent: "#84ebdd",
            darkRamp: "#16645a",
            textMain: "#3fdec9",
            textMuted: "#9adfd5",
            chipBg: "#16645a",
            chipText: "#ffffff",
            spark: "#ffffff",
          }
        : {
            bg: "#ffffff",
            panelBorder: "#d4ece6",
            gridMinor: "rgba(15, 118, 107, 0.04)",
            gridMajor: "rgba(15, 118, 107, 0.09)",
            primary: "#0f766b",
            secondary: "#1daf9c",
            accent: "#16645a",
            darkRamp: "#a7e9df",
            textMain: "#0f766b",
            textMuted: "#16645a",
            chipBg: "#0f766b",
            chipText: "#ffffff",
            spark: "#0f766b",
          };

      // ─── 1. Monitor Background & Bezel ──────────────────────────────────────
      ctx.fillStyle = themeColors.bg;
      ctx.beginPath();
      ctx.roundRect(0, 0, width, height, 16);
      ctx.fill();

      // Outer HUD Terminal Frame
      ctx.strokeStyle = themeColors.panelBorder;
      ctx.lineWidth = 1;
      ctx.strokeRect(10, 10, width - 20, height - 20);

      // Four corner tactical brackets
      const cornerSize = 16;
      ctx.strokeStyle = themeColors.primary;
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Top-left
      ctx.moveTo(10, 10 + cornerSize);
      ctx.lineTo(10, 10);
      ctx.lineTo(10 + cornerSize, 10);
      // Top-right
      ctx.moveTo(width - 10 - cornerSize, 10);
      ctx.lineTo(width - 10, 10);
      ctx.lineTo(width - 10, 10 + cornerSize);
      // Bottom-left
      ctx.moveTo(10, height - 10 - cornerSize);
      ctx.lineTo(10, height - 10);
      ctx.lineTo(10 + cornerSize, height - 10);
      // Bottom-right
      ctx.moveTo(width - 10 - cornerSize, height - 10);
      ctx.lineTo(width - 10, height - 10);
      ctx.lineTo(width - 10, height - 10 - cornerSize);
      ctx.stroke();

      // ─── 2. Phosphor Scanline Grid ──────────────────────────────────────────
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = themeColors.gridMinor;
      const colStep = 7.5;
      for (let x = 12; x < width - 12; x += colStep) {
        ctx.beginPath();
        ctx.moveTo(x, 12);
        ctx.lineTo(x, height - 12);
        ctx.stroke();
      }

      // Major coordinate lines
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = themeColors.gridMajor;
      const majorStep = 96;
      for (let x = 12; x < width - 12; x += majorStep) {
        ctx.beginPath();
        ctx.moveTo(x, 12);
        ctx.lineTo(x, height - 12);
        ctx.stroke();
      }
      for (let y = 12; y < height - 12; y += majorStep) {
        ctx.beginPath();
        ctx.moveTo(12, y);
        ctx.lineTo(width - 12, y);
        ctx.stroke();
      }

      // ─── 3. Conduits / Laser Links ──────────────────────────────────────────
      links.forEach(([fromIdx, toIdx]) => {
        const from = nodes[fromIdx];
        const to = nodes[toIdx];
        const x1 = from.xPct * width;
        const y1 = from.yPct * height;
        const x2 = to.xPct * width;
        const y2 = to.yPct * height;

        const isMainChannel = (fromIdx === 2 && toIdx === 4) || (fromIdx === 4 && toIdx === 2);
        const isHoveredChannel = hoveredNode === from.id || hoveredNode === to.id;

        // Base laser conduit
        ctx.lineWidth = isMainChannel ? 2.2 : isHoveredChannel ? 1.8 : 1.0;
        ctx.strokeStyle = isMainChannel || isHoveredChannel ? themeColors.primary : themeColors.secondary;
        ctx.setLineDash(isMainChannel ? [6, 3] : [4, 4]);
        ctx.lineDashOffset = -elapsed * 22;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // ─── 4. Data Packets Transmission ───────────────────────────────────────
      packets.forEach((pkt) => {
        pkt.progress += pkt.speed;
        if (pkt.progress >= 1) {
          pkt.progress = 0;
          // Spawn expanding sonar shockwave at target node
          const dest = nodes[pkt.toIndex];
          shockwaves.push({
            x: dest.xPct * width,
            y: dest.yPct * height,
            radius: dest.radius * 0.7,
            maxRadius: dest.radius * 2.4,
            opacity: 0.8,
          });
        }

        const from = nodes[pkt.fromIndex];
        const to = nodes[pkt.toIndex];
        const px = from.xPct * width + (to.xPct * width - from.xPct * width) * pkt.progress;
        const py = from.yPct * height + (to.yPct * height - from.yPct * height) * pkt.progress;

        // Glow trail behind packet
        const trailLen = 14;
        const angle = Math.atan2(to.yPct * height - from.yPct * height, to.xPct * width - from.xPct * width);
        ctx.strokeStyle = themeColors.primary;
        ctx.lineWidth = pkt.size;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px - Math.cos(angle) * trailLen, py - Math.sin(angle) * trailLen);
        ctx.stroke();

        // Glowing core packet
        ctx.fillStyle = themeColors.spark;
        ctx.beginPath();
        ctx.arc(px, py, pkt.size * 0.75, 0, Math.PI * 2);
        ctx.fill();
      });

      // ─── 5. Expanding Shockwaves ────────────────────────────────────────────
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 1.0;
        sw.opacity -= 0.018;
        if (sw.opacity <= 0) {
          shockwaves.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = themeColors.primary;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = sw.opacity;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }

      // ─── 6. Nodes (Server, Agent, Microsoft, Dashboard, CVE) ────────────────
      nodes.forEach((node, idx) => {
        const cx = node.xPct * width;
        const cy = node.yPct * height;
        const baseR = node.radius;
        const isHovered = hoveredNode === node.id;

        // Concentric rotating radar rings around primary nodes
        if (node.isPrimary) {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(elapsed * 0.5 * (idx % 2 === 0 ? 1 : -1));
          ctx.strokeStyle = themeColors.secondary;
          ctx.lineWidth = 1.2;
          ctx.setLineDash([8, 8]);
          ctx.beginPath();
          ctx.arc(0, 0, baseR + 8, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // Breathing orbital ring
        const pulse = Math.sin(elapsed * 2.4 + idx) * 2.5;
        ctx.strokeStyle = isHovered ? themeColors.primary : themeColors.secondary;
        ctx.lineWidth = isHovered ? 2.0 : 1.2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(cx, cy, baseR + pulse, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Voxel/raster digital matrix core
        const dotStep = 4.0;
        const maxDist = baseR * 0.88;
        for (let ox = -maxDist; ox <= maxDist; ox += dotStep) {
          for (let oy = -maxDist; oy <= maxDist; oy += dotStep) {
            const dist = Math.hypot(ox, oy);
            if (dist < maxDist) {
              const oscillation = Math.sin(ox * 0.18 + oy * 0.18 + elapsed * 3.5 + idx);
              const density = (1 - dist / maxDist) * (0.8 + oscillation * 0.2);
              if (density > 0.25) {
                const barHeight = 2.4 + density * 4.2;
                ctx.fillStyle =
                  density > 0.72
                    ? themeColors.spark
                    : density > 0.45
                    ? themeColors.primary
                    : themeColors.darkRamp;
                ctx.fillRect(cx + ox - 1, cy + oy - barHeight / 2, 2, barHeight);
              }
            }
          }
        }

        // Bounding Tactical Frames & Reticles
        const framePad = baseR * 1.15;
        const fLeft = cx - framePad;
        const fRight = cx + framePad;
        const fTop = cy - framePad;
        const fBottom = cy + framePad;
        const bracketLen = 12;

        if (node.isPrimary) {
          // Bounding box with corner dot pins
          ctx.strokeStyle = isHovered ? themeColors.primary : themeColors.secondary;
          ctx.lineWidth = 1.4;
          ctx.strokeRect(fLeft, fTop, framePad * 2, framePad * 2);

          // Corner pins
          ctx.fillStyle = themeColors.primary;
          [[fLeft, fTop], [fRight, fTop], [fLeft, fBottom], [fRight, fBottom]].forEach(([px, py]) => {
            ctx.beginPath();
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fill();
          });

          // Floating Label Banner Chip
          const chipW = Math.max(76, node.name.length * 9 + 14);
          const chipH = 15;
          ctx.fillStyle = themeColors.chipBg;
          ctx.fillRect(fLeft, fTop - chipH, chipW, chipH);
          ctx.fillStyle = themeColors.chipText;
          ctx.font = "bold 9.5px monospace";
          ctx.fillText(node.name, fLeft + 6, fTop - 3.5);

          // Sublabel badge
          ctx.fillStyle = themeColors.textMuted;
          ctx.font = "bold 8.5px monospace";
          const subText = node.role;
          ctx.fillText(subText, cx - (subText.length * 5) / 2, fBottom + 13);
        } else {
          // Corner brackets ┌ ┐ └ ┘
          ctx.strokeStyle = isHovered ? themeColors.primary : themeColors.secondary;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          // Top-left
          ctx.moveTo(fLeft, fTop + bracketLen);
          ctx.lineTo(fLeft, fTop);
          ctx.lineTo(fLeft + bracketLen, fTop);
          // Top-right
          ctx.moveTo(fRight - bracketLen, fTop);
          ctx.lineTo(fRight, fTop);
          ctx.lineTo(fRight, fTop + bracketLen);
          // Bottom-left
          ctx.moveTo(fLeft, fBottom - bracketLen);
          ctx.lineTo(fLeft, fBottom);
          ctx.lineTo(fLeft + bracketLen, fBottom);
          // Bottom-right
          ctx.moveTo(fRight - bracketLen, fBottom);
          ctx.lineTo(fRight, fBottom);
          ctx.lineTo(fRight, fBottom - bracketLen);
          ctx.stroke();

          // Node Label
          ctx.fillStyle = themeColors.textMain;
          ctx.font = "bold 9.5px monospace";
          ctx.fillText(node.name, fLeft, fTop - 4);
        }
      });

      // ─── 7. Top-Right HUD Status Chip: "NODES: 5" / "SYSTEM ONLINE" ──────────
      const chipX = width * 0.76;
      const chipY = height * 0.08;
      ctx.fillStyle = themeColors.chipBg;
      ctx.fillRect(chipX, chipY, 74, 15);
      ctx.fillStyle = themeColors.chipText;
      ctx.font = "bold 9px monospace";
      ctx.fillText("NODES: 5", chipX + 6, chipY + 11);

      ctx.fillStyle = themeColors.chipBg;
      ctx.fillRect(chipX, chipY + 18, 92, 15);
      ctx.fillStyle = themeColors.chipText;
      ctx.fillText("SYSTEM ONLINE", chipX + 6, chipY + 29);

      // ─── 8. Bottom-Right Telemetry Chart: "THREAT MATRIX" ───────────────────
      const chartX = width * 0.60;
      const chartY = height * 0.70;
      const chartW = width * 0.22;
      const chartH = height * 0.20;

      // Header chip
      ctx.fillStyle = themeColors.chipBg;
      ctx.fillRect(chartX, chartY - 15, 96, 15);
      ctx.fillStyle = themeColors.chipText;
      ctx.font = "bold 9px monospace";
      ctx.fillText("THREAT MATRIX", chartX + 6, chartY - 4);

      // Coordinate axes
      ctx.strokeStyle = themeColors.secondary;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(chartX, chartY);
      ctx.lineTo(chartX, chartY + chartH);
      ctx.lineTo(chartX + chartW, chartY + chartH);
      for (let t = 0; t <= chartH; t += chartH / 4) {
        ctx.moveTo(chartX - 3, chartY + t);
        ctx.lineTo(chartX, chartY + t);
      }
      ctx.stroke();

      // Live animated telemetry bars: SRV, AGT, CVE
      const barData = [
        { label: "SRV", pct: 0.55 + Math.sin(elapsed * 1.6) * 0.15 },
        { label: "AGT", pct: 0.82 + Math.sin(elapsed * 2.2 + 1) * 0.10 },
        { label: "CVE", pct: 0.35 + Math.cos(elapsed * 1.9) * 0.20 },
      ];

      const barSlot = chartW / 3;
      barData.forEach((b, bIdx) => {
        const bx = chartX + bIdx * barSlot + barSlot * 0.35;
        const bHeight = chartH * Math.min(Math.max(b.pct, 0.1), 0.95);
        const by = chartY + chartH - bHeight;

        ctx.fillStyle = themeColors.primary;
        for (let ry = by; ry < chartY + chartH; ry += 5) {
          ctx.fillRect(bx - 3, ry, 6, 3.5);
        }

        ctx.fillStyle = themeColors.textMuted;
        ctx.font = "bold 8.5px monospace";
        ctx.fillText(b.label, bx - 8, chartY + chartH + 12);
      });

      // ─── 9. Coordinates & System Heartbeat Line ─────────────────────────────
      ctx.fillStyle = themeColors.textMuted;
      ctx.font = "8px monospace";
      ctx.fillText(
        `LATENCY: 0.12ms | P2P MESH: ACTIVE | PROTOCOL: RUST-TLS`,
        18,
        height - 18
      );

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDark, hoveredNode]);

  return (
    <div className={`relative w-full h-full select-none overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair"
        style={{
          filter: isDark ? "drop-shadow(0 0 18px rgba(63, 222, 201, 0.12))" : "none",
        }}
      />
    </div>
  );
}
