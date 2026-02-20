"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { useUserData } from "@/hooks/useUserData";
import { requestWithdrawal } from "@/lib/firebase/withdrawalService";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  ArrowLeft,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Smartphone,
  Clock,
} from "react-feather";
import LoadingScreen from "@/components/LoadingScreen";
import { checkPending } from "@/lib/firebase/checkPending";

export default function WithdrawalPage() {
  const { user } = useAuth();
  const {
    balance,
    phone,
    phoneAccountName: existingAccountName,
    loading: userLoading,
  } = useUserData();

  const [amount, setAmount] = useState("");
  const [accountName, setAccountName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "confirming" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [promptTitle] = useState("No Earnings Yet");
  const [promptMessage] = useState(
    "You need a balance to make a withdrawal. Start sharing your link to earn money!",
  );
  const [pendingList, setPendingList] = useState([]);
  // Local state to track if account name is set in DB or just entered
  const [hasAccountName, setHasAccountName] = useState(false);

  useEffect(() => {
    if (existingAccountName) {
      setAccountName(existingAccountName);
      setHasAccountName(true);
    }
  }, [existingAccountName]);

  useEffect(() => {
    const getList = async () => {
      const list = await checkPending(user?.uid, true);
      console.log(list);
      setPendingList(list);
    };
    getList();
  }, []);
  const handleSetAccountName = async () => {
    if (!accountName.trim() || !user) return;
    setIsSubmitting(true);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        phoneAccountName: accountName,
      });
      setHasAccountName(true);
    } catch (e) {
      console.error(e);
      setErrorMessage("Failed to save account name.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestWithdrawal = async () => {
    if (!user || !amount) return;

    // Validation
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      setErrorMessage("Please enter a valid amount.");
      return;
    }
    if (withdrawAmount > balance) {
      setErrorMessage("Insufficient balance.");
      return;
    }
    // Min withdrawal check (optional, but good practice)
    if (withdrawAmount < 500) {
      // Example limit
      setErrorMessage("Minimum withdrawal is 500 FCFA.");
      return;
    }

    setStatus("confirming");
  };

  const confirmWithdrawal = async () => {
    if (!user || isSubmitting) return; // Prevent multiple clicks

    // Safety check: if we somehow got here without amount or account name
    if (!amount || !accountName) {
      setStatus("error");
      setErrorMessage("Missing required information.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await requestWithdrawal(
        user.uid,
        parseFloat(amount),
        accountName,
        phone || "",
      );
      setStatus("success");
    } catch (e) {
      console.error(e);
      setStatus("error");
      setErrorMessage("Failed to process request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (userLoading) {
    return <LoadingScreen />;
  }

  // State 2: Zero Balance - Show "Share & Earn"
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "-";
    if (timestamp.toDate) return timestamp.toDate().toLocaleString();
    if (timestamp.seconds)
      return new Date(timestamp.seconds * 1000).toLocaleString();
    return new Date(timestamp).toLocaleString();
  };

  if (balance == 0 && status !== "success") {
    return (
      <div className="min-h-screen bg-slate-950 p-6 flex flex-col items-center justify-center text-center">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full shadow-2xl">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-500">
            <DollarSign size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{promptTitle}</h2>
          <p className="text-gray-400 mb-8">{promptMessage}</p>
          <Link
            href="/"
            className="block w-full py-4 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition-colors"
          >
            Go to Dashboard & Share
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans p-4 md:p-8">
      <div className="max-w-lg mx-auto">
        <header className="mb-8 flex items-center gap-4">
          <Link
            href="/"
            className="p-2 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-400" />
          </Link>
          <h1 className="text-2xl font-bold">Withdraw Funds</h1>
        </header>

        {/* Success State */}
        {pendingList.length > 0 ? (
          <div>
            {pendingList.map((p) => (
              <>
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-2xl mb-6 shadow-lg">
                  <p className="text-2xl font-black text-red-600">
                    Pending Withdrawals.
                  </p>
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1"></p>
                  Please come back later after this transactions has been
                  processed.
                </div>
                <div
                  key={p.id}
                  className="bg-slate-900/50 border border-white/5 rounded-2xl p-5 hover:bg-slate-900 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">
                        Amount
                      </p>
                      <p className="text-2xl font-black">
                        {p.amount.toLocaleString()}{" "}
                        <span className="text-yellow-400 text-sm font-normal">
                          FCFA
                        </span>
                      </p>
                    </div>
                    <span
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase border bg-yellow-500/10 text-yellow-500 border-yellow-500/20`}
                    >
                      <Clock size="12" />
                      Pending
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">
                        Date
                      </p>
                      <p className="text-xs text-slate-300">
                        {formatDate(p.dateRequested)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">
                        Recipient
                      </p>
                      <p className="text-xs text-slate-300 truncate">
                        {p.phoneAccountName}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        ) : (
          <div>
            {" "}
            {status === "success" ? (
              <div className="bg-slate-900 border border-green-500/30 p-8 rounded-2xl text-center shadow-2xl">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Request Submitted
                </h2>
                <p className="text-gray-400 mb-8">
                  Your withdrawal request for{" "}
                  <span className="text-white font-bold">
                    {parseFloat(amount).toLocaleString()} FCFA
                  </span>{" "}
                  has been received. Our team will review it shortly.
                </p>
                <Link
                  href="/"
                  className="block w-full py-4 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors"
                >
                  Return to Dashboard
                </Link>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-2xl mb-6 shadow-lg">
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">
                    Available Balance
                  </p>
                  <p className="text-4xl font-black text-white">
                    {balance.toLocaleString()}{" "}
                    <span className="text-yellow-400/80 text-xl">FCFA</span>
                  </p>
                </div>

                {/* State 1: Missing Account Name */}
                {!hasAccountName ? (
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                        <Smartphone size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">One-time Setup</h3>
                        <p className="text-sm text-gray-400">
                          Add account name for {phone}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Account Name (MOMO/OM)
                      </label>
                      <input
                        type="text"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all placeholder:text-gray-600"
                      />
                      <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                        <AlertCircle
                          size={12}
                          className="mt-0.5 flex-shrink-0"
                        />
                        This name must match your Mobile Money account. It
                        cannot be changed later without admin support.
                      </p>
                    </div>

                    {errorMessage && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm mb-6 flex items-center gap-2">
                        <AlertCircle size={16} /> {errorMessage}
                      </div>
                    )}

                    <button
                      onClick={handleSetAccountName}
                      disabled={!accountName.trim() || isSubmitting}
                      className="w-full py-4 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                    >
                      {isSubmitting ? "Saving..." : "Save & Continue"}
                    </button>
                  </div>
                ) : (
                  /* State 3: Withdrawal Form */
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg relative overflow-hidden">
                    {status === "confirming" && (
                      <div className="absolute inset-0 bg-slate-900/95 z-10 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm animate-in fade-in zoom-in duration-200">
                        <h3 className="text-xl font-bold text-white mb-2">
                          Confirm Request
                        </h3>
                        <p className="text-gray-400 mb-6">
                          Are you sure you want to withdraw{" "}
                          <span className="text-white font-bold">
                            {parseFloat(amount).toLocaleString()} FCFA
                          </span>{" "}
                          to{" "}
                          <span className="text-white font-bold">{phone}</span>{" "}
                          ({accountName})?
                        </p>
                        <div className="flex gap-4 w-full">
                          <button
                            onClick={() => setStatus("idle")}
                            className="flex-1 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors"
                          >
                            Back
                          </button>
                          <button
                            onClick={confirmWithdrawal}
                            disabled={isSubmitting}
                            className="flex-1 py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition-colors"
                          >
                            {isSubmitting ? "Processing..." : "Confirm"}
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Receiving Number
                      </label>
                      <input
                        type="text"
                        value={phone || ""}
                        disabled
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-gray-400 cursor-not-allowed"
                      />
                      <div className="flex justify-between items-center mt-2 px-1">
                        <span className="text-xs text-gray-500">
                          Account Name: {accountName}
                        </span>
                      </div>
                    </div>

                    <div className="mb-8">
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Amount (FCFA)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0"
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-lg font-bold focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all placeholder:text-gray-600"
                        />
                        {/* <button 
                                    onClick={() => setAmount(balance.toString())}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-yellow-500 hover:text-yellow-400 uppercase bg-yellow-500/10 hover:bg-yellow-500/20 px-2 py-1 rounded"
                                >
                                    Max
                                </button> */}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Maximum withdrawal: {balance.toLocaleString()} FCFA
                      </p>
                    </div>

                    {errorMessage && status !== "confirming" && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm mb-6 flex items-center gap-2 animate-in slide-in-from-top-2">
                        <AlertCircle size={16} /> {errorMessage}
                      </div>
                    )}

                    <button
                      onClick={handleRequestWithdrawal}
                      disabled={
                        !amount || parseFloat(amount) <= 0 || isSubmitting
                      }
                      className="w-full py-4 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-lg shadow-yellow-400/10"
                    >
                      Continue
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
