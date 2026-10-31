"use client";

import React, { useState } from "react";
import { useToast } from "./Toast";
import {
  Search,
  CheckCircle2,
  Package,
  Layers,
  Shield,
  ArrowUpRight,
  Filter,
  Sparkles,
  Download,
} from "lucide-react";

interface AppPackage {
  id: string;
  name: string;
  category: "Browsers" | "Dev Tools" | "Collaboration" | "Security" | "Runtimes";
  currentVersion: string;
  patchedCves: number;
  packageType: "Signed MSI" | "Universal PKG" | "Deb/RPM" | "AppX";
  hash: string;
  vendor: string;
  ringStatus: "Canary Ready" | "Production Verified" | "Zero-Day Staged";
}

const CATALOG: AppPackage[] = [
  { id: "chrome", name: "Google Chrome Enterprise", category: "Browsers", currentVersion: "133.0.6943.98", patchedCves: 6, packageType: "Signed MSI", hash: "sha256:e3b0c44...9a8", vendor: "Google LLC", ringStatus: "Zero-Day Staged" },
  { id: "zoom", name: "Zoom Workplace", category: "Collaboration", currentVersion: "6.3.5.5412", patchedCves: 2, packageType: "Signed MSI", hash: "sha256:f4a8b11...32d", vendor: "Zoom Video Comm", ringStatus: "Production Verified" },
  { id: "slack", name: "Slack Desktop", category: "Collaboration", currentVersion: "4.41.97", patchedCves: 1, packageType: "Universal PKG", hash: "sha256:88bc210...ff1", vendor: "Salesforce Inc", ringStatus: "Production Verified" },
  { id: "vscode", name: "Visual Studio Code", category: "Dev Tools", currentVersion: "1.97.2", patchedCves: 3, packageType: "Signed MSI", hash: "sha256:091cb77...44a", vendor: "Microsoft Corp", ringStatus: "Production Verified" },
  { id: "docker", name: "Docker Desktop Enterprise", category: "Dev Tools", currentVersion: "4.38.0", patchedCves: 4, packageType: "Signed MSI", hash: "sha256:12ef84a...91b", vendor: "Docker Inc", ringStatus: "Canary Ready" },
  { id: "adobe", name: "Adobe Acrobat Reader DC", category: "Security", currentVersion: "24.004.20243", patchedCves: 8, packageType: "Signed MSI", hash: "sha256:77ae901...33f", vendor: "Adobe Systems", ringStatus: "Production Verified" },
  { id: "python", name: "Python Core Runtime", category: "Runtimes", currentVersion: "3.13.2", patchedCves: 2, packageType: "Deb/RPM", hash: "sha256:32ff11a...77c", vendor: "Python Software Foundation", ringStatus: "Production Verified" },
  { id: "node", name: "Node.js LTS (Jod)", category: "Runtimes", currentVersion: "22.14.0", patchedCves: 5, packageType: "Signed MSI", hash: "sha256:65ba819...22e", vendor: "OpenJS Foundation", ringStatus: "Production Verified" },
  { id: "onepass", name: "1Password Enterprise", category: "Security", currentVersion: "8.10.60", patchedCves: 1, packageType: "Universal PKG", hash: "sha256:44aa009...81d", vendor: "AgileBits Inc", ringStatus: "Production Verified" },
  { id: "firefox", name: "Mozilla Firefox ESR", category: "Browsers", currentVersion: "128.7.0esr", patchedCves: 4, packageType: "Signed MSI", hash: "sha256:91bc621...55a", vendor: "Mozilla Foundation", ringStatus: "Production Verified" },
  { id: "git", name: "Git for Windows", category: "Dev Tools", currentVersion: "2.48.1", patchedCves: 2, packageType: "Signed MSI", hash: "sha256:55aa331...90c", vendor: "Git Project", ringStatus: "Production Verified" },
  { id: "teams", name: "Microsoft Teams (New)", category: "Collaboration", currentVersion: "24335.1805.3338.5114", patchedCves: 3, packageType: "AppX", hash: "sha256:00ab441...77d", vendor: "Microsoft Corp", ringStatus: "Production Verified" },
];

