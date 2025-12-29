'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';

export default function Header() {
  const { user, signOut, loading } = useAuth();

  return (
    <header className="bg-slate-900 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-yellow-400">
          MyApp
        </Link>
        <ul className="flex gap-6 items-center">
          <li>
            <Link href="/" className="hover:text-yellow-400 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-yellow-400 transition-colors">
              About
            </Link>
          </li>
          {user && (
            <li>
              <Link href="/dashboard" className="hover:text-yellow-400 transition-colors">
                Dashboard
              </Link>
            </li>
          )}
          {loading ? (
            <div className="text-gray-400">Loading...</div>
          ) : user ? (
            <>
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
