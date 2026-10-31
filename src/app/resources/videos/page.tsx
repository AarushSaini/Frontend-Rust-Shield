"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Video,
  Play,
  Clock,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  Terminal,
  Activity,
  CheckCircle2,
} from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  duration: string;
  category: "Architecture" | "Zero-Day Response" | "Canary Staging" | "Self-Healing";
  thumbnailColor: string;
  speaker: string;
  description: string;
  highlights: string[];
}

const VIDEOS: VideoItem[] = [
  {
    id: "zero-day-walkthrough",
    title: "Live Walkthrough: Remediating a Remote Code Execution 0-Day Across 50,000 Nodes in 14 Minutes",
    duration: "8:42",
    category: "Zero-Day Response",
    thumbnailColor: "from-emerald-950 via-[var(--surface)] to-[var(--bg)]",
    speaker: "Evelyn Vance, Lead Systems Architect",
    description: "Watch a live simulation as an emergency zero-day vulnerability (CVSS 9.8) is ingested into Rust Shield. Observe autonomous binary packaging, multi-ring canary deployment, and local P2P swarm delivery across 38 enterprise subnets.",
    highlights: ["Autonomous CISA KEV ingestion", "Zero WAN congestion over 10G mesh", "Automated canary health telemetry"],
  },
  {
    id: "p2p-mesh-deep-dive",
    title: "Under the Hood: Why Rust Shield P2P Swarming Destroys Distribution Point Bottlenecks",
    duration: "12:15",
    category: "Architecture",
    thumbnailColor: "from-sky-950 via-[var(--surface)] to-[var(--bg)]",
    speaker: "Dr. Marcus Wei, VP of Network Engineering",
    description: "A deep architectural breakdown comparing traditional SCCM/WSUS branch servers and cloud egress models against Rust Shield's zero-copy Rust socket swarm protocol.",
    highlights: ["Dynamic seed machine election", "Microsecond RTT yielding to VoIP/Zoom", "Differential binary compression"],
  },
  {
    id: "canary-rollback-demo",
    title: "Canary Rollout Rings & Rollback Insurance in Action: Stopping Bad Vendor Patches",
    duration: "6:50",
    category: "Canary Staging",
    thumbnailColor: "from-amber-950 via-[var(--surface)] to-[var(--bg)]",
    speaker: "Sara Lindqvist, Principal SecOps Engineer",
    description: "See what happens when a third-party software vendor releases a flawed update that induces blue screen crashes. Watch Rust Shield's circuit breaker automatically freeze rollout and trigger safe instant rollback.",
    highlights: ["Crash rate telemetry triggers", "Automated Ring 0 circuit breaker", "Instant rollback within 90 seconds"],
  },
  {
    id: "self-healing-client",
    title: "Continuous Client Self-Healing: Eliminating Broken WMI and Hung Update Daemons",
    duration: "9:18",
    category: "Self-Healing",
    thumbnailColor: "from-purple-950 via-[var(--surface)] to-[var(--bg)]",
    speaker: "David Chen, Client Core Team",
    description: "Watch the Rust Shield lightweight agent automatically detect and repair broken Windows Update components, hung WMI threads, and corrupted registry keys without a user reboot.",
    highlights: ["Automated WMI repository salvaging", "Zero user disruption", "RAM footprint verified < 20 MB"],
  },
];

