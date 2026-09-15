import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Activity, Users, Database } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-24 pb-32 px-6 max-w-6xl mx-auto flex flex-col items-center text-center animate-fade-in-up">
      <div className="inline-flex items-center gap-2 mb-8 border-b border-puja-accent/30 pb-1">
        <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] text-puja-secondary uppercase">
          HACKSPIRE'26 · BLOCKCHAIN — DHARMA & TRUST
        </span>
      </div>

      <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 max-w-4xl">
        Trust, verified — <br className="hidden md:block" />
        <span className="text-puja-accent">not promised.</span>
      </h1>

      <p className="text-lg md:text-xl text-puja-secondary max-w-2xl mb-12 leading-relaxed">
        PujaProof connects familiar UPI payments with blockchain-based proof of spend. Community fundraising for Durga Puja, finally transparent.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
        <Link href="/waitlist" className="w-full sm:w-auto bg-puja-text text-white px-8 py-3.5 rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-black/90 transition-colors">
          Contribute via UPI <ArrowRight className="w-4 h-4 stroke-[2px]" />
        </Link>
        <a href="/#how-it-works" className="w-full sm:w-auto bg-white text-puja-text border border-puja-border px-8 py-3.5 rounded-2xl font-medium flex justify-center hover:border-puja-accent transition-colors">
          See How It Works
        </a>
      </div>

      <div className="w-full max-w-4xl bg-white border border-puja-border rounded-3xl p-2 shadow-[0_1px_2px_rgba(0,0,0,0.03)] delay-200 animate-fade-in-up">
        <div className="bg-puja-bg border border-puja-border/50 rounded-[20px] p-6 md:p-10 flex flex-col items-center">
          {/* Mockup Header */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full mb-10 gap-6">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-puja-accent">
                <ShieldCheck className="w-6 h-6 stroke-[1.5px]" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold">Shreebhumi Sporting Club</h3>
                <p className="text-sm text-puja-secondary">Verified Community Campaign</p>
              </div>
            </div>
            <div className="flex gap-3">
               <div className="px-4 py-2 rounded-xl border border-puja-border bg-white text-sm font-medium">
                 Status: Active
               </div>
            </div>
          </div>
          
          {/* Mockup Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <div className="p-6 rounded-2xl border border-puja-border bg-white">
              <div className="text-sm text-puja-secondary mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 stroke-[1.5px]" /> Total Raised
              </div>
              <div className="font-serif text-3xl font-bold">₹12,45,000</div>
            </div>
            <div className="p-6 rounded-2xl border border-puja-border bg-white">
              <div className="text-sm text-puja-secondary mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4 stroke-[1.5px]" /> Spent (Verified)
              </div>
              <div className="font-serif text-3xl font-bold">₹4,20,500</div>
            </div>
            <div className="p-6 rounded-2xl border border-puja-border bg-white">
              <div className="text-sm text-puja-secondary mb-2 flex items-center gap-2">
                <Database className="w-4 h-4 stroke-[1.5px]" /> On-Chain Proofs
              </div>
              <div className="font-serif text-3xl font-bold">14</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
