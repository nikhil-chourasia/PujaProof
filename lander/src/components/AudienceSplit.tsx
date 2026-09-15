import React from 'react';
import { Settings, CheckSquare, Plus, Building2, UserCircle, Briefcase } from 'lucide-react';

export default function AudienceSplit() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* For Committees */}
        <div className="p-10 rounded-[32px] border border-puja-border bg-white flex flex-col h-full hover:border-puja-accent transition-colors">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-puja-secondary uppercase mb-8">
            <Building2 className="w-4 h-4 stroke-[2px]" /> For Puja Committees
          </div>
          
          <h3 className="font-serif text-3xl font-bold mb-6">Manage the Treasury</h3>
          <p className="text-puja-secondary leading-relaxed mb-10 flex-grow">
            Launch campaigns, track real-time UPI collections, log expenses with vendor details, and require multi-sig approvals for payouts. Built for seamless committee coordination.
          </p>

          <ul className="space-y-4 text-sm font-medium">
            <li className="flex items-center gap-3">
              <Plus className="w-5 h-5 text-puja-accent" /> Create Campaign Dashboard
            </li>
            <li className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-puja-accent" /> Manage Multi-sig Treasury
            </li>
            <li className="flex items-center gap-3">
              <CheckSquare className="w-5 h-5 text-puja-accent" /> Log Verified Expenses
            </li>
          </ul>
        </div>

        {/* For Sponsors & Vendors */}
        <div className="p-10 rounded-[32px] border border-puja-border bg-white flex flex-col h-full hover:border-puja-accent transition-colors">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-puja-secondary uppercase mb-8">
            <UserCircle className="w-4 h-4 stroke-[2px]" /> For Sponsors & Vendors
          </div>
          
          <h3 className="font-serif text-3xl font-bold mb-6">Transparent Sponsorships</h3>
          <p className="text-puja-secondary leading-relaxed mb-10 flex-grow">
            Sponsors gain exclusive dashboard access and digital credentials. Registered vendors receive verified payouts directly linked to immutable invoice hashes.
          </p>

          <ul className="space-y-4 text-sm font-medium">
            <li className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-puja-text" /> Sponsor Dashboard Access
            </li>
            <li className="flex items-center gap-3">
              <CheckSquare className="w-5 h-5 text-puja-text" /> Registered Vendor Payments
            </li>
            <li className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-puja-text" /> Digital VIP Passes
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
