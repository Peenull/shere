"use client";

import React from "react";
import { PieChart } from "react-feather";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"></div>

      {/* Animated Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Container */}
        <div className="relative w-24 h-24 mb-10">
          {/* Outer Rotating Ring */}
          <div className="absolute inset-0 border-2 border-dashed border-yellow-400/20 rounded-full animate-[spin_10s_linear_infinite]"></div>

          {/* Inner Glowing Orb */}
          <div className="absolute inset-2 bg-slate-900 border border-white/10 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-400/10">
            <div className="text-yellow-400 animate-pulse">
              <PieChart size={38} strokeWidth={1.5} />
            </div>
          </div>

          {/* Orbiting Dot */}
          <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
            <div className="w-2 h-2 bg-yellow-400 rounded-full blur-[2px] shadow-[0_0_10px_#facc15] ml-[45px] -mt-1"></div>
          </div>
        </div>

        {/* Brand Identity */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black text-white tracking-[0.3em] italic">
            SHERE<span className="text-yellow-400">.</span>
          </h1>

          <div className="flex flex-col items-center gap-3">
            {/* Minimal Progress Line */}
            <div className="w-12 h-[2px] bg-slate-800 rounded-full overflow-hidden">
              <div className="w-full h-full bg-yellow-400 animate-[translateX_1.5s_infinite] origin-left -translate-x-full"></div>
            </div>

            <p className="text-[10px] text-yellow-400/60 font-black uppercase tracking-[0.5em] pl-[0.5em]">
              Sharing is Earning
            </p>
          </div>
        </div>
      </div>

      {/* Tailwind Custom Animation Injection */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes translateX {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `,
        }}
      />
    </div>
  );
}
