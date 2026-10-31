"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function LoginPage() {
  const { login, user, isLoading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showCreds, setShowCreds] = useState(false);

  // Already logged in → redirect
  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, isLoading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);
    if (result.ok) {
      router.replace("/dashboard");
    } else {
      setError(result.error ?? "Login failed.");
    }
  }

  function fillDemo(role: "admin" | "user") {
    if (role === "admin") {
      setEmail("admin@rustshield.io");
      setPassword("RustAdmin2026!");
    } else {
      setEmail("user@rustshield.io");
      setPassword("FleetUser2026!");
    }
    setError("");
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
        <div className="h-8 w-8 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] relative overflow-hidden">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, var(--accent) 0%, transparent 55%), linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 40px 40px, 40px 40px",
          opacity: 0.08,
        }}
      />
      {/* Radial glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-[var(--accent)]/10 blur-3xl" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-9 w-9 flex-shrink-0 transition-transform group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Rust Shield"
              width={36}
              height={36}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-serif text-lg font-medium text-[var(--text)]">
            Rust Shield
          </span>
        </Link>

        <Link
          href="/"
          className="text-sm font-medium text-[var(--text-2)] hover:text-[var(--text)] transition-colors flex items-center gap-1.5"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to site
        </Link>
      </header>

      {/* Main */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)]/80 backdrop-blur-xl p-8 shadow-2xl">
            {/* Logo + Title */}
            <div className="flex flex-col items-center gap-3 mb-8">
              <div className="h-16 w-16 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Rust Shield"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="text-center">
                <h1 className="font-serif text-2xl font-medium text-[var(--text)]">
                  Sign in to Rust Shield
                </h1>
                <p className="mt-1 text-sm text-[var(--text-3)]">
                  Access the autonomous endpoint security platform
                </p>
              </div>
            </div>

            {/* Demo Credentials Box */}
            <div className="mb-6 rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/5 overflow-hidden">
              <button
                type="button"
                onClick={() => setShowCreds(!showCreds)}
                className="w-full flex items-center justify-between px-4 py-3 text-xs font-mono uppercase tracking-wider text-[var(--accent)] hover:bg-[var(--accent)]/5 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Demo Credentials
                </span>
                <svg
                  className={`h-3.5 w-3.5 transition-transform ${showCreds ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showCreds && (
                <div className="px-4 pb-4 space-y-2 border-t border-[var(--accent)]/10 pt-3">
                  {/* Admin */}
                  <button
                    type="button"
                    onClick={() => fillDemo("admin")}
                    className="w-full flex items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--sunk)] px-3 py-2.5 text-left hover:border-[var(--accent)]/40 transition-colors group"
                  >
                    <div>
                      <p className="text-[11px] font-mono font-semibold text-[var(--accent)] uppercase tracking-wider">Admin Access</p>
                      <p className="text-xs text-[var(--text-2)] mt-0.5">admin@rustshield.io</p>
                      <p className="text-[11px] font-mono text-[var(--text-3)]">RustAdmin2026!</p>
                    </div>
                    <span className="text-[10px] font-mono bg-[var(--accent)]/10 text-[var(--accent)] px-2 py-1 rounded-lg border border-[var(--accent)]/20">
                      Full Control
                    </span>
                  </button>

                  {/* User */}
                  <button
                    type="button"
                    onClick={() => fillDemo("user")}
                    className="w-full flex items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--sunk)] px-3 py-2.5 text-left hover:border-sky-500/40 transition-colors group"
                  >
                    <div>
                      <p className="text-[11px] font-mono font-semibold text-sky-400 uppercase tracking-wider">User Access</p>
                      <p className="text-xs text-[var(--text-2)] mt-0.5">user@rustshield.io</p>
                      <p className="text-[11px] font-mono text-[var(--text-3)]">FleetUser2026!</p>
                    </div>
                    <span className="text-[10px] font-mono bg-sky-500/10 text-sky-400 px-2 py-1 rounded-lg border border-sky-500/20">
                      Read-Only
                    </span>
                  </button>
                  <p className="text-[11px] text-[var(--text-3)] text-center pt-1">
                    Click a row to auto-fill credentials
                  </p>
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-2)]">
                  Email Address
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="you@rustshield.io"
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--sunk)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-3)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40 focus:border-[var(--accent)]/50 transition-all"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-2)]">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    placeholder="••••••••••••"
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--sunk)] px-4 py-3 pr-12 text-sm text-[var(--text)] placeholder:text-[var(--text-3)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40 focus:border-[var(--accent)]/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-[var(--text-3)] hover:text-[var(--text)] transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {submitting ? (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Authenticating…
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Sign In to Dashboard
                  </>
                )}
              </button>
            </form>

            {/* Footer note */}
            <p className="mt-6 text-center text-[11px] text-[var(--text-3)]">
              This is a secure portal for authorized personnel only.
              <br />
              <Link href="/privacy" className="text-[var(--accent)] hover:underline">
                Privacy Policy
              </Link>{" "}
              ·{" "}
              <Link href="/contact" className="text-[var(--accent)] hover:underline">
                Contact Support
              </Link>
            </p>
          </div>

          {/* Security badge */}
          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-mono text-[var(--text-3)]">
            <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Secured by Rust Shield Identity v3.8</span>
          </div>
        </div>
      </main>
    </div>
  );
}

