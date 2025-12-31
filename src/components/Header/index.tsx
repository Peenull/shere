'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/components/AuthProvider';

export default function Header() {
  const { user, signOut, loading } = useAuth();

  return (
    <header className="bg-slate-900 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Shere Logo" width={40} height={40} />
          <span className="text-2xl font-bold text-white">Shere</span>
        </Link>
        <ul className="flex gap-6 items-center">
          <li>
            <Link href="/" className="hover:text-yellow-400 transition-colors">
              Home
            </Link>
          </li>
          {loading ? (
            <div className="text-gray-400">Loading...</div>
          ) : user ? (
            <>
              <li>
                <Link href="/dashboard" className="hover:text-yellow-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <span className="text-gray-400">Welcome, {user.displayName}</span>
              </li>
              <li>
                <button
                  onClick={signOut}
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-400 transition-all"
                >
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/signin" className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-300 transition-all">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-yellow-400 hover:text-yellow-300">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