export default function SoftwareCatalogExplorer() {
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("ALL");
  const [deployingId, setDeployingId] = useState<string | null>(null);

  const filteredApps = CATALOG.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.packageType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCat === "ALL" || app.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const handleDeploy = (app: AppPackage) => {
    setDeployingId(app.id);
    addToast({
      title: "P2P Canary Staging Initiated",
      message: `Deploying ${app.name} (${app.currentVersion}) to Canary Ring 0...`,
      type: "info",
    });

    setTimeout(() => {
      setDeployingId(null);
      addToast({
        title: "Deployment Synced",
        message: `${app.name} validated across Ring 0. Advancing to General Fleet.`,
        type: "success",
      });
    }, 2000);
  };

  return (
    <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-10 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] font-bold">
              <Package className="h-5 w-5" />
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[var(--text)]">
              Curated Software Patch Catalog
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-2)] mt-1.5">
            Over 3,000+ commercial and open-source applications pre-packaged, digitally signed, and tested across canary rings.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 font-mono text-xs text-emerald-500 font-semibold self-start sm:self-auto">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Zero Manual Packaging Needed
        </span>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-[var(--text-3)]" />
          <input
            type="text"
            placeholder="Search software (Chrome, Zoom, Docker)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] pl-10 pr-4 py-2 text-xs text-[var(--text)] font-sans focus:border-[var(--accent)] focus:outline-none"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 text-xs font-mono">
          {["ALL", "Browsers", "Collaboration", "Dev Tools", "Security", "Runtimes"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                selectedCat === cat
                  ? "bg-[var(--accent)] text-white font-semibold shadow-sm"
                  : "bg-[var(--sunk)] text-[var(--text-2)] hover:text-[var(--text)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Table */}
      <div className="overflow-x-auto rounded-2xl border border-[var(--line)] bg-[var(--bg)]">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[var(--line)] bg-[var(--sunk)]/50 text-[var(--text-3)] font-mono uppercase text-[10px] tracking-wider">
              <th className="py-3 px-4">Software Name & Vendor</th>
              <th className="py-3 px-4">Latest Version</th>
              <th className="py-3 px-4">Format</th>
              <th className="py-3 px-4">Patched CVEs</th>
              <th className="py-3 px-4">Canary Ring Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {filteredApps.map((app) => (
              <tr key={app.id} className="hover:bg-[var(--sunk)]/40 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-[var(--text)]">{app.name}</div>
                  <div className="text-[10px] text-[var(--text-3)] font-mono">{app.vendor} · {app.hash}</div>
                </td>
                <td className="py-3.5 px-4 font-mono font-medium text-[var(--text)]">
                  {app.currentVersion}
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-mono text-[10px] bg-[var(--surface)] border border-[var(--line)] px-2 py-0.5 rounded text-[var(--text-2)]">
                    {app.packageType}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono">
                  <span className="text-emerald-500 font-bold">{app.patchedCves} Resolved</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className={`inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded font-medium ${
                    app.ringStatus === "Zero-Day Staged"
                      ? "bg-rose-500/15 text-rose-400 border border-rose-500/20 animate-pulse"
                      : app.ringStatus === "Canary Ready"
                      ? "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                      : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                  }`}>
                    {app.ringStatus}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => handleDeploy(app)}
                    disabled={deployingId === app.id}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--accent)] hover:opacity-90 text-white font-mono text-[11px] font-semibold transition-all shadow-sm disabled:opacity-50"
                  >
                    <span>{deployingId === app.id ? "Deploying..." : "Stage Canary"}</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredApps.length === 0 && (
          <div className="py-12 text-center text-xs text-[var(--text-3)]">
            No software matched your search criteria.
          </div>
        )}
      </div>
    </div>
  );
}

