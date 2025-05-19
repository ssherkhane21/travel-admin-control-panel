
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/ui/Table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const mockBusOperators = [
  { 
    id: 1, 
    name: 'Sharma Travels', 
    mobile: '9876543210', 
    email: 'sharma@travels.com', 
    status: 'Approved', 
    buses: 12 
  },
  { 
    id: 2, 
    name: 'City Express', 
    mobile: '9876543211', 
    email: 'city@express.com', 
    status: 'Pending', 
    buses: 8 
  },
  { 
    id: 3, 
    name: 'Highway Kings', 
    mobile: '9876543212', 
    email: 'highway@kings.com', 
    status: 'Submitted', 
    buses: 15 
  },
  { 
    id: 4, 
    name: 'Red Bus Lines', 
    mobile: '9876543213', 
    email: 'red@buslines.com', 
    status: 'Rejected', 
    buses: 0 
  },
  { 
    id: 5, 
    name: 'Luxury Travels', 
    mobile: '9876543214', 
    email: 'luxury@travels.com', 
    status: 'Blocked', 
    buses: 5 
  },
];

const BusOperators = () => {
  const [operators, setOperators] = useState(mockBusOperators);

  const handleStatusChange = (id, newStatus) => {
    setOperators(prevOperators => 
      prevOperators.map(operator => 
        operator.id === id 
          ? { ...operator, status: newStatus } 
          : operator
      )
    );
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
      accessor: 'email' 
    },
    { 
      header: 'Status', 
      accessor: 'status',
      filterable: true,
      cell: (row) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className={`form-control ${
            row.status === 'Approved' ? 'status-approved' :
            row.status === 'Pending' || row.status === 'Submitted' ? 'status-pending' :
            row.status === 'Rejected' ? 'status-rejected' :
            'status-blocked'
          }`}
        >
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Submitted">Submitted</option>
          <option value="Rejected">Rejected</option>
          <option value="Blocked">Blocked</option>
        </select>
      ),
      filterComponent: (value, onChange) => (
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="form-control"
        >
          <option value="">All Statuses</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Submitted">Submitted</option>
          <option value="Rejected">Rejected</option>
          <option value="Blocked">Blocked</option>
        </select>
      )
    },
    { 
      header: 'Number of Buses', 
      accessor: 'buses',
      cell: (row) => (
        <Link to={`/bus-management/operators/${row.id}/buses`} className="text-primary hover:underline">
          {row.buses}
        </Link>
      )
    },
    {
      header: 'Action',
      accessor: 'action',
      noSearch: true,
      cell: (row) => (
        <Link to={`/bus-management/operators/${row.id}`} className="btn btn-primary btn-sm">
          View Details
        </Link>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Bus Operators</h2>
        <Link to="/bus-management/operators/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Operator
          </Button>
        </Link>
      </div>
      
      <Table
        columns={columns}
        data={operators}
        searchable={true}
        filterable={true}
        pagination={true}
      />
    </div>
  );
};

export default BusOperators;
