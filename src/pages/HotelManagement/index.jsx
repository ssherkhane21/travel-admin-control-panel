
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const HotelManagement = () => {
  const location = useLocation();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hotel Management</h1>
      </div>
      
      <div className="mb-6">
        <div className="border-b">
          <nav className="flex gap-4">
            <Link 
              to="/hotel-management/managers" 
              className={`px-4 py-2 ${
                location.pathname.includes('/managers') 
                  ? 'border-b-2 border-primary text-primary'
                  : ''
              }`}
            >
              Hotel Managers
            </Link>
            <Link 
              to="/hotel-management/bookings" 
              className={`px-4 py-2 ${
                location.pathname.includes('/bookings') 
                  ? 'border-b-2 border-primary text-primary'
                  : ''
              }`}
            >
              Hotel Bookings
            </Link>
          </nav>
        </div>
      </div>
      
      <Outlet />
    </div>
  );
};

export default HotelManagement;
