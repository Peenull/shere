"use client";

import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  SharePurchase,
  approveSharePurchase,
  rejectSharePurchase,
  resetSharePurchaseStatus,
} from "@/lib/firebase/shareService";
import {
  Check,
  X,
  Users,
  PieChart,
  RefreshCw,
  AlertCircle,
  Smartphone,
  Edit3,
  DollarSign,
  TrendingUp,
} from "react-feather";
import { useDirector } from "../Director";

interface SharePurchaseDetailModalProps {
  purchase: SharePurchase | null;
  onClose: () => void;
  onUpdate: () => void; // Trigger refresh
}

export default function SharePurchaseDetailModal({
  purchase,
  onClose,
  onUpdate,
}: SharePurchaseDetailModalProps) {
  const [userData, setUserData] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [rejectReason, setRejectReason] = useState("Payment not received");
  const [customReason, setCustomReason] = useState("");
  const [isRejecting, setIsRejecting] = useState(false);
  const [isConfirmingApprove, setIsConfirmingApprove] = useState(false);

  // Editable fields for Admin
  const [editPercentage, setEditPercentage] = useState<string>("");
  const [editPrice, setEditPrice] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  const { notify } = useDirector();

  useEffect(() => {
    if (purchase) {
      fetchUserData(purchase.userId);
      setIsRejecting(false);
      setRejectReason("Payment not received");
      setCustomReason("");
      setIsConfirmingApprove(false);
      setEditPercentage(purchase.percentage.toString());
      setEditPrice(purchase.amount.toString());
      setIsEditing(false);
    }
  }, [purchase]);

  const fetchUserData = async (uid: string) => {
    setLoadingUser(true);
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
    } catch (e) {
      console.error("Error fetching user data:", e);
    } finally {
      setLoadingUser(false);
    }
  };

  const handleApproveClick = () => {
    setIsConfirmingApprove(true);
  };

  const confirmApprove = async () => {
    if (!purchase || !purchase.id) return;

    setProcessing(true);
    try {
      await approveSharePurchase(
        purchase.userId,
        purchase.id,
        parseFloat(editPercentage),
        parseFloat(editPrice),
      );
      onUpdate();
      onClose();
    } catch (e: any) {
      console.error(e);
      alert(e.message || "Approval failed.");
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!purchase || !purchase.id) return;
    const reason = rejectReason === "Custom" ? customReason : rejectReason;

    setProcessing(true);
    try {
      await rejectSharePurchase(purchase.userId, purchase.id, reason);
      onUpdate();
      onClose();
    } catch (e) {
      console.error(e);
      alert("Rejection failed.");
    } finally {
      setProcessing(false);
    }
  };

  const handleResetToPending = async () => {
    if (!purchase || !purchase.id) return;

    setProcessing(true);
    try {
      await resetSharePurchaseStatus(purchase.userId, purchase.id);
      onUpdate();
      onClose();
    } catch (e) {
      console.error(e);
      alert("Reset failed.");
    } finally {
      setProcessing(false);
    }
  };

  if (!purchase) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/50 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden ring-1 ring-white/10 relative max-h-[90vh] flex flex-col">
        {/* Decorative background element - Yellow for shares */}
        <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-yellow-400/10 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="relative p-6 border-b border-slate-800/50 flex justify-between items-start z-10 shrink-0">
          <div>
            <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              {isConfirmingApprove && (
                <AlertCircle className="text-blue-400" size={20} />
              )}
              {isConfirmingApprove ? "Review & Finalize" : "Share Request"}
            </h3>
            <p className="text-sm text-gray-400 font-mono opacity-70">
              ID: {purchase.id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-700 p-2 rounded-full"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 relative z-10 overflow-y-auto custom-scrollbar">
          {!isConfirmingApprove ? (
            // NORMAL VIEW
            <>
              <div className="flex justify-between items-center mb-8 bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
                <div>
                  <p className="text-3xl font-black text-white tracking-tight">
                    {purchase.amount.toLocaleString()}{" "}
                    <span className="text-yellow-400 text-lg font-normal">
                      FCFA
                    </span>
                  </p>
                </div>
                <div
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                    purchase.status === "completed"
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : purchase.status === "rejected"
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                  }`}
                >
                  {purchase.status}
                </div>
              </div>

              {/* User Stats Card */}
              <div className="bg-slate-800/20 rounded-2xl p-5 border border-slate-800/50 mb-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Users size={12} /> User Live Status
                </h4>
                {loadingUser ? (
                  <div className="animate-pulse flex gap-4">
                    <div className="h-14 w-full bg-slate-800 rounded-xl"></div>
                    <div className="h-14 w-full bg-slate-800 rounded-xl"></div>
                  </div>
                ) : userData ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800/80">
                      <p className="text-xs text-gray-500 mb-1">
                        Current Share
                      </p>
                      <p className="font-bold text-lg text-yellow-400">
                        {userData.share || 0}%
                      </p>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800/80">
                      <p className="text-xs text-gray-500 mb-1">MOMO Name</p>
                      <p
                        className="font-bold text-white truncate text-sm"
                        title={userData.phoneAccountName}
                      >
                        {userData.phoneAccountName || "Not Set"}
                      </p>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800/80 col-span-2">
                      <p className="text-xs text-gray-500 mb-1">
                        Investor Profile
                      </p>
                      <p className="font-bold text-white text-sm">
                        {userData.name || "Anonymous"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-red-400 text-xs bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    Could not load investor data.
                  </p>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center p-4 bg-slate-800/30 rounded-xl border border-slate-800/30">
                  <span className="text-gray-400 text-sm flex items-center gap-2">
                    <Smartphone size={14} /> Phone
                  </span>
                  <span
                    onClick={async () => {
                      navigator.clipboard.writeText(purchase.phoneNumber).then(
                        () => {
                          notify(
                            `${purchase.phoneNumber} copied to clipboard!`,
                            true,
                          );
                        },
                        () => {
                          notify(
                            `Failed to copy ${purchase.phoneNumber}.`,
                            false,
                          );
                        },
                      );
                    }}
                    className="text-white font-mono font-medium tracking-wide cursor-pointer"
                  >
                    {purchase.phoneNumber}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-800/30 rounded-xl border border-slate-800/30">
                  <span className="text-gray-400 text-sm flex items-center gap-2">
                    <PieChart size={14} /> Stake Request
                  </span>
                  <span className="text-white font-bold font-lg">
                    +{purchase.percentage}%
                  </span>
                </div>
                {purchase.status === "rejected" && purchase.rejectionReason && (
                  <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl">
                    <p className="text-xs text-red-500 font-bold mb-1 uppercase tracking-wider">
                      Rejection Reason
                    </p>
                    <p className="text-red-300 text-sm">
                      {purchase.rejectionReason}
                    </p>
                  </div>
                )}
              </div>

              {/* Admin Adjustment Section */}
              {purchase.status === "pending" && (
                <div className="mb-8">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-[10px] font-black uppercase text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 mb-4"
                  >
                    <Edit3 size={12} />
                    {isEditing
                      ? "Cancel Adjustment"
                      : "Adjust percentage or investment"}
                  </button>

                  {isEditing && (
                    <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-300">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">
                          New Share (%)
                        </label>
                        <input
                          type="number"
                          value={editPercentage}
                          onChange={(e) => setEditPercentage(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">
                          Price (FCFA)
                        </label>
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                {purchase.status === "pending" && !isRejecting && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsRejecting(true)}
                      disabled={processing}
                      className="flex-1 py-3.5 bg-slate-800 text-gray-300 font-bold rounded-xl hover:bg-slate-700 hover:text-white transition-all disabled:opacity-50 text-sm"
                    >
                      Reject
                    </button>
                    <button
                      onClick={handleApproveClick}
                      disabled={processing || loadingUser}
                      className="flex-2 py-3.5 bg-linear-to-r from-yellow-500 to-yellow-400 text-black font-bold rounded-xl hover:from-yellow-400 hover:to-yellow-300 transition-all shadow-lg shadow-yellow-400/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
                    >
                      Confirm
                    </button>
                  </div>
                )}

                {/* Rejection Form */}
                {isRejecting && (
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 animate-in slide-in-from-bottom-4 fade-in duration-200">
                    <h4 className="text-sm font-bold text-white mb-3">
                      Confirm Rejection
                    </h4>
                    <select
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-white mb-2 text-sm focus:ring-2 focus:ring-red-500/50 outline-none"
                    >
                      <option>Payment not received</option>
                      <option>MOMO Name mismatch</option>
                      <option>Insufficient payment amount</option>
                      <option>Max share limit reached</option>
                      <option>Custom</option>
                    </select>
                    {rejectReason === "Custom" && (
                      <textarea
                        value={customReason}
                        onChange={(e) => setCustomReason(e.target.value)}
                        placeholder="Type reason..."
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white h-20 mb-3 text-sm focus:ring-2 focus:ring-red-500/50 outline-none resize-none"
                      />
                    )}
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => setIsRejecting(false)}
                        className="flex-1 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleReject}
                        disabled={processing}
                        className="flex-1 py-2 bg-red-500/10 text-red-500 border border-red-500/20 text-sm font-bold rounded-lg hover:bg-red-500 hover:text-white transition-all"
                      >
                        Confirm Reject
                      </button>
                    </div>
                  </div>
                )}

                {/* Reset Action */}
                {purchase.status === "rejected" && (
                  <button
                    onClick={handleResetToPending}
                    disabled={processing}
                    className="w-full py-3.5 bg-slate-800 text-yellow-400 font-bold rounded-xl hover:bg-slate-700 hover:text-yellow-300 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <RefreshCw size={16} />
                    {processing ? "Moving..." : "Move to Pending"}
                  </button>
                )}
              </div>
            </>
          ) : (
            // CONFIRM APPROVAL VIEW
            <div className="text-center py-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-400">
                <TrendingUp size={32} />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                Approve Share?
              </h4>
              <p className="text-gray-400 text-sm mb-8 px-6">
                Confirming will add{" "}
                <span className="text-white font-bold">+{editPercentage}%</span>{" "}
                to the user's stake and add{" "}
                <span className="text-white font-bold">
                  {parseFloat(editPrice).toLocaleString()} FCFA
                </span>{" "}
                to their total invested amount.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsConfirmingApprove(false)}
                  className="flex-1 py-3.5 bg-slate-800 text-gray-300 font-bold rounded-xl hover:bg-slate-700 hover:text-white transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmApprove}
                  disabled={processing}
                  className="flex-2 py-3.5 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/25 text-sm"
                >
                  {processing ? "Processing..." : "Confirm Approval"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
