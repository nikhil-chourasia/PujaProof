import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PujaProof | Trust, verified.",
  description: "A mobile-first crowdfunding and financial transparency platform for community-organized Durga Puja celebrations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="antialiased min-h-screen bg-puja-bg text-puja-text selection:bg-puja-accent selection:text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
