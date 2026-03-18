"use client";

import { UserData } from "@/hooks/useAdminData";
import React, { useState } from "react";
import { X } from "react-feather";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (formData: any) => void;
  isLoading: boolean;
  user: UserData;
}

const inputStyle =
  "w-full p-3 bg-slate-900/80 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all placeholder:text-slate-500";

const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  isOpen,
  onClose,
  onUpdate,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    country: user.country,
    referredBy: user.referredBy,
    balance: user.balance,
    invested: user.invested,
    share: user.share,
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type == "number") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-start justify-center pt-10 sm:items-center sm:pt-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-2xl bg-slate-800/70 border border-slate-700 rounded-2xl shadow-xl backdrop-blur-xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Add New User</h2>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">
                Full Name
              </label>
              <input
                value={formData.name}
                type="text"
                name="name"
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">
                Email Address
              </label>
              <input
                value={formData.email}
                type="email"
                name="email"
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="user@example.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">
                Phone Number
              </label>
              <input
                value={formData.phone}
                type="text"
                name="phone"
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="+1234567890"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">
                Balance
              </label>
              <input
                value={formData.balance}
                type="number"
                name="balance"
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="e.g., 1000"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">
                Invested
              </label>
              <input
                value={formData.invested}
                type="number"
                name="invested"
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="e.g., 1000"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">
                Shares
              </label>
              <input
                value={formData.share}
                type="number"
                name="share"
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="e.g., 50"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">
                Country
              </label>
              <input
                value={formData.country}
                type="text"
                name="country"
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="e.g., USA"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">
                Referred By (UID)
              </label>
              <input
                value={formData.referredBy}
                type="text"
                name="referredBy"
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="Optional"
              />
            </div>
          </div>
          <div className="flex justify-end items-center gap-4 p-6 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-5 text-sm font-semibold text-slate-300 hover:text-white bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="py-2 px-5 text-sm font-bold text-black bg-yellow-400 hover:bg-yellow-300 rounded-lg transition-colors"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
