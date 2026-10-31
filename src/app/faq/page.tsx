"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, Search, ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
  category: "Architecture & Mesh" | "Security & Rust" | "Deployment & Rollback" | "Enterprise Compatibility";
}

const FAQ_ITEMS: FaqItem[] = [
  {
    category: "Architecture & Mesh",
    question: "How does Rust Shield's P2P swarming differ from Microsoft Delivery Optimization (DO) or BranchCache?",
    answer: "Unlike Microsoft DO or BranchCache—which frequently fail silently, consume uncontrolled disk cache, and only support Microsoft Store/OS updates—Rust Shield provides deterministic, byte-level swarming for 100% of your payloads (Windows, macOS, Linux, and 1,200+ 3rd-party apps). Rust Shield actively monitors round-trip times (RTT) at the microsecond level to yield bandwidth to user applications like Zoom and VoIP, achieving a measured 98.7% WAN offload compared to DO's typical 40-60%.",
  },
  {
    category: "Architecture & Mesh",
    question: "Do we need to open inbound firewall ports or reconfigure branch routers?",
    answer: "No. Rust Shield operates entirely within your existing network boundaries without requiring changes to firewall rules, routers, or switches. Endpoints communicate with peer nodes over mutual-TLS authenticated local sockets. If a machine moves to a public coffee shop Wi-Fi or home VPN, it dynamically transitions to direct, authenticated cloud egress without any user configuration.",
  },
  {
    category: "Security & Rust",
    question: "Why is the client agent written in Rust, and what are the security implications?",
    answer: "70% of historical zero-day vulnerabilities in endpoint management agents stem from memory bugs (buffer overflows, heap corruptions, race conditions) common in legacy C and C++ runtimes. Because an endpoint agent operates with SYSTEM or root privileges, any memory flaw can give attackers full host takeover. Rust's strict compile-time borrow checker guarantees memory safety and data-race prevention without garbage collection pauses, keeping the agent under 18 MB of RAM.",
  },
  {
    category: "Security & Rust",
    question: "How do you prevent malicious tampering or rogue peers from poisoning the peer mesh?",
    answer: "Every chunk fragment distributed across the peer mesh is verified against cryptographic SHA-256 Merkle root hashes embedded in digitally signed vendor manifests. Additionally, peer-to-peer transmissions are encrypted with AES-256-GCM using mutual TLS certificates. Any bit corruption or forged packet is instantly rejected and causes the node to request a clean fragment from an alternate verified peer.",
  },
  {
    category: "Deployment & Rollback",
    question: "How does the autonomous canary staging and rollback insurance work?",
    answer: "When a patch is approved for rollout, Rust Shield stages the deployment through progressive rings: Ring 0 (Canary Lab test VMs), Ring 1 (IT & Early Adopters), Ring 2 (General Corporate Fleet), and Ring 3 (Mission-Critical Servers). If real-time agent telemetry detects application crashes, BSODs, or service hangs exceeding your configured circuit-breaker threshold (e.g. 0.05%), the rollout is paused within seconds and affected nodes are automatically restored to their previous stable snapshot.",
  },
  {
    category: "Deployment & Rollback",
    question: "Can Rust Shield be deployed in classified or air-gapped networks?",
    answer: "Yes. Rust Shield features a dedicated air-gapped operational profile. You can import digitally signed package manifests and payload binaries via an approved secure media bridge. Once introduced into the isolated network, the local peer mesh autonomously distributes and installs updates across thousands of air-gapped hosts without any external Internet connection.",
  },
  {
    category: "Enterprise Compatibility",
    question: "Can Rust Shield co-exist with Microsoft Intune, SCCM (MECM), or Tanium?",
    answer: "Yes. Many customers run Rust Shield in tandem with Microsoft Intune or Tanium. Rust Shield supercharges Intune by handling large third-party binary distribution and bandwidth optimization, saving millions in cloud egress while automating third-party packaging that Intune cannot native manage. It also supports one-click migration from legacy SCCM distribution points.",
  },
  {
    category: "Enterprise Compatibility",
    question: "Which operating systems and device form factors are supported?",
    answer: "Rust Shield provides native 64-bit and ARM64 agents for Windows 10/11 (Enterprise, Pro, LTSC, IoT), Windows Server (2016 through 2025 Datacenter), macOS (Intel and Apple Silicon M1-M4), and major Linux enterprise distributions including Ubuntu LTS, Red Hat Enterprise Linux (RHEL 8/9), Rocky Linux, SUSE, and Debian.",
  },
];

export default function FaqPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCat, setSelectedCat] = useState("ALL");
  const [openIndices, setOpenIndices] = useState<number[]>([0, 2]);

  const toggleIndex = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCat === "ALL" || item.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3.5 py-1 text-xs font-mono font-medium text-[var(--accent)]">
              <HelpCircle className="h-3.5 w-3.5" />
              <span>Questions & Answers</span>
            </div>

            <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--text)] leading-[1.12]">
              Everything you need to know about Rust Shield.
            </h1>

            <p className="mt-6 text-lg text-[var(--text-2)] leading-relaxed font-sans">
              Detailed technical answers for security judges, enterprise architects, and CISOs evaluating our autonomous endpoint management architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Categories */}
      <section className="py-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-[var(--text-3)]" />
            <input
              type="text"
              placeholder="Search technical FAQ (e.g. P2P, RAM, rollback, air-gapped, Intune)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] pl-11 pr-4 py-3 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none shadow-sm"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2">
            {["ALL", "Architecture & Mesh", "Security & Rust", "Deployment & Rollback", "Enterprise Compatibility"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-colors whitespace-nowrap ${
                  selectedCat === cat
                    ? "bg-[var(--accent)] text-white shadow-sm"
                    : "bg-[var(--surface)] border border-[var(--line)] text-[var(--text-2)] hover:text-[var(--text)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="mt-8 space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndices.includes(idx);
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleIndex(idx)}
                    className="w-full flex items-center justify-between p-6 text-left gap-4"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[var(--accent)] font-semibold">
                        {faq.category}
                      </span>
                      <h3 className="font-serif text-lg font-medium text-[var(--text)]">{faq.question}</h3>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-[var(--text-3)] transition-transform flex-shrink-0 ${
                        isOpen ? "rotate-180 text-[var(--accent)]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-[var(--text-2)] leading-relaxed border-t border-[var(--line)]/50 pt-4 animate-in fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12 text-[var(--text-3)]">
                <p>No questions matched your search query. Contact our architects directly!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[var(--text)]">
            Have a question not covered here?
          </h2>
          <p className="text-base text-[var(--text-2)] max-w-2xl mx-auto">
            Our systems architecture team is available for direct technical deep dives.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Contact Our Systems Team
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl border border-[var(--line)] bg-[var(--bg)] px-6 py-3.5 text-sm font-medium text-[var(--text)] hover:bg-[var(--sunk)] transition-colors"
            >
              Explore Operations Console
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

