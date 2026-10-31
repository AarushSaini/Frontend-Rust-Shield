"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  CheckCircle2,
  Package,
  Search,
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  RotateCcw,
  Sliders,
  Terminal,
  ExternalLink,
} from "lucide-react";

interface SoftwarePackage {
  name: string;
  category: string;
  version: string;
  publisher: string;
  os: string;
  cveMitigations: number;
  autoPackaged: boolean;
}

const SAMPLE_CATALOG: SoftwarePackage[] = [
  { name: "Google Chrome Enterprise", category: "Web Browsers", version: "133.0.6943.98", publisher: "Google LLC", os: "Win / Mac / Linux", cveMitigations: 14, autoPackaged: true },
  { name: "Mozilla Firefox ESR", category: "Web Browsers", version: "128.7.0esr", publisher: "Mozilla", os: "Win / Mac / Linux", cveMitigations: 8, autoPackaged: true },
  { name: "Adobe Acrobat Reader DC", category: "Productivity", version: "2025.001.20142", publisher: "Adobe Inc.", os: "Windows / macOS", cveMitigations: 19, autoPackaged: true },
  { name: "Zoom Workplace Client", category: "Collaboration", version: "6.3.5.42119", publisher: "Zoom Video Comm.", os: "Win / Mac / Linux", cveMitigations: 6, autoPackaged: true },
  { name: "Slack Enterprise", category: "Collaboration", version: "4.41.98", publisher: "Salesforce / Slack", os: "Win / Mac / Linux", cveMitigations: 3, autoPackaged: true },
  { name: "Microsoft Visual Studio Code", category: "Developer Tools", version: "1.97.2", publisher: "Microsoft", os: "Win / Mac / Linux", cveMitigations: 5, autoPackaged: true },
  { name: "7-Zip Ultra Archiver", category: "Utilities", version: "24.09", publisher: "Igor Pavlov", os: "Windows", cveMitigations: 2, autoPackaged: true },
  { name: "Node.js LTS Runtime", category: "Developer Tools", version: "22.13.1", publisher: "OpenJS Foundation", os: "Win / Mac / Linux", cveMitigations: 4, autoPackaged: true },
];

export default function OneSitePatchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filtered = SAMPLE_CATALOG.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || app.publisher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3.5 py-1 text-xs font-mono font-medium text-[var(--accent)]">
              <Package className="h-3.5 w-3.5" />
              <span>Rust Shield OneSite Patch</span>
            </div>

            <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--text)] leading-[1.12]">
              Autonomous third-party application and OS patch automation.
            </h1>

            <p className="mt-6 text-lg text-[var(--text-2)] leading-relaxed font-sans">
              Stop hand-crafting deployment scripts and wrestling with vendor silent switches. OneSite Patch maintains an automated catalog of 1,200+ enterprise software titles, automatically packaged, tested, and distributed across multi-ring canary stages.
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
                <span>View CVE Threat Radar</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Capabilities Grid */}
      <section className="py-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
              Engineered for Autonomy
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[var(--text)]">
              Everything required to patch 1,200+ applications seamlessly
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                <Package className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[var(--text)]">1,200+ Pre-Tested Packages</h3>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                Every title is continuously monitored for new upstream releases, verified in an isolated sandbox, digitally signed, and delivered ready to deploy.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[var(--text)]">Automated Canary Staging</h3>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                Progressively roll out patches across customizable rings (Test Lab → IT Pilot → Broad Fleets → Critical Executive Servers) based on health telemetry.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
                <RotateCcw className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[var(--text)]">Circuit-Breaker Rollback</h3>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                If crash rates or BSOD metrics exceed your threshold in early rings, OneSite Patch automatically pauses the rollout and restores previous versions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Application Catalog Browser */}
      <section className="py-20 border-b border-[var(--line)] bg-[var(--surface)]/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
                Live Package Directory
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[var(--text)]">
                Browse Pre-Packaged Enterprise Titles
              </h2>
              <p className="mt-3 text-sm text-[var(--text-2)]">
                Explore a small subset of our 1,200+ continuously updated software catalog.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                1,248 Packages Live
              </span>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[var(--text-3)]" />
              <input
                type="text"
                placeholder="Search software catalog..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] pl-9 pr-4 py-2 text-xs text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {["ALL", "Web Browsers", "Productivity", "Collaboration", "Developer Tools", "Utilities"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors whitespace-nowrap ${
                    selectedCategory === cat ? "bg-[var(--accent)] text-white" : "bg-[var(--sunk)] text-[var(--text-2)] hover:text-[var(--text)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Catalog Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((app) => (
              <div
                key={app.name}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 hover:border-[var(--accent)]/50 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase bg-[var(--accent)]/10 text-[var(--accent)] px-2 py-0.5 rounded font-semibold">
                    {app.category}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-500 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Auto-Packaged
                  </span>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-[var(--text)] leading-snug">{app.name}</h4>
                  <p className="text-xs text-[var(--text-3)] mt-0.5">{app.publisher}</p>
                </div>

                <div className="pt-2 border-t border-[var(--line)] text-xs font-mono text-[var(--text-3)] space-y-1">
                  <div className="flex justify-between">
                    <span>Version:</span>
                    <span className="text-[var(--text)]">{app.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>OS Support:</span>
                    <span className="text-[var(--text)]">{app.os}</span>
                  </div>
                  <div className="flex justify-between text-emerald-500">
                    <span>CVE Mitigations:</span>
                    <span>{app.cveMitigations} Vulnerabilities</span>
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
            Automate your application patching today
          </h2>
          <p className="text-base text-[var(--text-2)] max-w-2xl mx-auto">
            Free your engineering teams from packaging scripts and manual deployment schedules.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/demo"
              className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Request 1-on-1 Demonstration
            </Link>
            <Link
              href="/products/onesite-anywhere"
              className="rounded-xl border border-[var(--line)] bg-[var(--bg)] px-6 py-3.5 text-sm font-medium text-[var(--text)] hover:bg-[var(--sunk)] transition-colors"
            >
              Explore OneSite Anywhere →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

