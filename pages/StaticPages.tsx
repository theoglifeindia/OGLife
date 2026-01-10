import React from 'react';

export const About: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-20">
    <h1 className="font-serif text-4xl text-center text-brand-dark mb-10">Our Story</h1>
    <div className="prose prose-lg mx-auto text-gray-600">
      <p className="mb-6">
        At <span className="font-bold text-brand-dark">The OG Life</span>, we believe that food should be simple, honest, and pure. In a world full of processing and additives, we decided to go back to the roots.
      </p>
      <p className="mb-6">
        Our brand philosophy is centered around the organic way of living—living in harmony with nature. While modern agriculture chases yield, we chase quality.
      </p>
      <h3 className="font-serif text-2xl text-brand-dark mt-8 mb-4">The Hello Nature Promise</h3>
      <p>
        Under our Hello Nature product line, we bring you staples that are free from harmful pesticides. We work directly with farmers who still use traditional methods, ensuring that every grain of Daal you consume is as safe as it is delicious.
      </p>
    </div>
  </div>
);

export const Contact: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 py-20">
    <h1 className="font-serif text-4xl text-center text-brand-dark mb-10">Contact Us</h1>
    <div className="bg-white p-8 shadow-sm border border-gray-100">
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
          <input type="text" className="w-full border border-gray-300 px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
          <input type="email" className="w-full border border-gray-300 px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Message</label>
          <textarea rows={4} className="w-full border border-gray-300 px-4 py-2"></textarea>
        </div>
        <button className="bg-brand-dark text-white px-8 py-3 w-full uppercase tracking-wider font-bold">Send Message</button>
      </form>
    </div>
  </div>
);

export const Legal: React.FC = () => (
    <div className="max-w-4xl mx-auto px-4 py-20 text-gray-600">
        <h1 className="font-serif text-3xl mb-6 text-brand-dark">Terms & Conditions</h1>
        <p className="mb-4">Welcome to The OG Life. By using this website, you agree to our terms.</p>
        <p className="mb-8">All products sold under "Hello Nature" are guaranteed pesticide-free.</p>
        
        <h1 className="font-serif text-3xl mb-6 text-brand-dark">Privacy Policy</h1>
        <p>We respect your privacy. We collect data solely for processing orders.</p>
    </div>
);