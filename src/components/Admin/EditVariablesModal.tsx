"use client";

import React, { useEffect, useState } from "react";
import { X } from "react-feather";

interface EditVariablesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: any) => void;
  isLoading: boolean;
  variables: { number: string; numberName: string; PPP: number };
}

const inputStyle =
  "w-full p-3 bg-slate-900/80 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all placeholder:text-slate-500";

const EditVariablesModal: React.FC<EditVariablesModalProps> = ({
  isOpen,
  onClose,
  onSave,
  isLoading,
  variables: variables,
}) => {
  const [formData, setFormData] = useState({
    PPP: 200,
    number: "683583297",
    numberName: "RIVANO DESTIN NGUEFACK",
  });

  useEffect(() => {
    setFormData(() => variables);
  }, [variables]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-start justify-center pt-10 sm:items-center sm:pt-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-2xl bg-slate-800/70 border border-slate-700 rounded-2xl shadow-xl backdrop-blur-xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Edit Variables</h2>
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
                MOMO / OM Name
              </label>
              <input
                type="text"
                name="numberName"
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="John Doe"
                value={formData.numberName}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">
                Phone Number
              </label>
              <input
                type="text"
                name="number"
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="+237677777777"
                value={formData.number}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">
                Price Per Persentage (PPP)
              </label>
              <input
                type="number"
                name="PPP"
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="200"
                value={formData.PPP}
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

export default EditVariablesModal;
