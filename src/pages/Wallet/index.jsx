
import React, { useState } from 'react';
import Table from '../../components/ui/Table';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

const mockTransactions = [
  {
    id: 'TX1001',
    userId: 'USR101',
    userName: 'Rahul Sharma',
    type: 'Credit',
    amount: 500,
    description: 'Refund for cancelled booking',
    date: '2025-05-15',
    time: '14:30:45',
    status: 'Completed'
  },
  {
    id: 'TX1002',
    userId: 'USR102',
    userName: 'Priya Singh',
    type: 'Debit',
    amount: 800,
    description: 'Hotel booking payment',
    date: '2025-05-16',
    time: '09:45:23',
    status: 'Completed'
  },
  {
    id: 'TX1003',
    userId: 'USR103',
    userName: 'Amit Kumar',
    type: 'Withdrawal',
    amount: 1200,
    description: 'Bank transfer',
    date: '2025-05-17',
    time: '16:20:10',
    status: 'Pending'
  },
  {
    id: 'TX1004',
    userId: 'USR101',
    userName: 'Rahul Sharma',
    type: 'Credit',
    amount: 300,
    description: 'Referral bonus',
    date: '2025-05-18',
    time: '11:05:37',
    status: 'Completed'
  },
  {
    id: 'TX1005',
    userId: 'USR104',
    userName: 'Sunita Patel',
    type: 'Debit',
    amount: 650,
    description: 'Taxi booking payment',
    date: '2025-05-19',
    time: '13:15:42',
    status: 'Failed'
  },
];

const transactionTypes = ['All Types', 'Credit', 'Debit', 'Withdrawal'];
const transactionStatuses = ['All Statuses', 'Completed', 'Pending', 'Failed'];

const mockWalletSettings = {
  withdrawalLimits: {
    minimum: 100,
    maximum: 10000,
    dailyLimit: 20000
  },
  transferSettings: {
    fee: 2.5,
    instantTransfer: true,
    whitelistedBanks: ['HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank']
  }
};

const WalletManagement = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [walletSettings, setWalletSettings] = useState(mockWalletSettings);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [minAmount, setMinAmount] = useState(walletSettings.withdrawalLimits.minimum);
  const [maxAmount, setMaxAmount] = useState(walletSettings.withdrawalLimits.maximum);
  const [dailyLimit, setDailyLimit] = useState(walletSettings.withdrawalLimits.dailyLimit);

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleSaveSettings = () => {
    setWalletSettings(prev => ({
      ...prev,
      withdrawalLimits: {
        ...prev.withdrawalLimits,
        minimum: Number(minAmount),
        maximum: Number(maxAmount),
        dailyLimit: Number(dailyLimit)
      }
    }));
    
    toast({
      title: "Settings saved",
      description: "Wallet settings updated successfully",
    });
  };

  const columns = [
    { 
      header: 'Transaction ID', 
      accessor: 'id', 
      filterable: true,
      cell: (row) => (
        <span
          className="text-primary cursor-pointer hover:underline"
          onClick={() => handleViewTransaction(row)}
        >
          {row.id}
        </span>
      )
    },
    { 
      header: 'User', 
      accessor: 'userName', 
      filterable: true
    },
    { 
      header: 'Type', 
      accessor: 'type', 
      filterable: true,
      filterComponent: (value, onChange) => (
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="form-control"
        >
          <option value="">All Types</option>
          {transactionTypes.filter(t => t !== 'All Types').map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      ),
      cell: (row) => (
        <span className={`px-2 py-1 rounded text-xs ${
          row.type === 'Credit' ? 'bg-green-100 text-green-700' : 
          row.type === 'Debit' ? 'bg-red-100 text-red-700' : 
          'bg-blue-100 text-blue-700'
        }`}>
          {row.type}
        </span>
      )
    },
    { 
      header: 'Amount (₹)', 
      accessor: 'amount',
      cell: (row) => (
        <span className={row.type === 'Credit' ? 'text-green-600' : 'text-red-600'}>
          {row.type === 'Credit' ? '+' : '-'}₹{row.amount.toLocaleString()}
        </span>
      )
    },
    { 
      header: 'Description', 
      accessor: 'description',
      filterable: true
    },
    { 
      header: 'Date & Time', 
      accessor: 'date',
      cell: (row) => (
        <span>{row.date} {row.time}</span>
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
      filterComponent: (value, onChange) => (
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="form-control"
        >
          <option value="">All Statuses</option>
          {transactionStatuses.filter(s => s !== 'All Statuses').map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      ),
      cell: (row) => (
        <span className={`px-2 py-1 rounded text-xs ${
          row.status === 'Completed' ? 'bg-green-100 text-green-700' : 
          row.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
          'bg-red-100 text-red-700'
        }`}>
          {row.status}
        </span>
      )
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Wallet Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Withdrawal Limits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-group">
                <label htmlFor="minAmount">Minimum Amount (₹)</label>
                <input
                  type="number"
                  id="minAmount"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                  className="form-control"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="maxAmount">Maximum Amount (₹)</label>
                <input
                  type="number"
                  id="maxAmount"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                  className="form-control"
                  min={minAmount}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dailyLimit">Daily Limit (₹)</label>
                <input
                  type="number"
                  id="dailyLimit"
                  value={dailyLimit}
                  onChange={(e) => setDailyLimit(e.target.value)}
                  className="form-control"
                  min={maxAmount}
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button 
                className="btn btn-primary"
                onClick={handleSaveSettings}
              >
                Save Settings
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transfer Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="form-group">
                <label htmlFor="transferFee">Transfer Fee (%)</label>
                <input
                  type="number"
                  id="transferFee"
                  value={walletSettings.transferSettings.fee}
                  readOnly
                  className="form-control bg-gray-50"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="instantTransfer"
                  checked={walletSettings.transferSettings.instantTransfer}
                  readOnly
                  className="mr-2"
                />
                <label htmlFor="instantTransfer">Enable Instant Transfer</label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold mb-4">Transaction History</h2>
      <Table
        columns={columns}
        data={transactions}
        searchable={true}
        filterable={true}
        pagination={true}
      />

      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Transaction Details</h2>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedTransaction(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-gray-500">Transaction ID</p>
                <p className="font-medium">{selectedTransaction.id}</p>
              </div>
              <div>
                <p className="text-gray-500">User</p>
                <p className="font-medium">{selectedTransaction.userName} ({selectedTransaction.userId})</p>
              </div>
              <div>
                <p className="text-gray-500">Type</p>
                <p className={`font-medium ${
                  selectedTransaction.type === 'Credit' ? 'text-green-600' : 
                  selectedTransaction.type === 'Debit' ? 'text-red-600' : 'text-blue-600'
                }`}>
                  {selectedTransaction.type}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Amount</p>
                <p className={`font-medium ${
                  selectedTransaction.type === 'Credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selectedTransaction.type === 'Credit' ? '+' : '-'}₹{selectedTransaction.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Date & Time</p>
                <p className="font-medium">{selectedTransaction.date} {selectedTransaction.time}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p className={`font-medium ${
                  selectedTransaction.status === 'Completed' ? 'text-green-600' : 
                  selectedTransaction.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {selectedTransaction.status}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500">Description</p>
                <p className="font-medium">{selectedTransaction.description}</p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                className="btn btn-secondary"
                onClick={() => setSelectedTransaction(null)}
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

export default WalletManagement;
