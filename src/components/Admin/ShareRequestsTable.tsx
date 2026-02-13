'use client';

import React, { useState, useEffect } from 'react';
import { getSharePurchases, SharePurchase } from '@/lib/firebase/shareService';
import { RefreshCw, User, Smartphone, PieChart } from 'react-feather';
import SharePurchaseDetailModal from './SharePurchaseDetailModal';

export default function ShareRequestsTable() {
  const [activeTab, setActiveTab] = useState<'pending' | 'completed' | 'rejected'>('pending');
  const [purchases, setPurchases] = useState<SharePurchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastDoc, setLastDoc] = useState<any>(null); // For pagination
  const [selectedPurchase, setSelectedPurchase] = useState<SharePurchase | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPurchases = async (reset = false) => {
    setLoading(true);
    try {
        const { purchases: data, lastDoc: last } = await getSharePurchases(activeTab, reset ? null : lastDoc);
        setPurchases(reset ? data : [...purchases, ...data]);
        setLastDoc(last);
    } catch (e) {
        console.error("Failed to fetch share purchases", e);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases(true);
  }, [activeTab]);

  const handleCardClick = (purchase: SharePurchase) => {
      setSelectedPurchase(purchase);
      setIsModalOpen(true);
  };

  const handleModalClose = () => {
      setIsModalOpen(false);
      setSelectedPurchase(null);
  };

  const handleUpdate = () => {
      // Refresh the list after an action in the modal
      fetchPurchases(true);
  };

  const formatDate = (timestamp: any) => {
     if (!timestamp) return '-';
     // Firestore timestamp to JS Date
     return new Date(timestamp.seconds * 1000).toLocaleString();
  };

  return (
    <>
        <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-xl overflow-hidden p-6">
        {/* Tabs */}
        <div className="flex border-b border-slate-800 mb-6">
            {(['pending', 'completed', 'rejected'] as const).map(status => (
                <button
                    key={status}
                    onClick={() => setActiveTab(status)}
                    className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                        activeTab === status 
                        ? 'text-yellow-400 border-b-2 border-yellow-400 bg-slate-800/50' 
                        : 'text-gray-500 hover:text-gray-300 hover:bg-slate-800/30'
                    }`}
                >
                    {status}
                </button>
            ))}
        </div>

        {/* Card Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading && purchases.length === 0 ? (
                <div className="col-span-full py-12 text-center">
                    <RefreshCw className="animate-spin mx-auto mb-2 text-yellow-400" />
                    Loading...
                </div>
            ) : purchases.length === 0 ? (
                <div className="col-span-full py-12 text-center text-gray-500">
                    No {activeTab} share requests found.
                </div>
            ) : (
                purchases.map((p) => (
                    <div 
                        key={p.id} 
                        onClick={() => handleCardClick(p)}
                        className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 hover:border-yellow-400/50 hover:bg-slate-800 transition-all cursor-pointer group relative overflow-hidden shadow-lg hover:shadow-yellow-400/10"
                    >
                         <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-yellow-400/10 transition-colors"></div>
                         
                         <div className="flex justify-between items-start mb-4 relative z-10">
                             <div className="p-2.5 bg-slate-900 rounded-xl text-gray-500 group-hover:text-yellow-400 group-hover:bg-slate-950 transition-colors border border-slate-800">
                                 <PieChart size={20} />
                             </div>
                             <span className={`text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full uppercase border ${
                                 p.status === 'completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                 p.status === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                             }`}>
                                 {p.status}
                             </span>
                         </div>
                         
                         <div className="relative z-10">
                            <h4 className="font-bold text-white text-lg mb-1 truncate tracking-tight">{p.phoneAccountName}</h4>
                            <p className="text-sm text-gray-400 flex items-center gap-2 mb-4 font-medium">
                                <Smartphone size={14} className="text-gray-600"/>
                                {p.phoneNumber}
                            </p>
                         </div>

                         <div className="mt-auto pt-4 border-t border-slate-800/50 flex justify-between items-end relative z-10">
                             <div className="flex flex-col">
                                <span className="text-[10px] uppercase text-gray-600 font-bold tracking-wider mb-0.5">Price Paid</span>
                                <span className="text-xl font-black text-white">{p.amount.toLocaleString()} <span className="text-yellow-400 text-xs ml-1 font-bold">FCFA</span></span>
                             </div>
                             <p className="font-black text-white text-base flex items-baseline gap-1">
                                 <span className="text-[10px] text-gray-500 uppercase">Stake</span>
                                 +{p.percentage}%
                             </p>
                         </div>
                    </div>
                ))
            )}
        </div>
            
        {/* Pagination */}
        {purchases.length > 0 && !loading && (
            <div className="mt-8 text-center">
                <button 
                    onClick={() => fetchPurchases(false)} 
                    className="text-yellow-400 text-sm font-bold hover:text-yellow-300 transition-colors"
                    >
                    Load More
                </button>
            </div>
        )}
        </div>

        <SharePurchaseDetailModal 
            purchase={selectedPurchase}
            onClose={handleModalClose}
            onUpdate={handleUpdate}
        />
    </>
  );
}
