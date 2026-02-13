'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, Shield, Eye, Database } from 'react-feather';

export default function PrivacyPolicyPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-yellow-400 selection:text-black">
      
      {/* Background Orbs */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -mr-64 -mt-64"></div>
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
           <Link href="/" className="flex items-center gap-3 group">
                <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 group-hover:bg-slate-800 transition-all">
                    <ArrowLeft size={18} className="text-gray-400 group-hover:text-white" />
                </div>
                <span className="text-xl font-black tracking-tighter italic text-yellow-400 group-hover:text-yellow-300 uppercase">SHERE.</span>
           </Link>
           <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Privacy Documentation</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto pt-40 pb-32 px-6 relative z-10">
        <div className="mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900/80 border border-slate-800 rounded-full mb-6 backdrop-blur-md">
                <Lock size={14} className="text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Guarded Network</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 italic uppercase leading-tight">
                Secure by <span className="text-blue-400">Design.</span>
            </h1>
            <p className="text-gray-500 font-medium max-w-xl italic">
                Protecting your digital assets and identity in the Shere ecosystem. Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
        </div>

        <div className="prose prose-invert prose-blue max-w-none space-y-16">
            
            <div className="bg-slate-900/40 border border-white/5 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/5 rounded-full blur-3xl"></div>
                <p className="text-gray-400 text-lg leading-relaxed font-medium mb-0">
                    Welcome to Shere. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our network. We believe transparency is the foundation of trust.
                </p>
            </div>

            <section className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl font-black text-slate-900">01.</span>
                    <h2 className="text-3xl font-black tracking-tighter italic uppercase text-white">Data Collection</h2>
                </div>
                <div className="pl-4 md:pl-16 space-y-4 text-gray-500 leading-relaxed font-medium">
                    <p>We collect only what is necessary to power your earning potential:</p>
                    <ul className="grid md:grid-cols-2 gap-4 list-none p-0">
                        <li className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                            <Shield className="text-blue-400 shrink-0 mt-1" size={18}/>
                            <div>
                                <strong className="text-white block mb-1">Personal Data</strong> 
                                Names, emails, and demographic info provided during registration.
                            </div>
                        </li>
                        <li className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                            <Eye className="text-blue-400 shrink-0 mt-1" size={18}/>
                            <div>
                                <strong className="text-white block mb-1">Derivative Data</strong> 
                                Browser type, access times, and interaction logs for performance.
                            </div>
                        </li>
                        <li className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-2xl border border-white/5 col-span-2">
                            <Database className="text-blue-400 shrink-0 mt-1" size={18}/>
                            <div>
                                <strong className="text-white block mb-1">Financial Data</strong> 
                                Shere does not store payment credentials. Transactions are handled via verified local MoMo/OM operators.
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            <section className="space-y-6">
                 <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl font-black text-slate-900">02.</span>
                    <h2 className="text-3xl font-black tracking-tighter italic uppercase text-white">How We Use Data</h2>
                </div>
                <p className="text-gray-500 leading-relaxed font-medium pl-4 md:pl-16">
                    Data isn't just info; it's the fuel for your Shere experience. We use it to:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 md:pl-16">
                    {[
                        "Securely manage your commission payouts",
                        "Verify and track referral network growth",
                        "Optimize system performance locally",
                        "Prevent fraudulent staking activities"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-gray-400 font-bold p-3 bg-slate-900/40 rounded-xl border border-white/5">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            {item}
                        </div>
                    ))}
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl font-black text-slate-900">03.</span>
                    <h2 className="text-3xl font-black tracking-tighter italic uppercase text-white">Zero-Share Policy</h2>
                </div>
                <p className="text-gray-500 leading-relaxed font-medium pl-4 md:pl-16">
                    We do not share, sell, rent, or trade your information with any third parties for promotional purposes. Your data belongs to you—we just manage the ledger. We only disclose data when required by law or to protect the safety of our community.
                </p>
            </section>

            <section className="space-y-6 pb-20">
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl font-black text-slate-900">04.</span>
                    <h2 className="text-3xl font-black tracking-tighter italic uppercase text-white">Contact Privacy</h2>
                </div>
                <div className="pl-4 md:pl-16">
                    <p className="text-gray-500 leading-relaxed font-medium mb-6">
                         Have privacy concerns or want to request a data report? Contact our Data Protection Officer.
                    </p>
                    <a href="mailto:shereltd@gmail.com" className="inline-flex items-center gap-3 px-6 py-3 bg-slate-900 border border-slate-800 rounded-xl text-blue-500 font-bold hover:bg-slate-800 transition-all">
                        <Lock size={16} /> privacy@shere.social
                    </a>
                </div>
            </section>

        </div>
      </main>

      <footer className="py-12 px-6 border-t border-slate-900 text-center relative z-10">
           <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.5em]">
               © {currentYear} SHERE SOCIAL NETWORK. ENCRYPTION LAYER V1.0.
           </p>
      </footer>

    </div>
  );
}
