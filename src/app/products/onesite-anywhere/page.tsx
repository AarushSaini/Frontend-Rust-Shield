"use client";

import React, { useState } from "react";
import Link from "next/link";
import P2PMeshCanvas from "@/components/P2PMeshCanvas";
import {
  Network,
  Server,
  Zap,
  ArrowRight,
  Shield,
  Wifi,
  HardDrive,
  Cpu,
  Layers,
  CheckCircle2,
  Lock,
  Globe,
  Radio,
} from "lucide-react";

export default function OneSiteAnywherePage() {
  const [activeTransferMode, setActiveTransferMode] = useState<"p2p" | "traditional">("p2p");

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono font-medium text-emerald-500">
              <Network className="h-3.5 w-3.5" />
              <span>Rust Shield OneSite Anywhere</span>
            </div>

            <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--text)] leading-[1.12]">
              Zero-infrastructure content distribution over P2P peer mesh.
            </h1>

            <p className="mt-6 text-lg text-[var(--text-2)] leading-relaxed font-sans">
              Deliver multi-gigabyte OS upgrades, software packages, and emergency zero-day hotfixes to thousands of endpoints in minutes—without saturating your WAN or paying exorbitant cloud egress fees.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--accent)]/20 hover:opacity-90 transition-all"
              >
                <span>Request Mesh Architecture Demo</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-6 py-3.5 text-sm font-medium text-[var(--text)] hover:bg-[var(--sunk)] transition-colors"
              >
                <span>View Live Operations Console</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
              <div className="text-3xl font-serif text-emerald-500 font-normal">98.7%</div>
              <p className="mt-1 text-xs text-[var(--text-3)] font-mono">WAN Traffic Reduction</p>
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
              <div className="text-3xl font-serif text-[var(--text)] font-normal">$0</div>
              <p className="mt-1 text-xs text-[var(--text-3)] font-mono">Branch Server Hardware</p>
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
              <div className="text-3xl font-serif text-[var(--accent)] font-normal">0 ms</div>
              <p className="mt-1 text-xs text-[var(--text-3)] font-mono">User Jitter or VoIP Lag</p>
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
              <div className="text-3xl font-serif text-[var(--text)] font-normal">AES-256</div>
              <p className="mt-1 text-xs text-[var(--text-3)] font-mono">End-to-End Encrypted Chunks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Network Topology Visualizer */}
      <section className="py-20 border-b border-[var(--line)] bg-[var(--surface)]/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
                Network Architecture Comparison
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[var(--text)]">
                Why Peer-to-Peer Outperforms Central Distribution
              </h2>
            </div>

            <div className="inline-flex rounded-xl border border-[var(--line)] bg-[var(--sunk)] p-1">
              <button
                onClick={() => setActiveTransferMode("p2p")}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-colors ${
                  activeTransferMode === "p2p" ? "bg-[var(--accent)] text-white shadow-sm" : "text-[var(--text-2)] hover:text-[var(--text)]"
                }`}
              >
                Rust Shield P2P Swarm
              </button>
              <button
                onClick={() => setActiveTransferMode("traditional")}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-colors ${
                  activeTransferMode === "traditional" ? "bg-[var(--accent)] text-white shadow-sm" : "text-[var(--text-2)] hover:text-[var(--text)]"
                }`}
              >
                Traditional Client-Server
              </button>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8 shadow-xl">
            {activeTransferMode === "p2p" ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs font-mono border-b border-[var(--line)] pb-3">
                  <span className="text-emerald-500 font-semibold flex items-center gap-2">
                    <Radio className="h-4 w-4 animate-pulse" />
                    Rust Shield Mesh Mode: Single WAN Download + Local LAN Swarming
                  </span>
                  <span className="text-[var(--text-3)]">Branch Office (500 machines)</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-2xl bg-[var(--sunk)] border border-emerald-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-emerald-400 font-bold">WAN Ingress</span>
                      <span className="text-xs font-mono text-[var(--text)]">1 Copy (4.2 GB)</span>
                    </div>
                    <div className="h-2 w-full bg-[var(--line)] rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: "2%" }}></div>
                    </div>
                    <p className="text-xs text-[var(--text-3)] leading-relaxed">
                      Only one machine per subnet downloads the payload from cloud or headquarters.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[var(--sunk)] border border-[var(--accent)]/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[var(--accent)] font-bold">Subnet Swarm</span>
                      <span className="text-xs font-mono text-[var(--text)]">Gigabit Wire Speed</span>
                    </div>
                    <div className="h-2 w-full bg-[var(--line)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--accent)]" style={{ width: "98%" }}></div>
                    </div>
                    <p className="text-xs text-[var(--text-3)] leading-relaxed">
                      Chunk fragments propagate laterally among peers using zero-copy TCP sockets in userspace Rust.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[var(--sunk)] border border-sky-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-sky-400 font-bold">Business Yielding</span>
                      <span className="text-xs font-mono text-[var(--text)]">Zero Packet Drop</span>
                    </div>
                    <div className="h-2 w-full bg-[var(--line)] rounded-full overflow-hidden">
                      <div className="h-full bg-sky-500" style={{ width: "100%" }}></div>
                    </div>
                    <p className="text-xs text-[var(--text-3)] leading-relaxed">
                      Microsecond RTT monitoring yields immediate bandwidth to Zoom, Teams, and SAP transactions.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs font-mono border-b border-[var(--line)] pb-3">
                  <span className="text-rose-400 font-semibold flex items-center gap-2">
                    ⚠ Traditional Architecture: 500 Endpoints Competing for WAN Pipe
                  </span>
                  <span className="text-[var(--text-3)]">Branch Office (500 machines)</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-2xl bg-[var(--sunk)] border border-rose-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-rose-400 font-bold">WAN Pipe Saturation</span>
                      <span className="text-xs font-mono text-rose-400 font-bold">100% Choked (2.1 TB)</span>
                    </div>
                    <div className="h-2 w-full bg-[var(--line)] rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500" style={{ width: "100%" }}></div>
                    </div>
                    <p className="text-xs text-[var(--text-3)] leading-relaxed">
                      All 500 machines pull identical 4.2 GB payloads directly through the branch router, freezing user operations.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[var(--sunk)] border border-[var(--line)] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[var(--text-3)] font-bold">Server Hardware</span>
                      <span className="text-xs font-mono text-[var(--text)]">$4,200/yr per DP</span>
                    </div>
                    <p className="text-xs text-[var(--text-3)] leading-relaxed">
                      Requires dedicated Windows Server distribution points, storage arrays, OS licensing, and maintenance tickets at every branch.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[var(--sunk)] border border-[var(--line)] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[var(--text-3)] font-bold">Time to Completion</span>
                      <span className="text-xs font-mono text-[var(--text)]">18 - 36 Hours</span>
                    </div>
                    <p className="text-xs text-[var(--text-3)] leading-relaxed">
                      Slow WAN bandwidth caps drag out rollout completions over multiple days, exposing endpoints to zero-day threat windows.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Live Mesh Topology Simulator */}
          <div className="mt-12">
            <P2PMeshCanvas />
          </div>
        </div>
      </section>

      {/* Deep Dive Capabilities */}
      <section className="py-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-medium text-[var(--text)]">Dynamic Master Election</h3>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                If the current seed machine is disconnected or closed by a mobile user, the peer swarm elects another healthy, AC-powered peer in milliseconds without dropping in-flight transfers.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-lg font-medium text-[var(--text)]">Byte-Level Binary Differencing</h3>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                When an application updates from version 12 to 13, OneSite Anywhere only distributes the modified binary delta—often shrinking a 500 MB download to less than 15 MB.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-lg font-medium text-[var(--text)]">Encrypted Content Protection</h3>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                Every chunk is authenticated with SHA-256 hashes and AES-GCM encryption. Tampered packets from rogue endpoints are instantly rejected and isolated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[var(--text)]">
            Eliminate server hardware from your remote sites
          </h2>
          <p className="text-base text-[var(--text-2)] max-w-2xl mx-auto">
            Schedule a live technical test across your branch network topology with our engineers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/demo"
              className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Request Custom Demo
            </Link>
            <Link
              href="/products/onesite-health"
              className="rounded-xl border border-[var(--line)] bg-[var(--bg)] px-6 py-3.5 text-sm font-medium text-[var(--text)] hover:bg-[var(--sunk)] transition-colors"
            >
              Explore OneSite Health →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

