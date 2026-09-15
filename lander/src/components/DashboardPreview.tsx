import React from 'react';

export default function DashboardPreview() {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs font-semibold tracking-[0.2em] text-puja-secondary uppercase">
          PUBLIC BY DEFAULT
        </span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 mb-6">
          Every rupee, mathematically accounted for.
        </h2>
      </div>

      <div className="w-full bg-white border border-puja-border rounded-[32px] p-8 md:p-12 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Stats Column */}
          <div className="flex flex-col justify-center">
            <h3 className="font-serif text-2xl font-bold mb-8">Campaign Transparency</h3>
            
            <div className="space-y-6">
              <div>
                <div className="text-sm text-puja-secondary mb-1">Total Raised</div>
                <div className="font-serif text-4xl font-bold">₹12,45,000</div>
              </div>
              
              <div className="h-px bg-puja-border/50 w-full" />
              
              <div>
                <div className="text-sm text-puja-secondary mb-1">Total Spent</div>
                <div className="font-serif text-3xl font-bold text-puja-secondary">₹4,20,500</div>
              </div>

              <div className="h-px bg-puja-border/50 w-full" />
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-puja-secondary mb-1">Remaining Balance</div>
                  <div className="font-serif text-2xl font-bold text-puja-text">₹8,24,500</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-puja-secondary mb-1">Verified Expenses</div>
                  <div className="font-serif text-2xl font-bold text-puja-accent">14</div>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Column (Minimal Donut Visualization) */}
          <div className="flex items-center justify-center p-8 bg-gray-50/50 border border-puja-border rounded-3xl">
            <div className="w-full max-w-[280px]">
              <div className="text-sm font-medium mb-6 text-center">Expense Breakdown</div>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-puja-text"></div>
                    <span>Pandal & Decor</span>
                  </div>
                  <span className="font-medium">45%</span>
                </div>
                {/* Thin Line Bar */}
                <div className="w-full h-1 bg-puja-border rounded-full overflow-hidden">
                  <div className="h-full bg-puja-text w-[45%]"></div>
                </div>

                <div className="flex items-center justify-between text-sm pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-puja-accent"></div>
                    <span>Lighting & Audio</span>
                  </div>
                  <span className="font-medium">30%</span>
                </div>
                {/* Thin Line Bar */}
                <div className="w-full h-1 bg-puja-border rounded-full overflow-hidden">
                  <div className="h-full bg-puja-accent w-[30%]"></div>
                </div>

                <div className="flex items-center justify-between text-sm pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-puja-secondary"></div>
                    <span>Idol & Rituals</span>
                  </div>
                  <span className="font-medium">15%</span>
                </div>
                {/* Thin Line Bar */}
                <div className="w-full h-1 bg-puja-border rounded-full overflow-hidden">
                  <div className="h-full bg-puja-secondary w-[15%]"></div>
                </div>
                
                <div className="flex items-center justify-between text-sm pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <span>Misc</span>
                  </div>
                  <span className="font-medium">10%</span>
                </div>
                {/* Thin Line Bar */}
                <div className="w-full h-1 bg-puja-border rounded-full overflow-hidden">
                  <div className="h-full bg-gray-300 w-[10%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
