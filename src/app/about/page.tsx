"use client";

import { useVariablesData } from "@/hooks/useVariablesData";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  PieChart,
  ArrowRight,
  Zap,
  UserPlus,
} from "react-feather";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-yellow-400 selection:text-black">
      {/* --- PREMIUM HEADER --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 group-hover:bg-slate-800 transition-all">
              <ArrowLeft
                size={18}
                className="text-gray-400 group-hover:text-white"
              />
            </div>
            <span className="text-xl font-black tracking-tighter italic text-yellow-400 group-hover:text-yellow-300">
              SHERE.
            </span>
          </Link>
          <Link
            href="/signup"
            className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition-all active:scale-95 shadow-lg shadow-yellow-400/10"
          >
            Join Network <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none -mr-40 -mt-20 anim-pulse"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900/80 border border-slate-800 rounded-full mb-8 backdrop-blur-md">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_8px_#facc15]"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Ownership Reimagined
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight mb-8">
            Your Connections, <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-300 via-yellow-400 to-yellow-600">
              Your Capital.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed mb-12">
            Shere isn't just a social network. It's a decentralized financial
            ecosystem where your social influence directly translates into
            real-world wealth.
          </p>
        </div>
      </section>

      {/* --- BUSINESS LOGIC: THE A-B-C MODEL (ANIMATED) --- */}
      <section className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 uppercase italic">
              How You Win
            </h2>
            <p className="text-gray-500 font-medium italic">
              — The Economics of Shere —
            </p>
          </div>

          {/* Step 1: User A Buy-in */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-32 group">
            <div className="order-2 md:order-1 relative">
              <div className="absolute -inset-10 bg-yellow-400/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative bg-slate-900 border-2 border-slate-800 p-8 rounded-[3rem] shadow-2xl">
                <div className="flex justify-between items-center mb-8">
                  <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center text-black font-black text-xl">
                    A
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600 font-black uppercase mb-1">
                      Ownership
                    </p>
                    <p className="text-2xl font-black text-white italic">
                      50% Stake
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center group-hover:border-yellow-400/20 transition-all">
                    <span className="text-xs font-bold text-gray-500 uppercase">
                      Investment
                    </span>
                    <span className="text-sm font-black text-yellow-400">
                      {useVariablesData().PPP * 50} FCFA
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-yellow-400/5 border border-yellow-400/10 text-center">
                    <p className="text-xs text-yellow-400 font-medium">
                      User A secures the maximum allowed stake.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <span className="text-4xl font-black text-slate-800">01.</span>
              <h3 className="text-3xl font-black tracking-tight text-white uppercase italic">
                Secure Your Position
              </h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                It starts with your commitment. User A joins Shere and purchases
                a <span className="text-white font-bold">50% Share</span>. This
                percentage isn't just a number—it's the power of your future
                commissions.
              </p>
              <div className="flex items-center gap-3 text-yellow-400 font-black text-xs uppercase tracking-widest">
                <Zap size={16} /> Max Stake: 50% Limit
              </div>
            </div>
          </div>

          {/* Transition Arrow 1 */}
          <div className="hidden md:flex justify-center mb-16 h-12">
            <div className="w-px h-full bg-linear-to-b from-yellow-400 to-transparent"></div>
          </div>

          {/* Step 2: Invitation Loop */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-32 group">
            <div className="space-y-6">
              <span className="text-4xl font-black text-slate-800">02.</span>
              <h3 className="text-3xl font-black tracking-tight text-white uppercase italic">
                Grow the Circle
              </h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                User A shares their unique invite link.{" "}
                <span className="text-white font-bold">User B</span> joins the
                network using A's link. B is now part of A's community, and the
                data is locked in the Shere ledger.
              </p>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl inline-flex items-center gap-4 group-hover:scale-105 transition-transform">
                <div className="w-8 h-8 rounded-lg bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                  <UserPlus size={16} />
                </div>
                <span className="text-xs font-black uppercase tracking-tighter">
                  A invites B
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 bg-blue-400/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative bg-slate-900 border-2 border-slate-800 p-8 rounded-[3rem] shadow-2xl overflow-hidden">
                <div className="flex items-center justify-center gap-10 py-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-gray-500 font-black">
                    A
                  </div>
                  <div className="h-0.5 w-16 bg-yellow-400 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 animate-ping h-2 w-2 bg-yellow-400 rounded-full"></div>
                  </div>
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">
                    B
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                  <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest leading-loose">
                    "Your network is your net worth"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Transition Arrow 2 */}
          <div className="hidden md:flex justify-center mb-16 h-12">
            <div className="w-px h-full bg-linear-to-b from-yellow-400 to-transparent"></div>
          </div>

          {/* Step 3: Commission Payout */}
          <div className="grid md:grid-cols-2 gap-12 items-center group">
            <div className="relative">
              <div className="absolute -inset-10 bg-green-400/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative bg-slate-900 border-2 border-slate-800 p-8 rounded-[3rem] shadow-2xl">
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <p className="text-[10px] text-gray-600 font-black uppercase mb-1">
                      B Invests
                    </p>
                    <p className="text-xl font-black text-white">5,000</p>
                  </div>
                  <div className="p-4 bg-green-400/10 rounded-2xl border border-green-400/20">
                    <p className="text-[10px] text-green-400 font-black uppercase mb-1">
                      A's Payout
                    </p>
                    <p className="text-xl font-black text-green-400">+2,500</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <div className="flex items-center justify-center gap-3 text-sm font-bold text-gray-400">
                    <span>5,000</span>
                    <span>×</span>
                    <span className="text-yellow-400">50%</span>
                    <span>=</span>
                    <span className="text-green-400">2,500 FCFA</span>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <div className="px-4 py-2 bg-green-400 rounded-full text-black text-[10px] font-black uppercase tracking-widest animate-bounce">
                    Instant Pay
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <span className="text-4xl font-black text-slate-800">03.</span>
              <h3 className="text-3xl font-black tracking-tight text-white uppercase italic">
                Passive Returns
              </h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                Now it gets exciting. User B decides to build their stake and
                invests <span className="text-white font-bold">5,000 FCFA</span>
                . Because User A owns 50% of the community, they instantly
                receive{" "}
                <span className="text-green-400 font-black">
                  50% of B's investment
                </span>
                .
              </p>
              <p className="text-sm text-gray-600 border-l-2 border-yellow-400/30 pl-4 italic">
                "User A makes 2,500 FCFA while sleeping, simply because they
                helped B join and had a high stake."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOICE SHERE? --- */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border-t border-slate-900 pt-32">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400">
                <Shield size={24} />
              </div>
              <h4 className="text-xl font-black uppercase tracking-tight italic">
                Secure Wallet
              </h4>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                Built on top-tier security standards. Your stakeholders and
                commissions are recorded on an immutable ledger.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-yellow-400/10 rounded-2xl flex items-center justify-center text-yellow-400">
                <Zap size={24} />
              </div>
              <h4 className="text-xl font-black uppercase tracking-tight italic">
                MoMo Integration
              </h4>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                Cash in and cash out instantly using MTN MoMo or Orange Money.
                No bank account required.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-400">
                <PieChart size={24} />
              </div>
              <h4 className="text-xl font-black uppercase tracking-tight italic">
                Fair Share Cap
              </h4>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                A strict 50% ownership limit ensures the community remains
                healthy and distributed. Everyone gets a piece.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION: BRIEF --- */}
      <section id="faq" className="py-20 px-6 bg-slate-900/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-16 italic uppercase">
            Common Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Is there a limit to how many people I can invite?",
                a: "No. You can invite as many people as you want. Each person who invests grows your earnings potential.",
              },
              {
                q: "Why is there a 50% stake limit?",
                a: "To ensure fairness. We want Shere to be owned by the many, not the few. 50% is the maximum influence any single member can hold.",
              },
              {
                q: "How do I get my money?",
                a: "Once your balance reaches the minimum threshold, you can request a withdrawal directly to your Mobile Money account.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl"
              >
                <h5 className="font-black text-white mb-3 text-lg">{item.q}</h5>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CORE CTA --- */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-10 italic uppercase">
            Ready to start your <br />
            <span className="text-yellow-400">Legacy?</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-12 py-5 bg-yellow-400 text-black font-black text-lg rounded-4xl hover:bg-yellow-300 transition-all shadow-2xl shadow-yellow-400/20 active:scale-95 flex items-center justify-center gap-3 underline-none"
            >
              Get Started <ArrowRight size={22} />
            </Link>
            <Link
              href="/signin"
              className="px-12 py-5 bg-slate-900 text-gray-400 font-black text-lg rounded-4xl hover:bg-slate-800 hover:text-white transition-all border border-slate-800 active:scale-95 underline-none"
            >
              Member Login
            </Link>
          </div>
        </div>
      </section>

      {/* --- FOOTER SIM --- */}
      <footer className="py-12 px-6 border-t border-slate-900 text-center">
        <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.5em]">
          © 2026 SHERE SOCIAL NETWORK. ALL RIGHTS RESERVED.
        </p>
      </footer>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
        .anim-pulse {
          animation: pulse 8s ease-in-out infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #020617;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
