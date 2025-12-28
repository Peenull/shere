'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Users, TrendingUp, Award, CheckCircle } from 'react-feather';

// A reusable feature card for the 'How it Works' and 'Why Shere' sections
const FeatureCard = ({ icon, title, text, bgColor }: { icon: React.ReactNode; title: string; text: string; bgColor?: string }) => (
  <div className={`${bgColor || 'bg-slate-900/60'} p-6 rounded-2xl border border-gray-800/80 shadow-lg`}>
    <div className="w-12 h-12 bg-yellow-400/10 text-yellow-400 flex items-center justify-center rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{text}</p>
  </div>
);

export default function LandingPage() {
  return (
    <div className="bg-slate-950 text-white font-sans overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center text-center p-4 md:p-8">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-black opacity-80" />
        <div className="absolute inset-0 mix-blend-soft-light" style={{ backgroundImage: "url('/grid.svg')", backgroundSize: '100px 100px' }} />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mb-4">
            The Future of Earning is Social.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10">
            Welcome to Shere. The platform that pays you to grow our community. Turn your connections into cash, right from your phone.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-yellow-400 text-black font-bold text-lg rounded-full hover:bg-yellow-300 transition-all active:scale-95 shadow-lg shadow-yellow-400/20 transform hover:-translate-y-1">
              Start Earning Now <ArrowRight size={20} />
            </Link>
            <Link href="/signin" className="text-gray-400 hover:text-white transition-all font-semibold">
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">How It Works</h2>
            <p className="text-lg text-gray-500 mt-2">Earning has never been this straightforward.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Users size={24} />} 
              title="1. Get Your Link" 
              text="Sign up in under a minute and receive your unique invite link instantly. This is your personal key to the Shere network." 
            />
            <FeatureCard 
              icon={<TrendingUp size={24} />} 
              title="2. Share & Invite" 
              text="Share your link with friends, family, and on social media. The more you share, the more your potential earnings grow."
            />
            <FeatureCard 
              icon={<Award size={24} />} 
              title="3. Get Paid" 
              text="Earn for every new member who joins through your link. Watch your balance grow in real-time on your personal dashboard."
            />
          </div>
        </div>
      </section>

      {/* --- WHY SHERE SECTION --- */}
      <section className="py-20 px-4 md:px-8 bg-black/20">
        <div className="max-w-6xl mx-auto text-center">
           <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-12">Built for You. Powered by Community.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            <FeatureCard 
              bgColor="bg-transparent"
              icon={<CheckCircle size={24} />} 
              title="Simple & Direct" 
              text="No complex tasks. Just share your link and earn."
            />
            <FeatureCard 
              bgColor="bg-transparent"
              icon={<CheckCircle size={24} />} 
              title="For Everyone" 
              text="No special skills needed. If you have a phone, you can earn."
            />
            <FeatureCard 
              bgColor="bg-transparent"
              icon={<CheckCircle size={24} />} 
              title="Built for Africa" 
              text="A system designed for the African market, with local understanding."
            />
            <FeatureCard 
              bgColor="bg-transparent"
              icon={<CheckCircle size={24} />} 
              title="Instant Tracking" 
              text="See your earnings update in real-time. No waiting."
            />
          </div>
        </div>
      </section>

      {/* --- FINAL CTA SECTION --- */}
      <section className="py-24 px-4 md:px-8 text-center">
         <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mb-4">Ready to Take Control?</h2>
          <p className="text-xl text-gray-300 mb-10">Don't miss out on the simplest way to monetize your social network. Your future starts now.</p>
          <Link href="/signup" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-12 py-5 bg-yellow-400 text-black font-bold text-xl rounded-full hover:bg-yellow-300 transition-all active:scale-95 shadow-2xl shadow-yellow-400/20 transform hover:-translate-y-1">
            Sign Up & Get Your Link
          </Link>
        </div>
      </section>
    </div>
  );
}
