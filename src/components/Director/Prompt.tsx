'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'react-feather';

// Define the props based on Director/index.tsx
interface PromptProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (value?: string) => void;
  onCancel: () => void;
  message?: string;
  type?: 'confirm' | 'input';
  inputLabel?: string;
  inputPlaceholder?: string;
  okText?: string;
  cancelText?: string;
  minLength?: number;
  maxLength?: number;
}

const Prompt: React.FC<PromptProps> = ({
  open,
  onClose,
  onConfirm,
  onCancel,
  message = "Are you sure?",
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-slate-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl w-full max-w-sm p-6 relative" 
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
          <X size={20} />
        </button>

        <h3 className="text-lg font-bold text-white mb-4">{message}</h3>

        {type === 'input' && (
          <div className="my-4">
            {inputLabel && <label className="text-sm font-medium text-gray-400 mb-2 block">{inputLabel}</label>}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={inputPlaceholder}
              minLength={minLength}
              maxLength={maxLength}
              className="bg-slate-800/50 border border-gray-700 text-gray-100 placeholder-gray-500 text-sm rounded-lg focus:ring-yellow-400 focus:border-yellow-400 block w-full p-3 transition-all duration-200"
              autoFocus
            />
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-gray-300 hover:bg-slate-800 transition-colors font-semibold text-sm"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-300 transition-colors font-bold text-sm"
          >
            {okText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
