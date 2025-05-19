
import React, { useState } from 'react';
import Table from '../../components/ui/Table';
import { format } from 'date-fns';

const mockHotelBookings = [
  { 
    id: "H1001", 
    hotelId: "GRH123",
    customerName: "David Wilson", 
    phone: "9876543210", 
    email: "david@example.com", 
    checkinDate: new Date("2025-06-01"), 
    checkoutDate: new Date("2025-06-03"), 
    amount: 4200,
    idProof: "passport.jpg",
    journeyDetails: "Business trip, arriving by flight AI101 at 11:00 AM"
  },
  { 
    id: "H1002", 
    hotelId: "SRH456",
    customerName: "Jennifer Brown", 
    phone: "9876543211", 
    email: "jennifer@example.com", 
    checkinDate: new Date("2025-06-05"), 
    checkoutDate: new Date("2025-06-10"), 
    amount: 12500,
    idProof: "driver-license.jpg",
    journeyDetails: "Family vacation, 2 adults, 2 children"
  },
  { 
    id: "H1003", 
    hotelId: "PLZ789",
    customerName: "Michael Johnson", 
    phone: "9876543212", 
    email: "michael@example.com", 
    checkinDate: new Date("2025-06-15"), 
    checkoutDate: new Date("2025-06-17"), 
    amount: 6800,
    idProof: "aadhar-card.jpg",
    journeyDetails: "Anniversary celebration"
  },
  { 
    id: "H1004", 
    hotelId: "SRH456",
    customerName: "Sarah Williams", 
    phone: "9876543213", 
    email: "sarah@example.com", 
    checkinDate: new Date("2025-06-20"), 
    checkoutDate: new Date("2025-06-25"), 
    amount: 15000,
    idProof: "passport.jpg",
    journeyDetails: "Business conference, requires early check-in"
  },
  { 
    id: "H1005", 
    hotelId: "GRH123",
    customerName: "Robert Davis", 
    phone: "9876543214", 
    email: "robert@example.com", 
    checkinDate: new Date("2025-06-28"), 
    checkoutDate: new Date("2025-06-30"), 
    amount: 5600,
    idProof: "voter-id.jpg",
    journeyDetails: "Weekend getaway"
  },
];

const HotelBookings = () => {
  const [bookings, setBookings] = useState(mockHotelBookings);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDetailsModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const columns = [
    { 
      header: 'Booking ID', 
      accessor: 'id',
      filterable: true 
    },
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
      cell: (row) => format(row.checkinDate, 'dd/MM/yyyy'),
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
      cell: (row) => format(row.checkoutDate, 'dd/MM/yyyy'),
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
          onClick={() => openDetailsModal(row)}
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

      {/* Details Modal */}
      {isModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Booking Details</h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Booking ID</p>
                  <p className="font-semibold">{selectedBooking.id}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Hotel ID</p>
                  <p className="font-semibold">{selectedBooking.hotelId}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Customer Name</p>
                  <p className="font-semibold">{selectedBooking.customerName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold">{selectedBooking.phone}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold">{selectedBooking.email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-semibold">₹{selectedBooking.amount.toLocaleString()}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Check-in Date</p>
                  <p className="font-semibold">{format(selectedBooking.checkinDate, 'dd/MM/yyyy')}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Check-out Date</p>
                  <p className="font-semibold">{format(selectedBooking.checkoutDate, 'dd/MM/yyyy')}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Journey Details</p>
                <p className="p-2 border rounded-md bg-gray-50">{selectedBooking.journeyDetails}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">ID Proof</p>
                <div className="border p-3 rounded-md">
                  <p>{selectedBooking.idProof}</p>
                  {/* In a real app, you would display an image or provide a download link */}
                  <button className="btn btn-sm btn-secondary mt-2">View ID Proof</button>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={closeModal}
                  className="btn btn-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelBookings;
