import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileSpreadsheet, 
  File, 
  Table, 
  BarChart2, 
  PieChart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { format } from 'date-fns';

const SReport = () => {
  const [activeView, setActiveView] = useState('table');
  const [selectedDevice, setSelectedDevice] = useState('');
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null
  });

  // Sample devices
  const devices = [
    { id: '1', name: 'Biogas Reactor A' },
    { id: '2', name: 'Biogas Reactor B' },
    { id: '3', name: 'Waste Processing Unit' },
    { id: '4', name: 'Energy Storage System' }
  ];

  // Sample report data
  const reportData = [
    { 
      id: 1, 
      device: 'Biogas Reactor A', 
      date: '2024-03-15', 
      production: '450 m³', 
      efficiency: '85%', 
      carbonOffset: '320 kg' 
    },
    { 
      id: 2, 
      device: 'Biogas Reactor A', 
      date: '2024-03-16', 
      production: '475 m³', 
      efficiency: '88%', 
      carbonOffset: '340 kg' 
    },
  ];

  const handleDownloadCSV = () => {
    const csvContent = [
      'Device,Date,Production,Efficiency,Carbon Offset',
      ...reportData.map(row => 
        `${row.device},${row.date},${row.production},${row.efficiency},${row.carbonOffset}`
      ).join('\n')
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'biogas_report.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPDF = () => {
    alert('PDF Download functionality to be implemented');
  };

  const renderViewSwitch = () => {
    const viewOptions = [
      { 
        id: 'table', 
        icon: <Table size={18} />, 
        label: 'Table View' 
      },
      { 
        id: 'chart', 
        icon: <BarChart2 size={18} />, 
        label: 'Chart View' 
      },
      { 
        id: 'summary', 
        icon: <PieChart size={18} />, 
        label: 'Summary View' 
      }
    ];

    return (
      <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
        {viewOptions.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => setActiveView(option.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-full transition-all
              ${activeView === option.id 
                ? 'bg-teal-600 text-white'
                : 'text-gray-700 hover:bg-gray-200'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {option.icon}
            <span className="text-sm">{option.label}</span>
          </motion.button>
        ))}
      </div>
    );
  };

  const renderActiveView = () => {
    switch(activeView) {
      case 'table':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase">
                <tr>
                  <th className="px-4 py-3">Device</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Production</th>
                  <th className="px-4 py-3">Efficiency</th>
                  <th className="px-4 py-3">Carbon Offset</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((row, index) => (
                  <motion.tr 
                    key={row.id} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }
                    }}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">{row.device}</td>
                    <td className="px-4 py-3">{row.date}</td>
                    <td className="px-4 py-3">{row.production}</td>
                    <td className="px-4 py-3">{row.efficiency}</td>
                    <td className="px-4 py-3">{row.carbonOffset}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        );
      case 'chart':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 h-96 flex items-center justify-center"
          >
            <p className="text-gray-500">Chart View Placeholder</p>
          </motion.div>
        );
      case 'summary':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 h-96 flex items-center justify-center"
          >
            <p className="text-gray-500">Summary View Placeholder</p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    
    <div className='min-h-screen p-6'>
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="mb-6 flex justify-between items-center">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-3"
        >
         
          <h2 className="text-2xl font-bold text-gray-800">
            Reports & Analytics
          </h2>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex space-x-3"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadCSV}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
          >
            <FileSpreadsheet size={16} />
            <span>Download CSV</span>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadPDF}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
          >
            <File size={16} />
            <span>Download PDF</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Filters Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-3 gap-6 mb-6"
      >
        {/* Device Selection */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Device
          </label>
          <select 
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Choose Device</option>
            {devices.map(device => (
              <option key={device.id} value={device.id}>
                {device.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Picker */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Range
          </label>
          <div className="flex space-x-2">
            <input 
              type="date" 
              value={dateRange.from ? format(dateRange.from, 'yyyy-MM-dd') : ''}
              onChange={(e) => setDateRange(prev => ({ ...prev, from: new Date(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input 
              type="date" 
              value={dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : ''}
              onChange={(e) => setDateRange(prev => ({ ...prev, to: new Date(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* View Switch */}
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center">
          {renderViewSwitch()}
        </div>
      </motion.div>

      {/* Dynamic Content Area */}
      {renderActiveView()}
    </motion.div>
    </div>
  );
};

export default SReport;