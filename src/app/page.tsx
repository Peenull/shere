'use client';

import React from 'react';
import { useAuth } from '@/components/AuthProvider';
import LandingPage from '@/components/LandingPage';
import Dashboard from '@/components/Dashboard';
import LoadingScreen from '@/components/LoadingScreen';

export default function RootPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return user ? <Dashboard /> : <LandingPage />;
}
