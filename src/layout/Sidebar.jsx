import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    ShoppingBag,
    BarChart3,
    Settings,
    LogOut,
    Users
} from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: ShoppingCart, label: 'Sales (POS)', path: '/sales' },
        { icon: Package, label: 'Inventory', path: '/inventory' },
        { icon: ShoppingBag, label: 'Purchase', path: '/purchase' },
        { icon: Users, label: 'Users', path: '/users' },
        { icon: BarChart3, label: 'Reports', path: '/reports' },
    ];

    return (
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 z-20 shadow-lg">
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-primary-400"></div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500">
                    LuminaPOS
                </h1>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
              ${isActive
                                ? 'bg-primary-50 text-primary-700 font-semibold shadow-inner'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }
            `}
                    >
                        <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 w-full rounded-xl transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
