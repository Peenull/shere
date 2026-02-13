// import { Timestamp } from 'firebase/firestore'; // Avoid direct import issues

export type WithdrawalStatus = 'pending' | 'completed' | 'rejected';

export interface FirestoreTimestamp {
    seconds: number;
    nanoseconds: number;
    toDate: () => Date;
}

export interface Withdrawal {
    id?: string;
    userId: string;
    amount: number;
    status: WithdrawalStatus;
    dateRequested: FirestoreTimestamp;
    phoneAccountName: string;
    phoneNumber: string;
    rejectionReason?: string;
    completeDate?: FirestoreTimestamp | null;
}

export interface UserData {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    balance: number;
    phone: string | null;
    phoneAccountName?: string;
    invited: string[];
    share: number;
}
