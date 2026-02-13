'use client';

import React, { useState, useEffect } from 'react';
import { X, AlertTriangle } from 'react-feather';
import { UserData } from '@/hooks/useAdminData';

interface DeleteUserModalProps {
  isOpen: boolean;
  user: UserData | null;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ isOpen, user, onClose, onConfirm, isLoading }) => {
  const [confirmationName, setConfirmationName] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setConfirmationName('');
    }
  }, [isOpen]);

  if (!isOpen || !user) return null;

  const isNameConfirmed = confirmationName === user.name;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-start justify-center pt-10 sm:items-center sm:pt-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-slate-800/70 border border-slate-700 rounded-2xl shadow-xl backdrop-blur-xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white flex items-center gap-2"><AlertTriangle className='text-red-500'/> Confirm Deletion</h2>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
            <p className='text-slate-300'>To confirm, please type the user's full name below:</p>
            <div className='my-4 p-4 bg-slate-900/80 rounded-lg text-center'>
                <p className='font-bold text-white text-lg'>{user.name}</p>
                <p className='text-sm text-slate-400'>{user.uid}</p>
            </div>
            <input 
                type="text"
                value={confirmationName}
                onChange={(e) => setConfirmationName(e.target.value)}
                placeholder="Enter the full name to confirm"
                className="w-full p-3 bg-slate-900/80 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
            />
            <p className='mt-4 text-xs text-red-400 text-center'>This action is permanent and cannot be undone.</p>
        </div>
        <div className="flex justify-end items-center gap-4 p-6 border-t border-slate-700">
            <button type="button" onClick={onClose} className="py-2 px-5 text-sm font-semibold text-slate-300 hover:text-white bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors">Cancel</button>
            <button 
                type="button" 
                onClick={onConfirm} 
                disabled={isLoading || !isNameConfirmed}
                className="py-2 px-5 text-sm font-bold text-white bg-red-600 rounded-lg transition-colors disabled:bg-red-900/50 disabled:text-slate-400 disabled:cursor-not-allowed hover:bg-red-500"
            >
              {isLoading ? 'Deleting...' : 'Delete User'}
            </button>
          </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
