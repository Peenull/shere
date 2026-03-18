"use client";

import React, { useState } from "react";
import { X } from "react-feather";

interface MessageUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSend: (formData: any) => void;
  isLoading: boolean;
}

const inputStyle =
  "w-full p-3 bg-slate-900/80 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all placeholder:text-slate-500";

const MessageUserModal: React.FC<MessageUserModalProps> = ({
  isOpen,
  onClose,
  onSend,
  isLoading,
}) => {
  const [text, setText] = useState("");
  const [good, setGood] = useState<boolean>(true);
  const [transaction, setTransaction] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend({
      message: {
        text,
        good,
        transaction,
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-start justify-center pt-10 sm:items-center sm:pt-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-2xl bg-slate-800/70 border border-slate-700 rounded-2xl shadow-xl backdrop-blur-xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Send Message.</h2>
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
              <label className="text-sm font-medium text-slate-300">Text</label>
              <input
                value={text}
                type="text"
                name="text"
                onChange={(e) => setText(e.target.value)}
                className={inputStyle}
                placeholder="Hello User."
              />
            </div>
            <div className="flex w-full gap-6">
              <button
                type="button"
                onClick={() => {
                  setGood(!good);
                }}
                className={`flex items-center gap-2 py-2 px-4 text-sm font-semibold text-white ${good ? "bg-green-600/80" : "bg-red-600/80"} rounded-lg transition-colors w-full`}
              >
                <span>{good ? "GOOD" : "BAD"}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setTransaction(!transaction);
                }}
                className="flex items-center gap-2 py-2 px-4 text-sm font-semibold text-white bg-green-600/80 hover:bg-green-600 rounded-lg transition-colors w-full"
              >
                <span>{transaction ? "Trasaction" : "No Trasaction"}</span>
              </button>
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
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageUserModal;
