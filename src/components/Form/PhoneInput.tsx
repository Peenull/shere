'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { COUNTRIES, Country } from './countries';

function stripToDigits(str: string): string {
  return str.replace(/\D/g, '');
}

function findCountry(dialCode: string): Country | undefined {
  if (!dialCode) return undefined;
  return COUNTRIES.find((c) => c.dialCode === dialCode);
}

function findCountryByPhone(phone: string): Country {
  const digits = stripToDigits(phone);
  if (!digits) return COUNTRIES[0];

  let bestMatch = COUNTRIES[0];
  for (const country of COUNTRIES) {
    if (digits.startsWith(country.dialCode)) {
      if (country.dialCode.length > bestMatch.dialCode.length) {
        bestMatch = country;
      }
    }
  }
  return bestMatch;
}

interface PhoneInputProps {
  label: string;
  value?: string;
  onChange?: (phone: string, country: string, currency: string) => void;
  className?: string;
  required?: boolean;
}

export default function PhoneInput({
  label,
  value = '',
  onChange,
  className,
  required,
}: PhoneInputProps) {
  const [country, setCountry] = useState<Country>(() => findCountryByPhone(value));
  const [local, setLocal] = useState<string>(() =>
    value ? stripToDigits(value).substring(country.dialCode.length) : ''
  );
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCountry = useMemo(() => findCountry(country.dialCode) || COUNTRIES[0], [country]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleCountrySelect(newCountry: Country) {
    setCountry(newCountry);
    setDropdownOpen(false);
    emitChange(local, newCountry);
  }

  function handleLocalChange(e: React.ChangeEvent<HTMLInputElement>) {
    const nextLocal = stripToDigits(e.target.value);
    setLocal(nextLocal);
    emitChange(nextLocal, country);
  }

  function emitChange(nextLocal: string, nextCountry = country) {
    const cleaned = stripToDigits(nextLocal);
    const finalPhone = cleaned ? `+${nextCountry.dialCode}${cleaned}` : '';
    const finalCountryName = nextCountry.name;
    const finalCurrency = nextCountry.currency;

    if (nextCountry.expectedLength != null) {
      if (cleaned.length === 0) {
        setError(null);
      } else if (cleaned.length !== nextCountry.expectedLength) {
        setError(`Phone must be ${nextCountry.expectedLength} digits`);
      } else {
        setError(null);
      }
    }

    onChange?.(finalPhone, finalCountryName, finalCurrency);
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-400 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="flex items-center">
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            className={`${className} flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 rounded-l-lg`}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>{selectedCountry.emoji}</span>
          </button>
          {dropdownOpen && (
            <div className="absolute z-20 w-64 bg-slate-800 rounded-lg shadow-lg max-h-60 overflow-y-auto mt-2">
              {COUNTRIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  className="w-full flex items-center justify-between px-4 py-2 hover:bg-slate-700 text-left"
                  onClick={() => handleCountrySelect(c)}
                >
                  <span>
                    {c.emoji} {c.name}
                  </span>
                  <span className="text-gray-400">+{c.dialCode}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            +{country.dialCode}
          </div>
          <input
            type="tel"
            value={local}
            onChange={handleLocalChange}
            placeholder={selectedCountry.placeholder || ''}
            className={`${className} rounded-l-none rounded-r-lg pl-14`}
            autoComplete='tel'
          />
        </div>
      </div>
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}
