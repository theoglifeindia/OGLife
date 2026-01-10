export interface Variant {
  weight: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string; // No "Organic" allowed here
  price: number; // Represents the "Starting from" price
  images: string[];
  category: string;
  variants: Variant[]; // Replaces simple weightOptions
  stock: number;
  isFeatured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedWeight: string;
  unitPrice: number; // The specific price for the selected weight
}

export interface Order {
  id?: string;
  customerName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped';
  createdAt: any; // Firestore Timestamp or Date
}

export interface Banner {
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}