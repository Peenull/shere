'use client';

import React, { useState } from 'react';
import { X } from 'react-feather';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: any) => void;
  isLoading: boolean;
}

const inputStyle = "w-full p-3 bg-slate-900/80 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all placeholder:text-slate-500";

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onSave, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    currency: '',
    language: '',
    referredBy: '',
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-start justify-center pt-10 sm:items-center sm:pt-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-slate-800/70 border border-slate-700 rounded-2xl shadow-xl backdrop-blur-xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Add New User</h2>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div className="flex flex-col gap-2"><label className="text-sm font-medium text-slate-300">Full Name</label><input type="text" name="name" onChange={handleInputChange} className={inputStyle} placeholder="John Doe" /></div>
            <div className="flex flex-col gap-2"><label className="text-sm font-medium text-slate-300">Email Address</label><input type="email" name="email" onChange={handleInputChange} className={inputStyle} placeholder="user@example.com" /></div>
            <div className="flex flex-col gap-2"><label className="text-sm font-medium text-slate-300">Password</label><input type="password" name="password" onChange={handleInputChange} className={inputStyle} placeholder="••••••••" /></div>
            <div className="flex flex-col gap-2"><label className="text-sm font-medium text-slate-300">Phone Number</label><input type="text" name="phone" onChange={handleInputChange} className={inputStyle} placeholder="+1234567890" /></div>
            <div className="flex flex-col gap-2"><label className="text-sm font-medium text-slate-300">Country</label><input type="text" name="country" onChange={handleInputChange} className={inputStyle} placeholder="e.g., USA" /></div>
            <div className="flex flex-col gap-2"><label className="text-sm font-medium text-slate-300">Currency</label><input type="text" name="currency" onChange={handleInputChange} className={inputStyle} placeholder="e.g., USD" /></div>
            <div className="flex flex-col gap-2"><label className="text-sm font-medium text-slate-300">Language</label><input type="text" name="language" onChange={handleInputChange} className={inputStyle} placeholder="e.g., en-US" /></div>
            <div className="flex flex-col gap-2"><label className="text-sm font-medium text-slate-300">Referred By (UID)</label><input type="text" name="referredBy" onChange={handleInputChange} className={inputStyle} placeholder="Optional" /></div>
          </div>
          <div className="flex justify-end items-center gap-4 p-6 border-t border-slate-700">
            <button type="button" onClick={onClose} className="py-2 px-5 text-sm font-semibold text-slate-300 hover:text-white bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors">Cancel</button>
            <button type="submit" disabled={isLoading} className="py-2 px-5 text-sm font-bold text-black bg-yellow-400 hover:bg-yellow-300 rounded-lg transition-colors">
              {isLoading ? 'Creating User...' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
