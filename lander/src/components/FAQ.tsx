"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Do I need a crypto wallet to contribute?',
      a: 'No. You can contribute using any standard UPI app (GPay, PhonePe, Paytm). The blockchain infrastructure runs entirely in the background to secure the records, so your experience remains familiar and simple.'
    },
    {
      q: 'Is my payment still processed through UPI?',
      a: 'Yes. All fiat transactions are routed through standard RBI-approved UPI gateways. The blockchain is used purely for verifiable accounting and expense tracking, not for the initial fiat transfer.'
    },
    {
      q: 'How are expenses actually verified?',
      a: 'When a committee logs an expense, they upload the vendor invoice. A cryptographic hash of this invoice, along with the vendor details and committee signatures, is recorded on-chain. Anyone can verify this against the public ledger.'
    },
    {
      q: 'What are digital passes?',
      a: 'Digital passes are blockchain-backed credentials (NFTs) issued to sponsors and VIP contributors. They are tied to your identity, cannot be duplicated, and are easily verified via QR scan at the venue.'
    }
  ];

  return (
    <section id="faq" className="py-24 px-6 max-w-4xl mx-auto">
      <div className="mb-12 text-center md:text-left">
        <span className="text-xs font-semibold tracking-[0.2em] text-puja-secondary uppercase">
          QUESTIONS
        </span>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div 
              key={idx} 
              className="border border-puja-border rounded-[20px] bg-white overflow-hidden transition-colors duration-300 hover:border-puja-accent/50 group"
            >
              <button 
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="font-medium text-lg">{faq.q}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-puja-secondary transition-transform duration-300 ${isOpen ? 'rotate-180 text-puja-accent' : 'group-hover:text-puja-accent'}`} 
                />
              </button>
              
              <div 
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-puja-secondary text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
