import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import DemoController from "@/components/DemoController";
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
  title: "PujaProof MVP",
  description: "A mobile-first crowdfunding and financial transparency platform for community-organized Durga Puja celebrations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="antialiased min-h-screen bg-puja-bg text-puja-text selection:bg-puja-accent selection:text-white pb-24">
        <NavBar />
        <main>{children}</main>
        <DemoController />
      </body>
    </html>
  );
}
