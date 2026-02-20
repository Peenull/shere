"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Corrected import path

export const useUserData = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    balance: 0,
    invited: [],
    share: 0,
    phone: "",
    phoneAccountName: "",
    name: "",
    error: false,
    validUser: true,
    invested: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    // Reference to the user's document in the 'users' collection
    const userDocRef = doc(db, "users", user.uid);

    // Set up the real-time listener
    const unsubscribe = onSnapshot(
      userDocRef,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (snapshot: any) => {
        if (snapshot.exists()) {
          // If the document exists, update the state
          const data = snapshot.data();
          setUserData({
            balance: data.balance || 0,
            invited: data.invited || [],
            share: data.share || 0,
            phone: data.phone || "",
            phoneAccountName: data.phoneAccountName || "", // Added new field
            name: data.name || "",
            error: false,
            validUser: true,
            invested: data.invested,
          });
          setLoading(false);
        } else {
          // If the document doesn't exist, set default values
          setUserData({
            balance: 0,
            invited: [],
            share: 0,
            phone: "",
            phoneAccountName: "",
            name: "",
            error: true,
            validUser: false,
            invested: 0,
          });
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
  }, [user]);

  return { ...userData, loading };
};
