'use client';

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-medium text-gray-300">
        {label}
      </label>
      <input
        {...props}
        className={`bg-gray-900/50 border border-gray-700 text-gray-100 placeholder-gray-500 text-sm rounded-lg focus:ring-yellow-400 focus:border-yellow-400 block w-full p-2.5 hover:bg-gray-900/70 transition-all duration-200 ${props.className}`}
      />
    </div>
  );
}
