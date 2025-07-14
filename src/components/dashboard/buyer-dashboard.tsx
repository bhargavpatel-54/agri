'use client';

import { useState, useEffect, useMemo } from 'react';
import { SearchBar } from './search-bar';
import { LandCard } from './land-card';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { type LandListing } from '@/lib/types';

const dummyListings: LandListing[] = [
    { id: '1', size: 10, price: 5000000, district: 'Pune', taluka: 'Haveli', village: 'Wagholi', ownerName: 'Ramesh Patel', ownerContact: '9876543210', image: 'https://placehold.co/600x400.png' },
    { id: '2', size: 5, price: 2500000, district: 'Pune', taluka: 'Maval', village: 'Lonavla', ownerName: 'Suresh Singh', ownerContact: '9876543211' },
    { id: '3', size: 20, price: 10000000, district: 'Mumbai', taluka: 'Borivali', village: 'Dahisar', ownerName: 'Meena Kumari', ownerContact: '9876543212', image: 'https://placehold.co/600x400.png' },
];


export function BuyerDashboard() {
  const [allListings] = useLocalStorage<LandListing[]>('landListings', dummyListings);
  const [filteredListings, setFilteredListings] = useState<LandListing[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setFilteredListings(allListings);
  }, [allListings]);

  const handleSearch = (filters: { district: string; taluka: string; village: string }) => {
    setIsSearching(true);
    let result = allListings;
    if (filters.district) {
      result = result.filter(l => l.district === filters.district);
    }
    if (filters.taluka) {
      result = result.filter(l => l.taluka === filters.taluka);
    }
    if (filters.village) {
      result = result.filter(l => l.village === filters.village);
    }
    setFilteredListings(result);
  };
  
  const handleReset = () => {
    setFilteredListings(allListings);
    setIsSearching(false);
  }

  return (
    <div className="space-y-8">
      <SearchBar onSearch={handleSearch} onReset={handleReset} />
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map(listing => (
            <LandCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-2xl font-headline">
            {isSearching ? 'No Matching Land Found' : 'No Land Listings Available'}
          </h3>
          <p className="text-muted-foreground mt-2">
            {isSearching ? 'Try adjusting your search filters.' : 'Please check back later or contact support.'}
          </p>
        </div>
      )}
    </div>
  );
}
