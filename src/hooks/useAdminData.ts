'use client';

import { useState, useCallback } from 'react';
import { collection, query, where, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export interface UserData {
  uid: string;
  email: string;
  name: string;
  balance: number;
  invited: string[];
  share: number;
  country?: string;
  createdAt?: any;
  phone?: string;
  currency?: string;
  language?: string;
  referredBy?: string;
}

export const useAdminData = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchUsers = useCallback(async (searchTerm: string, searchBy: 'name' | 'uid' | 'phone') => {
    if (!searchTerm) {
      setUsers([]);
      return;
    }
    setLoading(true);
    setError(null);
    setUsers([]);
    try {
      let results: UserData[] = [];
      const trimmedSearchTerm = searchTerm.trim();
      const usersCollectionRef = collection(db, 'users');

      if (searchBy === 'uid') {
        const docRef = doc(db, 'users', trimmedSearchTerm);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          results.push({ uid: docSnap.id, ...data } as UserData);
        }
      } else if (searchBy === 'name') {
        const q = query(
          usersCollectionRef, 
          where('name', '>=', trimmedSearchTerm),
          where('name', '<', trimmedSearchTerm + '\uf8ff')
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc: any) => {
          results.push({ uid: doc.id, ...doc.data() } as UserData);
        });
      } else if (searchBy === 'phone') {
        const q = query(usersCollectionRef, where('phone', '==', trimmedSearchTerm));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc: any) => {
          results.push({ uid: doc.id, ...doc.data() } as UserData);
        });
      }
      setUsers(results);
    } catch (err) {
      console.error("Error searching users: ", err);
      setError('An error occurred while searching. Your Firestore indexes might need to be updated.');
    }
    setLoading(false);
  }, []);

  const updateUser = useCallback(async (uid: string, data: Partial<UserData>) => {
    const userDocRef = doc(db, 'users', uid);
    try {
      await updateDoc(userDocRef, data);
      setUsers(prevUsers => 
        prevUsers.map(u => (u.uid === uid ? { ...u, ...data } : u))
      );
      return true;
    } catch (err) {
      console.error("Error updating user: ", err);
      setError("Failed to update user. See console for details.");
      return false;
    }
  }, []);

  const addUser = useCallback(async (formData: any) => {
    setLoading(true);
    setError(null);
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        currency: formData.currency,
        language: formData.language,
        referredBy: formData.referredBy,
        createdAt: new Date(),
        invited: [],
        balance: 0,
        share: 0,
      });
      setLoading(false);
      return { success: true };
    } catch (err: any) {
      console.error("Error adding user:", err);
      setError(err.message || "Failed to add user. See console for details.");
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, []);

  const deleteUser = useCallback(async (uid: string) => {
    setLoading(true);
    setError(null);
    try {
      const userDocRef = doc(db, 'users', uid);
      await deleteDoc(userDocRef);
      setUsers(prevUsers => prevUsers.filter(u => u.uid !== uid));
      setLoading(false);
      return true;
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user. See console for details.");
      setLoading(false);
      return false;
    }
  }, []);

  return { users, loading, error, searchUsers, updateUser, addUser, deleteUser };
};
