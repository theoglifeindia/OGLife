
import React, { useState, useEffect } from 'react';
import { getBusinessInfo } from '../services/dataService';
import { BusinessInfo } from '../types';
// Added Sprout to the imports from lucide-react
import { MapPin, Phone, Mail, Instagram, Loader2, Heart, ShieldCheck, Sun, Leaf, Quote, Sprout } from 'lucide-react';

export const About: React.FC = () => (
  <div className="bg-white">
    {/* Hero Section */}
    <div className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Farmland" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 to-transparent"></div>
        <div className="relative z-10 text-center px-4 max-w-5xl">
            <span className="text-brand-gold font-sans tracking-[0.4em] uppercase font-bold text-sm mb-6 block animate-fade-in">Our Journey</span>
            <h1 className="font-serif text-5xl md:text-8xl text-white font-bold mb-8 drop-shadow-md">The Soul of the Soil</h1>
            <p className="text-brand-cream text-xl md:text-2xl font-light italic tracking-wide max-w-3xl mx-auto leading-relaxed">
              "When we honor the earth, we honor ourselves. When we protect the farmer, we protect our future."
            </p>
        </div>
    </div>

    {/* Content Section */}
    <div className="max-w-4xl mx-auto px-6 py-24 prose prose-xl prose-stone">
      <div className="flex justify-center mb-16">
          <Leaf className="h-16 w-16 text-brand-main animate-bounce-slow" />
      </div>
      
      <p className="leading-relaxed first-letter:text-8xl first-letter:font-serif first-letter:mr-4 first-letter:float-left first-letter:text-brand-main first-letter:leading-[0.8]">
        The story of <span className="font-bold text-brand-dark">The OG Life</span> is not a marketing strategy, nor is it the result of a corporate vision board. It is a story of reconnection. It began decades ago, in the golden, sun-drenched fields of our ancestral villages, where the air smelled of wet earth and dry hay, and where the rhythmic sound of the wooden plough was the only clock we needed. 
      </p>

      <p className="leading-relaxed mt-12">
        We remember the pre-dawn hours—the quiet dignity of the farmers as they set out before the sun could even touch the horizon. We saw their hands: calloused, weathered, and strong. Those hands didn't just sow seeds; they held a sacred trust. They understood a language that the modern world has largely forgotten—the language of the seasons, the wind, and the living soil. 
      </p>

      <div className="my-24 bg-brand-cream p-16 rounded-[3rem] border border-brand-light/20 relative overflow-hidden shadow-inner">
        <Quote className="absolute -top-6 -left-6 text-brand-gold/10 h-32 w-32" />
        <h3 className="font-serif text-3xl text-brand-dark mt-0 mb-8 italic text-center">A Sacred Pact with Nature</h3>
        <p className="m-0 text-gray-700 italic text-center text-2xl leading-relaxed">
          "The soil is our mother, the rain is our life-blood, and the farmer is the high-priest who connects the heaven to the table. At The OG Life, we bow to this ancient rhythm."
        </p>
      </div>

      <h3 className="font-serif text-4xl text-brand-dark mt-20 mb-10">The Silent Guardians of Heritage</h3>
      <p className="leading-relaxed">
        As the world outside grew faster, louder, and more clinical, a silent tragedy began to unfold. Agriculture became 'industry'. Crops became 'commodities'. And the farmer—the original steward of life—was reduced to a line item in a ledger. To chase higher yields and longer shelf lives, we began to poison the very ground that fed us. Chemicals were introduced, the soil was stripped of its spirit, and the food that graced our tables became a shadow of its former self. 
      </p>
      
      <p className="leading-relaxed">
        But in small corners of the country, a few resilient souls refused to surrender. They kept their heirloom seeds. They continued to use natural compost. They trusted in the ancient methods of crop rotation. They were the "Originals"—the practitioners of the OG life. We spent years walking these fields, sitting on string-cots under Banyan trees, and listening to their stories. We realized that if we didn't bridge the gap between their honesty and your table, this wisdom would be lost forever.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 my-28">
          <div className="relative group">
            <div className="absolute inset-0 bg-brand-gold/20 rounded-3xl transform rotate-3 group-hover:rotate-0 transition duration-500"></div>
            <img src="https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?q=80&w=1000&auto=format&fit=crop" className="relative rounded-3xl shadow-2xl h-full object-cover transition transform -rotate-3 group-hover:rotate-0 duration-500" alt="Authentic Pulses" />
          </div>
          <div className="flex flex-col justify-center">
              <span className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-4">Our Methodology</span>
              <h4 className="font-serif text-3xl text-brand-dark mb-6">The Purity Protocol</h4>
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                We do not simply 'source' products. We cultivate relationships. Every grain that carries the <strong>Hello Nature</strong> label has a lineage. It has been lab-tested not just for what it contains, but for what it <em>doesn't</em>—no pesticides, no artificial polish, no synthetic additives. We treat every packet as a letter of gratitude from the farm to your home.
              </p>
          </div>
      </div>

      <h3 className="font-serif text-4xl text-brand-dark mt-20 mb-10">A Gratitude That Feeds the Soul</h3>
      <p className="leading-relaxed">
        Our gratitude is not a platitude; it is our foundation. We are grateful to the rain that knows when to fall. We are grateful to the earth that remains patient despite the ways we have treated it. But most of all, we are grateful to the farmers. 
      </p>
      
      <p className="leading-relaxed">
        We are grateful to the hand that is calloused by the hoe, not the pen. We are grateful to the eyes that can tell a harvest is ready just by the shade of the leaf. We are grateful for the sweat that nurtures the Chana Daal and the patience that grows the Masoor. When you choose The OG Life, you are not just a 'consumer'. You are a participant in this gratitude. You are helping us ensure that a farmer can send their child to school without selling their soul to chemical giants. You are helping us keep the soil alive for another thousand years.
      </p>

      <div className="bg-brand-dark text-white p-12 md:p-16 rounded-[3rem] my-24 shadow-2xl relative overflow-hidden">
        <Sun className="absolute -bottom-10 -right-10 text-white/5 h-64 w-64" />
        <h3 className="font-serif text-3xl text-brand-gold mt-0 mb-8 italic">The Promise of Hello Nature</h3>
        <p className="text-xl leading-loose font-light opacity-90">
          We dream of a world where 'pesticide-free' isn't a premium choice, but a human right. We dream of a world where every meal is a celebration of life, not a calculated risk. Every time you open our unpolished lentils, every time you smell the authentic earthy aroma of our staples, you are coming home. You are returning to the OG way.
        </p>
      </div>

      <p className="leading-relaxed">
        This journey is long, and the path is often uphill. But we walk it with a smile, because we know what is at the end of it—your health, your family's safety, and the preservation of our collective heritage. Thank you for trusting us. Thank you for respecting the farmer. Thank you for living the OG life.
      </p>

      <div className="mt-32 pt-16 border-t border-gray-100 text-center">
          <div className="flex justify-center gap-10 mb-10">
              <Heart className="h-8 w-8 text-red-400 fill-red-400 animate-pulse" />
              <ShieldCheck className="h-8 w-8 text-brand-main" />
              <Sprout className="h-8 w-8 text-brand-gold" />
          </div>
          <p className="font-serif text-3xl text-brand-dark font-bold italic mb-2">With deepest humility and love,</p>
          <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-sm">The Founders of The OG Life</p>
      </div>
    </div>
  </div>
);

