'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'react-feather';
import { UserData } from '@/hooks/useAdminData';

interface EditUserModalProps {
  isOpen: boolean;
  user: UserData | null;
  onClose: () => void;
  onSave: (user: UserData) => void;
}

const inputStyle = "w-full p-3 bg-slate-900/80 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all";

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, user, onClose, onSave }) => {
  const [balance, setBalance] = useState(0);
  const [share, setShare] = useState(0);

  useEffect(() => {
    if (user) {
      setBalance(user.balance || 0);
      setShare(user.share || 0);
    }
  }, [user]);

  if (!isOpen || !user) {
    return null;
  }

  const handleSave = () => {
    onSave({
      ...user,
      balance,
      share,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-start justify-center pt-10 sm:items-center sm:pt-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-slate-800/70 border border-slate-700 rounded-2xl shadow-xl backdrop-blur-xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Edit: {user.name}</h2>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Balance (FCFA)</label>
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value))}
              className={inputStyle}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Share (%)</label>
            <input
              type="number"
              value={share}
              onChange={(e) => setShare(Number(e.target.value))}
              className={inputStyle}
            />
          </div>
        </div>
        <div className="flex justify-end items-center gap-4 p-6 border-t border-slate-700">
          <button onClick={onClose} className="py-2 px-5 text-sm font-semibold text-slate-300 hover:text-white bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors">Cancel</button>
          <button onClick={handleSave} className="py-2 px-5 text-sm font-bold text-black bg-yellow-400 hover:bg-yellow-300 rounded-lg transition-colors">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
