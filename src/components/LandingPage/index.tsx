"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  TrendingUp,
  Shield,
  Zap,
  PieChart,
  DollarSign,
  CheckCircle,
  ArrowDown,
  Award,
  PlusCircle,
  Globe,
} from "react-feather";
import ActivityTicker from "@/components/Social/ActivityTicker";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-slate-950 text-white font-sans selection:bg-yellow-400 selection:text-black overflow-x-hidden">
      {/* --- NAVIGATION BAR --- */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 sm:px-12 ${scrolled ? "bg-slate-950/90 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent py-6"}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl sm:text-3xl font-black tracking-tighter italic text-yellow-400">
            SHERE.
          </div>
          <div className="flex items-center gap-4 sm:gap-8">
            <Link
              href="/signin"
              className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 sm:px-6 py-2 sm:py-2.5 bg-yellow-400 text-black font-black text-[10px] sm:text-xs uppercase tracking-widest rounded-xl hover:bg-yellow-300 transition-all active:scale-95 shadow-lg shadow-yellow-400/20"
            >
              Join Now
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/60 to-slate-950 z-10" />
          <img
            src="/images/hero.png"
            alt="Network Wealth"
            className="w-full h-full object-cover opacity-30 sm:opacity-40 scale-105 animate-[slow-zoom_20s_ease-in-out_infinite]"
          />
        </div>

        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-yellow-400/5 blur-[80px] sm:blur-[120px] rounded-full animate-pulse pointer-events-none"></div>

        <div className="relative z-20 max-w-5xl mx-auto text-center px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-400/5 border border-yellow-400/10 rounded-full mb-6 sm:mb-8">
            <Award size={12} className="text-yellow-400" />
            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-yellow-400">
              Redefining the Referral Economy
            </span>
          </div>

          <h1 className="text-5xl xs:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.95] sm:leading-[0.9] mb-6 sm:mb-8">
            <span className="text-white">SHARING IS</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 italic uppercase">
              EARNING.
            </span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-gray-400 font-medium max-w-2xl mx-auto mb-8 sm:mb-12 px-2">
            Turn your social circle into a lifetime of passive wealth. If you're
            not in Shere, you're missing out on the future of social capital.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4">
            <Link
              href="/signup"
              className="group relative w-full sm:w-auto overflow-hidden px-8 sm:px-12 py-4 sm:py-5 bg-yellow-400 text-black font-black text-lg sm:text-xl rounded-2xl sm:rounded-[2rem] hover:bg-yellow-300 transition-all active:scale-95 shadow-xl shadow-yellow-400/20"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Get Started
                <ArrowRight size={20} />
              </span>
            </Link>
            <Link
              href="/about"
              className="group w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-slate-900/50 border border-slate-800 text-gray-400 font-black text-lg sm:text-xl rounded-2xl sm:rounded-[2rem] hover:bg-slate-800 hover:text-white transition-all"
            >
              Learn the Logic
            </Link>
          </div>

          <div className="mt-16 sm:mt-24 animate-bounce opacity-20 hidden xs:block">
            <ArrowDown size={28} />
          </div>
        </div>
      </section>

      {/* --- FOMO SECTION --- */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-20 items-center">
            <div className="space-y-8 sm:space-y-12">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter italic uppercase text-white leading-tight">
                  Why Stay in the <br />
                  <span className="text-gray-700">Shadows?</span>
                </h2>
                <p className="text-gray-500 font-medium text-base sm:text-lg leading-relaxed">
                  Every minute you wait, a community is being built without you.
                  Users inside Shere are already securing their financial
                  destiny.
                </p>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {[
                  {
                    icon: <Zap />,
                    title: "Lost Commissions",
                    text: "Every friend you invite outside Shere is profit you could have earned today.",
                  },
                  {
                    icon: <TrendingUp />,
                    title: "Shrinking Opportunity",
                    text: "Stakes are filling up. Once the 50% slots are gone, they're gone.",
                  },
                  {
                    icon: <Globe />,
                    title: "Total Isolation",
                    text: "The social network of tomorrow is being architected right now.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 sm:gap-6 group">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-900 rounded-xl sm:rounded-[1.25rem] border border-slate-800 flex items-center justify-center text-gray-500 group-hover:text-yellow-400 transition-colors shrink-0">
                      {React.cloneElement(item.icon as React.ReactElement, {
                        size: 20,
                      })}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg sm:text-xl font-black italic uppercase text-white/90">
                        {item.title}
                      </h4>
                      <p className="text-gray-500 font-medium text-xs sm:text-sm leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group mt-8 lg:mt-0">
              <div className="absolute -inset-4 bg-linear-to-r from-yellow-400/10 to-blue-500/10 rounded-[2rem] sm:rounded-[3rem] blur-2xl opacity-50"></div>
              <div className="relative bg-slate-900 border border-slate-800 p-8 sm:p-16 rounded-[2rem] sm:rounded-[4rem] shadow-2xl">
                <h3 className="text-xl sm:text-2xl font-black text-white italic mb-8 sm:mb-10 text-center uppercase tracking-tight">
                  Growth Ticker
                </h3>
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-[9px] sm:text-[10px] text-gray-600 font-black uppercase tracking-widest">
                      Active Stakes
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-yellow-500">
                      84% FULL
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-[9px] sm:text-[10px] text-gray-600 font-black uppercase tracking-widest">
                      Distributed
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-white italic text-right">
                      2.4M FCFA
                    </span>
                  </div>
                  <div className="pt-4 text-center">
                    <p className="text-[10px] text-gray-500 font-bold mb-4 uppercase tracking-[0.3em] animate-pulse">
                      Waiting for you...
                    </p>
                    <Link
                      href="/signup"
                      className="inline-flex items-center gap-2 text-yellow-400 font-black text-[10px] uppercase tracking-widest"
                    >
                      Join the leaders <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WEALTH ENGINE SECTION --- */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 bg-slate-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter italic uppercase text-white leading-tight mb-4 sm:mb-6">
              The Engine of <span className="text-yellow-400">Prosperity.</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium text-base sm:text-lg px-4">
              A transparent, secure, and instant way to monetize your community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                color: "bg-blue-500/10 text-blue-400",
                label: "01",
                title: "Claim Stake",
                text: "Buy up to 50% share of community pools for as low as 200 FCFA.",
                icon: <PieChart size={24} />,
              },
              {
                color: "bg-yellow-400/10 text-yellow-400",
                label: "02",
                title: "Expand Circle",
                text: "Use your elite link to invite members. Every signup is documented.",
                icon: <Users size={24} />,
              },
              {
                color: "bg-green-500/10 text-green-400",
                label: "03",
                title: "Collect Payouts",
                text: "When your circle buys shares, you get paid instantly to your wallet.",
                icon: <DollarSign size={24} />,
              },
            ].map((card, i) => (
              <div
                key={i}
                className="group p-8 sm:p-10 bg-slate-900/50 border border-slate-800 rounded-2xl sm:rounded-[3rem] hover:border-white/10 transition-all shadow-xl"
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 ${card.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 transition-transform`}
                >
                  {card.icon}
                </div>
                <span className="text-[9px] sm:text-[10px] font-black text-gray-700 uppercase tracking-widest mb-3 sm:mb-4 block">
                  {card.label} — Step
                </span>
                <h4 className="text-xl sm:text-2xl font-black italic uppercase text-white mb-3 sm:mb-4 group-hover:text-yellow-400 transition-colors">
                  {card.title}
                </h4>
                <p className="text-gray-500 text-sm sm:text-base font-medium leading-relaxed">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 sm:py-40 px-4 sm:px-6 relative overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(250,204,21,0.05)_0%,transparent_70%)] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-tight mb-8 sm:mb-10 italic uppercase px-2">
            The Gates of Wealth <br className="hidden sm:block" />
            <span className="text-yellow-400">Are Open.</span>
          </h2>
          <p className="text-lg sm:text-2xl text-gray-500 font-medium max-w-2xl mx-auto mb-10 sm:mb-16 italic px-4">
            Missing out on Shere isn't just a mistake—it's leaving your
            potential on the table.
          </p>
          <div className="flex flex-col items-center gap-6 px-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-10 sm:px-16 py-5 sm:py-6 bg-yellow-400 text-black font-black text-xl sm:text-2xl rounded-2xl sm:rounded-[3rem] active:scale-95 shadow-xl shadow-yellow-400/20"
            >
              Build My Future
            </Link>
            <p className="text-[9px] sm:text-[10px] text-gray-600 font-black uppercase tracking-[0.2em] sm:tracking-[0.4em]">
              Invite-Only Access Closing Soon
            </p>
          </div>
        </div>
      </section>

      <ActivityTicker />

      <footer className="py-12 sm:py-20 px-6 border-t border-slate-900 text-center relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 items-center text-center md:text-left">
          <div className="md:text-left">
            <span className="text-2xl font-black tracking-tighter italic text-white uppercase">
              SHERE.
            </span>
          </div>
          <div className="hidden md:block text-center">
            <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em]">
              Built for the 1%. <br /> Owned by the few.
            </p>
          </div>
          <div className="flex justify-center md:justify-end gap-6 sm:gap-8">
            <Link
              href="/"
              className="text-[10px] text-gray-500 font-bold hover:text-white uppercase"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-[10px] text-gray-500 font-bold hover:text-white uppercase"
            >
              Logic
            </Link>
            <Link
              href="/faq"
              className="text-[10px] text-gray-500 font-bold hover:text-white uppercase"
            >
              Support
            </Link>
          </div>
        </div>

        <div className="mt-12 sm:mt-20">
          <p className="text-[8px] sm:text-[10px] text-gray-800 font-black uppercase tracking-[0.5rem] sm:tracking-[1rem]">
            FINANCIAL NIRVANA
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slow-zoom {
          0% {
            transform: scale(1.05);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
