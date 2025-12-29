'use client';

import React, { useState, useEffect } from 'react';
import { UserData } from '@/hooks/useAdminData';
import { X, DollarSign } from 'react-feather';

const SHARE_COST = 200; // 1% share costs 200 FCFA
const MAX_SHARE = 50; // Max share percentage is 50%

interface ProcessInvestmentModalProps {
  isOpen: boolean;
  user: UserData | null;
  onClose: () => void;
  onSave: (userId: string, investmentAmount: number) => void;
  isLoading: boolean;
}

export default function ProcessInvestmentModal({ isOpen, user, onClose, onSave, isLoading }: ProcessInvestmentModalProps) {
  const [amount, setAmount] = useState('');
  const [calculatedShare, setCalculatedShare] = useState(0);
  const [error, setError] = useState('');


  useEffect(() => {
    if (!user) return;
    const numericAmount = Number(amount);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      const newShare = numericAmount / SHARE_COST;
      const totalShare = (user.share || 0) + newShare;
      setCalculatedShare(newShare);
      if (totalShare > MAX_SHARE) {
        setError(`This investment would exceed the max share of ${MAX_SHARE}%.`);
      } else {
        setError('');
      }
    } else {
      setCalculatedShare(0);
      setError('');
    }
  }, [amount, user]);

  useEffect(() => {
    // Reset form when modal opens
    if (isOpen) {
      setAmount('');
      setCalculatedShare(0);
      setError('');
    }
  }, [isOpen]);

  const handleSave = () => {
    if (!user || error || !amount) return;
    onSave(user.uid, Number(amount));
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-5 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
            <DollarSign size={20} className="text-yellow-400"/> 
            Process Investment
          </h2>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-slate-800 transition-colors">
            <X size={22} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <p className="font-bold text-white text-lg">{user.name}</p>
            <p className="text-sm text-gray-400">Current Share: <span className="font-bold text-yellow-400">{user.share || 0}%</span></p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="investment-amount" className="text-sm font-bold text-gray-300">Investment Amount (FCFA)</label>
            <div className="relative">
              <input
                id="investment-amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g., 10000"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">FCFA</span>
            </div>
          </div>

          {calculatedShare > 0 && (
            <div className="bg-slate-800/50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">This investment will add:</p>
              <p className="text-2xl font-bold text-green-400">+{calculatedShare.toFixed(2)}%</p>
              <p className="text-sm text-gray-400">New Total Share: <span className="font-bold text-yellow-400">{(user.share || 0) + calculatedShare}%</span></p>
            </div>
          )}

          {error && (
            <p className="text-sm text-red-500 text-center font-semibold">{error}</p>
          )}
        </div>

        <div className="p-5 border-t border-slate-800 flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="py-2 px-4 rounded-lg text-white bg-slate-700 hover:bg-slate-600 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            disabled={isLoading || !!error || !amount}
            className="py-2 px-5 rounded-lg text-black bg-yellow-400 hover:bg-yellow-300 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors font-bold"
          >
            {isLoading ? 'Processing...' : 'Confirm & Commit'}
          </button>
        </div>
      </div>
    </div>
  );
}
