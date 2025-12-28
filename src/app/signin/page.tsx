"use client";

import Input from "@/components/Form/Input";
import React, { useState } from "react";

export default function Signin() {
  // State definitions (Structure mapped, logic empty)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Shared visual style for inputs
  const inputClasses =
    "bg-gray-900/50 border border-gray-700 text-gray-100 placeholder-gray-500 text-sm rounded-lg focus:ring-yellow-400 focus:border-yellow-400 block w-full p-2.5 hover:bg-gray-900/70 transition-all duration-200";

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden font-sans">
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-black" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      ></div>

      {/* Animated Orbs */}
      <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 -left-4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse delay-700"></div>

      {/* --- MAIN CARD --- */}
      <div className="relative z-10 w-full max-w-md p-4">
        <div className="relative group">
          {/* Glowing Border Wrapper */}
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

          <div className="relative bg-slate-900/80 backdrop-blur-xl ring-1 ring-gray-800 rounded-xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
                WELCOME BACK
              </h1>
              <p className="mt-2 text-gray-400 text-sm">
                Log in to check your earnings and invites.
              </p>
            </div>

            {/* Form Layout */}
            <form className="space-y-6">
              {/* Email */}
              <Input
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                className={inputClasses}
                value={formData.email}
                onChange={() => {}} // Logic TBD
              />

              {/* Password */}
              <div className="space-y-1">
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  className={inputClasses}
                  value={formData.password}
                  onChange={() => {}} // Logic TBD
                />
                <div className="flex justify-end">
                  <a
                    href="#"
                    className="text-xs text-yellow-400/80 hover:text-yellow-300 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                className="w-full mt-2 py-3 px-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg shadow-[0_0_15px_rgba(250,204,21,0.4)] transition-all transform hover:-translate-y-0.5"
              >
                🔓 Sign In
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-gray-500">
              New to Shere?{" "}
              <a
                href="/signup"
                className="text-yellow-400 hover:text-yellow-300 font-semibold hover:underline"
              >
                Create an account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
