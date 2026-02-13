"use client";

import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Corrected import path

export const useVariablesData = () => {
  const [variables, setVariables] = useState({
    PPP: 200,
    number: "683583297",
    numberName: "RIVANO DESTIN NGUEFACK",
  });

  useEffect(() => {
    const userDocRef = doc(db, "admin/variables");

    const unsubscribe = onSnapshot(
      userDocRef,
      (snapshot: any) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          setVariables({
            PPP: data.PPP || 200,
            number: data.number || "683583297",
            numberName: data.numberName || "RIVANO DESTIN NGUEFACK",
          });
        } else {
          setVariables({
            PPP: 200,
            number: "683583297",
            numberName: "RIVANO DESTIN NGUEFACK",
          });
        }
      },
      (error: any) => {
        console.error("Error fetching variables: ", error);
      },
    );

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  return { ...variables };
};
