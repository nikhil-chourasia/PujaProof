"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import { clsx } from "@/lib/utils";

const links = [
  { href: "/", label: "Home (Campaign List)" },
  { href: "/campaign/ekta-sangha", label: "Campaign Detail" },
  { href: "/contribute", label: "Contribution Flow" },
  { href: "/dashboard", label: "Transparency Dashboard" },
  { href: "/committee", label: "Committee Dashboard" },
  { href: "/passes", label: "Digital Passes" },
  { href: "/scanner", label: "Gate Scanner" },
  { href: "/assistant", label: "Voice Assistant" },
];

export default function DemoController() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 bg-white border border-puja-border rounded-[24px] shadow-lg overflow-hidden w-64 animate-fade-in-up">
          <div className="bg-gray-50 px-4 py-3 border-b border-puja-border">
            <h3 className="text-xs uppercase tracking-wider text-puja-secondary font-semibold">Demo Navigation</h3>
          </div>
          <div className="flex flex-col py-2">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm text-puja-text hover:bg-gray-50 hover:text-puja-accent flex items-center justify-between"
              >
                {link.label}
                <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>
            ))}
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "flex items-center justify-center w-12 h-12 rounded-full shadow-md transition-colors",
          isOpen ? "bg-white border border-puja-border text-puja-text" : "bg-puja-text text-white hover:bg-black/90"
        )}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
    </div>
  );
}
