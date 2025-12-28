'use client';

import React, { useState } from 'react';
import { Home, Users, Settings, UserPlus, Search } from 'react-feather';
import { useAdminData, UserData } from '@/hooks/useAdminData';
import AddUserModal from '@/components/Admin/AddUserModal';
import DeleteUserModal from '@/components/Admin/DeleteUserModal';
import ViewUserModal from '@/components/Admin/ViewUserModal';
import ProcessInvestmentModal from '@/components/Admin/ProcessInvestmentModal';
import { doc, getDoc, writeBatch } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

const SHARE_COST = 200; // 1% share costs 200 FCFA

const AdminDashboard = () => {
  const { users, loading, error, searchUsers, addUser, deleteUser, refreshUsers } = useAdminData();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState<'name' | 'uid'>('uid');
  const [hasSearched, setHasSearched] = useState(false);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);
  
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isProcessingInvestment, setIsProcessingInvestment] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setHasSearched(true);
    searchUsers(searchTerm, searchBy);
  };

  const openViewModal = (user: UserData) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const openInvestModal = (user: UserData) => {
    setSelectedUser(user);
    setIsInvestmentModalOpen(true);
  };

  const openDeleteModal = (user: UserData) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleProcessInvestment = async (investorId: string, investmentAmount: number) => {
    setIsProcessingInvestment(true);
    try {
        if (!selectedUser) throw new Error("No user selected");

        const investorRef = doc(db, "users", investorId);
        const investorDoc = await getDoc(investorRef);
        if (!investorDoc.exists()) throw new Error("Investor not found");

        const investorData = investorDoc.data() as UserData;

        // 1. Calculate new share for the investor
        const newSharePercentage = investmentAmount / SHARE_COST;
        const updatedShare = (investorData.share || 0) + newSharePercentage;

        const batch = writeBatch(db);
        batch.update(investorRef, { share: updatedShare });

        // 2. Check for a referrer and calculate commission
        if (investorData.referredBy) {
            const referrerRef = doc(db, "users", investorData.referredBy);
            const referrerDoc = await getDoc(referrerRef);

            if (referrerDoc.exists()) {
                const referrerData = referrerDoc.data() as UserData;
                const commission = investmentAmount * ((referrerData.share || 0) / 100);
                
                const updatedBalance = (referrerData.balance || 0) + commission;
                batch.update(referrerRef, { balance: updatedBalance });
            }
        }

        // 3. Atomically commit both updates
        await batch.commit();

        alert('Investment processed successfully!');
        setIsInvestmentModalOpen(false);
        refreshUsers(); // Refresh data to show changes

    } catch (e: any) {
        console.error("Error processing investment: ", e);
        alert(`An error occurred: ${e.message}`);
    } finally {
        setIsProcessingInvestment(false);
    }
  };

  const handleSaveNewUser = async (formData: any) => {
    const { success, error } = await addUser(formData);
    if (success) {
      setIsAddModalOpen(false);
      refreshUsers();
    } else {
      alert(`Error: ${error}`);
    }
  };
  
  const handleConfirmDelete = async () => {
      if (!selectedUser) return;
      const success = await deleteUser(selectedUser.uid);
      if (success) {
          setIsDeleteModalOpen(false);
          setSelectedUser(null);
          refreshUsers();
      }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white">
        {/* Header remains the same */}
        <header className="bg-slate-900/80 backdrop-blur-xl border-b border-gray-800/80 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
              <h1 className="text-xl font-bold">Admin Panel</h1>
              <nav className="flex items-center gap-4">
                  <a href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"><Home size={18}/> Home</a>
                  <a href="/admin" className="flex items-center gap-2 text-white font-semibold"><Users size={18}/> Users</a>
                  <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"><Settings size={18}/> Settings</a>
              </nav>
          </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">User Management</h1>
            <p className="text-gray-400 mt-1">Search, create, and manage users.</p>
          </div>
          <button onClick={() => setIsAddModalOpen(true)} className="w-full sm:w-auto flex items-center justify-center gap-2 py-2 px-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors">
            <UserPlus size={18} />
            <span>Add New User</span>
          </button>
        </div>
        
        <form onSubmit={handleSearch} className="mb-8">
           {/* Search form remains the same */}
           <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={`Search by ${searchBy}...`}
                    className="w-full p-4 pl-12 bg-slate-900/80 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center bg-slate-800 border border-slate-600 rounded-lg p-1">
                    <button type="button" onClick={() => setSearchBy('uid')} className={`px-3 py-1 text-xs rounded-md ${searchBy === 'uid' ? 'bg-yellow-400 text-black' : 'text-gray-300'}`}>UID</button>
                    <button type="button" onClick={() => setSearchBy('name')} className={`px-3 py-1 text-xs rounded-md ${searchBy === 'name' ? 'bg-yellow-400 text-black' : 'text-gray-300'}`}>Name</button>
                </div>
            </div>
        </form>

        <div className="bg-slate-900 border border-gray-800/80 rounded-2xl shadow-lg">
           {/* Table remains the same */}
           <div className="overflow-x-auto">
              {loading ? (
                <div className='p-12 text-center text-gray-500'>Loading...</div>
              ) : error ? (
                <div className='p-12 text-center text-red-500'>{error}</div>
              ) : !hasSearched ? (
                <div className='p-12 text-center text-gray-500'>Please enter a search term to find users.</div>
              ) : users.length === 0 ? (
                <div className='p-12 text-center text-gray-500'>No users found.</div>
              ) : (
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs text-gray-400 uppercase bg-slate-950/40">
                        <tr>
                            <th scope="col" className="px-6 py-3">User</th>
                            <th scope="col" className="px-6 py-3">Balance</th>
                            <th scope="col" className="px-6 py-3">Invites</th>
                            <th scope="col" className="px-6 py-3">Share</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.uid} onClick={() => openViewModal(user)} className="bg-slate-900 border-b border-gray-800/50 hover:bg-slate-800/40 transition-colors cursor-pointer">
                                <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                    <div className='font-bold'>{user.name}</div>
                                    <div className='text-xs text-gray-500'>{user.uid}</div>
                                </td>
                                <td className="px-6 py-4">{(user.balance || 0).toLocaleString()} FCFA</td>
                                <td className="px-6 py-4">{(user.invited || []).length}</td>
                                <td className="px-6 py-4 font-bold">{user.share || 0}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              )}
            </div>
        </div>
      </main>

      <ViewUserModal 
        isOpen={isViewModalOpen}
        user={selectedUser}
        onClose={() => setIsViewModalOpen(false)}
        onInvest={openInvestModal} // Changed
        onDelete={openDeleteModal}
      />

      <ProcessInvestmentModal
        isOpen={isInvestmentModalOpen}
        user={selectedUser}
        onClose={() => setIsInvestmentModalOpen(false)}
        onSave={handleProcessInvestment}
        isLoading={isProcessingInvestment}
      />

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveNewUser}
        isLoading={loading} // You might want a specific loading state for this
      />

      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        user={selectedUser}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={loading} // You might want a specific loading state for this
      />
    </div>
  );
};

export default AdminDashboard;