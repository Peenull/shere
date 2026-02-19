"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Home,
  Users,
  UserPlus,
  Search,
  Shield,
  DollarSign,
  TrendingUp,
  Edit,
} from "react-feather";
import { useAdminData, UserData } from "@/hooks/useAdminData";
import { useAuth } from "@/components/AuthProvider";
import { useDirector } from "@/components/Director";
import AddUserModal from "@/components/Admin/AddUserModal";
import DeleteUserModal from "@/components/Admin/DeleteUserModal";
import ViewUserModal from "@/components/Admin/ViewUserModal";
import WithdrawalsTable from "@/components/Admin/WithdrawalsTable";
import ShareRequestsTable from "@/components/Admin/ShareRequestsTable";
import LoadingScreen from "@/components/LoadingScreen";
import EditVariablesModal from "@/components/Admin/EditVariablesModal";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useVariablesData } from "@/hooks/useVariablesData";
import Link from "next/link";

const ADMIN_UID = "WtFZkweX9DZl2iALNKyt3UqfBJA3";
// const ADMIN_UID = "S7VnMZof1k9v1zKYeMjsSjomuTUV";

const AdminDashboardContent = () => {
  const { user: authUser, loading: authLoading } = useAuth();
  const { users, loading, error, searchUsers, addUser, deleteUser } =
    useAdminData();
  const { notify } = useDirector();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState<"name" | "uid" | "phone">("uid");
  const [hasSearched, setHasSearched] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditVariables, setIsEditVariables] = useState(false);
  const variables = useVariablesData();

  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  useEffect(() => {
    const phone = searchParams.get("phone");
    const uid = searchParams.get("uid");
    const name = searchParams.get("name");

    if (phone) {
      setSearchBy("phone");
      setSearchTerm(phone);
      setHasSearched(true);
      searchUsers(phone, "phone");
    } else if (uid) {
      setSearchBy("uid");
      setSearchTerm(uid);
      setHasSearched(true);
      searchUsers(uid, "uid");
    } else if (name) {
      setSearchBy("name");
      setSearchTerm(name);
      setHasSearched(true);
      searchUsers(name, "name");
    }
  }, [searchParams, searchUsers]);

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
  };

  const openDeleteModal = (user: UserData) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const openWithdrawModal = (user: UserData) => {
    setSelectedUser(user);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditVariables = async (formData: any) => {
    const variablesRef = doc(db, "admin/variables");
    try {
      await updateDoc(variablesRef, formData);
      setIsEditVariables(false);
      notify("Variables Updated", true);
    } catch (error) {
      notify(`Error Updating Variables: ${error}`, false);
      console.error(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSaveNewUser = async (formData: any) => {
    const { success, error } = await addUser(formData);

    if (success) {
      setIsAddModalOpen(false);
      notify("User added successfully", true);
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
      notify("User deleted successfully!", true);
      refreshData();
    }
  };

  if (authLoading) {
    return <LoadingScreen />;
  }

  if (!authUser || authUser.uid !== ADMIN_UID) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-slate-950 text-white">
        <Shield size={64} className="text-red-500 mb-4" />
        <h1 className="text-3xl font-bold">Access Denied</h1>
        <p className="text-slate-400 mt-2">
          You do not have permission to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
      <header className="bg-slate-900/50 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40 supports-backdrop-filter:bg-slate-900/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-black font-black">
              A
            </div>
            <h1 className="text-xl font-bold tracking-tight">Admin</h1>
          </div>
          <nav className="flex items-center gap-1 bg-slate-800/50 p-1 rounded-lg border border-white/5">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-md hover:bg-white/5 text-sm font-medium"
            >
              <Home size={16} />
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex gap-2 p-1 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-white/5 mb-8 w-full overflow-x-scroll scrollbar-none scrollbar-hide">
          <button
            onClick={() => {
              const url = new URL(window.location.href);
              url.search = "";
              window.history.pushState({}, "", url);
              setSearchTerm("");
              setHasSearched(false);
            }}
            className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
              !searchParams.get("tab") || searchParams.get("tab") === "users"
                ? "bg-slate-800 text-white shadow-md border border-white/5"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Users size={16} /> Users
          </button>
          <button
            onClick={() => {
              const url = new URL(window.location.href);
              url.searchParams.set("tab", "withdrawals");
              window.history.pushState({}, "", url);
            }}
            className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
              searchParams.get("tab") === "withdrawals"
                ? "bg-slate-800 text-white shadow-md border border-white/5"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <DollarSign size={16} /> Withdrawals
          </button>
          <button
            onClick={() => {
              const url = new URL(window.location.href);
              url.searchParams.set("tab", "buyshares");
              window.history.pushState({}, "", url);
            }}
            className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
              searchParams.get("tab") === "buyshares"
                ? "bg-slate-800 text-white shadow-md border border-white/5"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <TrendingUp size={16} /> Buy
          </button>
        </div>

        {searchParams.get("tab") === "withdrawals" ? (
          <WithdrawalsTable />
        ) : searchParams.get("tab") === "buyshares" ? (
          <ShareRequestsTable />
        ) : (
          <>
            <form onSubmit={handleSearch} className="mb-8 space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={`Search by ${searchBy}...`}
                  className="w-full p-4 pl-12 pr-4 sm:pr-36 bg-slate-900/80 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                />
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                {/* Desktop: filter buttons inside input */}
                <div className="hidden sm:flex absolute right-2.5 top-1/2 -translate-y-1/2 items-center bg-slate-800 border border-slate-600 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setSearchBy("uid")}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${searchBy === "uid" ? "bg-yellow-400 text-black font-bold" : "text-gray-300 hover:text-white"}`}
                  >
                    UID
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchBy("name")}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${searchBy === "name" ? "bg-yellow-400 text-black font-bold" : "text-gray-300 hover:text-white"}`}
                  >
                    Name
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchBy("phone")}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${searchBy === "phone" ? "bg-yellow-400 text-black font-bold" : "text-gray-300 hover:text-white"}`}
                  >
                    Phone
                  </button>
                </div>
              </div>
              {/* Mobile: filter buttons below input */}
              <div className="flex sm:hidden items-center gap-2 p-1 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-white/5">
                <button
                  type="button"
                  onClick={() => setSearchBy("uid")}
                  className={`flex-1 px-4 py-2.5 text-sm rounded-lg font-medium transition-all ${searchBy === "uid" ? "bg-slate-800 text-white shadow-md border border-white/5" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
                >
                  UID
                </button>
                <button
                  type="button"
                  onClick={() => setSearchBy("name")}
                  className={`flex-1 px-4 py-2.5 text-sm rounded-lg font-medium transition-all ${searchBy === "name" ? "bg-slate-800 text-white shadow-md border border-white/5" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
                >
                  Name
                </button>
                <button
                  type="button"
                  onClick={() => setSearchBy("phone")}
                  className={`flex-1 px-4 py-2.5 text-sm rounded-lg font-medium transition-all ${searchBy === "phone" ? "bg-slate-800 text-white shadow-md border border-white/5" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
                >
                  Phone
                </button>
              </div>
            </form>

            <div className="bg-slate-900 border border-gray-800/80 rounded-2xl shadow-lg">
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="p-12 text-center text-gray-500">
                    Loading...
                  </div>
                ) : error ? (
                  <div className="p-12 text-center text-red-500">{error}</div>
                ) : !hasSearched ? (
                  <div className="p-12 text-center text-gray-500">
                    Please enter a search term to find users.
                  </div>
                ) : users.length === 0 ? (
                  <div className="p-12 text-center text-gray-500">
                    No users found.
                  </div>
                ) : (
                  <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs text-gray-400 uppercase bg-slate-950/40">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          User
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Balance
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Invites
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Share
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr
                          onClick={() => openViewModal(user)}
                          key={user.uid}
                          className="bg-slate-900 border-b border-gray-800/50 hover:bg-slate-800/40 transition-colors cursor-pointer"
                        >
                          <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                            <div className="font-bold">{user.name}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-2">
                              {" "}
                              {user.uid}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-2">
                              {" "}
                              {user.phone || "N/A"}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {(user.balance || 0).toLocaleString()} FCFA
                          </td>
                          <td className="px-6 py-4">
                            {(user.invited || []).length}
                          </td>
                          <td className="px-6 py-4 font-bold">
                            {user.share || 0}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </>
        )}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mt-5">
          <div className="flex items-center gap-2 p-1 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-white/5 overflow-x-auto scrollbar-none">
            <p className="flex items-center gap-2 text-slate-300 bg-slate-800 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap border border-white/5">
              <DollarSign size={14} className="text-yellow-400" />
              <span className="text-white font-bold">{variables.PPP}</span> FCFA
            </p>
            <p className="flex items-center gap-2 text-slate-300 bg-slate-800 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap border border-white/5">
              <span className="text-white font-bold">{variables.number}</span>
            </p>
            <p className="flex items-center gap-2 text-slate-300 bg-slate-800 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap border border-white/5">
              <span className="text-white font-bold">
                {variables.numberName}
              </span>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setIsEditVariables(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 py-2.5 px-5 bg-green-400 text-black font-bold rounded-xl hover:bg-green-300 transition-all shadow-lg shadow-green-400/20 active:scale-95"
            >
              <Edit size={18} />
              <span>Edit</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 py-2.5 px-5 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/20 active:scale-95"
            >
              <UserPlus size={18} />
              <span>Add New User</span>
            </button>
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

      <EditVariablesModal
        isLoading={loading}
        onSave={handleEditVariables}
        isOpen={isEditVariables}
        onClose={() => setIsEditVariables(false)}
        variables={variables}
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

const AdminDashboard = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AdminDashboardContent />
    </Suspense>
  );
};

export default AdminDashboard;
