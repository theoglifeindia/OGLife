export interface Variant {
  weight: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; 
  images: string[];
  category: string;
  variants: Variant[];
  stock: number;
  isFeatured?: boolean;
}

export interface BusinessInfo {
  address: string;
  phone: string;
  email: string;
  fssaiNo: string;
  gstNo: string;
  instagram?: string;
  heroImage?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedWeight: string;
  unitPrice: number;
}

export interface Order {
  id?: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped';
  createdAt: any;
}

export interface Banner {
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}