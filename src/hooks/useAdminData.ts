"use client";

import { useState, useCallback, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export interface UserData {
  uid: string;
  email: string;
  name: string;
  balance: number;
  invited: string[];
  share: number;
  country?: string;
  phoneAccountName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdAt?: any;
  phone?: string;
  referredBy?: string;
  error: boolean;
  validUser: boolean;
  invested: number;
  message: string;
}

export const useAdminData = (userId?: string| null) => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [user, setUser] = useState<UserData>({
    uid: "",
    email: "",
    name: "",
    balance: 0,
    invited: [],
    share: 0,
    phone: "",
    phoneAccountName: "",
    error: false,
    validUser: true,
    invested: 0,
    message: "",
    country: "",
    referredBy: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchUsers = useCallback(
    async (searchTerm: string, searchBy: "name" | "uid" | "phone") => {
      if (!searchTerm) {
        setUsers([]);
        return;
      }
      setLoading(true);
      setError(null);
      setUsers([]);
      try {
        // eslint-disable-next-line prefer-const
        let results: UserData[] = [];
        const trimmedSearchTerm = searchTerm.trim();
        const usersCollectionRef = collection(db, "users");

        if (searchBy === "uid") {
          const docRef = doc(db, "users", trimmedSearchTerm);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            results.push({ uid: docSnap.id, ...data } as UserData);
          }
        } else if (searchBy === "name") {
          const q = query(
            usersCollectionRef,
            where("name", ">=", trimmedSearchTerm),
            where("name", "<", trimmedSearchTerm + "\uf8ff"),
          );
          const querySnapshot = await getDocs(q);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          querySnapshot.forEach((doc: any) => {
            results.push({ uid: doc.id, ...doc.data() } as UserData);
          });
        } else if (searchBy === "phone") {
          const q = query(
            usersCollectionRef,
            where("phone", "==", trimmedSearchTerm),
          );
          const querySnapshot = await getDocs(q);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          querySnapshot.forEach((doc: any) => {
            results.push({ uid: doc.id, ...doc.data() } as UserData);
          });
        }
        setUsers(results);
      } catch (err) {
        console.error("Error searching users: ", err);
        setError(
          "An error occurred while searching. Your Firestore indexes might need to be updated.",
        );
      }
      setLoading(false);
    },
    [],
  );

  const updateUser = useCallback(
    async (uid: string, data: Partial<UserData>) => {
      const userDocRef = doc(db, "users", uid);
      try {
        await updateDoc(userDocRef, data);
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.uid === uid ? { ...u, ...data } : u)),
        );
        return true;
      } catch (err) {
        console.error("Error updating user: ", err);
        setError("Failed to update user. See console for details.");
        return false;
      }
    },
    [],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addUser = useCallback(async (formData: any) => {
    setLoading(true);
    setError(null);
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        referredBy: formData.referredBy,
        createdAt: new Date(),
        invited: [],
        balance: 0,
        share: 0,
      });
      setLoading(false);
      return { success: true };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      const userDocRef = doc(db, "users", uid);
      await deleteDoc(userDocRef);
      setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== uid));
      setLoading(false);
      return true;
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user. See console for details.");
      setLoading(false);
      return false;
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }

    // Reference to the user's document in the 'users' collection
    const userDocRef = doc(db, "users", userId);

    // Set up the real-time listener
    const unsubscribe = onSnapshot(
      userDocRef,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (snapshot: any) => {
        if (snapshot.exists()) {
          // If the document exists, update the state
          const data = snapshot.data();
          console.log("Data fetched: ", data);
          setUser({
            balance: data.balance || 0,
            invited: data.invited || [],
            share: data.share || 0,
            phone: data.phone || "",
            phoneAccountName: data.phoneAccountName || "", // Added new field
            name: data.name || "",
            error: false,
            validUser: true,
            invested: data.invested || 0,
            message: data.message || "",
            email: data.email || "",
            uid: data.uid,
            country: data.country || "",
            referredBy: data.referredBy || "",
          });
          setLoading(false);
        } else {
          // If the document doesn't exist, set default values
          setUser(user);
          setLoading(true);
        }
      },
      (error: unknown) => {
        // Handle any errors during the fetch
        console.error("Error fetching user data:", error);
        setLoading(true);
      },
    );

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, [userId]);

  return {
    user,
    users,
    loading,
    error,
    searchUsers,
    updateUser,
    addUser,
    deleteUser,
  };
};
