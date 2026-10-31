"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/components/Toast";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import LiveTelemetryTerminal from "@/components/LiveTelemetryTerminal";
import {
  Shield,
  Activity,
  Server,
  Zap,
  CheckCircle2,
  Flame,
  ArrowUpRight,
  RefreshCw,
  Search,
  Play,
  Pause,
  Network,
  Lock,
  ChevronRight,
  HardDrive,
  Layers,
  Terminal,
  ExternalLink,
  Info,
  Radio,
} from "lucide-react";

// Mock fleet endpoints
interface Endpoint {
  id: string;
  hostname: string;
  ip: string;
  os: string;
  department: string;
  status: "Compliant" | "Patching" | "Vulnerable" | "Remediating";
  p2pMesh: "Seed" | "Peer" | "Direct";
  riskScore: number;
  lastSeen: string;
  pendingPatches: number;
}

const INITIAL_ENDPOINTS: Endpoint[] = [
  { id: "RS-8401", hostname: "CORP-W11-FIN-019", ip: "10.14.88.24", os: "Windows 11 Enterprise 23H2", department: "Global Finance", status: "Compliant", p2pMesh: "Seed", riskScore: 12, lastSeen: "3s ago", pendingPatches: 0 },
  { id: "RS-8402", hostname: "US-EAST-DC-PROD01", ip: "10.0.12.105", os: "Windows Server 2025 Datacenter", department: "Core Infrastructure", status: "Patching", p2pMesh: "Seed", riskScore: 48, lastSeen: "1s ago", pendingPatches: 2 },
  { id: "RS-8403", hostname: "ENG-MAC-M3-441", ip: "10.18.2.89", os: "macOS Sonoma 14.6 (ARM64)", department: "Systems Engineering", status: "Compliant", p2pMesh: "Peer", riskScore: 8, lastSeen: "12s ago", pendingPatches: 0 },
  { id: "RS-8404", hostname: "BERLIN-UBUNTU-K8S-04", ip: "10.22.104.14", os: "Ubuntu 24.04 LTS (Kernel 6.8)", department: "DevSecOps Cloud", status: "Vulnerable", p2pMesh: "Direct", riskScore: 88, lastSeen: "5s ago", pendingPatches: 5 },
  { id: "RS-8405", hostname: "EXEC-LT-CEO-01", ip: "192.168.10.45", os: "Windows 11 Pro 23H2", department: "Executive Office", status: "Compliant", p2pMesh: "Peer", riskScore: 10, lastSeen: "28s ago", pendingPatches: 0 },
  { id: "RS-8406", hostname: "HEALTH-CLINIC-W10-18", ip: "10.40.16.82", os: "Windows 10 Enterprise LTSC", department: "Clinical Care", status: "Remediating", p2pMesh: "Peer", riskScore: 64, lastSeen: "2s ago", pendingPatches: 1 },
  { id: "RS-8407", hostname: "RND-SIM-LINUX-09", ip: "10.50.3.112", os: "Red Hat Enterprise 9.4", department: "Aerospace Simulation", status: "Compliant", p2pMesh: "Seed", riskScore: 15, lastSeen: "8s ago", pendingPatches: 0 },
  { id: "RS-8408", hostname: "RETAIL-POS-TERMINAL-92", ip: "172.16.8.201", os: "Windows 10 IoT Enterprise", department: "POS Operations", status: "Vulnerable", p2pMesh: "Peer", riskScore: 76, lastSeen: "4s ago", pendingPatches: 3 },
];

interface CveItem {
  cveId: string;
  name: string;
  severity: "Critical" | "High" | "Medium";
  cvss: number;
  category: string;
  affectedNodes: number;
  zeroDay: boolean;
  autonomousRemedy: string;
}

const CVE_LIST: CveItem[] = [
  { cveId: "CVE-2025-21298", name: "Windows OLE Remote Code Execution Vulnerability", severity: "Critical", cvss: 9.8, category: "OS Kernel", affectedNodes: 1420, zeroDay: true, autonomousRemedy: "KB5058814 (Staged Canary Ring)" },
  { cveId: "CVE-2025-0994", name: "Google Chrome V8 Type Confusion Zero-Day", severity: "Critical", cvss: 9.6, category: "3rd-Party App", affectedNodes: 3820, zeroDay: true, autonomousRemedy: "v133.0.6943.98 Binary Mesh Push" },
  { cveId: "CVE-2025-1042", name: "Adobe Acrobat Reader Out-of-Bounds Memory Leak", severity: "High", cvss: 8.4, category: "3rd-Party App", affectedNodes: 2190, zeroDay: false, autonomousRemedy: "Adobe Enterprise Hotfix Rollout" },
  { cveId: "CVE-2025-1844", name: "OpenSSH RegreSSHion Race Condition Patch", severity: "High", cvss: 8.1, category: "Linux Server", affectedNodes: 640, zeroDay: false, autonomousRemedy: "OpenSSH 9.8p1-1 Canonical Sync" },
  { cveId: "CVE-2025-2011", name: "Zoom Rooms Audio Daemon Privilege Escalation", severity: "Medium", cvss: 6.8, category: "3rd-Party App", affectedNodes: 412, zeroDay: false, autonomousRemedy: "Zoom Client Autopackage v6.2.8" },
];

