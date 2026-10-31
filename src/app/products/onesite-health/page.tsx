"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Activity,
  CheckCircle2,
  RefreshCw,
  HardDrive,
  Lock,
  ArrowRight,
  Shield,
  AlertTriangle,
  Layers,
  Terminal,
  FileCheck,
} from "lucide-react";

interface HealthCheck {
  title: string;
  category: "Client Core" | "Storage & Cache" | "Security Posture" | "Network & Certs";
  description: string;
  autoRemedy: string;
  successRate: string;
}

const HEALTH_CHECKS: HealthCheck[] = [
  { title: "Windows Update Agent (WUA) Daemon Check", category: "Client Core", description: "Detects hung or disabled wuauserv threads and broken COM registrations.", autoRemedy: "Restarts thread, re-registers wuaueng.dll, cleans registry state.", successRate: "99.8%" },
  { title: "WMI Repository Health & Consistency", category: "Client Core", description: "Identifies corrupted WMI repositories causing silent telemetry loss.", autoRemedy: "Executes winmgmt /salvagerepository and rebuilds mof repository.", successRate: "99.2%" },
  { title: "SoftwareDistribution Cache Bloat Flush", category: "Storage & Cache", description: "Reclaims multi-gigabyte orphaned download folders blocking fresh patches.", autoRemedy: "Safely flushes corrupted datastore files while retaining patch history.", successRate: "100%" },
  { title: "BitLocker Volume & TPM 2.0 State", category: "Security Posture", description: "Audits full disk encryption and checks for suspended BitLocker protection.", autoRemedy: "Resumes BitLocker protection, backs up recovery keys to Active Directory.", successRate: "99.9%" },
  { title: "Local Firewall Policy Drift Reversion", category: "Security Posture", description: "Detects unauthorized opened ports or disabled Windows Defender Firewall profiles.", autoRemedy: "Re-enforces enterprise CIS Benchmark baseline configuration in 200ms.", successRate: "100%" },
  { title: "Peer-to-Peer TLS Certificate Validation", category: "Network & Certs", description: "Verifies mutual TLS authentication certificates between P2P endpoints.", autoRemedy: "Rotates expired local client certificates automatically via central CA.", successRate: "100%" },
];

export default function OneSiteHealthPage() {
  const [selectedCat, setSelectedCat] = useState<string>("ALL");

  const filteredChecks = HEALTH_CHECKS.filter(
    (c) => selectedCat === "ALL" || c.category === selectedCat
  );

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-mono font-medium text-sky-400">
              <Zap className="h-3.5 w-3.5" />
              <span>Rust Shield OneSite Health</span>
            </div>

            <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--text)] leading-[1.12]">
              Continuous client health checks and automated self-healing.
            </h1>

            <p className="mt-6 text-lg text-[var(--text-2)] leading-relaxed font-sans">
              Prevent patch failures before they occur. OneSite Health continuously monitors 120+ endpoint health indicators, automatically restoring broken management services, corrupted system files, and security policy drift without human help desk tickets.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--accent)]/20 hover:opacity-90 transition-all"
              >
                <span>Request Health Demo</span>
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
        </div>
      </section>

      {/* 3 Pillars of Client Health */}
      <section className="py-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[var(--text)]">Proactive Failure Prevention</h3>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                Fixes broken components before patch deployment begins—ensuring your fleet achieves 99%+ compliance on day one instead of stalling at 75%.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
                <HardDrive className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[var(--text)]">Intelligent Disk Reclaim</h3>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                Cleans temporary deployment artifacts, expired crash dumps, and installer bloat to ensure machines have adequate storage for feature updates.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[var(--text)]">Zero-Touch Security Drift</h3>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                Ensures local security controls (BitLocker, Antivirus, Firewall, EDR agents) never fall out of compliance with CIS and NIST enterprise standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Directory of Built-In Health Checks */}
      <section className="py-20 border-b border-[var(--line)] bg-[var(--surface)]/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
                Library of Automated Remediations
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[var(--text)]">
                Sample Health Check & Auto-Remedy Protocols
              </h2>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              {["ALL", "Client Core", "Storage & Cache", "Security Posture", "Network & Certs"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors whitespace-nowrap ${
                    selectedCat === cat ? "bg-[var(--accent)] text-white" : "bg-[var(--sunk)] text-[var(--text-2)] hover:text-[var(--text)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredChecks.map((check) => (
              <div
                key={check.title}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-3 hover:border-[var(--accent)]/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase bg-[var(--sunk)] px-2.5 py-1 rounded text-[var(--text-3)] font-semibold">
                    {check.category}
                  </span>
                  <span className="text-xs font-mono text-emerald-500 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> {check.successRate} Auto-Resolved
                  </span>
                </div>

                <h4 className="font-semibold text-base text-[var(--text)]">{check.title}</h4>
                <p className="text-xs text-[var(--text-2)] leading-relaxed">{check.description}</p>

                <div className="pt-3 border-t border-[var(--line)]">
                  <div className="rounded-xl bg-[var(--sunk)] p-3 text-xs font-mono text-[var(--text-2)]">
                    <span className="text-[var(--accent)] font-semibold">Remediation Action:</span> {check.autoRemedy}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[var(--text)]">
            Achieve 99%+ compliance on day one
          </h2>
          <p className="text-base text-[var(--text-2)] max-w-2xl mx-auto">
            Contact our engineering team to run a health assessment across your endpoints.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/demo"
              className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Request Fleet Health Audit
            </Link>
            <Link
              href="/solutions/patch-management"
              className="rounded-xl border border-[var(--line)] bg-[var(--bg)] px-6 py-3.5 text-sm font-medium text-[var(--text)] hover:bg-[var(--sunk)] transition-colors"
            >
              Explore Patch Management
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

