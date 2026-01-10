import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { getProducts } from '../services/dataService';
import { Loader2 } from 'lucide-react';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader2 className="h-10 w-10 text-brand-main animate-spin" />
    </div>
  );

  if (error) return (
    <div className="min-h-[60vh] flex items-center justify-center text-red-600 text-lg font-medium">
      {error}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div className="text-center mb-20">
        <h1 className="font-serif text-5xl md:text-7xl text-brand-dark mb-6 font-bold">The Collection</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed font-light">
          Explore our range of <span className="font-bold text-brand-main">Hello Nature</span> pantry staples. Authentically sourced, pesticide-free, and wholesome.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {products.map(product => (
          <div key={product.id} className="group flex flex-col">
            <Link to={`/product/${product.id}`} className="block overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-2xl transition duration-500 border border-gray-100 h-full flex flex-col">
              <div className="relative aspect-square overflow-hidden bg-gray-50 p-6">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition duration-700 ease-in-out"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="text-xs text-brand-gold uppercase tracking-[0.2em] font-bold mb-3">Hello Nature</div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark mb-4 group-hover:text-brand-main transition leading-tight">
                  {product.name}
                </h3>
                <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-end">
                  <div>
                    <span className="text-xs text-gray-500 block uppercase tracking-wide mb-1">Starting from</span>
                    <span className="text-2xl font-bold text-brand-dark">₹{product.price}</span>
                  </div>
                  <div className="bg-brand-cream px-3 py-1 rounded text-sm text-brand-dark font-medium">
                     {product.variants.length > 0 ? product.variants[0].weight : 'N/A'}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;