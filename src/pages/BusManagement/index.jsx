
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const BusManagement = () => {
  const location = useLocation();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bus Management</h1>
      </div>
      
      <div className="mb-6">
        <div className="border-b">
          <nav className="flex gap-4">
            <Link 
              to="/bus-management/operators" 
              className={`px-4 py-2 ${
                location.pathname.includes('/operators') 
                  ? 'border-b-2 border-primary text-primary'
                  : ''
              }`}
            >
              Bus Operators
            </Link>
            <Link 
              to="/bus-management/bookings" 
              className={`px-4 py-2 ${
                location.pathname.includes('/bookings') 
                  ? 'border-b-2 border-primary text-primary'
                  : ''
              }`}
            >
              Bus Bookings
            </Link>
          </nav>
        </div>
      </div>
      
      <Outlet />
    </div>
  );
};

export default BusManagement;
