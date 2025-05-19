
import React from 'react';
import { Outlet } from 'react-router-dom';

const HotelManagement = () => {
  return (
    <div className="admin-content">
      <Outlet />
    </div>
  );
};

export default HotelManagement;
