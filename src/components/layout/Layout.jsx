
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="admin-container">
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <Header collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${collapsed ? 'sidebar-collapsed' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