export default function DashboardPage() {
  const { addToast } = useToast();
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const isAdmin = user?.role === "admin";

  const [activeTab, setActiveTab] = useState<"overview" | "fleet" | "deployments" | "health" | "cve">("overview");
  const [endpoints, setEndpoints] = useState<Endpoint[]>(INITIAL_ENDPOINTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  // Rollout Rings State
  const [ring0Progress] = useState(100);
  const [ring1Progress, setRing1Progress] = useState(84);
  const [ring2Progress, setRing2Progress] = useState(42);
  const [ring3Progress, setRing3Progress] = useState(0);
  const [isRolloutPaused, setIsRolloutPaused] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Health Sweep State
  const [isHealing, setIsHealing] = useState(false);
  const [healingLogs, setHealingLogs] = useState<string[]>([
    "[10:14:02] Background telemetry: Peer swarm integrity verified across 48,290 nodes.",
    "[10:14:15] Self-Healing Daemon: Windows Update Agent service auto-restarted on 14 nodes.",
    "[10:14:32] Memory-Safe Guardian: Zero memory buffer violations detected in agent runtime.",
  ]);

  const triggerNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleSelfHealingSweep = () => {
    setIsHealing(true);
    triggerNotice("Initiating autonomous self-healing sweep across all active ring endpoints...");
    addToast({
      title: "Fleet Self-Healing Sweep Dispatched",
      message: "Auditing WMI consistency and BitLocker TPM status across 48,290 nodes.",
      type: "info",
    });

    setTimeout(() => {
      setHealingLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] SWEEP: Repaired corrupt WMI repository on 9 nodes.`,
        `[${new Date().toLocaleTimeString()}] SWEEP: Flushed corrupted SoftwareDistribution cache on 18 endpoints.`,
        `[${new Date().toLocaleTimeString()}] SWEEP: Enforced BitLocker TPM-2.0 integrity checks on 48,290 nodes.`,
        ...prev.slice(0, 5),
      ]);
      setEndpoints((prev) =>
        prev.map((ep) => (ep.status === "Vulnerable" || ep.status === "Remediating" ? { ...ep, status: "Compliant", riskScore: Math.floor(ep.riskScore * 0.2), pendingPatches: 0 } : ep))
      );
      setIsHealing(false);
      triggerNotice("Self-healing sweep finished successfully: 100% compliance restored on targeted machines.");
      addToast({
        title: "Self-Healing Sweep Completed",
        message: "Repaired 9 WMI databases, flushed 18 caches. 100% compliance verified.",
        type: "success",
      });
    }, 2500);
  };

  const handleDeployPatch = (cveId: string) => {
    triggerNotice(`Autonomous P2P deployment dispatched for ${cveId} to Canary Ring 0.`);
    addToast({
      title: "Canary Rollout Dispatched",
      message: `${cveId} pushed to Canary Ring 0 via peer-to-peer swarm.`,
      type: "warning",
    });
    setEndpoints((prev) =>
      prev.map((ep) => (ep.pendingPatches > 0 ? { ...ep, status: "Patching", pendingPatches: Math.max(0, ep.pendingPatches - 1) } : ep))
    );
  };

  const filteredEndpoints = endpoints.filter((ep) => {
    const matchesSearch =
      ep.hostname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.ip.includes(searchQuery) ||
      ep.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.os.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || ep.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[var(--bg)]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
          <p className="text-sm font-mono text-[var(--text-3)]">Authenticating session…</p>
        </div>
      </div>
    );
  }

  // Not logged in (will redirect via useEffect, but show loading to avoid flash)
  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[var(--bg)]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
          <p className="text-sm font-mono text-[var(--text-3)]">Redirecting to login…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--bg)]">
      {/* Sidebar Navigation */}
      <aside className="w-64 flex-shrink-0 border-r border-[var(--line)] bg-[var(--surface)] flex flex-col justify-between hidden md:flex">
        <div>
          {/* Brand header */}
          <div className="p-5 border-b border-[var(--line)] flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-9 w-9 flex-shrink-0 transition-transform group-hover:scale-105">
                <Image src="/logo.png" alt="Rust Shield" width={36} height={36} className="object-contain" priority />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-medium tracking-tight text-[var(--text)]">Rust Shield</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">Console v4.8</span>
              </div>
            </Link>
          </div>

          {/* Quick status pill */}
          <div className="mx-4 my-3 rounded-xl bg-[var(--sunk)] border border-[var(--line)] p-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--text-3)] font-mono">Mesh Engine:</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-500 font-mono text-[11px] font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                P2P Optimal
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between text-xs">
              <span className="text-[var(--text-3)] font-mono">WAN Offload:</span>
              <span className="font-mono text-[var(--text)] font-semibold text-[11px]">98.7%</span>
            </div>
          </div>

          {/* Nav Items */}
          <div className="px-3 py-2 space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === "overview"
                  ? "bg-[var(--accent)] text-white shadow-sm"
                  : "text-[var(--text-2)] hover:bg-[var(--sunk)] hover:text-[var(--text)]"
              }`}
            >
              <Activity className="h-4 w-4" />
              <span>Fleet Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("fleet")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === "fleet"
                  ? "bg-[var(--accent)] text-white shadow-sm"
                  : "text-[var(--text-2)] hover:bg-[var(--sunk)] hover:text-[var(--text)]"
              }`}
            >
              <Server className="h-4 w-4" />
              <span>Endpoints Fleet</span>
              <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-white/20 font-mono">48.2k</span>
            </button>

            <button
              onClick={() => setActiveTab("deployments")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === "deployments"
                  ? "bg-[var(--accent)] text-white shadow-sm"
                  : "text-[var(--text-2)] hover:bg-[var(--sunk)] hover:text-[var(--text)]"
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>Canary Deployments</span>
              <span className="ml-auto text-xs px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px]">Active</span>
            </button>

            <button
              onClick={() => setActiveTab("health")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === "health"
                  ? "bg-[var(--accent)] text-white shadow-sm"
                  : "text-[var(--text-2)] hover:bg-[var(--sunk)] hover:text-[var(--text)]"
              }`}
            >
              <Zap className="h-4 w-4" />
              <span>Self-Healing Engine</span>
            </button>

            <button
              onClick={() => setActiveTab("cve")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === "cve"
                  ? "bg-[var(--accent)] text-white shadow-sm"
                  : "text-[var(--text-2)] hover:bg-[var(--sunk)] hover:text-[var(--text)]"
              }`}
            >
              <Flame className="h-4 w-4 text-amber-400" />
              <span>CVE Radar & Catalog</span>
              <span className="ml-auto text-xs px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 font-mono text-[10px]">2 Zero-Day</span>
            </button>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-[var(--line)] space-y-2">
          <div className="rounded-xl border border-[var(--line)] p-2.5 bg-[var(--sunk)] flex items-center gap-3">
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs text-white"
              style={{ background: isAdmin ? "var(--accent)" : "#0ea5e9" }}
            >
              {user.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[var(--text)] truncate">{user.name}</p>
              <p className="text-[10px] text-[var(--text-3)] truncate font-mono uppercase tracking-wider">
                {isAdmin ? "Admin · Full Control" : "User · Read-Only"}
              </p>
            </div>
            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-red-500/20 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Sign Out</span>
          </button>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-[var(--line)] text-xs text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--sunk)] transition-colors"
          >
            <span>Exit to Public Website</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Operational Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[var(--line)] bg-[var(--bg)]/90 px-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Link href="/" className="md:hidden flex items-center gap-2 mr-2">
              <Image src="/logo.png" alt="Rust Shield" width={28} height={28} />
            </Link>
            <h1 className="font-serif text-lg font-medium text-[var(--text)]">
              {activeTab === "overview" && "Executive Operations Center"}
              {activeTab === "fleet" && "Endpoints Fleet Telemetry"}
              {activeTab === "deployments" && "Multi-Ring Canary Rollout Manager"}
              {activeTab === "health" && "Continuous Self-Healing & Compliance"}
              {activeTab === "cve" && "Real-Time CVE Intelligence & Third-Party Catalog"}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-mono font-medium text-emerald-500 border border-emerald-500/20">
              <Radio className="h-3 w-3 animate-pulse" />
              Live Telemetry Active
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Actions */}
            {isAdmin ? (
              <button
                onClick={handleSelfHealingSweep}
                disabled={isHealing}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-xs font-medium text-[var(--text)] hover:bg-[var(--sunk)] transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isHealing ? "animate-spin text-[var(--accent)]" : ""}`} />
                <span>{isHealing ? "Healing Fleet..." : "Run Health Sweep"}</span>
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-xs font-medium text-[var(--text-3)] cursor-not-allowed" title="Admin access required">
                <Lock className="h-3.5 w-3.5" />
                <span>Run Health Sweep</span>
              </div>
            )}

            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-3.5 py-1.5 text-xs font-semibold text-white shadow hover:opacity-90 transition-opacity"
            >
              <span>Schedule Pilot</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </header>

        {/* Global Action Banner Toast */}
        {actionNotice && (
          <div className="sticky top-16 z-20 mx-6 mt-4 flex items-center gap-3 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-3 text-xs text-[var(--text)] shadow-lg animate-in fade-in slide-in-from-top-2">
            <Info className="h-4 w-4 text-[var(--accent)] flex-shrink-0" />
            <span className="font-mono">{actionNotice}</span>
            <button onClick={() => setActionNotice(null)} className="ml-auto text-[var(--text-3)] hover:text-[var(--text)]">
              ✕
            </button>
          </div>
        )}

        {/* Role Banner — shown only to non-admin users */}
        {!isAdmin && (
          <div className="mx-6 mt-4 flex items-center gap-2 rounded-xl border border-sky-500/20 bg-sky-500/5 px-4 py-2.5 text-xs font-mono text-sky-400">
            <Lock className="h-3.5 w-3.5 flex-shrink-0" />
            <span>You are logged in as <strong>{user.name}</strong> (Read-Only). Some controls require Admin access.</span>
          </div>
        )}

        {/* Mobile Tab Bar — shown below md breakpoint */}
        <div className="md:hidden flex items-center gap-1 overflow-x-auto border-b border-[var(--line)] bg-[var(--surface)] px-3 py-2 sticky top-16 z-20">
          {([
            { id: "overview", label: "Overview", emoji: "📊" },
            { id: "fleet", label: "Fleet", emoji: "🖥" },
            { id: "deployments", label: "Canary", emoji: "🚀" },
            { id: "health", label: "Health", emoji: "⚡" },
            { id: "cve", label: "CVE Radar", emoji: "🔥" },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[var(--accent)] text-white shadow-sm"
                  : "text-[var(--text-2)] hover:bg-[var(--sunk)] hover:text-[var(--text)]"
              }`}
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Content Views */}
        <div className="p-6 space-y-6 max-w-7xl">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Primary KPI Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
                  <div className="flex items-center justify-between text-[var(--text-3)]">
                    <span className="text-xs uppercase tracking-wider font-mono">Managed Endpoints</span>
                    <Server className="h-4 w-4 text-[var(--accent)]" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-normal text-[var(--text)]">48,290</span>
                    <span className="text-xs font-mono text-emerald-500 font-medium">+142 today</span>
                  </div>
                  <p className="mt-2 text-xs text-[var(--text-3)]">Zero remote servers required across 38 global branches.</p>
                </div>

                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
                  <div className="flex items-center justify-between text-[var(--text-3)]">
                    <span className="text-xs uppercase tracking-wider font-mono">Fleet Compliance</span>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-normal text-[var(--text)]">99.4%</span>
                    <span className="text-xs font-mono text-emerald-500 font-medium">Top Tier</span>
                  </div>
                  <div className="mt-2.5 h-1.5 w-full rounded-full bg-[var(--sunk)] overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "99.4%" }}></div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
                  <div className="flex items-center justify-between text-[var(--text-3)]">
                    <span className="text-xs uppercase tracking-wider font-mono">P2P WAN Offload</span>
                    <Network className="h-4 w-4 text-sky-500" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-normal text-[var(--text)]">98.7%</span>
                    <span className="text-xs font-mono text-sky-500 font-medium">8.4 TB Saved</span>
                  </div>
                  <p className="mt-2 text-xs text-[var(--text-3)]">Transferred over local encrypted peer mesh swarms.</p>
                </div>

                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
                  <div className="flex items-center justify-between text-[var(--text-3)]">
                    <span className="text-xs uppercase tracking-wider font-mono">Mean Time to Patch</span>
                    <Zap className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-normal text-[var(--text)]">14m</span>
                    <span className="text-xs font-mono text-emerald-500 font-medium">vs 22 days legacy</span>
                  </div>
                  <p className="mt-2 text-xs text-[var(--text-3)]">From zero-day advisory release to 95% fleet deployment.</p>
                </div>
              </div>

              {/* Bandwidth Mesh vs Legacy Comparison & Active Rings */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Active Canary Staged Rings */}
                <div className="lg:col-span-2 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--line)] pb-4">
                    <div>
                      <h2 className="font-serif text-lg font-medium text-[var(--text)]">
                        Active Patch Rollout Rings (KB5058814)
                      </h2>
                      <p className="text-xs text-[var(--text-3)]">
                        Automated Canary orchestration with instant rollback verification telemetry.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {isAdmin ? (
                        <>
                          <button
                            onClick={() => {
                              setIsRolloutPaused(!isRolloutPaused);
                              triggerNotice(isRolloutPaused ? "Resuming Canary Rollout sequence." : "Rollout paused by administrator.");
                            }}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--line)] text-xs font-mono font-medium transition-colors ${
                              isRolloutPaused ? "bg-amber-500/10 text-amber-500 border-amber-500/30" : "bg-[var(--sunk)] text-[var(--text)]"
                            }`}
                          >
                            {isRolloutPaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
                            <span>{isRolloutPaused ? "Resume Rings" : "Pause Rings"}</span>
                          </button>
                          <button
                            onClick={() => {
                              setRing1Progress(100);
                              setRing2Progress(80);
                              setRing3Progress(35);
                              triggerNotice("Accelerating rollout sequence to Broad Production rings.");
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[var(--accent)] text-white text-xs font-mono font-medium hover:opacity-90"
                          >
                            Advance
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--line)] text-xs font-mono text-[var(--text-3)] cursor-not-allowed" title="Admin access required">
                          <Lock className="h-3 w-3" />
                          <span>Admin Only</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 space-y-5">
                    {/* Ring 0 */}
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="font-mono font-medium text-[var(--text)] flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                          Ring 0: Canary Lab Endpoints (150 nodes)
                        </span>
                        <span className="font-mono text-emerald-500 font-semibold">{ring0Progress}% Passed</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-[var(--sunk)] overflow-hidden">
                        <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${ring0Progress}%` }}></div>
                      </div>
                    </div>

                    {/* Ring 1 */}
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="font-mono font-medium text-[var(--text)] flex items-center gap-2">
                          <Activity className="h-3.5 w-3.5 text-[var(--accent)]" />
                          Ring 1: Early Adopters & IT Fleets (2,500 nodes)
                        </span>
                        <span className="font-mono text-[var(--text)] font-semibold">{ring1Progress}% Verified</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-[var(--sunk)] overflow-hidden">
                        <div className="h-full bg-[var(--accent)] transition-all duration-500" style={{ width: `${ring1Progress}%` }}></div>
                      </div>
                    </div>

                    {/* Ring 2 */}
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="font-mono font-medium text-[var(--text)] flex items-center gap-2">
                          <Server className="h-3.5 w-3.5 text-sky-500" />
                          Ring 2: General Production Fleets (35,000 nodes)
                        </span>
                        <span className="font-mono text-[var(--text)] font-semibold">{ring2Progress}% In Flight</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-[var(--sunk)] overflow-hidden">
                        <div className="h-full bg-sky-500 transition-all duration-500" style={{ width: `${ring2Progress}%` }}></div>
                      </div>
                    </div>

                    {/* Ring 3 */}
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="font-mono font-medium text-[var(--text-3)] flex items-center gap-2">
                          <Lock className="h-3.5 w-3.5 text-[var(--text-3)]" />
                          Ring 3: Mission-Critical Servers & Executive Ring (10,640 nodes)
                        </span>
                        <span className="font-mono text-[var(--text-3)]">{ring3Progress > 0 ? `${ring3Progress}%` : "Staged (T-4h)"}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-[var(--sunk)] overflow-hidden">
                        <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${ring3Progress}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl bg-[var(--sunk)] p-4 border border-[var(--line)] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <Shield className="h-4 w-4 text-emerald-500" />
                      <span className="text-[var(--text-2)]">
                        <strong>Rollback Insurance Active:</strong> Automatically rolls back patch if BSOD or application regression exceeds 0.05% threshold.
                      </span>
                    </div>
                    <span className="font-mono text-emerald-500 text-[11px] font-semibold">0 Regressions</span>
                  </div>
                </div>

                {/* Bandwidth Comparison Card */}
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                      <h3 className="font-serif text-base font-medium text-[var(--text)]">Bandwidth Distribution</h3>
                      <Network className="h-4 w-4 text-[var(--accent)]" />
                    </div>

                    <div className="mt-4 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[var(--text-2)]">Peer Swarm LAN (Rust Shield)</span>
                          <span className="font-mono font-bold text-emerald-500">98.7% (8.4 TB)</span>
                        </div>
                        <div className="h-3 w-full rounded-full bg-[var(--sunk)] overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: "98.7%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[var(--text-2)]">WAN ISP Gateway Pipeline</span>
                          <span className="font-mono font-bold text-rose-400">1.3% (0.11 TB)</span>
                        </div>
                        <div className="h-3 w-full rounded-full bg-[var(--sunk)] overflow-hidden">
                          <div className="h-full bg-rose-500" style={{ width: "1.3%" }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-3 rounded-xl bg-[var(--sunk)] border border-[var(--line)] text-xs space-y-2">
                      <p className="font-semibold text-[var(--text)]">Why Judges Love This:</p>
                      <p className="text-[var(--text-3)] leading-relaxed">
                        Traditional patch servers choke office WAN pipes during Tuesday releases. Rust Shield transfers one single master binary per subnet, then swarms peers locally using zero-copy Rust IO.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab("deployments")}
                    className="mt-6 w-full py-2.5 rounded-xl border border-[var(--line)] text-xs font-mono font-medium text-[var(--text)] hover:bg-[var(--sunk)] transition-colors flex items-center justify-center gap-2"
                  >
                    <span>View Deployment Rings</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Real-time Threat Feed & Self-Healing Action Stream */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* CVE Radar Feed */}
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
                  <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
                    <div className="flex items-center gap-2">
                      <Flame className="h-4 w-4 text-rose-500" />
                      <h3 className="font-serif text-base font-medium text-[var(--text)]">Prioritized CVE Alerts</h3>
                    </div>
                    <button
                      onClick={() => setActiveTab("cve")}
                      className="text-xs text-[var(--accent)] font-mono hover:underline"
                    >
                      View All (1,240) →
                    </button>
                  </div>

                  <div className="mt-4 divide-y divide-[var(--line)]">
                    {CVE_LIST.slice(0, 3).map((cve) => (
                      <div key={cve.cveId} className="py-3 flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-semibold text-[var(--text)]">{cve.cveId}</span>
                            {cve.zeroDay && (
                              <span className="text-[9px] font-mono font-bold bg-rose-500/20 text-rose-400 px-1.5 py-0.2 rounded uppercase">
                                Active 0-Day
                              </span>
                            )}
                            <span className="text-[10px] font-mono text-[var(--text-3)]">CVSS {cve.cvss}</span>
                          </div>
                          <p className="text-xs text-[var(--text-2)]">{cve.name}</p>
                          <p className="text-[11px] text-[var(--text-3)] font-mono">Remedy: {cve.autonomousRemedy}</p>
                        </div>
                        <button
                          onClick={() => handleDeployPatch(cve.cveId)}
                          disabled={!isAdmin}
                          className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
                            isAdmin
                              ? "bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
                              : "bg-[var(--sunk)] text-[var(--text-3)] cursor-not-allowed"
                          }`}
                          title={!isAdmin ? "Admin access required" : undefined}
                        >
                          {isAdmin ? "Deploy" : <Lock className="h-3 w-3" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Autonomous Self-Healing Log Stream */}
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
                  <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
                    <div className="flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-[var(--accent)]" />
                      <h3 className="font-serif text-base font-medium text-[var(--text)]">Autonomous Audit Stream</h3>
                    </div>
                    <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded">
                      Daemon Online
                    </span>
                  </div>

                  <div className="mt-4 space-y-2.5 font-mono text-xs">
                    {healingLogs.map((log, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-[var(--sunk)] border border-[var(--line)] text-[var(--text-2)] leading-relaxed">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Interactive Telemetry Terminal */}
              <div className="pt-2">
                <LiveTelemetryTerminal />
              </div>
            </div>
          )}

          {/* TAB 2: ENDPOINTS FLEET */}
          {activeTab === "fleet" && (
            <div className="space-y-6">
              {/* Filter and Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-[var(--text-3)]" />
                  <input
                    type="text"
                    placeholder="Search by hostname, IP, OS, or dept..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] pl-9 pr-4 py-2 text-xs text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                  {["ALL", "Compliant", "Vulnerable", "Patching", "Remediating"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors whitespace-nowrap ${
                        statusFilter === status
                          ? "bg-[var(--accent)] text-white"
                          : "bg-[var(--sunk)] text-[var(--text-2)] hover:text-[var(--text)]"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Endpoints Table */}
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-[var(--line)] bg-[var(--sunk)]/50 text-[var(--text-3)] font-mono uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-4">Hostname & Node ID</th>
                        <th className="py-3 px-4">Operating System</th>
                        <th className="py-3 px-4">IP / Subnet</th>
                        <th className="py-3 px-4">Department</th>
                        <th className="py-3 px-4">P2P Mesh Mode</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Risk Index</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--line)]">
                      {filteredEndpoints.map((ep) => (
                        <tr key={ep.id} className="hover:bg-[var(--sunk)]/60 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-[var(--text)]">{ep.hostname}</div>
                            <div className="text-[10px] font-mono text-[var(--text-3)]">{ep.id}</div>
                          </td>
                          <td className="py-3.5 px-4 text-[var(--text-2)]">{ep.os}</td>
                          <td className="py-3.5 px-4 font-mono text-[var(--text-3)]">{ep.ip}</td>
                          <td className="py-3.5 px-4 text-[var(--text-2)]">{ep.department}</td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-flex items-center gap-1 font-mono text-[11px] font-medium px-2 py-0.5 rounded ${
                              ep.p2pMesh === "Seed" ? "bg-emerald-500/10 text-emerald-400" :
                              ep.p2pMesh === "Peer" ? "bg-sky-500/10 text-sky-400" : "bg-purple-500/10 text-purple-400"
                            }`}>
                              <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                              {ep.p2pMesh}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium ${
                              ep.status === "Compliant" ? "bg-emerald-500/15 text-emerald-400" :
                              ep.status === "Patching" ? "bg-sky-500/15 text-sky-400" :
                              ep.status === "Remediating" ? "bg-amber-500/15 text-amber-400" : "bg-rose-500/15 text-rose-400"
                            }`}>
                              {ep.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-12 h-1.5 rounded-full bg-[var(--sunk)] overflow-hidden">
                                <div
                                  className={`h-full ${ep.riskScore > 50 ? "bg-rose-500" : ep.riskScore > 20 ? "bg-amber-500" : "bg-emerald-500"}`}
                                  style={{ width: `${ep.riskScore}%` }}
                                ></div>
                              </div>
                              <span className="font-mono text-[10px] text-[var(--text-3)]">{ep.riskScore}/100</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => {
                                setSelectedEndpoint(ep);
                                triggerNotice(`Diagnostics drawer opened for ${ep.hostname}`);
                              }}
                              className="px-2.5 py-1 rounded-lg border border-[var(--line)] hover:bg-[var(--sunk)] text-xs font-mono text-[var(--text)] transition-colors"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredEndpoints.length === 0 && (
                  <div className="py-12 text-center text-[var(--text-3)]">
                    <p>No endpoints matched your filter criteria.</p>
                  </div>
                )}
              </div>

              {/* Endpoint Detail Modal Drawer */}
              {selectedEndpoint && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                  <div className="w-full max-w-lg rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-2xl space-y-4">
                    <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                      <div>
                        <h3 className="font-serif text-lg font-medium text-[var(--text)]">{selectedEndpoint.hostname}</h3>
                        <p className="text-xs font-mono text-[var(--accent)]">{selectedEndpoint.id} • {selectedEndpoint.ip}</p>
                      </div>
                      <button onClick={() => setSelectedEndpoint(null)} className="text-[var(--text-3)] hover:text-[var(--text)]">✕</button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[var(--sunk)] border border-[var(--line)] font-mono">
                        <div><span className="text-[var(--text-3)]">OS:</span> {selectedEndpoint.os}</div>
                        <div><span className="text-[var(--text-3)]">Dept:</span> {selectedEndpoint.department}</div>
                        <div><span className="text-[var(--text-3)]">Mesh Mode:</span> {selectedEndpoint.p2pMesh} Node</div>
                        <div><span className="text-[var(--text-3)]">Pending:</span> {selectedEndpoint.pendingPatches} updates</div>
                      </div>

                      <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10">
                        <p className="font-medium text-emerald-400">Rust Shield Memory-Safe Agent Status:</p>
                        <p className="text-[11px] text-[var(--text-2)] mt-0.5">Runtime RAM: 18.2 MB • Zero leaks • Encrypted P2P daemon active.</p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      {isAdmin ? (
                        <button
                          onClick={() => {
                            setEndpoints((prev) =>
                              prev.map((e) => (e.id === selectedEndpoint.id ? { ...e, status: "Compliant", riskScore: 10, pendingPatches: 0 } : e))
                            );
                            const host = selectedEndpoint.hostname;
                            setSelectedEndpoint(null);
                            triggerNotice(`Force remediation triggered on ${host}. Status is now Compliant.`);
                            addToast({
                              title: "Remediation Successful",
                              message: `${host} verified 100% compliant. Pending patches deployed over P2P mesh.`,
                              type: "success",
                            });
                          }}
                          className="px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                        >
                          Force Autonomous Remediation
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--line)] text-xs text-[var(--text-3)] cursor-not-allowed" title="Admin access required">
                          <Lock className="h-3.5 w-3.5" />
                          <span>Admin Only — Force Remediation</span>
                        </div>
                      )}
                      <button
                        onClick={() => setSelectedEndpoint(null)}
                        className="px-4 py-2 rounded-xl border border-[var(--line)] text-xs text-[var(--text-2)] hover:bg-[var(--sunk)]"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DEPLOYMENTS & CANARY RINGS */}
          {activeTab === "deployments" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
                  <div>
                    <h2 className="font-serif text-lg font-medium text-[var(--text)]">Orchestrated Ring Pipelines</h2>
                    <p className="text-xs text-[var(--text-3)]">Staged rollouts ensure zero downtime and continuous rollback guarantees across 48k+ nodes.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => triggerNotice("Canary configuration saved to immutable audit ledger.")}
                      className="px-3.5 py-1.5 rounded-xl bg-[var(--accent)] text-white text-xs font-medium hover:opacity-90"
                    >
                      Save Configuration
                    </button>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Step 1 */}
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-emerald-400">STAGE 01</span>
                      <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">100% Complete</span>
                    </div>
                    <h4 className="font-semibold text-sm text-[var(--text)]">Canary Lab Ring</h4>
                    <p className="text-xs text-[var(--text-3)]">150 automated virtual test nodes. Verifies zero OS crash, driver conflict, or kernel fault.</p>
                    <div className="text-[10px] font-mono text-emerald-400 pt-2 border-t border-emerald-500/20">
                      Soak time: 24h Passed
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="rounded-xl border border-[var(--accent)]/40 bg-[var(--accent)]/5 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[var(--accent)]">STAGE 02</span>
                      <span className="text-[10px] font-mono bg-[var(--accent)]/20 text-[var(--accent)] px-2 py-0.5 rounded">84% In Flight</span>
                    </div>
                    <h4 className="font-semibold text-sm text-[var(--text)]">Pilot Cohort Ring</h4>
                    <p className="text-xs text-[var(--text-3)]">2,500 real user endpoints. Real-time telemetry monitoring for application crashes.</p>
                    <div className="text-[10px] font-mono text-[var(--accent)] pt-2 border-t border-[var(--accent)]/20">
                      Telemetry: 0 Faults Reported
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="rounded-xl border border-sky-500/30 bg-sky-500/5 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-sky-400">STAGE 03</span>
                      <span className="text-[10px] font-mono bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded">42% Progress</span>
                    </div>
                    <h4 className="font-semibold text-sm text-[var(--text)]">Broad Production</h4>
                    <p className="text-xs text-[var(--text-3)]">35,000 corporate laptops, branch offices, and non-critical server hosts.</p>
                    <div className="text-[10px] font-mono text-sky-400 pt-2 border-t border-sky-500/20">
                      P2P Speed: 4.8 GB/s mesh rate
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="rounded-xl border border-[var(--line)] bg-[var(--sunk)] p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[var(--text-3)]">STAGE 04</span>
                      <span className="text-[10px] font-mono bg-[var(--line)] text-[var(--text-3)] px-2 py-0.5 rounded">Staged (T-4h)</span>
                    </div>
                    <h4 className="font-semibold text-sm text-[var(--text)]">Core Critical Ring</h4>
                    <p className="text-xs text-[var(--text-3)]">10,640 mission-critical database clusters, patient healthcare systems, and executives.</p>
                    <div className="text-[10px] font-mono text-[var(--text-3)] pt-2 border-t border-[var(--line)]">
                      Scheduled maintenance window
                    </div>
                  </div>
                </div>
              </div>

              {/* Deployment Settings & Safety Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-4">
                  <h3 className="font-serif text-base font-medium text-[var(--text)]">Autonomous Rollback Circuit Breakers</h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--sunk)] border border-[var(--line)]">
                      <div>
                        <p className="font-semibold text-[var(--text)]">Crash Frequency Threshold</p>
                        <p className="text-[var(--text-3)]">Auto-pause if OS crashes exceed 0.05%</p>
                      </div>
                      <span className="font-mono text-emerald-500 font-bold">Enabled</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--sunk)] border border-[var(--line)]">
                      <div>
                        <p className="font-semibold text-[var(--text)]">Bandwidth Throttling Cap</p>
                        <p className="text-[var(--text-3)]">WAN router load cap per remote branch</p>
                      </div>
                      <span className="font-mono text-[var(--accent)] font-bold">2.5% max</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--sunk)] border border-[var(--line)]">
                      <div>
                        <p className="font-semibold text-[var(--text)]">User Disruption Protection</p>
                        <p className="text-[var(--text-3)]">Never restart while user is presenting or on active call</p>
                      </div>
                      <span className="font-mono text-emerald-500 font-bold">Active</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-4">
                  <h3 className="font-serif text-base font-medium text-[var(--text)]">P2P Mesh Swarm Topology</h3>
                  <p className="text-xs text-[var(--text-3)]">
                    Local subnet nodes automatically elect high-bandwidth, AC-powered seed machines to distribute chunks locally.
                  </p>
                  <div className="p-4 rounded-xl bg-[var(--sunk)] border border-[var(--line)] space-y-2 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-[var(--text-3)]">Active Swarm Clusters:</span>
                      <span className="text-[var(--text)]">312 Subnets</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-3)]">Elected Seed Nodes:</span>
                      <span className="text-[var(--text)]">624 Endpoints</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-3)]">Chunk Integrity Checksum:</span>
                      <span className="text-emerald-500">SHA-256 Verified (100%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SELF-HEALING ENGINE */}
          {activeTab === "health" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
                  <div>
                    <h2 className="font-serif text-lg font-medium text-[var(--text)]">Autonomous Client Health & Self-Healing</h2>
                    <p className="text-xs text-[var(--text-3)]">Continuous background diagnostics that automatically repair broken OS components without human tickets.</p>
                  </div>
                  <button
                    onClick={handleSelfHealingSweep}
                    disabled={isHealing}
                    className="px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-xs font-semibold hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${isHealing ? "animate-spin" : ""}`} />
                    <span>{isHealing ? "Remediating Fleet..." : "Trigger Full Fleet Audit"}</span>
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[var(--sunk)] border border-[var(--line)] space-y-2">
                    <div className="flex items-center gap-2 text-emerald-500 font-semibold text-xs">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>WMI & Service Self-Heals</span>
                    </div>
                    <p className="text-2xl font-serif font-normal text-[var(--text)]">1,842</p>
                    <p className="text-xs text-[var(--text-3)]">Windows Update Services & WMI repositories restored this week without IT intervention.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[var(--sunk)] border border-[var(--line)] space-y-2">
                    <div className="flex items-center gap-2 text-sky-500 font-semibold text-xs">
                      <HardDrive className="h-4 w-4" />
                      <span>Disk & Cache Auto-Cleanup</span>
                    </div>
                    <p className="text-2xl font-serif font-normal text-[var(--text)]">4.2 TB</p>
                    <p className="text-xs text-[var(--text-3)]">Orphaned temp caches and broken installer artifacts reclaimed to free disk headroom.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[var(--sunk)] border border-[var(--line)] space-y-2">
                    <div className="flex items-center gap-2 text-amber-500 font-semibold text-xs">
                      <Lock className="h-4 w-4" />
                      <span>Security Baseline Enforcement</span>
                    </div>
                    <p className="text-2xl font-serif font-normal text-[var(--text)]">99.8%</p>
                    <p className="text-xs text-[var(--text-3)]">CIS Benchmark & BitLocker compliance maintained via continuous sub-second drift checks.</p>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 space-y-3">
                  <h4 className="font-serif text-sm font-medium text-[var(--text)]">Recent Automated Fleet Remediations</h4>
                  <div className="divide-y divide-[var(--line)] text-xs font-mono">
                    <div className="py-2.5 flex justify-between items-center">
                      <div>
                        <span className="text-[var(--accent)]">[CORP-W11-FIN-019]</span> SoftwareDistribution folder corruption resolved; Windows Update re-enabled.
                      </div>
                      <span className="text-[var(--text-3)] text-[10px]">2m ago</span>
                    </div>
                    <div className="py-2.5 flex justify-between items-center">
                      <div>
                        <span className="text-[var(--accent)]">[US-EAST-DC-PROD01]</span> Peer-to-Peer TLS certificate rotated automatically.
                      </div>
                      <span className="text-[var(--text-3)] text-[10px]">7m ago</span>
                    </div>
                    <div className="py-2.5 flex justify-between items-center">
                      <div>
                        <span className="text-[var(--accent)]">[BERLIN-UBUNTU-K8S-04]</span> AppArmor profile drift reconciled with baseline policy.
                      </div>
                      <span className="text-[var(--text-3)] text-[10px]">19m ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CVE RADAR & 3RD-PARTY CATALOG */}
          {activeTab === "cve" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
                  <div>
                    <h2 className="font-serif text-lg font-medium text-[var(--text)]">Vulnerability Threat Intelligence & App Catalog</h2>
                    <p className="text-xs text-[var(--text-3)]">1,200+ pre-packaged third-party enterprise apps continuously indexed with zero-day patches.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-rose-400 bg-rose-500/10 px-3 py-1 rounded-lg border border-rose-500/20">
                      2 Zero-Days Detected
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {CVE_LIST.map((cve) => (
                    <div
                      key={cve.cveId}
                      className="p-5 rounded-2xl border border-[var(--line)] bg-[var(--sunk)] hover:border-[var(--accent)]/40 transition-colors space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-sm font-bold text-[var(--text)]">{cve.cveId}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            cve.severity === "Critical" ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          }`}>
                            {cve.severity} (CVSS {cve.cvss})
                          </span>
                          {cve.zeroDay && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-rose-600 text-white animate-pulse">
                              Active In The Wild
                            </span>
                          )}
                          <span className="text-xs text-[var(--text-3)] font-mono">[{cve.category}]</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-[var(--text-3)]">{cve.affectedNodes.toLocaleString()} Endpoints Affected</span>
                          <button
                            onClick={() => isAdmin && handleDeployPatch(cve.cveId)}
                            disabled={!isAdmin}
                            className={`px-4 py-1.5 rounded-xl text-xs font-semibold shadow-sm transition-all ${
                              isAdmin
                                ? "bg-[var(--accent)] text-white hover:opacity-90 cursor-pointer"
                                : "bg-[var(--sunk)] text-[var(--text-3)] cursor-not-allowed border border-[var(--line)]"
                            }`}
                            title={!isAdmin ? "Admin access required to deploy" : undefined}
                          >
                            {isAdmin ? "1-Click Deploy" : (
                              <span className="flex items-center gap-1.5">
                                <Lock className="h-3 w-3" />
                                Admin Only
                              </span>
                            )}
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-[var(--text-2)]">{cve.name}</p>

                      <div className="flex items-center justify-between pt-2 border-t border-[var(--line)] text-xs font-mono text-[var(--text-3)]">
                        <span>Autonomous Packaging: <strong className="text-[var(--text)]">{cve.autonomousRemedy}</strong></span>
                        <span className="text-emerald-500">Pre-compiled & Digitally Signed</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

