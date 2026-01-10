import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';
import { getProductById } from '../services/dataService';
import { useCart } from '../context/CartContext';
import { Loader2, Shield, Check, Minus, Plus } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedWeight, setSelectedWeight] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>('');
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const data = await getProductById(id);
        if (data) {
          setProduct(data);
          // Default to first variant
          if (data.variants && data.variants.length > 0) {
            setSelectedWeight(data.variants[0].weight);
            setCurrentPrice(data.variants[0].price);
          }
          if (data.images && data.images.length > 0) {
            setActiveImage(data.images[0]);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleWeightChange = (weight: string) => {
    if (!product) return;
    const variant = product.variants.find(v => v.weight === weight);
    if (variant) {
      setSelectedWeight(weight);
      setCurrentPrice(variant.price);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, selectedWeight, quantity, currentPrice);
    alert("Added to cart!");
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center"><Loader2 className="animate-spin text-brand-main h-12 w-12" /></div>;
  if (!product) return <div className="min-h-screen flex justify-center items-center text-xl">Product not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <div className="mb-10 text-sm text-gray-500 uppercase tracking-widest font-medium">
        <Link to="/" className="hover:text-brand-main transition">Home</Link> / 
        <Link to="/shop" className="hover:text-brand-main ml-2 transition">Shop</Link> / 
        <span className="text-gray-900 ml-2 font-bold">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Image Gallery */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-4 sm:p-8 border border-gray-100 shadow-sm overflow-hidden aspect-square rounded-xl">
            <img 
              src={activeImage} 
              alt={product.name}
              className="w-full h-full object-contain hover:scale-105 transition duration-500"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
              {product.images.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-200 snap-start ${
                    activeImage === img 
                      ? 'border-brand-main ring-2 ring-brand-main/20' 
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} view ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <div className="text-brand-gold uppercase tracking-[0.2em] font-bold text-sm mb-4">Hello Nature Collection</div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-dark font-bold mb-6 leading-tight">{product.name}</h1>
          
          <div className="flex items-center space-x-3 text-brand-main mb-8 bg-brand-main/5 w-fit px-4 py-2 rounded-full">
            <Shield className="h-5 w-5" />
            <span className="font-bold text-sm tracking-wide uppercase">Lab Tested | Pesticide-Free</span>
          </div>

          <p className="text-gray-600 leading-relaxed mb-10 text-lg font-light">
            {product.description}
          </p>

          <div className="mb-10">
            <span className="block text-sm font-bold text-brand-dark mb-4 uppercase tracking-wider">Select Weight</span>
            <div className="flex flex-wrap gap-4">
              {product.variants.map(variant => (
                <button
                  key={variant.weight}
                  onClick={() => handleWeightChange(variant.weight)}
                  className={`px-8 py-3 border-2 text-base font-bold rounded transition-all duration-200 min-w-[100px] ${
                    selectedWeight === variant.weight 
                      ? 'border-brand-main bg-brand-main text-white shadow-lg transform scale-105' 
                      : 'border-gray-200 text-gray-600 hover:border-brand-main hover:text-brand-main bg-white'
                  }`}
                >
                  {variant.weight}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center mb-10 gap-8">
            <span className="text-5xl font-serif font-bold text-brand-dark">₹{currentPrice}</span>
            
            <div className="flex items-center border-2 border-gray-200 bg-white rounded-lg">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-4 hover:bg-gray-50 text-gray-600 transition"
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="px-6 font-bold text-xl text-gray-900 min-w-[3rem] text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-4 hover:bg-gray-50 text-gray-600 transition"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-full bg-brand-dark text-white py-5 rounded-sm font-bold tracking-[0.2em] uppercase text-lg hover:bg-brand-main transition mb-8 shadow-xl shadow-brand-dark/20 active:transform active:scale-95"
          >
            Add to Cart
          </button>

          <div className="bg-[#f9f9f9] p-8 rounded-xl space-y-4 border border-gray-100">
            <div className="flex items-start">
              <Check className="h-6 w-6 text-brand-main mr-4 mt-0.5 flex-shrink-0" />
              <p className="text-base text-gray-700 font-medium">Sourced from traditional farms using ancient methods.</p>
            </div>
            <div className="flex items-start">
              <Check className="h-6 w-6 text-brand-main mr-4 mt-0.5 flex-shrink-0" />
              <p className="text-base text-gray-700 font-medium">No artificial polish, preservatives, or colors.</p>
            </div>
            <div className="flex items-start">
              <Check className="h-6 w-6 text-brand-main mr-4 mt-0.5 flex-shrink-0" />
              <p className="text-base text-gray-700 font-medium">Hygienically packed to retain maximum freshness and nutrients.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;