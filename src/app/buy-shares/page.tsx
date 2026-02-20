"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { useUserData } from "@/hooks/useUserData";
import { useDirector } from "@/components/Director";
import { requestSharePurchase } from "@/lib/firebase/shareService";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import LoadingScreen from "@/components/LoadingScreen";
import {
  ArrowLeft,
  Smartphone,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Zap,
  ChevronRight,
  PhoneCall,
  Clock,
} from "react-feather";
import { useVariablesData } from "@/hooks/useVariablesData";
import { checkPending } from "@/lib/firebase/checkPending";
import { Withdrawal } from "@/types";

export default function BuySharesPage() {
  const { user } = useAuth();
  const {
    share,
    phone,
    phoneAccountName: existingAccountName,
    loading: userLoading,
  } = useUserData();
  const { prompt, notify } = useDirector();

  const [percentage, setPercentage] = useState("");
  const [accountName, setAccountName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewState, setViewState] = useState<"idle" | "pay" | "success">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  // Local state to track if account name is set in DB or just entered
  const [hasAccountName, setHasAccountName] = useState(false);
  const { number, numberName, PPP } = useVariablesData();

  const [pendingList, setPendingList] = useState<Withdrawal[]>([]);

  useEffect(() => {
    if (existingAccountName) {
      setAccountName(existingAccountName);
      setHasAccountName(true);
    }
  }, [existingAccountName]);

  useEffect(() => {
    const getList = async () => {
      const list = await checkPending(user?.uid || "", false);
      console.log(list);
      setPendingList(list);
    };
    getList();
  }, [user?.uid]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "-";
    if (timestamp.toDate) return timestamp.toDate().toLocaleString();
    if (timestamp.seconds)
      return new Date(timestamp.seconds * 1000).toLocaleString();
    return new Date(timestamp).toLocaleString();
  };

  const calculateAmount = () => {
    const p = parseFloat(percentage);
    return isNaN(p) ? 0 : p * PPP;
  };

  const handleSetAccountName = async () => {
    if (!accountName.trim() || !user) return;
    setIsSubmitting(true);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        phoneAccountName: accountName,
      });
      setHasAccountName(true);
      notify("Account name saved successfully.", true);
    } catch (e) {
      console.error(e);
      setErrorMessage("Failed to save account name.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProceed = () => {
    const p = parseFloat(percentage);
    if (isNaN(p) || p <= 0) {
      setErrorMessage("Please enter a valid percentage.");
      return;
    }
    if (share + p > 50) {
      setErrorMessage(`You can only buy up to ${50 - share}% more shares.`);
      return;
    }
    setViewState("pay");
    setErrorMessage("");
  };

  const handleConfirmPurchase = async () => {
    if (!user || isSubmitting) return;

    const confirmed = await prompt({
      title: "Confirm Payment",
      subtitle: `Have you sent ${calculateAmount()} FCFA to ${number} (${numberName}) from your account registered as "${accountName}"?`,
      okText: "Yes, I have Sent",
    });

    if (!confirmed) return;

    setIsSubmitting(true);
    try {
      const p = parseFloat(percentage);
      const fcfaAmount = p * PPP;
      // Correct signature: userId, phoneAccountName, phoneNumber, percentage, amount
      await requestSharePurchase(
        user.uid,
        accountName,
        phone || "",
        p,
        fcfaAmount,
      );
      setViewState("success");
    } catch (e) {
      console.error(e);
      notify("Failed to record request. Please contact admin.", false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (userLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans p-4 md:p-8">
      <div className="max-w-lg mx-auto">
        <header className="mb-10 flex items-center gap-4">
          <Link
            href="/"
            className="p-3 bg-slate-900 rounded-xl hover:bg-slate-800 transition-all border border-slate-800 active:scale-95"
          >
            <ArrowLeft size={20} className="text-gray-400" />
          </Link>
          <h1 className="text-2xl font-bold">Buy More Shares</h1>
        </header>

        {pendingList.length > 0 ? (
          <div>
            {pendingList.map((p) => (
              <>
                <div className="bg-linear-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-2xl mb-6 shadow-lg">
                  <p className="text-2xl font-black text-red-600">
                    Pending Purchase.
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
          <>
            {" "}
            {viewState === "success" ? (
              <div className="bg-slate-900 border border-yellow-400/20 p-8 rounded-3xl text-center shadow-2xl animate-in zoom-in duration-300">
                <div className="w-16 h-16 bg-yellow-400/10 text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Request Submitted
                </h2>
                <p className="text-gray-400 mb-8">
                  Your request for{" "}
                  <span className="text-white font-bold">+{percentage}%</span>{" "}
                  has been received. Once confirmed, your new share of{" "}
                  <span className="text-yellow-400 font-bold">
                    {share + parseFloat(percentage)}%
                  </span>{" "}
                  will be activated.
                </p>
                <Link
                  href="/"
                  className="block w-full py-4 bg-yellow-400 text-black font-bold rounded-2xl hover:bg-yellow-300 transition-colors"
                >
                  Back to Dashboard
                </Link>
              </div>
            ) : (
              <>
                {/* Visual Progress / Current Status */}
                <div className="bg-linear-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-3xl mb-8 shadow-lg flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">
                      Current Ownership
                    </p>
                    <p className="text-4xl font-black text-white">{share}%</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-400/10 rounded-2xl flex items-center justify-center text-yellow-400">
                    <TrendingUp size={24} />
                  </div>
                </div>

                {!hasAccountName ? (
                  /* Step 0: Set MOMO Name */
                  <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400">
                        <Smartphone size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg leading-tight">
                          MOMO Account Setup
                        </h3>
                        <p className="text-sm text-gray-400">
                          We need your account name for verification.
                        </p>
                      </div>
                    </div>

                    <div className="mb-8">
                      <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3 px-1">
                        Account Name (MOMO/OM)
                      </label>
                      <input
                        type="text"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        placeholder="Exactly as seen on your ID"
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-yellow-400 transition-all placeholder:text-gray-700"
                      />
                      <p className="text-[10px] text-gray-500 mt-3 px-1 flex items-start gap-2">
                        <AlertCircle size={14} className="shrink-0 mt-0.5" />
                        This name must match the account sending the funds.
                      </p>
                    </div>

                    {errorMessage && (
                      <div className="p-4 bg-red-400/10 border border-red-400/20 rounded-2xl text-red-400 text-xs mb-8 flex items-center gap-3">
                        <AlertCircle size={18} /> {errorMessage}
                      </div>
                    )}

                    <button
                      onClick={handleSetAccountName}
                      disabled={!accountName.trim() || isSubmitting}
                      className="w-full py-5 bg-yellow-400 text-black font-black rounded-2xl hover:bg-yellow-300 disabled:opacity-30 disabled:grayscale transition-all active:scale-95 shadow-lg shadow-yellow-400/10"
                    >
                      {isSubmitting ? "Saving..." : "Save & Continue"}
                    </button>
                  </div>
                ) : viewState === "idle" ? (
                  /* Step 1: Input Amount */
                  <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl">
                    <div className="mb-8 text-center">
                      <div className="inline-block p-4 bg-yellow-400/10 rounded-2xl text-yellow-500 mb-4">
                        <Zap size={32} />
                      </div>
                      <h2 className="text-xl font-black mb-1">Buy Shares</h2>
                      <p className="text-sm text-gray-500 font-medium tracking-tight">
                        Price: 1% ={" "}
                        <span className="text-white font-bold">{PPP} FCFA</span>
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="block text-xs font-black text-gray-500 uppercase tracking-widest px-1">
                          Amount to Purchase (%)
                        </label>
                        <div className="relative group">
                          <input
                            type="number"
                            min="0"
                            max={50 - share}
                            value={percentage}
                            onChange={(e) => {
                              const val = e.target.value;
                              const numVal = parseFloat(val);
                              const maxAllowed = 50 - share;

                              // If the user types a number higher than max, clamp it to the max
                              if (!isNaN(numVal) && numVal > maxAllowed) {
                                setPercentage(maxAllowed.toString());
                              } else {
                                setPercentage(val);
                              }
                              setErrorMessage("");
                            }}
                            placeholder="0"
                            className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl px-6 py-5 text-3xl font-black text-white focus:outline-none focus:border-yellow-400 transition-all placeholder:text-slate-900 no-spinner"
                          />
                          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-700 font-black text-2xl tracking-tighter">
                            %
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-600 px-1">
                          Max additional shares allowed:{" "}
                          <span className="text-yellow-500/80 font-bold">
                            {50 - share}%
                          </span>
                        </p>
                      </div>

                      <div className="flex justify-between items-center bg-slate-950/50 border border-slate-800 p-6 rounded-2xl">
                        <span className="text-xs font-black text-gray-500 uppercase tracking-widest">
                          Total Cost
                        </span>
                        <div className="text-right">
                          <span className="text-2xl font-black text-yellow-400">
                            {calculateAmount().toLocaleString()}
                          </span>
                          <span className="ml-2 text-xs font-bold text-gray-600 uppercase">
                            FCFA
                          </span>
                        </div>
                      </div>

                      {errorMessage && (
                        <div className="p-4 bg-red-400/10 border border-red-400/20 rounded-2xl text-red-400 text-xs flex items-center gap-2">
                          <AlertCircle size={16} className="shrink-0" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      <button
                        onClick={handleProceed}
                        disabled={
                          !percentage ||
                          parseFloat(percentage) <= 0 ||
                          share + parseFloat(percentage) > 50
                        }
                        className="w-full py-5 bg-yellow-400 text-black font-black rounded-2xl hover:bg-yellow-300 transition-all active:scale-95 shadow-lg shadow-yellow-400/10 flex items-center justify-center gap-3 disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed"
                      >
                        <span>Proceed to Payment</span>
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Step 2: Pay */
                  <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl animate-in slide-in-from-right-10 duration-300">
                    <div className="mb-8">
                      <button
                        onClick={() => setViewState("idle")}
                        className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-1"
                      >
                        <ArrowLeft size={14} /> Back
                      </button>
                    </div>

                    <h2 className="text-xl font-black mb-6">
                      Finalize Payment
                    </h2>

                    <div className="p-8 bg-slate-950 border-2 border-yellow-400/20 rounded-4xl mb-8 relative overflow-hidden">
                      <div className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-400/5 blur-2xl"></div>

                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mb-4">
                        You are sending
                      </p>
                      <p className="text-4xl font-black text-white mb-8">
                        {calculateAmount().toLocaleString()}{" "}
                        <span className="text-lg opacity-40">FCFA</span>
                      </p>

                      <div className="space-y-4 pt-6 border-t border-slate-900">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                            Recipient Number:
                          </span>
                          <span className="text-white font-bold">{number}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                            Recipient Name:
                          </span>
                          <span className="text-white font-bold">
                            {numberName}
                          </span>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-slate-900">
                        <p className="text-[11px] text-gray-500 mb-4 font-medium italic text-center">
                          Use the button below to dial the payment code
                          automatically:
                        </p>
                        <a
                          href={`tel:*126*9*${number}*${calculateAmount()}%23`}
                          className="w-full py-4 bg-blue-500/10 text-blue-400 font-bold rounded-2xl border border-blue-500/20 hover:bg-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                          <PhoneCall size={18} />
                          <span>Dial *126# Code</span>
                        </a>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <p className="text-xs text-center text-gray-500 px-4 leading-relaxed">
                        After dialing and completing the transfer, click the
                        button below to record your request.
                      </p>
                      <button
                        onClick={handleConfirmPurchase}
                        disabled={isSubmitting}
                        className="w-full py-5 bg-yellow-400 text-black font-black rounded-2xl hover:bg-yellow-300 transition-all active:scale-95 shadow-xl shadow-yellow-400/20 flex items-center justify-center gap-3"
                      >
                        <CheckCircle size={20} />
                        <span>I have sent the money</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
      <style jsx>{`
        .no-spinner::-webkit-inner-spin-button,
        .no-spinner::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
