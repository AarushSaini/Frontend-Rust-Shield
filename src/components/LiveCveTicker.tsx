"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Radio, ArrowRight } from "lucide-react";

const TICKER_MESSAGES = [
  { id: "1", type: "CRITICAL", text: "CVE-2026-3829 Chromium Zero-Day ingested · Auto-Canary Ring 0 Active (150 VMs)" },
  { id: "2", type: "MESH", text: "Subnet 10.14.88.0/24: 98.9% WAN offload achieved via encrypted local peer swarm" },
  { id: "3", type: "HEALING", text: "Self-Healing Engine: 18 hung Windows Update WUA daemons restored automatically" },
  { id: "4", type: "SECURITY", text: "Rust Kernel Runtime: 0 memory safety violations across 48,290 nodes in 24h" },
];

export default function LiveCveTicker() {
  const pathname = usePathname();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TICKER_MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  const currentMsg = TICKER_MESSAGES[currentIndex];

  return (
    <div className="w-full bg-[var(--surface)] border-b border-[var(--line)] py-1.5 px-4 text-xs font-mono">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full flex-shrink-0">
            <Radio className="h-3 w-3 animate-pulse" />
            Live Intel
          </span>

          <div className="flex items-center gap-2 truncate animate-in fade-in duration-300" key={currentMsg.id}>
            {currentMsg.type === "CRITICAL" ? (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-400 font-bold">
                0-DAY ALERT
              </span>
            ) : (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--accent)]/10 text-[var(--accent)] font-bold">
                {currentMsg.type}
              </span>
            )}
            <span className="text-[var(--text-2)] truncate text-[11px] sm:text-xs">
              {currentMsg.text}
            </span>
          </div>
        </div>

        <Link
          href="/dashboard"
          className="flex-shrink-0 flex items-center gap-1 text-[11px] text-[var(--accent)] hover:underline font-semibold"
        >
          <span className="hidden sm:inline">Inspect Console</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
