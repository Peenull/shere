"use client";

import React, { useState } from "react";
import {
  X,
  User,
  DollarSign,
  Percent,
  Calendar,
  Users,
  Trash2,
  Gift,
  Phone,
  Copy,
  Edit,
} from "react-feather";
import { UserData, useAdminData } from "@/hooks/useAdminData";
import { useDirector } from "@/components/Director";
import EditUserModal from "./EditUserModal";
import MessageUserModal from "./MessageUserModal";
import { BiChat } from "react-icons/bi";

interface ViewUserModalProps {
  isOpen: boolean;
  userId: string | null;
  onClose: () => void;
  onInvest: (user: UserData) => void;
  onDelete: (user: UserData) => void;
  onWithdraw: (user: UserData) => void;
}

const Stat = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) => (
  <div className="bg-slate-900/70 p-4 rounded-lg flex items-center gap-4">
    <div className="bg-slate-700/50 p-3 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="font-bold text-white text-lg">{value}</p>
    </div>
  </div>
);

const ViewUserModal: React.FC<ViewUserModalProps> = ({
  isOpen,
  userId,
  onClose,
  onDelete,
}) => {
  const { notify } = useDirector();
  const [editUser, setEditUser] = useState<boolean>(false);
  const [messageUser, setMessageUser] = useState<boolean>(false);
  const { updateUser, user } = useAdminData(userId);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !user) return null;

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        notify(`${field} copied to clipboard!`, true);
      },
      () => {
        notify(`Failed to copy ${field}.`, false);
      },
    );
  };

  const formattedDate = user.createdAt
    ? new Date(user.createdAt.seconds * 1000).toLocaleDateString()
    : "N/A";

  const updateData = async (formData: UserData) => {
    try {
      setIsLoading(true);
      await updateUser(user.uid, formData);
      setIsLoading(false);
      setEditUser(false);
      setMessageUser(false);
      notify("User Updated", true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      notify(`User Not Updated: ${e}`, false);
      console.error(e);
    }
  };

  if (editUser) {
    return (
      <EditUserModal
        user={user}
        onClose={() => setEditUser(false)}
        onUpdate={(formData: UserData) => updateData(formData)}
        isOpen={editUser}
        isLoading={isLoading}
      />
    );
  }

  if (messageUser) {
    return (
      <MessageUserModal
        isOpen={messageUser}
        onClose={() => setMessageUser(false)}
        onSend={updateData}
        isLoading={isLoading}
      />
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        ></div>
        <div
          className="relative w-full max-w-3xl bg-slate-800/70 border border-slate-700 rounded-2xl shadow-xl backdrop-blur-xl flex flex-col"
          style={{ maxHeight: "90vh" }}
        >
          {/* Header */}
          <div className="shrink-0 flex items-center justify-between p-4 sm:p-6 border-b border-slate-700">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center">
                <User size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                <div
                  onClick={() => copyToClipboard(user.uid, "User ID")}
                  className="text-sm text-slate-400 font-mono flex items-center gap-2 cursor-pointer"
                >
                  <Copy size={12} /> {user.uid}
                </div>
                <div
                  onClick={() => copyToClipboard(user.phone || "", "Phone")}
                  className="text-sm text-slate-400 font-mono flex items-center gap-2 cursor-pointer"
                >
                  <Phone size={12} /> {user.phone || "Not available"}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="grow overflow-y-auto p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <Stat
                label="Balance"
                value={`${(user.balance || 0).toLocaleString()} FCFA`}
                icon={<DollarSign size={20} className="text-yellow-300" />}
              />
              <Stat
                label="Share"
                value={`${user.share || 0}%`}
                icon={<Percent size={20} className="text-green-400" />}
              />
              <Stat
                label="Date Joined"
                value={formattedDate}
                icon={<Calendar size={20} className="text-purple-400" />}
              />
            </div>

            {user.referredBy && (
              <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                  <Gift size={18} /> Referred By
                </h3>
                <div className="flex justify-between items-center bg-slate-800/60 p-3 rounded-md">
                  <div>
                    <p className="font-semibold text-slate-300">
                      {user.referredBy}
                    </p>
                    {/* <div  className='text-xs text-slate-400 font-mono flex items-center gap-2 cursor-pointer'> </div> */}
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(user.referredBy || "", "Referred By ID")
                    }
                    className="p-2 text-slate-300 hover:text-white bg-slate-700/50 hover:bg-slate-700 rounded-full transition-colors"
                  >
                    <Copy size={20} />
                  </button>
                </div>
              </div>
            )}

            <div className="bg-slate-900/50 rounded-lg p-4">
              <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                <Users size={18} /> Invited ({user.invited?.length || 0})
              </h3>
              {user.invited && user.invited.length > 0 ? (
                <div className="max-h-48 overflow-y-auto pr-2">
                  <ul className="space-y-2">
                    {user.invited.map((inviteeId) => (
                      <li
                        key={inviteeId}
                        className="flex justify-between items-center bg-slate-800/60 p-3 rounded-md"
                      >
                        <div>
                          <p className="font-semibold text-white">
                            {inviteeId}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() =>
                              copyToClipboard(inviteeId, "Invited User ID")
                            }
                            className="p-2 text-slate-300 hover:text-white bg-slate-700/50 hover:bg-slate-700 rounded-full transition-colors"
                          >
                            <Copy size={20} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-slate-400 text-center py-4">
                  No users invited yet.
                </p>
              )}
            </div>
          </div>

          {/* Footer with Actions */}
          <div className="shrink-0 flex justify-between items-center gap-4 p-4 sm:p-6 border-t border-slate-700">
            <button
              onClick={() => {
                onClose();
                onDelete(user);
              }}
              className="flex items-center gap-2 py-2 px-4 text-sm font-semibold text-white bg-red-600/80 hover:bg-red-600 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
              <span>Delete</span>
            </button>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setEditUser(true);
                }}
                className="flex items-center gap-2 py-2 px-4 text-sm font-semibold text-white bg-green-600/80 hover:bg-green-600 rounded-lg transition-colors"
              >
                <Edit size={16} />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  setMessageUser(true);
                }}
                className="flex items-center gap-2 py-2 px-4 text-sm font-semibold text-white bg-yellow-600/80 hover:bg-yellow-600 rounded-lg transition-colors"
              >
                <BiChat size={16} />
                <span>Message</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUserModal;
