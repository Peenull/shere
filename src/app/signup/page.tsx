"use client";

import Input from "@/components/Form/Input";
import PhoneInput from "@/components/Form/PhoneInput";
import React, { useState } from "react";

export default function Signup() {
  // State definitions only (Logic is empty for now)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Shared styling
  const inputClasses =
    "bg-gray-900/50 border border-gray-700 text-gray-100 placeholder-gray-500 text-sm rounded-lg focus:ring-yellow-400 focus:border-yellow-400 block w-full p-2.5 hover:bg-gray-900/70 transition-all duration-200";

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden font-sans">
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-950 via-slate-900 to-black" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      ></div>
      {/* Animated Orbs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse delay-1000"></div>

      {/* --- MAIN CARD --- */}
      <div className="relative z-10 w-full max-w-lg p-4">
        <div className="relative group">
          {/* Glowing Border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

          <div className="relative bg-slate-900/80 backdrop-blur-xl ring-1 ring-gray-800 rounded-xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
                EARN WITH SHERE
              </h1>
              <p className="mt-2 text-gray-400 text-sm">
                Join the community and start earning instantly.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5">
              <Input
                label="Full Name"
                placeholder="Ex. John Doe"
                className={inputClasses}
                value={formData.name}
                onChange={() => {}} // Logic TBD
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                className={inputClasses}
                value={formData.email}
                onChange={() => {}} // Logic TBD
              />

              <PhoneInput
                label="Phone Number"
                className={inputClasses}
                value={formData.phone}
                onChange={() => {}} // Logic TBD
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  className={inputClasses}
                  value={formData.password}
                  onChange={() => {}} // Logic TBD
                />
                <Input
                  label="Confirm"
                  type="password"
                  placeholder="••••••••"
                  className={inputClasses}
                  value={formData.confirmPassword}
                  onChange={() => {}} // Logic TBD
                />
              </div>

              <button
                type="button"
                className="w-full mt-4 py-3 px-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg shadow-[0_0_15px_rgba(250,204,21,0.4)] transition-all transform hover:-translate-y-0.5"
              >
                🚀 Create Account
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-yellow-400 hover:text-yellow-300 font-semibold hover:underline"
              >
                Log in here
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
