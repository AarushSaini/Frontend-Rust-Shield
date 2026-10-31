"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";

// ─── Types ───────────────────────────────────────────────────────────────────

export type UserRole = "admin" | "user";

export interface AuthUser {
  name: string;
  email: string;
  role: UserRole;
  avatar: string; // initials
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

// ─── Demo Credentials ─────────────────────────────────────────────────────────

const DEMO_USERS: Array<AuthUser & { password: string }> = [
  {
    name: "Admin Shah",
    email: "admin@rustshield.io",
    password: "RustAdmin2026!",
    role: "admin",
    avatar: "AS",
  },
  {
    name: "Fleet User",
    email: "user@rustshield.io",
    password: "FleetUser2026!",
    role: "user",
    avatar: "FU",
  },
];

const STORAGE_KEY = "rustshield-auth";
const COOKIE_KEY = "rustshield-session";

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: AuthUser = JSON.parse(raw);
        setUser(parsed);
      }
    } catch {
      // ignore corrupt storage
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<{ ok: boolean; error?: string }> => {
      const match = DEMO_USERS.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password
      );

      if (!match) {
        return { ok: false, error: "Invalid credentials. Please check your email and password." };
      }

      const authUser: AuthUser = {
        name: match.name,
        email: match.email,
        role: match.role,
        avatar: match.avatar,
      };

      // Persist to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
      } catch {/* ignore */}

      // Set a cookie so proxy.ts can read it server-side
      try {
        document.cookie = `${COOKIE_KEY}=${encodeURIComponent(JSON.stringify({ role: match.role, email: match.email }))}; path=/; SameSite=Lax; max-age=${60 * 60 * 24 * 7}`;
      } catch {/* ignore */}

      setUser(authUser);
      return { ok: true };
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {/* ignore */}
    // Expire the cookie
    try {
      document.cookie = `${COOKIE_KEY}=; path=/; max-age=0`;
    } catch {/* ignore */}
    router.push("/");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

