'use client';

import React from 'react';
import Header from '@/components/Header';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-950 font-sans text-white p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto py-12">
          <header className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-yellow-400">Privacy Policy</h1>
            <p className="text-lg text-gray-400 mt-2">Last Updated: {new Date().toLocaleDateString()}</p>
          </header>

          <div className="bg-slate-900/70 border border-gray-800/50 rounded-lg p-6 md:p-10 shadow-lg space-y-6 text-gray-300 leading-relaxed">
            
            <p>Welcome to Shere ("we," "us," or "our"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.</p>

            <section>
              <h2 className="text-2xl font-bold text-yellow-500 mb-3">1. Information We Collect</h2>
              <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
              <ul className="list-disc list-inside mt-2 space-y-2 pl-4">
                <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and demographic information, that you voluntarily give to us when you register with the Site.</li>
                <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
                <li><strong>Financial Data:</strong> We do not collect or store any payment information. All financial transactions are handled by our secure third-party payment processors.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-500 mb-3">2. Use of Your Information</h2>
              <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
              <ul className="list-disc list-inside mt-2 space-y-2 pl-4">
                <li>Create and manage your account.</li>
                <li>Email you regarding your account or order.</li>
                <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
                <li>Notify you of updates to the Site.</li>
                <li>Process payments and refunds.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-500 mb-3">3. Disclosure of Your Information</h2>
              <p>We do not share, sell, rent or trade your information with any third parties for their promotional purposes. We may share information we have collected about you in certain situations, including:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2 pl-4">
                <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.</li>
                <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, and hosting services.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-500 mb-3">4. Security of Your Information</h2>
              <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-500 mb-3">5. Contact Us</h2>
              <p>If you have questions or comments about this Privacy Policy, please contact us at: shereltd@gmail.com</p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
