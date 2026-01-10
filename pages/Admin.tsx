import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct, seedProducts, getBusinessInfo, updateBusinessInfo } from '../services/dataService';
import { Product, Variant, BusinessInfo } from '../types';
import { Loader2, Trash2, Edit2, Plus, X, LogOut, Package, Image as ImageIcon, Upload, Info, CheckCircle2, Settings, ShoppingBag, Globe, Palette } from 'lucide-react';

const Admin: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'inventory' | 'settings'>('inventory');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
        address: '', phone: '', email: '', fssaiNo: '', gstNo: '', instagram: '', heroImage: ''
    });

    const [formData, setFormData] = useState<Partial<Product>>({
        name: '', description: '', category: 'Daals', images: [],
        variants: [{ weight: '500g', price: 0 }, { weight: '1kg', price: 0 }],
        stock: 0, isFeatured: false
    });
    const [urlInput, setUrlInput] = useState('');

    useEffect(() => {
        const auth = localStorage.getItem('og_admin_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const [prodData, bizData] = await Promise.all([getProducts(), getBusinessInfo()]);
        setProducts(prodData);
        setBusinessInfo(bizData);
        setLoading(false);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') {
            setIsAuthenticated(true);
            localStorage.setItem('og_admin_auth', 'true');
            fetchData();
        } else {
            alert('Invalid Password');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('og_admin_auth');
    };

    const handleOpenModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setFormData(product);
        } else {
            setEditingProduct(null);
            setFormData({
                name: '', description: '', category: 'Daals', images: [],
                variants: [{ weight: '500g', price: 0 }, { weight: '1kg', price: 0 }],
                stock: 10, isFeatured: false
            });
        }
        setUrlInput('');
        setIsModalOpen(true);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        (Array.from(files) as File[]).forEach((file: File) => {
            if (file.size > 2 * 1024 * 1024) return alert(`File ${file.name} is too large.`);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, images: [...(prev.images || []), reader.result as string] }));
            };
            reader.readAsDataURL(file);
        });
    };

    const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 3 * 1024 * 1024) return alert("Hero image should be under 3MB.");
        const reader = new FileReader();
        reader.onloadend = () => {
            setBusinessInfo(prev => ({ ...prev, heroImage: reader.result as string }));
        };
        reader.readAsDataURL(file);
    };

    const handleSaveBusinessInfo = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await updateBusinessInfo(businessInfo);
        setLoading(false);
        alert('Settings Updated!');
    };

    const handleSaveProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        const finalImages = (formData.images && formData.images.length > 0) ? formData.images : ['https://placehold.co/600x600?text=No+Image'];
        const variants = formData.variants || [];
        const basePrice = variants.length > 0 ? Math.min(...variants.map(v => Number(v.price))) : 0;
        const productData = { ...formData, images: finalImages, price: basePrice, stock: Number(formData.stock), variants: variants.map(v => ({...v, price: Number(v.price)})) } as Product;

        if (editingProduct) await updateProduct(editingProduct.id, productData);
        else await addProduct(productData);
        setIsModalOpen(false);
        fetchData();
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-cream p-4">
                <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
                    <div className="flex justify-center mb-6">
                        <div className="bg-brand-main/10 p-4 rounded-full"><Package className="h-10 w-10 text-brand-main" /></div>
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-center mb-2 text-brand-dark">Admin Access</h2>
                    <form onSubmit={handleLogin} className="space-y-6 mt-8">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Secure Password</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border-2 border-gray-100 p-4 rounded-xl outline-none" placeholder="••••••••" />
                        </div>
                        <button className="w-full bg-brand-dark text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-brand-main transition shadow-lg">Sign In</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark">Store Control Panel</h1>
                        <nav className="flex gap-8 mt-6">
                           <button onClick={() => setActiveTab('inventory')} className={`text-sm font-bold uppercase tracking-widest flex items-center gap-2 pb-2 border-b-2 transition ${activeTab === 'inventory' ? 'border-brand-main text-brand-main' : 'border-transparent text-gray-400'}`}><ShoppingBag className="h-4 w-4" /> Inventory</button>
                           <button onClick={() => setActiveTab('settings')} className={`text-sm font-bold uppercase tracking-widest flex items-center gap-2 pb-2 border-b-2 transition ${activeTab === 'settings' ? 'border-brand-main text-brand-main' : 'border-transparent text-gray-400'}`}><Settings className="h-4 w-4" /> Store Settings</button>
                        </nav>
                    </div>
                    <div className="flex items-center gap-6">
                        <button onClick={handleLogout} className="flex items-center bg-white border border-gray-200 px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 transition font-bold shadow-sm"><LogOut className="h-4 w-4 mr-2" /> Logout</button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center p-20"><Loader2 className="animate-spin text-brand-main h-12 w-12" /></div>
                ) : activeTab === 'inventory' ? (
                    <>
                        <div className="bg-white p-6 rounded-2xl shadow-sm mb-10 flex flex-col md:flex-row justify-between items-center border border-gray-100">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-brand-main/10 rounded-xl"><Package className="h-6 w-6 text-brand-main" /></div>
                                <div><span className="block text-2xl font-bold text-brand-dark">{products.length}</span><span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Active Listings</span></div>
                            </div>
                            <button onClick={() => handleOpenModal()} className="w-full md:w-auto bg-brand-main text-white px-8 py-4 rounded-xl flex items-center justify-center font-bold tracking-widest uppercase hover:bg-brand-dark transition shadow-lg shadow-brand-main/20 mt-4 md:mt-0"><Plus className="h-5 w-5 mr-2" /> Add Product</button>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    <tr><th className="p-6">Preview</th><th className="p-6">Product</th><th className="p-6">Category</th><th className="p-6">Price</th><th className="p-6 text-right">Actions</th></tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {products.map(p => (
                                        <tr key={p.id} className="hover:bg-brand-cream/30 transition">
                                            <td className="p-6"><img src={p.images[0]} className="w-12 h-12 object-cover rounded-lg" /></td>
                                            <td className="p-6"><span className="font-serif font-bold block">{p.name}</span><span className="text-xs text-gray-400">Stock: {p.stock}</span></td>
                                            <td className="p-6"><span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">{p.category}</span></td>
                                            <td className="p-6 font-bold">₹{p.price}</td>
                                            <td className="p-6 text-right space-x-2">
                                                <button onClick={() => handleOpenModal(p)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"><Edit2 className="h-5 w-5" /></button>
                                                <button onClick={() => deleteProduct(p.id).then(fetchData)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 className="h-5 w-5" /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-serif font-bold text-brand-dark mb-8 flex items-center gap-3"><Globe className="h-6 w-6 text-brand-gold" /> Business Information</h2>
                            <form onSubmit={handleSaveBusinessInfo} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Physical Store Address</label>
                                        <textarea value={businessInfo.address} onChange={e => setBusinessInfo({...businessInfo, address: e.target.value})} className="w-full border-2 border-gray-100 p-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-main" rows={3} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Primary Support Phone</label>
                                        <input type="text" value={businessInfo.phone} onChange={e => setBusinessInfo({...businessInfo, phone: e.target.value})} className="w-full border-2 border-gray-100 p-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-main" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Official Support Email</label>
                                        <input type="email" value={businessInfo.email} onChange={e => setBusinessInfo({...businessInfo, email: e.target.value})} className="w-full border-2 border-gray-100 p-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-main" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">FSSAI License No.</label>
                                        <input type="text" value={businessInfo.fssaiNo} onChange={e => setBusinessInfo({...businessInfo, fssaiNo: e.target.value})} className="w-full border-2 border-gray-100 p-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-main" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">GST Identification No.</label>
                                        <input type="text" value={businessInfo.gstNo} onChange={e => setBusinessInfo({...businessInfo, gstNo: e.target.value})} className="w-full border-2 border-gray-100 p-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-main" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Instagram Handle</label>
                                        <input type="text" value={businessInfo.instagram} onChange={e => setBusinessInfo({...businessInfo, instagram: e.target.value})} className="w-full border-2 border-gray-100 p-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-main" placeholder="@handle" />
                                    </div>
                                </div>
                                <div className="pt-6">
                                    <button type="submit" className="bg-brand-dark text-white px-12 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-brand-main transition shadow-xl">Update Public Information</button>
                                </div>
                            </form>
                        </div>
                      </div>

                      <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                           <h2 className="text-xl font-serif font-bold text-brand-dark mb-6 flex items-center gap-3"><Palette className="h-5 w-5 text-brand-gold" /> Homepage Hero</h2>
                           <div className="space-y-6">
                              <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                                 {businessInfo.heroImage ? (
                                    <img src={businessInfo.heroImage} className="w-full h-full object-cover" alt="Hero Preview" />
                                 ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs uppercase font-bold tracking-widest">No Hero Image</div>
                                 )}
                              </div>
                              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-brand-main transition">
                                 <Upload className="h-6 w-6 text-gray-400 mb-2" />
                                 <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Replace Hero Photo</span>
                                 <input type="file" className="hidden" accept="image/*" onChange={handleHeroImageUpload} />
                              </label>
                              <div className="bg-brand-cream p-4 rounded-xl border border-brand-light/20">
                                 <p className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mb-1 flex items-center gap-1"><Info className="h-3 w-3" /> Tip</p>
                                 <p className="text-xs text-brand-dark/70 leading-relaxed font-medium">Use a high-quality landscape image for the best visual impact on the homepage.</p>
                              </div>
                              <button onClick={handleSaveBusinessInfo} className="w-full py-3 bg-brand-main text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-brand-dark transition">Save Visual Update</button>
                           </div>
                        </div>
                      </div>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white p-8 border-b border-gray-100 flex justify-between items-center z-10">
                            <h3 className="text-2xl font-serif font-bold text-brand-dark">{editingProduct ? 'Edit Product' : 'New Product'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition"><X /></button>
                        </div>
                        <form onSubmit={handleSaveProduct} className="p-8 space-y-10">
                            <section className="space-y-6">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-main">Images</h4>
                                <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-200 grid grid-cols-4 gap-4">
                                    {formData.images?.map((img, i) => (
                                        <div key={i} className="relative aspect-square"><img src={img} className="w-full h-full object-cover rounded-xl" /><button type="button" onClick={() => setFormData({...formData, images: formData.images?.filter((_, idx) => idx !== i)})} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"><X size={12} /></button></div>
                                    ))}
                                    <label className="aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer"><Upload /><input type="file" className="hidden" multiple onChange={handleImageUpload} /></label>
                                </div>
                            </section>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-2"><label className="block text-sm font-bold mb-2">Name</label><input className="w-full border-2 p-4 rounded-xl" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required /></div>
                                <div className="col-span-2"><label className="block text-sm font-bold mb-2">Description</label><textarea className="w-full border-2 p-4 rounded-xl" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required /></div>
                                {formData.variants?.map((v, i) => (
                                    <div key={i} className="flex gap-4 col-span-2 items-center"><input className="flex-grow border-2 p-3 rounded-xl" value={v.weight} onChange={e => { const nv = [...formData.variants!]; nv[i].weight = e.target.value; setFormData({...formData, variants: nv}); }} /><input type="number" className="w-32 border-2 p-3 rounded-xl" value={v.price} onChange={e => { const nv = [...formData.variants!]; nv[i].price = Number(e.target.value); setFormData({...formData, variants: nv}); }} /></div>
                                ))}
                            </div>
                            <div className="flex justify-end gap-4"><button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 font-bold uppercase">Cancel</button><button type="submit" className="bg-brand-dark text-white px-12 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-brand-main transition">Save Product</button></div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;