'use client';

import React from 'react';
import { useAuth } from '@/components/AuthProvider';
import LandingPage from '@/components/LandingPage';
import Dashboard from '@/components/Dashboard';

export default function RootPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 text-[10px] font-black uppercase tracking-widest">
          Loading...
        </p>
      </div>
    );
  }

  return user ? <Dashboard /> : <LandingPage />;
}
