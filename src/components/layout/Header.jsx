
import React from 'react';

const Header = ({ collapsed, toggleSidebar }) => {
  return (
    <header className={`header ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <button className="hamburger-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <div className="ml-4 font-bold">Admin Dashboard</div>
      <div className="ml-auto flex items-center">
        <div className="mr-4 relative">
          <span className="cursor-pointer">🔔</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">3</span>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 mr-2 flex items-center justify-center">A</div>
          <span>Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
