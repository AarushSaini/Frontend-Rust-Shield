"use client";

import React, { useState } from "react";

interface ContactFormProps {
  defaultTopic?: string;
}

export default function ContactForm({ defaultTopic = "Demo Request" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    workEmail: "",
    company: "",
    fleetSize: "5,000 - 25,000 endpoints",
    topic: defaultTopic,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 800);
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8 md:p-12 text-center shadow-xl animate-in zoom-in-95 duration-200">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-6 font-serif text-2xl font-medium text-[var(--text)]">Request Received</h3>
        <p className="mt-3 text-sm text-[var(--text-2)] max-w-md mx-auto leading-relaxed">
          Thank you, <span className="font-semibold text-[var(--text)]">{formData.firstName || "there"}</span>. Our systems engineering team has received your inquiry for{" "}
          <span className="font-semibold text-[var(--text)]">{formData.company || "your enterprise"}</span>.
        </p>

        <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--sunk)] p-4 max-w-sm mx-auto text-left text-xs space-y-1">
          <p className="font-mono text-[var(--text-3)] uppercase">Session Booking ID: #RS-{Math.floor(100000 + Math.random() * 900000)}</p>
          <p className="text-[var(--text-2)]"><strong className="text-[var(--text)]">Fleet Target:</strong> {formData.fleetSize}</p>
          <p className="text-[var(--text-2)]"><strong className="text-[var(--text)]">Contact:</strong> {formData.workEmail}</p>
        </div>

        <button
          onClick={() => {
            setFormData({
              firstName: "",
              lastName: "",
              workEmail: "",
              company: "",
              fleetSize: "5,000 - 25,000 endpoints",
              topic: defaultTopic,
              message: "",
            });
            setStatus("idle");
          }}
          className="mt-8 rounded-full border border-[var(--line)] px-6 py-2.5 text-xs font-medium text-[var(--text)] hover:bg-[var(--sunk)] transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8 md:p-10 shadow-xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-3)] mb-2">
            First Name *
          </label>
          <input
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="Ada"
            className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] placeholder-[var(--text-3)] focus:border-[var(--accent)] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-3)] mb-2">
            Last Name *
          </label>
          <input
            type="text"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="Lovelace"
            className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] placeholder-[var(--text-3)] focus:border-[var(--accent)] focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-3)] mb-2">
            Work Email *
          </label>
          <input
            type="email"
            required
            value={formData.workEmail}
            onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
            placeholder="ada@enterprise.com"
            className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] placeholder-[var(--text-3)] focus:border-[var(--accent)] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-3)] mb-2">
            Company Name *
          </label>
          <input
            type="text"
            required
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Acme Aerospace Corp"
            className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] placeholder-[var(--text-3)] focus:border-[var(--accent)] focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-3)] mb-2">
            Managed Endpoint Count
          </label>
          <select
            value={formData.fleetSize}
            onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
            className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none transition-colors cursor-pointer"
          >
            <option>Fewer than 1,000 devices</option>
            <option>1,000 - 5,000 endpoints</option>
            <option>5,000 - 25,000 endpoints</option>
            <option>25,000 - 100,000 endpoints</option>
            <option>100,000+ global fleet</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-3)] mb-2">
            Primary Area of Interest
          </label>
          <select
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none transition-colors cursor-pointer"
          >
            <option>Autonomous Patch Management</option>
            <option>OneSite Anywhere (P2P WAN Offload)</option>
            <option>OneSite Health (Self-Healing)</option>
            <option>Technical Demo & Architecture Review</option>
            <option>Pricing & Licensing</option>
            <option>Security Advisory & Compliance</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-3)] mb-2">
          Project Requirements or Infrastructure Notes
        </label>
        <textarea
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us about your current patch cycle times, VPN bottlenecks, or remote workforce challenges..."
          className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] placeholder-[var(--text-3)] focus:border-[var(--accent)] focus:outline-none transition-colors"
        />
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" required id="consent" className="h-4 w-4 accent-[var(--accent)] cursor-pointer" />
        <label htmlFor="consent" className="text-xs text-[var(--text-2)] cursor-pointer">
          I consent to Rust Shield processing my contact details in accordance with the Privacy Policy.
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-[var(--accent)] py-4 text-sm font-semibold text-[var(--accent-fg)] shadow-lg hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2"
      >
        {status === "submitting" ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span>Securing Channel...</span>
          </>
        ) : (
          <span>Connect with Enterprise Solutions Team →</span>
        )}
      </button>
    </form>
  );
}

