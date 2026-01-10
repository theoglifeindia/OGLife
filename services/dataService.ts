import { Product, Order, BusinessInfo } from '../types';

const DEFAULT_MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Hello Nature – Pesticide-Free Toor Daal',
    description: 'Our Toor Daal is traditionally sourced from certified farmers who strictly avoid harmful chemicals. Naturally grown and unpolished to retain maximum nutrition.',
    price: 180,
    images: [
      'https://images.unsplash.com/photo-1585994794613-ad91f97f2143?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop'
    ],
    category: 'Daals',
    variants: [
      { weight: '500g', price: 180 },
      { weight: '1kg', price: 350 }
    ],
    stock: 50,
    isFeatured: true
  },
  {
    id: '2',
    name: 'Hello Nature – Pesticide-Free Akkha Masoor',
    description: 'Whole Red Lentils (Akkha Masoor) harvested with care. Lab-tested for safety to ensure zero pesticide residue. A perfect protein source.',
    price: 160,
    images: [
      'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?q=80&w=2000&auto=format&fit=crop'
    ],
    category: 'Daals',
    variants: [
      { weight: '500g', price: 160 },
      { weight: '1kg', price: 310 }
    ],
    stock: 40,
    isFeatured: true
  },
  {
    id: '3',
    name: 'Hello Nature – Pesticide-Free Chana Daal',
    description: 'Premium Chana Daal sourced from natural farming belts. Free from artificial colors and polishing agents. Taste the authentic difference.',
    price: 140,
    images: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop'
    ],
    category: 'Daals',
    variants: [
      { weight: '500g', price: 140 },
      { weight: '1kg', price: 270 }
    ],
    stock: 60,
    isFeatured: false
  }
];

const DEFAULT_BUSINESS_INFO: BusinessInfo = {
  address: "123 Earthy Roots Lane, Green Belt, Mumbai, Maharashtra 400001",
  phone: "+91 98765 43210",
  email: "support@theoglife.in",
  fssaiNo: "12345678901234",
  gstNo: "27AAAAA0000A1Z5",
  instagram: "@theoglife.natural",
  heroImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop"
};

const getLocalProducts = (): Product[] => {
  const saved = localStorage.getItem('og_life_products');
  return saved ? JSON.parse(saved) : DEFAULT_MOCK_PRODUCTS;
};

const saveLocalProducts = (products: Product[]) => {
  localStorage.setItem('og_life_products', JSON.stringify(products));
};

export const getBusinessInfo = async (): Promise<BusinessInfo> => {
  const saved = localStorage.getItem('og_business_info');
  return saved ? JSON.parse(saved) : DEFAULT_BUSINESS_INFO;
};

export const updateBusinessInfo = async (info: BusinessInfo): Promise<void> => {
  localStorage.setItem('og_business_info', JSON.stringify(info));
};

export const getProducts = async (): Promise<Product[]> => {
  return new Promise(resolve => setTimeout(() => resolve(getLocalProducts()), 600));
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  const products = getLocalProducts();
  return new Promise(resolve => 
    setTimeout(() => resolve(products.find(p => p.id === id)), 400)
  );
};

export const addProduct = async (product: Omit<Product, 'id'>): Promise<void> => {
  const products = getLocalProducts();
  const newProduct = { ...product, id: `local-${Date.now()}` } as Product;
  saveLocalProducts([...products, newProduct]);
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<void> => {
  const products = getLocalProducts();
  const updatedProducts = products.map(p => p.id === id ? { ...p, ...updates } : p);
  saveLocalProducts(updatedProducts);
};

export const deleteProduct = async (id: string): Promise<void> => {
  const products = getLocalProducts();
  const filtered = products.filter(p => p.id !== id);
  saveLocalProducts(filtered);
};

export const createOrder = async (order: Omit<Order, 'id' | 'createdAt'>): Promise<string> => {
  return new Promise(resolve => setTimeout(() => resolve(`LOCAL-ORDER-${Math.floor(Math.random() * 10000)}`), 1000));
};

export const seedProducts = async () => {
  saveLocalProducts(DEFAULT_MOCK_PRODUCTS);
  localStorage.removeItem('og_business_info');
  window.location.reload();
};