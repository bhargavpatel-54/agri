'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Navbar } from '@/components/dashboard/navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn] = useLocalStorage('isLoggedIn', false);
  const router = useRouter();

  useEffect(() => {
    // This check runs on the client after hydration
    if (isLoggedIn === false) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  // Render a loading state or null while checking auth status
  if (isLoggedIn === undefined || isLoggedIn === false) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <div className="text-xl font-semibold">Loading...</div>
        </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
