import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onAdd }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-lg transition-all duration-300"
        >
            <div className="h-40 overflow-hidden relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <button
                    onClick={() => onAdd(product)}
                    className="absolute bottom-3 right-3 bg-white/90 text-primary-600 p-2 rounded-full shadow-sm hover:bg-primary-600 hover:text-white transition-all transform translate-y-12 group-hover:translate-y-0"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>
            <div className="p-4">
                <p className="text-xs text-slate-400 font-medium mb-1">{product.category}</p>
                <h3 className="text-slate-800 font-semibold text-sm line-clamp-2 min-h-[2.5rem]">
                    {product.name}
                </h3>
                <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-primary-700">${product.price.toFixed(2)}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${product.stock > 10 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                        }`}>
                        {product.stock} left
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
