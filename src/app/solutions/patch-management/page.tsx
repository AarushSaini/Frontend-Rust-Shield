"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Zap,
  Network,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  Sliders,
  DollarSign,
  AlertTriangle,
  RotateCcw,
  Check,
  Server,
  Cpu,
  Lock,
} from "lucide-react";

export default function PatchManagementPage() {
  // Interactive ROI Calculator State
  const [fleetSize, setFleetSize] = useState(15000);

  // Calculations based on industry telemetry
  const serversEliminated = Math.ceil(fleetSize / 500);
  const annualServerCostSaved = serversEliminated * 4200; // Hardware/maintenance per DP
  const annualWanCostSaved = Math.round((fleetSize * 36) * 0.85); // WAN bandwidth congestion costs
  const itHoursSaved = Math.round(fleetSize * 1.8);
  const totalAnnualSavings = annualServerCostSaved + annualWanCostSaved + (itHoursSaved * 65);

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-20 border-b border-[var(--line)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface)]/40 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3.5 py-1 text-xs font-mono font-medium text-[var(--accent)]">
              <Shield className="h-3.5 w-3.5" />
              <span>Autonomous Patch Management</span>
            </div>

            <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--text)] leading-[1.12]">
              Patch every OS and third-party app in minutes. Without servers or WAN spikes.
            </h1>

            <p className="mt-6 text-lg text-[var(--text-2)] leading-relaxed font-sans">
              Legacy patch management relies on fragile distribution servers, saturated VPNs, and manual ring babysitting. Rust Shield automates the entire lifecycle—from vulnerability detection to zero-copy P2P peer delivery and self-healing rollback.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--accent)]/20 hover:opacity-90 transition-all"
              >
                <span>Request Custom Demo</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-6 py-3.5 text-sm font-medium text-[var(--text)] hover:bg-[var(--sunk)] transition-colors"
              >
                <span>Explore Live Console</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
              <div className="text-3xl font-serif text-[var(--text)] font-normal">99.4%</div>
              <p className="mt-1 text-xs text-[var(--text-3)] font-mono">First-Pass Patch Success</p>
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
              <div className="text-3xl font-serif text-emerald-500 font-normal">98.7%</div>
              <p className="mt-1 text-xs text-[var(--text-3)] font-mono">P2P WAN Offload</p>
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
              <div className="text-3xl font-serif text-[var(--text)] font-normal">14 Min</div>
              <p className="mt-1 text-xs text-[var(--text-3)] font-mono">Mean Time to Remediate</p>
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
              <div className="text-3xl font-serif text-[var(--accent)] font-normal">0</div>
              <p className="mt-1 text-xs text-[var(--text-3)] font-mono">Remote Distribution Points</p>
            </div>
          </div>
        </div>
      </section>

      {/* The 5-Stage Autonomous Patch Pipeline */}
      <section className="py-20 border-b border-[var(--line)] bg-[var(--surface)]/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
              End-to-End Orchestration
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[var(--text)]">
              How Rust Shield eliminates 90% of patching effort
            </h2>
            <p className="mt-4 text-sm text-[var(--text-2)] leading-relaxed">
              From the moment a vendor publishes an advisory to complete fleet remediation, Rust Shield operates autonomously without human intervention.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <h3 className="font-serif text-lg font-medium text-[var(--text)]">Continuous Vulnerability Ingestion</h3>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                Connects directly to CISA KEV, NVD, Microsoft MSRC, Apple, and Canonical feeds. Identifies affected assets within seconds of CVE publication.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <h3 className="font-serif text-lg font-medium text-[var(--text)]">Curated 3rd-Party Packaging</h3>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                Access 1,200+ pre-tested, digitally signed enterprise application packages. No custom MSI packaging, script hacking, or silent-switch guessing required.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-mono font-bold text-sm">
                03
              </div>
              <h3 className="font-serif text-lg font-medium text-[var(--text)]">Zero-Infrastructure P2P Delivery</h3>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                Only one endpoint per subnet downloads content over the WAN. Local peers swarm encrypted chunk fragments at gigabit LAN speed, avoiding ISP throttling.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-mono font-bold text-sm">
                04
              </div>
              <h3 className="font-serif text-lg font-medium text-[var(--text)]">Multi-Ring Canary Rollout</h3>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                Deploy gradually across test lab, pilot users, and broad production rings. Automatically assesses health telemetry between each ring progression.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-mono font-bold text-sm">
                05
              </div>
              <h3 className="font-serif text-lg font-medium text-[var(--text)]">Rollback Insurance</h3>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                If a patch induces application crashes, high CPU spikes, or boot failures, Rust Shield instantly halts the ring and safely rolls back affected machines.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-mono font-bold text-sm">
                06
              </div>
              <h3 className="font-serif text-lg font-medium text-[var(--text)]">Executive Audit Proof</h3>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                Export real-time compliance attestations mapped to SOC 2 Type II, CIS Benchmarks, NIST 800-53, and HIPAA with one click for board auditors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Enterprise ROI Calculator */}
      <section className="py-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8 lg:p-12 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
                  Interactive Fleet Economics
                </span>
                <h2 className="font-serif text-3xl font-medium text-[var(--text)]">
                  Calculate Your Organization&apos;s Annual Savings
                </h2>
                <p className="text-sm text-[var(--text-2)] leading-relaxed">
                  By eliminating remote distribution servers, slashing WAN transit costs, and automating tier-1 patch testing, Rust Shield pays for itself within 90 days.
                </p>

                {/* Slider */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-sm font-mono">
                    <span className="text-[var(--text-2)]">Managed Endpoints Fleet:</span>
                    <span className="text-xl font-bold text-[var(--text)]">{fleetSize.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={fleetSize}
                    onChange={(e) => setFleetSize(Number(e.target.value))}
                    className="w-full accent-[var(--accent)] cursor-pointer h-2 bg-[var(--sunk)] rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-[var(--text-3)]">
                    <span>1,000 nodes</span>
                    <span>50,000 nodes</span>
                    <span>100,000+ nodes</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/demo"
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-xs font-semibold text-white hover:opacity-90 transition-opacity"
                  >
                    <span>Receive Detailed Financial Model</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Savings Card */}
              <div className="lg:col-span-6 rounded-2xl border border-[var(--line)] bg-[var(--sunk)] p-6 space-y-4">
                <div className="border-b border-[var(--line)] pb-4">
                  <p className="text-xs font-mono uppercase text-[var(--text-3)]">Projected Annual Enterprise Value</p>
                  <p className="text-4xl sm:text-5xl font-serif font-normal text-emerald-500 mt-2">
                    ${(totalAnnualSavings / 1000).toFixed(0)}k <span className="text-sm font-mono text-[var(--text-3)]">/ yr</span>
                  </p>
                </div>

                <div className="space-y-3 text-xs font-mono">
                  <div className="flex justify-between items-center py-1.5 border-b border-[var(--line)]">
                    <span className="text-[var(--text-2)]">Remote Servers Decommissioned:</span>
                    <span className="text-[var(--text)] font-bold">{serversEliminated} servers (${annualServerCostSaved.toLocaleString()}/yr)</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-[var(--line)]">
                    <span className="text-[var(--text-2)]">WAN Bandwidth Surcharges Saved:</span>
                    <span className="text-[var(--text)] font-bold">${annualWanCostSaved.toLocaleString()}/yr</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-[var(--text-2)]">SecOps Engineering Hours Reclaimed:</span>
                    <span className="text-[var(--text)] font-bold">{itHoursSaved.toLocaleString()} hours</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--line)] text-xs text-[var(--text-3)] leading-relaxed">
                  Based on audited customer outcomes across 500k+ global endpoints replacing legacy distribution architectures.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Matrix: Legacy vs Rust Shield */}
      <section className="py-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
              Architectural Showdown
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[var(--text)]">
              Engineered to replace complex legacy tooling
            </h2>
          </div>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[var(--line)] bg-[var(--surface)] font-mono text-[11px] uppercase tracking-wider text-[var(--text-3)]">
                  <th className="py-4 px-5">Capability</th>
                  <th className="py-4 px-5">Traditional WSUS / SCCM</th>
                  <th className="py-4 px-5">Cloud Native (Intune)</th>
                  <th className="py-4 px-5 text-[var(--accent)] font-bold">Rust Shield Autonomous</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)]">
                <tr>
                  <td className="py-4 px-5 font-semibold text-[var(--text)]">Remote Branch Infrastructure</td>
                  <td className="py-4 px-5 text-rose-400">Requires local DP servers</td>
                  <td className="py-4 px-5 text-amber-400">Direct cloud (saturates WAN)</td>
                  <td className="py-4 px-5 font-medium text-emerald-400">Zero servers (100% P2P mesh)</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-semibold text-[var(--text)]">Third-Party App Catalog</td>
                  <td className="py-4 px-5 text-rose-400">Requires custom packaging</td>
                  <td className="py-4 px-5 text-amber-400">Limited curated catalogs</td>
                  <td className="py-4 px-5 font-medium text-emerald-400">1,200+ auto-packaged apps</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-semibold text-[var(--text)]">Canary Rollback Protection</td>
                  <td className="py-4 px-5 text-rose-400">Manual rollback scripts</td>
                  <td className="py-4 px-5 text-rose-400">Slow ring delays (days)</td>
                  <td className="py-4 px-5 font-medium text-emerald-400">Autonomous sub-second circuit breaker</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-semibold text-[var(--text)]">Client Memory Safety</td>
                  <td className="py-4 px-5 text-rose-400">C++ agent (vulnerable to buffer overflows)</td>
                  <td className="py-4 px-5 text-amber-400">Heavy .NET runtime footprint</td>
                  <td className="py-4 px-5 font-medium text-emerald-400">100% Pure Rust (&lt;20MB RAM, zero memory leaks)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[var(--text)]">
            Ready to experience autonomous patch management?
          </h2>
          <p className="text-base text-[var(--text-2)] max-w-2xl mx-auto">
            Schedule a personalized technical demonstration with our systems architecture team or test drive the live operations console.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/demo"
              className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Request 1-on-1 Proof of Concept
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl border border-[var(--line)] bg-[var(--bg)] px-6 py-3.5 text-sm font-medium text-[var(--text)] hover:bg-[var(--sunk)] transition-colors"
            >
              Launch Live Console
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

