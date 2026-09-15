import React from 'react';
import { Smartphone, CheckCircle2, LockKeyhole, Receipt, BarChart3 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    { icon: Smartphone, title: 'UPI Contribution', desc: 'Scan standard QR code' },
    { icon: CheckCircle2, title: 'Payment Verified', desc: 'Instant confirmation' },
    { icon: LockKeyhole, title: 'On-chain Record', desc: 'Immutable generation' },
    { icon: Receipt, title: 'Committee Logs', desc: 'Invoice + Hash recorded' },
    { icon: BarChart3, title: 'Public Dashboard', desc: 'Live proof of spend' }
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs font-semibold tracking-[0.2em] text-puja-secondary uppercase">
            HOW IT WORKS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 mb-6">
            Pay the way you already do.<br />Verify the way you never could.
          </h2>
        </div>

        <div className="relative">
          {/* Connecting Line (hidden on mobile, visible on md+) */}
          <div className="hidden md:block absolute top-12 left-10 right-10 h-px bg-puja-accent/30 -z-10"></div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 rounded-3xl border border-puja-border bg-white flex items-center justify-center mb-6 shadow-sm group-hover:border-puja-accent transition-colors relative z-10">
                    <Icon className="w-8 h-8 text-puja-text stroke-[1.5px]" />
                  </div>
                  <h3 className="font-bold text-base mb-2">{step.title}</h3>
                  <p className="text-sm text-puja-secondary leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
