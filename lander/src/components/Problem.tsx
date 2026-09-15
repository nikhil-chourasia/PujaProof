import React from 'react';
import { EyeOff, FileSignature, HelpCircle } from 'lucide-react';

export default function Problem() {
  return (
    <section id="problem" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs font-semibold tracking-[0.2em] text-puja-secondary uppercase">
          THE PROBLEM
        </span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 mb-6">
          Every Puja collects lakhs.<br />Few show where it went.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl border border-puja-border bg-white hover:border-puja-accent transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-puja-text mb-6">
            <EyeOff className="w-6 h-6 stroke-[1.5px]" />
          </div>
          <h3 className="font-bold text-xl mb-3">₹0 Visibility</h3>
          <p className="text-puja-secondary leading-relaxed text-sm">
            Contributors have no visibility into vendor payments, logistics costs, or remaining balances after the festival ends.
          </p>
        </div>

        <div className="p-8 rounded-3xl border border-puja-border bg-white hover:border-puja-accent transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-puja-text mb-6">
            <FileSignature className="w-6 h-6 stroke-[1.5px]" />
          </div>
          <h3 className="font-bold text-xl mb-3">1 Signature Control</h3>
          <p className="text-puja-secondary leading-relaxed text-sm">
            Treasury funds are often controlled by a single individual with full authority, introducing a single point of failure and lack of consensus.
          </p>
        </div>

        <div className="p-8 rounded-3xl border border-puja-border bg-white hover:border-puja-accent transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-puja-text mb-6">
            <HelpCircle className="w-6 h-6 stroke-[1.5px]" />
          </div>
          <h3 className="font-bold text-xl mb-3">0 Ways to Verify</h3>
          <p className="text-puja-secondary leading-relaxed text-sm">
            Even when expense sheets are published, there is zero cryptographic or public way to verify an invoice claim actually happened.
          </p>
        </div>
      </div>
    </section>
  );
}
