import React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-puja-bg/80 backdrop-blur-md border-b border-puja-border/50">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-bold tracking-tight">
          PujaProof
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-puja-secondary">
          <a href="/#problem" className="hover:text-puja-text transition-colors">Problem</a>
          <a href="/#how-it-works" className="hover:text-puja-text transition-colors">How it Works</a>
          <a href="/#features" className="hover:text-puja-text transition-colors">Features</a>
          <a href="/#faq" className="hover:text-puja-text transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center justify-center">
          <img src="/poppins_flat_black.svg" alt="Team Poppins" className="h-12 object-contain" />
        </div>
      </div>
    </header>
  );
}
