"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  let persona = "Public";
  if (pathname.startsWith("/committee") || pathname.startsWith("/scanner")) {
    persona = "Committee";
  } else if (pathname.startsWith("/contribute") || pathname.startsWith("/passes")) {
    persona = "Contributor";
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-puja-border px-6 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-serif text-2xl font-bold text-puja-text hover:opacity-90 transition-opacity">
            PujaProof
          </Link>
          <div className="h-5 w-[1px] bg-puja-border" />
          <img 
            src="/poppins_flat_black.svg" 
            alt="Poppins" 
            className="w-24 object-contain opacity-80" 
          />
        </div>

        <div className="hidden sm:flex items-center gap-2 border-l border-puja-border pl-4 sm:pl-6">
          <span className="text-xs uppercase tracking-wider text-puja-secondary font-medium">Persona:</span>
          <span className="text-xs font-semibold text-puja-accent bg-puja-accent-light px-2.5 py-1 rounded-[10px] border border-puja-accent/20">
            {persona}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-puja-accent bg-puja-accent-light px-3 py-1 rounded-full border border-puja-accent/25 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-puja-accent animate-pulse" />
          Demo Mode
        </span>
      </div>
    </nav>
  );
}
