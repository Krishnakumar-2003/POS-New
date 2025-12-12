import React, { useState } from 'react';
import { Plus, Save, RotateCcw } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { useTransactionStore } from '../../store/useTransactionStore';

const PurchaseEntry = () => {
    const { products, updateProduct } = useProductStore();
    const addTransaction = useTransactionStore((state) => state.addTransaction);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState('');
    const [supplier, setSupplier] = useState('');
    const [costPrice, setCostPrice] = useState('');

    const handlePurchase = (e) => {
        e.preventDefault();
        if (!selectedProduct) return;

        const product = products.find(p => p.id === parseInt(selectedProduct));
        if (product) {
            // Update stock
            updateProduct(product.id, {
                stock: product.stock + parseInt(quantity)
            });

            // Log transaction
            addTransaction({
                type: 'PURCHASE',
                amount: parseFloat(costPrice) * parseInt(quantity),
                supplier,
                item: product.name
            });

            // Reset form
            setQuantity('');
            setCostPrice('');
            setSupplier('');
            setSelectedProduct('');

            alert(`Stock updated! Order placed for ${product.name}`);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary-600" />
                New Purchase Order
            </h3>

            <form onSubmit={handlePurchase} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Select Supplier</label>
                    <select
                        required
                        value={supplier}
                        onChange={(e) => setSupplier(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-100"
                    >
                        <option value="">Choose Supplier...</option>
                        <option value="TechWholesale Ltd">TechWholesale Ltd</option>
                        <option value="OfficeDepot Pro">OfficeDepot Pro</option>
                        <option value="Global Gadgets Inc">Global Gadgets Inc</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Product</label>
                    <select
                        required
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-100"
                    >
                        <option value="">Choose Product...</option>
                        {products.map(p => (
                            <option key={p.id} value={p.id}>{p.name} (Current Stock: {p.stock})</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                        <input
                            type="number"
                            required
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-100"
                            placeholder="0"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Unit Cost ($)</label>
                        <input
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            value={costPrice}
                            onChange={(e) => setCostPrice(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-100"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div className="pt-4  flex gap-3">
                    <button
                        type="button"
                        onClick={() => {
                            setQuantity('');
                            setCostPrice('');
                            setSupplier('');
                            setSelectedProduct('');
                        }}
                        className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-50 font-medium transition-colors flex: 1"
                    >
                        <RotateCcw className="w-4 h-4 mx-auto" />
                    </button>
                    <button
                        type="submit"
                        className="flex-[3] px-6 py-2 bg-primary-600 text-white rounded-lg font-medium shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all flex items-center justify-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        Place Order & Update Stock
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PurchaseEntry;
