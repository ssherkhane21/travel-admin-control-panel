
import React, { useState } from 'react';
import Table from '../../components/ui/Table';

const mockBikeBookings = [
  { 
    id: 'BK001', 
    customerName: 'Akash Singh', 
    riderName: 'Ravi Kumar',
    phone: '9876543210', 
    email: 'akash@example.com', 
    from: 'Mumbai Central', 
    to: 'Andheri',
    rideDate: '2025-05-25',
    amount: 120,
    vehicleType: 'Scooter'
  },
  { 
    id: 'BK002', 
    customerName: 'Nisha Patel', 
    riderName: 'Ajay Verma',
    phone: '9876543211', 
    email: 'nisha@example.com', 
    from: 'Pune Station', 
    to: 'Aundh',
    rideDate: '2025-05-26',
    amount: 100,
    vehicleType: 'Bike'
  },
  { 
    id: 'BK003', 
    customerName: 'Keshav Kumar', 
    riderName: 'Karan Singh',
    phone: '9876543212', 
    email: 'keshav@example.com', 
    from: 'Delhi Metro', 
    to: 'Karol Bagh',
    rideDate: '2025-05-27',
    amount: 150,
    vehicleType: 'Bike'
  },
  { 
    id: 'BK004', 
    customerName: 'Leela Singh', 
    riderName: 'Pooja Reddy',
    phone: '9876543213', 
    email: 'leela@example.com', 
    from: 'Bangalore MG Road', 
    to: 'Koramangala',
    rideDate: '2025-05-28',
    amount: 180,
    vehicleType: 'Scooter'
  },
  { 
    id: 'BK005', 
    customerName: 'Vikas Oberoi', 
    riderName: 'Sneha Patel',
    phone: '9876543214', 
    email: 'vikas@example.com', 
    from: 'Chennai Central', 
    to: 'T Nagar',
    rideDate: '2025-05-29',
    amount: 130,
    vehicleType: 'Bike'
  },
];

const BikeBookings = () => {
  const [bookings, setBookings] = useState(mockBikeBookings);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const closeModal = () => {
    setShowDetailsModal(false);
  };

  const columns = [
    { 
      header: 'ID', 
      accessor: 'id', 
      filterable: true 
    },
    { 
      header: 'Customer', 
      accessor: 'customerName', 
      filterable: true 
    },
    { 
      header: 'Rider', 
      accessor: 'riderName', 
      filterable: true 
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
      header: 'Ride Date', 
      accessor: 'rideDate',
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
      header: 'Vehicle Type', 
      accessor: 'vehicleType',
      filterable: true
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
        <button 
          className="btn btn-primary btn-sm"
          onClick={() => handleViewDetails(row)}
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Bike Bookings</h2>
      </div>
      
      <Table
        columns={columns}
        data={bookings}
        searchable={true}
        filterable={true}
        pagination={true}
      />

      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Booking Details</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold">Customer Information</h3>
                <p><span className="font-medium">Name:</span> {selectedBooking.customerName}</p>
                <p><span className="font-medium">Phone:</span> {selectedBooking.phone}</p>
                <p><span className="font-medium">Email:</span> {selectedBooking.email}</p>
              </div>
              <div>
                <h3 className="font-semibold">Booking Information</h3>
                <p><span className="font-medium">Booking ID:</span> {selectedBooking.id}</p>
                <p><span className="font-medium">Rider:</span> {selectedBooking.riderName}</p>
                <p><span className="font-medium">Vehicle Type:</span> {selectedBooking.vehicleType}</p>
                <p><span className="font-medium">Amount:</span> ₹{selectedBooking.amount.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-semibold">Journey Details</h3>
              <p><span className="font-medium">From:</span> {selectedBooking.from}</p>
              <p><span className="font-medium">To:</span> {selectedBooking.to}</p>
              <p><span className="font-medium">Date:</span> {selectedBooking.rideDate}</p>
            </div>
            
            <div className="flex justify-end">
              <button 
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BikeBookings;
