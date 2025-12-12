import React from 'react';
import PurchaseEntry from '../components/purchase/PurchaseEntry';
import SupplierList from '../components/purchase/SupplierList';
import { ClipboardList, Archive } from 'lucide-react';

const Purchase = () => {
    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Purchase Management</h1>
                <p className="text-slate-500">Create purchase orders and manage suppliers</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-primary-600 text-white p-6 rounded-2xl shadow-lg shadow-primary-500/20">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-primary-100 text-sm font-medium mb-1">Total Purchases</p>
                                    <h3 className="text-3xl font-bold">$12,450</h3>
                                </div>
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <ClipboardList className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-sm text-primary-100">
                                <span className="bg-white/20 px-2 py-0.5 rounded text-white">+8.2%</span>
                                <span>this month</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-slate-500 text-sm font-medium mb-1">Pending Deliveries</p>
                                    <h3 className="text-3xl font-bold text-slate-800">5</h3>
                                </div>
                                <div className="p-2 bg-slate-100 rounded-lg">
                                    <Archive className="w-6 h-6 text-slate-600" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                                <span className="text-orange-500 font-medium">3 Delayed</span>
                            </div>
                        </div>
                    </div>

                    <PurchaseEntry />

                    {/* Recent Purchase History (Dummy) */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h3 className="font-bold text-slate-800 mb-4">Recent Purchase Orders</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-slate-500 font-medium border-b border-slate-100">
                                    <tr>
                                        <th className="pb-3 pl-2">Order ID</th>
                                        <th className="pb-3">Supplier</th>
                                        <th className="pb-3">Amount</th>
                                        <th className="pb-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {[1, 2, 3].map(i => (
                                        <tr key={i} className="group hover:bg-slate-50">
                                            <td className="py-3 pl-2 font-medium text-slate-700">#PO-202{i}</td>
                                            <td className="py-3 text-slate-600">TechWholesale Ltd</td>
                                            <td className="py-3 text-slate-800 font-bold">$1,200.00</td>
                                            <td className="py-3">
                                                <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded text-xs font-semibold">Completed</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <SupplierList />
                </div>
            </div>
        </div>
    );
};

export default Purchase;
