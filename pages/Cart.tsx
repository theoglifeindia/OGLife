import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Minus, Plus, ArrowLeft } from 'lucide-react';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <h2 className="font-serif text-4xl text-brand-dark mb-6 font-bold">Your cart is empty</h2>
        <p className="text-gray-500 mb-10 text-lg">Looks like you haven't added any Hello Nature products yet.</p>
        <Link to="/shop" className="inline-block bg-brand-gold text-white px-10 py-4 rounded-sm hover:bg-amber-700 transition font-bold uppercase tracking-widest shadow-lg">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-dark mb-12">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map(item => (
            <div key={`${item.id}-${item.selectedWeight}`} className="flex flex-row bg-white p-4 sm:p-6 border border-gray-100 shadow-sm gap-4 sm:gap-8 items-start rounded-lg">
              <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden border border-gray-100">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-grow flex flex-col justify-between min-h-[6rem] sm:min-h-[8rem]">
                <div>
                    <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900 line-clamp-2 pr-2">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-600 transition p-1">
                        <Trash2 className="h-5 w-5" />
                    </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 mb-4">
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-medium">{item.selectedWeight}</span>
                        <span>₹{item.unitPrice} / unit</span>
                    </div>
                </div>
                
                <div className="flex justify-between items-end mt-auto">
                  <div className="flex items-center border border-gray-200 rounded bg-white">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 sm:p-2 hover:bg-gray-50 transition"
                    >
                      <Minus className="h-4 w-4 text-gray-600" />
                    </button>
                    <span className="px-3 sm:px-4 text-sm font-bold text-gray-900">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 sm:p-2 hover:bg-gray-50 transition"
                    >
                      <Plus className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <span className="font-bold text-xl text-brand-dark">₹{item.unitPrice * item.quantity}</span>
                </div>
              </div>
            </div>
          ))}

          <Link to="/shop" className="inline-flex items-center text-brand-main hover:text-brand-dark font-bold mt-8 tracking-wide uppercase text-sm group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition" /> Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 border border-gray-100 shadow-lg rounded-xl sticky top-28">
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-8">Order Summary</h3>
            
            <div className="space-y-4 mb-8 text-base">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-6 mb-8">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-gray-900">Total</span>
                <span className="font-serif text-3xl font-bold text-brand-dark">₹{cartTotal}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-brand-dark text-white py-5 font-bold uppercase tracking-[0.2em] hover:bg-brand-main transition rounded-sm shadow-md"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;