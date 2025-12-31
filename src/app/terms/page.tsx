'use client';

import React from 'react';
import Header from '@/components/Header';

export default function TermsAndConditionsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-950 font-sans text-white p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto py-12">
          <header className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-yellow-400">Terms and Conditions</h1>
            <p className="text-lg text-gray-400 mt-2">Last Updated: {new Date().toLocaleDateString()}</p>
          </header>

          <div className="bg-slate-900/70 border border-gray-800/50 rounded-lg p-6 md:p-10 shadow-lg space-y-6 text-gray-300 leading-relaxed">

            <p>Please read these Terms and Conditions ("Terms") carefully before using the Shere website (the "Service") operated by Shere ("us", "we", or "our"). Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.</p>

            <section>
              <h2 className="text-2xl font-bold text-yellow-500 mb-3">1. Accounts</h2>
              <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-500 mb-3">2. User Conduct</h2>
              <p>You agree not to use the Service to: (a) violate any local, state, national, or international law; (b) stalk, harass, or harm another individual; (c) collect or store personal data about other users; (d) impersonate any person or entity, or otherwise misrepresent your affiliation with a person or entity.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-500 mb-3">3. Intellectual Property</h2>
              <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Shere and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-500 mb-3">4. Termination</h2>
              <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-500 mb-3">5. Disclaimer</h2>
              <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-yellow-500 mb-3">6. Governing Law</h2>
              <p>These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-500 mb-3">7. Changes to Terms</h2>
              <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-500 mb-3">8. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us at: shereltd@gmail.com</p>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
