'use client'
import React, { Suspense } from 'react';
import SignupForm from '@/components/Signup/SignupForm';
import LoadingScreen from '@/components/LoadingScreen';

export default function SignupPage() {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <SignupForm />
        </Suspense>
    );
}