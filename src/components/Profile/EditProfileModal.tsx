"use client";

import { useState } from "react";
import { useAuth } from "../AuthProvider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useDirector } from "../Director";
import { updateProfile } from "firebase/auth";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  currentPhone: string;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  currentName,
  currentPhone,
}: EditProfileModalProps) {
  const { user } = useAuth();
  const { notify } = useDirector();
  const [name, setName] = useState(currentName);
  const [phone] = useState(currentPhone);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateProfile(user, { displayName: name });
      await updateDoc(userDocRef, {
        name: name,
        // Phone number is not editable
      });
      notify("Profile updated successfully!", true);
      onClose();
    } catch (error) {
      console.error("Error updating profile: ", error);
      notify("Failed to update profile.", false);
    }
    setIsSaving(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl w-full max-w-md">
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-xl font-bold text-white">Edit Profile</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              readOnly
              disabled
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-2.5 text-gray-400 cursor-not-allowed"
            />
          </div>
        </div>
        <div className="p-4 bg-slate-950/50 flex justify-end gap-3 rounded-b-2xl">
          <button
            onClick={onClose}
            className="text-sm text-gray-300 hover:text-white transition px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="text-sm font-bold bg-yellow-400 text-black px-6 py-2.5 rounded-lg hover:bg-yellow-300 disabled:opacity-50 transition-colors"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
