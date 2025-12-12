import React from 'react';
import { TrendingUp, Users, DollarSign, Package } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Mon', sales: 4000, purchase: 2400 },
    { name: 'Tue', sales: 3000, purchase: 1398 },
    { name: 'Wed', sales: 2000, purchase: 9800 },
    { name: 'Thu', sales: 2780, purchase: 3908 },
    { name: 'Fri', sales: 1890, purchase: 4800 },
    { name: 'Sat', sales: 2390, purchase: 3800 },
    { name: 'Sun', sales: 3490, purchase: 4300 },
];

const StatCard = ({ title, value, trend, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-slate-500 text-sm font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
                <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
            </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
            <span className="text-emerald-500 font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {trend}
            </span>
            <span className="text-slate-400 ml-2">vs last month</span>
        </div>
    </div>
);

const Dashboard = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
                    <p className="text-slate-500">Welcome back, here's what's happening today.</p>
                </div>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    Download Report
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Sales"
                    value="$24,560"
                    trend="+12%"
                    icon={DollarSign}
                    color="bg-emerald-500"
                />
                <StatCard
                    title="Total Orders"
                    value="156"
                    trend="+8%"
                    icon={Package}
                    color="bg-blue-500"
                />
                <StatCard
                    title="New Customers"
                    value="24"
                    trend="+2%"
                    icon={Users}
                    color="bg-violet-500"
                />
                <StatCard
                    title="Total Profit"
                    value="$8,230"
                    trend="+15%"
                    icon={TrendingUp}
                    color="bg-indigo-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">Revenue Analytics</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="sales" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="purchase" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                    <Package className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-800">New Order #123{i}</p>
                                    <p className="text-xs text-slate-400">2 minutes ago</p>
                                </div>
                                <span className="text-sm font-medium text-emerald-600">+$120.00</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
