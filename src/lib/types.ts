export interface LandListing {
  id: string;
  size: number;
  price: number;
  district: string;
  taluka: string;
  village: string;
  ownerName: string;
  ownerContact: string;
  image?: string; // base64 string
}
