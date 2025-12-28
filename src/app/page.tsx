"use client";

import React from "react";
import Link from "next/link";
// import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";

export default function RootPage() {
  // THIS IS THE LIBRARY SYNTAX YOU ASKED FOR
  const [user, loading] = useAuthState(auth);

  // 1. THE LOADER (The "Act like a loader" part)
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 text-[10px] font-black uppercase tracking-widest">
          Loading Shere...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* 2. THE DASHBOARD BACKGROUND (Blurred if no user) */}
      <div
        className={`transition-all duration-1000 ${
          !user
            ? "blur-3xl saturate-50 scale-110 pointer-events-none"
            : "blur-0"
        }`}
      >
        {/* This is a placeholder for your Home Component */}
        <div className="max-w-4xl mx-auto p-10">
          <div className="h-64 bg-slate-900/50 rounded-3xl border border-gray-800"></div>
        </div>
      </div>

      {/* 3. THE PROMPT GATE (Shows if no user is found) */}
      {!user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-6">
          <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-[2.5rem] p-10 shadow-2xl text-center">
            <h2 className="text-4xl font-black text-yellow-400 italic mb-2">
              SHERE.
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              Secure your shares to start earning.
            </p>

            <div className="flex flex-col gap-4">
              {/* Using Link tags as requested */}
              <Link
                href="/signup"
                className="w-full py-4 bg-yellow-400 text-black font-black rounded-2xl hover:bg-yellow-300 transition-all active:scale-95 shadow-xl shadow-yellow-400/10"
              >
                CREATE ACCOUNT
              </Link>

              <Link
                href="/signin"
                className="w-full py-4 bg-slate-950 text-white font-bold rounded-2xl border border-gray-800 hover:bg-slate-900 transition-all"
              >
                LOG IN
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">
                1% Share = 200 FCFA
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
