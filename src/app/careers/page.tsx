"use client";

import React, { useState } from "react";
import {
  Briefcase,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Terminal,
  Shield,
  Heart,
} from "lucide-react";

interface JobRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

const JOBS: JobRole[] = [
  {
    id: "rust-systems-eng",
    title: "Principal Rust Systems Engineer (Userspace & Windows Driver)",
    department: "Systems Core",
    location: "Remote (Global) / San Francisco / London",
    type: "Full-Time",
    description: "Architect and optimize our low-footprint endpoint client agent. You will write zero-copy asynchronous Rust, interact with Windows NT internals and macOS kexts, and guarantee sub-20MB resident memory bounds.",
    requirements: [
      "5+ years of production experience in Rust or modern C++ systems programming",
      "Deep understanding of OS internals (Windows WMI/Win32 APIs, Linux epoll, macOS kqueue)",
      "Passion for memory safety and zero-allocation network parsing",
    ],
  },
  {
    id: "p2p-architect",
    title: "Distributed P2P Mesh Architect",
    department: "Network Protocol",
    location: "Remote (Global) / Seattle",
    type: "Full-Time",
    description: "Design peer-to-peer swarming protocols that scale effortlessly across 100,000+ nodes in complex enterprise subnets. Implement dynamic seed master election and microsecond RTT bandwidth throttling algorithms.",
    requirements: [
      "Extensive background in peer-to-peer topologies (BitTorrent, Libp2p, Kademlia DHT)",
      "Expertise with NAT traversal, mTLS cryptographic handshakes, and UDP/QUIC multiplexing",
      "Proven ability to model network throughput mathematically and optimize under jitter",
    ],
  },
  {
    id: "sec-researcher",
    title: "Staff Security Researcher & Exploit Analyst",
    department: "Threat Intelligence",
    location: "Remote (US / EU)",
    type: "Full-Time",
    description: "Track global zero-day advisories from CISA, MSRC, and academic researchers. Design automated telemetry tests that simulate adversarial exploits and verify third-party application package integrity.",
    requirements: [
      "Demonstrated track record of reverse engineering enterprise vulnerabilities (CVE disclosures)",
      "Fluency with binary diffing, sandbox instrumentation, and exploit mitigation verification",
      "Experience automating silent installation and MSI/AppX packaging at scale",
    ],
  },
  {
    id: "solutions-architect",
    title: "Senior Enterprise Solutions Architect",
    department: "Customer Engineering",
    location: "New York / London / Remote",
    type: "Full-Time",
    description: "Partner directly with CISOs and Enterprise Infrastructure Architects at Fortune 500 banks, healthcare networks, and aerospace giants to design and execute zero-downtime migrations from legacy WSUS/SCCM.",
    requirements: [
      "Extensive experience architecting enterprise endpoint estates with 50,000+ endpoints",
      "Deep familiarity with SCCM/MECM, Microsoft Intune, BigFix, and Active Directory / Kerberos",
      "Outstanding communication skills for technical and executive C-suite presentations",
    ],
  },
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<JobRole | null>(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSuccess(true);
    setTimeout(() => {
      setAppliedSuccess(false);
      setSelectedJob(null);
      setApplicantName("");
      setApplicantEmail("");
    }, 2500);
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3.5 py-1 text-xs font-mono font-medium text-[var(--accent)]">
              <Briefcase className="h-3.5 w-3.5" />
              <span>Join Rust Shield Engineering</span>
            </div>

            <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--text)] leading-[1.12]">
              Build the memory-safe future of enterprise infrastructure.
            </h1>

            <p className="mt-6 text-lg text-[var(--text-2)] leading-relaxed font-sans">
              We are a distributed team of systems engineers, protocol designers, and security researchers eliminating buffer overflows and remote distribution servers. Join us in making the world&apos;s critical infrastructure impervious to memory corruption.
            </p>
          </div>
        </div>
      </section>

      {/* Engineering Culture Pillars */}
      <section className="py-20 border-b border-[var(--line)] bg-[var(--surface)]/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                <Terminal className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[var(--text)]">Pure Rust Systems Craft</h3>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                We believe memory safety should not require performance compromises. We write zero-allocation code, profile memory relentlessly, and take pride in binary craftsmanship.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Heart className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[var(--text)]">Asynchronous, Deep-Work First</h3>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                Minimal recurring meetings. We write comprehensive RFCs, value rigorous design reviews, and give our engineers uninterrupted time to tackle hard distributed systems problems.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[var(--text)]">Global Impact</h3>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                Your code runs across millions of mission-critical machines in pediatric hospitals, aerospace defense networks, and global financial exchanges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions List */}
      <section className="py-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
              Current Openings
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[var(--text)]">
              Find your next challenge
            </h2>
          </div>

          <div className="mt-12 space-y-6">
            {JOBS.map((job) => (
              <div
                key={job.id}
                className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 hover:border-[var(--accent)]/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono uppercase bg-[var(--accent)]/10 text-[var(--accent)] px-2.5 py-0.5 rounded font-semibold">
                      {job.department}
                    </span>
                    <span className="text-xs font-mono text-[var(--text-3)] flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {job.location}
                    </span>
                    <span className="text-xs font-mono text-[var(--text-3)]">• {job.type}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-normal text-[var(--text)]">{job.title}</h3>
                  <p className="text-xs text-[var(--text-2)] leading-relaxed">{job.description}</p>
                </div>

                <div className="flex-shrink-0">
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-xs font-semibold text-white hover:opacity-90 transition-opacity"
                  >
                    <span>View Role & Apply</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Drawer / Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
              <div>
                <h3 className="font-serif text-lg font-medium text-[var(--text)]">{selectedJob.title}</h3>
                <p className="text-xs font-mono text-[var(--accent)]">{selectedJob.department} • {selectedJob.location}</p>
              </div>
              <button onClick={() => setSelectedJob(null)} className="text-[var(--text-3)] hover:text-[var(--text)]">✕</button>
            </div>

            <div className="space-y-3 text-xs text-[var(--text-2)]">
              <p>{selectedJob.description}</p>
              <div>
                <h4 className="font-mono text-xs font-bold uppercase text-[var(--text)] mb-1.5">Key Qualifications:</h4>
                <ul className="space-y-1">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {appliedSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1">
                <CheckCircle2 className="h-6 w-6 text-emerald-500 mx-auto" />
                <p className="text-xs font-mono font-bold text-emerald-400">Application Received!</p>
                <p className="text-[11px] text-[var(--text-3)]">Our engineering leads will review your portfolio and reply within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-3 pt-2 border-t border-[var(--line)]">
                <div>
                  <label className="block text-[11px] font-mono text-[var(--text-3)] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Ada Lovelace"
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-xs text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[var(--text-3)] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    placeholder="ada@systems.org"
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-xs text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[var(--text-3)] mb-1">GitHub / Portfolio URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-xs text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="px-3.5 py-2 rounded-xl border border-[var(--line)] text-xs text-[var(--text-2)]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-xs font-semibold hover:opacity-90"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

