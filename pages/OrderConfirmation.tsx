import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="bg-brand-cream p-6 rounded-full mb-6">
        <CheckCircle className="h-16 w-16 text-brand-main" />
      </div>
      <h1 className="font-serif text-4xl text-brand-dark mb-4">Thank you for your order!</h1>
      <p className="text-gray-600 max-w-md mb-8">
        Your farm-fresh goodness is being prepared. We have sent a confirmation email with your order details.
      </p>
      <Link to="/" className="text-brand-gold font-bold hover:underline">Return to Home</Link>
    </div>
  );
};

export default OrderConfirmation;