import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const NavItem = ({ icon, label, to, disabled = false, comingSoon = false }) => {
  const location = useLocation();
  const isActive = !disabled && !comingSoon && location.pathname === to;

  const baseClasses = `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
    disabled || comingSoon
      ? "text-[#9CA3AF] cursor-not-allowed opacity-60"
      : isActive
      ? "bg-[#E0E7FF] text-[#1E3A8A] relative"
      : "text-[#111827] hover:bg-[#F3F4F6]"
  }`;

  const iconClasses = `material-symbols-outlined ${
    isActive
      ? "text-[#1E3A8A]"
      : disabled || comingSoon
      ? "text-[#9CA3AF]"
      : "text-[#6B7280] group-hover:text-[#2563EB]"
  }`;

  const content = (
    <>
      {isActive && (
        <div className="absolute left-0 h-full w-[3px] bg-[#1E3A8A] rounded-r-full"></div>
      )}
      <span className={iconClasses}>{icon}</span>
      <span>{label}</span>
      {comingSoon && (
        <span className="ml-auto text-xs text-[#9CA3AF] italic">
          (Coming Soon)
        </span>
      )}
    </>
  );

  if (disabled || comingSoon) {
    return (
      <div
        className={baseClasses}
        title={comingSoon ? "Coming Soon" : ""}
        onClick={(e) => e.preventDefault()}
      >
        {content}
      </div>
    );
  }

  return (
    <Link to={to} className={baseClasses}>
      {content}
    </Link>
  );
};

const Navbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // Navigation items in the exact order specified
  const navItems = [
    { icon: "dashboard", label: "Dashboard", to: "/dashboard" },
    {
      icon: "calendar_month",
      label: "Compliance Calendar",
      to: "/caxus/calendar",
    },
    { icon: "task_alt", label: "Task Management", to: "/tasks" },
    { icon: "mail", label: "Notice Management", to: "/notices" },
    { icon: "folder", label: "Document", to: "/documents" },
    { icon: "lock", label: "Password Vault", to: "/vault" },
    { icon: "work", label: "MCA Compliances", to: "/mca" },
    { icon: "percent", label: "GST Compliances", to: "/gst-compliances" },
    { icon: "group", label: "Teams", to: "/teams" },
    { icon: "school", label: "User Education", to: "/education" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="fixed top-0 left-0 h-full w-60 flex flex-col bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.04)] z-50">
      <div className="px-6 pt-6 pb-3">
        <h1 className="text-[#1E3A8A] text-[15px] font-semibold">
          Caxus Compliance
        </h1>
      </div>
      <nav className="flex-1 px-3 pt-3 pb-7 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            to={item.to}
            disabled={item.disabled}
            comingSoon={item.comingSoon}
          />
        ))}
      </nav>
      {/* User Section with Logout */}
      <div className="px-3 pb-4 border-t border-gray-200 pt-4">
        {user && (
          <div className="px-4 py-2 mb-2">
            <p className="text-xs text-gray-500 mb-1">Signed in as</p>
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.email || user.username || "User"}
            </p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Navbar;
