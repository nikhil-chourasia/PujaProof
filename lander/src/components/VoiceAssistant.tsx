import React from 'react';
import { Mic, Volume2 } from 'lucide-react';

export default function VoiceAssistant() {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16 md:gap-24">
        {/* Left Side: Squircle Preview */}
        <div className="bg-puja-accent-light/50 border border-puja-accent/20 rounded-[40px] p-8 md:p-12 relative overflow-hidden flex flex-col items-center shadow-sm h-full justify-center min-h-[400px]">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-puja-accent/10 rounded-full blur-3xl mix-blend-multiply"></div>
          
          <div className="relative z-10 w-full max-w-sm">
            <div className="w-16 h-16 mx-auto bg-white rounded-[20px] flex items-center justify-center text-puja-accent shadow-[0_4px_20px_-4px_rgba(139,92,246,0.15)] border border-puja-border mb-8">
              <Mic className="w-8 h-8 stroke-[1.5px]" />
            </div>

            <div className="space-y-6 text-left">
              {/* User message bubble */}
              <div className="bg-white border border-puja-border rounded-[24px] rounded-bl-sm p-4 inline-block shadow-sm">
                <p className="text-sm font-medium">"How much has this Puja collected so far?"</p>
              </div>
              
              {/* AI message bubble */}
              <div className="bg-[#FFFFFF] border border-puja-border rounded-[24px] rounded-tl-sm p-5 shadow-lg w-full">
                <div className="flex items-center gap-2 mb-2 text-puja-accent">
                  <Volume2 className="w-4 h-4 stroke-[2.5px]" />
                  <span className="text-xs uppercase tracking-widest font-bold">Assistant</span>
                </div>
                <p className="text-sm leading-relaxed text-[#0A0A0A]">
                  The Shreebhumi Sporting Club campaign has raised ₹12,45,000 from 342 contributors. There is currently ₹8,24,500 remaining in the treasury.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Powered By */}
        <div className="flex flex-col justify-center text-center md:text-left h-full">
          <span className="text-xs font-semibold tracking-[0.2em] text-puja-secondary uppercase mb-0">
            POWERED BY
          </span>
          {/* Real ElevenLabs Logo image */}
          <div className="flex md:justify-start">
            <img src="/elevenlabs-logo.png" alt="ElevenLabs" className="w-64 md:w-60 object-contain" />
          </div>
          <p className="text-puja-secondary mt-0 leading-relaxed max-w-sm mx-auto md:mx-0">
            Contributors can query real-time campaign stats and verified expenses in plain conversational language, instantly.
          </p>
        </div>
      </div>
    </section>
  );
}
