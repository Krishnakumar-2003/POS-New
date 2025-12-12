import React, { useMemo } from 'react';
import { useTransactionStore } from '../store/useTransactionStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, DollarSign, TrendingUp, ShoppingBag } from 'lucide-react';

const COLORS = ['#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

const Reports = () => {
    const transactions = useTransactionStore((state) => state.transactions);

    const stats = useMemo(() => {
        const totalSales = transactions
            .filter(t => t.type === 'SALE')
            .reduce((acc, t) => acc + t.amount, 0);

        const totalPurchases = transactions
            .filter(t => t.type === 'PURCHASE')
            .reduce((acc, t) => acc + t.amount, 0);

        const salesCount = transactions.filter(t => t.type === 'SALE').length;
        const profit = totalSales - totalPurchases;

        return { totalSales, totalPurchases, salesCount, profit };
    }, [transactions]);

    const recentTransactions = transactions.slice(0, 10);

    const chartData = [
        { name: 'Sales', value: stats.totalSales },
        { name: 'Purchases', value: stats.totalPurchases }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Analytics & Reports</h1>
                    <p className="text-slate-500">Financial overview and transaction history</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-50 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Last 30 Days
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-slate-500 text-sm font-medium">Total Revenue</p>
                    <h3 className="text-2xl font-bold text-slate-800 mt-1">${stats.totalSales.toFixed(2)}</h3>
                    <div className="mt-2 text-emerald-500 text-sm font-medium flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" /> +12.5%
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-slate-500 text-sm font-medium">Total Expenses</p>
                    <h3 className="text-2xl font-bold text-slate-800 mt-1">${stats.totalPurchases.toFixed(2)}</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-slate-500 text-sm font-medium">Net Profit</p>
                    <h3 className={`text-2xl font-bold mt-1 ${stats.profit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        ${stats.profit.toFixed(2)}
                    </h3>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-slate-500 text-sm font-medium">Sales Count</p>
                    <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.salesCount}</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Financial Overview Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Income vs Expense</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={80} tick={{ fill: '#64748B' }} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="value" fill="#8B5CF6" radius={[0, 4, 4, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#10B981' : '#EF4444'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Transaction History */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Transactions</h3>
                    <div className="overflow-y-auto max-h-64 pr-2">
                        <table className="w-full text-sm text-left">
                            <thead className="sticky top-0 bg-white text-slate-500 font-medium">
                                <tr>
                                    <th className="pb-3">Type</th>
                                    <th className="pb-3">Date</th>
                                    <th className="pb-3 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {recentTransactions.map((t) => (
                                    <tr key={t.id} className="hover:bg-slate-50">
                                        <td className="py-3">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${t.type === 'SALE' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                                }`}>
                                                {t.type}
                                            </span>
                                        </td>
                                        <td className="py-3 text-slate-600">
                                            {new Date(t.date).toLocaleDateString()}
                                        </td>
                                        <td className={`py-3 text-right font-bold ${t.type === 'SALE' ? 'text-emerald-600' : 'text-slate-800'
                                            }`}>
                                            ${t.amount.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
