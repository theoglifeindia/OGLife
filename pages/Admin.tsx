import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct, seedProducts } from '../services/dataService';
import { Product, Variant } from '../types';
import { Loader2, Trash2, Edit2, Plus, X, LogOut, Package } from 'lucide-react';

const Admin: React.FC = () => {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    
    // Data State
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    
    // UI State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Form State
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        description: '',
        category: 'Daals',
        images: [],
        variants: [{ weight: '500g', price: 0 }, { weight: '1kg', price: 0 }],
        stock: 0,
        isFeatured: false
    });
    const [imageInput, setImageInput] = useState('');

    useEffect(() => {
        const auth = localStorage.getItem('og_admin_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
            fetchProducts();
        }
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') {
            setIsAuthenticated(true);
            localStorage.setItem('og_admin_auth', 'true');
            fetchProducts();
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
            setImageInput(product.images.join(', '));
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                description: '',
                category: 'Daals',
                images: [],
                variants: [{ weight: '500g', price: 0 }, { weight: '1kg', price: 0 }],
                stock: 10,
                isFeatured: false
            });
            setImageInput('');
        }
        setIsModalOpen(true);
    };

    const handleVariantChange = (index: number, field: keyof Variant, value: string | number) => {
        const newVariants = [...(formData.variants || [])];
        newVariants[index] = { ...newVariants[index], [field]: value };
        setFormData({ ...formData, variants: newVariants });
    };

    const addVariant = () => {
        setFormData({
            ...formData,
            variants: [...(formData.variants || []), { weight: '', price: 0 }]
        });
    };

    const removeVariant = (index: number) => {
        const newVariants = [...(formData.variants || [])];
        newVariants.splice(index, 1);
        setFormData({ ...formData, variants: newVariants });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const images = imageInput.split(',').map(s => s.trim()).filter(s => s !== '');
        const finalImages = images.length > 0 ? images : ['https://placehold.co/600x600?text=No+Image'];

        // Calculate base price (lowest price variant)
        const variants = formData.variants || [];
        const basePrice = variants.length > 0 
            ? Math.min(...variants.map(v => Number(v.price))) 
            : 0;

        const productData = {
            ...formData,
            images: finalImages,
            price: basePrice, // Store lowest price for listing display
            stock: Number(formData.stock),
            variants: variants.map(v => ({...v, price: Number(v.price)}))
        } as Product;

        try {
            if (editingProduct) {
                await updateProduct(editingProduct.id, productData);
            } else {
                await addProduct(productData);
            }
            setIsModalOpen(false);
            fetchProducts();
        } catch (error) {
            alert('Error saving product');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
            fetchProducts();
        }
    };

    // --- LOGIN VIEW ---
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-serif font-bold text-center mb-6 text-brand-dark">Admin Access</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)}
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-brand-main outline-none"
                                placeholder="Enter password (admin123)"
                            />
                        </div>
                        <button className="w-full bg-brand-dark text-white py-2 rounded hover:bg-brand-main transition">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // --- DASHBOARD VIEW ---
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-brand-dark">Dashboard</h1>
                        <p className="text-gray-500">Manage your products and inventory</p>
                    </div>
                    <div className="flex gap-4">
                         <button onClick={() => seedProducts()} className="text-sm text-gray-500 underline">
                            Reset Data
                        </button>
                        <button onClick={handleLogout} className="flex items-center text-red-600 hover:text-red-800">
                            <LogOut className="h-4 w-4 mr-2" /> Logout
                        </button>
                    </div>
                </div>

                {/* Stats / Action Bar */}
                <div className="bg-white p-4 rounded shadow-sm mb-6 flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-gray-600">
                        <Package className="h-5 w-5" />
                        <span className="font-bold">{products.length} Products</span>
                    </div>
                    <button 
                        onClick={() => handleOpenModal()} 
                        className="bg-brand-gold text-white px-4 py-2 rounded flex items-center hover:bg-amber-700 transition"
                    >
                        <Plus className="h-4 w-4 mr-2" /> Add New Product
                    </button>
                </div>

                {/* Product List */}
                {loading ? (
                    <div className="flex justify-center p-12"><Loader2 className="animate-spin text-brand-main" /></div>
                ) : (
                    <div className="bg-white rounded shadow-sm overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="p-4 text-sm font-medium text-gray-500">Image</th>
                                    <th className="p-4 text-sm font-medium text-gray-500">Name</th>
                                    <th className="p-4 text-sm font-medium text-gray-500">Category</th>
                                    <th className="p-4 text-sm font-medium text-gray-500">Base Price</th>
                                    <th className="p-4 text-sm font-medium text-gray-500">Variants</th>
                                    <th className="p-4 text-sm font-medium text-gray-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.map(product => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="p-4">
                                            <img src={product.images[0]} alt="" className="w-12 h-12 object-cover rounded bg-gray-100" />
                                        </td>
                                        <td className="p-4 font-medium text-gray-900">{product.name}</td>
                                        <td className="p-4 text-gray-500">{product.category}</td>
                                        <td className="p-4 font-bold text-gray-700">₹{product.price}</td>
                                        <td className="p-4 text-sm text-gray-500">
                                            {product.variants.map(v => `${v.weight} (₹${v.price})`).join(', ')}
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <button 
                                                onClick={() => handleOpenModal(product)}
                                                className="text-blue-600 hover:text-blue-800 p-1"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-600 hover:text-red-800 p-1"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {products.length === 0 && (
                            <div className="p-8 text-center text-gray-500">No products found.</div>
                        )}
                    </div>
                )}
            </div>

            {/* Edit/Add Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h3 className="text-xl font-bold font-serif">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Product Name</label>
                                <input 
                                    className="w-full border rounded p-2" 
                                    value={formData.name} 
                                    onChange={e => setFormData({...formData, name: e.target.value})} 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea 
                                    className="w-full border rounded p-2" 
                                    rows={3}
                                    value={formData.description} 
                                    onChange={e => setFormData({...formData, description: e.target.value})} 
                                    required 
                                />
                            </div>
                            
                            {/* Variants Section */}
                            <div className="bg-gray-50 p-4 rounded border">
                                <label className="block text-sm font-medium mb-2">Pricing Variants</label>
                                {formData.variants?.map((variant, index) => (
                                    <div key={index} className="flex gap-4 mb-2 items-center">
                                        <input 
                                            placeholder="Weight (e.g., 500g)"
                                            className="w-1/2 border rounded p-2"
                                            value={variant.weight}
                                            onChange={e => handleVariantChange(index, 'weight', e.target.value)}
                                            required
                                        />
                                        <input 
                                            placeholder="Price"
                                            type="number"
                                            className="w-1/3 border rounded p-2"
                                            value={variant.price}
                                            onChange={e => handleVariantChange(index, 'price', e.target.value)}
                                            required
                                        />
                                        <button 
                                            type="button" 
                                            onClick={() => removeVariant(index)}
                                            className="text-red-500 hover:text-red-700"
                                            disabled={formData.variants?.length === 1}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                                <button 
                                    type="button" 
                                    onClick={addVariant}
                                    className="text-sm text-blue-600 font-medium hover:underline mt-2 flex items-center"
                                >
                                    <Plus className="h-3 w-3 mr-1" /> Add another size variant
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Total Stock</label>
                                    <input 
                                        type="number"
                                        className="w-full border rounded p-2" 
                                        value={formData.stock} 
                                        onChange={e => setFormData({...formData, stock: Number(e.target.value)})} 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Image URLs (comma separated)</label>
                                    <input 
                                        className="w-full border rounded p-2" 
                                        value={imageInput} 
                                        onChange={e => setImageInput(e.target.value)} 
                                        placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="flex items-center space-x-2">
                                    <input 
                                        type="checkbox"
                                        checked={formData.isFeatured}
                                        onChange={e => setFormData({...formData, isFeatured: e.target.checked})}
                                    />
                                    <span className="text-sm font-medium">Feature this product on Home page</span>
                                </label>
                            </div>
                            
                            <div className="pt-4 flex justify-end gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="px-6 py-2 bg-brand-dark text-white rounded hover:bg-brand-main"
                                >
                                    Save Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;