export default function VideosPage() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3.5 py-1 text-xs font-mono font-medium text-[var(--accent)]">
              <Video className="h-3.5 w-3.5" />
              <span>Technical Demos & Architecture Clips</span>
            </div>

            <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--text)] leading-[1.12]">
              Watch Rust Shield in action.
            </h1>

            <p className="mt-6 text-lg text-[var(--text-2)] leading-relaxed font-sans">
              Explore step-by-step product walkthroughs, live architectural experiments, and security demonstrations recorded directly by our systems engineers.
            </p>
          </div>
        </div>
      </section>

      {/* Videos Showcase */}
      <section className="py-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {VIDEOS.map((video) => (
              <div
                key={video.id}
                className="group rounded-3xl border border-[var(--line)] bg-[var(--surface)] overflow-hidden hover:border-[var(--accent)]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Banner */}
                  <div
                    onClick={() => {
                      setActiveVideo(video);
                    }}
                    className={`relative h-56 w-full bg-gradient-to-br ${video.thumbnailColor} p-6 flex flex-col justify-between cursor-pointer border-b border-[var(--line)] overflow-hidden`}
                  >
                    <div className="flex items-center justify-between z-10">
                      <span className="text-[10px] font-mono uppercase bg-black/50 backdrop-blur-md text-white px-2.5 py-1 rounded">
                        {video.category}
                      </span>
                      <span className="text-xs font-mono text-white/80 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {video.duration}
                      </span>
                    </div>

                    {/* Big Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                        <Play className="h-7 w-7 fill-white translate-x-0.5" />
                      </div>
                    </div>

                    <div className="z-10 text-[11px] font-mono text-white/70">
                      Speaker: {video.speaker}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-serif text-xl font-normal text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                      {video.title}
                    </h3>
                    <p className="text-xs text-[var(--text-2)] leading-relaxed">{video.description}</p>

                    <div className="pt-2 border-t border-[var(--line)] flex flex-wrap gap-2">
                      {video.highlights.map((h, i) => (
                        <span key={i} className="text-[10px] font-mono bg-[var(--sunk)] border border-[var(--line)] px-2 py-0.5 rounded text-[var(--text-3)]">
                          • {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => {
                      setActiveVideo(video);
                    }}
                    className="w-full py-2.5 rounded-xl border border-[var(--line)] bg-[var(--sunk)] text-xs font-mono font-medium text-[var(--text)] hover:bg-[var(--accent)] hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="h-3 w-3 fill-current" />
                    <span>Launch Interactive Player</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-3xl rounded-3xl border border-[var(--line)] bg-[var(--surface)] overflow-hidden shadow-2xl space-y-4">
            <div className="p-4 border-b border-[var(--line)] flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-medium text-[var(--text)]">{activeVideo.title}</h3>
                <p className="text-xs font-mono text-[var(--text-3)]">{activeVideo.speaker} • {activeVideo.duration}</p>
              </div>
              <button onClick={() => setActiveVideo(null)} className="text-[var(--text-3)] hover:text-[var(--text)] text-sm">✕</button>
            </div>

            {/* Video Canvas Simulation */}
            <div className="relative aspect-video w-full bg-black flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center animate-pulse">
                <Shield className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <p className="font-serif text-lg text-white">Interactive Video Stream: Ready</p>
                <p className="text-xs font-mono text-emerald-400">Stream Source: CDN Edge Cluster (1080p 60fps)</p>
              </div>
              <p className="text-xs text-white/60 max-w-lg">
                &ldquo;Observing autonomous peer election across subnet 10.14.88.0/24... 150 canary nodes verified healthy. Advancing canary pipeline.&rdquo;
              </p>
            </div>

            <div className="p-4 pt-0 flex justify-between items-center text-xs">
              <Link href="/dashboard" className="text-[var(--accent)] font-mono hover:underline">
                Open Operations Console to see this live →
              </Link>
              <button
                onClick={() => setActiveVideo(null)}
                className="px-4 py-2 rounded-xl bg-[var(--sunk)] border border-[var(--line)] text-xs text-[var(--text)]"
              >
                Close Player
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[var(--text)]">
            Prefer a personalized technical briefing?
          </h2>
          <p className="text-base text-[var(--text-2)] max-w-2xl mx-auto">
            Our systems architects will demonstrate Rust Shield live on your actual network topology.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/demo"
              className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Book Live Architect Session
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl border border-[var(--line)] bg-[var(--bg)] px-6 py-3.5 text-sm font-medium text-[var(--text)] hover:bg-[var(--sunk)] transition-colors"
            >
              Launch Operations Console
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

