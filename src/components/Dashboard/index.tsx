'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { useUserData } from '@/hooks/useUserData';
import { Users, PieChart, Info, Eye, EyeOff, User, Share2, ArrowRight } from 'react-feather';
import Share from '@/components/Share';
import Withdraw from './components/Withdraw';
import BuyShares from './components/BuyShares';

const MiniStatCard = ({ icon, title, value, isLoading, color, emptyState }: { icon: React.ReactNode; title: string; value: string; isLoading: boolean; color: string, emptyState?: React.ReactNode }) => (
    <div className={`bg-slate-900 p-6 rounded-2xl border border-gray-800/80 shadow-lg`}>
        <div className="flex items-center">
            <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full mr-4 ${color}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-400 font-medium">{title}</p>
                {isLoading ? (
                    <div className="w-24 h-8 bg-slate-700/80 animate-pulse rounded-md mt-1"></div>
                ) : (
                    <p className="text-2xl font-bold text-white">{value}</p>
                )}
            </div>
        </div>
    </div>
);

export default function Dashboard() {
  const { user } = useAuth();
  const { balance, invited, share, phone, name, loading } = useUserData();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  
  const shareText = "Join me on Shere and start earning! Use my link to sign up.";
  const shareTitle = "Join me on Shere!";

  const getFirstName = (fullName: string | null | undefined): string => {
    if (!fullName) return 'User';
    return fullName.split(' ')[0];
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <header className="bg-slate-950/80 backdrop-blur-lg border-b border-gray-800/50 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="text-2xl font-black text-yellow-400 italic">SHERE.</div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                  <p className="text-sm text-gray-300">Welcome back,</p>
                  <p className="font-bold text-white -mt-1">{getFirstName(name || user?.displayName)}!</p>
              </div>
              <Link className="flex items-center gap-2 text-sm text-white bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 px-4 py-2.5 rounded-lg transition-colors" href="/profile">
                    <User size={16} />
                    <span className="hidden sm:inline">Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Your Dashboard</h1>
        <p className="text-gray-400 mb-8">An overview of your earnings and activity.</p>

        <div className="grid grid-cols-2 gap-6 mb-8">
          
          <div className="col-span-2 bg-slate-900 p-6 rounded-2xl border border-gray-800/80 shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <p className="text-sm text-gray-400 font-medium">Total Balance</p>
                    {loading ? (
                        <div className="w-48 h-10 bg-slate-700/80 animate-pulse rounded-md mt-2"></div>
                    ) : (
                        <div className="flex items-center gap-4 mt-1">
                            <p className="text-4xl font-bold text-white">
                                {isBalanceVisible ? `${balance.toLocaleString()} FCFA` : '••••••••'}
                            </p>
                            <button onClick={() => setIsBalanceVisible(!isBalanceVisible)} className="text-gray-500 hover:text-white transition-colors">
                                {isBalanceVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    )}
                </div>
                <Withdraw balance={balance} loading={loading} phone={phone} name={name || user?.displayName || null} />
            </div>
          </div>

          <MiniStatCard 
            icon={<Users size={24} className="text-blue-400" />} 
            title="Total Invites" 
            value={invited.length.toString()}
            isLoading={loading} 
            color="bg-blue-500/10"
          />
          <MiniStatCard 
            icon={<PieChart size={24} className="text-yellow-400" />} 
            title="Your Share" 
            value={`${share}%`}
            isLoading={loading} 
            color="bg-yellow-500/10"
          />
        
          {!loading && share < 50 && (
            <BuyShares currentShare={share} phone={phone} name={name || user?.displayName || null} />
          )}
        </div>

        <div className="bg-slate-900 border border-gray-800/80 rounded-2xl p-6 md:p-8 text-center shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Invite & Earn</h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">The more you share, the more you earn. It's that simple.</p>
          <Share title={shareTitle} text={shareText} />
        </div>

        <div className="mt-12 text-center">
            <Link href="/about#how-it-works" className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors font-semibold group">
                <span>Learn More About How Shere Works</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
        </div>
      </main>
    </div>
  );
}
