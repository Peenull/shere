"use client";

import React, { useEffect, useState } from "react";

type Country = {
  code: string;
  name: string;
  dialCode: string;
  expectedLength?: number;
};

// expectedLength = national significant number length (digits after country code)
const COUNTRIES: Country[] = [
  { code: "US", name: "United States", dialCode: "1", expectedLength: 10 },
  { code: "GB", name: "United Kingdom", dialCode: "44", expectedLength: 10 },
  { code: "CA", name: "Canada", dialCode: "1", expectedLength: 10 },
  { code: "DE", name: "Germany", dialCode: "49", expectedLength: 10 },
  { code: "FR", name: "France", dialCode: "33", expectedLength: 9 },
  { code: "NG", name: "Nigeria", dialCode: "234", expectedLength: 10 },
];

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  required?: boolean;
  placeholder?: string;
};

function stripToDigits(s = "") {
  return s.replace(/\D+/g, "");
}

export default function PhoneInput({
  value,
  onChange,
  label,
  required,
  placeholder,
}: Props) {
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [local, setLocal] = useState("");
  const [error, setError] = useState<string | null>(null);

  function limitToExpected(digits: string, c: Country) {
    if (c.expectedLength == null) return digits;
    return digits.slice(0, c.expectedLength);
  }

  function validateLocal(cleaned: string, c: Country) {
    if (c.expectedLength == null) {
      setError(null);
      return;
    }
    if (cleaned.length === 0) {
      setError(null);
    } else if (cleaned.length !== c.expectedLength) {
      setError(`Phone must be ${c.expectedLength} digits`);
    } else {
      setError(null);
    }
  }

  useEffect(() => {
    if (!value) {
      setLocal("");
      setError(null);
      return;
    }
    // try to parse +{dial}{rest}
    const digits = stripToDigits(value);
    // find best matching country by dialCode prefix
    const match = COUNTRIES.slice()
      .sort((a, b) => b.dialCode.length - a.dialCode.length)
      .find((c) => digits.startsWith(c.dialCode));
    if (match) {
      const localDigits = digits.slice(match.dialCode.length);
      const limited = limitToExpected(localDigits, match);
      setCountry(match);
      setLocal(limited);
      validateLocal(limited, match);
    } else {
      setLocal(digits);
      setError(null);
    }
  }, [value]);

  function emitChange(nextLocal: string, nextCountry = country) {
    const cleaned = stripToDigits(nextLocal);
    const final = cleaned ? `+${nextCountry.dialCode}${cleaned}` : "";
    // validate exact length when expectedLength is known
    if (nextCountry.expectedLength != null) {
      if (cleaned.length === 0) {
        setError(null);
      } else if (cleaned.length !== nextCountry.expectedLength) {
        setError(`Phone must be ${nextCountry.expectedLength} digits`);
      } else {
        setError(null);
      }
    }

    onChange?.(final);
  }

  return (
    <div className="flex flex-col gap-1">
      {label ? (
        <label className="font-semibold text-sm text-gray-200">
          {label} {required ? <span className="text-red-400">*</span> : null}
        </label>
      ) : null}
      <div className="flex gap-2">
        <select
          value={country.code}
          onChange={(e) => {
            const next =
              COUNTRIES.find((c) => c.code === e.target.value) ?? COUNTRIES[0];
            // when switching country, trim/limit local to the new expected length
            const limited = limitToExpected(local, next);
            setCountry(next);
            setLocal(limited);
            emitChange(limited, next);
          }}
          className="px-3 py-2 rounded-md border border-[#334155] bg-[#0b1220] text-gray-100 text-sm"
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name} (+{c.dialCode})
            </option>
          ))}
        </select>
        <input
          type="tel"
          inputMode="tel"
          placeholder={placeholder ?? "Phone number"}
          value={local}
          onChange={(e) => {
            const cleaned = stripToDigits(e.target.value);
            const limited = limitToExpected(cleaned, country);
            setLocal(limited);
            emitChange(limited);
          }}
          onPaste={(e) => {
            const txt = (
              e.clipboardData || (window as any).clipboardData
            ).getData("text");
            const cleaned = stripToDigits(txt);
            const limited = limitToExpected(cleaned, country);
            e.preventDefault();
            setLocal(limited);
            emitChange(limited);
          }}
          className={`flex-1 px-3 py-2 rounded-md text-sm bg-[#0b1220] text-gray-100 ${
            error ? "border border-red-400" : "border border-[#334155]"
          }`}
          maxLength={country.expectedLength ?? undefined}
        />
      </div>
      <div className={`text-sm ${error ? "text-red-400" : "text-gray-400"}`}>
        {error
          ? error
          : country.expectedLength
          ? `Expect ${country.expectedLength} digits`
          : ""}
      </div>
      <div className="text-sm text-gray-400">Value: {value ?? ""}</div>
    </div>
  );
}
