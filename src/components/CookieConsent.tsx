"use client";

import React, { useState, useEffect } from "react";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true & disabled
    functional: true,
    analytics: false,
    marketing: false,
  });

  // BUG-01 FIX: Split into two effects so the event listener ALWAYS registers,
  // even if the user has already accepted cookies.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rustshield-cookie-choice");
      if (!saved) {
        const timer = setTimeout(() => setOpen(true), 1000);
        return () => clearTimeout(timer);
      }
    } catch {
      // Fallback: show banner if localStorage is unavailable
      setTimeout(() => setOpen(true), 1000);
    }
  }, []);

  useEffect(() => {
    const handleOpenModal = () => {
      setShowManage(true);
      setOpen(true);
    };
    window.addEventListener("open-cookie-settings", handleOpenModal);
    return () => window.removeEventListener("open-cookie-settings", handleOpenModal);
  }, []);

  const saveChoice = (choice: "all" | "essential" | "custom") => {
    try {
      let finalPrefs = { ...preferences };
      if (choice === "all") {
        finalPrefs = { essential: true, functional: true, analytics: true, marketing: true };
      } else if (choice === "essential") {
        finalPrefs = { essential: true, functional: false, analytics: false, marketing: false };
      }
      localStorage.setItem("rustshield-cookie-choice", JSON.stringify(finalPrefs));
    } catch {}
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md w-[calc(100vw-2.5rem)] rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-2xl backdrop-blur-lg animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="font-serif text-lg font-medium text-[var(--text)]">Cookie & Privacy Choices</span>
        </div>
        <button
          onClick={() => saveChoice("essential")}
          className="text-[var(--text-3)] hover:text-[var(--text)] transition-colors text-sm"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <p className="mt-3 text-sm text-[var(--text-2)] leading-relaxed">
        Rust Shield uses essential cookies to ensure secure peer-to-peer distribution and telemetry authentication.
        We also use optional analytics to refine our vulnerability intelligence workflows.
      </p>

      {showManage && (
        <div className="mt-4 space-y-3 rounded-xl border border-[var(--line)] bg-[var(--sunk)] p-4 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-[var(--text)]">Essential System Cookies</p>
              <p className="text-[var(--text-3)]">Security validation, peer encryption keys, session routing.</p>
            </div>
            <span className="text-[10px] font-mono uppercase bg-[var(--accent)]/10 text-[var(--accent)] px-2 py-0.5 rounded">Always Active</span>
          </div>

          <div className="flex items-center justify-between border-t border-[var(--line)]/50 pt-2.5">
            <div>
              <p className="font-semibold text-[var(--text)]">Analytics & Telemetry</p>
              <p className="text-[var(--text-3)]">Aggregated dashboard load speeds and threat response telemetry.</p>
            </div>
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={(e) => setPreferences((p) => ({ ...p, analytics: e.target.checked }))}
              className="h-4 w-4 accent-[var(--accent)] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between border-t border-[var(--line)]/50 pt-2.5">
            <div>
              <p className="font-semibold text-[var(--text)]">Enterprise Marketing</p>
              <p className="text-[var(--text-3)]">Relevant patch advisories and security benchmark updates.</p>
            </div>
            <input
              type="checkbox"
              checked={preferences.marketing}
              onChange={(e) => setPreferences((p) => ({ ...p, marketing: e.target.checked }))}
              className="h-4 w-4 accent-[var(--accent)] cursor-pointer"
            />
          </div>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button
          onClick={() => saveChoice("all")}
          className="rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-[var(--accent-fg)] hover:opacity-95 active:scale-95 transition-all shadow-sm"
        >
          Accept All
        </button>

        <button
          onClick={() => saveChoice("essential")}
          className="rounded-full border border-[var(--line)] bg-transparent px-3.5 py-2 text-xs font-medium text-[var(--text)] hover:bg-[var(--sunk)] active:scale-95 transition-all"
        >
          Essential Only
        </button>

        <button
          onClick={() => {
            if (showManage) {
              saveChoice("custom");
            } else {
              setShowManage(true);
            }
          }}
          className="ml-auto text-xs font-medium text-[var(--text-2)] hover:text-[var(--text)] underline underline-offset-4"
        >
          {showManage ? "Save Custom" : "Preferences"}
        </button>
      </div>
    </div>
  );
}

