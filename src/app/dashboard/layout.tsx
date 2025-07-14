'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/use-local-storage';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn] = useLocalStorage('isLoggedIn', false);
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Wait until isLoggedIn has been determined from localStorage.
    // The value can be `undefined` initially from the hook.
    if (isLoggedIn === undefined) {
      return;
    }

    if (!isLoggedIn) {
      router.push('/login');
    } else {
      setIsChecking(false);
    }
  }, [isLoggedIn, router]);

  if (isChecking) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <div className="text-xl font-semibold">Loading...</div>
        </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-grow">{children}</main>
    </div>
  );
}
