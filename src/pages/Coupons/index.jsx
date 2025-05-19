
import React, { useState } from 'react';
import Table from '../../components/ui/Table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const mockCoupons = [
  {
    id: 1,
    name: 'SUMMER25',
    serviceType: 'Bus Booking',
    code: 'SUMMER25BUS',
    discountType: 'Percentage',
    discountValue: 25,
    expiryDate: '2025-06-30',
    expiryTime: '23:59',
    status: 'Active'
  },
  {
    id: 2,
    name: 'TAXIRIDE',
    serviceType: 'Taxi Booking',
    code: 'TAXI100OFF',
    discountType: 'Fixed',
    discountValue: 100,
    expiryDate: '2025-07-15',
    expiryTime: '23:59',
    status: 'Active'
  },
  {
    id: 3,
    name: 'HOTELDEAL',
    serviceType: 'Hotel Booking',
    code: 'HOTEL15PCT',
    discountType: 'Percentage',
    discountValue: 15,
    expiryDate: '2025-08-31',
    expiryTime: '23:59',
    status: 'Active'
  },
  {
    id: 4,
    name: 'BIKERIDE',
    serviceType: 'Bike Booking',
    code: 'BIKE50OFF',
    discountType: 'Fixed',
    discountValue: 50,
    expiryDate: '2025-07-10',
    expiryTime: '23:59',
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'FESTIVE',
    serviceType: 'All Services',
    code: 'FESTIVE10',
    discountType: 'Percentage',
    discountValue: 10,
    expiryDate: '2025-11-10',
    expiryTime: '23:59',
    status: 'Scheduled'
  },
];

const serviceTypes = ['All Services', 'Bus Booking', 'Taxi Booking', 'Bike Booking', 'Hotel Booking'];
const discountTypes = ['Percentage', 'Fixed'];
const statusOptions = ['Active', 'Inactive', 'Scheduled'];

const CouponsManagement = () => {
  const [coupons, setCoupons] = useState(mockCoupons);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    serviceType: 'Bus Booking',
    code: '',
    discountType: 'Percentage',
    discountValue: '',
    expiryDate: '',
    expiryTime: '23:59',
    status: 'Active'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCoupon = () => {
    const today = new Date().toISOString().split('T')[0];
    setFormData({
      name: '',
      serviceType: 'Bus Booking',
      code: '',
      discountType: 'Percentage',
      discountValue: '',
      expiryDate: today,
      expiryTime: '23:59',
      status: 'Active'
    });
    setEditingCoupon(null);
    setShowAddModal(true);
  };

  const handleEditCoupon = (coupon) => {
    setFormData({
      name: coupon.name,
      serviceType: coupon.serviceType,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      expiryDate: coupon.expiryDate,
      expiryTime: coupon.expiryTime,
      status: coupon.status
    });
    setEditingCoupon(coupon);
    setShowAddModal(true);
  };

  const handleStatusChange = (id, newStatus) => {
    setCoupons(prev => 
      prev.map(coupon => 
        coupon.id === id ? { ...coupon, status: newStatus } : coupon
      )
    );
    
    toast({
      title: "Status updated",
      description: `Coupon status changed to ${newStatus}`,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingCoupon) {
      // Update existing coupon
      setCoupons(prev => prev.map(coupon => 
        coupon.id === editingCoupon.id 
          ? { ...coupon, ...formData } 
          : coupon
      ));
      toast({
        title: "Success",
        description: "Coupon updated successfully",
      });
    } else {
      // Add new coupon
      const newCoupon = {
        id: coupons.length + 1,
        ...formData
      };
      setCoupons(prev => [...prev, newCoupon]);
      toast({
        title: "Success",
        description: "Coupon added successfully",
      });
    }
    
    setShowAddModal(false);
  };

  const columns = [
    { 
      header: 'Name', 
      accessor: 'name', 
      filterable: true,
      cell: (row) => (
        <span
          className="text-primary cursor-pointer hover:underline"
          onClick={() => handleEditCoupon(row)}
        >
          {row.name}
        </span>
      )
    },
    { 
      header: 'Code', 
      accessor: 'code', 
      filterable: true,
    },
    { 
      header: 'Service Type', 
      accessor: 'serviceType', 
      filterable: true,
      filterComponent: (value, onChange) => (
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="form-control"
        >
          <option value="">All Services</option>
          {serviceTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      )
    },
    { 
      header: 'Discount', 
      accessor: 'discountValue', 
      cell: (row) => (
        <span>
          {row.discountType === 'Percentage' 
            ? `${row.discountValue}%` 
            : `₹${row.discountValue}`
          }
        </span>
      )
    },
    { 
      header: 'Expiry', 
      accessor: 'expiryDate',
      cell: (row) => (
        <span>{row.expiryDate} {row.expiryTime}</span>
      )
    },
    { 
      header: 'Status', 
      accessor: 'status',
      filterable: true,
      cell: (row) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className={`form-select ${
            row.status === 'Active' ? 'text-green-600' : 
            row.status === 'Scheduled' ? 'text-blue-600' : 'text-red-600'
          }`}
        >
          {statusOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      )
    },
    {
      header: 'Action',
      accessor: 'action',
      noSearch: true,
      cell: (row) => (
        <button 
          className="btn btn-primary btn-sm"
          onClick={() => handleEditCoupon(row)}
        >
          Edit
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Coupons Management</h1>
        <Button onClick={handleAddCoupon}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Coupon
        </Button>
      </div>

      <Table
        columns={columns}
        data={coupons}
        searchable={true}
        filterable={true}
        pagination={true}
      />

      {/* Add/Edit Coupon Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {editingCoupon ? 'Edit Coupon' : 'Add New Coupon'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-group">
                  <label htmlFor="name">Coupon Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="code">Coupon Code</label>
                  <input
                    type="text"
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="serviceType">Service Type</label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    {serviceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="discountType">Discount Type</label>
                  <select
                    id="discountType"
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    {discountTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="discountValue">
                    {formData.discountType === 'Percentage' ? 'Discount (%)' : 'Discount Amount (₹)'}
                  </label>
                  <input
                    type="number"
                    id="discountValue"
                    name="discountValue"
                    value={formData.discountValue}
                    onChange={handleInputChange}
                    min={formData.discountType === 'Percentage' ? "0" : "1"}
                    max={formData.discountType === 'Percentage' ? "100" : ""}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="date"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="expiryTime">Expiry Time</label>
                  <input
                    type="time"
                    id="expiryTime"
                    name="expiryTime"
                    value={formData.expiryTime}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingCoupon ? 'Update Coupon' : 'Add Coupon'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponsManagement;
