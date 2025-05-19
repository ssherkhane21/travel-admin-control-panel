
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const mockDailyData = [
  { name: 'Mon', hotel: 40, bus: 24, taxi: 35, bike: 20 },
  { name: 'Tue', hotel: 30, bus: 28, taxi: 25, bike: 18 },
  { name: 'Wed', hotel: 20, bus: 26, taxi: 38, bike: 22 },
  { name: 'Thu', hotel: 27, bus: 20, taxi: 30, bike: 15 },
  { name: 'Fri', hotel: 45, bus: 30, taxi: 40, bike: 25 },
  { name: 'Sat', hotel: 65, bus: 40, taxi: 45, bike: 30 },
  { name: 'Sun', hotel: 50, bus: 38, taxi: 30, bike: 28 },
];

const mockWeeklyData = [
  { name: 'Week 1', hotel: 200, bus: 180, taxi: 220, bike: 150 },
  { name: 'Week 2', hotel: 240, bus: 200, taxi: 180, bike: 160 },
  { name: 'Week 3', hotel: 300, bus: 220, taxi: 250, bike: 170 },
  { name: 'Week 4', hotel: 280, bus: 250, taxi: 260, bike: 180 },
];

const mockMonthlyData = [
  { name: 'Jan', hotel: 1200, bus: 900, taxi: 1100, bike: 700 },
  { name: 'Feb', hotel: 1100, bus: 850, taxi: 950, bike: 680 },
  { name: 'Mar', hotel: 1300, bus: 950, taxi: 1000, bike: 710 },
  { name: 'Apr', hotel: 1400, bus: 1000, taxi: 1200, bike: 800 },
  { name: 'May', hotel: 1500, bus: 1100, taxi: 1300, bike: 900 },
  { name: 'Jun', hotel: 1700, bus: 1300, taxi: 1500, bike: 1000 },
  { name: 'Jul', hotel: 1600, bus: 1200, taxi: 1400, bike: 950 },
  { name: 'Aug', hotel: 1800, bus: 1400, taxi: 1600, bike: 1050 },
  { name: 'Sep', hotel: 1900, bus: 1500, taxi: 1700, bike: 1100 },
  { name: 'Oct', hotel: 2000, bus: 1600, taxi: 1800, bike: 1200 },
  { name: 'Nov', hotel: 1800, bus: 1400, taxi: 1500, bike: 1000 },
  { name: 'Dec', hotel: 2200, bus: 1800, taxi: 2000, bike: 1300 },
];

const mockYearlyData = [
  { name: '2021', hotel: 15000, bus: 12000, taxi: 13000, bike: 9000 },
  { name: '2022', hotel: 18000, bus: 14000, taxi: 15000, bike: 10000 },
  { name: '2023', hotel: 22000, bus: 16000, taxi: 17000, bike: 11000 },
  { name: '2024', hotel: 25000, bus: 18000, taxi: 19000, bike: 12000 },
];

const AnalyticsChart = () => {
  const [timeframe, setTimeframe] = useState('daily');
  const [chartType, setChartType] = useState('line');
  const [chartData, setChartData] = useState(mockDailyData);

  useEffect(() => {
    // Update data based on selected timeframe
    switch (timeframe) {
      case 'daily':
        setChartData(mockDailyData);
        break;
      case 'weekly':
        setChartData(mockWeeklyData);
        break;
      case 'monthly':
        setChartData(mockMonthlyData);
        break;
      case 'yearly':
        setChartData(mockYearlyData);
        break;
      default:
        setChartData(mockDailyData);
    }
  }, [timeframe]);

  const exportData = (format) => {
    // In a real application, this would generate and download the file
    alert(`Exporting data in ${format.toUpperCase()} format`);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Booking Analytics</h2>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {['daily', 'weekly', 'monthly', 'yearly'].map(option => (
              <button
                key={option}
                className={`btn btn-sm ${timeframe === option ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setTimeframe(option)}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {['line', 'bar'].map(type => (
              <button
                key={type}
                className={`btn btn-sm ${chartType === type ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setChartType(type)}
              >
                {type === 'line' ? 'Line' : 'Bar'}
              </button>
            ))}
          </div>
          <div className="dropdown relative">
            <button className="btn btn-secondary btn-sm">
              Export
            </button>
            <div className="dropdown-menu absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg hidden">
              <button className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left" onClick={() => exportData('pdf')}>
                Export as PDF
              </button>
              <button className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left" onClick={() => exportData('xls')}>
                Export as XLS
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="hotel" stroke="#1a73e8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="bus" stroke="#34a853" />
                <Line type="monotone" dataKey="taxi" stroke="#fbbc04" />
                <Line type="monotone" dataKey="bike" stroke="#ea4335" />
              </LineChart>
            ) : (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="hotel" fill="#1a73e8" />
                <Bar dataKey="bus" fill="#34a853" />
                <Bar dataKey="taxi" fill="#fbbc04" />
                <Bar dataKey="bike" fill="#ea4335" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;
