"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useDirector } from "@/components/Director";
import { formatFirebaseError } from "@/lib/firebaseErrors";
import {
  User,
  Mail,
  Lock,
  Gift,
  ArrowRight,
  Loader,
  Smartphone,
} from "react-feather";

import PhoneInput from "@/components/Form/PhoneInput";

// Reusable Input component with icon
const IconInput = ({
  icon,
  label,
  ...props
}: {
  icon: React.ReactNode;
  label: string;
  [key: string]: unknown;
}) => (
  <div>
    <label className="text-sm font-medium text-gray-400 mb-2 block">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
        {icon}
      </div>
      <input
        {...props}
        className="bg-slate-800/50 border border-gray-700 text-gray-100 placeholder-gray-500 text-sm rounded-lg focus:ring-yellow-400 focus:border-yellow-400 block w-full pl-10 p-3 transition-all duration-200"
      />
    </div>
  </div>
);

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { notify } = useDirector();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    currency: "",
    language: "English",
    referredBy: "",
    phoneAccountName: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isReferralFromUrl, setIsReferralFromUrl] = useState(false);

  useEffect(() => {
    const refCode = searchParams.get("ref");
    if (refCode) {
      setFormData((prev) => ({ ...prev, referredBy: refCode }));
      setIsReferralFromUrl(true);
    }
  }, [searchParams]);

  if (auth?.currentUser?.uid) {
    router.push("/");
    notify("User Already Signed in: Redirecting", true);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (
    phone: string,
    country: string,
    currency: string,
  ) => {
    setFormData((prev) => ({ ...prev, phone, country, currency }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.country) {
      notify("Please select a country for your phone number.", false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      notify("Passwords do not match.", false);
      return;
    }

    setIsLoading(true);
    let userCredential;

    try {
      // Step 1: Create the authentication user
      userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: formData.name });

      // Step 2: Attempt to create the Firestore document
      try {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          currency: formData.currency,
          language: formData.language,
          referredBy: formData.referredBy,
          createdAt: serverTimestamp(), // Use server timestamp for accuracy
          invited: [],
          balance: 0,
          share: 0,
          phoneAccountName: formData.phoneAccountName,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (dbError: any) {
        // If Firestore write fails, roll back auth user creation
        notify("Failed to save user data. Rolling back...", false);
        if (user) {
          await deleteUser(user);
        }
        throw dbError; // Re-throw the error to be caught by the outer catch block
      }

      notify("Account created successfully! Redirecting...", true);
      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Catches both auth and Firestore errors
      const friendlyError = formatFirebaseError(error.code || "SIGNUP_FAILED");
      notify(friendlyError, false);
    } finally {
      setIsLoading(false);
    }
  };

  const phoneInputClasses =
    "bg-slate-800/50 border border-gray-700 text-gray-100 placeholder-gray-500 text-sm rounded-lg focus:ring-yellow-400 focus:border-yellow-400 block w-full p-3 transition-all duration-200";

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

      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-slate-900/70 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="text-3xl font-black text-yellow-400 italic mb-4 inline-block"
            >
              SHERE.
            </Link>
            <h1 className="text-2xl font-bold text-white">
              Create Your Account
            </h1>
            <p className="mt-2 text-gray-400 text-sm">
              Join the network and start earning today.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <IconInput
              icon={<User size={18} />}
              label="Full Name"
              name="name"
              placeholder="Ex. John Doe"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />

            <IconInput
              icon={<Mail size={18} />}
              label="Email Address"
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />

            <div>
              <PhoneInput
                label="Phone Number"
                className={phoneInputClasses}
                value={formData.phone}
                onChange={handlePhoneChange}
                required
              />
            </div>

            <IconInput
              icon={<Smartphone size={18} />}
              label="MOMO / OM Name"
              name="phoneAccountName"
              placeholder="Name on your Mobile Money account"
              value={formData.phoneAccountName}
              onChange={handleChange}
              autoComplete="off"
              required
            />

            <IconInput
              icon={<Gift size={18} />}
              label="Referred By (Optional)"
              name="referredBy"
              placeholder="Enter referrer's code or number"
              value={formData.referredBy}
              onChange={handleChange}
              readOnly={isReferralFromUrl}
              disabled={isReferralFromUrl}
              autoComplete="off"
              title={isReferralFromUrl ? "Referral code from invite link" : ""}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <IconInput
                icon={<Lock size={18} />}
                label="Password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
              <IconInput
                icon={<Lock size={18} />}
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 mt-2 py-3 px-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg shadow-lg shadow-yellow-400/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader size={20} className="animate-spin" />
              ) : (
                "Create Account"
              )}
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-yellow-400 hover:text-yellow-300 font-semibold"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
