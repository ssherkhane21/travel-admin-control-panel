
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Table from '../../components/ui/Table';

const mockBuses = [
  {
    id: 1,
    operatorId: 1,
    registrationNumber: 'DL01AB1234',
    busType: 'Sleeper',
    seats: 36,
    acStatus: 'AC',
    manufactureYear: 2022,
    status: 'Active'
  },
  {
    id: 2,
    operatorId: 1,
    registrationNumber: 'DL01CD5678',
    busType: 'Semi-Sleeper',
    seats: 40,
    acStatus: 'Non-AC',
    manufactureYear: 2021,
    status: 'Active'
  },
  {
    id: 3,
    operatorId: 1,
    registrationNumber: 'DL01EF9012',
    busType: 'Seater',
    seats: 54,
    acStatus: 'AC',
    manufactureYear: 2023,
    status: 'Active'
  },
  {
    id: 4,
    operatorId: 1,
    registrationNumber: 'DL01GH3456',
    busType: 'Volvo Multi-Axle',
    seats: 32,
    acStatus: 'AC',
    manufactureYear: 2022,
    status: 'Maintenance'
  },
  {
    id: 5,
    operatorId: 2,
    registrationNumber: 'MH02IJ7890',
    busType: 'Sleeper',
    seats: 36,
    acStatus: 'AC',
    manufactureYear: 2023,
    status: 'Active'
  },
  {
    id: 6,
    operatorId: 2,
    registrationNumber: 'MH02KL1234',
    busType: 'Double Decker',
    seats: 70,
    acStatus: 'AC',
    manufactureYear: 2021,
    status: 'Active'
  },
  {
    id: 7,
    operatorId: 3,
    registrationNumber: 'KA03MN5678',
    busType: 'Sleeper',
    seats: 36,
    acStatus: 'Non-AC',
    manufactureYear: 2020,
    status: 'Inactive'
  },
  {
    id: 8,
    operatorId: 1,
    registrationNumber: 'DL01OP9012',
    busType: 'Luxury',
    seats: 28,
    acStatus: 'AC',
    manufactureYear: 2023,
    status: 'Active'
  }
];

const BusOperatorBuses = () => {
  const { id } = useParams();
  const [buses, setBuses] = useState([]);
  const [operatorName, setOperatorName] = useState('');
  
  useEffect(() => {
    // Filter buses for this operator
    const operatorBuses = mockBuses.filter(bus => bus.operatorId === parseInt(id));
    setBuses(operatorBuses);
    
    // Set operator name (in a real app, would be fetched from API)
    const operatorNames = {
      '1': 'Sharma Travels',
      '2': 'City Express',
      '3': 'Highway Kings',
      '4': 'Red Bus Lines',
      '5': 'Luxury Travels'
    };
    setOperatorName(operatorNames[id] || 'Unknown Operator');
  }, [id]);
  
  const columns = [
    {
      header: 'Registration No.',
      accessor: 'registrationNumber',
      filterable: true
    },
    {
      header: 'Bus Type',
      accessor: 'busType',
      filterable: true
    },
    {
      header: 'Seats',
      accessor: 'seats'
    },
    {
      header: 'AC Status',
      accessor: 'acStatus',
      filterable: true,
      filterComponent: (value, onChange) => (
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="form-control"
        >
          <option value="">All</option>
          <option value="AC">AC</option>
          <option value="Non-AC">Non-AC</option>
        </select>
      )
    },
    {
      header: 'Year',
      accessor: 'manufactureYear'
    },
    {
      header: 'Status',
      accessor: 'status',
      filterable: true,
      cell: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.status === 'Active' ? 'status-approved' : 
          row.status === 'Maintenance' ? 'status-pending' : 
          'status-rejected'
        }`}>
          {row.status}
        </span>
      ),
      filterComponent: (value, onChange) => (
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="form-control"
        >
          <option value="">All</option>
          <option value="Active">Active</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Inactive">Inactive</option>
        </select>
      )
    },
    {
      header: 'Action',
      accessor: 'action',
      noSearch: true,
      cell: (row) => (
        <Button 
          variant="outline"
          size="sm"
          className="text-primary hover:text-primary"
        >
          View Details
        </Button>
      )
    }
  ];
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-6">
        <Link to={`/bus-management/operators/${id}`} className="mr-2">
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{operatorName} - Buses</h1>
        <div className="ml-auto">
          <Button>
            Add New Bus
          </Button>
        </div>
      </div>
      
      <Table
        columns={columns}
        data={buses}
        searchable={true}
        filterable={true}
        pagination={true}
      />
    </div>
  );
};

export default BusOperatorBuses;
