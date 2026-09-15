"use client";

import { useState } from "react";
import { ScanLine, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { wait, clsx } from "@/lib/utils";

type ScanResult = "valid" | "used" | "invalid" | null;

export default function GateScanner() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult>(null);
  
  // Cycle through outcomes for demo purposes
  const [cycleCount, setCycleCount] = useState(0);

  const handleScan = async () => {
    setScanning(true);
    setResult(null);
    
    await wait(1500); // simulate scanning
    
    setScanning(false);
    
    // Cycle logic
    const outcomes: ScanResult[] = ["valid", "used", "invalid"];
    setResult(outcomes[cycleCount % 3]);
    setCycleCount((c: number) => c + 1);
  };

  return (
    <div className="max-w-md mx-auto px-6 py-10 animate-fade-in-up flex flex-col items-center">
      <div className="mb-8 text-center">
        <span className="text-xs uppercase tracking-[0.2em] text-puja-secondary font-medium mb-1 block">
          Gate Scanner View
        </span>
        <h1 className="font-serif text-3xl font-bold text-puja-text">
          Verify Pass
        </h1>
      </div>

      <div className="w-full relative bg-black rounded-[32px] overflow-hidden aspect-[3/4] flex flex-col items-center justify-center p-6 shadow-2xl">
        
        {/* Fake Camera Feed Background */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>

        {!result ? (
          <>
            <div className={clsx(
              "w-48 h-48 border-2 rounded-[24px] flex items-center justify-center relative transition-all duration-300",
              scanning ? "border-puja-accent bg-puja-accent/10" : "border-white/30"
            )}>
              {/* Corner markers */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-[8px]"></div>
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-[8px]"></div>
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-[8px]"></div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-[8px]"></div>
              
              <ScanLine className={clsx("w-12 h-12 text-white/50", scanning && "animate-pulse text-puja-accent")} />
              
              {/* Scan line animation */}
              {scanning && (
                <div className="absolute top-0 w-full h-[2px] bg-puja-accent shadow-[0_0_10px_#8b5cf6] animate-scan-line" />
              )}
            </div>

            <button 
              onClick={handleScan}
              disabled={scanning}
              className="mt-12 bg-white text-black px-8 py-4 rounded-[20px] font-medium hover:bg-gray-100 transition-colors z-10 w-full"
            >
              {scanning ? "Scanning..." : "Simulate Scan"}
            </button>
            <p className="text-xs text-white/50 mt-4 z-10 text-center">
              (Repeated clicks will cycle through Valid, Used, and Invalid states for demo)
            </p>
          </>
        ) : (
          <div className="w-full h-full bg-white absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center animate-fade-in-up">
            
            {result === "valid" && (
              <>
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-puja-text mb-2">Valid Pass</h2>
                <div className="text-sm font-medium text-puja-secondary mb-6">Supporter Badge</div>
                <div className="w-full bg-gray-50 rounded-[24px] p-6 mb-8 border border-gray-100">
                  <div className="text-xs uppercase tracking-wider text-puja-secondary font-semibold mb-1">Holder</div>
                  <div className="text-lg font-medium text-puja-text">Priya D.</div>
                  <div className="mt-4 text-xs uppercase tracking-wider text-puja-secondary font-semibold mb-1">Ticket ID</div>
                  <div className="font-mono text-sm text-puja-text">PASS1-9X2B</div>
                </div>
              </>
            )}

            {result === "used" && (
              <>
                <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mb-6">
                  <AlertCircle className="w-10 h-10 text-yellow-500" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-puja-text mb-2">Already Used</h2>
                <div className="text-sm font-medium text-puja-secondary mb-8">This pass was scanned 2 hours ago</div>
              </>
            )}

            {result === "invalid" && (
              <>
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                  <XCircle className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-puja-text mb-2">Invalid Pass</h2>
                <div className="text-sm font-medium text-puja-secondary mb-8">Pass revoked or not found</div>
              </>
            )}

            <button 
              onClick={() => setResult(null)}
              className="mt-auto w-full bg-black text-white px-8 py-4 rounded-[20px] font-medium hover:bg-black/90 transition-colors"
            >
              Scan Next
            </button>
          </div>
        )}

      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
        .animate-scan-line {
          animation: scan 2s linear infinite;
        }
      `}} />
    </div>
  );
}
