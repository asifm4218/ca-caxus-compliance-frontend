import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ icon, label, to }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    
    return (
        <Link 
            to={to}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                ? 'bg-[#E0E7FF] text-[#1E3A8A] relative' 
                : 'text-[#111827] hover:bg-[#F3F4F6]'
            }`}
        >
            {isActive && (
                <div className="absolute left-0 h-full w-[3px] bg-[#1E3A8A] rounded-r-full"></div>
            )}
            <span className={`material-symbols-outlined ${
                isActive ? 'text-[#1E3A8A]' : 'text-[#6B7280] group-hover:text-[#2563EB]'
            }`}>{icon}</span>
            {label}
        </Link>
    );
};

const Sidebar = () => {
    const navItems = [
        { icon: 'dashboard', label: 'Dashboard', to: '/dashboard' },
        { icon: 'calendar_month', label: 'Compliance Calendar', to: '/caxus/calendar' },
        { icon: 'task_alt', label: 'Task Management', to: '/tasks' },
        { icon: 'mail', label: 'Notice Management', to: '/notices' },
        { icon: 'folder', label: 'Documents', to: '/documents' },
        { icon: 'mark_email_unread', label: 'Email Monitoring', to: '/email' },
        { icon: 'work', label: 'MCA Compliances', to: '/mca' },
        { icon: 'percent', label: 'GST Reconciliation', to: '/gst' },
        { icon: 'link', label: 'GST Integration', to: '/gst-integration' },
        { icon: 'lan', label: 'Workflow', to: '/workflow' },
        { icon: 'group', label: 'Teams', to: '/teams' },
        { icon: 'lock', label: 'Password Vault', to: '/password' }
    ];

    return (
        <aside className="fixed top-0 left-0 h-full w-60 flex flex-col bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.04)]">
            <div className="px-6 pt-6 pb-3">
                <h1 className="text-[#1E3A8A] text-[15px] font-semibold">Caxus Compliance</h1>
            </div>
            <nav className="flex-1 px-3 pt-3 pb-7 space-y-1">
                {navItems.map((item) => (
                    <NavItem 
                        key={item.label} 
                        icon={item.icon} 
                        label={item.label} 
                        to={item.to}
                    />
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;