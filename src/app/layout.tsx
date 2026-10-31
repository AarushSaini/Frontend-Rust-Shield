import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { ToastProvider } from "@/components/Toast";
import LiveCveTicker from "@/components/LiveCveTicker";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Rust Shield — Autonomous Endpoint Security & Patch Management",
  description:
    "Next-generation memory-safe autonomous patch management, endpoint health, and zero-infrastructure peer-to-peer distribution. Eliminate vulnerabilities with zero network strain.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Instrument+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("brindle-theme");if(t==="light"){document.documentElement.setAttribute("data-theme","light");document.documentElement.classList.remove("dark");}else if(t==="dark"){document.documentElement.setAttribute("data-theme","dark");document.documentElement.classList.add("dark");}}catch(e){}`,
          }}
        />
      </head>
      <body
        className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] font-sans antialiased selection:bg-[var(--accent)]/20 selection:text-[var(--accent)]"
        suppressHydrationWarning
      >
        <AuthProvider>
          <ToastProvider>
            <LiveCveTicker />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieConsent />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
