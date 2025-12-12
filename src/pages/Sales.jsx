import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import ProductCard from '../components/pos/ProductCard';
import CartSidebar from '../components/pos/CartSidebar';
import CheckoutModal from '../components/pos/CheckoutModal';
import { useProductStore } from '../store/useProductStore';
import { useCartStore } from '../store/useCartStore';

const Sales = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const products = useProductStore((state) => state.products);
    const addToCart = useCartStore((state) => state.addToCart);

    const categories = ['All', ...new Set(products.map(p => p.category))];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === 'All' || product.category === category;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="flex -m-6 h-[calc(100vh-64px)] overflow-hidden">
            {/* Product Grid Section */}
            <div className="flex-1 flex flex-col p-6 h-full overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Select Products</h1>
                        <p className="text-slate-500">Choose from available inventory</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 placeholder:font-light"
                            />
                        </div>
                        <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${category === cat
                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="flex-1 overflow-y-auto pr-2 pb-20">
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAdd={addToCart}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Cart Sidebar Section */}
            <div className="w-96 h-full bg-white z-20">
                <CartSidebar onCheckout={() => setIsCheckoutOpen(true)} />
            </div>

            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
            />
        </div>
    );
};

export default Sales;
