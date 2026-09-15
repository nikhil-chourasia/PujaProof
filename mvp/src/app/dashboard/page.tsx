"use client";

import { PieChart, ListChecks, CheckCircle2, Copy } from "lucide-react";
import { formatCurrency, mockVerifiedExpenses } from "@/data/mockData";

export default function TransparencyDashboard() {
  const totalRaised = 850000;
  const totalSpent = 530000;
  const balance = totalRaised - totalSpent;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 animate-fade-in-up">
      <div className="mb-10 text-center">
        <span className="text-xs uppercase tracking-[0.2em] text-puja-secondary font-medium mb-2 block">
          Ekta Sangha Durgotsav
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-puja-text">
          Transparency Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-[24px] border border-puja-border p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-puja-secondary mb-2">
            <PieChart className="w-4 h-4" /> Total Raised
          </div>
          <div className="text-2xl font-serif font-bold text-puja-text">{formatCurrency(totalRaised)}</div>
        </div>
        <div className="bg-white rounded-[24px] border border-puja-border p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-puja-secondary mb-2">
            <ListChecks className="w-4 h-4" /> Total Spent
          </div>
          <div className="text-2xl font-serif font-bold text-puja-text">{formatCurrency(totalSpent)}</div>
        </div>
        <div className="bg-puja-text text-white rounded-[24px] p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
             Available Balance
          </div>
          <div className="text-2xl font-serif font-bold">{formatCurrency(balance)}</div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-puja-border p-8 shadow-sm mb-8">
        <h3 className="font-serif text-xl font-bold text-puja-text mb-6">Spend by Category</h3>
        
        <div className="flex h-8 w-full rounded-full overflow-hidden mb-6">
          <div className="bg-puja-accent h-full w-[47%]" title="Pandal & Idol: 47%" />
          <div className="bg-gray-800 h-full w-[15%]" title="Lighting: 15%" />
          <div className="bg-gray-600 h-full w-[20%]" title="Cultural Programs: 20%" />
          <div className="bg-gray-400 h-full w-[10%]" title="Security: 10%" />
          <div className="bg-gray-200 h-full w-[8%]" title="Food: 8%" />
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-puja-accent" /> Pandal & Idol</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gray-800" /> Lighting</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gray-600" /> Cultural Programs</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gray-400" /> Security</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gray-200" /> Food</div>
        </div>
      </div>

      <div>
        <h3 className="font-serif text-xl font-bold text-puja-text mb-6">Verified On-Chain Expenses</h3>
        <div className="space-y-4">
          {mockVerifiedExpenses.map((exp) => (
            <div key={exp.id} className="bg-white border border-puja-border rounded-[24px] p-5 shadow-sm hover:border-puja-accent transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              <div className="flex-1">
                <div className="flex items-center justify-between md:justify-start gap-4 mb-1">
                  <span className="font-medium text-puja-text">{exp.category}</span>
                  <span className="text-lg font-serif font-bold text-puja-text">{formatCurrency(exp.amount)}</span>
                </div>
                <div className="text-sm text-puja-secondary">Paid to: {exp.vendor}</div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-puja-secondary">Approvals:</span>
                  {["Treasurer", "Secretary", "Head"].map(role => {
                    const approved = exp.status.includes(role);
                    return (
                      <div key={role} className={`px-2 py-0.5 rounded-full border ${approved ? 'bg-puja-accent-light border-puja-accent text-puja-accent' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
                        {role} {approved ? '✓' : '–'}
                      </div>
                    )
                  })}
                </div>
                
                <div className="flex items-center gap-2 text-xs font-mono bg-gray-50 px-3 py-1.5 rounded-[12px] border border-gray-200 self-start md:self-end">
                  Tx: {exp.hash} 
                  <a href="#" className="text-puja-accent hover:underline flex items-center gap-1 ml-2">
                    View <Copy className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
