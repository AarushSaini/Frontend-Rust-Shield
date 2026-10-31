"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const openCookiePreferences = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("open-cookie-settings"));
  };

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)] text-[var(--text-2)] transition-colors">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image src="/logo.png" alt="Rust Shield" width={40} height={40} className="object-contain" />
              </div>
              <span className="font-serif text-xl font-medium tracking-tight text-[var(--text)]">Rust Shield</span>
            </Link>
            <p className="text-sm max-w-sm text-[var(--text-2)] leading-relaxed">
              Autonomous Endpoint Management & Zero-Infrastructure Patch Delivery. Built with memory-safe Rust agents for zero-day immunity and 98% bandwidth reduction.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--sunk)] px-3 py-1 text-xs font-mono text-[var(--accent)]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Global Mesh: 99.999% Active
              </div>
              <span className="text-xs text-[var(--text-3)] font-mono">SOC 2 Type II Certified</span>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-[var(--text)]">Solutions</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/solutions/patch-management" className="hover:text-[var(--text)] transition-colors">
                  Patch Management
                </Link>
              </li>
              <li>
                <Link href="/solutions/autonomous-endpoint-management" className="hover:text-[var(--text)] transition-colors">
                  Autonomous Endpoint Mgt
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[var(--text)] transition-colors flex items-center gap-1.5 text-[var(--accent)] font-medium">
                  <span>Interactive Dashboard</span>
                  <span className="text-[10px] font-mono uppercase bg-[var(--accent)]/10 px-1.5 py-0.2 rounded">Demo</span>
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-[var(--text)] transition-colors">
                  Request a Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Products Column */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-[var(--text)]">Products</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products/onesite-patch" className="hover:text-[var(--text)] transition-colors">
                  OneSite Patch
                </Link>
              </li>
              <li>
                <Link href="/products/onesite-anywhere" className="hover:text-[var(--text)] transition-colors">
                  OneSite Anywhere
                </Link>
              </li>
              <li>
                <Link href="/products/onesite-health" className="hover:text-[var(--text)] transition-colors">
                  OneSite Health
                </Link>
              </li>
              <li>
                <a href="/solutions/autonomous-endpoint-management" className="hover:text-[var(--text)] transition-colors">
                  Memory-Safe Agent Specs
                </a>
              </li>
            </ul>
          </div>

          {/* Resources & Company Column */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-[var(--text)]">Company & Intel</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-[var(--text)] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/resources/case-studies" className="hover:text-[var(--text)] transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/resources/reports" className="hover:text-[var(--text)] transition-colors">
                  Analyst Reports
                </Link>
              </li>
              <li>
                <Link href="/resources/videos" className="hover:text-[var(--text)] transition-colors">
                  Product Videos
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[var(--text)] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[var(--text)] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--text)] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--line)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--text-3)]">
          <p suppressHydrationWarning>© {new Date().getFullYear()} Rust Shield Inc. All rights reserved. Memory-safe endpoint protection.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy" className="hover:text-[var(--text)] transition-colors">
              Privacy & Policy
            </Link>
            <a href="#" onClick={openCookiePreferences} className="hover:text-[var(--text)] transition-colors">
              Cookie Settings
            </a>
            <Link href="/contact" className="hover:text-[var(--text)] transition-colors">
              Security Disclosures
            </Link>
            <Link href="/privacy" className="hover:text-[var(--text)] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
