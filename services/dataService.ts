import { db } from './firebase';
import { collection, getDocs, doc, getDoc, addDoc, Timestamp, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Product, Order } from '../types';

// --- MOCK DATA FOR DEMO PURPOSES ---
const DEFAULT_MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Hello Nature – Pesticide-Free Toor Daal',
    description: 'Our Toor Daal is traditionally sourced from certified farmers who strictly avoid harmful chemicals. Naturally grown and unpolished to retain maximum nutrition.',
    price: 180,
    images: [
      'https://picsum.photos/seed/toor1/600/600',
      'https://picsum.photos/seed/toor2/600/600',
      'https://picsum.photos/seed/toor3/600/600'
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
      'https://picsum.photos/seed/masoor1/600/600',
      'https://picsum.photos/seed/masoor2/600/600'
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
      'https://picsum.photos/seed/chana1/600/600',
      'https://picsum.photos/seed/chana2/600/600',
      'https://picsum.photos/seed/chana3/600/600'
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

// Helper to determine if we should use mock data
const USE_MOCK = true; 

// LocalStorage Helper for Mock Data persistence
const getLocalProducts = (): Product[] => {
  const saved = localStorage.getItem('og_life_products');
  return saved ? JSON.parse(saved) : DEFAULT_MOCK_PRODUCTS;
};

const saveLocalProducts = (products: Product[]) => {
  localStorage.setItem('og_life_products', JSON.stringify(products));
};

export const getProducts = async (): Promise<Product[]> => {
  if (USE_MOCK) {
    return new Promise(resolve => setTimeout(() => resolve(getLocalProducts()), 600));
  }

  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    if (products.length === 0) return DEFAULT_MOCK_PRODUCTS;
    return products;
  } catch (error) {
    console.warn("Firebase fetch failed, using mock data:", error);
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

// --- ADMIN FUNCTIONS ---

export const addProduct = async (product: Omit<Product, 'id'>): Promise<void> => {
  if (USE_MOCK) {
    const products = getLocalProducts();
    const newProduct = { ...product, id: `mock-${Date.now()}` };
    saveLocalProducts([...products, newProduct]);
    return Promise.resolve();
  }

  try {
    await addDoc(collection(db, 'products'), product);
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<void> => {
  if (USE_MOCK) {
    const products = getLocalProducts();
    const updatedProducts = products.map(p => p.id === id ? { ...p, ...updates } : p);
    saveLocalProducts(updatedProducts);
    return Promise.resolve();
  }

  try {
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  if (USE_MOCK) {
    const products = getLocalProducts();
    const filtered = products.filter(p => p.id !== id);
    saveLocalProducts(filtered);
    return Promise.resolve();
  }

  try {
    await deleteDoc(doc(db, 'products', id));
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const createOrder = async (order: Omit<Order, 'id' | 'createdAt'>): Promise<string> => {
  const newOrder = {
    ...order,
    createdAt: Timestamp.now(),
    status: 'pending'
  };

  if (USE_MOCK) {
    console.log("Mock Order Created:", newOrder);
    return new Promise(resolve => setTimeout(() => resolve(`MOCK-ORDER-${Math.floor(Math.random() * 10000)}`), 1000));
  }

  try {
    const docRef = await addDoc(collection(db, 'orders'), newOrder);
    return docRef.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Could not process order");
  }
};

export const seedProducts = async () => {
  if (USE_MOCK) {
    alert("Reseting mock data to defaults...");
    saveLocalProducts(DEFAULT_MOCK_PRODUCTS);
    window.location.reload();
    return;
  }
  // Real firebase seeding logic omitted for brevity
};