import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-puja-border mt-12">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-center text-center">
        
        {/* New Card CTA */}
        <div className="w-full max-w-xl p-8 md:p-12 border border-puja-border rounded-[32px] bg-white flex flex-col items-center shadow-sm mb-24">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-puja-secondary uppercase mb-6">
            START YOUR CAMPAIGN
          </div>
          
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Contribute with confidence.
          </h2>
          <p className="text-puja-secondary mb-10 leading-relaxed text-sm">
            Launch your Puja treasury today and bring transparency to your community fundraising efforts.
          </p>

          <Link href="/waitlist" className="w-full sm:w-auto bg-puja-text text-white px-8 py-4 rounded-[20px] font-medium flex items-center justify-center gap-2 hover:bg-black/90 transition-colors">
            OPEN WAITLIST PORTAL <ArrowUpRight className="w-4 h-4 stroke-[2px]" />
          </Link>
        </div>

        <div className="w-full border-t border-puja-border/50 pt-4 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6">
          <div className="font-serif text-xl font-bold">PujaProof</div>
          
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-medium text-puja-secondary">
            <a href="/#problem" className="hover:text-puja-text transition-colors">Problem</a>
            <a href="/#how-it-works" className="hover:text-puja-text transition-colors">How it Works</a>
            <a href="/#features" className="hover:text-puja-text transition-colors">Features</a>
            <a href="/#faq" className="hover:text-puja-text transition-colors">FAQ</a>
          </div>

          <div className="flex flex-col items-center justify-center md:items-end gap-2">
            <img src="/poppins_flat_black.svg" alt="Team Poppins" className="w-32 object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all" />
            <div className="text-[10px] text-puja-secondary uppercase tracking-[0.2em] font-semibold">
              built for hackspire '26
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
