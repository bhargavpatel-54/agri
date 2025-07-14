import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Eye } from 'lucide-react';
import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-primary">About KrishiConnect</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Connecting farmers and buyers to facilitate seamless agricultural land transactions. We are dedicated to empowering the agricultural community through technology.
        </p>
      </div>

      <div className="relative w-full h-80 rounded-lg overflow-hidden mb-12 shadow-xl">
        <Image src="https://placehold.co/1200x400.png" alt="Our Team" layout="fill" objectFit="cover" data-ai-hint="team work" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        <Card>
          <CardHeader>
            <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
              <Target className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="mt-4 font-headline text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">To provide a transparent, efficient, and reliable platform for buying and selling agricultural land, fostering growth and prosperity in the rural sector.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
              <Eye className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="mt-4 font-headline text-2xl">Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">To be the most trusted online portal for agricultural land transactions in India, empowering every farmer with digital tools and information.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
              <Users className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="mt-4 font-headline text-2xl">Who We Are</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">We are a team of passionate individuals with deep roots in agriculture and technology, committed to solving real-world problems for farmers.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
