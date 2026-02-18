"use client";

import React, { useState, useEffect } from "react";
import { getWithdrawals } from "@/lib/firebase/withdrawalService";
import { Withdrawal, WithdrawalStatus } from "@/types";
import { RefreshCw, User, Smartphone, DollarSign } from "react-feather";
import WithdrawalDetailModal from "./WithdrawalDetailModal";

export default function WithdrawalsTable() {
  const [activeTab, setActiveTab] = useState<WithdrawalStatus>("pending");
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastDoc, setLastDoc] = useState<any>(null); // For pagination
  const [selectedWithdrawal, setSelectedWithdrawal] =
    useState<Withdrawal | null>(null);

  const fetchWithdrawals = async (reset = false) => {
    setLoading(true);
    try {
      const { withdrawals: data, lastDoc: last } = await getWithdrawals(
        activeTab,
        reset ? null : lastDoc,
      );
      setWithdrawals(reset ? data : [...withdrawals, ...data]);
      setLastDoc(last);
    } catch (e) {
      console.error("Failed to fetch withdrawals", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals(true);
  }, [activeTab]);

  const handleCardClick = (withdrawal: Withdrawal) => {
    setSelectedWithdrawal(withdrawal);
  };

  const handleModalClose = () => {
    setSelectedWithdrawal(null);
  };

  const handleUpdate = () => {
    // Refresh the list after an action in the modal
    fetchWithdrawals(true);
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "-";
    // Firestore timestamp to JS Date
    return new Date(timestamp.seconds * 1000).toLocaleString();
  };

  return (
    <>
      <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-xl overflow-hidden p-6">
        {/* Tabs */}
        <div className="flex border-b border-slate-800 mb-6">
          {(["pending", "completed", "rejected"] as WithdrawalStatus[]).map(
            (status) => (
              <button
                key={status}
                onClick={() => setActiveTab(status)}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                  activeTab === status
                    ? "text-yellow-400 border-b-2 border-yellow-400 bg-slate-800/50"
                    : "text-gray-500 hover:text-gray-300 hover:bg-slate-800/30"
                }`}
              >
                {status}
              </button>
            ),
          )}
        </div>

        {/* Card Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading && withdrawals.length === 0 ? (
            <div className="col-span-full py-12 text-center">
              <RefreshCw className="animate-spin mx-auto mb-2 text-yellow-400" />
              Loading...
            </div>
          ) : withdrawals.length === 0 ? (
            <div className="col-span-full py-12 text-center text-gray-500">
              No {activeTab} withdrawals found.
            </div>
          ) : (
            withdrawals.map((w) => (
              <div
                key={w.id}
                onClick={() => handleCardClick(w)}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 hover:border-yellow-400/50 hover:bg-slate-800 transition-all cursor-pointer group relative overflow-hidden shadow-lg hover:shadow-yellow-400/10"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-yellow-400/10 transition-colors"></div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="p-2.5 bg-slate-900 rounded-xl text-gray-500 group-hover:text-yellow-400 group-hover:bg-slate-950 transition-colors border border-slate-800">
                    <User size={20} />
                  </div>
                  <span
                    className={`text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full uppercase border ${
                      w.status === "completed"
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : w.status === "rejected"
                          ? "bg-red-500/10 text-red-400 border-red-500/20"
                          : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                    }`}
                  >
                    {w.status}
                  </span>
                </div>

                <div className="relative z-10">
                  <h4 className="font-bold text-white text-lg mb-1 truncate tracking-tight">
                    {w.phoneAccountName}
                  </h4>
                  <p className="text-sm text-gray-400 flex items-center gap-2 mb-4 font-medium">
                    <Smartphone size={14} className="text-gray-600" />
                    {w.phoneNumber}
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-800/50 flex justify-between items-end relative z-10">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-gray-600 font-bold tracking-wider mb-0.5">
                      Requested
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      {formatDate(w.dateRequested).split(",")[0]}
                    </span>
                  </div>
                  <p className="font-black text-white text-xl flex items-baseline">
                    {w.amount.toLocaleString()}{" "}
                    <span className="text-yellow-400 text-xs ml-1 font-bold">
                      FCFA
                    </span>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {withdrawals.length > 0 && !loading && (
          <div className="mt-8 text-center">
            <button
              onClick={() => fetchWithdrawals(false)}
              className="text-yellow-400 text-sm font-bold hover:text-yellow-300 transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      <WithdrawalDetailModal
        withdrawal={selectedWithdrawal}
        onClose={handleModalClose}
        onUpdate={handleUpdate}
      />
    </>
  );
}
