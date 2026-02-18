"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useDirector } from "@/components/Director";
import {
  User,
  Mail,
  Phone,
  Edit,
  LogIn,
  UserPlus,
  LogOut,
  Home,
  Copy,
} from "react-feather";
import EditProfileModal from "@/components/Profile/EditProfileModal";
import LoadingScreen from "@/components/LoadingScreen";

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const { notify } = useDirector();
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUserData = async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        notify("User data not found.", false);
      }
    } catch (error) {
      notify("Failed to fetch user data.", false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user, notify]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    fetchUserData(); // Refetch data when modal is closed
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        notify(`${field} copied to clipboard!`, true);
      },
      () => {
        notify(`Failed to copy ${field}.`, false);
      },
    );
  };

  if (isLoading && !userData) {
    // Show loader only on initial load
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center p-4">
        <div className="w-full max-w-md text-center bg-slate-900/70 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-3">
            Access Your Profile
          </h2>
          <p className="text-gray-400 mb-8">
            You need to be logged in to view your profile and manage your
            account.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signin"
              className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-5 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors"
            >
              <LogIn size={18} />
              <span>Log In</span>
            </Link>
            <Link
              href="/signup"
              className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-5 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-600 transition-colors"
            >
              <UserPlus size={18} />
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Your Profile
            </h1>
            <p className="text-gray-400 mt-1">
              View your stats and manage your personal information.
            </p>
          </div>
        </header>

        {userData && (
          <div className="bg-slate-900/70 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-yellow-400/20 flex items-center justify-center border-2 border-yellow-400 flex-shrink-0">
                  <User size={32} className="text-yellow-300" />
                </div>
                <div className="grow">
                  <h2 className="text-2xl font-bold text-white">
                    {userData.name || "User"}
                  </h2>
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    <Mail size={14} />
                    {userData.email}
                  </p>
                  <div
                    onClick={() =>
                      copyToClipboard(userData.phone || "", "Phone")
                    }
                    className="text-sm text-gray-400 flex items-center gap-2 cursor-pointer"
                  >
                    <Phone size={14} />
                    {userData.phone || "Not available"}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 py-2 px-4 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                >
                  <Edit size={16} /> <span>Edit Profile</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <p className="text-sm text-slate-400">Balance</p>
                <p className="font-bold text-yellow-400 text-2xl">
                  {userData.balance?.toLocaleString() || 0} FCFA
                </p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <p className="text-sm text-slate-400">Share</p>
                <p className="font-bold text-green-400 text-2xl">
                  {userData.share || 0}%
                </p>
              </div>
              <div
                onClick={() => copyToClipboard(user.uid, "Referral Code")}
                className="bg-slate-800/50 p-4 rounded-lg cursor-pointer"
              >
                <p className="text-sm text-slate-400">Referral Code</p>
                <p className="font-mono text-white text-lg break-all flex items-center gap-2">
                  <Copy size={16} /> {user.uid}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="w-full max-w-xs flex items-center justify-center gap-2 py-3 px-5 bg-gray-600/20 text-gray-400 font-bold rounded-lg hover:bg-gray-600/30 hover:text-gray-300 transition-colors border border-gray-600/30"
          >
            <Home size={18} />
            <span>Home</span>
          </Link>
          <button
            onClick={signOut}
            className="w-full max-w-xs flex items-center justify-center gap-2 py-3 px-5 bg-red-600/20 text-red-400 font-bold rounded-lg hover:bg-red-600/30 hover:text-red-300 transition-colors border border-red-600/30"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>

        {userData && (
          <EditProfileModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            currentName={userData.name || ""}
            currentPhone={userData.phone || ""}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
