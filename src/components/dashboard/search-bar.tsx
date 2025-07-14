'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (filters: { district: string; taluka: string; village: string }) => void;
  onReset: () => void;
}

const locationData = {
  'Pune': { 'Haveli': ['Wagholi', 'Manjri'], 'Maval': ['Lonavla', 'Kamshet'] },
  'Mumbai': { 'Andheri': ['Vile Parle', 'Juhu'], 'Borivali': ['Dahisar', 'Kandivali'] },
};

export function SearchBar({ onSearch, onReset }: SearchBarProps) {
  const [district, setDistrict] = useState('');
  const [taluka, setTaluka] = useState('');
  const [village, setVillage] = useState('');

  const handleDistrictChange = (value: string) => {
    setDistrict(value);
    setTaluka('');
    setVillage('');
  };

  const handleTalukaChange = (value: string) => {
    setTaluka(value);
    setVillage('');
  };

  const handleSearch = () => {
    onSearch({ district, taluka, village });
  };
  
  const handleReset = () => {
    setDistrict('');
    setTaluka('');
    setVillage('');
    onReset();
  };


  return (
    <Card className="shadow-lg">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div className="lg:col-span-1">
            <label className="text-sm font-medium">District</label>
            <Select value={district} onValueChange={handleDistrictChange}>
              <SelectTrigger><SelectValue placeholder="Select District" /></SelectTrigger>
              <SelectContent>
                {Object.keys(locationData).map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="lg:col-span-1">
            <label className="text-sm font-medium">Taluka</label>
            <Select value={taluka} onValueChange={handleTalukaChange} disabled={!district}>
              <SelectTrigger><SelectValue placeholder="Select Taluka" /></SelectTrigger>
              <SelectContent>
                {district && Object.keys(locationData[district as keyof typeof locationData]).map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="lg:col-span-1">
            <label className="text-sm font-medium">Village</label>
            <Select value={village} onValueChange={setVillage} disabled={!taluka}>
              <SelectTrigger><SelectValue placeholder="Select Village" /></SelectTrigger>
              <SelectContent>
                {taluka && locationData[district as keyof typeof locationData][taluka as keyof typeof locationData[keyof typeof locationData]].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 lg:col-span-2">
            <Button onClick={handleSearch} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
            <Button onClick={handleReset} variant="outline" className="w-full">
              <X className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
