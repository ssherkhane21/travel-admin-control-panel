
import React, { useState } from 'react';
import Table from '../../components/ui/Table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const mockNotifications = [
  {
    id: 1,
    title: 'Summer Travel Sale',
    message: 'Get 20% off on all bookings this summer season!',
    targetGroup: 'All Users',
    sentDate: '2025-05-15',
    sentTime: '09:30:00',
    status: 'Sent'
  },
  {
    id: 2,
    title: 'New Driver Onboarding',
    message: 'Complete your profile to start accepting rides.',
    targetGroup: 'Taxi Drivers',
    sentDate: '2025-05-16',
    sentTime: '14:45:00',
    status: 'Sent'
  },
  {
    id: 3,
    title: 'Hotel Partnership Program',
    message: 'Join our premium partner program for higher visibility.',
    targetGroup: 'Hotel Managers',
    sentDate: '2025-05-17',
    sentTime: '11:20:00',
    status: 'Scheduled'
  },
  {
    id: 4,
    title: 'Ride Cancellation Policy Update',
    message: 'Important updates to our cancellation policy.',
    targetGroup: 'Customers',
    sentDate: '2025-05-18',
    sentTime: '16:00:00',
    status: 'Draft'
  },
  {
    id: 5,
    title: 'Bus Route Changes',
    message: 'New routes added for weekend services.',
    targetGroup: 'Bus Operators',
    sentDate: '2025-05-19',
    sentTime: '10:15:00',
    status: 'Draft'
  },
];

const targetGroups = [
  'All Users',
  'Customers',
  'Taxi Drivers',
  'Bike Riders',
  'Bus Operators',
  'Hotel Managers'
];

const statusOptions = ['Draft', 'Scheduled', 'Sent'];

const NotificationsManagement = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNotification, setEditingNotification] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    targetGroup: 'All Users',
    scheduledDate: '',
    scheduledTime: '',
    status: 'Draft'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddNotification = () => {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toTimeString().slice(0, 5);
    
    setFormData({
      title: '',
      message: '',
      targetGroup: 'All Users',
      scheduledDate: today,
      scheduledTime: now,
      status: 'Draft'
    });
    setEditingNotification(null);
    setShowAddModal(true);
  };

  const handleEditNotification = (notification) => {
    setFormData({
      title: notification.title,
      message: notification.message,
      targetGroup: notification.targetGroup,
      scheduledDate: notification.sentDate,
      scheduledTime: notification.sentTime,
      status: notification.status
    });
    setEditingNotification(notification);
    setShowAddModal(true);
  };

  const handleSendNow = (notification) => {
    if (notification.status === 'Sent') {
      toast({
        title: "Already sent",
        description: "This notification has already been sent.",
      });
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toTimeString().slice(0, 8);
    
    setNotifications(prev => 
      prev.map(item => 
        item.id === notification.id 
          ? { ...item, status: 'Sent', sentDate: currentDate, sentTime: currentTime } 
          : item
      )
    );
    
    toast({
      title: "Notification sent",
      description: `"${notification.title}" has been sent to ${notification.targetGroup}`,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingNotification) {
      // Update existing notification
      setNotifications(prev => prev.map(notification => 
        notification.id === editingNotification.id 
          ? { 
              ...notification, 
              title: formData.title,
              message: formData.message,
              targetGroup: formData.targetGroup,
              sentDate: formData.scheduledDate,
              sentTime: formData.scheduledTime,
              status: formData.status
            } 
          : notification
      ));
      toast({
        title: "Success",
        description: "Notification updated successfully",
      });
    } else {
      // Add new notification
      const newNotification = {
        id: notifications.length + 1,
        title: formData.title,
        message: formData.message,
        targetGroup: formData.targetGroup,
        sentDate: formData.scheduledDate,
        sentTime: formData.scheduledTime,
        status: formData.status
      };
      setNotifications(prev => [...prev, newNotification]);
      toast({
        title: "Success",
        description: "Notification created successfully",
      });
    }
    
    setShowAddModal(false);
  };

  const columns = [
    { 
      header: 'Title', 
      accessor: 'title', 
      filterable: true,
      cell: (row) => (
        <span
          className="text-primary cursor-pointer hover:underline"
          onClick={() => handleEditNotification(row)}
        >
          {row.title}
        </span>
      )
    },
    { 
      header: 'Target Group', 
      accessor: 'targetGroup', 
      filterable: true,
      filterComponent: (value, onChange) => (
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="form-control"
        >
          <option value="">All Groups</option>
          {targetGroups.map(group => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>
      )
    },
    { 
      header: 'Date & Time', 
      accessor: 'sentDate',
      cell: (row) => (
        <span>{row.sentDate} {row.sentTime}</span>
      ),
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
      header: 'Status', 
      accessor: 'status',
      filterable: true,
      cell: (row) => (
        <span className={`px-2 py-1 rounded text-xs ${
          row.status === 'Sent' ? 'bg-green-100 text-green-700' : 
          row.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 
          'bg-gray-100 text-gray-700'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      header: 'Action',
      accessor: 'action',
      noSearch: true,
      cell: (row) => (
        <div className="flex gap-2">
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => handleEditNotification(row)}
          >
            Edit
          </button>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => handleSendNow(row)}
            disabled={row.status === 'Sent'}
          >
            Send Now
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notifications Management</h1>
        <Button onClick={handleAddNotification}>
          <Plus className="h-4 w-4 mr-2" />
          Create Notification
        </Button>
      </div>

      <Table
        columns={columns}
        data={notifications}
        searchable={true}
        filterable={true}
        pagination={true}
      />

      {/* Add/Edit Notification Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {editingNotification ? 'Edit Notification' : 'Create New Notification'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="form-group">
                  <label htmlFor="title">Notification Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-control"
                    rows="4"
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="targetGroup">Target Group</label>
                  <select
                    id="targetGroup"
                    name="targetGroup"
                    value={formData.targetGroup}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    {targetGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="form-group">
                    <label htmlFor="scheduledDate">Scheduled Date</label>
                    <input
                      type="date"
                      id="scheduledDate"
                      name="scheduledDate"
                      value={formData.scheduledDate}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="scheduledTime">Scheduled Time</label>
                    <input
                      type="time"
                      id="scheduledTime"
                      name="scheduledTime"
                      value={formData.scheduledTime}
                      onChange={handleInputChange}
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
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingNotification ? 'Update' : 'Create'}
                </Button>
                {!editingNotification && (
                  <Button 
                    type="button" 
                    onClick={() => {
                      setFormData(prev => ({ ...prev, status: 'Sent' }));
                      setTimeout(() => handleSubmit({ preventDefault: () => {} }), 0);
                      toast({
                        title: "Notification sent",
                        description: "Notification has been sent immediately",
                      });
                    }}
                  >
                    Create & Send Now
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsManagement;
