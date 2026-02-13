import { 
    collection, 
    addDoc, 
    serverTimestamp, 
    doc, 
    getDocs, 
    query, 
    where, 
    orderBy, 
    updateDoc,
    collectionGroup,
    startAfter,
    limit,
    runTransaction
} from 'firebase/firestore';
import { db } from '../firebase';

export interface SharePurchase {
    id?: string;
    userId: string;
    phoneAccountName: string;
    phoneNumber: string;
    amount: number; // Price paid in FCFA
    percentage: number; 
    status: 'pending' | 'completed' | 'rejected';
    dateRequested: any;
    completeDate?: any;
    rejectionReason: string;
}

export const requestSharePurchase = async (
    userId: string, 
    phoneAccountName: string, 
    phoneNumber: string,
    percentage: number, 
    amount: number
) => {
    try {
        const purchaseData: Omit<SharePurchase, 'id'> = {
            userId,
            phoneAccountName,
            phoneNumber,
            percentage,
            amount,
            status: 'pending',
            dateRequested: serverTimestamp(),
            rejectionReason: ""
        };
        const docRef = await addDoc(collection(db, `users/${userId}/sharePurchases`), purchaseData);
        return docRef.id;
    } catch (error) {
        console.error("Error requesting share purchase:", error);
        throw error;
    }
};

export const getUserSharePurchases = async (userId: string) => {
    try {
        const q = query(
            collection(db, `users/${userId}/sharePurchases`),
            orderBy('dateRequested', 'desc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data()
        } as SharePurchase));
    } catch (error) {
        console.error("Error fetching user share purchases:", error);
        throw error;
    }
};

export const getSharePurchases = async (
    status: 'pending' | 'completed' | 'rejected',
    lastDoc?: any,
    pageSize: number = 10
) => {
    try {
        const constraints: any[] = [
            where('status', '==', status)
        ];

        // Match sorting of withdrawal system: pending/rejected ascending, completed descending
        if (status === 'pending' || status === 'rejected') {
            constraints.push(orderBy('dateRequested', 'asc'));
        } else {
            constraints.push(orderBy('dateRequested', 'desc'));
        }

        constraints.push(limit(pageSize));

        if (lastDoc) {
            constraints.push(startAfter(lastDoc));
        }

        const q = query(collectionGroup(db, 'sharePurchases'), ...constraints);
        const snapshot = await getDocs(q);
        
        const purchases: SharePurchase[] = snapshot.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data()
        } as SharePurchase));

        return {
            purchases,
            lastDoc: snapshot.docs[snapshot.docs.length - 1]
        };
    } catch (error) {
        console.error("Error fetching share purchases:", error);
        throw error;
    }
};

export const approveSharePurchase = async (
    userId: string, 
    purchaseId: string, 
    percentage: number,
    amount: number
) => {
    try {
        await runTransaction(db, async (transaction: any) => {
            const userRef = doc(db, 'users', userId);
            const purchaseRef = doc(db, `users/${userId}/sharePurchases`, purchaseId);

            const userDoc = await transaction.get(userRef);
            if (!userDoc.exists()) throw new Error("User does not exist!");

            const purchaseDoc = await transaction.get(purchaseRef);
            if (!purchaseDoc.exists()) throw new Error("Purchase request not found!");
            if (purchaseDoc.data().status !== 'pending') throw new Error("Request is no longer pending!");

            const currentShare = userDoc.data().share || 0;
            const currentInvested = userDoc.data().invested || 0;
            const referrerID = userDoc.data().referredBy || null

            // Enforce the 50% limit
            if (currentShare + percentage > 50) {
                throw new Error(`Exceeds 50% limit (Total would be ${currentShare + percentage}%)`);
            }


            // Update user: add share % and add price to invested
            
            if (referrerID) {
                const referrerRef = doc(db, `users/${referrerID}`)
                const referrerDoc = await transaction.get(referrerRef)
                

                if (referrerDoc.exists()) {
                    const referrerData = referrerDoc.data()

                    const commission = amount * ((referrerData.share || 0) / 100);
                    const updatedBalance = (referrerData.balance || 0) + commission;
                    
                    const updatePayload: any = { balance: updatedBalance };

                    const alreadyInvited = (referrerData.invited || []).includes(userId);
                    if (!alreadyInvited) {
                        updatePayload.invited = [userId, ...referrerData.invited]
                    }
                    transaction.update(referrerRef, updatePayload);
                }

                 
            }
            transaction.update(userRef, {
                share: currentShare + percentage,
                invested: currentInvested + amount
            });

            // Update purchase status
            transaction.update(purchaseRef, {
                status: 'completed',
                completeDate: serverTimestamp(),
                percentage,
                amount
            });
        });
        return true;
    } catch (error) {
        console.error("Error approving share purchase:", error);
        throw error;
    }
};

export const rejectSharePurchase = async (
    userId: string, 
    purchaseId: string, 
    reason: string
) => {
    try {
        const purchaseRef = doc(db, `users/${userId}/sharePurchases`, purchaseId);
        await updateDoc(purchaseRef, {
            status: 'rejected',
            rejectionReason: reason
        });
        return true;
    } catch (error) {
        console.error("Error rejecting share purchase:", error);
        throw error;
    }
};

export const resetSharePurchaseStatus = async (userId: string, purchaseId: string) => {
    try {
        const purchaseRef = doc(db, `users/${userId}/sharePurchases`, purchaseId);
        await updateDoc(purchaseRef, {
            status: 'pending',
            rejectionReason: ""
        });
        return true;
    } catch (error) {
        console.error("Error resetting share purchase:", error);
        throw error;
    }
};


