'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { X } from 'react-feather';

// Define the props based on Director/index.tsx
interface NewPromptProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (value?: string) => void;
  onCancel: () => void;
  title?: string;
  subtitle?: string | ReactNode;
  type?: 'confirm' | 'input';
  inputLabel?: string;
  inputPlaceholder?: string;
  okText?: string;
  cancelText?: string;
  minLength?: number;
  maxLength?: number;
}

const NewPrompt: React.FC<NewPromptProps> = ({
  open,
  onClose,
  onConfirm,
  onCancel,
  title = "Are you sure?",
  subtitle,
  type = 'confirm',
  inputLabel,
  inputPlaceholder,
  okText = 'OK',
  cancelText = 'Cancel',
  minLength,
  maxLength,
}) => {
  const [inputValue, setInputValue] = useState('');

  // Reset input value when the prompt is opened
  useEffect(() => {
    if (open) {
      setInputValue('');
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const handleConfirm = () => {
    if (type === 'input') {
      onConfirm(inputValue);
    } else {
      onConfirm();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          {subtitle && <div className="text-gray-400 mb-6 text-base">{subtitle}</div>}
        </div>

        {type === 'input' && (
          <div className="my-6">
            {inputLabel && <label className="text-sm font-semibold text-gray-300 mb-2 block text-left">{inputLabel}</label>}
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={inputPlaceholder}
              minLength={minLength}
              maxLength={maxLength}
              className="bg-slate-800 border-2 border-slate-700 text-white placeholder-gray-500 text-lg rounded-xl focus:ring-yellow-400 focus:border-yellow-400 block w-full p-4 transition-all duration-200 shadow-inner"
              autoFocus
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mt-8">
          <button
            onClick={onCancel}
            className="px-5 py-3 rounded-xl text-white hover:bg-slate-800 transition-colors font-bold text-base shadow-md"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className="px-5 py-3 rounded-xl bg-yellow-400 text-black hover:bg-yellow-300 transition-colors font-bold text-base shadow-lg shadow-yellow-400/20"
          >
            {okText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPrompt;
