// app/layout.tsx
// REPLACE your existing layout.tsx with this file.
// This fixes:
//   1. Browser tab logo (was showing v0 logo)
//   2. Correct title, description, and Open Graph metadata

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WikiWiz : Financial Geeta — Uncompromising Wisdom for the Modern Trader",
  description:
    "Master trading through Bhagavad Gita wisdom. Learn investment philosophy, technical analysis, and risk management with 15 phases of professional financial education.",
  keywords: ["financial education", "bhagavad gita", "trading", "investment", "NSE", "BSE", "India", "stock market"],
  authors: [{ name: "WikiWiz" }],
  creator: "WikiWiz",
  metadataBase: new URL("https://wikiwiz.vercel.app"),
  // ── Favicon chain ──────────────────────────────────────────────────────────
  // Drop wikiwiz-favicon.svg into /public/
  // Drop wikiwiz-favicon-32.png (32×32) into /public/
  // Drop wikiwiz-favicon-180.png (180×180 Apple touch icon) into /public/
  icons: {
    icon: [
      { url: "/wikiwiz-favicon.svg", type: "image/svg+xml" },
      { url: "/wikiwiz-favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/wikiwiz-favicon-180.png", sizes: "180x180" },
    ],
    shortcut: "/wikiwiz-favicon-32.png",
  },
  // ── Open Graph (WhatsApp / Twitter previews) ───────────────────────────────
  openGraph: {
    title: "WikiWiz : Financial Geeta",
    description: "15 phases of financial education guided by the Bhagavad Gita.",
    url: "https://wikiwiz.vercel.app",
    siteName: "WikiWiz",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WikiWiz : Financial Geeta",
    description: "15 phases of financial education guided by the Bhagavad Gita.",
    images: ["/og-image.png"],
  },
  // ── Theme colour (matches your dark palette) ───────────────────────────────
  themeColor: "#0a0a0a",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/*
          SVG favicon — works in all modern browsers.
          PNG fallbacks are defined via metadata.icons above.
          If you need IE11 support add an /favicon.ico as well.
        */}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
