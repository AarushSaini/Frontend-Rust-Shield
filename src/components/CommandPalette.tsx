"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Command,
  Shield,
  Activity,
  Layers,
  Zap,
  Server,
  Flame,
  FileText,
  DollarSign,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

interface CommandItem {
  id: string;
  category: "Navigation" | "Solutions & Products" | "Operations Actions" | "Security CVEs";
  title: string;
  subtitle?: string;
  action: () => void;
  icon: React.ReactNode;
}

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const COMMANDS: CommandItem[] = [
    {
      id: "dashboard",
      category: "Navigation",
      title: "Launch Live Operations Console",
      subtitle: "Full fleet management, canary rings, and telemetry",
      action: () => { router.push("/dashboard"); setOpen(false); },
      icon: <Activity className="h-4 w-4 text-emerald-500" />,
    },
    {
      id: "roi",
      category: "Navigation",
      title: "Enterprise ROI & Infrastructure Calculator",
      subtitle: "Model distribution server savings and WAN offload",
      action: () => {
        router.push("/solutions/patch-management#roi");
        setOpen(false);
      },
      icon: <DollarSign className="h-4 w-4 text-[var(--accent)]" />,
    },
    {
      id: "patch-mgmt",
      category: "Solutions & Products",
      title: "Patch Management Software",
      subtitle: "Autonomous patch automation for OS and 3,000+ apps",
      action: () => { router.push("/solutions/patch-management"); setOpen(false); },
      icon: <Shield className="h-4 w-4 text-[var(--accent)]" />,
    },
    {
      id: "aem",
      category: "Solutions & Products",
      title: "Autonomous Endpoint Management",
      subtitle: "Continuous self-healing audits and sub-second fleet queries",
      action: () => { router.push("/solutions/autonomous-endpoint-management"); setOpen(false); },
      icon: <Zap className="h-4 w-4 text-amber-500" />,
    },
    {
      id: "onesite-patch",
      category: "Solutions & Products",
      title: "OneSite Patch Product Suite",
      subtitle: "Zero-infrastructure curated third-party catalog",
      action: () => { router.push("/products/onesite-patch"); setOpen(false); },
      icon: <Layers className="h-4 w-4 text-purple-500" />,
    },
    {
      id: "onesite-anywhere",
      category: "Solutions & Products",
      title: "OneSite Anywhere (P2P Mesh)",
      subtitle: "98% WAN offload via peer-to-peer swarms",
      action: () => { router.push("/products/onesite-anywhere"); setOpen(false); },
      icon: <Server className="h-4 w-4 text-sky-500" />,
    },
    {
      id: "onesite-health",
      category: "Solutions & Products",
      title: "OneSite Health (Self-Healing)",
      subtitle: "Automated WMI, BitLocker, and TPM 2.0 repair",
      action: () => { router.push("/products/onesite-health"); setOpen(false); },
      icon: <Activity className="h-4 w-4 text-emerald-500" />,
    },
    {
      id: "cve-3829",
      category: "Security CVEs",
      title: "CVE-2026-3829 Chromium Zero-Day Advisory",
      subtitle: "Severity 9.8 Critical · Canary Ring 0 Dispatched",
      action: () => { router.push("/dashboard"); setOpen(false); },
      icon: <Flame className="h-4 w-4 text-rose-500" />,
    },
    {
      id: "demo",
      category: "Navigation",
      title: "Schedule Architecture Demonstration",
      subtitle: "Private 1-on-1 enterprise briefing",
      action: () => { router.push("/demo"); setOpen(false); },
      icon: <FileText className="h-4 w-4 text-[var(--text-3)]" />,
    },
  ];

  const filteredCommands = COMMANDS.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Trigger Button to embed in Navbar or Hero */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--sunk)] text-xs font-mono text-[var(--text-2)] hover:text-[var(--text)] transition-colors shadow-sm"
        title="Open command palette"
      >
        <Search className="h-3.5 w-3.5 text-[var(--text-3)]" />
        <span>Quick Search...</span>
        <kbd className="text-[10px] bg-[var(--sunk)] border border-[var(--line)] px-1.5 py-0.5 rounded text-[var(--text-3)] font-mono">
          ⌘K
        </kbd>
      </button>

      {/* Modal Backdrop */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-xl rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--line)]">
              <Search className="h-4 w-4 text-[var(--text-3)] flex-shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search solutions, products, CVEs, or commands..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full bg-transparent text-sm text-[var(--text)] placeholder-[var(--text-3)] font-sans focus:outline-none"
              />
              <button
                onClick={() => setOpen(false)}
                className="text-[11px] font-mono text-[var(--text-3)] hover:text-[var(--text)] px-1.5 py-0.5 rounded border border-[var(--line)]"
              >
                ESC
              </button>
            </div>

            {/* Command Results */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-[var(--line)]/50">
              {filteredCommands.map((cmd, idx) => (
                <div
                  key={cmd.id}
                  onClick={cmd.action}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--sunk)] cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-[var(--bg)] border border-[var(--line)]">
                      {cmd.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors truncate">
                          {cmd.title}
                        </p>
                        <span className="text-[9px] font-mono uppercase bg-[var(--sunk)] text-[var(--text-3)] px-1.5 py-0.2 rounded">
                          {cmd.category}
                        </span>
                      </div>
                      {cmd.subtitle && (
                        <p className="text-[11px] text-[var(--text-3)] truncate mt-0.5">
                          {cmd.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <ArrowRight className="h-3.5 w-3.5 text-[var(--text-3)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
                </div>
              ))}

              {filteredCommands.length === 0 && (
                <div className="py-10 text-center text-xs text-[var(--text-3)]">
                  No matching results for &ldquo;{query}&rdquo;
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-[var(--sunk)] border-t border-[var(--line)] flex items-center justify-between text-[11px] font-mono text-[var(--text-3)]">
              <span>Navigate with arrow keys or click</span>
              <span>ESC to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

