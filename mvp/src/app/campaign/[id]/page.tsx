"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ChevronRight, Clock, MapPin, ArrowRight } from "lucide-react";
import { mockCampaigns, formatCurrency } from "@/data/mockData";

export default function CampaignDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const campaign = mockCampaigns.find(c => c.id === resolvedParams.id);
  const [animatedRaised, setAnimatedRaised] = useState(0);

  useEffect(() => {
    if (campaign) {
      const duration = 1500;
      const steps = 60;
      const stepValue = campaign.raised / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += stepValue;
        if (current >= campaign.raised) {
          setAnimatedRaised(campaign.raised);
          clearInterval(interval);
        } else {
          setAnimatedRaised(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(interval);
    }
  }, [campaign]);

  if (!campaign) {
    return notFound();
  }

  const progress = Math.min(100, Math.round((campaign.raised / campaign.target) * 100));

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 animate-fade-in-up">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-puja-secondary mb-8">
        <Link href="/" className="hover:text-puja-text transition-colors">Campaigns</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-puja-text font-medium truncate">{campaign.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          
          <div className="h-64 sm:h-72 bg-gray-100 w-full rounded-[32px] relative overflow-hidden border border-puja-border shadow-inner">
            {campaign.coverImage ? (
              <img 
                src={campaign.coverImage} 
                alt={campaign.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#8b5cf6 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-puja-text">{campaign.name}</h1>
              {campaign.verified && (
                <div className="bg-puja-accent-light text-puja-accent p-1.5 rounded-[12px]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-puja-secondary">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {campaign.location}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {campaign.daysRemaining} days left</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-wider text-puja-secondary font-semibold">Spending Breakdown</h3>
            <div className="bg-white border border-puja-border rounded-[24px] p-6 space-y-4">
              {campaign.expenses.map((exp, idx) => {
                const percent = Math.round((exp.amount / campaign.target) * 100);
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-puja-text">{exp.category}</span>
                      <span className="text-puja-secondary">{formatCurrency(exp.amount)}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full">
                      <div className="h-full bg-gray-800 rounded-full" style={{ width: `${Math.max(2, percent)}%` }} />
                    </div>
                  </div>
                )
              })}
              <div className="pt-4 mt-2 border-t border-puja-border text-center">
                <Link href="/dashboard" className="text-sm text-puja-accent font-medium hover:underline flex items-center justify-center gap-1">
                  View Transparency Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-wider text-puja-secondary font-semibold">Sponsors</h3>
            <div className="flex flex-wrap gap-3">
              {campaign.sponsors.map((sponsor, idx) => (
                <div key={idx} className="bg-white border border-puja-border rounded-[16px] px-4 py-2 text-sm font-medium text-puja-text">
                  {sponsor}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white border border-puja-border rounded-[32px] p-6 shadow-sm space-y-6">
            
            <div className="space-y-2">
              <div className="text-3xl font-serif font-bold text-puja-text">
                {formatCurrency(animatedRaised)}
              </div>
              <div className="text-sm text-puja-secondary">
                raised of {formatCurrency(campaign.target)}
              </div>
            </div>

            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-puja-accent rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>

            <Link 
              href="/contribute"
              className="w-full block text-center bg-black text-white rounded-[20px] py-4 font-medium hover:bg-black/90 transition-colors"
            >
              Contribute Now
            </Link>

            <div className="pt-6 border-t border-puja-border">
              <h4 className="text-sm font-semibold mb-4 text-puja-text">Recent Contributions</h4>
              <div className="space-y-4">
                {campaign.contributions.map((c, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-medium text-puja-text">{c.name}</p>
                      <p className="text-xs text-puja-secondary">{c.time}</p>
                    </div>
                    <div className="font-medium text-puja-text">{formatCurrency(c.amount)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
