import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { type LandListing } from '@/lib/types';
import { MapPin, Trees, DollarSign, User, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LandCardProps {
  listing: LandListing;
}

export function LandCard({ listing }: LandCardProps) {
  return (
    <Link href={`/properties/${listing.id}`} className="flex h-full">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full w-full">
        <CardHeader>
          <CardTitle className="font-headline text-xl truncate">{listing.village}, {listing.taluka}</CardTitle>
          <CardDescription className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {listing.district}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
          {listing.image ? (
              <div className="relative aspect-video w-full">
                  <Image src={listing.image} alt={`Land in ${listing.village}`} layout="fill" objectFit="cover" className="rounded-md" />
              </div>
          ) : (
              <div className="relative aspect-video w-full">
                  <Image src={`https://placehold.co/600x400.png`} data-ai-hint="agriculture land" alt="Placeholder image" layout="fill" objectFit="cover" className="rounded-md" />
              </div>
          )}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Trees className="w-5 h-5 text-primary" />
              <span>{listing.size} Acres</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <span>₹ {listing.price.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              <span>{listing.ownerName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              <span>{listing.ownerContact}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Badge variant="secondary">For Sale</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
