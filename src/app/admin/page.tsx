'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Home, Users, Settings, UserPlus, Search, Shield, Copy } from 'react-feather';
import { useAdminData, UserData } from '@/hooks/useAdminData';
import { useAuth } from '@/components/AuthProvider';
import { useDirector } from '@/components/Director';
import AddUserModal from '@/components/Admin/AddUserModal';
import DeleteUserModal from '@/components/Admin/DeleteUserModal';
import ViewUserModal from '@/components/Admin/ViewUserModal';
import ProcessInvestmentModal from '@/components/Admin/ProcessInvestmentModal';
import WithdrawModal from '@/components/Admin/WithdrawModal';
import { doc, getDoc, writeBatch, runTransaction } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

const SHARE_COST = 200; // 1% share costs 200 FCFA
const ADMIN_UID = 'WtFZkweX9DZl2iALNKyt3UqfBJA3'; // Your Admin UID

const AdminDashboard = () => {
  const { user: authUser, loading: authLoading } = useAuth();
  const { users, loading, error, searchUsers, addUser, deleteUser } = useAdminData();
  const { notify } = useDirector();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState<'name' | 'uid' | 'phone'>('uid');
  const [hasSearched, setHasSearched] = useState(false);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const phone = searchParams.get('phone');
    const uid = searchParams.get('uid');
    const name = searchParams.get('name');

    if (phone) {
      setSearchBy('phone');
      setSearchTerm(phone);
      setHasSearched(true);
      searchUsers(phone, 'phone');
    } else if (uid) {
      setSearchBy('uid');
      setSearchTerm(uid);
      setHasSearched(true);
      searchUsers(uid, 'uid');
    } else if (name) {
      setSearchBy('name');
      setSearchTerm(name);
      setHasSearched(true);
      searchUsers(name, 'name');
    }
  }, [searchParams, searchUsers]);


  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      notify(`${field} copied to clipboard!`, true);
    }, () => {
      notify(`Failed to copy ${field}.`, false);
    });
  };

  const refreshData = () => {
    if (hasSearched) {
      searchUsers(searchTerm, searchBy);
    }
  };

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

  const openWithdrawModal = (user: UserData) => {
    setSelectedUser(user);
    setIsWithdrawModalOpen(true);
  };

  const handleProcessInvestment = async (investorId: string, investmentAmount: number) => {
    setIsProcessing(true);
    try {
        if (!selectedUser) throw new Error("No user selected");

        const investorRef = doc(db, "users", investorId);
        const investorDoc = await getDoc(investorRef);
        if (!investorDoc.exists()) throw new Error("Investor not found");

        const investorData = investorDoc.data() as UserData;

        const newSharePercentage = investmentAmount / SHARE_COST;
        const updatedShare = (investorData.share || 0) + newSharePercentage;

        const batch = writeBatch(db);
        batch.update(investorRef, { share: updatedShare });

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

        await batch.commit();

        notify('Investment processed successfully!', true);
        setIsInvestmentModalOpen(false);
        refreshData();

    } catch (e: any) {
        console.error("Error processing investment: ", e);
        notify(`An error occurred: ${e.message}`, false);
    } finally {
        setIsProcessing(false);
    }
  };

  const handleProcessWithdrawal = async (userId: string, amount: number) => {
    setIsProcessing(true);
    const userDocRef = doc(db, 'users', userId);

    try {
        await runTransaction(db, async (transaction) => {
            const userDoc = await transaction.get(userDocRef);
            if (!userDoc.exists()) {
                throw new Error("User not found");
            }
            const currentBalance = userDoc.data().balance || 0;
            if (currentBalance < amount) {
                throw new Error("Insufficient funds");
            }
            const newBalance = currentBalance - amount;
            transaction.update(userDocRef, { balance: newBalance });
        });

        notify('Withdrawal successful!', true);
        setIsWithdrawModalOpen(false);
        refreshData();

    } catch (e: any) {
        console.error("Error processing withdrawal: ", e);
        notify(`An error occurred: ${e.message}`, false);
    } finally {
        setIsProcessing(false);
    }
  };

  const handleSaveNewUser = async (formData: any) => {
    const { success, error } = await addUser(formData);
    if (success) {
      setIsAddModalOpen(false);
      notify('User added successfully', true);
      refreshData();
    } else {
      notify(`Error: ${error}`, false);
    }
  };
  
  const handleConfirmDelete = async () => {
      if (!selectedUser) return;
      const success = await deleteUser(selectedUser.uid);
      if (success) {
          setIsDeleteModalOpen(false);
          setSelectedUser(null);
          notify('User deleted successfully!', true);
          refreshData();
      }
  };

  if (authLoading) {
    return <div className="flex justify-center items-center h-screen bg-slate-950"><Search className="animate-spin text-yellow-400" size={48} /></div>;
  }

  if (!authUser || authUser.uid !== ADMIN_UID) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-slate-950 text-white">
        <Shield size={64} className="text-red-500 mb-4" />
        <h1 className="text-3xl font-bold">Access Denied</h1>
        <p className="text-slate-400 mt-2">You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white">
        <header className="bg-slate-900/80 backdrop-blur-xl border-b border-gray-800/80 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
              <h1 className="text-xl font-bold">Admin</h1>
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
                    <button type="button" onClick={() => setSearchBy('phone')} className={`px-3 py-1 text-xs rounded-md ${searchBy === 'phone' ? 'bg-yellow-400 text-black' : 'text-gray-300'}`}>Phone</button>
                </div>
            </div>
        </form>

        <div className="bg-slate-900 border border-gray-800/80 rounded-2xl shadow-lg">
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
                            <tr key={user.uid} className="bg-slate-900 border-b border-gray-800/50 hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                    <div className='font-bold'>{user.name}</div>
                                    <div onClick={(e) => { e.stopPropagation(); copyToClipboard(user.uid, 'User ID'); }} className='text-xs text-gray-500 flex items-center gap-2 cursor-pointer'><Copy size={12}/> {user.uid}</div>
                                    <div onClick={(e) => { e.stopPropagation(); copyToClipboard(user.phone || '', 'Phone'); }} className='text-xs text-gray-500 flex items-center gap-2 cursor-pointer'><Copy size={12}/> {user.phone || 'N/A'}</div>
                                </td>
                                <td onClick={() => openViewModal(user)} className="px-6 py-4 cursor-pointer">{(user.balance || 0).toLocaleString()} FCFA</td>
                                <td onClick={() => openViewModal(user)} className="px-6 py-4 cursor-pointer">{(user.invited || []).length}</td>
                                <td onClick={() => openViewModal(user)} className="px-6 py-4 font-bold cursor-pointer">{user.share || 0}%</td>
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
        onInvest={openInvestModal}
        onDelete={openDeleteModal}
        onWithdraw={openWithdrawModal}
      />

      <ProcessInvestmentModal
        isOpen={isInvestmentModalOpen}
        user={selectedUser}
        onClose={() => setIsInvestmentModalOpen(false)}
        onSave={handleProcessInvestment}
        isLoading={isProcessing}
      />

      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        user={selectedUser}
        onClose={() => setIsWithdrawModalOpen(false)}
        onConfirm={handleProcessWithdrawal}
        isLoading={isProcessing}
      />

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveNewUser}
        isLoading={loading}
      />

      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        user={selectedUser}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={loading}
      />
    </div>
  );
};

export default AdminDashboard;
