'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Tractor, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Navbar() {
  const router = useRouter();
  const { toast } = useToast();
  const [_, setLoggedIn] = useLocalStorage('isLoggedIn', false);

  const handleLogout = () => {
    setLoggedIn(false);
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/dashboard')}>
          <Tractor className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold font-headline text-primary">KrishiConnect</span>
        </div>
        <Button onClick={handleLogout} variant="outline">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
