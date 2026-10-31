"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import CommandPalette from "./CommandPalette";
import { useAuth } from "./AuthProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // All hooks must be declared before any early returns
  useEffect(() => {
    try {
      const saved = localStorage.getItem("brindle-theme");
      const isDark =
        saved === "dark" ||
        (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
      if (isDark) {
        document.documentElement.classList.add("dark");
        document.documentElement.setAttribute("data-theme", "dark");
        setTheme("dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.setAttribute("data-theme", "light");
        setTheme("light");
      }
    } catch {}
  }, []);

  // BUG-05 FIX: Close all dropdowns when clicking outside the navbar (touch/keyboard support)
  useEffect(() => {
    const handleClickOutside = () => {
      setSolutionsOpen(false);
      setProductsOpen(false);
      setResourcesOpen(false);
      setCompanyOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
    try {
      localStorage.setItem("brindle-theme", next);
    } catch {}
  };

  // Early return after all hooks
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative h-11 w-11 flex-shrink-0 transition-transform group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Rust Shield Logo"
              width={44}
              height={44}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-medium tracking-tight text-[var(--text)]">
              Rust Shield
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
              Autonomous Endpoint Sec
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[14.5px] font-medium text-[var(--text-2)]">
          {/* Solutions Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-[var(--text)] hover:bg-[var(--sunk)] transition-colors">
              <span>Solutions</span>
              <svg className={`h-3.5 w-3.5 transition-transform ${solutionsOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {solutionsOpen && (
              <div className="absolute top-full left-0 w-80 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                <Link
                  href="/solutions/patch-management"
                  className="block rounded-xl p-3 hover:bg-[var(--sunk)] transition-colors group"
                >
                  <p className="font-medium text-[var(--text)] group-hover:text-[var(--accent)] text-sm">Patch Management Software</p>
                  <p className="text-xs text-[var(--text-3)] mt-0.5">Automated OS & 3rd-party vulnerability patching with zero WAN congestion.</p>
                </Link>
                <Link
                  href="/solutions/autonomous-endpoint-management"
                  className="block rounded-xl p-3 hover:bg-[var(--sunk)] transition-colors group"
                >
                  <p className="font-medium text-[var(--text)] group-hover:text-[var(--accent)] text-sm">Autonomous Endpoint Management</p>
                  <p className="text-xs text-[var(--text-3)] mt-0.5">Continuous telemetry, self-healing audits, and sub-second fleet visibility.</p>
                </Link>
              </div>
            )}
          </div>

          {/* Products Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-[var(--text)] hover:bg-[var(--sunk)] transition-colors">
              <span>Products</span>
              <svg className={`h-3.5 w-3.5 transition-transform ${productsOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {productsOpen && (
              <div className="absolute top-full left-0 w-80 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                <Link href="/products/onesite-patch" className="block rounded-xl p-3 hover:bg-[var(--sunk)] transition-colors group">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-[var(--text)] group-hover:text-[var(--accent)] text-sm">OneSite Patch</p>
                    <span className="text-[10px] font-mono bg-[var(--accent)]/10 text-[var(--accent)] px-2 py-0.5 rounded">Autonomous</span>
                  </div>
                  <p className="text-xs text-[var(--text-3)] mt-0.5">Autonomous metadata curation and staging across thousands of apps.</p>
                </Link>
                <Link href="/products/onesite-anywhere" className="block rounded-xl p-3 hover:bg-[var(--sunk)] transition-colors group">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-[var(--text)] group-hover:text-[var(--accent)] text-sm">OneSite Anywhere</p>
                    <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded">P2P Mesh</span>
                  </div>
                  <p className="text-xs text-[var(--text-3)] mt-0.5">Zero-infrastructure content distribution over peer-to-peer mesh networks.</p>
                </Link>
                <Link href="/products/onesite-health" className="block rounded-xl p-3 hover:bg-[var(--sunk)] transition-colors group">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-[var(--text)] group-hover:text-[var(--accent)] text-sm">OneSite Health</p>
                    <span className="text-[10px] font-mono bg-sky-500/10 text-sky-500 px-2 py-0.5 rounded">Self-Healing</span>
                  </div>
                  <p className="text-xs text-[var(--text-3)] mt-0.5">Continuous diagnostics, automated remediations, and compliance verification.</p>
                </Link>
              </div>
            )}
          </div>

          {/* Resources Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-[var(--text)] hover:bg-[var(--sunk)] transition-colors">
              <span>Resources</span>
              <svg className={`h-3.5 w-3.5 transition-transform ${resourcesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {resourcesOpen && (
              <div className="absolute top-full left-0 w-72 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                <Link href="/resources/case-studies" className="block rounded-xl p-3 hover:bg-[var(--sunk)] transition-colors group">
                  <p className="font-medium text-[var(--text)] group-hover:text-[var(--accent)] text-sm">Case Studies</p>
                  <p className="text-xs text-[var(--text-3)] mt-0.5">Enterprise proof across Banking, Healthcare, and Defense.</p>
                </Link>
                <Link href="/resources/reports" className="block rounded-xl p-3 hover:bg-[var(--sunk)] transition-colors group">
                  <p className="font-medium text-[var(--text)] group-hover:text-[var(--accent)] text-sm">Reports & Whitepapers</p>
                  <p className="text-xs text-[var(--text-3)] mt-0.5">Independent analyst evaluations and vulnerability trends.</p>
                </Link>
                <Link href="/resources/videos" className="block rounded-xl p-3 hover:bg-[var(--sunk)] transition-colors group">
                  <p className="font-medium text-[var(--text)] group-hover:text-[var(--accent)] text-sm">Video Demos</p>
                  <p className="text-xs text-[var(--text-3)] mt-0.5">Architectural deep dives and automated rollout clips.</p>
                </Link>
              </div>
            )}
          </div>

          {/* Company Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setCompanyOpen(true)}
            onMouseLeave={() => setCompanyOpen(false)}
          >
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-[var(--text)] hover:bg-[var(--sunk)] transition-colors">
              <span>Company</span>
              <svg className={`h-3.5 w-3.5 transition-transform ${companyOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {companyOpen && (
              <div className="absolute top-full right-0 w-64 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                <Link href="/about" className="block rounded-xl p-2.5 hover:bg-[var(--sunk)] transition-colors group">
                  <p className="font-medium text-[var(--text)] group-hover:text-[var(--accent)] text-sm">About Rust Shield</p>
                  <p className="text-xs text-[var(--text-3)]">Our memory-safe mission and team.</p>
                </Link>
                <Link href="/faq" className="block rounded-xl p-2.5 hover:bg-[var(--sunk)] transition-colors group">
                  <p className="font-medium text-[var(--text)] group-hover:text-[var(--accent)] text-sm">FAQ</p>
                  <p className="text-xs text-[var(--text-3)]">Answers to common judge & client questions.</p>
                </Link>
                <Link href="/careers" className="block rounded-xl p-2.5 hover:bg-[var(--sunk)] transition-colors group">
                  <p className="font-medium text-[var(--text)] group-hover:text-[var(--accent)] text-sm">Careers</p>
                  <p className="text-xs text-[var(--text-3)]">Join our systems security engineering team.</p>
                </Link>
                <Link href="/contact" className="block rounded-xl p-2.5 hover:bg-[var(--sunk)] transition-colors group">
                  <p className="font-medium text-[var(--text)] group-hover:text-[var(--accent)] text-sm">Contact Us</p>
                  <p className="text-xs text-[var(--text-3)]">Direct enterprise inquiries and support.</p>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          {/* Global Quick Command Palette Trigger */}
          <CommandPalette />

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--sunk)] transition-colors"
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            suppressHydrationWarning
          >
            {theme === "dark" ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="5" strokeWidth={2} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {user ? (
            /* Logged-in user pill */
            <div className="hidden sm:flex items-center gap-2">
              {/* Live Dashboard link */}
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent)]/10 px-4 py-2 text-xs font-semibold text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Dashboard
              </Link>

              {/* Avatar + name dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text)] hover:bg-[var(--sunk)] transition-colors">
                  <span className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{ background: user.role === "admin" ? "var(--accent)" : "#0ea5e9", color: "white" }}
                  >
                    {user.avatar}
                  </span>
                  <span className="max-w-[80px] truncate">{user.name.split(" ")[0]}</span>
                  <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded ${user.role === "admin" ? "bg-[var(--accent)]/10 text-[var(--accent)]" : "bg-sky-500/10 text-sky-400"}`}>
                    {user.role}
                  </span>
                </button>

                {/* Hover dropdown */}
                <div className="absolute top-full right-0 mt-1 w-52 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-2 shadow-xl backdrop-blur-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  <div className="px-3 py-2 border-b border-[var(--line)]/50 mb-1">
                    <p className="text-sm font-medium text-[var(--text)]">{user.name}</p>
                    <p className="text-xs text-[var(--text-3)] truncate">{user.email}</p>
                  </div>
                  <Link href="/dashboard" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-[var(--text-2)] hover:bg-[var(--sunk)] hover:text-[var(--text)] transition-colors">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors text-left"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Not logged in */
            <>
              {/* Live Dashboard Button */}
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent)]/10 px-4 py-2 text-xs font-semibold text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Dashboard</span>
              </Link>

              {/* Sign In */}
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--text)] hover:bg-[var(--sunk)] transition-all"
              >
                Sign In
              </Link>
            </>
          )}

          {/* Request a Demo CTA */}
          <Link
            href="/demo"
            className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-90 active:scale-95 transition-all"
          >
            Request a Demo
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[var(--text)]"
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-b border-[var(--line)] bg-[var(--bg)] px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent)] font-semibold px-2">Solutions</p>
            <Link href="/solutions/patch-management" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-[var(--sunk)]">
              Patch Management Software
            </Link>
            <Link href="/solutions/autonomous-endpoint-management" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-[var(--sunk)]">
              Autonomous Endpoint Management
            </Link>
          </div>

          <div className="space-y-1 pt-2 border-t border-[var(--line)]/50">
            <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent)] font-semibold px-2">Products</p>
            <Link href="/products/onesite-patch" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-[var(--sunk)]">OneSite Patch</Link>
            <Link href="/products/onesite-anywhere" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-[var(--sunk)]">OneSite Anywhere</Link>
            <Link href="/products/onesite-health" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-[var(--sunk)]">OneSite Health</Link>
          </div>

          <div className="space-y-1 pt-2 border-t border-[var(--line)]/50">
            <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent)] font-semibold px-2">Resources</p>
            <Link href="/resources/case-studies" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-[var(--sunk)]">Case Studies</Link>
            <Link href="/resources/reports" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-[var(--sunk)]">Reports & Whitepapers</Link>
            <Link href="/resources/videos" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-[var(--sunk)]">Videos & Demos</Link>
          </div>

          <div className="space-y-1 pt-2 border-t border-[var(--line)]/50">
            <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent)] font-semibold px-2">Company</p>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-[var(--sunk)]">About Us</Link>
            <Link href="/faq" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-[var(--sunk)]">FAQ</Link>
            <Link href="/careers" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-[var(--sunk)]">Careers</Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-[var(--sunk)]">Contact</Link>
          </div>

          <div className="pt-4 border-t border-[var(--line)] flex flex-col gap-2">
            <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 rounded-xl border border-[var(--accent)] py-2.5 text-xs font-semibold text-[var(--accent)]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Open Live Dashboard
            </Link>
            {user ? (
              <button
                onClick={() => { logout(); setMobileOpen(false); }}
                className="flex items-center justify-center gap-2 rounded-xl border border-red-500/30 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
              >
                Sign Out ({user.name.split(" ")[0]})
              </button>
            ) : (
              <Link href="/login" onClick={() => setMobileOpen(false)} className="flex items-center justify-center rounded-xl border border-[var(--line)] py-2.5 text-xs font-semibold text-[var(--text-2)]">
                Sign In
              </Link>
            )}
            <Link href="/demo" onClick={() => setMobileOpen(false)} className="flex items-center justify-center rounded-xl bg-[var(--accent)] py-2.5 text-xs font-semibold text-white">
              Request a Demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
