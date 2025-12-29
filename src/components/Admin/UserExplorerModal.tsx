'use client';

import React from 'react';
import { X, User, DollarSign, Trash2 } from 'react-feather';
import { UserData } from '@/hooks/useAdminData';
import UserExplorer from './UserExplorer';

interface UserExplorerModalProps {
  isOpen: boolean;
  user: UserData | null;
  onClose: () => void;
  onInvest: (user: UserData) => void;
  onDelete: (user: UserData) => void;
}

const UserExplorerModal: React.FC<UserExplorerModalProps> = ({ isOpen, user, onClose, onInvest, onDelete }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div 
        className="relative w-full max-w-2xl bg-slate-800/70 border border-slate-700 rounded-2xl shadow-xl backdrop-blur-xl flex flex-col"
        style={{ maxHeight: '90vh' }}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-4 sm:p-5 border-b border-slate-700">
            <div className="flex items-center gap-4">
                <User size={20} className="text-white" />
                <h2 className="text-lg font-bold text-white">User Explorer</h2>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors">
                <X size={20} />
            </button>
        </div>

        {/* Body */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6">
          <p className="text-sm text-slate-400 mb-4">You are viewing the details for the user below. You can recursively explore users they invited and who they were invited by.</p>
          <UserExplorer userId={user.uid} />
        </div>

        {/* Footer with Actions */}
        <div className="flex-shrink-0 flex justify-between items-center gap-4 p-4 sm:p-5 border-t border-slate-700">
          <p className='text-xs text-slate-500'>Actions for <span className='font-bold text-white'>{user.name}</span></p>
        </div>
      </div>
    </div>
  );
};

export default UserExplorerModal;
