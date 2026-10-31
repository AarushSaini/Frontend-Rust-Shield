"use client";

import React, { useState, useEffect, useRef } from "react";
import { useToast } from "./Toast";
import {
  Terminal,
  Play,
  Pause,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Shield,
  Activity,
  ArrowRight,
} from "lucide-react";

interface LogEntry {
  id: string;
  time: string;
  tag: "P2P" | "SECURITY" | "HEALING" | "CANARY" | "KERNEL";
  message: string;
}

const INITIAL_LOGS: LogEntry[] = [
  { id: "1", time: "10:14:02", tag: "KERNEL", message: "Rust agent runtime initialized with zero-copy socket ring buffers. RAM bounds: 14.2 MB." },
  { id: "2", time: "10:14:03", tag: "SECURITY", message: "Memory Guardian: 0 heap corruptions or buffer overflow attempts detected (compile-time verified)." },
  { id: "3", time: "10:14:07", tag: "P2P", message: "Electing local seed master for subnet 10.14.88.0/24... Peer CORP-W11-FIN-019 selected (AC power 100%, 10G link)." },
  { id: "4", time: "10:14:12", tag: "HEALING", message: "Self-healing daemon repaired corrupt Windows Update catalog on node HEALTH-CLINIC-W10-18." },
  { id: "5", time: "10:14:18", tag: "CANARY", message: "Canary Ring 0 (150 VMs): Passed 100% soak test for KB5058814 without OS kernel faults." },
  { id: "6", time: "10:14:24", tag: "P2P", message: "Peer swarm throughput throttled: Yielded 85% bandwidth to active WebRTC VoIP stream." },
];

const PRESET_COMMANDS = [
  { cmd: "status", label: "Agent Status" },
  { cmd: "diagnostics", label: "Fleet Health Audit" },
  { cmd: "mesh-peers", label: "Active P2P Swarm" },
  { cmd: "cve-audit", label: "Zero-Day CVE Audit" },
];

