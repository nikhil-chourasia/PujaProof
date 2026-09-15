export const mockCampaigns = [
  {
    id: "ekta-sangha",
    name: "Ekta Sangha Durgotsav",
    location: "Jodhpur Park, Kolkata",
    target: 800000,
    raised: 542000,
    daysRemaining: 12,
    verified: true,
    coverImage: "/demo-img-1.jpg",
    expenses: [
      { category: "Pandal & Idol", amount: 250000 },
      { category: "Lighting", amount: 47000 },
      { category: "Security", amount: 30000 },
      { category: "Cultural Programs", amount: 65000 },
      { category: "Food & Prasad", amount: 150000 },
    ],
    sponsors: ["Shree Electricals", "Bengal Jewellers", "LocalTech Inc"],
    contributions: [
      { name: "Anonymous", amount: 501, time: "2 min ago" },
      { name: "Rahul S.", amount: 2100, time: "15 min ago" },
      { name: "Priya D.", amount: 1101, time: "1 hour ago" },
      { name: "Anonymous", amount: 5001, time: "2 hours ago" },
    ]
  },
  {
    id: "netaji-nagar",
    name: "Netaji Nagar Puja Committee",
    location: "Netaji Nagar, Kolkata",
    target: 1200000,
    raised: 850000,
    daysRemaining: 15,
    verified: true,
    coverImage: "/demo-img-2.jpg",
    expenses: [
      { category: "Pandal & Idol", amount: 400000 },
      { category: "Lighting", amount: 80000 },
      { category: "Security", amount: 50000 },
    ],
    sponsors: ["City Bank", "ABC Motors"],
    contributions: [
      { name: "Amit B.", amount: 1000, time: "5 min ago" },
      { name: "Anonymous", amount: 2500, time: "10 min ago" },
    ]
  }
];

export const mockVendors = [
  { id: "v1", name: "Shree Electricals", category: "Lighting", status: "Verified" },
  { id: "v2", name: "Maa Durga Decorators", category: "Decoration", status: "Verified" },
  { id: "v3", name: "SafeGuard Security", category: "Security", status: "Pending" },
  { id: "v4", name: "Annapurna Caterers", category: "Catering", status: "Verified" },
  { id: "v5", name: "SoundBlaster Audio", category: "Sound", status: "Verified" },
];

export const mockVerifiedExpenses = [
  { id: "exp1", category: "Pandal & Idol", amount: 150000, vendor: "Maa Durga Decorators", status: ["Treasurer", "Secretary", "Head"], hash: "0x3a4b...91e2" },
  { id: "exp2", category: "Lighting", amount: 47000, vendor: "Shree Electricals", status: ["Treasurer", "Secretary"], hash: "0x8f2c...4d5a" },
  { id: "exp3", category: "Security", amount: 15000, vendor: "SafeGuard Security", status: ["Treasurer"], hash: "0x1b9a...7c8d" },
];

export const mockPasses = [
  { id: "pass1", tier: "Supporter Badge", date: "Oct 1, 2026", status: "Valid" },
  { id: "pass2", tier: "VIP Pass", date: "Oct 2, 2026", status: "Used" },
  { id: "pass3", tier: "Priority Darshan Pass", date: "Oct 3, 2026", status: "Revoked" },
];

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};
