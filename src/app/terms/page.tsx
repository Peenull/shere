'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, FileText, Info } from 'react-feather';

export default function TermsAndConditionsPage() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-yellow-400 selection:text-black">
      
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none -ml-64 -mt-64"></div>
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
           <Link href="/" className="flex items-center gap-3 group">
                <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 group-hover:bg-slate-800 transition-all">
                    <ArrowLeft size={18} className="text-gray-400 group-hover:text-white" />
                </div>
                <span className="text-xl font-black tracking-tighter italic text-yellow-400 group-hover:text-yellow-300 uppercase">SHERE.</span>
           </Link>
           <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Legal Documentation</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto pt-40 pb-32 px-6 relative z-10">
        <div className="mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900/80 border border-slate-800 rounded-full mb-6 backdrop-blur-md">
                <FileText size={14} className="text-yellow-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Terms of Service</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 italic uppercase leading-tight">
                Rules of the <span className="text-yellow-400">Network.</span>
            </h1>
            <p className="text-gray-500 font-medium max-w-xl italic">
                Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
        </div>

        <div className="prose prose-invert prose-yellow max-w-none space-y-12">
            
            <div className="bg-slate-900/40 border border-white/5 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-3xl"></div>
                <p className="text-gray-400 text-lg leading-relaxed font-medium mb-0">
                    Please read these Terms and Conditions ("Terms") carefully before using the Shere network. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. By using Shere, you join a decentralized financial community built on trust and shared growth.
                </p>
            </div>

            <section className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl font-black text-slate-900">01.</span>
                    <h2 className="text-3xl font-black tracking-tighter italic uppercase text-white">Accounts</h2>
                </div>
                <p className="text-gray-500 leading-relaxed font-medium pl-4 md:pl-16">
                    When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding your login credentials and the financial security of your connected Mobile Money account.
                </p>
            </section>

            <section className="space-y-6">
                 <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl font-black text-slate-900">02.</span>
                    <h2 className="text-3xl font-black tracking-tighter italic uppercase text-white">User Conduct</h2>
                </div>
                <p className="text-gray-500 leading-relaxed font-medium pl-4 md:pl-16">
                    You agree not to use the Service to: (a) violate any local, state, national, or international law; (b) stalk, harass, or harm another individual; (c) collect or store personal data about other users; (d) impersonate any person or entity, or otherwise misrepresent your affiliation with a person or entity. Misuse of the referral system to create fraudulent accounts is strictly prohibited.
                </p>
            </section>

            <section className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl font-black text-slate-900">03.</span>
                    <h2 className="text-3xl font-black tracking-tighter italic uppercase text-white">Intellectual Property</h2>
                </div>
                <p className="text-gray-500 leading-relaxed font-medium pl-4 md:pl-16">
                    The Shere brand, its original content, features, and the proprietary "Stake-Commission" algorithm are the exclusive property of Shere. Any reproduction or reverse-engineering of the network components without explicit permission is a violation of international intellectual property laws.
                </p>
            </section>

            <section className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl font-black text-slate-900">04.</span>
                    <h2 className="text-3xl font-black tracking-tighter italic uppercase text-white">Ownership & Shares</h2>
                </div>
                <p className="text-gray-500 leading-relaxed font-medium pl-4 md:pl-16">
                    Purchasing a share on Shere grants you a right to commission payouts from the social activities of your invites. It does not grant voting rights or physical equity in Shere Limited. The 50% stake cap is absolute and non-negotiable for the health of the community.
                </p>
            </section>

             <section className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl font-black text-slate-900">05.</span>
                    <h2 className="text-3xl font-black tracking-tighter italic uppercase text-white">Termination</h2>
                </div>
                <p className="text-gray-500 leading-relaxed font-medium pl-4 md:pl-16">
                    We reserve the right to suspend or terminate any account that violates our core community principles. Upon termination, your right to earn commissions from the network will cease immediately.
                </p>
            </section>

            <section className="space-y-6 pb-20">
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl font-black text-slate-900">06.</span>
                    <h2 className="text-3xl font-black tracking-tighter italic uppercase text-white">Contact Us</h2>
                </div>
                <div className="pl-4 md:pl-16">
                    <p className="text-gray-500 leading-relaxed font-medium mb-6">
                         If you have any questions about these Terms, our legal team is ready to assist you.
                    </p>
                    <a href="mailto:shereltd@gmail.com" className="inline-flex items-center gap-3 px-6 py-3 bg-slate-900 border border-slate-800 rounded-xl text-yellow-500 font-bold hover:bg-slate-800 transition-all">
                        <Shield size={16} /> shereltd@gmail.com
                    </a>
                </div>
            </section>

        </div>
      </main>

      <footer className="py-12 px-6 border-t border-slate-900 text-center relative z-10">
           <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.5em]">
               © {currentYear} SHERE SOCIAL NETWORK. COMPLIANCE DIVISION.
           </p>
      </footer>

    </div>
  );
}
