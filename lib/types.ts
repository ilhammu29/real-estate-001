export interface Property {
  id: string;
  title: string;
  slug: string;
  price: string;
  priceNum: number;
  category: "cantilever" | "cottage" | "mansion" | "penthouse" | "all";
  location: string;
  landArea: number;
  buildingArea: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
  badge?: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  villa: string;
  preferredDate?: string;
  notes?: string;
  status: "new" | "contacted" | "scheduled" | "completed";
  createdAt: string;
}
