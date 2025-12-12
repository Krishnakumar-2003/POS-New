import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Banknote, CheckCircle, Smartphone } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useTransactionStore } from '../../store/useTransactionStore';

const CheckoutModal = ({ isOpen, onClose }) => {
    const { cart, clearCart } = useCartStore();
    const addTransaction = useTransactionStore((state) => state.addTransaction);
    const [step, setStep] = useState('summary'); // summary, payment, success
    const [paymentMethod, setPaymentMethod] = useState('card');

    if (!isOpen) return null;

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const handleProcessPayment = () => {
        // Simulate processing
        setStep('processing');
        setTimeout(() => {
            addTransaction({
                type: 'SALE',
                amount: total,
                items: cart.reduce((acc, item) => acc + item.quantity, 0),
                paymentMethod
            });
            setStep('success');
            clearCart();
        }, 1500);
    };

    const handleClose = () => {
        setStep('summary');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-800">
                        {step === 'success' ? 'Payment Successful' : 'Checkout'}
                    </h2>
                    {step !== 'success' && (
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                <div className="p-6">
                    {step === 'summary' && (
                        <div className="space-y-6">
                            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-slate-600">{item.quantity}x {item.name}</span>
                                        <span className="font-medium text-slate-800">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-slate-100 pt-4 space-y-2">
                                <div className="flex justify-between text-slate-500">
                                    <span>Tax (10%)</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-primary-700">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { id: 'card', icon: CreditCard, label: 'Card' },
                                    { id: 'cash', icon: Banknote, label: 'Cash' },
                                    { id: 'upi', icon: Smartphone, label: 'UPI' },
                                ].map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id)}
                                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${paymentMethod === method.id
                                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                                            : 'border-slate-200 text-slate-500 hover:border-slate-300'
                                            }`}
                                    >
                                        <method.icon className="w-6 h-6 mb-2" />
                                        <span className="text-xs font-medium">{method.label}</span>
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleProcessPayment}
                                className="w-full py-3 bg-primary-600 text-white rounded-xl font-bold shadow-lg shadow-primary-500/30 hover:bg-primary-700 active:scale-[0.98] transition-all"
                            >
                                Pay ${total.toFixed(2)}
                            </button>
                        </div>
                    )}

                    {step === 'processing' && (
                        <div className="py-12 flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
                            <p className="text-slate-500">Processing payment...</p>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="py-8 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Order Confirmed!</h3>
                            <p className="text-slate-500 mb-6">Receipt has been sent to printer.</p>
                            <button
                                onClick={handleClose}
                                className="px-8 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                            >
                                Start New Order
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default CheckoutModal;
