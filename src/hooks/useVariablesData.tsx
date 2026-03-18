"use client";

import { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Corrected import path

export const useVariablesData = () => {
  const data = {
    PPP: 100,
    number: "683583297",
    numberName: "RIVANO DESTIN NGUEFACK",
  };
  const [variables, setVariables] = useState(data);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setData = async (variablesRef: any) => {
    setVariables(data);

    await setDoc(variablesRef, data);
  };

  useEffect(() => {
    const variablesRef = doc(db, "admin/variables");

    const unsubscribe = onSnapshot(
      variablesRef,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (snapshot: any) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          setVariables({
            PPP: data.PPP || 100,
            number: data.number || "683583297",
            numberName: data.numberName || "RIVANO DESTIN NGUEFACK",
          });
        } else {
          setData(variablesRef);
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (error: any) => {
        console.error("Error fetching variables: ", error);
      },
    );

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  return { ...variables };
};
