
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Table from '../../components/ui/Table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const mockBikeRiders = [
  { 
    id: 1, 
    name: 'Ravi Kumar', 
    mobile: '9876543210', 
    email: 'ravi@bikerider.com', 
    status: 'Approved',
    age: 25,
    address: '123 Main Road, Mumbai',
    experience: 3
  },
  { 
    id: 2, 
    name: 'Sneha Patel', 
    mobile: '9876543211', 
    email: 'sneha@bikerider.com', 
    status: 'Pending',
    age: 22,
    address: '456 Park Avenue, Delhi',
    experience: 2
  },
  { 
    id: 3, 
    name: 'Karan Singh', 
    mobile: '9876543212', 
    email: 'karan@bikerider.com', 
    status: 'Rejected',
    age: 28,
    address: '789 Lake Road, Bangalore',
    experience: 5
  },
  { 
    id: 4, 
    name: 'Pooja Reddy', 
    mobile: '9876543213', 
    email: 'pooja@bikerider.com', 
    status: 'Approved',
    age: 24,
    address: '234 Hill View, Chennai',
    experience: 1
  },
  { 
    id: 5, 
    name: 'Ajay Verma', 
    mobile: '9876543214', 
    email: 'ajay@bikerider.com', 
    status: 'Pending',
    age: 30,
    address: '567 River Side, Kolkata',
    experience: 7
  },
];

const statusOptions = ['Approved', 'Pending', 'Rejected'];

const BikeRiders = () => {
  const [riders, setRiders] = useState(mockBikeRiders);
  const navigate = useNavigate();

  const handleStatusChange = (id, newStatus) => {
    setRiders(prevRiders => 
      prevRiders.map(rider => 
        rider.id === id ? { ...rider, status: newStatus } : rider
      )
    );

    toast({
      title: "Status updated",
      description: `Rider status changed to ${newStatus}`,
    });
  };

  const handleAddNewRider = () => {
    navigate('/bike-management/riders/new');
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
        <Link to={`/bike-management/riders/${row.id}`} className="btn btn-primary btn-sm">
          View Details
        </Link>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Bike Riders</h2>
        <Button onClick={handleAddNewRider}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Rider
        </Button>
      </div>
      
      <Table
        columns={columns}
        data={riders}
        searchable={true}
        filterable={true}
        pagination={true}
      />
    </div>
  );
};

export default BikeRiders;
