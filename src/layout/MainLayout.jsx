import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Sidebar />
            <Header />
            <main className="ml-64 p-6 transition-all duration-300">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
