'use client'
import React, { Suspense } from 'react';
import SignupForm from '@/components/Signup/SignupForm';
import { Loader } from 'react-feather';

// A simple loading component to show while the form is loading
const Loading = () => (
    <div className="flex justify-center items-center h-screen bg-slate-950">
        <Loader className="animate-spin text-yellow-400" size={48} />
    </div>
);

export default function SignupPage() {
    return (
        <Suspense fallback={<Loading />}>
            <SignupForm />
        </Suspense>
    );
}