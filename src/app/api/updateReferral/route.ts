import { admin } from '../../../../lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { newUserId, referredById, authToken } = await request.json();

    // 1. Check for missing fields
    if (!newUserId || !referredById || !authToken) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 2. Verify the auth token from the new user
    const decodedToken = await admin.auth().verifyIdToken(authToken);
    const uid = decodedToken.uid;

    // 3. Authorize: Ensure the token UID matches the newUserId
    if (uid !== newUserId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 4. Check if the referrer exists
    const referrerRef = admin.firestore().collection('users').doc(referredById);
    const referrerDoc = await referrerRef.get();

    if (!referrerDoc.exists) {
      return NextResponse.json({ error: 'Referrer not found' }, { status: 404 });
    }

    // 5. Update the referrer's document
    await referrerRef.update({
      invited: admin.firestore.FieldValue.arrayUnion(newUserId),
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Error updating referral:', error);

    // Improved error handling:
    // If the error is from Firebase Auth (e.g., invalid token), send a 401.
    if (error.code && error.code.startsWith('auth/')) {
        return NextResponse.json({ error: 'Invalid or expired authentication token.' }, { status: 401 });
    }

    // For all other errors, it's likely a true server error.
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
