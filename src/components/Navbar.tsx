"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import {
  ChevronDown,
  Sun,
  Moon,
  Shield,
  Activity,
  Zap,
  Network,
  FileText,
  Video,
  Building2,
  HelpCircle,
  Briefcase,
  Mail,
  Info,
  Menu,
  X,
  ArrowRight,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const navRef = useRef<HTMLElement>(null);

  // Load theme preference on mount
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

  // Close dropdowns on outside click or escape
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
        setUserMenuOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setUserMenuOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("click", handleOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setUserMenuOpen(false);
  }, [pathname]);

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

  // Do not render top marketing navbar on standalone dashboard pages
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 w-full border-b border-[var(--line)]/70 bg-[var(--bg)]/85 backdrop-blur-xl transition-colors duration-200"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative h-8 w-8 flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Rust Shield Logo"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-sans text-[16px] font-bold tracking-tight text-[var(--text)]">
              Rust Shield
            </span>
            <span className="hidden sm:inline-flex items-center rounded-md bg-[var(--accent)]/10 px-2 py-0.5 text-[10px] font-mono font-medium text-[var(--accent)] border border-[var(--accent)]/20">
              v3.8
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 text-[13.5px] font-medium text-[var(--text-2)]">
          {/* Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("solutions")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() =>
                setActiveDropdown(activeDropdown === "solutions" ? null : "solutions")
              }
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                activeDropdown === "solutions"
                  ? "text-[var(--text)] bg-[var(--surface)]"
                  : "hover:text-[var(--text)] hover:bg-[var(--surface)]"
              }`}
            >
              <span>Solutions</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  activeDropdown === "solutions" ? "rotate-180 text-[var(--text)]" : "text-[var(--text-3)]"
                }`}
              />
            </button>

            {activeDropdown === "solutions" && (
              <div className="absolute top-full left-0 pt-2 w-96 animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)]/95 p-2 shadow-2xl backdrop-blur-xl">
                  <Link
                    href="/solutions/patch-management"
                    className="flex items-start gap-3 rounded-xl p-3 hover:bg-[var(--sunk)] transition-colors group"
                  >
                    <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                      <Shield className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                        Patch Management Software
                      </p>
                      <p className="text-[11.5px] text-[var(--text-3)] leading-relaxed mt-0.5">
                        Automated OS and 3rd-party vulnerability patching with zero network strain.
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/solutions/autonomous-endpoint-management"
                    className="flex items-start gap-3 rounded-xl p-3 hover:bg-[var(--sunk)] transition-colors group"
                  >
                    <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      <Activity className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                        Autonomous Endpoint Management
                      </p>
                      <p className="text-[11.5px] text-[var(--text-3)] leading-relaxed mt-0.5">
                        Continuous telemetry, automated self-healing audits, and sub-second fleet visibility.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("products")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() =>
                setActiveDropdown(activeDropdown === "products" ? null : "products")
              }
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                activeDropdown === "products"
                  ? "text-[var(--text)] bg-[var(--surface)]"
                  : "hover:text-[var(--text)] hover:bg-[var(--surface)]"
              }`}
            >
              <span>Products</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  activeDropdown === "products" ? "rotate-180 text-[var(--text)]" : "text-[var(--text-3)]"
                }`}
              />
            </button>

            {activeDropdown === "products" && (
              <div className="absolute top-full left-0 pt-2 w-96 animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)]/95 p-2 shadow-2xl backdrop-blur-xl space-y-0.5">
                  <Link
                    href="/products/onesite-patch"
                    className="flex items-start gap-3 rounded-xl p-3 hover:bg-[var(--sunk)] transition-colors group"
                  >
                    <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                      <Shield className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                          OneSite Patch
                        </p>
                        <span className="text-[9px] font-mono uppercase bg-[var(--accent)]/15 text-[var(--accent)] px-1.5 py-0.5 rounded font-semibold">
                          Autonomous
                        </span>
                      </div>
                      <p className="text-[11.5px] text-[var(--text-3)] leading-relaxed mt-0.5">
                        Autonomous metadata curation and staging across thousands of apps.
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/products/onesite-anywhere"
                    className="flex items-start gap-3 rounded-xl p-3 hover:bg-[var(--sunk)] transition-colors group"
                  >
                    <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Network className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                          OneSite Anywhere
                        </p>
                        <span className="text-[9px] font-mono uppercase bg-emerald-500/15 text-emerald-400 px-1.5 py-0.5 rounded font-semibold">
                          P2P Mesh
                        </span>
                      </div>
                      <p className="text-[11.5px] text-[var(--text-3)] leading-relaxed mt-0.5">
                        Zero-infrastructure content distribution over intelligent peer-to-peer swarms.
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/products/onesite-health"
                    className="flex items-start gap-3 rounded-xl p-3 hover:bg-[var(--sunk)] transition-colors group"
                  >
                    <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                          OneSite Health
                        </p>
                        <span className="text-[9px] font-mono uppercase bg-sky-500/15 text-sky-400 px-1.5 py-0.5 rounded font-semibold">
                          Self-Healing
                        </span>
                      </div>
                      <p className="text-[11.5px] text-[var(--text-3)] leading-relaxed mt-0.5">
                        Continuous diagnostics, automated remediations, and compliance verification.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("resources")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() =>
                setActiveDropdown(activeDropdown === "resources" ? null : "resources")
              }
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                activeDropdown === "resources"
                  ? "text-[var(--text)] bg-[var(--surface)]"
                  : "hover:text-[var(--text)] hover:bg-[var(--surface)]"
              }`}
            >
              <span>Resources</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  activeDropdown === "resources" ? "rotate-180 text-[var(--text)]" : "text-[var(--text-3)]"
                }`}
              />
            </button>

            {activeDropdown === "resources" && (
              <div className="absolute top-full left-0 pt-2 w-80 animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)]/95 p-2 shadow-2xl backdrop-blur-xl space-y-0.5">
                  <Link
                    href="/resources/case-studies"
                    className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-[var(--sunk)] transition-colors group"
                  >
                    <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--sunk)] text-[var(--text-2)] group-hover:text-[var(--accent)]">
                      <Briefcase className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                        Case Studies
                      </p>
                      <p className="text-[11.5px] text-[var(--text-3)] mt-0.5">
                        Enterprise results across Banking, Healthcare, and Defense.
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/resources/reports"
                    className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-[var(--sunk)] transition-colors group"
                  >
                    <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--sunk)] text-[var(--text-2)] group-hover:text-[var(--accent)]">
                      <FileText className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                        Reports & Whitepapers
                      </p>
                      <p className="text-[11.5px] text-[var(--text-3)] mt-0.5">
                        Independent analyst evaluations and vulnerability trends.
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/resources/videos"
                    className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-[var(--sunk)] transition-colors group"
                  >
                    <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--sunk)] text-[var(--text-2)] group-hover:text-[var(--accent)]">
                      <Video className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                        Video Demos
                      </p>
                      <p className="text-[11.5px] text-[var(--text-3)] mt-0.5">
                        Architectural walkthroughs and autonomous rollout clips.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Company Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("company")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() =>
                setActiveDropdown(activeDropdown === "company" ? null : "company")
              }
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                activeDropdown === "company"
                  ? "text-[var(--text)] bg-[var(--surface)]"
                  : "hover:text-[var(--text)] hover:bg-[var(--surface)]"
              }`}
            >
              <span>Company</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  activeDropdown === "company" ? "rotate-180 text-[var(--text)]" : "text-[var(--text-3)]"
                }`}
              />
            </button>

            {activeDropdown === "company" && (
              <div className="absolute top-full right-0 pt-2 w-72 animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)]/95 p-2 shadow-2xl backdrop-blur-xl space-y-0.5">
                  <Link
                    href="/about"
                    className="flex items-start gap-2.5 rounded-xl p-2 hover:bg-[var(--sunk)] transition-colors group"
                  >
                    <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--sunk)] text-[var(--text-2)] group-hover:text-[var(--accent)]">
                      <Info className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                        About Us
                      </p>
                      <p className="text-[11px] text-[var(--text-3)]">Our memory-safe mission and team.</p>
                    </div>
                  </Link>

                  <Link
                    href="/faq"
                    className="flex items-start gap-2.5 rounded-xl p-2 hover:bg-[var(--sunk)] transition-colors group"
                  >
                    <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--sunk)] text-[var(--text-2)] group-hover:text-[var(--accent)]">
                      <HelpCircle className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                        FAQ
                      </p>
                      <p className="text-[11px] text-[var(--text-3)]">Answers to common judge and client questions.</p>
                    </div>
                  </Link>

                  <Link
                    href="/careers"
                    className="flex items-start gap-2.5 rounded-xl p-2 hover:bg-[var(--sunk)] transition-colors group"
                  >
                    <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--sunk)] text-[var(--text-2)] group-hover:text-[var(--accent)]">
                      <Building2 className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                        Careers
                      </p>
                      <p className="text-[11px] text-[var(--text-3)]">Join our systems security engineering team.</p>
                    </div>
                  </Link>

                  <Link
                    href="/contact"
                    className="flex items-start gap-2.5 rounded-xl p-2 hover:bg-[var(--sunk)] transition-colors group"
                  >
                    <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--sunk)] text-[var(--text-2)] group-hover:text-[var(--accent)]">
                      <Mail className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                        Contact
                      </p>
                      <p className="text-[11px] text-[var(--text-3)]">Direct enterprise inquiries and support.</p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2.5">
          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--line)]/70 bg-[var(--surface)] text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--sunk)] transition-colors"
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            suppressHydrationWarning
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* User Logged In vs Logged Out State */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-lg border border-[var(--line)]/80 bg-[var(--surface)] text-xs font-medium text-[var(--text)] hover:bg-[var(--sunk)] transition-colors"
              >
                <span
                  className="h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-xs"
                  style={{
                    background: user.role === "admin" ? "var(--accent)" : "#0ea5e9",
                  }}
                >
                  {user.avatar}
                </span>
                <span className="max-w-[80px] truncate">{user.name.split(" ")[0]}</span>
                <span
                  className={`text-[9px] font-mono uppercase px-1.5 py-0.2 rounded font-semibold ${
                    user.role === "admin"
                      ? "bg-[var(--accent)]/15 text-[var(--accent)]"
                      : "bg-sky-500/15 text-sky-400"
                  }`}
                >
                  {user.role}
                </span>
                <ChevronDown className="h-3 w-3 text-[var(--text-3)]" />
              </button>

              {userMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 rounded-2xl border border-[var(--line)] bg-[var(--surface)]/95 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                  <div className="px-3 py-2 border-b border-[var(--line)]/50 mb-1">
                    <p className="text-xs font-semibold text-[var(--text)] truncate">{user.name}</p>
                    <p className="text-[11px] text-[var(--text-3)] truncate mt-0.5">{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--sunk)] transition-colors"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5 text-[var(--accent)]" />
                    <span>Open Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors text-left"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Sign In text link */}
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center justify-center h-9 px-3 rounded-lg text-xs font-medium text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--surface)] transition-colors"
              >
                Sign In
              </Link>
            </>
          )}

          {/* Live Dashboard Button */}
          <Link
            href="/dashboard"
            className="hidden md:inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-[var(--line)]/80 bg-[var(--surface)] text-xs font-medium text-[var(--text)] hover:border-[var(--accent)]/50 hover:bg-[var(--sunk)] transition-all"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Dashboard</span>
          </Link>

          {/* Primary Request a Demo CTA */}
          <Link
            href="/demo"
            className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-lg bg-[var(--accent)] text-xs font-semibold text-white shadow-sm hover:opacity-90 active:scale-95 transition-all"
          >
            <span>Request a Demo</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--line)]/70 bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--sunk)] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-b border-[var(--line)] bg-[var(--bg)] px-5 py-5 space-y-4 animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Solutions */}
          <div className="space-y-1">
            <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent)] font-semibold px-2">
              Solutions
            </p>
            <Link
              href="/solutions/patch-management"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-xs font-medium text-[var(--text)] hover:bg-[var(--sunk)]"
            >
              Patch Management Software
            </Link>
            <Link
              href="/solutions/autonomous-endpoint-management"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-xs font-medium text-[var(--text)] hover:bg-[var(--sunk)]"
            >
              Autonomous Endpoint Management
            </Link>
          </div>

          {/* Products */}
          <div className="space-y-1 pt-2 border-t border-[var(--line)]/50">
            <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent)] font-semibold px-2">
              Products
            </p>
            <Link
              href="/products/onesite-patch"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-xs font-medium text-[var(--text)] hover:bg-[var(--sunk)]"
            >
              OneSite Patch
            </Link>
            <Link
              href="/products/onesite-anywhere"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-xs font-medium text-[var(--text)] hover:bg-[var(--sunk)]"
            >
              OneSite Anywhere
            </Link>
            <Link
              href="/products/onesite-health"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-xs font-medium text-[var(--text)] hover:bg-[var(--sunk)]"
            >
              OneSite Health
            </Link>
          </div>

          {/* Resources */}
          <div className="space-y-1 pt-2 border-t border-[var(--line)]/50">
            <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent)] font-semibold px-2">
              Resources
            </p>
            <Link
              href="/resources/case-studies"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-xs font-medium text-[var(--text)] hover:bg-[var(--sunk)]"
            >
              Case Studies
            </Link>
            <Link
              href="/resources/reports"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-xs font-medium text-[var(--text)] hover:bg-[var(--sunk)]"
            >
              Reports & Whitepapers
            </Link>
            <Link
              href="/resources/videos"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-xs font-medium text-[var(--text)] hover:bg-[var(--sunk)]"
            >
              Video Demos
            </Link>
          </div>

          {/* Company */}
          <div className="space-y-1 pt-2 border-t border-[var(--line)]/50">
            <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent)] font-semibold px-2">
              Company
            </p>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-xs font-medium text-[var(--text)] hover:bg-[var(--sunk)]"
            >
              About Us
            </Link>
            <Link
              href="/faq"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-xs font-medium text-[var(--text)] hover:bg-[var(--sunk)]"
            >
              FAQ
            </Link>
            <Link
              href="/careers"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-xs font-medium text-[var(--text)] hover:bg-[var(--sunk)]"
            >
              Careers
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-xs font-medium text-[var(--text)] hover:bg-[var(--sunk)]"
            >
              Contact
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 border-t border-[var(--line)] flex flex-col gap-2">
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--surface)] py-2.5 text-xs font-medium text-[var(--text)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Launch Live Dashboard</span>
            </Link>

            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="flex items-center justify-center gap-2 rounded-lg border border-red-500/30 py-2.5 text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out ({user.name.split(" ")[0]})</span>
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)] py-2.5 text-xs font-medium text-[var(--text)]"
              >
                Sign In
              </Link>
            )}

            <Link
              href="/demo"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-[var(--accent)] py-2.5 text-xs font-semibold text-white shadow-sm"
            >
              <span>Request a Demo</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
