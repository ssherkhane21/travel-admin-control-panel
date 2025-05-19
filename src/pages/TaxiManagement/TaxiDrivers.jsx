
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Table from '../../components/ui/Table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const mockTaxiDrivers = [
  { 
    id: 1, 
    name: 'Rahul Sharma', 
    mobile: '9876543210', 
    email: 'rahul@taxidriver.com', 
    status: 'Approved',
    age: 32,
    address: '123 Main Road, Mumbai',
    experience: 5,
    documents: {
      license: 'DL-123456789',
      insurance: 'INS-987654321'
    }
  },
  { 
    id: 2, 
    name: 'Priya Singh', 
    mobile: '9876543211', 
    email: 'priya@taxidriver.com', 
    status: 'Pending',
    age: 28,
    address: '456 Park Avenue, Delhi',
    experience: 3,
    documents: {
      license: 'DL-234567890',
      insurance: 'INS-876543219'
    }
  },
  { 
    id: 3, 
    name: 'Amit Kumar', 
    mobile: '9876543212', 
    email: 'amit@taxidriver.com', 
    status: 'Rejected',
    age: 35,
    address: '789 Lake Road, Bangalore',
    experience: 8,
    documents: {
      license: 'DL-345678901',
      insurance: 'INS-765432198'
    }
  },
  { 
    id: 4, 
    name: 'Deepika Patel', 
    mobile: '9876543213', 
    email: 'deepika@taxidriver.com', 
    status: 'Approved',
    age: 30,
    address: '234 Hill View, Chennai',
    experience: 4,
    documents: {
      license: 'DL-456789012',
      insurance: 'INS-654321987'
    }
  },
  { 
    id: 5, 
    name: 'Vikram Singh', 
    mobile: '9876543214', 
    email: 'vikram@taxidriver.com', 
    status: 'Pending',
    age: 38,
    address: '567 River Side, Kolkata',
    experience: 10,
    documents: {
      license: 'DL-567890123',
      insurance: 'INS-543219876'
    }
  },
];

const statusOptions = ['Approved', 'Pending', 'Rejected'];

const TaxiDrivers = () => {
  const [drivers, setDrivers] = useState(mockTaxiDrivers);
  const navigate = useNavigate();

  const handleStatusChange = (id, newStatus) => {
    setDrivers(prevDrivers => 
      prevDrivers.map(driver => 
        driver.id === id ? { ...driver, status: newStatus } : driver
      )
    );

    toast({
      title: "Status updated",
      description: `Driver status changed to ${newStatus}`,
    });
  };

  const handleAddNewDriver = () => {
    navigate('/taxi-management/drivers/new');
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
        <Link to={`/taxi-management/drivers/${row.id}`} className="btn btn-primary btn-sm">
          View Details
        </Link>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Taxi Drivers</h2>
        <Button onClick={handleAddNewDriver}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Driver
        </Button>
      </div>
      
      <Table
        columns={columns}
        data={drivers}
        searchable={true}
        filterable={true}
        pagination={true}
      />
    </div>
  );
};

export default TaxiDrivers;
