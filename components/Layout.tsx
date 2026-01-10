import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Leaf, User, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Layout: React.FC = () => {
  const { cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const isActive = (path: string) => location.pathname === path ? "text-brand-main font-bold" : "text-gray-600 hover:text-brand-main";

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group" onClick={closeMenu}>
              <div className="bg-brand-cream p-2.5 rounded-full group-hover:bg-brand-main transition duration-500">
                <Leaf className="h-6 w-6 md:h-7 md:w-7 text-brand-main group-hover:text-white transition duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl md:text-3xl font-bold text-brand-dark leading-none tracking-tight">The OG Life</span>
              </div>
            </Link>

            {/* Desktop Nav - Centered */}
            <nav className="hidden md:flex space-x-12">
              <Link to="/" className={`${isActive('/')} text-sm font-bold uppercase tracking-[0.15em] transition-colors hover:scale-105 transform duration-200`}>Home</Link>
              <Link to="/shop" className={`${isActive('/shop')} text-sm font-bold uppercase tracking-[0.15em] transition-colors hover:scale-105 transform duration-200`}>Shop</Link>
              <Link to="/about" className={`${isActive('/about')} text-sm font-bold uppercase tracking-[0.15em] transition-colors hover:scale-105 transform duration-200`}>About</Link>
              <Link to="/contact" className={`${isActive('/contact')} text-sm font-bold uppercase tracking-[0.15em] transition-colors hover:scale-105 transform duration-200`}>Contact</Link>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-5 md:space-x-8">
              <Link to="/admin" className="text-gray-400 hover:text-brand-dark transition transform hover:scale-110" title="Admin Login">
                <User className="h-6 w-6" />
              </Link>

              <Link to="/cart" className="relative text-brand-dark hover:text-brand-gold transition group">
                <ShoppingBag className="h-6 w-6 md:h-7 md:w-7 group-hover:scale-110 transition duration-200" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-main text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm border border-white">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              <button 
                className="md:hidden text-brand-dark p-1"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        <div className={`fixed inset-0 z-40 bg-brand-cream/95 backdrop-blur-xl transform transition-transform duration-500 ease-in-out md:hidden flex flex-col justify-center items-center ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{top: '0'}}>
            <button 
                className="absolute top-6 right-6 text-brand-dark p-2"
                onClick={closeMenu}
            >
                <X className="h-8 w-8" />
            </button>
            
            <nav className="flex flex-col space-y-8 text-center">
              <Link to="/" onClick={closeMenu} className="font-serif text-4xl text-brand-dark hover:text-brand-main transition font-bold">Home</Link>
              <Link to="/shop" onClick={closeMenu} className="font-serif text-4xl text-brand-dark hover:text-brand-main transition font-bold">Shop</Link>
              <Link to="/about" onClick={closeMenu} className="font-serif text-4xl text-brand-dark hover:text-brand-main transition font-bold">About Us</Link>
              <Link to="/contact" onClick={closeMenu} className="font-serif text-4xl text-brand-dark hover:text-brand-main transition font-bold">Contact</Link>
              <div className="w-12 h-1 bg-brand-gold mx-auto my-4 rounded-full"></div>
              <Link to="/admin" onClick={closeMenu} className="text-sm font-sans uppercase tracking-widest text-gray-500 hover:text-brand-dark">Admin Access</Link>
            </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
                 <div className="bg-white/10 p-2.5 rounded-full">
                    <Leaf className="h-6 w-6 text-brand-light" />
                 </div>
                 <span className="font-serif text-2xl font-bold tracking-wide">The OG Life</span>
            </div>
            <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-sm">
              Reconnecting you with the roots of tradition. We bring you farm-fresh, pesticide-free staples that honor the earth and your health.
            </p>
          </div>

          <div className="flex flex-col">
            <h4 className="font-bold text-brand-gold uppercase tracking-[0.2em] text-xs mb-8">Shop</h4>
            <ul className="space-y-4 text-base text-gray-300">
              <li><Link to="/shop" className="hover:text-white transition flex items-center group"><ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" /> All Products</Link></li>
              <li><Link to="/shop" className="hover:text-white transition flex items-center group"><ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" /> New Arrivals</Link></li>
              <li><Link to="/cart" className="hover:text-white transition flex items-center group"><ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" /> View Cart</Link></li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="font-bold text-brand-gold uppercase tracking-[0.2em] text-xs mb-8">Company</h4>
            <ul className="space-y-4 text-base text-gray-300">
              <li><Link to="/about" className="hover:text-white transition flex items-center group"><ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" /> Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-white transition flex items-center group"><ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" /> Contact Us</Link></li>
              <li><Link to="/terms" className="hover:text-white transition flex items-center group"><ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" /> Privacy & Terms</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h4 className="font-bold text-brand-gold uppercase tracking-[0.2em] text-xs mb-8">Newsletter</h4>
            <p className="text-gray-300 text-base mb-6 leading-relaxed">Subscribe for updates on harvest seasons and exclusive offers.</p>
            <form className="flex w-full">
              <input type="email" placeholder="Your email" className="px-5 py-3 w-full text-brand-dark focus:outline-none rounded-l-sm bg-brand-cream" />
              <button className="bg-brand-gold text-white px-6 py-3 hover:bg-amber-700 transition rounded-r-sm font-bold tracking-wider">GO</button>
            </form>
          </div>
        </div>
        <div className="border-t border-white/10 mt-16 pt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} The OG Life. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;