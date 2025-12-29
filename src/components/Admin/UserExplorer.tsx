'use client';

import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Loader, User, ChevronDown, ChevronRight, Users, Gift } from 'react-feather';

interface UserExplorerProps {
  userId: string;
}

const UserExplorer: React.FC<UserExplorerProps> = ({ userId }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isreferredByOpen, setIsreferredByOpen] = useState(false);
  const [isInvitedOpen, setIsInvitedOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUser({ uid: userDoc.id, ...userDoc.data() });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (isLoading) {
    return <div className="flex items-center gap-2 p-2"><Loader size={16} className="animate-spin"/> <span>Loading...</span></div>;
  }

  if (!user) {
    return <div className="p-2 text-red-500">User not found (ID: {userId})</div>;
  }

  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 my-2">
      <div className="p-3">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                <User size={20} className="text-white"/>
            </div>
            <div>
                <p className="font-bold text-white">{user.name}</p>
                <p className="text-xs text-slate-400 font-mono">{user.uid}</p>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
            <div className="bg-slate-900/50 p-2 rounded-md">
                <p className="text-slate-400">Balance</p>
                <p className="font-bold text-yellow-400">{user.balance.toLocaleString()} FCFA</p>
            </div>
            <div className="bg-slate-900/50 p-2 rounded-md">
                <p className="text-slate-400">Share</p>
                <p className="font-bold text-green-400">{user.share}%</p>
            </div>
        </div>
      </div>

      <div className="border-t border-slate-700/50">
        {user.referredBy && (
            <div>
                <button onClick={() => setIsreferredByOpen(!isreferredByOpen)} className="w-full flex items-center justify-between p-3 text-left hover:bg-slate-700/30 transition-colors">
                    <h4 className="font-semibold text-white flex items-center gap-2"><Gift size={16}/> Invited By</h4>
                    {isreferredByOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {isreferredByOpen && (
                    <div className="p-3 pt-0">
                        <UserExplorer userId={user.referredBy} />
                    </div>
                )}
            </div>
        )}

        {user.invited && user.invited.length > 0 && (
             <div>
                <button onClick={() => setIsInvitedOpen(!isInvitedOpen)} className="w-full flex items-center justify-between p-3 text-left hover:bg-slate-700/30 transition-colors border-t border-slate-700/50">
                    <h4 className="font-semibold text-white flex items-center gap-2"><Users size={16}/> Invited Users ({user.invited.length})</h4>
                    {isInvitedOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {isInvitedOpen && (
                     <div className="p-3 pt-0">
                        {user.invited.map((invitee: any) => (
                           <UserExplorer key={invitee} userId={invitee} />
                        ))}
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default UserExplorer;
