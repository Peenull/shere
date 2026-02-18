"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { Mail, Lock, ArrowRight, Loader } from "react-feather";
import { auth } from "@/lib/firebase";
import { useDirector } from "@/components/Director";

// Reusable Input component with icon
const IconInput = ({
  icon,
  ...props
}: {
  icon: React.ReactNode;
  [key: string]: unknown;
}) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
      {icon}
    </div>
    <input
      {...props}
      className="bg-slate-800/50 border border-gray-700 text-gray-100 placeholder-gray-500 text-sm rounded-lg focus:ring-yellow-400 focus:border-yellow-400 block w-full pl-10 p-3 transition-all duration-200"
    />
  </div>
);

export default function Signin() {
  const router = useRouter();
  const { signIn, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { notify } = useDirector();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signIn(formData.email, formData.password);
    if (success) {
      router.push("/");
    }
  };

  if (auth?.currentUser?.uid) {
    router.push("/");
    notify("User Already Signed in: Redirecting", true);
  }
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 font-sans p-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-950 via-slate-950 to-black opacity-80" />
      <div
        className="absolute inset-0 mix-blend-soft-light"
        style={{
          backgroundImage: "url('/grid.svg')",
          backgroundSize: "100px 100px",
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-slate-900/70 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="text-3xl font-black text-yellow-400 italic mb-4 inline-block"
            >
              SHERE.
            </Link>
            <h1 className="text-2xl font-bold text-white">Welcome Back!</h1>
            <p className="mt-2 text-gray-400 text-sm">
              Sign in to access your dashboard.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <IconInput
              icon={<Mail size={18} />}
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />

            <IconInput
              icon={<Lock size={18} />}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              required
            />

            <div className="flex justify-end text-sm">
              <a
                href="#"
                className="text-yellow-400/80 hover:text-yellow-300 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg shadow-lg shadow-yellow-400/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader size={20} className="animate-spin" />
              ) : (
                "Sign In"
              )}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-yellow-400 hover:text-yellow-300 font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