export default function LiveTelemetryTerminal() {
  const { addToast } = useToast();
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [isStreaming, setIsStreaming] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string>("ALL");
  const [inputCommand, setInputCommand] = useState("");
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-generate realistic dynamic events
  useEffect(() => {
    if (!isStreaming) return;

    const STREAMING_TEMPLATES = [
      { tag: "P2P" as const, text: "Chunk Merkle Root SHA-256 #8fa9b verified on 34 peer nodes in subnet 10.18.2.0/24." },
      { tag: "HEALING" as const, text: "Auto-remedy: Flushed orphaned SoftwareDistribution datastore on 4 endpoints. 3.2 GB reclaimed." },
      { tag: "SECURITY" as const, text: "Mutual-TLS certificate validated for peer connection [10.22.104.14 <-> 10.22.104.88]." },
      { tag: "CANARY" as const, text: "Canary Ring 1 advanced: 2,500 pilot nodes patched. Telemetry crash rate: 0.00%." },
      { tag: "KERNEL" as const, text: "Continuous borrow-checker audit: Zero memory leaks across 48,290 active agent threads." },
    ];

    const interval = setInterval(() => {
      const template = STREAMING_TEMPLATES[Math.floor(Math.random() * STREAMING_TEMPLATES.length)];
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", { hour12: false });

      setLogs((prev) => [
        ...prev.slice(-25), // keep last 25 entries
        {
          id: Math.random().toString(),
          time: timeStr,
          tag: template.tag,
          message: template.text,
        },
      ]);
    }, 3200);

    return () => clearInterval(interval);
  }, [isStreaming]);

  // Scroll to bottom on new log
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-US", { hour12: false });

    let responseMessage = "";
    if (trimmed === "status") {
      responseMessage = "RUST SHIELD DAEMON: Active | RAM: 16.8 MB | CPU: 0.04% | Peers: 48,290 | Kernel: OK";
    } else if (trimmed === "diagnostics") {
      responseMessage = "AUDIT COMPLETE: 48,290 nodes scanned. 100% BitLocker active, 100% EDR daemons verified.";
    } else if (trimmed === "mesh-peers") {
      responseMessage = "SWARM REPORT: 312 local clusters active. 624 Seed masters elected. WAN Offload: 98.7%.";
    } else if (trimmed === "cve-audit") {
      responseMessage = "CVE SCAN: Ingested 2 Zero-Day advisories. Automated canary rollouts dispatched to Ring 0.";
    } else {
      responseMessage = `Executed: "${trimmed}". Result: Operation succeeded. Telemetry stream synchronized.`;
    }

    setLogs((prev) => [
      ...prev,
      { id: Math.random().toString(), time: timeStr, tag: "SECURITY", message: `$ rust-shield-cli ${trimmed}` },
      { id: Math.random().toString(), time: timeStr, tag: "KERNEL", message: `> ${responseMessage}` },
    ]);

    setInputCommand("");
    addToast({
      title: "CLI Command Dispatched",
      message: `rust-shield-cli: ${trimmed}`,
      type: "info",
    });
  };

  const handleCopyLogs = () => {
    const text = logs.map((l) => `[${l.time}] [${l.tag}] ${l.message}`).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    addToast({
      title: "Telemetry Copied",
      message: "Terminal logs copied to clipboard.",
      type: "success",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredLogs = logs.filter((l) => selectedTag === "ALL" || l.tag === selectedTag);

  return (
    <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 shadow-2xl space-y-5 overflow-hidden">
      {/* Terminal Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[var(--text)]">rust-shield-agent.daemon</span>
              <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Swarm Feed
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--sunk)] hover:bg-[var(--surface)] text-xs font-mono text-[var(--text)] transition-colors"
          >
            {isStreaming ? <Pause className="h-3 w-3 text-amber-500" /> : <Play className="h-3 w-3 text-emerald-500" />}
            <span>{isStreaming ? "Pause Stream" : "Resume Stream"}</span>
          </button>

          <button
            onClick={handleCopyLogs}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--sunk)] hover:bg-[var(--surface)] text-xs font-mono text-[var(--text)] transition-colors"
          >
            {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
            <span>{copied ? "Copied" : "Copy Logs"}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
        {["ALL", "KERNEL", "SECURITY", "P2P", "HEALING", "CANARY"].map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-lg transition-colors whitespace-nowrap ${
              selectedTag === tag
                ? "bg-[var(--accent)] text-white font-semibold"
                : "bg-[var(--sunk)] text-[var(--text-3)] hover:text-[var(--text)]"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Main Terminal Output Area */}
      <div
        ref={scrollRef}
        className="h-64 sm:h-72 w-full rounded-2xl bg-[#0d0f12] text-[#e2e8f0] p-4 sm:p-5 font-mono text-xs overflow-y-auto space-y-2 border border-slate-800 shadow-inner"
      >
        {filteredLogs.map((log) => {
          const isKernel = log.tag === "KERNEL";
          const isSecurity = log.tag === "SECURITY";
          const isP2p = log.tag === "P2P";
          const isHealing = log.tag === "HEALING";
          const isCanary = log.tag === "CANARY";

          const tagColor = isKernel
            ? "text-sky-400 bg-sky-500/10"
            : isSecurity
            ? "text-emerald-400 bg-emerald-500/10"
            : isP2p
            ? "text-teal-400 bg-teal-500/10"
            : isHealing
            ? "text-amber-400 bg-amber-500/10"
            : "text-purple-400 bg-purple-500/10";

          return (
            <div key={log.id} className="flex items-start gap-2.5 leading-relaxed hover:bg-white/5 p-1 rounded transition-colors">
              <span className="text-slate-500 select-none text-[11px] flex-shrink-0">{log.time}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold uppercase flex-shrink-0 ${tagColor}`}>
                {log.tag}
              </span>
              <span className="text-slate-300 break-words">{log.message}</span>
            </div>
          );
        })}
      </div>

      {/* Interactive Command Input & Presets */}
      <div className="space-y-3 pt-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(inputCommand);
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-2.5 text-[var(--accent)] font-mono text-xs font-bold">$</span>
            <input
              type="text"
              placeholder="Type an interactive command (e.g. status, diagnostics, mesh-peers)..."
              value={inputCommand}
              onChange={(e) => setInputCommand(e.target.value)}
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] pl-8 pr-4 py-2 text-xs font-mono text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-xs font-mono font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            <span>Execute</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>

        {/* Quick click pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-mono text-[var(--text-3)]">Quick commands:</span>
          {PRESET_COMMANDS.map((p) => (
            <button
              key={p.cmd}
              onClick={() => handleCommand(p.cmd)}
              className="text-[10px] font-mono px-2.5 py-1 rounded-lg border border-[var(--line)] bg-[var(--sunk)] hover:bg-[var(--accent)]/10 hover:border-[var(--accent)] text-[var(--text-2)] hover:text-[var(--accent)] transition-all"
            >
              {p.cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

