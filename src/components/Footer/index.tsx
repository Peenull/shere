"use client";

import Link from "next/link";
import { Shield, Zap, Hash } from "react-feather";

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-900 pt-20 pb-12 overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-[100px] pointer-events-none -ml-32 -mb-32"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Brand Identity / Vision */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-block group">
              <span className="text-3xl font-black tracking-tighter italic text-white group-hover:text-yellow-400 transition-colors">
                SHERE
                <span className="text-yellow-400 group-hover:text-white">
                  .
                </span>
              </span>
            </Link>
            <p className="text-gray-500 font-medium max-w-sm leading-relaxed text-sm italic">
              A social-first financial network designed for the modern economy.
              Own your stake, grow your circle, and build lasting wealth.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-[10px] font-black text-gray-500"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">
                Join 10000+ Holders.
              </p>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-4">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
                <Hash size={12} className="text-yellow-400" /> Experience
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/"
                    className="text-gray-500 hover:text-white transition-colors text-sm font-bold"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-500 hover:text-white transition-colors text-sm font-bold"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-gray-500 hover:text-white transition-colors text-sm font-bold"
                  >
                    Questions
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
                <Zap size={12} className="text-yellow-400" /> Account
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/signin"
                    className="text-gray-500 hover:text-white transition-colors text-sm font-bold"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="text-gray-500 hover:text-white transition-colors text-sm font-bold"
                  >
                    Join
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="text-gray-500 hover:text-white transition-colors text-sm font-bold"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1 space-y-6">
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
                <Shield size={12} className="text-yellow-400" /> Security
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-500 hover:text-white transition-colors text-sm font-bold"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-500 hover:text-white transition-colors text-sm font-bold"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] text-gray-700 font-bold uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} SHERE SOCIAL NETWORK.
            <span className="hidden sm:inline"> ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
