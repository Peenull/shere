'use client';


import React from 'react';
import Link from 'next/link';
import { 
    ArrowLeft, 
    Zap, 
    PieChart, 
    DollarSign, 
    Shield, 
    HelpCircle, 
    Smartphone,
    TrendingUp,
    ChevronRight,
    Search,
    ArrowRight,
    Users
} from 'react-feather';

export default function FAQPage() {
  const faqItems = [
    {
      icon: <PieChart size={20} />,
      q: "How do I buy a share?",
      a: "You can purchase a percentage of referral earnings, starting from 1% for 200 FCFA. The higher your share, the more you earn. Simply go to your dashboard and click on the 'Buy Shares' button to get started."
    },
    {
      icon: <Users size={20} />,
      q: "How do referrals work?",
      a: "Invite your friends to join Shere. When they purchase shares, you get a percentage of their investment instantly based on your own stake percentage. It's that simple."
    },
    {
      icon: <DollarSign size={20} />,
      q: "How do I withdraw my earnings?",
      a: "You can withdraw your earnings from your dashboard. Click on the 'Withdraw' button and follow the instructions. Please note that withdrawals are processed manually by our team to ensure top-tier security for all members."
    },
    {
      icon: <Shield size={20} />,
      q: "What is the maximum share I can own?",
      a: "To ensure a healthy and distributed community, the maximum share any single member can own is 50%. This keeps the power in the hands of the many, not the few."
    },
    {
      icon: <TrendingUp size={20} />,
      q: "Can I sell my shares back?",
      a: "Currently, shares are long-term commitments to the network. Once purchased, they generate passive returns based on your referral activity and the growth of the community."
    },
    {
        icon: <Smartphone size={20} />,
        q: "Which payment methods are supported?",
        a: "We currently support MTN Mobile Money and Orange Money for all transactions. This ensures instant and easy access for our community members across the region."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-yellow-400 selection:text-black">
      
      {/* Background Orbs */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none -mr-64 -mt-64"></div>
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -ml-64 -mb-64"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
           <Link href="/" className="flex items-center gap-3 group">
                <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 group-hover:bg-slate-800 transition-all">
                    <ArrowLeft size={18} className="text-gray-400 group-hover:text-white" />
                </div>
                <span className="text-xl font-black tracking-tighter italic text-yellow-400 group-hover:text-yellow-300 uppercase">SHERE.</span>
           </Link>
           <Link href="/about" className="text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                How it works
           </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto pt-40 pb-32 px-6 relative z-10">
        <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900/80 border border-slate-800 rounded-full mb-6 backdrop-blur-md">
                <HelpCircle size={14} className="text-yellow-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Support Center</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 italic uppercase">
                Got <span className="text-yellow-400">Questions?</span>
            </h1>
            <p className="text-gray-500 font-medium max-w-xl mx-auto">
                Everything you need to know about the Shere ecosystem, stakes, and commissions.
            </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid gap-6">
            {faqItems.map((item, i) => (
                <details key={i} className="group bg-slate-900/40 border border-white/5 rounded-[2rem] p-8 hover:bg-slate-900/60 transition-all hover:border-yellow-400/20 shadow-xl overflow-hidden">
                    <summary className="flex items-center justify-between cursor-pointer list-none outline-none">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-gray-500 group-open:text-yellow-400 transition-colors border border-white/5">
                                {item.icon}
                            </div>
                            <h3 className="text-lg md:text-xl font-black tracking-tight text-white/90 group-open:text-yellow-400 transition-colors italic uppercase leading-tight">
                                {item.q}
                            </h3>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-open:rotate-90 transition-transform duration-300">
                            <ChevronRight size={16} className="text-gray-600" />
                        </div>
                    </summary>
                    <div className="mt-8 pt-6 border-t border-white/5 text-gray-400 leading-relaxed font-medium animate-in slide-in-from-top-2 duration-300">
                        {item.a}
                    </div>
                </details>
            ))}
        </div>

        {/* CTA */}
        <div className="mt-24 p-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-[3rem] text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-6 uppercase italic tracking-tighter relative z-10">Still need help?</h2>
            <Link href="mailto:shereltd@gmail.com" className="inline-flex items-center gap-3 px-8 py-4 bg-black text-yellow-400 font-black rounded-2xl hover:scale-105 transition-all shadow-xl relative z-10 uppercase tracking-widest text-xs">
                Contact Support <ArrowRight size={18} />
            </Link>
        </div>
      </main>
    </div>
  );
}
