'use client';

import React from 'react';
import { Home, Users, Settings, UserPlus, Edit, Trash2 } from 'react-feather';

// Mock data for visual representation
const mockUsers = [
  {
    uid: 'user12345',
    email: 'test.user1@example.com',
    displayName: 'Alice',
    totalBalance: 50000,
    totalInvites: 12,
    sharePercentage: 15,
  },
  {
    uid: 'user67890',
    email: 'another.dev@example.com',
    displayName: 'Bob',
    totalBalance: 12500,
    totalInvites: 3,
    sharePercentage: 5,
  },
  {
    uid: 'userABCDE',
    email: 'jane.doe@example.com',
    displayName: 'Jane Doe',
    totalBalance: 98000,
    totalInvites: 28,
    sharePercentage: 42,
  },
  {
    uid: 'userFGHIJ',
    email: 'new.user@example.com',
    displayName: 'Newbie',
    totalBalance: 0,
    totalInvites: 0,
    sharePercentage: 1,
  },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white">
      <header className="bg-slate-900/80 backdrop-blur-lg border-b border-gray-800/50 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="text-2xl font-black text-red-500 italic">SHERE [ADMIN]</div>
            <div className="flex items-center gap-6">
              <a href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Home size={18} />
                <span>Go to App</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Settings size={18} />
                <span>Settings</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-gray-400">Manage users and system settings.</p>
            </div>
            <button className="flex items-center gap-2 py-2 px-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors">
                <UserPlus size={18} />
                <span>Add New User</span>
            </button>
        </div>

        {/* User Management Table */}
        <div className="bg-slate-900 border border-gray-800/80 rounded-2xl shadow-lg">
            <div className="p-6 border-b border-gray-800/80">
                <h2 className="text-xl font-bold flex items-center gap-3"><Users size={22}/> User Management</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs text-gray-400 uppercase bg-slate-800/50">
                        <tr>
                            <th scope="col" className="px-6 py-4">User</th>
                            <th scope="col" className="px-6 py-4">Balance</th>
                            <th scope="col" className="px-6 py-4">Invites</th>
                            <th scope="col" className="px-6 py-4">Share %</th>
                            <th scope="col" className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockUsers.map((user) => (
                            <tr key={user.uid} className="bg-slate-900 border-b border-gray-800/50 hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                    <div className='font-bold'>{user.displayName}</div>
                                    <div className='text-xs text-gray-500'>{user.email}</div>
                                </td>
                                <td className="px-6 py-4">{user.totalBalance.toLocaleString()} FCFA</td>
                                <td className="px-6 py-4">{user.totalInvites}</td>
                                <td className="px-6 py-4 font-bold">{user.sharePercentage}%</td>
                                <td className="px-6 py-4 text-center">
                                    <button className="p-2 text-gray-500 hover:text-blue-400 transition-colors"><Edit size={16} /></button>
                                    <button className="p-2 text-gray-500 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
