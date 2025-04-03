import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactApexChart from 'react-apexcharts';


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
const ChartView = () => {
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = () => {
    setIsLoading(true);
    setTimeout(() => {
      const mockData = [
        { time: '05:00 - 06:00', rawBioGas: 0, cbgCascades: 0 },
        { time: '06:00 - 07:00', rawBioGas: 50.5, cbgCascades: 177.60 },
        { time: '07:00 - 08:00', rawBioGas: 75.2, cbgCascades: 175.48 },
        { time: '08:00 - 09:00', rawBioGas: 120.3, cbgCascades: 220.15 },
        { time: '09:00 - 10:00', rawBioGas: 180.6, cbgCascades: 265.72 },
        { time: '10:00 - 11:00', rawBioGas: 210.4, cbgCascades: 300.55 }
      ];
      
      setHistoryData(mockData);
      setIsLoading(false);
    }, 500);
  };

  // Chart configuration for Raw Bio-Gas
  const rawBioGasChartOptions = {
    series: [{
      name: 'Raw Bio-Gas',
      data: historyData.map(item => item.rawBioGas)
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: historyData.map(item => item.time.split(' - ')[0]),
        title: {
          text: 'Time (Hourly)'
        }
      },
      yaxis: {
        title: {
          text: 'Raw Bio-Gas (m³/hr)'
        }
      },
      title: {
        text: 'Hourly Raw Bio-Gas Production',
        align: 'left',
        style: {
          fontSize: '16px',
          fontWeight: 'bold'
        }
      },
      fill: {
        colors: ['#3B82F6']
      },
      tooltip: {
        theme: 'light'
      }
    }
  };

  // Chart configuration for CBG Cascades
  const cbgCascadesChartOptions = {
    series: [{
      name: 'CBG Cascades',
      data: historyData.map(item => item.cbgCascades)
    }],
    options: {
      chart: {
        type: 'area',
        height: 350,
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        categories: historyData.map(item => item.time.split(' - ')[0]),
        title: {
          text: 'Time (Hourly)'
        }
      },
      yaxis: {
        title: {
          text: 'CBG Cascades (kg/hr)'
        }
      },
      title: {
        text: 'Hourly CBG Filled to Cascades',
        align: 'left',
        style: {
          fontSize: '16px',
          fontWeight: 'bold'
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        }
      },
      tooltip: {
        theme: 'light'
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 h-96 overflow-y-auto"
    >
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">Loading chart data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80">
            <ReactApexChart
              options={rawBioGasChartOptions.options}
              series={rawBioGasChartOptions.series}
              type="bar"
              height="100%"
            />
          </div>
          
          <div className="h-80">
            <ReactApexChart
              options={cbgCascadesChartOptions.options}
              series={cbgCascadesChartOptions.series}
              type="area"
              height="100%"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Summary Component
const SummaryView = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching summary data
    setIsLoading(true);
    setTimeout(() => {
      const data = {
        totalRawBioGas: 637.0,
        totalCbgCascades: 1139.5,
        efficiency: 87.5,
        peakHour: '10:00 - 11:00',
        trend: 'increasing'
      };
      setSummaryData(data);
      setIsLoading(false);
    }, 700);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6  overflow-y-auto"
    >
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">Loading summary data...</p>
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800">Production Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Total Raw Bio-Gas</h3>
              <p className="text-2xl font-bold text-blue-600">{summaryData.totalRawBioGas} m³</p>
              <p className="text-sm text-gray-600 mt-1">Daily production volume</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Total CBG Cascades</h3>
              <p className="text-2xl font-bold text-green-600">{summaryData.totalCbgCascades} kg</p>
              <p className="text-sm text-gray-600 mt-1">Total compressed output</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Production Analysis</h3>
            <ul className="mt-2 space-y-2">
              <li className="flex items-center">
                <span className="w-32 text-gray-600">Efficiency:</span>
                <span className="font-medium">{summaryData.efficiency}%</span>
              </li>
              <li className="flex items-center">
                <span className="w-32 text-gray-600">Peak Hour:</span>
                <span className="font-medium">{summaryData.peakHour}</span>
              </li>
              <li className="flex items-center">
                <span className="w-32 text-gray-600">Trend:</span>
                <span className="font-medium capitalize">{summaryData.trend}</span>
              </li>
            </ul>
          </div>
          
          <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
            <h3 className="text-sm font-medium text-amber-700">Insights</h3>
            <p className="mt-1 text-gray-600">
              Production efficiency has been consistently above target with a steady increase throughout the day. 
              The peak production hour generated 210.4 m³ of raw biogas, which was converted to 300.55 kg of CBG.
              Continue monitoring system performance to maintain optimal conversion rates.
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const ReportSection = ({ onBackToDashboard }) => {
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
            className=""
          >
            <ChartView />
          </motion.div>
        );
      case 'summary':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className=""
          >
             <SummaryView />
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

export default ReportSection;