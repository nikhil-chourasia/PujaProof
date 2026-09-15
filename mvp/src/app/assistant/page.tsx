"use client";

import { useState } from "react";
import { Mic, Play, Pause, Square } from "lucide-react";
import { wait, clsx } from "@/lib/utils";

const sampleQuestions = [
  "How much has this Puja collected?",
  "How much was spent on lighting?",
  "Show me verified expenses",
  "What benefits do I get?"
];

const mockAnswers: Record<string, string> = {
  "How much has this Puja collected?": "Ekta Sangha Durgotsav has successfully collected ₹8,50,000 so far, which exceeds their initial target of ₹8,00,000.",
  "How much was spent on lighting?": "Based on the verified on-chain records, ₹47,000 was spent on lighting, paid to Shree Electricals. This was approved by the Treasurer and Secretary.",
  "Show me verified expenses": "There are currently 3 verified on-chain expenses. The largest is ₹1,50,000 for Pandal & Idol to Maa Durga Decorators. Total verified spend is ₹2,12,000.",
  "What benefits do I get?": "By contributing ₹501 or more, you unlock the Supporter Badge which grants access to the priority lane. Higher tiers unlock VIP and Priority Darshan passes."
};

export default function VoiceAssistant() {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [stage, setStage] = useState<"idle" | "listening" | "thinking" | "responding">("idle");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAsk = async (question: string) => {
    if (stage !== "idle" && stage !== "responding") return;
    
    setActiveQuestion(question);
    setIsPlaying(false);
    
    setStage("listening");
    await wait(1000);
    
    setStage("thinking");
    await wait(1200);
    
    setStage("responding");
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 h-[calc(100vh-100px)] flex flex-col">
      <div className="text-center mb-8 shrink-0">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-puja-text mb-2">
          Ask AI Assistant
        </h1>
        <p className="text-sm text-puja-secondary">
          Voice-first transparency powered by ElevenLabs
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-end bg-gray-50/50 rounded-[32px] p-6 sm:p-8 border border-puja-border relative overflow-hidden">
        
        {/* Chat area */}
        <div className="flex-1 overflow-y-auto flex flex-col justify-end space-y-6 pb-6">
          
          {activeQuestion && (
            <div className="self-end bg-black text-white px-5 py-3.5 rounded-[24px] rounded-br-none max-w-[85%] animate-fade-in-up">
              {activeQuestion}
            </div>
          )}

          {stage === "listening" && (
            <div className="self-start flex items-center gap-2 bg-white border border-puja-border px-5 py-3.5 rounded-[24px] rounded-bl-none animate-fade-in-up shadow-sm">
              <div className="flex gap-1 items-center h-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i} 
                    className="w-1 bg-puja-accent rounded-full animate-waveform" 
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              <span className="text-sm text-puja-secondary font-medium ml-2">Listening...</span>
            </div>
          )}

          {stage === "thinking" && (
            <div className="self-start flex items-center gap-2 bg-white border border-puja-border px-5 py-3.5 rounded-[24px] rounded-bl-none animate-fade-in-up shadow-sm">
               <div className="flex gap-1.5 items-center h-4">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className="w-2 h-2 bg-puja-accent/50 rounded-full animate-bounce" 
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
              <span className="text-sm text-puja-secondary font-medium ml-2">Thinking...</span>
            </div>
          )}

          {stage === "responding" && activeQuestion && (
            <div className="self-start bg-white border border-puja-border p-5 rounded-[24px] rounded-bl-none max-w-[90%] shadow-sm animate-fade-in-up flex flex-col gap-4">
              <p className="text-puja-text text-sm sm:text-base leading-relaxed">
                {mockAnswers[activeQuestion]}
              </p>
              
              <div className="bg-gray-50 border border-gray-100 p-3 rounded-[16px] flex items-center gap-3">
                <button 
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-puja-text text-white flex items-center justify-center hover:bg-black/80 transition-colors shrink-0"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-1" />}
                </button>
                <div className="flex-1 flex items-center gap-[2px] h-6 overflow-hidden px-2">
                  {/* Fake audio waveform */}
                  {Array.from({length: 40}).map((_, i) => (
                    <div 
                      key={i} 
                      className={clsx(
                        "w-1 rounded-full transition-all duration-300",
                        isPlaying ? "bg-puja-accent animate-waveform" : "bg-gray-300 h-1"
                      )}
                      style={{ 
                        animationDelay: `${Math.random()}s`,
                        height: isPlaying ? `${10 + Math.random() * 90}%` : '4px'
                      }}
                    />
                  ))}
                </div>
                <div className="text-[10px] font-medium text-puja-secondary uppercase tracking-wider shrink-0 pr-2">
                  0:12
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area / Suggestions */}
        <div className="shrink-0 pt-4 border-t border-puja-border/50">
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {sampleQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleAsk(q)}
                disabled={stage !== "idle" && stage !== "responding"}
                className="bg-white border border-puja-border px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-puja-text hover:border-puja-accent hover:text-puja-accent transition-colors disabled:opacity-50 shadow-sm"
              >
                {q}
              </button>
            ))}
          </div>
          <div className="text-center">
            <span className="text-[10px] text-puja-secondary font-medium uppercase tracking-widest flex items-center justify-center gap-1">
              Powered by ElevenLabs <div className="w-1.5 h-1.5 rounded-full bg-puja-accent"></div>
            </span>
          </div>
        </div>

      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes waveform {
          0% { height: 20%; }
          50% { height: 100%; }
          100% { height: 20%; }
        }
        .animate-waveform {
          animation: waveform 1s ease-in-out infinite;
        }
      `}} />
    </div>
  );
}