export const Contact: React.FC = () => {
    const [info, setInfo] = useState<BusinessInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

    useEffect(() => { getBusinessInfo().then(setInfo); }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        // Formatted Email Simulation
        const emailBody = `
            ===========================================
            NEW INQUIRY: THE OG LIFE CONTACT FORM
            ===========================================
            From: ${formData.name}
            Email: ${formData.email}
            Mobile: ${formData.phone}
            
            Message Content:
            -------------------------------------------
            ${formData.message}
            -------------------------------------------
            
            Recipient: ${info?.email || 'support@theoglife.in'}
            Timestamp: ${new Date().toLocaleString()}
            ===========================================
        `;
        
        setTimeout(() => {
            console.log("%c[EMAIL SIMULATION]", "color: #4a6741; font-weight: bold; font-size: 14px;");
            console.log(emailBody);
            setLoading(false);
            setSent(true);
            setFormData({ name: '', email: '', phone: '', message: '' });
            alert(`Thank you, ${formData.name}! Your message has been formatted and securely queued for transmission to ${info?.email || 'our team'}.`);
        }, 1800);
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div>
                <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold block mb-4">Connect With Us</span>
                <h1 className="font-serif text-5xl md:text-7xl text-brand-dark font-bold mb-10 leading-tight">We're Here For You.</h1>
                <p className="text-gray-600 text-xl font-light leading-relaxed mb-16 max-w-lg">
                    Questions about our harvest? Need help with an order? Our team in Mumbai is dedicated to your wholesome experience.
                </p>
                
                <div className="space-y-12">
                    <div className="flex gap-8 group">
                        <div className="h-16 w-16 bg-white rounded-3xl flex items-center justify-center text-brand-main shrink-0 border border-gray-100 shadow-sm group-hover:bg-brand-main group-hover:text-white transition-all duration-300">
                            <MapPin className="h-7 w-7" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-400 uppercase tracking-widest text-[10px] mb-2">Our Roots</h4>
                            <p className="text-brand-dark font-medium leading-relaxed text-lg">{info?.address || 'Mumbai, MH'}</p>
                        </div>
                    </div>
                    <div className="flex gap-8 group">
                        <div className="h-16 w-16 bg-white rounded-3xl flex items-center justify-center text-brand-main shrink-0 border border-gray-100 shadow-sm group-hover:bg-brand-main group-hover:text-white transition-all duration-300">
                            <Phone className="h-7 w-7" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-400 uppercase tracking-widest text-[10px] mb-2">Phone Lines</h4>
                            <p className="text-brand-dark font-medium text-xl">{info?.phone || '+91 ...'}</p>
                        </div>
                    </div>
                    <div className="flex gap-8 group">
                        <div className="h-16 w-16 bg-white rounded-3xl flex items-center justify-center text-brand-main shrink-0 border border-gray-100 shadow-sm group-hover:bg-brand-main group-hover:text-white transition-all duration-300">
                            <Mail className="h-7 w-7" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-400 uppercase tracking-widest text-[10px] mb-2">Official Email</h4>
                            <p className="text-brand-dark font-medium text-xl">{info?.email || 'support@theoglife.in'}</p>
                        </div>
                    </div>
                </div>
                
                {info?.fssaiNo && (
                    <div className="mt-20 pt-12 border-t border-gray-100">
                        <div className="grid grid-cols-2 gap-10">
                            <div>
                                <span className="block text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-2">FSSAI Lic. No.</span>
                                <span className="font-serif text-brand-dark font-bold text-lg">{info.fssaiNo}</span>
                            </div>
                            <div>
                                <span className="block text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-2">GST Identification</span>
                                <span className="font-serif text-brand-dark font-bold text-lg">{info.gstNo}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-white p-10 md:p-16 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[3rem] border border-gray-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-32 w-32 bg-brand-cream rounded-bl-[5rem] -mr-10 -mt-10"></div>
                <form className="space-y-10 relative z-10" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-3">
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Full Name</label>
                            <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" className="w-full border-b-2 border-gray-100 py-3 focus:border-brand-main outline-none transition bg-transparent font-medium" placeholder="Jane Doe" />
                        </div>
                        <div className="space-y-3">
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Email Address</label>
                            <input required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" className="w-full border-b-2 border-gray-100 py-3 focus:border-brand-main outline-none transition bg-transparent font-medium" placeholder="jane@example.com" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Mobile Number (Required)</label>
                        <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="tel" className="w-full border-b-2 border-gray-100 py-3 focus:border-brand-main outline-none transition bg-transparent font-medium text-xl" placeholder="+91 00000 00000" />
                    </div>
                    <div className="space-y-3">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Your Message</label>
                        <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={5} className="w-full border-2 border-gray-100 p-6 rounded-3xl focus:ring-2 focus:ring-brand-main outline-none transition resize-none font-medium text-gray-700" placeholder="Tell us how we can help..."></textarea>
                    </div>
                    <button type="submit" disabled={loading} className="bg-brand-dark text-white px-12 py-6 w-full uppercase tracking-[0.3em] font-bold rounded-2xl hover:bg-brand-main transition shadow-2xl shadow-brand-dark/30 flex justify-center items-center gap-4 text-sm">
                        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Dispatch Message"}
                    </button>
                    {sent && <p className="text-center text-brand-main font-bold animate-fade-in">Thank you! Your message has been sent.</p>}
                </form>
            </div>
        </div>
    );
};

export const Legal: React.FC = () => (
    <div className="max-w-4xl mx-auto px-6 py-24 text-gray-600">
        <h1 className="font-serif text-5xl mb-12 text-brand-dark font-bold text-center">Policies & Transparency</h1>
        
        <section className="mb-20">
            <h2 className="font-serif text-3xl mb-8 text-brand-dark border-b-2 border-brand-main/10 pb-4">Terms of Service</h2>
            <div className="space-y-6 leading-relaxed text-lg font-light">
              <p>Welcome to The OG Life. By accessing this platform, you agree to uphold the values of honesty and transparency that define our community.</p>
              <p>All products under the "Hello Nature" banner are strictly checked for pesticide residue and unpolished integrity. We guarantee that what you see is what you get—nature in its purest form.</p>
            </div>
        </section>
        
        <section>
            <h2 className="font-serif text-3xl mb-8 text-brand-dark border-b-2 border-brand-main/10 pb-4">Privacy & Ethics</h2>
            <div className="space-y-6 leading-relaxed text-lg font-light">
              <p>Your data is as sacred to us as the soil is to our farmers. We collect information only to facilitate your journey with us. We never share, sell, or trade your personal details.</p>
              <p>Our commitment to ethics extends from the farm to your screen. Every transaction supports a heritage of natural farming.</p>
            </div>
        </section>
    </div>
);
