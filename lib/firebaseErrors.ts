const FIREBASE_ERRORS = {
  "auth/email-already-in-use": "This email address is already in use.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/weak-password": "Your password must be at least 6 characters long.",
  "auth/user-not-found": "No account was found with this email.",
  "auth/wrong-password": "The password you entered is incorrect.",
  "auth/too-many-requests": "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.",
} as const;

type FirebaseErrorCode = keyof typeof FIREBASE_ERRORS;

export function formatFirebaseError(errorCode: string): string {
  return FIREBASE_ERRORS[errorCode as FirebaseErrorCode] || "An unexpected error occurred. Please try again.";
}
