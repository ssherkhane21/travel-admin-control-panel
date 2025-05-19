
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const BikeManagement = () => {
  const location = useLocation();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bike Management</h1>
      </div>
      
      <div className="mb-6">
        <div className="border-b">
          <nav className="flex gap-4">
            <Link 
              to="/bike-management/riders" 
              className={`px-4 py-2 ${
                location.pathname.includes('/riders') 
                  ? 'border-b-2 border-primary text-primary'
                  : ''
              }`}
            >
              Bike Riders
            </Link>
            <Link 
              to="/bike-management/bookings" 
              className={`px-4 py-2 ${
                location.pathname.includes('/bookings') 
                  ? 'border-b-2 border-primary text-primary'
                  : ''
              }`}
            >
              Bike Bookings
            </Link>
          </nav>
        </div>
      </div>
      
      <Outlet />
    </div>
  );
};

export default BikeManagement;
