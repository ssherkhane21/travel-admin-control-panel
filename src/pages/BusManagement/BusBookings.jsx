
import React, { useState } from 'react';
import Table from '../../components/ui/Table';

const mockBusBookings = [
  { 
    id: 1, 
    busRegNumber: 'DL01AB1234', 
    customerName: 'John Doe', 
    phone: '9876543210', 
    email: 'john@example.com', 
    from: 'Delhi', 
    to: 'Mumbai',
    journeyDate: '2025-05-25',
    amount: 1200
  },
  { 
    id: 2, 
    busRegNumber: 'MH02CD5678', 
    customerName: 'Jane Smith', 
    phone: '9876543211', 
    email: 'jane@example.com', 
    from: 'Mumbai', 
    to: 'Pune',
    journeyDate: '2025-05-26',
    amount: 500
  },
  { 
    id: 3, 
    busRegNumber: 'KA03EF9012', 
    customerName: 'Amit Kumar', 
    phone: '9876543212', 
    email: 'amit@example.com', 
    from: 'Bangalore', 
    to: 'Chennai',
    journeyDate: '2025-05-27',
    amount: 800
  },
  { 
    id: 4, 
    busRegNumber: 'TN04GH3456', 
    customerName: 'Priya Sharma', 
    phone: '9876543213', 
    email: 'priya@example.com', 
    from: 'Chennai', 
    to: 'Hyderabad',
    journeyDate: '2025-05-28',
    amount: 1100
  },
  { 
    id: 5, 
    busRegNumber: 'GJ05IJ7890', 
    customerName: 'Rajesh Patel', 
    phone: '9876543214', 
    email: 'rajesh@example.com', 
    from: 'Ahmedabad', 
    to: 'Surat',
    journeyDate: '2025-05-29',
    amount: 450
  },
];

const BusBookings = () => {
  const [bookings, setBookings] = useState(mockBusBookings);

  const columns = [
    { 
      header: 'Bus Reg. Number', 
      accessor: 'busRegNumber', 
      filterable: true 
    },
    { 
      header: 'Customer Name', 
      accessor: 'customerName', 
      filterable: true 
    },
    { 
      header: 'Phone', 
      accessor: 'phone' 
    },
    { 
      header: 'Email', 
      accessor: 'email' 
    },
    { 
      header: 'From', 
      accessor: 'from',
      filterable: true
    },
    { 
      header: 'To', 
      accessor: 'to',
      filterable: true
    },
    { 
      header: 'Journey Date', 
      accessor: 'journeyDate',
      filterable: true,
      filterComponent: (value, onChange) => (
        <input
          type="date"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="form-control"
        />
      )
    },
    { 
      header: 'Amount (₹)', 
      accessor: 'amount',
      cell: (row) => (
        <span>₹{row.amount.toLocaleString()}</span>
      )
    },
    {
      header: 'Action',
      accessor: 'action',
      noSearch: true,
      cell: (row) => (
        <button className="btn btn-primary btn-sm">
          View Details
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Bus Bookings</h2>
      </div>
      
      <Table
        columns={columns}
        data={bookings}
        searchable={true}
        filterable={true}
        pagination={true}
      />
    </div>
  );
};

export default BusBookings;
