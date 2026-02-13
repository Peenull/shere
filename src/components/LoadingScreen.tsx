'use client';

import { DollarSign, PieChart, TrendingUp } from 'react-feather';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Dynamic Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400/5 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[120px] animate-pulse [animation-delay:1s]"></div>
      
      {/* Floating Particles (Simulating Shares/Coins) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[30%] animate-bounce [animation-duration:3s] opacity-20">
            <DollarSign size={20} className="text-yellow-400" />
        </div>
        <div className="absolute top-[60%] right-[25%] animate-bounce [animation-duration:4s] opacity-20 [animation-delay:1s]">
            <PieChart size={16} className="text-yellow-400" />
        </div>
        <div className="absolute bottom-[20%] left-[40%] animate-bounce [animation-duration:5s] opacity-20 [animation-delay:0.5s]">
            <TrendingUp size={24} className="text-blue-400" />
        </div>
      </div>

      {/* Main Core Loader */}
      <div className="relative group scale-110 md:scale-125">
        {/* Outer Glowing Ring */}
        <div className="absolute -inset-4 bg-yellow-400/10 rounded-[2.5rem] blur-xl transition-opacity duration-1000"></div>
        
        {/* Rotating Circular Border */}
        <div className="absolute -inset-2 border border-slate-800 rounded-[2.2rem] animate-[spin_4s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-[0_0_10px_#facc15]"></div>
        </div>
        
        {/* The Hub */}
        <div className="w-24 h-24 bg-slate-900 border-2 border-slate-800 rounded-[2rem] flex items-center justify-center shadow-2xl relative z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent"></div>
            
            {/* Morphing/Pulsing Content */}
            <div className="flex flex-col items-center justify-center">
                 <div className="animate-[pulse_1.5s_ease-in-out_infinite] text-yellow-400">
                    <PieChart size={32} strokeWidth={3} />
                 </div>
                 <div className="absolute mt-1 animate-bounce text-white opacity-80">
                    <DollarSign size={20} strokeWidth={4} />
                 </div>
            </div>
        </div>
      </div>

      {/* Text Context */}
      <div className="mt-12 text-center relative z-10 px-6">
        <h2 className="text-2xl font-black text-white tracking-[0.3em] uppercase mb-3 italic">SHERE.</h2>
        <div className="flex items-center justify-center gap-3">
            <span className="h-0.5 w-6 bg-slate-800 rounded-full"></span>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.4em]">Allocating Wealth</p>
            <span className="h-0.5 w-6 bg-slate-800 rounded-full"></span>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
