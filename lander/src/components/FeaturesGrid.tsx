import React from 'react';
import { QrCode, Shield, FileCheck, Ticket, Users, Mic } from 'lucide-react';

export default function FeaturesGrid() {
  const features = [
    {
      icon: QrCode,
      title: 'UPI-Native Payments',
      desc: 'No crypto wallet needed. Contributors scan a QR code or use intent links to pay securely using any UPI app they already have.'
    },
    {
      icon: Shield,
      title: 'Multi-Signature Treasury',
      desc: 'Funds require 2-of-3 committee sign-off before release, mathematically preventing unilateral decisions and ensuring collective consensus.'
    },
    {
      icon: FileCheck,
      title: 'Tamper-Evident Trail',
      desc: 'Every expense logged generates an invoice hash tied to vendor identity and approval history, recorded immutably on-chain.'
    },
    {
      icon: Ticket,
      title: 'Digital Passes',
      desc: 'Supporters and VIPs receive blockchain-backed, QR-verifiable digital credentials instead of easily duplicated paper tickets.'
    },
    {
      icon: Users,
      title: 'Verified Vendors',
      desc: 'Access a marketplace of registered, verified sponsors and vendors with transparent transaction histories to build immediate trust.'
    },
    {
      icon: Mic,
      title: 'Voice Assistant',
      desc: 'Ask questions in natural language. Powered by ElevenLabs, get real-time spoken answers about campaign balances and line-item expenses.'
    }
  ];

  return (
    <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs font-semibold tracking-[0.2em] text-puja-secondary uppercase">
          WHAT MAKES IT DIFFERENT
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div key={idx} className="p-8 rounded-3xl border border-puja-border bg-white hover:border-puja-accent transition-colors">
              <div className="w-12 h-12 rounded-xl bg-puja-accent-light flex items-center justify-center text-puja-accent mb-6 border border-puja-accent/10">
                <Icon className="w-6 h-6 stroke-[1.5px]" />
              </div>
              <h3 className="font-bold text-lg mb-3">{feature.title}</h3>
              <p className="text-sm text-puja-secondary leading-relaxed">
                {feature.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
