"use client";

import React, { useState, useEffect, useRef } from "react";
import { useToast } from "./Toast";
import {
  Network,
  Zap,
  Shield,
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle2,
  Server,
  Laptop,
  Layers,
  ArrowRight,
  TrendingDown,
} from "lucide-react";

interface Node {
  id: string;
  x: number;
  y: number;
  subnet: "Subnet-A (Finance)" | "Subnet-B (Eng)" | "Subnet-C (DataCenter)";
  type: "Seed" | "Peer" | "Gateway";
  status: "protected" | "vulnerable" | "swarming";
  progress: number;
  label: string;
}

const INITIAL_NODES: Node[] = [
  // Subnet A - Finance
  { id: "A1", x: 120, y: 70, subnet: "Subnet-A (Finance)", type: "Gateway", status: "protected", progress: 100, label: "GW-10.14.1" },
  { id: "A2", x: 60, y: 130, subnet: "Subnet-A (Finance)", type: "Seed", status: "protected", progress: 100, label: "SEED-FIN-01" },
  { id: "A3", x: 140, y: 150, subnet: "Subnet-A (Finance)", type: "Peer", status: "protected", progress: 100, label: "WS-FIN-04" },
  { id: "A4", x: 80, y: 220, subnet: "Subnet-A (Finance)", type: "Peer", status: "protected", progress: 100, label: "WS-FIN-09" },
  { id: "A5", x: 180, y: 190, subnet: "Subnet-A (Finance)", type: "Peer", status: "protected", progress: 100, label: "POS-TERM-12" },

  // Subnet B - Engineering
  { id: "B1", x: 380, y: 60, subnet: "Subnet-B (Eng)", type: "Gateway", status: "protected", progress: 100, label: "GW-10.18.1" },
  { id: "B2", x: 320, y: 120, subnet: "Subnet-B (Eng)", type: "Seed", status: "protected", progress: 100, label: "SEED-ENG-03" },
  { id: "B3", x: 420, y: 130, subnet: "Subnet-B (Eng)", type: "Peer", status: "protected", progress: 100, label: "MAC-ENG-84" },
  { id: "B4", x: 350, y: 200, subnet: "Subnet-B (Eng)", type: "Peer", status: "protected", progress: 100, label: "LINUX-DEV-2" },
  { id: "B5", x: 450, y: 210, subnet: "Subnet-B (Eng)", type: "Peer", status: "protected", progress: 100, label: "K8S-NODE-07" },

  // Subnet C - Core DataCenter
  { id: "C1", x: 250, y: 250, subnet: "Subnet-C (DataCenter)", type: "Gateway", status: "protected", progress: 100, label: "GW-10.20.1" },
  { id: "C2", x: 200, y: 310, subnet: "Subnet-C (DataCenter)", type: "Seed", status: "protected", progress: 100, label: "CORE-DC-01" },
  { id: "C3", x: 290, y: 320, subnet: "Subnet-C (DataCenter)", type: "Peer", status: "protected", progress: 100, label: "DB-SHARD-04" },
  { id: "C4", x: 240, y: 370, subnet: "Subnet-C (DataCenter)", type: "Peer", status: "protected", progress: 100, label: "AUTH-LDAP-02" },
];

