"use client";

import { useState } from "react";
import { Users, FileText, CheckCircle2, ShieldCheck, Plus, UploadCloud, Loader2 } from "lucide-react";
import { formatCurrency, mockVendors } from "@/data/mockData";
import { wait, clsx } from "@/lib/utils";

export default function CommitteeDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [vendor, setVendor] = useState("");
  const [category, setCategory] = useState("");
  
  const [approvalStatus, setApprovalStatus] = useState<"idle" | "approving" | "approved">("idle");
  const [signatures, setSignatures] = useState<string[]>([]);

  const handleCreateExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    setApprovalStatus("approving");
    
    // Simulate multi-sig
    await wait(1000);
    setSignatures(["Treasurer"]);
    await wait(1200);
    setSignatures(["Treasurer", "Secretary"]);
    await wait(1000);
    
    setApprovalStatus("approved");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setApprovalStatus("idle");
    setSignatures([]);
    setAmount("");
    setVendor("");
    setCategory("");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-puja-secondary font-medium mb-1 block">
            Organizer View
          </span>
          <h1 className="font-serif text-3xl font-bold text-puja-text">
            Committee Dashboard
          </h1>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-puja-accent text-white px-5 py-2.5 rounded-[16px] font-medium flex items-center gap-2 hover:bg-purple-600 transition-colors"
        >
          <Plus className="w-4 h-4" /> Create Expense
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-[24px] border border-puja-border p-6 shadow-sm">
          <div className="text-sm text-puja-secondary mb-1">Treasury Balance</div>
          <div className="text-2xl font-serif font-bold text-puja-text">{formatCurrency(320000)}</div>
        </div>
        <div className="bg-white rounded-[24px] border border-puja-border p-6 shadow-sm">
          <div className="text-sm text-puja-secondary mb-1">Total Contributors</div>
          <div className="text-2xl font-serif font-bold text-puja-text flex items-center gap-2">
            1,204 <Users className="w-5 h-5 text-puja-secondary opacity-50" />
          </div>
        </div>
        <div className="bg-white rounded-[24px] border border-puja-border p-6 shadow-sm">
          <div className="text-sm text-puja-secondary mb-1">Pending Approvals</div>
          <div className="text-2xl font-serif font-bold text-puja-text flex items-center gap-2">
            2 <FileText className="w-5 h-5 text-yellow-500 opacity-50" />
          </div>
        </div>
        <div className="bg-white rounded-[24px] border border-puja-border p-6 shadow-sm">
          <div className="text-sm text-puja-secondary mb-1">Verified Vendors</div>
          <div className="text-2xl font-serif font-bold text-puja-text flex items-center gap-2">
            {mockVendors.filter(v => v.status === 'Verified').length} <ShieldCheck className="w-5 h-5 text-green-500 opacity-50" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-puja-border shadow-sm overflow-hidden mb-10">
        <div className="px-6 py-5 border-b border-puja-border bg-gray-50 flex justify-between items-center">
          <h3 className="font-semibold text-puja-text">Manage Vendors & Sponsors</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockVendors.map(vendor => (
              <div key={vendor.id} className="border border-puja-border rounded-[20px] p-4 flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-puja-text">{vendor.name}</h4>
                  <p className="text-xs text-puja-secondary">{vendor.category}</p>
                </div>
                {vendor.status === 'Verified' ? (
                  <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-[8px] font-medium border border-green-100 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                ) : (
                  <span className="text-xs bg-yellow-50 text-yellow-600 px-2 py-1 rounded-[8px] font-medium border border-yellow-100">
                    Pending
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CREATE EXPENSE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl overflow-hidden border border-puja-border flex flex-col max-h-[90vh]">
            
            <div className="px-6 py-5 border-b border-puja-border flex justify-between items-center bg-gray-50">
              <h3 className="font-serif text-xl font-bold text-puja-text">Create Expense</h3>
              <button onClick={closeModal} className="text-puja-secondary hover:text-puja-text text-xl">&times;</button>
            </div>

            <div className="p-6 overflow-y-auto">
              {approvalStatus === "idle" && (
                <form id="expense-form" onSubmit={handleCreateExpense} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-puja-text mb-1">Vendor</label>
                    <select required value={vendor} onChange={e => setVendor(e.target.value)} className="w-full px-4 py-3 rounded-[16px] border border-puja-border text-sm focus:outline-none focus:border-puja-accent bg-white">
                      <option value="">Select Vendor...</option>
                      {mockVendors.map(v => <option key={v.id} value={v.name}>{v.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-puja-text mb-1">Category</label>
                    <select required value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-3 rounded-[16px] border border-puja-border text-sm focus:outline-none focus:border-puja-accent bg-white">
                      <option value="">Select Category...</option>
                      <option value="Pandal & Idol">Pandal & Idol</option>
                      <option value="Lighting">Lighting</option>
                      <option value="Security">Security</option>
                      <option value="Food">Food</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-puja-text mb-1">Amount (₹)</label>
                    <input required type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full px-4 py-3 rounded-[16px] border border-puja-border text-sm focus:outline-none focus:border-puja-accent" placeholder="e.g. 5000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-puja-text mb-1">Invoice Document</label>
                    <div className="w-full border-2 border-dashed border-puja-border rounded-[16px] py-8 flex flex-col items-center justify-center text-puja-secondary hover:bg-gray-50 hover:border-puja-accent transition-colors cursor-pointer">
                      <UploadCloud className="w-8 h-8 mb-2" />
                      <span className="text-sm">Click to upload invoice PDF/Image</span>
                    </div>
                  </div>
                </form>
              )}

              {approvalStatus === "approving" && (
                <div className="py-10 flex flex-col items-center text-center">
                  <h4 className="font-serif text-xl font-bold text-puja-text mb-2">Awaiting 2 of 3 signatures</h4>
                  <p className="text-sm text-puja-secondary mb-8">Multi-sig smart contract approval in progress...</p>
                  
                  <div className="flex items-center justify-center gap-6">
                    {["Treasurer", "Secretary", "Head"].map((role, idx) => {
                      const signed = signatures.includes(role);
                      return (
                        <div key={idx} className="flex flex-col items-center gap-2">
                          <div className={clsx(
                            "w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500",
                            signed ? "bg-puja-accent text-white" : "border-2 border-puja-accent/30 text-puja-accent/50"
                          )}>
                            {role.charAt(0)}
                          </div>
                          <span className={clsx("text-xs font-medium", signed ? "text-puja-text" : "text-puja-secondary")}>
                            {role}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {approvalStatus === "approved" && (
                <div className="py-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-puja-text mb-2">Approved — payment released</h4>
                  <p className="text-sm text-puja-secondary mb-2">Expense has been recorded on the transparency dashboard.</p>
                  <p className="text-xs font-mono text-puja-secondary bg-gray-50 px-3 py-1 rounded-[8px]">Tx: 0xa94f...2d1b</p>
                </div>
              )}

            </div>
            
            <div className="px-6 py-4 border-t border-puja-border bg-gray-50 flex justify-end gap-3">
              <button onClick={closeModal} className="px-5 py-2.5 rounded-[16px] text-sm font-medium text-puja-secondary hover:text-puja-text transition-colors">
                {approvalStatus === "approved" ? "Close" : "Cancel"}
              </button>
              {approvalStatus === "idle" && (
                <button form="expense-form" type="submit" className="bg-black text-white px-6 py-2.5 rounded-[16px] text-sm font-medium hover:bg-black/90 transition-colors">
                  Submit for Approval
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
