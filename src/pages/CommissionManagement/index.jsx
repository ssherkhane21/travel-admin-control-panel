
import React, { useState } from 'react';
import Table from '../../components/ui/Table';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const mockCommissions = [
  {
    id: 1,
    name: 'Bus Summer Offer',
    serviceType: 'Bus Booking',
    commissionType: 'Percentage',
    commissionValue: 5,
    startDate: '2025-05-01',
    startTime: '00:00',
    endDate: '2025-06-30',
    endTime: '23:59',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Taxi Premium',
    serviceType: 'Taxi Booking',
    commissionType: 'Fixed',
    commissionValue: 50,
    startDate: '2025-05-15',
    startTime: '00:00',
    endDate: '2025-07-15',
    endTime: '23:59',
    status: 'Inactive'
  },
  {
    id: 3,
    name: 'Hotel Luxury',
    serviceType: 'Hotel Booking',
    commissionType: 'Percentage',
    commissionValue: 8,
    startDate: '2025-06-01',
    startTime: '00:00',
    endDate: '2025-08-31',
    endTime: '23:59',
    status: 'Active'
  },
  {
    id: 4,
    name: 'Bike Weekday',
    serviceType: 'Bike Booking',
    commissionType: 'Fixed',
    commissionValue: 20,
    startDate: '2025-05-10',
    startTime: '00:00',
    endDate: '2025-07-10',
    endTime: '23:59',
    status: 'Active'
  },
  {
    id: 5,
    name: 'All Services Diwali',
    serviceType: 'All Services',
    commissionType: 'Percentage',
    commissionValue: 10,
    startDate: '2025-11-01',
    startTime: '00:00',
    endDate: '2025-11-10',
    endTime: '23:59',
    status: 'Scheduled'
  },
];

const serviceTypes = ['All Services', 'Bus Booking', 'Taxi Booking', 'Bike Booking', 'Hotel Booking'];
const commissionTypes = ['Percentage', 'Fixed'];
const statusOptions = ['Active', 'Inactive', 'Scheduled'];

const CommissionManagement = () => {
  const [commissions, setCommissions] = useState(mockCommissions);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCommission, setEditingCommission] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    serviceType: 'Bus Booking',
    commissionType: 'Percentage',
    commissionValue: '',
    startDate: '',
    startTime: '00:00',
    endDate: '',
    endTime: '23:59',
    status: 'Active'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCommission = () => {
    const today = new Date().toISOString().split('T')[0];
    setFormData({
      name: '',
      serviceType: 'Bus Booking',
      commissionType: 'Percentage',
      commissionValue: '',
      startDate: today,
      startTime: '00:00',
      endDate: today,
      endTime: '23:59',
      status: 'Active'
    });
    setEditingCommission(null);
    setShowAddModal(true);
  };

  const handleEditCommission = (commission) => {
    setFormData({
      name: commission.name,
      serviceType: commission.serviceType,
      commissionType: commission.commissionType,
      commissionValue: commission.commissionValue,
      startDate: commission.startDate,
      startTime: commission.startTime,
      endDate: commission.endDate,
      endTime: commission.endTime,
      status: commission.status
    });
    setEditingCommission(commission);
    setShowAddModal(true);
  };

  const handleStatusChange = (id, newStatus) => {
    setCommissions(prev => 
      prev.map(commission => 
        commission.id === id ? { ...commission, status: newStatus } : commission
      )
    );
    
    toast({
      title: "Status updated",
      description: `Commission status changed to ${newStatus}`,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingCommission) {
      // Update existing commission
      setCommissions(prev => prev.map(commission => 
        commission.id === editingCommission.id 
          ? { ...commission, ...formData } 
          : commission
      ));
      toast({
        title: "Success",
        description: "Commission updated successfully",
      });
    } else {
      // Add new commission
      const newCommission = {
        id: commissions.length + 1,
        ...formData
      };
      setCommissions(prev => [...prev, newCommission]);
      toast({
        title: "Success",
        description: "Commission added successfully",
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
          onClick={() => handleEditCommission(row)}
        >
          {row.name}
        </span>
      )
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
      header: 'Commission', 
      accessor: 'commissionValue', 
      cell: (row) => (
        <span>
          {row.commissionType === 'Percentage' 
            ? `${row.commissionValue}%` 
            : `₹${row.commissionValue}`
          }
        </span>
      )
    },
    { 
      header: 'Start Date', 
      accessor: 'startDate',
      cell: (row) => (
        <span>{row.startDate} {row.startTime}</span>
      )
    },
    { 
      header: 'End Date', 
      accessor: 'endDate',
      cell: (row) => (
        <span>{row.endDate} {row.endTime}</span>
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
          onClick={() => handleEditCommission(row)}
        >
          Edit
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Commission Management</h1>
        <Button onClick={handleAddCommission}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Commission
        </Button>
      </div>

      <Table
        columns={columns}
        data={commissions}
        searchable={true}
        filterable={true}
        pagination={true}
      />

      {/* Add/Edit Commission Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {editingCommission ? 'Edit Commission' : 'Add New Commission'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-group md:col-span-2">
                  <label htmlFor="name">Commission Name</label>
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
                  <label htmlFor="commissionType">Commission Type</label>
                  <select
                    id="commissionType"
                    name="commissionType"
                    value={formData.commissionType}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    {commissionTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="commissionValue">
                    {formData.commissionType === 'Percentage' ? 'Percentage (%)' : 'Fixed Amount (₹)'}
                  </label>
                  <input
                    type="number"
                    id="commissionValue"
                    name="commissionValue"
                    value={formData.commissionValue}
                    onChange={handleInputChange}
                    min={formData.commissionType === 'Percentage' ? "0" : "1"}
                    max={formData.commissionType === 'Percentage' ? "100" : ""}
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
                  <label htmlFor="startDate">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="startTime">Start Time</label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="endDate">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="endTime">End Time</label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
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
                  {editingCommission ? 'Update Commission' : 'Add Commission'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommissionManagement;
