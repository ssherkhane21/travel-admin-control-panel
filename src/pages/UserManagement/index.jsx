
import React, { useState } from 'react';
import Table from '../../components/ui/Table';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const mockUsers = [
  {
    id: 1,
    name: 'Amit Patel',
    email: 'amit@admin.com',
    mobile: '9876543210',
    role: 'Admin',
    status: 'Active',
    permissions: ['all']
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya@admin.com',
    mobile: '9876543211',
    role: 'Subadmin',
    status: 'Active',
    permissions: ['hotel_management', 'bus_management']
  },
  {
    id: 3,
    name: 'Rahul Kumar',
    email: 'rahul@admin.com',
    mobile: '9876543212',
    role: 'Manager',
    status: 'Inactive',
    permissions: ['taxi_management', 'bike_management']
  },
  {
    id: 4,
    name: 'Neha Singh',
    email: 'neha@admin.com',
    mobile: '9876543213',
    role: 'Manager',
    status: 'Active',
    permissions: ['customer_management']
  },
  {
    id: 5,
    name: 'Vikram Malhotra',
    email: 'vikram@admin.com',
    mobile: '9876543214',
    role: 'Subadmin',
    status: 'Active',
    permissions: ['commission_management', 'coupon_management']
  },
];

const roles = ['Admin', 'Subadmin', 'Manager'];
const statuses = ['Active', 'Inactive'];
const permissionModules = [
  { id: 'hotel_management', name: 'Hotel Management' },
  { id: 'bus_management', name: 'Bus Management' },
  { id: 'taxi_management', name: 'Taxi Management' },
  { id: 'bike_management', name: 'Bike Management' },
  { id: 'customer_management', name: 'Customer Management' },
  { id: 'user_management', name: 'User Management' },
  { id: 'commission_management', name: 'Commission Management' },
  { id: 'coupon_management', name: 'Coupon Management' },
  { id: 'wallet_management', name: 'Wallet Management' },
  { id: 'notification_management', name: 'Notification Management' }
];

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    role: 'Manager',
    status: 'Active',
    permissions: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return { ...prev, permissions: [...prev.permissions, value] };
      } else {
        return { ...prev, permissions: prev.permissions.filter(p => p !== value) };
      }
    });
  };

  const handleAddUser = () => {
    setFormData({
      name: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      role: 'Manager',
      status: 'Active',
      permissions: []
    });
    setEditingUser(null);
    setShowAddModal(true);
  };

  const handleEditUser = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      password: '',
      confirmPassword: '',
      role: user.role,
      status: user.status,
      permissions: user.permissions
    });
    setEditingUser(user);
    setShowAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
      return;
    }

    if (editingUser) {
      // Update existing user
      setUsers(prev => prev.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData } 
          : user
      ));
      toast({
        title: "Success",
        description: "User updated successfully",
      });
    } else {
      // Add new user
      const newUser = {
        id: users.length + 1,
        ...formData
      };
      setUsers(prev => [...prev, newUser]);
      toast({
        title: "Success",
        description: "User added successfully",
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
          onClick={() => handleEditUser(row)}
        >
          {row.name}
        </span>
      )
    },
    { 
      header: 'Email', 
      accessor: 'email', 
      filterable: true
    },
    { 
      header: 'Mobile', 
      accessor: 'mobile', 
      filterable: true
    },
    { 
      header: 'Role', 
      accessor: 'role',
      filterable: true,
      filterComponent: (value, onChange) => (
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="form-control"
        >
          <option value="">All Roles</option>
          {roles.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      )
    },
    { 
      header: 'Status', 
      accessor: 'status',
      filterable: true,
      cell: (row) => (
        <span className={`px-2 py-1 rounded text-xs ${
          row.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
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
        <button 
          className="btn btn-primary btn-sm"
          onClick={() => handleEditUser(row)}
        >
          Edit
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button onClick={handleAddUser}>
          <Plus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>

      <Table
        columns={columns}
        data={users}
        searchable={true}
        filterable={true}
        pagination={true}
      />

      {/* Add/Edit User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {editingUser ? 'Edit User' : 'Add New User'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
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
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mobile">Mobile</label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password {editingUser && '(Leave blank to keep unchanged)'}</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="form-control"
                    required={!editingUser}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="form-control"
                    required={!editingUser}
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
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Permissions</label>
                <div className="grid grid-cols-2 gap-2">
                  {permissionModules.map(module => (
                    <div key={module.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={module.id}
                        value={module.id}
                        checked={formData.permissions.includes(module.id) || formData.permissions.includes('all')}
                        onChange={handlePermissionChange}
                        disabled={formData.role === 'Admin' || formData.permissions.includes('all')}
                        className="mr-2"
                      />
                      <label htmlFor={module.id}>{module.name}</label>
                    </div>
                  ))}
                  <div className="flex items-center col-span-2">
                    <input
                      type="checkbox"
                      id="all-permissions"
                      value="all"
                      checked={formData.permissions.includes('all')}
                      onChange={handlePermissionChange}
                      className="mr-2"
                    />
                    <label htmlFor="all-permissions" className="font-semibold">All Permissions</label>
                  </div>
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
                  {editingUser ? 'Update User' : 'Add User'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
