'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Tractor, LogOut, LogIn, Menu, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/properties', label: 'Properties' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [isLoggedIn, setLoggedIn] = useLocalStorage<boolean | undefined>('isLoggedIn', undefined);
  const [isClient, setIsClient] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
    router.push('/');
  };

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        pathname === href ? "text-primary font-bold" : "text-muted-foreground"
      )}
      onClick={() => setSheetOpen(false)}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Tractor className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold font-headline text-primary">KrishiConnect</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => <NavLink key={link.href} {...link} />)}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {isClient && isLoggedIn ? (
            <>
              <Button onClick={() => router.push('/dashboard')} variant="ghost">Dashboard</Button>
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : isClient ? (
            <Button onClick={() => router.push('/login')}>
              <LogIn className="mr-2 h-4 w-4" />
              Login / Register
            </Button>
          ) : (
            <div className="h-10 w-40 animate-pulse rounded-md bg-muted" />
          )}
        </div>

        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
               <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                   <Link href="/" className="flex items-center gap-2" onClick={() => setSheetOpen(false)}>
                      <Tractor className="h-8 w-8 text-primary" />
                      <span className="text-lg font-bold font-headline text-primary">KrishiConnect</span>
                    </Link>
                   <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>

                <nav className="flex flex-col gap-4 p-4">
                  {navLinks.map((link) => <NavLink key={link.href} {...link} />)}
                </nav>
                
                <div className="mt-auto p-4 border-t">
                  {isClient && isLoggedIn ? (
                      <div className="flex flex-col gap-2">
                        <Button onClick={() => {router.push('/dashboard'); setSheetOpen(false);}} variant="outline" className="w-full">Dashboard</Button>
                        <Button onClick={() => {handleLogout(); setSheetOpen(false);}} variant="destructive" className="w-full">
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </Button>
                      </div>
                    ) : isClient ? (
                      <Button onClick={() => {router.push('/login'); setSheetOpen(false);}} className="w-full">
                        <LogIn className="mr-2 h-4 w-4" />
                        Login / Register
                      </Button>
                    ) : null}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
