import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kimchhorn Sambath — Portfolio",
  description:
    "SFU Computer Science student & Research Assistant in Vancouver, BC. Full-stack (Next.js/TypeScript), AI & LLM tooling, and static analysis research. Projects: Deep Phishing (Best Project), TS Testability Metrics, Unity RL Shooter, Shared History platform.",
  keywords:
    "Kimchhorn Sambath, Kim's Portfolio, SFU, Vancouver, full-stack developer, Next.js, React, TypeScript, Tailwind CSS, AI, LLM, static analysis, cybersecurity, phishing, Unity ML-Agents, research assistant, portfolio website",
  openGraph: {
    title: "Kimchhorn Sambath — Portfolio",
    description:
      "Portfolio of Kimchhorn Sambath: full-stack developer and RA at SFU focusing on Next.js/TypeScript, AI/LLMs, and software testability research. Explore projects, coursework, and contact info.",
    siteName: "Kim's Portfolio",
    locale: "en_CA",
    type: "website",
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
