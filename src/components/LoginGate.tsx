'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginGate({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        const sessionAuth = sessionStorage.getItem('is_authenticated');
        if (sessionAuth === 'true') {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            router.push('/login');
        }
    }, [router]);

    // If authenticated, render children
    if (isAuthenticated === true) {
        return <>{children}</>;
    }

    // Otherwise render nothing (or a loader) while checking/redirecting
    return null;
}
