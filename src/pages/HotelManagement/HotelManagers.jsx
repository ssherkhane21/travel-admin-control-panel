
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Table from '../../components/ui/Table';
import { toast } from "@/hooks/use-toast";

const mockHotelManagers = [
  { 
    id: 1, 
    name: 'John Smith', 
    mobile: '9876543210', 
    email: 'john@grandhotel.com', 
    status: 'Approved'
  },
  { 
    id: 2, 
    name: 'Emily Johnson', 
    mobile: '9876543211', 
    email: 'emily@skylineresort.com', 
    status: 'Pending'
  },
  { 
    id: 3, 
    name: 'Michael Brown', 
    mobile: '9876543212', 
    email: 'michael@seasideinn.com', 
    status: 'Submitted'
  },
  { 
    id: 4, 
    name: 'Sarah Davis', 
    mobile: '9876543213', 
    email: 'sarah@palmhotels.com', 
    status: 'Approved'
  },
  { 
    id: 5, 
    name: 'Robert Wilson', 
    mobile: '9876543214', 
    email: 'robert@royallodge.com', 
    status: 'Blocked'
  },
];

const statusOptions = ['Approved', 'Pending', 'Submitted', 'Rejected', 'Blocked'];

const HotelManagers = () => {
  const [managers, setManagers] = useState(mockHotelManagers);
  const navigate = useNavigate();

  const handleStatusChange = (id, newStatus) => {
    setManagers(prevManagers => 
      prevManagers.map(manager => 
        manager.id === id ? { ...manager, status: newStatus } : manager
      )
    );

    toast({
      title: "Status updated",
      description: `Manager status changed to ${newStatus}`,
    });
  };

  const handleAddNewManager = () => {
    navigate('/hotel-management/managers/new');
  };

  const columns = [
    { 
      header: 'Name', 
      accessor: 'name', 
      filterable: true 
    },
    { 
      header: 'Mobile', 
      accessor: 'mobile' 
    },
    { 
      header: 'Email', 
      accessor: 'email',
      filterable: true
    },
    { 
      header: 'Status', 
      accessor: 'status',
      filterable: true,
      cell: (row) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className="form-select"
        >
          {statusOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )
    },
    {
      header: 'Action',
      accessor: 'action',
      noSearch: true,
      cell: (row) => (
        <Link to={`/hotel-management/managers/${row.id}`} className="btn btn-primary btn-sm">
          View Details
        </Link>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Hotel Managers</h2>
        <button 
          onClick={handleAddNewManager}
          className="btn btn-primary"
        >
          Add New Hotel Manager
        </button>
      </div>
      
      <Table
        columns={columns}
        data={managers}
        searchable={true}
        filterable={true}
        pagination={true}
      />
    </div>
  );
};

export default HotelManagers;
