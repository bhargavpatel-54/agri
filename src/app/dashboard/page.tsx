import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BuyerDashboard } from '@/components/dashboard/buyer-dashboard';
import { SellerDashboard } from '@/components/dashboard/seller-dashboard';
import { ShoppingCart, Tag } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="container py-8">
      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-12">
          <TabsTrigger value="buy" className="h-10 text-base">
            <ShoppingCart className="mr-2 h-5 w-5" /> Buy Land
          </TabsTrigger>
          <TabsTrigger value="sell" className="h-10 text-base">
            <Tag className="mr-2 h-5 w-5" /> Sell Land
          </TabsTrigger>
        </TabsList>
        <TabsContent value="buy" className="mt-8">
          <BuyerDashboard />
        </TabsContent>
        <TabsContent value="sell" className="mt-8">
          <SellerDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
