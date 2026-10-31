"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, CheckCircle2, ArrowRight } from "lucide-react";

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    company: "",
    fleetSize: "10,000 - 50,000",
    currentTool: "SCCM / MECM",
    date: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3.5 py-1 text-xs font-mono font-medium text-[var(--accent)]">
              <Calendar className="h-3.5 w-3.5" />
              <span>Schedule Architecture Demonstration</span>
            </div>

            <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--text)] leading-[1.12]">
              See Rust Shield live on your network profile.
            </h1>

            <p className="mt-6 text-lg text-[var(--text-2)] leading-relaxed font-sans">
              Schedule a private 30-minute demonstration with our senior systems architects. We will model your branch topology, demonstrate P2P bandwidth offload, and show how automated canary rings eliminate deployment downtime.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Layout */}
      <section className="py-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8 sm:p-10 shadow-xl">
                {submitted ? (
                  <div className="py-12 text-center space-y-4 animate-in fade-in">
                    <div className="h-16 w-16 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="font-serif text-2xl font-normal text-[var(--text)]">Demonstration Reserved!</h3>
                    <p className="text-sm text-[var(--text-2)] max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-[var(--text)]">{formData.fullName}</strong>. A calendar invite and custom fleet simulator link have been dispatched to <strong className="text-[var(--text)]">{formData.workEmail}</strong>.
                    </p>
                    <div className="pt-6">
                      <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-xs font-semibold text-white hover:opacity-90"
                      >
                        <span>Explore Operations Console in the Meantime</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="font-serif text-xl font-medium text-[var(--text)] mb-2">Request 1-on-1 Proof of Concept</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-[var(--text-3)] mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Dr. Jordan Hayes"
                          className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3.5 py-2.5 text-xs text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-[var(--text-3)] mb-1">Corporate Work Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.workEmail}
                          onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                          placeholder="j.hayes@enterprise.com"
                          className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3.5 py-2.5 text-xs text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-[var(--text-3)] mb-1">Company / Organization *</label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Global Aerospace Corp"
                          className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3.5 py-2.5 text-xs text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-[var(--text-3)] mb-1">Managed Endpoints Fleet *</label>
                        <select
                          value={formData.fleetSize}
                          onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
                          className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3.5 py-2.5 text-xs text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                        >
                          <option>1,000 - 5,000 endpoints</option>
                          <option>5,000 - 10,000 endpoints</option>
                          <option>10,000 - 50,000 endpoints</option>
                          <option>50,000 - 100,000+ endpoints</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[var(--text-3)] mb-1">Current Patch / Endpoint Tool</label>
                      <select
                        value={formData.currentTool}
                        onChange={(e) => setFormData({ ...formData, currentTool: e.target.value })}
                        className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3.5 py-2.5 text-xs text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                      >
                        <option>Microsoft SCCM / MECM</option>
                        <option>Microsoft Intune / Autopatch</option>
                        <option>WSUS (Standalone)</option>
                        <option>Tanium</option>
                        <option>HCL BigFix</option>
                        <option>ManageEngine / Ivanti / Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[var(--text-3)] mb-1">Specific Pain Points or Goals</label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="e.g. Saturated WAN pipes during Patch Tuesday, 20% patch failure rate, slow third-party app packaging..."
                        className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3.5 py-2.5 text-xs text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full rounded-xl bg-[var(--accent)] py-3 text-xs font-semibold text-white shadow-lg shadow-[var(--accent)]/20 hover:opacity-90 transition-opacity"
                      >
                        Confirm Technical Demonstration Request
                      </button>
                    </div>

                    <p className="text-[11px] text-[var(--text-3)] text-center pt-2">
                      Zero spam guarantee. Handled under strict NDA and enterprise privacy standards.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* What to expect card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8 space-y-5">
                <h3 className="font-serif text-xl font-medium text-[var(--text)]">What to Expect in Your Session</h3>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-[var(--text)]">Branch WAN Impact Simulation</h4>
                      <p className="text-[var(--text-3)] mt-0.5">We model your actual office bandwidth limits and demonstrate 98%+ traffic elimination using local P2P mesh swarms.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-[var(--text)]">Autonomous 3rd-Party Packaging</h4>
                      <p className="text-[var(--text-3)] mt-0.5">Watch how 1,200+ enterprise software titles are packaged, tested, and distributed without writing custom scripts.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-[var(--text)]">Canary Rings & Instant Rollback</h4>
                      <p className="text-[var(--text-3)] mt-0.5">Experience how automated circuit breakers halt deployments when crash rate anomalies are detected.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-[var(--text)]">Memory-Safe Agent Benchmark</h4>
                      <p className="text-[var(--text-3)] mt-0.5">Inspect our pure Rust binary consuming under 18 MB RAM with zero buffer overflow attack surface.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

