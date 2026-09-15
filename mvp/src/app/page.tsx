"use client";

import Link from "next/link";
import { CheckCircle2, MapPin, Clock } from "lucide-react";
import { mockCampaigns, formatCurrency } from "@/data/mockData";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-in-up">
      <div className="mb-10 text-center">
        <span className="text-xs uppercase tracking-[0.2em] text-puja-secondary font-medium mb-2 block">
          Discover
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-puja-text">
          Verified Campaigns
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockCampaigns.map((campaign) => {
          const progress = Math.min(100, Math.round((campaign.raised / campaign.target) * 100));

          return (
            <Link 
              key={campaign.id} 
              href={`/campaign/${campaign.id}`}
              className="group bg-white rounded-[32px] border border-puja-border overflow-hidden hover:border-puja-accent transition-all shadow-sm hover:shadow-md block"
            >
              <div className="h-48 bg-gray-100 w-full relative overflow-hidden">
                {campaign.coverImage ? (
                  <img 
                    src={campaign.coverImage} 
                    alt={campaign.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#8b5cf6 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-serif text-2xl text-gray-300 font-bold">{campaign.name.charAt(0)}</span>
                    </div>
                  </>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-xl font-bold text-puja-text group-hover:text-puja-accent transition-colors">
                    {campaign.name}
                  </h3>
                  {campaign.verified && (
                    <div className="bg-puja-accent-light text-puja-accent p-1.5 rounded-[12px]" title="Verified by PujaProof">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-puja-secondary mb-6">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{campaign.location}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-puja-text">{formatCurrency(campaign.raised)}</span>
                    <span className="text-puja-secondary">of {formatCurrency(campaign.target)}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-puja-accent rounded-full transition-all duration-1000"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-puja-border flex items-center gap-2 text-sm text-puja-secondary">
                  <Clock className="w-4 h-4" />
                  <span>{campaign.daysRemaining} days remaining</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
