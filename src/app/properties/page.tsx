import { BuyerDashboard } from '@/components/dashboard/buyer-dashboard';

export default function PropertiesPage() {
  return (
    <div className="container py-8">
       <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-primary">Available Properties</h1>
        <p className="mt-4 text-lg text-muted-foreground">Browse through all available land listings. Use the filters to find your perfect plot.</p>
      </div>
      <BuyerDashboard />
    </div>
  );
}
