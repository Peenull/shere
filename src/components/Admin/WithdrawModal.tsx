'use client';

import React, { useState, useEffect } from 'react';
import { X, DollarSign } from 'react-feather';
import { UserData } from '@/hooks/useAdminData';

interface WithdrawModalProps {
  isOpen: boolean;
  user: UserData | null;
  onClose: () => void;
  onConfirm: (userId: string, amount: number) => void;
  isLoading: boolean;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ isOpen, user, onClose, onConfirm, isLoading }) => {
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setAmount('');
    }
  }, [isOpen]);

  if (!isOpen || !user) return null;

  const handleConfirm = () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    onConfirm(user.uid, parsedAmount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-slate-800/70 border border-slate-700 rounded-2xl shadow-xl backdrop-blur-xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Withdraw from Balance</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <p className="text-sm text-slate-400">User: <span className="font-bold text-white">{user.name}</span></p>
            <p className="text-sm text-slate-400">Current Balance: <span className="font-bold text-yellow-400">{(user.balance || 0).toLocaleString()} FCFA</span></p>
          </div>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount to withdraw"
              className="w-full p-3 pl-10 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>
        <div className="flex justify-end items-center gap-4 p-4 border-t border-slate-700">
          <button onClick={onClose} className="py-2 px-4 text-sm font-semibold text-white bg-slate-600/80 hover:bg-slate-600 rounded-lg transition-colors">
            Cancel
          </button>
          <button 
            onClick={handleConfirm}
            disabled={isLoading}
            className="flex items-center gap-2 py-2 px-4 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Confirm Withdrawal'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
