"use client";

import { useState } from "react";
import { QrCode, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { mockPasses } from "@/data/mockData";
import { clsx } from "@/lib/utils";

export default function PassesPage() {
  const [flipped, setFlipped] = useState<string | null>(null);

  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case 'Valid': return <CheckCircle2 className="w-4 h-4" />;
      case 'Used': return <AlertCircle className="w-4 h-4" />;
      case 'Revoked': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Valid': return 'bg-green-50 text-green-600 border-green-200';
      case 'Used': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'Revoked': return 'bg-red-50 text-red-600 border-red-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 animate-fade-in-up">
      <div className="mb-10 text-center">
        <span className="text-xs uppercase tracking-[0.2em] text-puja-secondary font-medium mb-2 block">
          Your Wallet
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-puja-text">
          Digital Passes
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPasses.map((pass) => {
          const isFlipped = flipped === pass.id;
          
          return (
            <div 
              key={pass.id}
              className="relative h-80 w-full perspective-1000 cursor-pointer"
              onClick={() => setFlipped(isFlipped ? null : pass.id)}
            >
              <div className={clsx(
                "w-full h-full transition-all duration-500 preserve-3d absolute inset-0 rounded-[32px]",
                isFlipped ? "rotate-y-180" : ""
              )}>
                
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-white border border-puja-border rounded-[32px] p-6 shadow-sm flex flex-col items-center justify-between hover:border-puja-accent transition-colors">
                  <div className="text-center w-full">
                    <div className="text-xs uppercase tracking-widest text-puja-secondary font-bold mb-4 border-b border-puja-border pb-4 w-full">Ekta Sangha</div>
                    <h3 className="font-serif text-2xl font-bold text-puja-text mb-2 leading-tight">{pass.tier}</h3>
                    <p className="text-sm text-puja-secondary">{pass.date}</p>
                  </div>
                  
                  <div className="w-24 h-24 bg-gray-50 border border-gray-200 rounded-[16px] flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-2 grid grid-cols-4 grid-rows-4 gap-0.5 opacity-30">
                      {Array.from({length: 16}).map((_, i) => (
                        <div key={i} className={clsx("bg-black rounded-sm", Math.random() > 0.4 ? "opacity-100" : "opacity-0")} />
                      ))}
                    </div>
                    <QrCode className="w-8 h-8 text-puja-secondary z-10" />
                  </div>

                  <div className={clsx("px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5", getStatusColor(pass.status))}>
                    <StatusIcon status={pass.status} /> {pass.status}
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-puja-accent text-white rounded-[32px] p-6 shadow-sm flex flex-col items-center justify-center">
                  <div className="w-40 h-40 bg-white rounded-[24px] flex items-center justify-center mb-6 relative p-3">
                     <div className="absolute inset-3 grid grid-cols-6 grid-rows-6 gap-0.5 opacity-80">
                      {Array.from({length: 36}).map((_, i) => (
                        <div key={i} className={clsx("bg-black rounded-sm", Math.random() > 0.3 ? "opacity-100" : "opacity-0")} />
                      ))}
                    </div>
                  </div>
                  <p className="text-lg font-medium text-center">Scan me at the venue</p>
                  <p className="text-sm text-white/70 mt-2 text-center">Ticket ID: {pass.id.toUpperCase()}-9X2B</p>
                </div>

              </div>
            </div>
          )
        })}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
    </div>
  );
}
