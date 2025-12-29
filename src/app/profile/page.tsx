'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useDirector } from '@/components/Director';
import { User, Mail, Phone, Edit, Check, X, Loader, LogIn, UserPlus, LogOut } from 'react-feather';

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const { notify } = useDirector();
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          setFormData({ name: data.name || '', phone: data.phone || '' });
        } else {
          notify('User data not found.', false);
        }
      } catch (error) {
        notify('Failed to fetch user data.', false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user, notify]);

  const handleUpdateProfile = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        name: formData.name,
        phone: formData.phone,
      });
      setUserData((prev: any) => ({ ...prev, name: formData.name, phone: formData.phone }));
      notify('Profile updated successfully!', true);
      setIsEditing(false);
    } catch (error) {
      notify('Failed to update profile.', false);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen bg-slate-950"><Loader className="animate-spin text-yellow-400" size={48} /></div>;
  }

  if (!user) {
    return (
        <div className="min-h-screen bg-slate-950 flex justify-center items-center p-4">
            <div className="w-full max-w-md text-center bg-slate-900/70 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-3">Access Your Profile</h2>
                <p className="text-gray-400 mb-8">You need to be logged in to view your profile and manage your account.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/signin" className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-5 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors">
                        <LogIn size={18} />
                        <span>Log In</span>
                    </Link>
                    <Link href="/signup" className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-5 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-600 transition-colors">
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
            <h1 className="text-3xl md:text-4xl font-bold text-white">Your Profile</h1>
            <p className="text-gray-400 mt-1">View your stats and manage your personal information.</p>
          </div>
          <button onClick={signOut} className="w-full sm:w-auto flex items-center justify-center gap-2 py-2 px-4 bg-red-600/80 text-white font-bold rounded-lg hover:bg-red-500 transition-colors">
              <LogOut size={18} />
              <span>Logout</span>
          </button>
        </header>

        {userData && (
          <div className="bg-slate-900/70 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                <div className='flex items-center gap-4'>
                    <div className="w-16 h-16 rounded-full bg-yellow-400/20 flex items-center justify-center border-2 border-yellow-400 flex-shrink-0">
                        <User size={32} className="text-yellow-300" />
                    </div>
                    <div className='flex-grow'>
                        {isEditing ? (
                            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="text-2xl font-bold bg-slate-800 rounded px-2 py-1 w-full"/>
                        ) : (
                            <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
                        )}
                        <p className="text-sm text-gray-400 flex items-center gap-2"><Mail size={14}/>{userData.email}</p>
                    </div>
                </div>
                <div className='flex gap-2 flex-shrink-0'>
                    {isEditing ? (
                        <>
                            <button onClick={handleUpdateProfile} disabled={isSaving} className="flex items-center gap-2 py-2 px-3 text-sm font-semibold text-black bg-green-500 hover:bg-green-400 rounded-lg transition-colors">
                                {isSaving ? <Loader size={16} className='animate-spin'/> : <Check size={16} />} <span>Save</span>
                            </button>
                            <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 py-2 px-3 text-sm font-semibold text-white bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors">
                                <X size={16} /> <span>Cancel</span>
                            </button>
                        </>
                    ) : (
                        <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 py-2 px-4 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">
                            <Edit size={16} /> <span>Edit Profile</span>
                        </button>
                    )}
                </div>
            </div>

            {isEditing && (
              <div className='mt-6 pt-6 border-t border-slate-800'>
                  <label className="text-sm font-medium text-gray-400 mb-2 block">Phone Number</label>
                  <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-slate-800 border border-gray-700 rounded-lg p-3" placeholder="+123 456 7890"/>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <p className="text-sm text-slate-400">Balance</p>
                <p className="font-bold text-yellow-400 text-2xl">{userData.balance?.toLocaleString() || 0} FCFA</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <p className="text-sm text-slate-400">Share</p>
                <p className="font-bold text-green-400 text-2xl">{userData.share || 0}%</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <p className="text-sm text-slate-400">Referral Code</p>
                <p className="font-mono text-white text-lg break-all">{user.uid}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
