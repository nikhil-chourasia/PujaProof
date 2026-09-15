"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, QrCode, Copy, ArrowRight, Loader2 } from "lucide-react";
import { formatCurrency } from "@/data/mockData";
import { wait, clsx } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Step = "amount" | "upi" | "blockchain" | "success";

const presets = [101, 501, 1101];

export default function ContributeFlow() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState<number>(501);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [txHash, setTxHash] = useState("");

  const handleAmountSubmit = () => {
    setStep("upi");
  };

  const handleUPIPayment = async () => {
    setStep("blockchain");
    setLoadingMsg("Waiting for UPI confirmation...");
    await wait(2500); // UPI delay

    setLoadingMsg("Generating cryptographic reference...");
    await wait(800);
    
    setLoadingMsg("Anchoring record to chain...");
    await wait(900);
    
    setLoadingMsg("Record confirmed");
    setTxHash(`0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`);
    await wait(800);
    
    setStep("success");
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      
      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 mb-12">
        {["amount", "upi", "blockchain", "success"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={clsx(
              "w-2.5 h-2.5 rounded-full transition-colors",
              step === s || ["amount", "upi", "blockchain", "success"].indexOf(step) > i
                ? "bg-puja-accent" : "bg-gray-200"
            )} />
            {i < 3 && <div className="w-8 h-[1px] bg-gray-200" />}
          </div>
        ))}
      </div>

      <div className="bg-white border border-puja-border rounded-[32px] p-8 shadow-sm relative overflow-hidden min-h-[400px] flex flex-col">
        
        {step === "amount" && (
          <div className="animate-fade-in-up flex-1">
            <h2 className="font-serif text-2xl font-bold text-puja-text mb-6">Choose Amount</h2>
            
            <div className="grid grid-cols-3 gap-3 mb-6">
              {presets.map(p => (
                <button
                  key={p}
                  onClick={() => setAmount(p)}
                  className={clsx(
                    "py-3 rounded-[16px] border font-medium transition-all text-sm",
                    amount === p ? "border-puja-accent bg-puja-accent-light text-puja-accent" : "border-puja-border text-puja-secondary hover:border-gray-300"
                  )}
                >
                  {formatCurrency(p)}
                </button>
              ))}
            </div>

            <div className="mb-6 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-puja-secondary">₹</span>
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-4 rounded-[16px] border border-puja-border text-lg font-medium text-puja-text focus:outline-none focus:border-puja-accent"
              />
            </div>

            <label className="flex items-center gap-3 p-4 rounded-[16px] border border-puja-border cursor-pointer mb-8 hover:bg-gray-50 transition-colors">
              <input 
                type="checkbox" 
                checked={isAnonymous} 
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-puja-accent focus:ring-puja-accent"
              />
              <span className="text-sm font-medium text-puja-text">Contribute anonymously</span>
            </label>

            <button 
              onClick={handleAmountSubmit}
              className="w-full bg-black text-white rounded-[20px] py-4 font-medium hover:bg-black/90 transition-colors mt-auto"
            >
              Continue to Pay
            </button>
          </div>
        )}

        {step === "upi" && (
          <div className="animate-fade-in-up flex-1 flex flex-col items-center justify-center text-center">
            <h2 className="font-serif text-2xl font-bold text-puja-text mb-2">Scan to Pay</h2>
            <p className="text-sm text-puja-secondary mb-8">Scan with any UPI app</p>
            
            <div className="w-48 h-48 bg-gray-50 border border-puja-border rounded-[24px] flex items-center justify-center mb-8 relative group cursor-pointer" onClick={handleUPIPayment}>
              {/* Fake QR pattern */}
              <div className="absolute inset-4 grid grid-cols-6 grid-rows-6 gap-1 opacity-20">
                {Array.from({length: 36}).map((_, i) => (
                  <div key={i} className={clsx("bg-black rounded-sm", Math.random() > 0.5 ? "opacity-100" : "opacity-0")} />
                ))}
              </div>
              <QrCode className="w-12 h-12 text-puja-secondary relative z-10" />
              <div className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-[24px]">
                <span className="text-sm font-medium">Click to simulate payment</span>
              </div>
            </div>

            <div className="text-3xl font-serif font-bold text-puja-text mb-4">
              {formatCurrency(amount)}
            </div>
          </div>
        )}

        {step === "blockchain" && (
          <div className="animate-fade-in-up flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-puja-accent-light flex items-center justify-center mb-6">
              <Loader2 className="w-8 h-8 text-puja-accent animate-spin" />
            </div>
            
            <h2 className="font-serif text-2xl font-bold text-puja-text mb-8">Processing</h2>
            
            <div className="space-y-4 w-full max-w-xs text-left">
              {[
                { msg: "Waiting for UPI confirmation...", active: loadingMsg === "Waiting for UPI confirmation..." },
                { msg: "Generating cryptographic reference...", active: loadingMsg === "Generating cryptographic reference..." },
                { msg: "Anchoring record to chain...", active: loadingMsg === "Anchoring record to chain..." },
                { msg: "Record confirmed", active: loadingMsg === "Record confirmed" }
              ].map((item, idx) => {
                const isPast = ["Waiting for UPI confirmation...", "Generating cryptographic reference...", "Anchoring record to chain...", "Record confirmed"].indexOf(loadingMsg) > idx;
                const isCurrent = item.active;
                
                return (
                  <div key={idx} className={clsx(
                    "flex items-center gap-3 text-sm transition-all duration-300",
                    isPast || isCurrent ? "opacity-100" : "opacity-30",
                    isCurrent ? "text-puja-accent font-medium" : "text-puja-secondary"
                  )}>
                    {isPast ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : isCurrent ? (
                      <div className="w-4 h-4 rounded-full border-2 border-puja-accent border-t-transparent animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-200" />
                    )}
                    {item.msg}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="animate-fade-in-up flex-1 flex flex-col items-center text-center pt-4">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            
            <h2 className="font-serif text-2xl font-bold text-puja-text mb-2">Contribution Successful</h2>
            <p className="text-sm text-puja-secondary mb-8">Thank you for supporting Ekta Sangha Durgotsav</p>
            
            <div className="w-full bg-gray-50 rounded-[20px] p-4 mb-6 border border-puja-border text-left">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-puja-secondary uppercase tracking-wider font-semibold">Amount</span>
                <span className="font-medium text-puja-text">{formatCurrency(amount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-puja-secondary uppercase tracking-wider font-semibold">Tx Hash</span>
                <div className="flex items-center gap-1.5 text-xs font-mono bg-white px-2 py-1 rounded-md border border-puja-border">
                  {txHash} <Copy className="w-3 h-3 text-puja-secondary cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="w-full bg-puja-accent-light rounded-[20px] p-5 mb-8 border border-puja-accent/20 flex items-center justify-between">
              <div className="text-left">
                <h4 className="font-medium text-puja-text text-sm">Supporter Badge Unlocked</h4>
                <p className="text-xs text-puja-secondary">Added to your digital passes</p>
              </div>
              <QrCode className="w-8 h-8 text-puja-accent" />
            </div>

            <div className="w-full space-y-3 mt-auto">
              <Link 
                href="/passes"
                className="w-full flex items-center justify-center gap-2 bg-black text-white rounded-[20px] py-4 font-medium hover:bg-black/90 transition-colors"
              >
                View My Pass <ArrowRight className="w-4 h-4" />
              </Link>
              <button 
                onClick={() => router.push('/campaign/ekta-sangha')}
                className="w-full py-4 text-sm font-medium text-puja-secondary hover:text-puja-text transition-colors"
              >
                Back to Campaign
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
