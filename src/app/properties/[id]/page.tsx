'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { type LandListing } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Trees, DollarSign, User, Phone, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function PropertyDetailsPage() {
  const params = useParams();
  const { id } = params;
  const [allListings] = useLocalStorage<LandListing[]>('landListings', []);
  const [listing, setListing] = useState<LandListing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Re-read from localStorage to ensure we have the latest data
      const listingsFromStorage = JSON.parse(window.localStorage.getItem('landListings') || '[]') as LandListing[];
      const foundListing = listingsFromStorage.find(l => l.id === id);
      setListing(foundListing || null);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container py-12 text-center">
        <p className="text-lg text-muted-foreground">Loading property details...</p>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold font-headline">Property Not Found</h1>
        <p className="text-muted-foreground mt-2">The listing you are looking for does not exist.</p>
        <Button asChild variant="link" className="mt-4">
          <Link href="/properties">
            <ArrowLeft className="mr-2" />
            Back to Properties
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-12">
       <Button asChild variant="outline" className="mb-8">
        <Link href="/properties">
            <ArrowLeft className="mr-2 h-4 w-4"/>
            Back to Listings
        </Link>
      </Button>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="relative aspect-video w-full mb-4">
            <Image 
              src={listing.image || 'https://placehold.co/800x600.png'} 
              alt={`Land in ${listing.village}`} 
              layout="fill" 
              objectFit="cover" 
              className="rounded-lg shadow-lg"
              data-ai-hint="agriculture land"
            />
          </div>
          <Badge variant="secondary">For Sale</Badge>
        </div>
        <div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-4xl font-headline text-primary">
                {listing.village}, {listing.taluka}
              </CardTitle>
              <CardDescription className="text-lg flex items-center gap-2 pt-2">
                <MapPin className="w-5 h-5"/> {listing.district}, Maharashtra
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-base">
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 pt-4 border-t">
                  <div className="flex items-center gap-3">
                    <Trees className="w-6 h-6 text-primary" />
                    <div>
                        <p className="font-semibold">{listing.size} Acres</p>
                        <p className="text-sm text-muted-foreground">Land Size</p>
                    </div>
                  </div>
                   <div className="flex items-center gap-3">
                    <DollarSign className="w-6 h-6 text-primary" />
                     <div>
                        <p className="font-semibold">₹ {listing.price.toLocaleString('en-IN')}</p>
                        <p className="text-sm text-muted-foreground">Total Price</p>
                    </div>
                  </div>
              </div>

               <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-headline text-xl font-semibold">Owner Information</h3>
                    <div className="flex items-center gap-3">
                        <User className="w-6 h-6 text-primary" />
                        <div>
                            <p className="font-semibold">{listing.ownerName}</p>
                            <p className="text-sm text-muted-foreground">Owner Name</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-3">
                        <Phone className="w-6 h-6 text-primary" />
                        <div>
                            <p className="font-semibold">{listing.ownerContact}</p>
                            <p className="text-sm text-muted-foreground">Contact</p>
                        </div>
                    </div>
               </div>
                <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-4">Contact Owner</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
