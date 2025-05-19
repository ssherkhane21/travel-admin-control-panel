
import React, { useState } from 'react';
import Table from '../../components/ui/Table';
import { toast } from "@/hooks/use-toast";

const mockHotelBookings = [
  { 
    id: 1, 
    hotelId: 'HTL001', 
    customerName: 'Rakesh Sharma', 
    phone: '9876543210', 
    email: 'rakesh@example.com', 
    checkinDate: '2025-05-20',
    checkoutDate: '2025-05-22',
    amount: 3200,
    idProof: 'aadhaar',
    idNumber: '1234 5678 9012',
    journeyDetails: 'Business trip, arriving by flight at 2PM'
  },
  { 
    id: 2, 
    hotelId: 'HTL002', 
    customerName: 'Priya Singh', 
    phone: '9876543211', 
    email: 'priya@example.com', 
    checkinDate: '2025-05-21',
    checkoutDate: '2025-05-25',
    amount: 6800,
    idProof: 'passport',
    idNumber: 'J8743219',
    journeyDetails: 'Family vacation, 2 adults and 1 child'
  },
  { 
    id: 3, 
    hotelId: 'HTL003', 
    customerName: 'Arun Kumar', 
    phone: '9876543212', 
    email: 'arun@example.com', 
    checkinDate: '2025-05-22',
    checkoutDate: '2025-05-23',
    amount: 1500,
    idProof: 'driving_license',
    idNumber: 'DL123456789',
    journeyDetails: 'Business meeting, needs early check-in'
  },
  { 
    id: 4, 
    hotelId: 'HTL001', 
    customerName: 'Sunita Patel', 
    phone: '9876543213', 
    email: 'sunita@example.com', 
    checkinDate: '2025-05-25',
    checkoutDate: '2025-05-28',
    amount: 4800,
    idProof: 'voter_id',
    idNumber: 'VTR987654321',
    journeyDetails: 'Anniversary celebration'
  },
  { 
    id: 5, 
    hotelId: 'HTL004', 
    customerName: 'Vijay Mehta', 
    phone: '9876543214', 
    email: 'vijay@example.com', 
    checkinDate: '2025-05-27',
    checkoutDate: '2025-05-29',
    amount: 2200,
    idProof: 'aadhaar',
    idNumber: '9876 5432 1098',
    journeyDetails: 'Attending a conference nearby'
  },
];

const HotelBookings = () => {
  const [bookings, setBookings] = useState(mockHotelBookings);
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
      header: 'Hotel ID', 
      accessor: 'hotelId', 
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
      header: 'Check-in Date', 
      accessor: 'checkinDate',
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
      header: 'Check-out Date', 
      accessor: 'checkoutDate',
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
        <h2 className="text-xl font-bold">Hotel Bookings</h2>
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
                <p><span className="font-medium">Hotel ID:</span> {selectedBooking.hotelId}</p>
                <p><span className="font-medium">Check-in:</span> {selectedBooking.checkinDate}</p>
                <p><span className="font-medium">Check-out:</span> {selectedBooking.checkoutDate}</p>
                <p><span className="font-medium">Amount:</span> ₹{selectedBooking.amount.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-semibold">ID Proof</h3>
              <p><span className="font-medium">Type:</span> {selectedBooking.idProof}</p>
              <p><span className="font-medium">Number:</span> {selectedBooking.idNumber}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="font-semibold">Journey Details</h3>
              <p>{selectedBooking.journeyDetails}</p>
            </div>
            
            <div className="flex justify-end">
              <button 
                className="btn btn-secondary mr-2"
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

export default HotelBookings;
