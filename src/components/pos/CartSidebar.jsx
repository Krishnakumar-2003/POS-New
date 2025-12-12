import React from 'react';
import { Trash2, Plus, Minus, CreditCard, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { motion, AnimatePresence } from 'framer-motion';

const CartSidebar = ({ onCheckout }) => {
    const { cart, removeFromCart, updateQuantity } = useCartStore();

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    return (
        <div className="flex flex-col h-full bg-white border-l border-slate-200 shadow-xl">
            <div className="p-6 border-b border-slate-100 bg-white z-10">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-primary-600" />
                        Current Order
                    </h2>
                    <span className="text-xs font-semibold bg-primary-50 text-primary-700 px-2 py-1 rounded-full">
                        #{Math.floor(Math.random() * 10000)}
                    </span>
                </div>
                <p className="text-sm text-slate-400">Add items to billing section</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4 opacity-50">
                        <ShoppingBag className="w-16 h-16" />
                        <p>Cart is empty</p>
                    </div>
                ) : (
                    <AnimatePresence>
                        {cart.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 group hover:border-primary-200 transition-colors"
                            >
                                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-slate-700 truncate">{item.name}</h4>
                                    <p className="text-sm font-bold text-primary-600">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm border border-slate-200">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="p-1 hover:bg-slate-100 rounded text-slate-500"
                                    >
                                        <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="p-1 hover:bg-slate-100 rounded text-slate-500"
                                    >
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-200">
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm text-slate-500">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500">
                        <span>Tax (10%)</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-slate-800 pt-3 border-t border-slate-200">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                <button
                    onClick={onCheckout}
                    disabled={cart.length === 0}
                    className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold shadow-lg shadow-primary-500/30 hover:bg-primary-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <CreditCard className="w-5 h-5" />
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default CartSidebar;
