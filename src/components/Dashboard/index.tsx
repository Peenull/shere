"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { useUserData } from "@/hooks/useUserData";
import {
  Users,
  PieChart,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  Clock,
  TrendingUp,
  Zap,
  Shield,
  Plus,
  Download,
  Share2,
} from "react-feather";
import Share from "@/components/Share";

const shareText = "Join me on Shere and start earning! Use my link to sign up.";
const shareTitle = "Join me on Shere!";

const MiniStatCard = ({
  icon,
  title,
  value,
  isLoading,
  color,
  url,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  isLoading: boolean;
  color: string;
  url?: string;
}) => (
  <div className="bg-slate-900 p-5 sm:p-6 rounded-3xl border border-gray-800/80 shadow-lg flex w-full">
    <div className="flex items-center gap-4">
      <div
        className={`w-10 h-10 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center rounded-xl ${color}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-[9px] sm:text-[10px] text-gray-500 font-black uppercase tracking-widest mb-0.5">
          {title}
        </p>
        {isLoading ? (
          <div className="w-16 h-6 skeleton-shimmer rounded-md"></div>
        ) : (
          <p className="text-lg sm:text-xl font-black text-white tracking-tight">
            {value}
          </p>
        )}
      </div>
      <Link
        href="/buy-shares"
        className={`w-10 h-10 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 ml-10 ${title !== "Share" && "hidden"}`}
      >
        <Plus size="32" />{" "}
      </Link>
      <button
        onClick={async () => {
          if (window.navigator) {
            await navigator.share({
              title: shareTitle,
              text: shareText,
              url: url,
            });
          } else {
            if (!url) return;
            navigator.clipboard.writeText(url);
          }
        }}
        className={`w-10 h-10 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 ml-10 cursor-pointer ${title !== "Invites" && "hidden"}`}
      >
        <Share2 size="26" />{" "}
      </button>
    </div>
  </div>
);

export default function Dashboard() {
  const { user } = useAuth();
  const { balance, invited, share, name, loading } = useUserData();
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  const [url, setUrl] = useState("");

  const getFirstName = (fullName: string | null | undefined): string => {
    if (!fullName) return "User";
    return fullName.split(" ")[0];
  };

  useEffect(() => {
    if (user?.uid) {
      const origin = window.location.origin;
      setUrl(`${origin}/signup?ref=${user.uid}`);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white pb-10">
      {/* Header: Optimized for small touch targets */}
      <header className="bg-slate-950/80 backdrop-blur-lg border-b border-gray-800/50 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="text-xl sm:text-2xl font-black text-yellow-400 italic tracking-tighter">
              SHERE.
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/history"
                className="p-2 text-gray-400 hover:text-white bg-slate-900/50 border border-slate-800 rounded-xl transition-all active:scale-90"
              >
                <Clock size={18} />
              </Link>
              <Link
                href="/profile"
                className="p-2 text-gray-400 hover:text-white bg-slate-900/50 border border-slate-800 rounded-xl transition-all active:scale-90"
              >
                <User size={18} />
              </Link>
              {user?.uid === "WtFZkweX9DZl2iALNKyt3UqfBJA3" && (
                <Link
                  href="/admin"
                  className="flex items-center gap-2 text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-3 py-2 rounded-xl active:scale-95 font-black text-[10px] uppercase tracking-widest"
                >
                  <Shield size={14} />
                  <span className="hidden xs:inline">Admin</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-8 lg:p-12">
        {/* Welcome Text: Responsive font sizes */}
        <div className="mb-8 mt-2 sm:mb-10">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-1">
            Hello, {getFirstName(name || user?.displayName)}
          </h1>
          <p className="text-gray-500 text-sm sm:text-base font-medium">
            Welcome back to your dashboard.
          </p>
        </div>

        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <div className="sm:col-span-2 relative overflow-hidden bg-linear-to-br from-slate-900 via-slate-900 to-slate-800 p-6 sm:p-8 rounded-4xl border border-gray-800/80 shadow-2xl">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-400/10 blur-3xl rounded-full"></div>

            <div className="relative z-10 flex flex-col gap-6">
              <div>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Total Balance
                </p>
                {loading ? (
                  <div className="w-40 h-10 skeleton-shimmer rounded-xl"></div>
                ) : (
                  <div className="flex items-center justify-between sm:justify-start gap-4">
                    <p className="text-3xl xs:text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-white to-gray-300 tracking-tight">
                      {isBalanceVisible
                        ? `${balance.toLocaleString()}`
                        : "****"}
                      <span className="text-xl sm:text-3xl text-gray-400 ml-2">
                        FCFA
                      </span>
                    </p>
                    <button
                      onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                      className="p-2.5 bg-slate-800/80 rounded-xl text-gray-400 active:scale-90 backdrop-blur-sm border border-slate-700/50"
                    >
                      {isBalanceVisible ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Link
                  href="/withdrawal"
                  className="group flex items-center justify-center gap-3 bg-linear-to-r from-yellow-400/10 to-yellow-500/10 text-yellow-400 font-black py-4 px-8 rounded-2xl active:scale-95 text-xs sm:text-sm uppercase tracking-widest  w-full sm:w-max"
                >
                  <span>Withdraw</span>
                  <Download
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <Share title={shareTitle} text={shareText} />
              </div>
            </div>
          </div>

          {/* Stats Cards: Stacked on mobile, side-by-side on tablet */}
          <div className="grid grid-cols-2 gap-2 w-full sm:flex">
            <MiniStatCard
              icon={<Users size={20} className="text-blue-400" />}
              title="Invites"
              value={invited.length.toString()}
              isLoading={loading}
              color="bg-blue-500/10"
              url={url}
            />
            <MiniStatCard
              icon={<PieChart size={20} className="text-yellow-400" />}
              title="Share"
              value={`${share}%`}
              isLoading={loading}
              color="bg-yellow-500/10"
            />
          </div>

          {/* Alert/CTA: Dynamic padding for mobile */}
          {!loading && share < 50 && (
            <div className="sm:col-span-2 bg-yellow-400/10 border border-yellow-400/30 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-center text-center md:text-left justify-between gap-5">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-full bg-yellow-400/20 text-yellow-300">
                  <TrendingUp size={22} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base sm:text-lg">
                    Increase Ownership
                  </h3>
                  <p className="text-yellow-200/80 text-xs sm:text-sm max-w-xs">
                    Current share: {share}%. Buy more to maximize earnings.
                  </p>
                </div>
              </div>
              <Link
                href="/buy-shares"
                className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 bg-yellow-400/10 text-yellow-400 font-bold rounded-xl active:scale-95"
              >
                <Zap size={16} fill="currentColor" />
                <span className="text-sm">Get More Shares</span>
              </Link>
            </div>
          )}
        </div>

        {/* Share Section: Better spacing for touch */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-gray-800/50 rounded-4xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-400/5 blur-3xl rounded-full"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-3 tracking-tight">
              Invite & Earn
            </h2>
            <p className="text-gray-400 mb-8 text-sm sm:text-lg leading-relaxed font-medium">
              Invite friends to{" "}
              <span className="text-yellow-400 font-bold uppercase tracking-wider">
                Shere
              </span>{" "}
              and increase your Earnings.
            </p>
            <Share big title={shareTitle} text={shareText} />
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-10 text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-yellow-400 text-sm sm:text-base font-semibold group py-2"
          >
            <span>How Shere Works</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </main>
    </div>
  );
}