export default function P2PMeshCanvas() {
  const { addToast } = useToast();
  const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
  const [isSwarming, setIsSwarming] = useState(false);
  const [mode, setMode] = useState<"p2p" | "legacy">("p2p");
  const [swarmRound, setSwarmRound] = useState(0);
  const [wanTraffic, setWanTraffic] = useState(1.2); // % WAN used
  const [p2pThroughput, setP2pThroughput] = useState(3.8); // GB/s
  const [activeAdvisory, setActiveAdvisory] = useState<string | null>(null);

  // Simulation timer
  useEffect(() => {
    if (!isSwarming) return;

    const interval = setInterval(() => {
      setNodes((prevNodes) => {
        let allDone = true;
        const updated = prevNodes.map((node) => {
          if (node.status === "protected") return node;
          allDone = false;
          const nextProgress = Math.min(100, node.progress + (node.type === "Seed" ? 28 : 18));
          return {
            ...node,
            progress: nextProgress,
            status: (nextProgress >= 100 ? "protected" : "swarming") as Node["status"],
          };
        });

        if (allDone) {
          setIsSwarming(false);
          setActiveAdvisory(null);
          setWanTraffic(1.3);
          setP2pThroughput(0.4);
          addToast({
            title: "P2P Swarm Complete",
            message: "All 14 cluster nodes patched. 98.7% WAN bandwidth offloaded successfully.",
            type: "success",
          });
        }
        return updated;
      });
    }, 450);

    return () => clearInterval(interval);
  }, [isSwarming, addToast]);

  const triggerVulnerability = () => {
    setActiveAdvisory("CVE-2026-3829 (Chromium V8 Zero-Day CVSS 9.8)");
    setNodes((prev) =>
      prev.map((n) => ({
        ...n,
        status: n.type === "Gateway" ? "protected" : "vulnerable",
        progress: n.type === "Gateway" ? 100 : 0,
      }))
    );
    addToast({
      title: "Advisory Ingested",
      message: "CVE-2026-3829 detected across 12 endpoints. Ready for autonomous canary swarm.",
      type: "warning",
    });
  };

  const startP2PSwarm = () => {
    setIsSwarming(true);
    setMode("p2p");
    setWanTraffic(2.1);
    setP2pThroughput(4.6);
    addToast({
      title: "P2P Mesh Swarm Activated",
      message: "Seed nodes distributing encrypted SHA-256 blocks directly over local LAN subnets.",
      type: "info",
    });
  };

  const switchToLegacySimulation = () => {
    setMode("legacy");
    setIsSwarming(false);
    setWanTraffic(94.8); // massive WAN saturation
    setP2pThroughput(0.08); // slow internet egress
    setNodes((prev) =>
      prev.map((n) => ({
        ...n,
        status: "vulnerable",
        progress: 15,
      }))
    );
    addToast({
      title: "Legacy WSUS/Cloud Simulation Active",
      message: "WAN router saturated at 94.8%. Remote branch employees experiencing video call degradation.",
      type: "warning",
    });
  };

  const resetSwarm = () => {
    setNodes(INITIAL_NODES);
    setIsSwarming(false);
    setMode("p2p");
    setActiveAdvisory(null);
    setWanTraffic(1.2);
    setP2pThroughput(3.8);
  };

  const protectedCount = nodes.filter((n) => n.status === "protected").length;
  const compliancePercentage = Math.round((protectedCount / nodes.length) * 100);

  return (
    <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 shadow-2xl overflow-hidden space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-[var(--text)]">
              Interactive Peer Mesh Swarm Visualizer
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)] uppercase font-semibold">
              Live Topology
            </span>
          </div>
          <p className="text-xs text-[var(--text-2)] mt-1">
            Observe byte-level chunk swarming between nodes. Data travels locally inside subnets with zero WAN router backpressure.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center gap-2 bg-[var(--sunk)] p-1 rounded-xl border border-[var(--line)]">
          <button
            onClick={() => {
              setMode("p2p");
              setWanTraffic(1.8);
              setP2pThroughput(3.8);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              mode === "p2p"
                ? "bg-[var(--accent)] text-white shadow"
                : "text-[var(--text-2)] hover:text-[var(--text)]"
            }`}
          >
            Rust Shield P2P Mesh
          </button>
          <button
            onClick={switchToLegacySimulation}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              mode === "legacy"
                ? "bg-rose-600 text-white shadow"
                : "text-[var(--text-2)] hover:text-[var(--text)]"
            }`}
          >
            Legacy WAN Choke
          </button>
        </div>
      </div>

      {/* Advisory Banner if active */}
      {activeAdvisory && (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs flex items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="h-4 w-4 text-rose-500 flex-shrink-0 animate-bounce" />
            <span className="font-mono text-rose-400 font-semibold">{activeAdvisory}</span>
          </div>
          <button
            onClick={startP2PSwarm}
            disabled={isSwarming}
            className="flex-shrink-0 rounded-xl bg-emerald-500 text-white px-3.5 py-1.5 font-mono text-xs font-semibold hover:bg-emerald-600 transition-colors shadow"
          >
            {isSwarming ? "Swarming Patches..." : "1-Click Deploy P2P Mesh Swarm →"}
          </button>
        </div>
      )}

      {/* Main Interactive Grid: Canvas + Telemetry Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Mesh Canvas */}
        <div className="lg:col-span-8 relative aspect-[16/10] w-full rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-4 overflow-hidden">
          {/* Subnet Regions Background */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 opacity-30 pointer-events-none">
            <div className="border-r border-b border-[var(--line)]/50 p-3">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-3)]">10.14.0.0/24 · Branch A</span>
            </div>
            <div className="border-b border-[var(--line)]/50 p-3">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-3)]">10.18.0.0/24 · Branch B</span>
            </div>
            <div className="col-span-2 p-3">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-3)]">10.20.0.0/24 · Core DataCenter Cluster</span>
            </div>
          </div>

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 420" preserveAspectRatio="xMidYMid meet">
            {/* Draw Mesh Connection Lines */}
            <defs>
              <linearGradient id="p2pLine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1daf9c" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="chokeLine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#e11d48" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Subnet A peer connections */}
            {mode === "p2p" ? (
              <g stroke="url(#p2pLine)" strokeWidth="1.5" strokeDasharray={isSwarming ? "4,4" : "none"}>
                <line x1="60" y1="130" x2="140" y2="150" className={isSwarming ? "animate-pulse" : ""} />
                <line x1="60" y1="130" x2="80" y2="220" />
                <line x1="140" y1="150" x2="180" y2="190" />
                <line x1="120" y1="70" x2="60" y2="130" />

                {/* Subnet B peer connections */}
                <line x1="320" y1="120" x2="420" y2="130" />
                <line x1="320" y1="120" x2="350" y2="200" />
                <line x1="420" y1="130" x2="450" y2="210" />
                <line x1="380" y1="60" x2="320" y2="120" />

                {/* Subnet C connections */}
                <line x1="200" y1="310" x2="290" y2="320" />
                <line x1="200" y1="310" x2="240" y2="370" />
                <line x1="250" y1="250" x2="200" y2="310" />

                {/* Gateway to Gateway encrypted cross-site trunk */}
                <line x1="120" y1="70" x2="250" y2="250" stroke="var(--line)" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="380" y1="60" x2="250" y2="250" stroke="var(--line)" strokeWidth="1" strokeDasharray="3,3" />
              </g>
            ) : (
              // Legacy WAN: all nodes pull through gateway bottleneck
              <g stroke="url(#chokeLine)" strokeWidth="2">
                <line x1="60" y1="130" x2="120" y2="70" />
                <line x1="140" y1="150" x2="120" y2="70" />
                <line x1="80" y1="220" x2="120" y2="70" />
                <line x1="320" y1="120" x2="380" y2="60" />
                <line x1="420" y1="130" x2="380" y2="60" />
                <line x1="350" y1="200" x2="380" y2="60" />
                <line x1="200" y1="310" x2="250" y2="250" />
                <line x1="290" y1="320" x2="250" y2="250" />
              </g>
            )}

            {/* Nodes Render */}
            {nodes.map((node) => {
              const isGreen = node.status === "protected";
              const isRed = node.status === "vulnerable";
              const isYellow = node.status === "swarming";

              const color = isGreen ? "#10b981" : isRed ? "#f43f5e" : "#f59e0b";

              return (
                <g key={node.id} transform={`translate(${node.x}, ${node.y})`} className="cursor-pointer group">
                  {/* Outer pulse when swarming */}
                  {isYellow && (
                    <circle r="18" fill={color} opacity="0.2" className="animate-ping" />
                  )}

                  {/* Seed node halo */}
                  {node.type === "Seed" && (
                    <circle r="14" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="2,2" />
                  )}

                  {/* Main Node Body */}
                  <circle
                    r="9"
                    fill={color}
                    stroke="var(--surface)"
                    strokeWidth="2"
                    className="transition-colors duration-300"
                  />

                  {/* Node Icon inside */}
                  <text
                    textAnchor="middle"
                    dy="3"
                    fontSize="7"
                    fill="#ffffff"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {node.type === "Seed" ? "S" : node.type === "Gateway" ? "G" : "P"}
                  </text>

                  {/* Tooltip Label */}
                  <text
                    x="12"
                    y="4"
                    fontSize="9"
                    fontFamily="monospace"
                    fill="var(--text)"
                    className="opacity-75 group-hover:opacity-100 font-semibold"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Floating Canvas Legend */}
          <div className="absolute bottom-3 left-3 flex items-center gap-4 bg-[var(--surface)]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[var(--line)] text-[10px] font-mono">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Protected (100%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-500" /> Vulnerable
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" /> Swarming
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full border border-amber-400 bg-amber-400/20" /> Seed Master
            </span>
          </div>
        </div>

        {/* Live Gauges & Controls Side Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-4 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-3)] font-semibold">
              Live Fleet Metrics
            </span>

            {/* Metric 1 */}
            <div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[var(--text-2)] font-mono">Compliance Rate:</span>
                <span className="font-mono font-bold text-[var(--text)]">{compliancePercentage}%</span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-[var(--sunk)] overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${compliancePercentage}%` }}
                />
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex justify-between items-center text-xs pt-1 border-t border-[var(--line)]/50">
              <span className="text-[var(--text-2)] font-mono">WAN Bandwidth Ingress:</span>
              <span className={`font-mono font-bold ${wanTraffic > 50 ? "text-rose-500" : "text-emerald-500"}`}>
                {wanTraffic}% {wanTraffic > 50 ? "(Saturated!)" : "(Optimal)"}
              </span>
            </div>

            {/* Metric 3 */}
            <div className="flex justify-between items-center text-xs pt-1 border-t border-[var(--line)]/50">
              <span className="text-[var(--text-2)] font-mono">P2P Mesh Transfer Rate:</span>
              <span className="font-mono font-bold text-[var(--accent)]">{p2pThroughput} GB/s</span>
            </div>

            {/* Metric 4 */}
            <div className="flex justify-between items-center text-xs pt-1 border-t border-[var(--line)]/50">
              <span className="text-[var(--text-2)] font-mono">Chunk Integrity:</span>
              <span className="font-mono text-emerald-500 font-semibold">SHA-256 Merkle (100%)</span>
            </div>
          </div>

          {/* Interactive Trigger Buttons */}
          <div className="space-y-2">
            <button
              onClick={triggerVulnerability}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-mono text-xs font-semibold transition-all active:scale-98"
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>Simulate Zero-Day Exploit</span>
            </button>

            <button
              onClick={startP2PSwarm}
              disabled={isSwarming}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[var(--accent)] hover:opacity-90 text-white font-mono text-xs font-semibold shadow-md transition-all active:scale-98 disabled:opacity-50"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>{isSwarming ? "Autonomous Swarm In Progress..." : "Dispatch P2P Autonomous Swarm"}</span>
            </button>

            <button
              onClick={resetSwarm}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-[var(--line)] bg-[var(--sunk)] hover:bg-[var(--surface)] text-[var(--text-2)] font-mono text-[11px] transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset Topology</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
