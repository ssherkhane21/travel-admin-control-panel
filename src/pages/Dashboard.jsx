
import React, { useState } from 'react';
import AnalyticsChart from '../components/dashboard/AnalyticsChart';

const mockPaymentsData = [
  { id: 1, user: 'John Doe', service: 'Hotel Booking', amount: 2500, status: 'Completed', date: '2024-05-18' },
  { id: 2, user: 'Jane Smith', service: 'Bus Booking', amount: 1200, status: 'Completed', date: '2024-05-17' },
  { id: 3, user: 'Mike Johnson', service: 'Taxi Ride', amount: 350, status: 'Refunded', date: '2024-05-17' },
  { id: 4, user: 'Emily Brown', service: 'Bike Rental', amount: 200, status: 'Completed', date: '2024-05-16' },
  { id: 5, user: 'Alex Wilson', service: 'Hotel Booking', amount: 3200, status: 'Pending', date: '2024-05-16' }
];

const mockMetricsData = [
  { title: 'Total Bookings', value: '2,345', change: '+12%', icon: '📊' },
  { title: 'Revenue', value: '₹1,23,456', change: '+8%', icon: '💰' },
  { title: 'Active Users', value: '1,234', change: '+5%', icon: '👥' },
  { title: 'Avg. Booking Value', value: '₹520', change: '+2%', icon: '📈' },
];

const Dashboard = () => {
  const [dateRange, setDateRange] = useState('last7Days');
  const [activeTab, setActiveTab] = useState('overview');

  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
          <select 
            className="form-control" 
            value={dateRange}
            onChange={handleDateRangeChange}
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last7Days">Last 7 Days</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="custom">Custom Range</option>
          </select>
          <button className="btn btn-primary">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {mockMetricsData.map((metric, index) => (
          <div key={index} className="card">
            <div className="p-4 flex items-center">
              <div className="mr-4 text-3xl">{metric.icon}</div>
              <div>
                <h3 className="text-sm text-gray-500">{metric.title}</h3>
                <p className="text-xl font-bold">{metric.value}</p>
                <span className={`text-sm ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change} from last period
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnalyticsChart />

      <div className="card mb-6">
        <div className="card-header">
          <div className="flex">
            <button 
              className={`mr-4 pb-2 font-medium ${activeTab === 'overview' ? 'border-b-2 border-primary text-primary' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Revenue Overview
            </button>
            <button 
              className={`mr-4 pb-2 font-medium ${activeTab === 'payments' ? 'border-b-2 border-primary text-primary' : ''}`}
              onClick={() => setActiveTab('payments')}
            >
              Recent Payments
            </button>
            <button 
              className={`mr-4 pb-2 font-medium ${activeTab === 'refunds' ? 'border-b-2 border-primary text-primary' : ''}`}
              onClick={() => setActiveTab('refunds')}
            >
              Refunds
            </button>
            <button 
              className={`mr-4 pb-2 font-medium ${activeTab === 'wallet' ? 'border-b-2 border-primary text-primary' : ''}`}
              onClick={() => setActiveTab('wallet')}
            >
              Wallet Usage
            </button>
          </div>
          <div>
            <button className="btn btn-secondary btn-sm">
              Export
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Service</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {mockPaymentsData.map(payment => (
                  <tr key={payment.id}>
                    <td>#{payment.id}</td>
                    <td>{payment.user}</td>
                    <td>{payment.service}</td>
                    <td>₹{payment.amount}</td>
                    <td>
                      <span className={`badge ${
                        payment.status === 'Completed' ? 'badge-success' : 
                        payment.status === 'Pending' ? 'badge-warning' : 
                        'badge-danger'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td>{payment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
