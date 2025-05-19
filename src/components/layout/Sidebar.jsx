
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Icons would typically come from an icon library
// We're using basic text representations for now
const menuItems = [
  { 
    title: 'Dashboard', 
    path: '/', 
    icon: '📊' 
  },
  {
    title: 'Bus Management',
    path: '/bus-management',
    icon: '🚌',
    submenu: [
      { title: 'Bus Operators', path: '/bus-management/operators' },
      { title: 'Bus Bookings', path: '/bus-management/bookings' },
    ]
  },
  {
    title: 'Hotel Management',
    path: '/hotel-management',
    icon: '🏨',
    submenu: [
      { title: 'Hotel Managers', path: '/hotel-management/managers' },
      { title: 'Hotel Bookings', path: '/hotel-management/bookings' },
    ]
  },
  {
    title: 'Taxi Management',
    path: '/taxi-management',
    icon: '🚕',
    submenu: [
      { title: 'Taxi Drivers', path: '/taxi-management/drivers' },
      { title: 'Taxi Bookings', path: '/taxi-management/bookings' },
    ]
  },
  {
    title: 'Bike Management',
    path: '/bike-management',
    icon: '🏍️',
    submenu: [
      { title: 'Bike Riders', path: '/bike-management/riders' },
      { title: 'Bike Bookings', path: '/bike-management/bookings' },
    ]
  },
  { 
    title: 'Customer Management', 
    path: '/customer-management', 
    icon: '👤' 
  },
  { 
    title: 'User Management', 
    path: '/user-management', 
    icon: '👥' 
  },
  { 
    title: 'Commission Management', 
    path: '/commission-management', 
    icon: '💰' 
  },
  { 
    title: 'Coupons', 
    path: '/coupons', 
    icon: '🎟️' 
  },
  { 
    title: 'Wallet', 
    path: '/wallet', 
    icon: '💼' 
  },
  { 
    title: 'Notifications', 
    path: '/notifications', 
    icon: '🔔' 
  }
];

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = React.useState({});

  const toggleSubMenu = (title) => {
    if (collapsed) return;
    setExpandedMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  // Initialize expanded menus based on current route
  React.useEffect(() => {
    const currentPath = location.pathname;
    
    menuItems.forEach(item => {
      if (item.submenu && item.submenu.some(subItem => currentPath.includes(subItem.path))) {
        setExpandedMenus(prev => ({
          ...prev,
          [item.title]: true
        }));
      }
    });
  }, [location.pathname]);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h1 className="text-xl font-bold">{collapsed ? 'AP' : 'Admin Panel'}</h1>
      </div>
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <React.Fragment key={item.title}>
            {item.submenu ? (
              <>
                <div 
                  className={`menu-item ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => toggleSubMenu(item.title)}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-text">{item.title}</span>
                  {!collapsed && <span className="ml-auto">{expandedMenus[item.title] ? '▼' : '▶'}</span>}
                </div>
                {expandedMenus[item.title] && !collapsed && (
                  <div className="submenu">
                    {item.submenu.map(subItem => (
                      <Link 
                        key={subItem.title}
                        to={subItem.path}
                        className={`menu-item pl-12 ${isActive(subItem.path) ? 'active' : ''}`}
                      >
                        <span className="menu-text">{subItem.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={`menu-item ${isActive(item.path) ? 'active' : ''}`}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-text">{item.title}</span>
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
