import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Navbar />
            <main className="flex-1 ml-60">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;

