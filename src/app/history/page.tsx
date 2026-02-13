'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { getUserWithdrawals } from '@/lib/firebase/withdrawalService';
import { getUserSharePurchases, SharePurchase } from '@/lib/firebase/shareService';
import { Withdrawal } from '@/types';
import { ChevronLeft, Clock, DollarSign, TrendingUp, AlertCircle, CheckCircle, XCircle, RefreshCw } from 'react-feather';
import Link from 'next/link';

type Tab = 'withdrawals' | 'shares';

export default function HistoryPage() {
    const { user } = useAuth();
    const [activeTab, setActiveTab ] = useState<Tab>('withdrawals');
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
    const [shares, setShares] = useState<SharePurchase[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                if (activeTab === 'withdrawals') {
                    const data = await getUserWithdrawals(user.uid);
                    setWithdrawals(data);
                } else {
                    const data = await getUserSharePurchases(user.uid);
                    setShares(data);
                }
            } catch (error) {
                console.error("Error fetching history:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, activeTab]);

    const formatDate = (timestamp: any) => {
        if (!timestamp) return '-';
        if (timestamp.toDate) return timestamp.toDate().toLocaleString();
        if (timestamp.seconds) return new Date(timestamp.seconds * 1000).toLocaleString();
        return new Date(timestamp).toLocaleString();
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const styles = {
            pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
            completed: 'bg-green-500/10 text-green-500 border-green-500/20',
            rejected: 'bg-red-500/10 text-red-500 border-red-500/20',
        }[status] || 'bg-gray-500/10 text-gray-500 border-gray-500/20';

        const Icon = {
            pending: Clock,
            completed: CheckCircle,
            rejected: XCircle,
        }[status] || AlertCircle;

        return (
            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase border ${styles}`}>
                <Icon size={12} />
                {status}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-white">
            <header className="bg-slate-900/50 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
                <div className="max-w-3xl mx-auto flex items-center p-4">
                    <Link href="/" className="p-2 hover:bg-white/5 rounded-full transition-colors mr-2">
                        <ChevronLeft size={24} />
                    </Link>
                    <h1 className="text-xl font-bold">Activity History</h1>
                </div>
            </header>

            <main className="max-w-3xl mx-auto p-4 sm:p-6">
                {/* Tabs */}
                <div className="flex gap-2 p-1 bg-slate-900/50 rounded-xl border border-white/5 mb-8">
                    <button 
                        onClick={() => setActiveTab('withdrawals')}
                        className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                            activeTab === 'withdrawals' 
                            ? 'bg-slate-800 text-white shadow-md border border-white/5' 
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <DollarSign size={16} /> Withdrawals
                    </button>
                    <button 
                        onClick={() => setActiveTab('shares')}
                        className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                            activeTab === 'shares' 
                            ? 'bg-slate-800 text-white shadow-md border border-white/5' 
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <TrendingUp size={16} /> Buy Shares
                    </button>
                </div>

                {loading ? (
                    <div className="py-20 text-center">
                        <RefreshCw className="animate-spin mx-auto mb-4 text-yellow-400" size={32} />
                        <p className="text-slate-400">Loading your history...</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {activeTab === 'withdrawals' ? (
                            withdrawals.length === 0 ? (
                                <div className="py-12 text-center bg-slate-900/30 rounded-2xl border border-white/5">
                                    <p className="text-slate-500">No withdrawal requests found.</p>
                                </div>
                            ) : (
                                withdrawals.map((w) => (
                                    <div key={w.id} className="bg-slate-900/50 border border-white/5 rounded-2xl p-5 hover:bg-slate-900 transition-colors">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Amount</p>
                                                <p className="text-2xl font-black">{w.amount.toLocaleString()} <span className="text-yellow-400 text-sm font-normal">FCFA</span></p>
                                            </div>
                                            <StatusBadge status={w.status} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                            <div>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Date</p>
                                                <p className="text-xs text-slate-300">{formatDate(w.dateRequested)}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Recipient</p>
                                                <p className="text-xs text-slate-300 truncate">{w.phoneAccountName}</p>
                                            </div>
                                        </div>
                                        {w.status === 'rejected' && w.rejectionReason && (
                                            <div className="mt-4 p-3 bg-red-500/5 border border-red-500/10 rounded-xl">
                                                <p className="text-[10px] text-red-500 font-bold uppercase mb-1">Reason</p>
                                                <p className="text-xs text-red-300/80">{w.rejectionReason}</p>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )
                        ) : (
                            shares.length === 0 ? (
                                <div className="py-12 text-center bg-slate-900/30 rounded-2xl border border-white/5">
                                    <p className="text-slate-500">No share purchase requests found.</p>
                                </div>
                            ) : (
                                shares.map((s) => (
                                    <div key={s.id} className="bg-slate-900/50 border border-white/5 rounded-2xl p-5 hover:bg-slate-900 transition-colors">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Requested Share</p>
                                                <p className="text-2xl font-black">+{s.percentage}% <span className="text-yellow-400 text-sm font-normal">Stake</span></p>
                                            </div>
                                            <StatusBadge status={s.status} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                            <div>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Date</p>
                                                <p className="text-xs text-slate-300">{formatDate(s.dateRequested)}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Price Paid</p>
                                                <p className="text-xs text-slate-300 font-bold">{s.amount.toLocaleString()} FCFA</p>
                                            </div>
                                        </div>
                                        {s.status === 'rejected' && s.rejectionReason && (
                                            <div className="mt-4 p-3 bg-red-500/5 border border-red-500/10 rounded-xl">
                                                <p className="text-[10px] text-red-500 font-bold uppercase mb-1">Reason</p>
                                                <p className="text-xs text-red-300/80">{s.rejectionReason}</p>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
