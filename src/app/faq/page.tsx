'use client';

import Header from '@/components/Header';

export default function FAQPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-950 font-sans text-white p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto py-12">
          <header className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-yellow-400">Frequently Asked Questions</h1>
          </header>

          <div className="bg-slate-900/70 border border-gray-800/50 rounded-lg p-6 md:p-10 shadow-lg space-y-8 text-gray-300 leading-relaxed">

            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer text-xl font-bold text-yellow-500 hover:text-yellow-400 transition-colors">
                <span>How do I buy a share?</span>
                <span className="transform group-open:rotate-180 transition-transform duration-300">▼</span>
              </summary>
              <div className="mt-4 text-gray-400">
                <p>You can purchase a percentage of referral earnings, starting from 1% for 200 FCFA. The higher your share, the more you earn. Simply go to your dashboard and click on the "Buy Shares" button.</p>
              </div>
            </details>

            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer text-xl font-bold text-yellow-500 hover:text-yellow-400 transition-colors">
                <span>How do referrals work?</span>
                <span className="transform group-open:rotate-180 transition-transform duration-300">▼</span>
              </summary>
              <div className="mt-4 text-gray-400">
                <p>Invite your friends to join Shere. When they purchase shares, you get a percentage of their investment based on your share.</p>
              </div>
            </details>

            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer text-xl font-bold text-yellow-500 hover:text-yellow-400 transition-colors">
                <span>How do I withdraw my earnings?</span>
                <span className="transform group-open:rotate-180 transition-transform duration-300">▼</span>
              </summary>
              <div className="mt-4 text-gray-400">
                <p>You can withdraw your earnings from your dashboard. Click on the "Withdraw" button and follow the instructions. Please note that withdrawals are processed manually and may take some time to reflect in your account.</p>
              </div>
            </details>

            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer text-xl font-bold text-yellow-500 hover:text-yellow-400 transition-colors">
                <span>What is the maximum share I can own?</span>
                <span className="transform group-open:rotate-180 transition-transform duration-300">▼</span>
              </summary>
              <div className="mt-4 text-gray-400">
                <p>The maximum share you can own is 50%.</p>
              </div>
            </details>

          </div>
        </div>
      </div>
    </>
  );
}
