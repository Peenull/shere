import {
  collection,
  query,
  getDocs,
  where,
  //   getCountFromServer,
} from "firebase/firestore";
import { db } from "../firebase";

export async function checkPending(userId: string, withdrawals: boolean) {
  if (userId) {
    try {
      const q = query(
        collection(
          db,
          `users/${userId}/${withdrawals ? "withdrawals" : "sharePurchases"}`,
        ),
        where("status", "==", "pending"),
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        console.log(
          `No pending ${withdrawals ? "Withdrawals" : "Share Purchases"}`,
        );

        return [];
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = snapshot.docs.map((doc: { id: any; data: () => any }) => ({
        id: doc.id,
        ...doc.data(),
      }));

      //const snapshot = await getCountFromServer(q);
      // console.log(snapshot.data().count);

      return data; // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error("Error Fetching Pending: ", e);
      return [];
    }
  }
}
