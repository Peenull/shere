'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/../lib/firebase'; // Adjust the import path as necessary

export const useUserData = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    totalBalance: 0,
    totalInvites: 0,
    sharePercentage: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    // Reference to the user's document in the 'users' collection
    const userDocRef = doc(db, 'users', user.uid);

    // Set up the real-time listener
    const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
      if (snapshot.exists()) {
        // If the document exists, update the state
        const data = snapshot.data();
        setUserData({
          totalBalance: data.totalBalance || 0,
          totalInvites: data.totalInvites || 0,
          sharePercentage: data.sharePercentage || 0,
        });
      } else {
        // If the document doesn't exist, set default values
        // You might want to create the document here on user creation
        setUserData({
          totalBalance: 0,
          totalInvites: 0,
          sharePercentage: 0,
        });
      }
      setLoading(false);
    }, (error) => {
      // Handle any errors during the fetch
      console.error("Error fetching user data:", error);
      setLoading(false);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, [user]);

  return { ...userData, loading };
};
