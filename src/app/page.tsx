import { BuyerDashboard } from '@/components/dashboard/buyer-dashboard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <section className="relative h-[60vh] flex items-center justify-center text-center text-white bg-cover bg-center" style={{backgroundImage: "url('https://placehold.co/1920x1080.png')"}} data-ai-hint="farm landscape sunset">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-bold font-headline">Find Your Perfect Farmland</h1>
          <p className="mt-4 text-xl max-w-2xl mx-auto">The trusted platform for buying and selling agricultural land across India.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/properties">Browse Properties</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
               <Link href="/dashboard">List Your Land</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <div className="container py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline tracking-tight text-primary">Featured Listings</h2>
          <p className="mt-2 text-lg text-muted-foreground">Explore top-rated agricultural properties available for sale.</p>
        </div>
        <BuyerDashboard />
      </div>
    </div>
  );
}
