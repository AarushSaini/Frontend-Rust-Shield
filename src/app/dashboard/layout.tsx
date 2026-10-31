import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Operations Console | Rust Shield",
  description: "Real-time enterprise endpoint telemetry, autonomous patch deployment rings, and P2P mesh bandwidth intelligence.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased">
      {children}
    </div>
  );
}

