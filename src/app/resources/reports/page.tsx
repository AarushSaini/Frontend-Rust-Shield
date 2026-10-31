"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileBarChart,
  Download,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Lock,
  ExternalLink,
  Shield,
  FileCheck,
} from "lucide-react";

interface Report {
  id: string;
  title: string;
  category: "Analyst Report" | "Whitepaper" | "Security Benchmark" | "Architecture Guide";
  pages: string;
  published: string;
  author: string;
  abstract: string;
  keyTakeaways: string[];
}

const REPORTS: Report[] = [
  {
    id: "state-of-patching-2025",
    title: "The 2025 State of Autonomous Patch Management & Zero-Day Exposure",
    category: "Analyst Report",
    pages: "38 Pages (PDF)",
    published: "January 2025",
    author: "Rust Shield Cyber Research Group",
    abstract: "An exhaustive field study of 1.2 million enterprise endpoints across North America and Europe, analyzing real-world patch failure causes, WAN saturation patterns, and the emergence of autonomous self-healing.",
    keyTakeaways: [
      "22.4% of endpoints fail to patch on first pass due to broken local WMI or WUA services",
      "Traditional client-server distribution causes an average of 4.2 hours of branch WAN degradation during Patch Tuesday",
      "Enterprises employing canary-based P2P peer swarms remediate zero-days 88% faster than traditional WSUS/SCCM shops",
    ],
  },
  {
    id: "p2p-mesh-guide",
    title: "Eliminating Branch Server Sprawl: The Enterprise P2P Architecture Blueprint",
    category: "Architecture Guide",
    pages: "24 Pages (PDF)",
    published: "Q4 2024",
    author: "Systems Engineering Guild",
    abstract: "A technical reference architecture explaining how modern peer-to-peer protocols achieve 99% WAN offload without multicast, broadcast storms, or user disruption.",
    keyTakeaways: [
      "Mathematical proof of logarithmic peer propagation across 10,000+ node subnets",
      "Dynamic seed election algorithms designed for hybrid laptops and mobile workforces",
      "Byte-level differential binary compression benchmarks across Windows 11 and Ubuntu LTSC",
    ],
  },
  {
    id: "rust-memory-safety",
    title: "Memory Safety at the Edge: Why We Wrote Rust Shield from Scratch in Rust",
    category: "Whitepaper",
    pages: "18 Pages (PDF)",
    published: "November 2024",
    author: "Chief Security Architect",
    abstract: "According to Microsoft and CISA, 70% of historical zero-day vulnerabilities stem from memory management flaws in C/C++ agents. This whitepaper explains our zero-compromise approach to endpoint agent design.",
    keyTakeaways: [
      "Complete elimination of buffer overflows, use-after-free, and data races in the kernel hooks",
      "Agent memory footprint verified under 18 MB RAM under full gigabit mesh saturation",
      "Formal verification and borrow-checker guarantees during high-concurrency P2P packet parsing",
    ],
  },
  {
    id: "cis-stig-compliance",
    title: "Continuous CIS Benchmark & DISA STIG Alignment with Autonomous Remediation",
    category: "Security Benchmark",
    pages: "32 Pages (PDF)",
    published: "December 2024",
    author: "Compliance Operations",
    abstract: "How to maintain 99.8%+ audit readiness without weekly manual PowerShell scans or ticketing delays.",
    keyTakeaways: [
      "Automated continuous compliance mapping to NIST SP 800-53, SOC 2 Type II, and ISO 27001",
      "Automated remediation scripts for BitLocker, Windows Defender, AppLocker, and SSH configurations",
      "Immutable cryptographic audit trails verified for government and financial regulators",
    ],
  },
];

export default function ReportsPage() {
  const [downloadModalReport, setDownloadModalReport] = useState<Report | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      setDownloadModalReport(null);
      setEmailInput("");
    }, 2000);
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3.5 py-1 text-xs font-mono font-medium text-[var(--accent)]">
              <FileBarChart className="h-3.5 w-3.5" />
              <span>Analyst Research & Whitepapers</span>
            </div>

            <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--text)] leading-[1.12]">
              Research, benchmarks, and architectural blueprints.
            </h1>

            <p className="mt-6 text-lg text-[var(--text-2)] leading-relaxed font-sans">
              Access peer-reviewed research, industry telemetry, and architectural blueprints written by our cybersecurity research engineers and independent analysts.
            </p>
          </div>
        </div>
      </section>

      {/* Reports Grid */}
      <section className="py-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {REPORTS.map((report) => (
              <div
                key={report.id}
                className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8 flex flex-col justify-between hover:border-[var(--accent)]/50 transition-all space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase bg-[var(--accent)]/10 text-[var(--accent)] px-2.5 py-0.5 rounded font-semibold">
                      {report.category}
                    </span>
                    <span className="text-xs font-mono text-[var(--text-3)]">{report.pages} • {report.published}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[var(--text)] leading-snug">
                    {report.title}
                  </h3>

                  <p className="text-xs text-[var(--text-2)] leading-relaxed">{report.abstract}</p>

                  <div className="pt-2 border-t border-[var(--line)] space-y-2">
                    <p className="text-xs font-mono font-semibold uppercase text-[var(--text)]">Key Research Findings:</p>
                    <ul className="space-y-1.5 text-xs text-[var(--text-2)]">
                      {report.keyTakeaways.map((takeaway, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between">
                  <span className="text-xs text-[var(--text-3)] font-mono">{report.author}</span>
                  <button
                    onClick={() => setDownloadModalReport(report)}
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white hover:opacity-90 transition-opacity"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download Report</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Modal */}
      {downloadModalReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
              <h3 className="font-serif text-base font-medium text-[var(--text)]">Download Enterprise Report</h3>
              <button onClick={() => setDownloadModalReport(null)} className="text-[var(--text-3)] hover:text-[var(--text)]">✕</button>
            </div>

            <p className="text-xs text-[var(--text-2)] font-medium">{downloadModalReport.title}</p>

            {downloadSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                <CheckCircle2 className="h-6 w-6 text-emerald-500 mx-auto" />
                <p className="text-xs font-mono font-bold text-emerald-400">PDF Download Link Dispatched!</p>
                <p className="text-[11px] text-[var(--text-3)]">The report has been queued for delivery to your inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleDownload} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-[var(--text-3)] mb-1">Corporate Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-xs text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setDownloadModalReport(null)}
                    className="px-3.5 py-2 rounded-xl border border-[var(--line)] text-xs text-[var(--text-2)]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-xs font-semibold hover:opacity-90"
                  >
                    Confirm & Download PDF
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

