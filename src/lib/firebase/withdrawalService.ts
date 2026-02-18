import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  runTransaction,
  updateDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase";
import { Withdrawal, WithdrawalStatus } from "@/types";

export const requestWithdrawal = async (
  userId: string,
  amount: number,
  phoneAccountName: string,
  phoneNumber: string,
) => {
  try {
    const withdrawalData: Omit<Withdrawal, "id"> = {
      userId,
      amount,
      status: "pending",
      dateRequested: serverTimestamp() as any,
      phoneAccountName,
      phoneNumber,
      rejectionReason: "",
      completeDate: null,
    };

    // We should add it to the user's subcollection
    const docRef = await addDoc(
      collection(db, `users/${userId}/withdrawals`),
      withdrawalData,
    );
    return docRef.id;
  } catch (error) {
    console.error("Error requesting withdrawal:", error);
    throw error;
  }
};

export const approveWithdrawal = async (
  userId: string,
  withdrawalId: string,
  amount: number,
) => {
  try {
    await runTransaction(db, async (transaction: any) => {
      const userRef = doc(db, "users", userId);
      const withdrawalRef = doc(
        db,
        `users/${userId}/withdrawals`,
        withdrawalId,
      );

      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) {
        throw "User does not exist!";
      }

      const currentBalance = userDoc.data().balance || 0;
      if (currentBalance < amount) {
        throw "Insufficient balance!";
      }

      const withdrawalDoc = await transaction.get(withdrawalRef);
      if (!withdrawalDoc.exists()) {
        throw "Withdrawal request not found!";
      }

      if (withdrawalDoc.data().status !== "pending") {
        throw "Withdrawal request is not pending!";
      }

      // Deduct balance
      transaction.update(userRef, {
        balance: currentBalance - amount,
      });

      // Update withdrawal status
      transaction.update(withdrawalRef, {
        status: "completed",
        completeDate: serverTimestamp(),
      });
    });
    return true;
  } catch (error) {
    console.error("Error approving withdrawal:", error);
    throw error;
  }
};

export const rejectWithdrawal = async (
  userId: string,
  withdrawalId: string,
  reason: string,
) => {
  try {
    const withdrawalRef = doc(db, `users/${userId}/withdrawals`, withdrawalId);
    await updateDoc(withdrawalRef, {
      status: "rejected",
      rejectionReason: reason,
    });
    return true;
  } catch (error) {
    console.error("Error rejecting withdrawal:", error);
    throw error;
  }
};

// Admin Fetching
export const getWithdrawals = async (
  status: WithdrawalStatus,
  lastDoc?: any,
  pageSize: number = 10,
) => {
  try {
    // collectionGroup allows querying all subcollections named 'withdrawals'
    const constraints: any[] = [where("status", "==", status)];

    constraints.push(orderBy("completeDate", "desc")); // Most recent completions first

    constraints.push(limit(pageSize));

    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }

    const q = query(collectionGroup(db, "withdrawals"), ...constraints);
    const snapshot = await getDocs(q);

    const withdrawals: Withdrawal[] = snapshot.docs.map(
      (doc: any) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Withdrawal,
    );

    return {
      withdrawals,
      lastDoc: snapshot.docs[snapshot.docs.length - 1],
    };
  } catch (error) {
    console.error("Error fetching withdrawals:", error);
    throw error;
  }
};

export const getUserWithdrawals = async (userId: string) => {
  try {
    const q = query(
      collection(db, `users/${userId}/withdrawals`),
      orderBy("dateRequested", "desc"),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc: any) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Withdrawal,
    );
  } catch (error) {
    console.error("Error fetching user withdrawals:", error);
    throw error;
  }
};

// Helper for collectionGroup import as it wasn't in the initial list
import { collectionGroup } from "firebase/firestore";

export const resetWithdrawalStatus = async (
  userId: string,
  withdrawalId: string,
) => {
  try {
    const withdrawalRef = doc(db, `users/${userId}/withdrawals`, withdrawalId);
    await updateDoc(withdrawalRef, {
      status: "pending",
      rejectionReason: "", // Clear the reason
      completeDate: null,
    });
    return true;
  } catch (error) {
    console.error("Error resetting withdrawal status:", error);
    throw error;
  }
};
