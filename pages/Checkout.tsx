import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/dataService';
import { Loader2 } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        ...formData,
        items: cart,
        totalAmount: cartTotal,
        status: 'pending' as const
      };

      await createOrder(orderData);
      clearCart();
      navigate('/order-confirmation');
    } catch (error) {
      alert("Failed to process order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) return null; // Should redirect ideally

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-serif text-3xl font-bold text-brand-dark mb-8 text-center">Checkout</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-6 text-gray-900 border-b pb-2">Shipping Information</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              required
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              type="text" 
              className="w-full border-gray-300 border px-4 py-2 focus:ring-brand-gold focus:border-brand-gold outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email" 
              className="w-full border-gray-300 border px-4 py-2 focus:ring-brand-gold focus:border-brand-gold outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea 
              required
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3} 
              className="w-full border-gray-300 border px-4 py-2 focus:ring-brand-gold focus:border-brand-gold outline-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input 
                required
                name="city"
                value={formData.city}
                onChange={handleChange}
                type="text" 
                className="w-full border-gray-300 border px-4 py-2 focus:ring-brand-gold focus:border-brand-gold outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
              <input 
                required
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                type="text" 
                className="w-full border-gray-300 border px-4 py-2 focus:ring-brand-gold focus:border-brand-gold outline-none" 
              />
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-bold text-gray-900">Total Amount</span>
            <span className="font-serif text-2xl font-bold text-brand-dark">₹{cartTotal}</span>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-brand-gold text-white py-4 font-bold tracking-widest uppercase hover:bg-amber-700 transition flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;