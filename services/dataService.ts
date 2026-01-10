import { db } from './firebase';
import { collection, getDocs, doc, getDoc, addDoc, Timestamp, setDoc, updateDoc, deleteDoc, query, limit } from 'firebase/firestore';
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

// Auto-detect if Firebase is properly configured via env vars
const IS_FIREBASE_CONFIGURED = 
  process.env.REACT_APP_FIREBASE_API_KEY && 
  process.env.REACT_APP_FIREBASE_API_KEY !== "demo-key";

const USE_MOCK = !IS_FIREBASE_CONFIGURED;

const getLocalProducts = (): Product[] => {
  const saved = localStorage.getItem('og_life_products');
  return saved ? JSON.parse(saved) : DEFAULT_MOCK_PRODUCTS;
};

const saveLocalProducts = (products: Product[]) => {
  localStorage.setItem('og_life_products', JSON.stringify(products));
};

export const getBusinessInfo = async (): Promise<BusinessInfo> => {
  if (USE_MOCK) {
    const saved = localStorage.getItem('og_business_info');
    return saved ? JSON.parse(saved) : DEFAULT_BUSINESS_INFO;
  }
  try {
    const docRef = doc(db, 'settings', 'businessInfo');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as BusinessInfo;
    } else {
      // Seed default info to cloud if it doesn't exist
      await setDoc(docRef, DEFAULT_BUSINESS_INFO);
      return DEFAULT_BUSINESS_INFO;
    }
  } catch (error) {
    console.warn("Firestore error, falling back to local defaults:", error);
    return DEFAULT_BUSINESS_INFO;
  }
};

export const updateBusinessInfo = async (info: BusinessInfo): Promise<void> => {
  if (USE_MOCK) {
    localStorage.setItem('og_business_info', JSON.stringify(info));
    return;
  }
  await setDoc(doc(db, 'settings', 'businessInfo'), info);
};

export const getProducts = async (): Promise<Product[]> => {
  if (USE_MOCK) {
    return new Promise(resolve => setTimeout(() => resolve(getLocalProducts()), 600));
  }

  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    
    if (products.length === 0) {
      // Seed default products to cloud if empty
      console.log("Seeding products to Firestore...");
      for (const p of DEFAULT_MOCK_PRODUCTS) {
        const { id, ...data } = p;
        await addDoc(collection(db, 'products'), data);
      }
      return DEFAULT_MOCK_PRODUCTS;
    }
    return products;
  } catch (error) {
    console.warn("Firebase fetch failed, using local fallback:", error);
    return getLocalProducts();
  }
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  if (USE_MOCK) {
    const products = getLocalProducts();
    return new Promise(resolve => 
      setTimeout(() => resolve(products.find(p => p.id === id)), 400)
    );
  }

  try {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    return undefined;
  } catch (error) {
    const products = getLocalProducts();
    return products.find(p => p.id === id);
  }
};

export const addProduct = async (product: Omit<Product, 'id'>): Promise<void> => {
  if (USE_MOCK) {
    const products = getLocalProducts();
    const newProduct = { ...product, id: `mock-${Date.now()}` } as Product;
    saveLocalProducts([...products, newProduct]);
    return;
  }
  await addDoc(collection(db, 'products'), product);
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<void> => {
  if (USE_MOCK) {
    const products = getLocalProducts();
    const updatedProducts = products.map(p => p.id === id ? { ...p, ...updates } : p);
    saveLocalProducts(updatedProducts);
    return;
  }
  await updateDoc(doc(db, 'products', id), updates);
};

export const deleteProduct = async (id: string): Promise<void> => {
  if (USE_MOCK) {
    const products = getLocalProducts();
    const filtered = products.filter(p => p.id !== id);
    saveLocalProducts(filtered);
    return;
  }
  await deleteDoc(doc(db, 'products', id));
};

export const createOrder = async (order: Omit<Order, 'id' | 'createdAt'>): Promise<string> => {
  const newOrder = {
    ...order,
    createdAt: Timestamp.now(),
    status: 'pending'
  };

  if (USE_MOCK) {
    return new Promise(resolve => setTimeout(() => resolve(`MOCK-ORDER-${Math.floor(Math.random() * 10000)}`), 1000));
  }

  try {
    const docRef = await addDoc(collection(db, 'orders'), newOrder);
    return docRef.id;
  } catch (error) {
    throw new Error("Could not process order");
  }
};

export const seedProducts = async () => {
  if (USE_MOCK) {
    saveLocalProducts(DEFAULT_MOCK_PRODUCTS);
    localStorage.removeItem('og_business_info');
    window.location.reload();
    return;
  }
  // For production, you could add an admin-only seed button if needed
};