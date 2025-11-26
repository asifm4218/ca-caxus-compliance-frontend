import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Navbar />
            <main className="flex-1 ml-60">
                {children}
            </main>
        </div>
    );
};

export default Layout;

