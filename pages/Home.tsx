import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Sprout, ShieldCheck, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { getProducts } from '../services/dataService';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const all = await getProducts();
      // Filter featured, or just take the first 3 if none featured
      const featured = all.filter(p => p.isFeatured);
      setFeaturedProducts(featured.length > 0 ? featured.slice(0, 3) : all.slice(0, 3));
    };
    fetchFeatured();
  }, []);

  return (
    <div className="bg-white w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-[#fdfcf7] min-h-[calc(100vh-80px)] flex items-center overflow-hidden py-12 md:py-0">
        <div className="container max-w-7xl mx-auto px-6 lg:px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center h-full">
          
          {/* Text Content */}
          <div className="text-center md:text-left order-2 md:order-1 flex flex-col items-center md:items-start">
            <h2 className="text-brand-light font-sans tracking-[0.3em] uppercase font-bold text-xs md:text-sm mb-6 animate-fade-in-up">
              Let's Pledge For
            </h2>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#2c3e2e] font-bold leading-[1.1] mb-6">
              ORGANIC <br/>
              <span className="text-brand-main text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight block mt-2">PESTICIDE-FREE FOOD</span>
            </h1>
            
            <div className="my-8 md:my-10 relative inline-block group">
                <div className="bg-amber-400 text-brand-dark font-extrabold text-xs md:text-sm px-5 py-1.5 rounded-full uppercase tracking-widest inline-block mb-3 transform -rotate-2 group-hover:rotate-0 transition duration-300">
                    New Year Sale
                </div>
                <div className="flex items-baseline justify-center md:justify-start">
                    <span className="text-7xl md:text-9xl font-black text-brand-main leading-none drop-shadow-sm">28</span>
                    <div className="flex flex-col ml-3 text-left">
                        <span className="text-3xl md:text-5xl font-bold text-brand-main">%</span>
                        <span className="text-2xl md:text-3xl font-bold text-brand-main uppercase tracking-wide">OFF</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 items-center mt-4 w-full md:w-auto">
                <div className="border-2 border-dashed border-brand-gold px-8 py-3 rounded-sm bg-white w-full sm:w-auto">
                    <span className="text-gray-500 text-sm mr-2 font-medium uppercase tracking-wide">Use Code:</span>
                    <span className="font-bold text-brand-dark text-xl">PLEDGE28</span>
                </div>
                <Link to="/shop" className="bg-brand-dark text-white px-10 py-4 rounded-sm hover:bg-brand-main transition duration-300 font-bold uppercase tracking-[0.2em] text-sm flex items-center justify-center shadow-lg hover:shadow-xl w-full sm:w-auto group">
                    Shop Now <ArrowRight className="ml-3 h-4 w-4 transform group-hover:translate-x-1 transition" />
                </Link>
            </div>
          </div>

          {/* Hero Image Composition */}
          <div className="relative h-full flex items-center justify-center order-1 md:order-2">
             <div className="relative w-full max-w-sm md:max-w-xl aspect-square">
                 {/* Decorative background circle */}
                 <div className="absolute inset-0 bg-brand-light/20 rounded-full scale-90 blur-3xl animate-pulse"></div>
                 
                 {/* Main composition image */}
                 <img 
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop" 
                    alt="Organic Basket" 
                    className="relative z-10 w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition duration-700 ease-out"
                 />
                 
                 {/* Floating badge */}
                 <div className="absolute top-0 right-0 md:top-10 md:-right-4 bg-white p-4 rounded-full shadow-xl z-20 animate-bounce-slow">
                    <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-brand-main" />
                 </div>
             </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <section className="bg-brand-main py-8 text-white">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-center md:justify-around gap-6 text-base md:text-lg font-bold tracking-wide text-center">
              <div className="flex items-center justify-center gap-3">
                  <CheckCircle className="h-6 w-6 text-amber-300" /> 100% Pesticide Free
              </div>
              <div className="hidden md:block w-px h-8 bg-white/20"></div>
              <div className="flex items-center justify-center gap-3">
                  <Sprout className="h-6 w-6 text-amber-300" /> Ethically Sourced
              </div>
              <div className="hidden md:block w-px h-8 bg-white/20"></div>
              <div className="flex items-center justify-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-amber-300" /> Lab Tested
              </div>
          </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-gold uppercase tracking-[0.25em] text-xs font-bold block mb-4">Hello Nature Collection</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark font-bold">Best Selling Products</h2>
            <div className="w-24 h-1.5 bg-brand-main mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
            {featuredProducts.map(product => (
              <Link key={product.id} to={`/product/${product.id}`} className="group bg-white rounded-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col border border-gray-100/50">
                <div className="relative aspect-square bg-[#f8f8f8] overflow-hidden p-8 flex items-center justify-center">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition duration-700 ease-in-out"
                  />
                  {/* Quick Action Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-sm py-4 translate-y-full group-hover:translate-y-0 transition duration-300 flex justify-center border-t border-gray-100">
                      <span className="text-brand-dark font-bold text-xs uppercase tracking-widest flex items-center">
                          <ShoppingBag className="w-4 h-4 mr-2" /> View Details
                      </span>
                  </div>
                </div>
                
                <div className="p-8 flex-grow flex flex-col items-center text-center bg-white relative z-10">
                  <div className="absolute -top-3">
                    <div className="text-[10px] text-white font-bold bg-brand-main px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        Pesticide Free
                    </div>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-gold transition line-clamp-2 mt-2">
                    {product.name}
                  </h3>
                  <div className="mt-auto w-full pt-4 border-t border-gray-100">
                      <p className="text-2xl font-bold text-brand-dark font-serif">₹{product.price}<span className="text-sm font-sans font-normal text-gray-400 ml-1">/ onwards</span></p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <Link to="/shop" className="inline-block border-2 border-brand-dark text-brand-dark px-12 py-4 font-bold hover:bg-brand-dark hover:text-white transition duration-300 uppercase tracking-[0.2em] text-sm rounded-sm">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Values / Info Graphic Section */}
      <section className="bg-brand-cream py-24 relative overflow-hidden">
         {/* Background decorative elements */}
         <div className="absolute -left-20 top-20 opacity-5 text-brand-main">
             <Sprout size={400} />
         </div>

         <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
             <div className="order-2 md:order-1">
                 <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark font-bold mb-8 leading-tight">
                     Why We Say <br/><span className="text-brand-gold italic">"No"</span> To Pesticides
                 </h2>
                 <p className="text-gray-600 mb-10 leading-loose text-lg font-light">
                     Modern agriculture often relies on chemicals that stay on your food long after harvest. At <span className="font-bold text-brand-dark">The OG Life</span>, our Hello Nature range ensures that you eat what nature intended — pure, wholesome, and untainted.
                 </p>
                 <ul className="space-y-6">
                     <li className="flex items-center text-brand-dark font-bold text-lg">
                         <div className="w-12 h-12 bg-brand-main text-white rounded-full flex items-center justify-center mr-5 shadow-lg flex-shrink-0">
                             <CheckCircle className="w-6 h-6" />
                         </div>
                         Better for your gut health
                     </li>
                     <li className="flex items-center text-brand-dark font-bold text-lg">
                         <div className="w-12 h-12 bg-brand-main text-white rounded-full flex items-center justify-center mr-5 shadow-lg flex-shrink-0">
                             <Sprout className="w-6 h-6" />
                         </div>
                         Environmentally sustainable farming
                     </li>
                     <li className="flex items-center text-brand-dark font-bold text-lg">
                         <div className="w-12 h-12 bg-brand-main text-white rounded-full flex items-center justify-center mr-5 shadow-lg flex-shrink-0">
                             <ShieldCheck className="w-6 h-6" />
                         </div>
                         Preserves authentic traditional taste
                     </li>
                 </ul>
             </div>
             <div className="order-1 md:order-2 flex justify-center">
                 <div className="relative">
                    <div className="absolute inset-0 bg-brand-gold/20 transform rotate-6 rounded-2xl"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1615485500704-8e99099928b3?q=80&w=2070&auto=format&fit=crop" 
                        alt="Grains close up" 
                        className="relative rounded-2xl shadow-2xl transform -rotate-3 hover:rotate-0 transition duration-700 w-full max-w-md"
                    />
                 </div>
             </div>
         </div>
      </section>
    </div>
  );
};

export default Home;