"use client";

import React from "react";
import Link from "next/link";
import {
  Shield,
  Cpu,
  Layers,
  CheckCircle2,
  Lock,
  ArrowRight,
  Heart,
  Globe,
  Award,
  Terminal,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3.5 py-1 text-xs font-mono font-medium text-[var(--accent)]">
              <Shield className="h-3.5 w-3.5" />
              <span>Our Mission & Architecture</span>
            </div>

            <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--text)] leading-[1.12]">
              Re-architecting endpoint security for the memory-safe era.
            </h1>

            <p className="mt-6 text-lg text-[var(--text-2)] leading-relaxed font-sans">
              For thirty years, enterprise IT and security teams have been forced to choose between fragile, server-heavy distribution points and bandwidth-choking cloud agents written in vulnerable C++. Rust Shield was founded to deliver autonomous, zero-infrastructure endpoint management built from the ground up in memory-safe Rust.
            </p>
          </div>
        </div>
      </section>

      {/* The Origin & The &ldquo;Why Rust?&rdquo; Imperative */}
      <section className="py-20 border-b border-[var(--line)] bg-[var(--surface)]/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
                The Systems Safety Mandate
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[var(--text)]">
                Why we built the entire client runtime in Rust
              </h2>
              <p className="text-sm text-[var(--text-2)] leading-relaxed">
                Both Microsoft MSRC and the US Cybersecurity and Infrastructure Security Agency (CISA) have documented that approximately 70% of all major security vulnerabilities are memory safety defects—buffer overflows, use-after-free conditions, and race states.
              </p>
              <p className="text-sm text-[var(--text-2)] leading-relaxed">
                When an endpoint management agent runs with SYSTEM or root privileges across your entire enterprise, any memory defect can be weaponized by threat actors to execute remote code.
              </p>
              <div className="p-4 rounded-2xl bg-[var(--sunk)] border border-[var(--line)] space-y-2">
                <p className="font-semibold text-xs text-[var(--text)]">The Rust Shield Guarantee:</p>
                <p className="text-xs text-[var(--text-3)] leading-relaxed">
                  By leveraging Rust&apos;s strict compile-time borrow checker, we eliminate memory corruption vulnerabilities by design while maintaining C-level deterministic performance with under 20MB of resident RAM.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8 space-y-6 shadow-xl">
              <h3 className="font-serif text-xl font-medium text-[var(--text)]">Core Architectural Principles</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-mono text-xs font-bold mt-0.5">
                    01
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text)]">Zero Remote Distribution Points</h4>
                    <p className="text-xs text-[var(--text-3)] mt-0.5">We reject the outdated belief that branch offices need physical server racks to receive software updates.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-mono text-xs font-bold mt-0.5">
                    02
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text)]">Autonomous Self-Healing Over Tickets</h4>
                    <p className="text-xs text-[var(--text-3)] mt-0.5">Endpoints should continuously detect and heal broken services without waiting for human help desk tickets.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-mono text-xs font-bold mt-0.5">
                    03
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text)]">Instant Rollback Circuit Breakers</h4>
                    <p className="text-xs text-[var(--text-3)] mt-0.5">No deployment should risk enterprise downtime. If canary telemetry detects crashes, rollback is automatic.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Systems Engineering Team */}
      <section className="py-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
              Leadership & Engineering
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[var(--text)]">
              Built by veteran systems researchers
            </h2>
            <p className="mt-4 text-sm text-[var(--text-2)]">
              Our team consists of systems programmers, kernel developers, and distributed network engineers who previously led security infrastructure at hyperscalers and defense contractors.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-3">
              <div className="h-12 w-12 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-serif text-lg font-bold">
                EV
              </div>
              <div>
                <h4 className="font-semibold text-base text-[var(--text)]">Evelyn Vance</h4>
                <p className="text-xs text-[var(--accent)] font-mono">Chief Technology Officer & Co-Founder</p>
              </div>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                Former distributed systems lead at Cloudflare. Rust Foundation contributor specializing in zero-copy userspace socket programming and P2P peer discovery.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-3">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-serif text-lg font-bold">
                MW
              </div>
              <div>
                <h4 className="font-semibold text-base text-[var(--text)]">Dr. Marcus Wei</h4>
                <p className="text-xs text-emerald-500 font-mono">VP of Systems & Network Engineering</p>
              </div>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                PhD in Computer Science from MIT. Architected peer swarm telemetry protocols used across 500,000+ nodes in financial exchange networks.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-3">
              <div className="h-12 w-12 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center font-serif text-lg font-bold">
                SL
              </div>
              <div>
                <h4 className="font-semibold text-base text-[var(--text)]">Sara Lindqvist</h4>
                <p className="text-xs text-sky-500 font-mono">Principal Security Operations Architect</p>
              </div>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                Former enterprise CISO advisor for Nordic healthcare networks. Designed Rust Shield&apos;s automated Canary Staging and circuit breaker telemetry engine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[var(--text)]">
            Partner with the pioneers of memory-safe endpoint management
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/demo"
              className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Schedule Executive Briefing
            </Link>
            <Link
              href="/careers"
              className="rounded-xl border border-[var(--line)] bg-[var(--bg)] px-6 py-3.5 text-sm font-medium text-[var(--text)] hover:bg-[var(--sunk)] transition-colors"
            >
              View Open Roles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

