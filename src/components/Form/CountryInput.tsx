"use client";

import React from "react";

interface Country {
  name: string;
  code: string;
}

const countries: Country[] = [
  { name: "Cameroon", code: "CM" },
  { name: "Nigeria", code: "NG" },
  { name: "Ghana", code: "GH" },
  { name: "United States", code: "US" },
  { name: "United Kingdom", code: "GB" },
  // Add more countries as needed
];

interface CountryInputProps {
  label: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

const CountryInput: React.FC<CountryInputProps> = ({
  label,
  className,
  value,
  onChange,
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-400 mb-2">
        {label}
      </label>
      <select
        className={`w-full p-4 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          Select a country
        </option>
        {countries.map((country) => (
          <option key={country.code} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryInput;
