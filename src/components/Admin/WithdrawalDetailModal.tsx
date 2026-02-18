"use client";

import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Withdrawal } from "@/types";
import {
  Check,
  X,
  Users,
  RefreshCw,
  AlertCircle,
  Smartphone,
} from "react-feather";
import {
  approveWithdrawal,
  rejectWithdrawal,
  resetWithdrawalStatus,
} from "@/lib/firebase/withdrawalService";
import { useDirector } from "../Director";

interface WithdrawalDetailModalProps {
  withdrawal: Withdrawal | null;
  onClose: () => void;
  onUpdate: () => void; // Trigger refresh
}

export default function WithdrawalDetailModal({
  withdrawal,
  onClose,
  onUpdate,
}: WithdrawalDetailModalProps) {
  const [userData, setUserData] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [rejectReason, setRejectReason] = useState("Insufficient balance");
  const [customReason, setCustomReason] = useState("");
  const [isRejecting, setIsRejecting] = useState(false);
  const { notify } = useDirector();
  const [isConfirmingApprove, setIsConfirmingApprove] = useState(false);

  useEffect(() => {
    if (withdrawal) {
      fetchUserData(withdrawal.userId);
      setIsRejecting(false);
      setRejectReason("Insufficient balance");
      setCustomReason("");
      setIsConfirmingApprove(false);
    }
  }, [withdrawal]);

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
    if (!withdrawal || !withdrawal.id) return;

    setProcessing(true);
    try {
      await approveWithdrawal(
        withdrawal.userId,
        withdrawal.id,
        withdrawal.amount,
      );
      onUpdate();
      onClose();
    } catch (e) {
      console.error(e);
      alert("Approval failed.");
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!withdrawal || !withdrawal.id) return;
    const reason = rejectReason === "Custom" ? customReason : rejectReason;

    setProcessing(true);
    try {
      await rejectWithdrawal(withdrawal.userId, withdrawal.id, reason);
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
    if (!withdrawal || !withdrawal.id) return;

    setProcessing(true);
    try {
      await resetWithdrawalStatus(withdrawal.userId, withdrawal.id);
      onUpdate();
      onClose();
    } catch (e) {
      console.error(e);
      alert("Reset failed.");
    } finally {
      setProcessing(false);
    }
  };

  if (!withdrawal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/50 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden ring-1 ring-white/10 relative max-h-[90vh] flex flex-col">
        {/* Decorative background element */}
        <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-blue-500/10 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="relative p-6 border-b border-slate-800/50 flex justify-between items-start z-10 shrink-0">
          <div>
            <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              {isConfirmingApprove && (
                <AlertCircle className="text-blue-400" size={20} />
              )}
              {isConfirmingApprove ? "Confirm Approval" : "Withdrawal Request"}
            </h3>
            <p className="text-gray-400 font-mono text-xs opacity-70">
              ID: {withdrawal.id}
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
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">
                    Amount
                  </p>
                  <p className="text-3xl font-black text-white tracking-tight">
                    {withdrawal.amount.toLocaleString()}{" "}
                    <span className="text-yellow-400 text-lg font-normal">
                      FCFA
                    </span>
                  </p>
                </div>
                <div
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                    withdrawal.status === "completed"
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : withdrawal.status === "rejected"
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                  }`}
                >
                  {withdrawal.status}
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
                        Current Balance
                      </p>
                      <p
                        className={`font-bold text-lg ${userData.balance < withdrawal.amount ? "text-red-400" : "text-green-400"}`}
                      >
                        {userData.balance?.toLocaleString()}{" "}
                        <span className="text-xs text-gray-600">FCFA</span>
                      </p>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800/80">
                      <p className="text-xs text-gray-500 mb-1">
                        Account Name (MOMO)
                      </p>
                      <p
                        className="font-bold text-white truncate text-sm"
                        title={userData.phoneAccountName}
                      >
                        {userData.phoneAccountName || "Not Set"}
                      </p>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800/80 col-span-2">
                      <p className="text-xs text-gray-500 mb-1">
                        User Profile Name
                      </p>
                      <p className="font-bold text-white text-sm">
                        {userData.name || "Anonymous"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-red-400 text-xs bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    Could not load user data.
                  </p>
                )}
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center p-4 bg-slate-800/30 rounded-xl border border-slate-800/30">
                  <span className="text-gray-400 text-sm flex items-center gap-2">
                    <Smartphone size={14} /> Phone
                  </span>
                  <span
                    onClick={async () => {
                      navigator.clipboard
                        .writeText(withdrawal.phoneNumber)
                        .then(
                          () => {
                            notify(
                              `${withdrawal.phoneNumber} copied to clipboard!`,
                              true,
                            );
                          },
                          () => {
                            notify(
                              `Failed to copy ${withdrawal.phoneNumber}.`,
                              false,
                            );
                          },
                        );
                    }}
                    className="text-white font-mono font-medium tracking-wide cursor-pointer"
                  >
                    {withdrawal.phoneNumber}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-800/30 rounded-xl border border-slate-800/30">
                  <span className="text-gray-400 text-sm flex items-center gap-2">
                    <Users size={14} /> Name
                  </span>
                  <span
                    onClick={async () => {
                      navigator.clipboard
                        .writeText(withdrawal.phoneNumber)
                        .then(
                          () => {
                            notify(
                              `${withdrawal.phoneNumber} copied to clipboard!`,
                              true,
                            );
                          },
                          () => {
                            notify(
                              `Failed to copy ${withdrawal.phoneNumber}.`,
                              false,
                            );
                          },
                        );
                    }}
                    className="text-white font-medium cursor-pointer"
                  >
                    {withdrawal.phoneAccountName}
                  </span>
                </div>
                {withdrawal.status === "rejected" && (
                  <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl">
                    <p className="text-xs text-red-500 font-bold mb-1 uppercase tracking-wider">
                      Rejection Reason
                    </p>
                    <p className="text-red-300 text-sm">
                      {withdrawal.rejectionReason}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {withdrawal.status === "pending" && !isRejecting && (
                  <div className="flex flex-col gap-2">
                    <a
                      className="w-full py-4 bg-blue-500/10 text-blue-400 font-bold rounded-2xl border border-blue-500/20 hover:bg-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-3"
                      href={`tel:*126*9*${withdrawal.phoneNumber}*${withdrawal.amount}%23`}
                    >
                      Send Money
                    </a>
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
                        disabled={
                          processing ||
                          (userData && userData.balance < withdrawal.amount)
                        }
                        className="flex-2 py-3.5 bg-linear-to-r from-blue-600 to-blue-500 text-white font-bold rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
                      >
                        Approve Payment
                      </button>
                    </div>
                  </div>
                )}

                {/* Rejection Form Integration */}
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
                      <option>Insufficient balance</option>
                      <option>Number name does not match</option>
                      <option>Missing account details</option>
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
                {withdrawal.status === "rejected" && (
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
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-400">
                <Check size={32} />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                Approve Payment?
              </h4>
              <p className="text-gray-400 text-sm mb-8 px-6">
                This will deduct{" "}
                <span className="text-white font-bold">
                  {withdrawal.amount.toLocaleString()} FCFA
                </span>{" "}
                from the user&apos;s balance and mark the request as completed.
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
                  className="flex-2 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/25 text-sm"
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
