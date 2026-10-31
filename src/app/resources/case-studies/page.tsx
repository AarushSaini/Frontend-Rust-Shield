"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Building2,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Filter,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: "Financial Services" | "Healthcare" | "Defense & Aerospace" | "Global Retail";
  endpoints: string;
  headlineMetric: string;
  metricLabel: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "global-bank",
    title: "Tier-1 Global Bank Decommissions 1,400 Distribution Servers & Reaches 99.6% Patch Compliance",
    client: "Global Financial Institution",
    industry: "Financial Services",
    endpoints: "185,000 Nodes",
    headlineMetric: "1,400",
    metricLabel: "Remote Servers Decommissioned",
    summary: "Operating branches across 42 countries, the bank struggled with recurring WAN bottlenecks during Patch Tuesdays. Rust Shield replaced their sprawling server architecture with a self-healing P2P peer mesh.",
    challenge: "The bank spent over $6.2M annually maintaining physical distribution points at remote branches. Emergency zero-day patches frequently took over 30 days to reach 80% coverage.",
    solution: "Deployed Rust Shield OneSite Anywhere and OneSite Patch. Endpoints now swarm encrypted payloads locally, cutting WAN ingress by 99% while automating multi-ring canary deployments.",
    results: [
      "99.6% compliance achieved within 48 hours of advisory publication",
      "Saved $5.8M annually in hardware refresh and branch maintenance costs",
      "Passed global SWIFT and SOC 2 Type II audits with zero unpatched critical CVEs",
    ],
  },
  {
    id: "health-system",
    title: "Regional Healthcare Network Protects 34,000 Clinical Workstations with Zero Downtime",
    client: "University Health System",
    industry: "Healthcare",
    endpoints: "34,000 Nodes",
    headlineMetric: "99.8%",
    metricLabel: "First-Pass Patch Success",
    summary: "Clinical workstations in operating rooms and emergency departments could not tolerate unexpected reboots or system instability. Rust Shield automated health checks and rollback insurance.",
    challenge: "A previous vendor update caused widespread blue screens across nursing carts. The hospital needed guarantees that patches would never disrupt patient care.",
    solution: "OneSite Health continuously validated WMI, BitLocker, and disk health, while Canary Rollout Rings monitored real-time crash rates before advancing patches to clinical machines.",
    results: [
      "Zero clinical workstation disruption across 3 consecutive years",
      "Mean time to patch zero-day vulnerabilities dropped from 24 days to 45 minutes",
      "100% HIPAA and HITRUST compliance reporting automation",
    ],
  },
  {
    id: "defense-contractor",
    title: "Aerospace & Defense Contractor Meets Strict CMMC Level 3 Mandates with Air-Gapped Peer Swarming",
    client: "Aerospace Defense Contractor",
    industry: "Defense & Aerospace",
    endpoints: "62,000 Nodes",
    headlineMetric: "14 Min",
    metricLabel: "Zero-Day Response Window",
    summary: "Contracting with the DoD required strict compliance with NIST SP 800-171 and CMMC Level 3 across classified, air-gapped test environments and global engineering offices.",
    challenge: "Air-gapped research facilities had no direct Internet access. Software updates had to be physically transported and manually distributed machine-by-machine.",
    solution: "Rust Shield was installed in offline air-gapped mode. A single signed package ingested into the environment was automatically distributed across 5,000 lab endpoints in minutes via local P2P mesh.",
    results: [
      "100% adherence to CMMC Level 3 and DISA STIG security baselines",
      "Eliminated 18,000 hours of manual sysadmin installation labor",
      "Memory-safe Rust architecture audited and certified by independent DoD assessors",
    ],
  },
  {
    id: "retail-chain",
    title: "International Retailer Keeps 45,000 POS Registers Patched Without Store WAN Disruption",
    client: "Global Retail Corporation",
    industry: "Global Retail",
    endpoints: "45,000 Nodes",
    headlineMetric: "98.9%",
    metricLabel: "WAN Traffic Offloaded",
    summary: "Retail stores relied on thin, low-cost cellular and broadband connections. Heavy update downloads routinely choked checkout registers and customer Wi-Fi.",
    challenge: "Patching Point-of-Sale (POS) terminals caused transaction timeouts during peak holiday sales.",
    solution: "Rust Shield OneSite Anywhere throttled transfers based on microsecond RTT monitoring, yielding 100% of bandwidth to card processing while updating registers overnight via peer mesh.",
    results: [
      "Zero store transaction latency during active patch deployment windows",
      "Saved $1.4M annually on cellular WAN data overage fees",
      "Maintained 100% PCI-DSS 4.0 compliance across 3,200 retail store locations",
    ],
  },
];

