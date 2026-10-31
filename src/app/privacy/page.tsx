"use client";

import React from "react";
import Link from "next/link";
import {
  Shield,
  Lock,
  FileCheck,
  CheckCircle2,
  Sliders,
  ExternalLink,
} from "lucide-react";

export default function PrivacyPage() {
  const triggerCookieSettings = () => {
    window.dispatchEvent(new Event("open-cookie-settings"));
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3.5 py-1 text-xs font-mono font-medium text-[var(--accent)]">
              <Lock className="h-3.5 w-3.5" />
              <span>Security & Data Governance</span>
            </div>

            <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--text)] leading-[1.12]">
              Enterprise Privacy & Data Protection Policy
            </h1>

            <p className="mt-6 text-lg text-[var(--text-2)] leading-relaxed font-sans">
              Last updated: January 2025 • Governing compliance across global enterprise deployments.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-4xl px-6 lg:px-12 space-y-12 text-sm leading-relaxed text-[var(--text-2)]">
          {/* Section 1 */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-medium text-[var(--text)]">1. Fundamental Security Commitments</h2>
            <p>
              Rust Shield is engineered specifically for regulated enterprises—including global financial institutions, healthcare health systems, and defense contractors. We believe security management software must never compromise privacy or exfiltrate customer business data.
            </p>
            <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--line)] space-y-2 font-mono text-xs">
              <div className="flex items-center gap-2 text-emerald-500 font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                <span>Zero File Content Inspection:</span>
              </div>
              <p className="text-[var(--text-3)] leading-relaxed">
                Rust Shield only inspects metadata necessary for patch orchestration (OS build numbers, application versions, SHA-256 binary hashes, and hardware health metrics). The platform never reads personal user documents, browsing histories, emails, or keystrokes.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-medium text-[var(--text)]">2. Peer-to-Peer Telemetry & Cryptographic Isolation</h2>
            <p>
              During P2P peer mesh distribution, chunk fragments are exchanged between local endpoints on your corporate network or VPN.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>All peer transmissions are encrypted with AES-256-GCM using mutual TLS (mTLS) with customer-controlled certificates.</li>
              <li>Data chunks consist strictly of vendor-signed binary software updates. No user data is ever transmitted over peer swarms.</li>
              <li>Payload chunks are validated using Merkle root checksums before execution to prevent man-in-the-middle tampering.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-medium text-[var(--text)]">3. Global Regulatory Compliance</h2>
            <p>
              Rust Shield complies with international data protection frameworks:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--line)] space-y-1">
                <h3 className="font-semibold text-xs text-[var(--text)] font-mono">GDPR & UK GDPR</h3>
                <p className="text-xs text-[var(--text-3)]">Role: Data Processor. All customer telemetry resides within designated sovereign regions.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--line)] space-y-1">
                <h3 className="font-semibold text-xs text-[var(--text)] font-mono">CCPA / CPRA</h3>
                <p className="text-xs text-[var(--text-3)]">We never sell, rent, or monetize customer or employee data.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--line)] space-y-1">
                <h3 className="font-semibold text-xs text-[var(--text)] font-mono">HIPAA & HITECH</h3>
                <p className="text-xs text-[var(--text-3)]">BAA contracts available. Zero PHI (Protected Health Information) processing.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--line)] space-y-1">
                <h3 className="font-semibold text-xs text-[var(--text)] font-mono">SOC 2 Type II Certified</h3>
                <p className="text-xs text-[var(--text-3)]">Audited annually across Security, Availability, and Confidentiality trust principles.</p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-medium text-[var(--text)]">4. Cookies & Website Analytics</h2>
            <p>
              Our public marketing website uses minimal cookies to remember theme preferences (dark/light mode) and anonymous aggregate traffic metrics. We do not engage in third-party behavioral ad tracking or retargeting pixels.
            </p>
            <div className="pt-2">
              <button
                onClick={triggerCookieSettings}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-xs font-semibold text-white hover:opacity-90 transition-opacity"
              >
                <Sliders className="h-3.5 w-3.5" />
                <span>Manage Cookie Preferences</span>
              </button>
            </div>
          </div>

          {/* Section 5 */}
          <div className="space-y-4 pt-4 border-t border-[var(--line)]">
            <h2 className="font-serif text-2xl font-medium text-[var(--text)]">5. Privacy Officer Contact</h2>
            <p>
              If you have any questions or require custom Data Protection Agreements (DPAs) or Standard Contractual Clauses (SCCs), contact our Data Protection Officer:
            </p>
            <p className="font-mono text-xs text-[var(--accent)]">
              dpo@rustshield.internal • Office of General Counsel • Seattle, WA
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

