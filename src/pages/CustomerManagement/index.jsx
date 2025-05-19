
import React, { useState } from 'react';
import Table from '../../components/ui/Table';
import { Card, CardContent } from '@/components/ui/card';

const mockCustomers = [
  {
    id: 1,
    name: 'Rahul Sharma',
    mobile: '9876543210',
    email: 'rahul@example.com',
    history: [
      { type: 'Hotel Booking', id: 'HB001', date: '2025-05-10', amount: 3500 },
      { type: 'Taxi Booking', id: 'TX003', date: '2025-05-15', amount: 450 }
    ]
  },
  {
    id: 2,
    name: 'Priya Singh',
    mobile: '9876543211',
    email: 'priya@example.com',
    history: [
      { type: 'Bus Booking', id: 'BB002', date: '2025-05-05', amount: 800 },
      { type: 'Bike Booking', id: 'BK001', date: '2025-05-12', amount: 120 }
    ]
  },
  {
    id: 3,
    name: 'Amit Kumar',
    mobile: '9876543212',
    email: 'amit@example.com',
    history: [
      { type: 'Hotel Booking', id: 'HB003', date: '2025-04-25', amount: 2800 },
      { type: 'Taxi Booking', id: 'TX001', date: '2025-05-02', amount: 350 },
      { type: 'Bus Booking', id: 'BB001', date: '2025-05-20', amount: 750 }
    ]
  },
  {
    id: 4,
    name: 'Sunita Patel',
    mobile: '9876543213',
    email: 'sunita@example.com',
    history: [
      { type: 'Bike Booking', id: 'BK003', date: '2025-05-08', amount: 150 }
    ]
  },
  {
    id: 5,
    name: 'Vijay Mehta',
    mobile: '9876543214',
    email: 'vijay@example.com',
    history: [
      { type: 'Bus Booking', id: 'BB004', date: '2025-04-28', amount: 1200 },
      { type: 'Hotel Booking', id: 'HB002', date: '2025-05-01', amount: 5000 }
    ]
  },
];

const CustomerManagement = () => {
  const [customers, setCustomers] = useState(mockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const handleViewHistory = (customer) => {
    setSelectedCustomer(customer);
    setShowHistory(true);
  };

  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
    setShowHistory(false);
  };

  const closeDetails = () => {
    setSelectedCustomer(null);
    setShowHistory(false);
  };

  const columns = [
    { 
      header: 'Name', 
      accessor: 'name', 
      filterable: true,
      cell: (row) => (
        <span className="text-primary cursor-pointer hover:underline" onClick={() => handleRowClick(row)}>
          {row.name}
        </span>
      )
    },
    { 
      header: 'Mobile', 
      accessor: 'mobile',
      filterable: true
    },
    { 
      header: 'Email', 
      accessor: 'email',
      filterable: true
    },
    {
      header: 'History',
      accessor: 'history',
      noSearch: true,
      cell: (row) => (
        <button 
          className="btn btn-primary btn-sm"
          onClick={(e) => {
            e.stopPropagation();
            handleViewHistory(row);
          }}
        >
          View History
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customer Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`md:col-span-${selectedCustomer ? "2" : "3"}`}>
          <Table
            columns={columns}
            data={customers}
            searchable={true}
            filterable={true}
            pagination={true}
            onRowClick={handleRowClick}
          />
        </div>

        {selectedCustomer && (
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{showHistory ? "Booking History" : "Customer Details"}</h3>
                  <button 
                    className="text-gray-500 hover:text-gray-700"
                    onClick={closeDetails}
                  >
                    ✕
                  </button>
                </div>
                
                {showHistory ? (
                  <div>
                    <h4 className="font-semibold mb-2">{selectedCustomer.name}'s Bookings</h4>
                    {selectedCustomer.history.length > 0 ? (
                      <div className="space-y-4">
                        {selectedCustomer.history.map((booking, idx) => (
                          <div key={idx} className="p-3 border rounded-md">
                            <div className="flex justify-between">
                              <div className="font-medium">{booking.type}</div>
                              <div className="text-sm text-gray-500">{booking.date}</div>
                            </div>
                            <div className="text-sm">ID: {booking.id}</div>
                            <div className="font-medium">₹{booking.amount.toLocaleString()}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No booking history found.</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Name</label>
                      <p>{selectedCustomer.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Mobile</label>
                      <p>{selectedCustomer.mobile}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p>{selectedCustomer.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Total Bookings</label>
                      <p>{selectedCustomer.history.length}</p>
                    </div>
                    <div className="pt-2">
                      <button 
                        className="btn btn-primary w-full"
                        onClick={() => setShowHistory(true)}
                      >
                        View Booking History
                      </button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerManagement;
