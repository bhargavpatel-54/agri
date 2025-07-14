'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { type LandListing } from '@/lib/types';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';

const locationData = {
  'Pune': { 'Haveli': ['Wagholi', 'Manjri'], 'Maval': ['Lonavla', 'Kamshet'] },
  'Mumbai': { 'Andheri': ['Vile Parle', 'Juhu'], 'Borivali': ['Dahisar', 'Kandivali'] },
};

const formSchema = z.object({
  size: z.coerce.number().min(0.1, 'Size must be positive'),
  price: z.coerce.number().min(1, 'Price must be positive'),
  district: z.string().min(1, 'District is required'),
  taluka: z.string().min(1, 'Taluka is required'),
  village: z.string().min(1, 'Village is required'),
  ownerName: z.string().min(2, 'Owner name is required'),
  ownerContact: z.string().regex(/^\d{10}$/, 'Enter a valid 10-digit phone number'),
  image: z.any().optional(),
});

interface PostLandFormProps {
    onNewListing: (listing: LandListing) => void;
}

export function PostLandForm({ onNewListing }: PostLandFormProps) {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { size: 0, price: 0, district: '', taluka: '', village: '', ownerName: '', ownerContact: '' },
  });

  const district = form.watch('district');
  const taluka = form.watch('taluka');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          variant: 'destructive',
          title: 'Image too large',
          description: 'Please upload an image smaller than 5MB.',
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        // We will not store the image in the form data to avoid quota issues
        // form.setValue('image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeImage = () => {
    setImagePreview(null);
    // form.setValue('image', null);
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if(fileInput) fileInput.value = '';
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newListing: LandListing = {
      id: new Date().toISOString(),
      ...values,
      // We pass the preview to be saved, but a real app would upload this to a server
      // and store a URL. For now, to prevent quota errors, we'll save the preview URL.
      image: imagePreview || undefined,
    };

    // To prevent storing large base64 strings in localStorage, we will create a temporary
    // object for the listing and only store the URL if it's a placeholder.
    // In a real app, you'd upload the image and get a URL back.
    const listingToStore = {...newListing};
    if (imagePreview && !imagePreview.startsWith('https://placehold.co')) {
       // We're setting the image to the preview for display, but a more robust solution is needed.
       // To avoid the quota error, let's just not save the huge base64 string.
       // We will pass the preview to the onNewListing callback so it can be temporarily displayed
       // but we will clear it before saving to localStorage.
       listingToStore.image = imagePreview; // for immediate UI update
       
       const finalListingForStorage = {...newListing, image: undefined }; // Don't save image to localStorage
        onNewListing(finalListingForStorage);
    } else {
        onNewListing(newListing);
    }


    toast({ title: 'Success', description: 'Your land has been listed for sale.' });
    form.reset();
    setImagePreview(null);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">List Your Land for Sale</CardTitle>
        <CardDescription>Fill in the details below to find a buyer.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField name="size" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Land Size (in Acres)</FormLabel><FormControl><Input type="number" placeholder="e.g., 5.5" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="price" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Total Price (in ₹)</FormLabel><FormControl><Input type="number" placeholder="e.g., 2500000" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField name="district" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>District</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select District" /></SelectTrigger></FormControl><SelectContent>{Object.keys(locationData).map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
              )} />
              <FormField name="taluka" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Taluka</FormLabel><Select onValueChange={field.onChange} value={field.value} disabled={!district}><FormControl><SelectTrigger><SelectValue placeholder="Select Taluka" /></SelectTrigger></FormControl><SelectContent>{district && Object.keys(locationData[district as keyof typeof locationData]).map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
              )} />
              <FormField name="village" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Village</FormLabel><Select onValueChange={field.onChange} value={field.value} disabled={!taluka}><FormControl><SelectTrigger><SelectValue placeholder="Select Village" /></SelectTrigger></FormControl><SelectContent>{taluka && locationData[district as keyof typeof locationData][taluka as keyof typeof locationData[keyof typeof locationData]].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
              )} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField name="ownerName" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Owner Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="ownerContact" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Owner Contact</FormLabel><FormControl><Input placeholder="9876543210" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>

            <FormField name="image" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Land Image (Optional)</FormLabel>
                <FormControl>
                    <div className="flex items-center gap-4">
                        <Button asChild variant="outline">
                            <label htmlFor="image-upload" className="cursor-pointer">
                                <Upload className="mr-2 h-4 w-4" /> Upload Image
                            </label>
                        </Button>
                        <Input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden"/>
                    </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            
            {imagePreview && (
                <div className="relative w-48 h-32">
                    <Image src={imagePreview} alt="Land preview" layout="fill" objectFit="cover" className="rounded-md border" />
                    <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full" onClick={removeImage}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}

            <Button type="submit" size="lg" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">List My Land</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
