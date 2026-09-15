"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-puja-bg/80 backdrop-blur-md border-b border-puja-border/50">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-puja-text">
          PujaProof
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-puja-secondary">
          <a href="/#problem" className="hover:text-puja-text transition-colors">Problem</a>
          <a href="/#how-it-works" className="hover:text-puja-text transition-colors">How it Works</a>
          <a href="/#features" className="hover:text-puja-text transition-colors">Features</a>
          <a href="/#faq" className="hover:text-puja-text transition-colors">FAQ</a>
        </nav>

        {/* Right Section: Team Poppins Logo & Mobile Hamburger Menu */}
        <div className="flex items-center gap-3 md:gap-0">
          <img src="/poppins_flat_black.svg" alt="Team Poppins" className="h-12 object-contain" />
          
          {/* Mobile Divider & Hamburger Menu */}
          <div className="flex items-center gap-3 md:hidden">
            <div className="w-px h-6 bg-puja-border" />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 text-puja-text hover:text-puja-accent rounded-lg transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-puja-border/50 bg-puja-bg/95 backdrop-blur-md px-6 py-6 animate-fade-in-up">
          <nav className="flex flex-col gap-4 text-base font-medium text-puja-secondary">
            <a 
              href="/#problem" 
              onClick={() => setIsOpen(false)} 
              className="py-1 hover:text-puja-text transition-colors"
            >
              Problem
            </a>
            <a 
              href="/#how-it-works" 
              onClick={() => setIsOpen(false)} 
              className="py-1 hover:text-puja-text transition-colors"
            >
              How it Works
            </a>
            <a 
              href="/#features" 
              onClick={() => setIsOpen(false)} 
              className="py-1 hover:text-puja-text transition-colors"
            >
              Features
            </a>
            <a 
              href="/#faq" 
              onClick={() => setIsOpen(false)} 
              className="py-1 hover:text-puja-text transition-colors"
            >
              FAQ
            </a>
            <Link
              href="/waitlist"
              onClick={() => setIsOpen(false)}
              className="mt-2 text-center w-full bg-puja-text text-white py-3 rounded-[20px] font-medium hover:bg-black/90 transition-colors"
            >
              Join Waitlist
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
