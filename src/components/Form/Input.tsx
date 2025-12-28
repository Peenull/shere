"use client";

import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  help?: string;
  error?: string | null;
  minLength?: number;
  maxLength?: number;
};

export default function Input({
  label,
  help,
  error,
  id,
  minLength,
  maxLength,
  className,
  ...rest
}: Props) {
  const inputId = id ?? (rest.name as string) ?? undefined;
  const base =
    "px-3 py-2 rounded-md text-sm bg-[#0b1220] text-gray-100 focus:outline-none focus:ring-2";
  const border = error
    ? "border border-red-400 focus:ring-red-400"
    : "border border-[#334155] focus:ring-violet-500";

  return (
    <div className="flex flex-col gap-1 w-full">
      {label ? (
        <label
          htmlFor={inputId}
          className="font-semibold text-sm text-gray-200"
        >
          {label}{" "}
          {rest.required ? <span className="text-red-400">*</span> : null}
        </label>
      ) : null}

      <input
        id={inputId}
        {...rest}
        minLength={minLength}
        maxLength={maxLength}
        className={`${base} ${border} ${className ?? ""}`}
      />

      {help ? <div className="text-sm text-gray-400">{help}</div> : null}
      {error ? <div className="text-sm text-red-400">{error}</div> : null}
    </div>
  );
}