export default function CaseStudiesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("ALL");
  const [expandedId, setExpandedId] = useState<string | null>("global-bank");

  const filtered = CASE_STUDIES.filter(
    (cs) => selectedIndustry === "ALL" || cs.industry === selectedIndustry
  );

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3.5 py-1 text-xs font-mono font-medium text-[var(--accent)]">
              <FileText className="h-3.5 w-3.5" />
              <span>Customer Success Proof</span>
            </div>

            <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--text)] leading-[1.12]">
              Proven at scale in the world&apos;s most demanding environments.
            </h1>

            <p className="mt-6 text-lg text-[var(--text-2)] leading-relaxed font-sans">
              Discover how Fortune 500 enterprises, healthcare networks, and defense organizations replaced legacy distribution servers, cut millions in WAN costs, and reached 99%+ compliance with Rust Shield.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Case Studies List */}
      <section className="py-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {/* Industry Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4">
            {["ALL", "Financial Services", "Healthcare", "Defense & Aerospace", "Global Retail"].map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-colors whitespace-nowrap ${
                  selectedIndustry === ind
                    ? "bg-[var(--accent)] text-white shadow-sm"
                    : "bg-[var(--surface)] border border-[var(--line)] text-[var(--text-2)] hover:text-[var(--text)]"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="mt-8 space-y-6">
            {filtered.map((cs) => {
              const isExpanded = expandedId === cs.id;
              return (
                <div
                  key={cs.id}
                  className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 transition-all hover:border-[var(--accent)]/50"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono uppercase bg-[var(--accent)]/10 text-[var(--accent)] px-2.5 py-0.5 rounded font-semibold">
                          {cs.industry}
                        </span>
                        <span className="text-xs font-mono text-[var(--text-3)]">{cs.endpoints}</span>
                      </div>

                      <h3 className="font-serif text-2xl font-normal text-[var(--text)]">{cs.title}</h3>
                      <p className="text-sm text-[var(--text-2)] leading-relaxed">{cs.summary}</p>
                    </div>

                    {/* Metric pill */}
                    <div className="flex-shrink-0 rounded-2xl bg-[var(--sunk)] border border-[var(--line)] p-5 text-center min-w-[200px]">
                      <div className="font-serif text-4xl font-normal text-emerald-500">{cs.headlineMetric}</div>
                      <div className="text-xs font-mono text-[var(--text-3)] mt-1">{cs.metricLabel}</div>
                    </div>
                  </div>

                  {/* Expand/Collapse Accordion Details */}
                  {isExpanded && (
                    <div className="mt-8 pt-6 border-t border-[var(--line)] space-y-6 animate-in fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <h4 className="font-mono text-xs font-bold uppercase text-rose-400">The Challenge</h4>
                          <p className="text-xs text-[var(--text-2)] leading-relaxed">{cs.challenge}</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-mono text-xs font-bold uppercase text-[var(--accent)]">The Solution</h4>
                          <p className="text-xs text-[var(--text-2)] leading-relaxed">{cs.solution}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-mono text-xs font-bold uppercase text-emerald-500">Audited Business Results</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {cs.results.map((res, i) => (
                            <div key={i} className="p-3.5 rounded-xl bg-[var(--sunk)] border border-[var(--line)] text-xs text-[var(--text-2)] flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span>{res}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : cs.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent)] font-semibold hover:underline"
                    >
                      <span>{isExpanded ? "Collapse Details" : "Read Full Story & Outcomes"}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[var(--text)]">
            Achieve similar outcomes for your enterprise
          </h2>
          <p className="text-base text-[var(--text-2)] max-w-2xl mx-auto">
            Speak with an enterprise architect to evaluate your infrastructure savings.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/demo"
              className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Request Custom ROI Analysis
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl border border-[var(--line)] bg-[var(--bg)] px-6 py-3.5 text-sm font-medium text-[var(--text)] hover:bg-[var(--sunk)] transition-colors"
            >
              Test Drive Operations Console
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

