"use client";

import React, { useState } from "react";
import Link from "next/link";
import LiveTelemetryTerminal from "@/components/LiveTelemetryTerminal";
import {
  Activity,
  Cpu,
  Zap,
  Server,
  Shield,
  Search,
  CheckCircle2,
  RefreshCw,
  Terminal,
  ArrowRight,
  Sparkles,
  Layers,
  Network,
  Clock,
} from "lucide-react";

export default function AutonomousEndpointManagementPage() {
  const [queryInput, setQueryInput] = useState("SELECT hostname, os_version, bitlocker_status WHERE encryption != 'XTS-AES-256'");
  const [queryRunning, setQueryRunning] = useState(false);
  const [queryResults, setQueryResults] = useState<null | { duration: string; totalNodes: number; matches: number }>(null);

  const handleSimulateQuery = () => {
    setQueryRunning(true);
    setTimeout(() => {
      setQueryResults({
        duration: "1.42s",
        totalNodes: 48290,
        matches: 3,
      });
      setQueryRunning(false);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3.5 py-1 text-xs font-mono font-medium text-[var(--accent)]">
              <Zap className="h-3.5 w-3.5" />
              <span>Next-Gen Autonomous Endpoint Management</span>
            </div>

            <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--text)] leading-[1.12]">
              Real-time endpoint awareness. Sub-second queries. Autonomous self-healing.
            </h1>

            <p className="mt-6 text-lg text-[var(--text-2)] leading-relaxed font-sans">
              Traditional endpoint tools rely on daily database scans that are out-of-date before they finish. Rust Shield gives SecOps sub-second visibility into every machine across your enterprise with continuous self-healing that fixes broken configurations before tickets are filed.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--accent)]/20 hover:opacity-90 transition-all"
              >
                <span>Book Autonomous AEM Demo</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-6 py-3.5 text-sm font-medium text-[var(--text)] hover:bg-[var(--sunk)] transition-colors"
              >
                <span>Live Operations Center</span>
              </Link>
            </div>
          </div>

          {/* Core Pillars Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[var(--text)]">Sub-Second Fleet Queries</h3>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                Query 50,000+ distributed endpoints in under two seconds. Instant answers on file hashes, running processes, registry keys, and vulnerability states.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
                <RefreshCw className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[var(--text)]">Continuous Client Health</h3>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                Automatically detects and heals corrupted WMI repositories, broken Windows Update agents, expired TLS certificates, and fragmented cache directories.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[var(--text)]">100% Rust Memory Safety</h3>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                The lightweight agent operates in userspace with strict bounds checking. Zero memory safety vulnerabilities, zero thread panics, and under 20MB of RAM.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Sub-Second Query Engine Simulator */}
      <section className="py-20 border-b border-[var(--line)] bg-[var(--surface)]/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
              Live Interactive Simulator
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[var(--text)]">
              Ask any question across 50,000 machines in real time
            </h2>
            <p className="mt-4 text-sm text-[var(--text-2)] leading-relaxed">
              No stale database queries. Rust Shield broadcasts signed queries across the local peer swarm and aggregates results instantaneously.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-3)]">
                <Terminal className="h-4 w-4 text-[var(--accent)]" />
                <span>Rust Shield Sub-Second Fleet Query Console</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                Live Mesh Connected (48,290 Nodes)
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-xs font-mono text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                />
              </div>
              <button
                onClick={handleSimulateQuery}
                disabled={queryRunning}
                className="px-6 py-3 rounded-xl bg-[var(--accent)] text-white text-xs font-mono font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {queryRunning ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>Broadcasting...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-3.5 w-3.5" />
                    <span>Execute Fleet Query</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Sample Queries */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="text-[var(--text-3)] font-mono text-[11px]">Quick Queries:</span>
              <button
                onClick={() => setQueryInput("SELECT hostname, version WHERE app = 'Google Chrome' AND version < '133.0.6943'")}
                className="px-2.5 py-1 rounded-lg bg-[var(--sunk)] border border-[var(--line)] font-mono text-[11px] text-[var(--text-2)] hover:text-[var(--text)]"
              >
                Chrome Zero-Day Exposure
              </button>
              <button
                onClick={() => setQueryInput("SELECT hostname, status WHERE service = 'wuauserv' AND status != 'RUNNING'")}
                className="px-2.5 py-1 rounded-lg bg-[var(--sunk)] border border-[var(--line)] font-mono text-[11px] text-[var(--text-2)] hover:text-[var(--text)]"
              >
                Broken Windows Update Services
              </button>
              <button
                onClick={() => setQueryInput("SELECT hostname, memory_free_mb WHERE memory_free_mb < 1024")}
                className="px-2.5 py-1 rounded-lg bg-[var(--sunk)] border border-[var(--line)] font-mono text-[11px] text-[var(--text-2)] hover:text-[var(--text)]"
              >
                Low Memory Endpoints
              </button>
            </div>

            {/* Simulated Query Response */}
            {queryResults && (
              <div className="mt-4 p-4 rounded-xl bg-[var(--sunk)] border border-[var(--line)] space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-500 font-semibold">
                    ✓ Query completed across {queryResults.totalNodes.toLocaleString()} endpoints in {queryResults.duration}
                  </span>
                  <span className="text-[var(--text-3)]">{queryResults.matches} non-compliant endpoints detected</span>
                </div>
                <div className="divide-y divide-[var(--line)] text-xs font-mono">
                  <div className="py-2 flex justify-between items-center">
                    <div>
                      <span className="text-[var(--accent)]">BERLIN-UBUNTU-K8S-04</span> (10.22.104.14) • Unencrypted swap partition
                    </div>
                    <Link href="/dashboard" className="text-[11px] text-[var(--accent)] hover:underline">
                      Auto-Remediate →
                    </Link>
                  </div>
                  <div className="py-2 flex justify-between items-center">
                    <div>
                      <span className="text-[var(--accent)]">HEALTH-CLINIC-W10-18</span> (10.40.16.82) • BitLocker encryption algorithm: AES-128
                    </div>
                    <Link href="/dashboard" className="text-[11px] text-[var(--accent)] hover:underline">
                      Auto-Remediate →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Live Telemetry Terminal */}
          <div className="mt-8">
            <LiveTelemetryTerminal />
          </div>
        </div>
      </section>

      {/* Autonomous Health Healing Architecture */}
      <section className="py-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
                Autonomous Self-Healing
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[var(--text)]">
                Stop chasing broken clients. Let Rust Shield heal them automatically.
              </h2>
              <p className="text-sm text-[var(--text-2)] leading-relaxed">
                In most enterprises, 15% to 25% of endpoints have silently broken management agents, corrupt WMI databases, or disabled update daemons. IT teams waste hundreds of hours manually diagnosing them.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text)]">Automated WMI & Service Restoration</h4>
                    <p className="text-xs text-[var(--text-3)] mt-0.5">Detects hung background services and cleanly re-registers COM components without rebooting the user.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text)]">Cache & Disk Space Reclaim</h4>
                    <p className="text-xs text-[var(--text-3)] mt-0.5">Clears clogged Windows update caches and temp installer directories before patch installations fail.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text)]">Continuous CIS Security Drift Repair</h4>
                    <p className="text-xs text-[var(--text-3)] mt-0.5">Re-enforces firewall rules, disabled guest accounts, and audit logging settings every 15 minutes.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                <h3 className="font-serif text-base font-medium text-[var(--text)]">Self-Healing Automation Metrics</h3>
                <span className="text-xs font-mono text-emerald-500">Fleet-Wide Active</span>
              </div>
              <div className="space-y-4 text-xs font-mono">
                <div className="p-3 rounded-xl bg-[var(--sunk)] border border-[var(--line)]">
                  <div className="flex justify-between text-[var(--text-3)]">
                    <span>Windows Update Agent Heals:</span>
                    <span className="text-[var(--text)] font-bold">1,842 instances</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full bg-[var(--line)] rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: "94%" }}></div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[var(--sunk)] border border-[var(--line)]">
                  <div className="flex justify-between text-[var(--text-3)]">
                    <span>BitLocker / TPM Key Validation:</span>
                    <span className="text-[var(--text)] font-bold">48,287 / 48,290 verified</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full bg-[var(--line)] rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500" style={{ width: "99.9%" }}></div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[var(--sunk)] border border-[var(--line)]">
                  <div className="flex justify-between text-[var(--text-3)]">
                    <span>Disk Space Reclaimed:</span>
                    <span className="text-[var(--text)] font-bold">4.2 TB reclaimed</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full bg-[var(--line)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--accent)]" style={{ width: "88%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[var(--text)]">
            Experience autonomous endpoint governance today
          </h2>
          <p className="text-base text-[var(--text-2)] max-w-2xl mx-auto">
            See how Rust Shield transforms chaotic endpoint estates into self-healing, zero-vulnerability fleets.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/demo"
              className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Request Technical Demonstration
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

