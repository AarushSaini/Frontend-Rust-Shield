"use client";

import React from "react";
import ContactForm from "@/components/ContactForm";
import { Mail, MapPin, Key } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3.5 py-1 text-xs font-mono font-medium text-[var(--accent)]">
              <Mail className="h-3.5 w-3.5" />
              <span>Get in Touch</span>
            </div>

            <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--text)] leading-[1.12]">
              Let&apos;s talk about securing your endpoint fleet.
            </h1>

            <p className="mt-6 text-lg text-[var(--text-2)] leading-relaxed font-sans">
              Whether you are looking to decommission branch distribution servers, schedule a 1-on-1 architecture review, or coordinate an emergency zero-day patch pilot, our engineering team is here.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Form + Office Locations */}
      <section className="py-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8 sm:p-10 shadow-xl">
                <h2 className="font-serif text-2xl font-medium text-[var(--text)] mb-2">Send an Enterprise Inquiry</h2>
                <p className="text-xs text-[var(--text-3)] mb-8">
                  Fill in your details below. An enterprise systems architect will respond within 4 business hours.
                </p>
                <ContactForm />
              </div>
            </div>

            {/* Sidebar Column: Office Locations & Security PGP */}
            <div className="lg:col-span-5 space-y-6">
              {/* Global Offices Card */}
              <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 space-y-6">
                <h3 className="font-serif text-xl font-medium text-[var(--text)]">Global Engineering Hubs</h3>

                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-2xl bg-[var(--sunk)] border border-[var(--line)] space-y-1">
                    <div className="flex items-center gap-2 text-[var(--accent)] font-mono font-semibold">
                      <MapPin className="h-4 w-4" />
                      <span>Seattle, Washington (Headquarters)</span>
                    </div>
                    <p className="text-[var(--text-2)]">1201 Third Avenue, Suite 2900</p>
                    <p className="text-[var(--text-3)] font-mono">Seattle, WA 98101, USA</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[var(--sunk)] border border-[var(--line)] space-y-1">
                    <div className="flex items-center gap-2 text-emerald-500 font-mono font-semibold">
                      <MapPin className="h-4 w-4" />
                      <span>London, United Kingdom (EMEA Hub)</span>
                    </div>
                    <p className="text-[var(--text-2)]">100 Bishopsgate, Level 18</p>
                    <p className="text-[var(--text-3)] font-mono">London EC2N 4AG, United Kingdom</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[var(--sunk)] border border-[var(--line)] space-y-1">
                    <div className="flex items-center gap-2 text-sky-500 font-mono font-semibold">
                      <MapPin className="h-4 w-4" />
                      <span>Zurich, Switzerland (Research Center)</span>
                    </div>
                    <p className="text-[var(--text-2)]">Gotthardstrasse 26</p>
                    <p className="text-[var(--text-3)] font-mono">8002 Zürich, Switzerland</p>
                  </div>
                </div>
              </div>

              {/* Responsible Vulnerability Disclosure */}
              <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-2 text-[var(--text)] font-semibold text-sm">
                  <Key className="h-4 w-4 text-[var(--accent)]" />
                  <span>Encrypted Vulnerability Disclosures</span>
                </div>
                <p className="text-xs text-[var(--text-3)] leading-relaxed">
                  We welcome responsible security research. For encrypted disclosures regarding our runtime, P2P protocol, or backend, please encrypt with our public PGP key:
                </p>
                <div className="p-3 rounded-xl bg-[var(--sunk)] border border-[var(--line)] font-mono text-[10px] text-[var(--text-2)] break-all select-all">
                  PGP Fingerprint: 4E91 B28D 994A F8C1 3320 70A9 E2B4 D001
                </div>
                <p className="text-[11px] font-mono text-[var(--accent)]">security@rustshield.internal</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

