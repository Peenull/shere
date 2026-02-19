"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { useUserData } from "@/hooks/useUserData";
import {
  Users,
  PieChart,
  Eye,
  EyeOff,
  User,
  Clock,
  Shield,
  Plus,
  Download,
  Share2,
} from "react-feather";
import Share from "@/components/Share";

const shareText = "Join me on Shere and start earning! Use my link to sign up.";
const shareTitle = "Join me on Shere!";

function formatBalanceResponsive(value: number) {
  return new Intl.NumberFormat().format(value);
}
const MiniStatCard = ({
  icon,
  title,
  value,
  isLoading,
  color,
  url,
  invested,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
  isLoading: boolean;
  color: string;
  url?: string;
  invested?: number;
}) => (
  <div className="flex-1 min-w-0 bg-slate-900 p-4 sm:p-6 rounded-3xl border border-gray-800/80 shadow-lg flex items-center transition-all hover:border-gray-700 hover:bg-slate-800/50 group">
    <div className="flex items-center gap-4 w-full">
      <div
        className={`w-10 h-10 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center rounded-2xl ${color} transition-transform group-hover:scale-110`}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] sm:text-xs text-gray-500 font-black uppercase tracking-widest mb-1">
          {title}
        </p>
        {isLoading ? (
          <div className="w-16 h-6 bg-slate-800 animate-pulse rounded-md"></div>
        ) : (
          <div>
            <p className="text-xl sm:text-2xl font-black text-white tracking-tight truncate">
              {value} {title == "Share" && "%"}
            </p>
            <p
              className={`flex items-center gap-2 text-yellow-400 font-black text-[10px] uppercase tracking-widest transition-all ${title != "Share" && "hidden"}`}
            >
              {invested} FCFA <span className="italic">Invested</span>
            </p>
          </div>
        )}
      </div>

      <div className="ml-auto flex items-center gap-2">
        {title === "Share" && (
          <Link
            href="/buy-shares"
            className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all ${Number(value) >= 50 && "hidden"}`}
          >
            <Plus size={20} />
          </Link>
        )}
        {title === "Invites" && (
          <button
            onClick={async () => {
              if (typeof navigator !== "undefined" && navigator.share && url) {
                try {
                  await navigator.share({
                    title: shareTitle,
                    text: shareText,
                    url,
                  });
                } catch {
                  navigator.clipboard.writeText(url);
                }
              } else if (url) {
                navigator.clipboard.writeText(url);
              }
            }}
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all"
          >
            <Share2 size={18} />
          </button>
        )}
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const { user } = useAuth();
  const { balance, invited, share, name, loading, invested } = useUserData();
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  // FIX: Derived URL to prevent re-render loops
  const url = useMemo(() => {
    if (typeof window !== "undefined" && user?.uid) {
      return `${window.location.origin}/signup?ref=${user.uid}`;
    }
    return "";
  }, [user?.uid]);

  const getFirstName = (fullName: string | null | undefined): string => {
    if (!fullName) return "User";
    return fullName.split(" ")[0];
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white pb-20 selection:bg-yellow-400/30">
      {/* Header */}
      <header className="bg-slate-950/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="text-2xl font-black text-yellow-400 italic tracking-tighter">
              SHERE.
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/history"
                className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              >
                <Clock size={20} />
              </Link>
              <Link
                href="/profile"
                className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              >
                <User size={20} />
              </Link>
              {user?.uid === "WtFZkweX9DZl2iALNKyt3UqfBJA3" && (
                <Link
                  href="/admin"
                  className="flex items-center gap-2 text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-yellow-400 hover:text-black transition-all"
                >
                  <Shield size={14} /> Admin
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <Link
          className={`${share >= 50 && "hidden"} fixed z-50 items-center gap-2 text-white-400 bg-yellow-400/70 border border-yellow-400/20 px-4 py-2 rounded-xl font-black text-[15px] uppercase tracking-widest hover:bg-yellow-400 hover:text-black transition-all bottom-4`}
          href="/buy-shares"
        >
          Buy Share
        </Link>
        {/* Welcome Section */}
        <div className="mb-10 lg:mb-14">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-2">
            Hello,{" "}
            <span className="text-gray-400">
              {getFirstName(name || user?.displayName)}
            </span>
          </h1>
          <p className="text-gray-500 text-lg font-medium">
            Your financial ecosystem at a glance.
          </p>
        </div>

        {/* Main Grid: Responsive column handling */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Balance Card: Spans 2 columns on Large screens */}
          <div className="sm:col-span-2 relative overflow-hidden bg-linear-to-br from-slate-900 via-slate-900 to-slate-800 p-6 sm:p-8 max-[450px]:p-4 rounded-4xl border border-gray-800/80 shadow-2xl">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-400/10 blur-3xl rounded-full"></div>

            <div className="relative z-10 flex flex-col gap-6">
              <div>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Earnings
                </p>

                {loading ? (
                  <div className="w-40 h-10 skeleton-shimmer rounded-xl"></div>
                ) : (
                  <div className="flex items-center justify-between sm:justify-start gap-3">
                    {/* Value block */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3">
                        <p
                          className="flex-1 min-w-0 text-3xl max-[450px]:text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white tracking-tight whitespace-nowrap overflow-hidden"
                          title={
                            isBalanceVisible
                              ? balance.toLocaleString()
                              : undefined
                          }
                        >
                          <span className="inline-block min-w-0 truncate">
                            {isBalanceVisible
                              ? formatBalanceResponsive(balance)
                              : "••••••"}
                          </span>
                        </p>

                        <span className="text-sm max-[450px]:text-xs sm:text-lg text-gray-400 font-semibold ml-1 whitespace-nowrap">
                          FCFA
                        </span>
                      </div>
                    </div>

                    {/* Toggle */}
                    <button
                      onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                      aria-label="Toggle balance visibility"
                      className="ml-3 flex-none inline-flex items-center justify-center p-2.5 max-[450px]:p-2 bg-slate-800/70 hover:bg-slate-800/60 active:scale-95 rounded-xl border border-slate-700/50 text-gray-300 transition"
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

              {/* Actions row unchanged structurally but slightly tuned for tiny screens */}
              <div className="flex gap-2">
                <Link
                  href="/withdrawal"
                  className="group flex-1 flex items-center justify-center gap-3 bg-linear-to-r from-yellow-400/10 to-yellow-500/10 text-yellow-400 font-black py-4 px-6 max-[450px]:py-3 max-[450px]:px-3 rounded-2xl active:scale-95 text-xs sm:text-sm uppercase tracking-widest border border-yellow-400/20 min-h-11"
                >
                  <span className="truncate">Withdraw</span>
                  <Download
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>

                <div className="flex-1">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-full max-w-full">
                      <Share title={shareTitle} text={shareText} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Stats on Desktop / Below on Mobile */}
          <div className="flex flex-col gap-4">
            <MiniStatCard
              icon={<Users size={24} className="text-blue-400" />}
              title="Invites"
              value={invited.length}
              isLoading={loading}
              color="bg-blue-500/10"
              url={url}
            />
            <MiniStatCard
              icon={<PieChart size={24} className="text-yellow-400" />}
              title="Share"
              value={share}
              isLoading={loading}
              color="bg-yellow-400/10"
              invested={invested}
            />
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-sm border border-gray-800/50 rounded-4xl p-8 max-[450px]:p-5 text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-400/6 blur-3xl rounded-full pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl max-[450px]:text-xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
              Invite & Earn
            </h2>
            <p className="text-gray-400 mb-6 text-sm max-[450px]:text-[13px] sm:text-lg leading-relaxed font-medium">
              Invite friends to{" "}
              <span className="text-yellow-400 font-bold uppercase tracking-wider">
                Shere
              </span>{" "}
              and increase your Earnings.
            </p>

            {/* keep your Share component unchanged structurally */}
            <div className="mx-auto w-full max-w-md">
              <Share big title={shareTitle} text={shareText} />
            </div>
          </div>
        </div>
      </main>

      {/* Modern Footer Branding */}
      <footer className="max-w-6xl mx-auto px-4 py-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
        <p className="text-gray-600 text-xs font-bold uppercase tracking-[0.3em]">
          Sharing is Earning
        </p>
        <Link
          href="/about"
          className="text-yellow-400/80 hover:text-yellow-400 text-sm font-bold transition-colors"
        >
          How SHERE. works
        </Link>
      </footer>
    </div>
  );
}
