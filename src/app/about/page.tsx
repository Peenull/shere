'use client';

import React from 'react';
import Header from '@/components/Header';

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-950 font-sans text-white p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto py-12">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">About Shere</h1>
            <p className="text-xl text-gray-300 mt-4">The easiest way to monetize your network.</p>
          </header>

          <div className="bg-slate-900/70 border border-gray-800/50 rounded-2xl p-8 md:p-12 shadow-2xl space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-3">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed">
                At Shere, our mission is simple: to empower individuals to capitalize on their social networks. We believe that in a connected world, your influence is a valuable asset. We built a platform that rewards you for sharing opportunities and growing your connections, making monetization accessible to everyone, not just large-scale influencers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-3">What We Do</h2>
              <p className="text-gray-300 leading-relaxed">
                Shere provides a unique link for each user. When you share this link, you're not just sharing a product or service—you're sharing an opportunity. For every person who signs up through your link, you earn a reward. It's a chain of opportunity that grows with every new connection. We handle the tracking, the payouts, and the platform, so you can focus on what you do best: sharing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-3">Why Choose Shere?</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We are more than just a platform; we are a network of go-getters, entrepreneurs, and everyday people who understand the power of connection. We stand for transparency, simplicity, and tangible results.
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li><span className="font-semibold text-yellow-400">Simplicity:</span> Get your link and start sharing in minutes. No complex setup required.</li>
                <li><span className="font-semibold text-yellow-400">Transparency:</span> Track your earnings and network growth in real-time on your personal dashboard.</li>
                <li><span className="font-semibold text-yellow-400">Instant Rewards:</span> Get rewarded for every successful sign-up that comes through your unique link.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
