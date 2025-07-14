'use client';

import { useState, useEffect } from 'react';
import { PostLandForm } from './post-land-form';
import { LandCard } from './land-card';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { type LandListing } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const dummyListings: LandListing[] = [
    { id: '1', size: 10, price: 5000000, district: 'Pune', taluka: 'Haveli', village: 'Wagholi', ownerName: 'Ramesh Patel', ownerContact: '9876543210', image: 'https://placehold.co/600x400.png' },
    { id: '2', size: 5, price: 2500000, district: 'Pune', taluka: 'Maval', village: 'Lonavla', ownerName: 'Suresh Singh', ownerContact: '9876543211' },
    { id: '3', size: 20, price: 10000000, district: 'Mumbai', taluka: 'Borivali', village: 'Dahisar', ownerName: 'Meena Kumari', ownerContact: '9876543212', image: 'https://placehold.co/600x400.png' },
];


export function SellerDashboard() {
  const [listings, setListings] = useLocalStorage<LandListing[]>('landListings', dummyListings);
  const [showForm, setShowForm] = useState(false);

  const handleNewListing = (newListing: LandListing) => {
    setListings(prev => [newListing, ...prev]);
    setShowForm(false);
  };
  
  // This is a simple way to simulate "my listings". In a real app this would be based on a userId.
  // For this demo, we'll just assume the first 2 are the user's.
  const myListings = listings.slice(0, 2);


  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-headline font-bold">Your Listings</h2>
        <Button onClick={() => setShowForm(!showForm)} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <PlusCircle className="mr-2 h-4 w-4" />
          {showForm ? 'Cancel' : 'Add New Listing'}
        </Button>
      </div>

      {showForm && <PostLandForm onNewListing={handleNewListing} />}

      {myListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {myListings.map(listing => (
            <LandCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 className="text-2xl font-headline">You have no active listings.</h3>
          <p className="text-muted-foreground mt-2">Click "Add New Listing" to get started.</p>
        </div>
      )}
    </div>
  );
}
