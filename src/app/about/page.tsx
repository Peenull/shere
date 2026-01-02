'use client';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ArrowRight, CheckCircle, Users, BarChart2 } from "react-feather";
import Link from 'next/link';

export default function About() {
  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        
        {/* --- Hero Section --- */}
        <section className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
            About Shere
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            We're on a mission to make investing accessible, transparent, and community-driven. Discover the power of collective growth.
          </p>
        </section>

        {/* --- What is Shere? --- */}
        <section className="mb-20 bg-slate-900 border border-gray-800/50 rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold mb-4 text-white">What is Shere?</h2>
                    <div className="space-y-4 text-slate-300 leading-relaxed">
                        <p>
                            Shere is a revolutionary platform that reimagines investing from the ground up. At its core, Shere is a shared investment pool fueled by its community. Members purchase shares to contribute to a collective fund, which generates returns through ad revenue and other ventures.
                        </p>
                        <p>
                            We believe that financial growth shouldn't be complex or exclusive. Our model is built on the simple idea that we can achieve more together than we can alone. Your "Share Percentage" represents your stake in our collective success, and as the community pool prospers, so do you.
                        </p>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-yellow-500/10 text-yellow-400"><Users size={20}/></div>
                        <div>
                            <h4 className="font-bold text-white">Community-Powered</h4>
                            <p className="text-sm text-slate-400">Our strength lies in our community. Every member contributes to and benefits from the pool's growth.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-yellow-500/10 text-yellow-400"><CheckCircle size={20}/></div>
                        <div>
                            <h4 className="font-bold text-white">Transparent Earnings</h4>
                            <p className="text-sm text-slate-400">Track your earnings and see exactly how your share of the revenue is calculated. No hidden fees, no surprises.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-yellow-500/10 text-yellow-400"><BarChart2 size={20}/></div>
                        <div>
                            <h4 className="font-bold text-white">Passive Growth</h4>
                            <p className="text-sm text-slate-400">Earn passively as the community pool generates profit. Your investment works for you, day and night.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        {/* --- How It Works --- */}
        <section id="how-it-works" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800/50 text-center">
              <div className="text-3xl font-bold mb-4 text-yellow-400">1</div>
              <h3 className="text-xl font-bold mb-2 text-white">Sign Up</h3>
              <p className="text-slate-400">Create your account in minutes with just a phone number.</p>
            </div>
            {/* Step 2 */}
            <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800/50 text-center">
              <div className="text-3xl font-bold mb-4 text-yellow-400">2</div>
              <h3 className="text-xl font-bold mb-2 text-white">Fund & Buy Shares</h3>
              <p className="text-slate-400">Deposit funds easily and purchase shares to join the investment pool.</p>
            </div>
            {/* Step 3 */}
            <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800/50 text-center">
              <div className="text-3xl font-bold mb-4 text-yellow-400">3</div>
              <h3 className="text-xl font-bold mb-2 text-white">Earn Passively</h3>
              <p className="text-slate-400">Watch your investment grow as the community pool generates daily profits.</p>
            </div>
            {/* Step 4 */}
            <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800/50 text-center">
              <div className="text-3xl font-bold mb-4 text-yellow-400">4</div>
              <h3 className="text-xl font-bold mb-2 text-white">Invite & Earn More</h3>
              <p className="text-slate-400">Boost your share percentage by inviting friends with your referral link.</p>
            </div>
            {/* Step 5 */}
             <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800/50 text-center">
              <div className="text-3xl font-bold mb-4 text-yellow-400">5</div>
              <h3 className="text-xl font-bold mb-2 text-white">Withdraw Anytime</h3>
              <p className="text-slate-400">Securely access and withdraw your capital and earnings whenever you need.</p>
            </div>
             {/* CTA Card */}
            <div className="bg-yellow-400/10 p-8 rounded-2xl border border-yellow-400/30 text-center flex flex-col justify-center items-center">
                <h3 className="text-xl font-bold mb-2 text-white">Ready to Join?</h3>
                <p className="text-yellow-200/80 mb-4">Start your investment journey today.</p>
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-black bg-yellow-400 hover:bg-yellow-300 transition-colors font-bold px-6 py-3 rounded-lg group">
                    <span>Get Started</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                </Link>
            </div>
          </div>
        </section>
        
      </main>
      <Footer />
    </div>
  );
}
