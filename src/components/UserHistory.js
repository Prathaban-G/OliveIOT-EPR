import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import { FileSpreadsheet, FileDown, Calendar, Database, TrendingUp } from 'lucide-react';

const BiogasDashboard = () => {
  const [selectedDate, setSelectedDate] = useState('2025-03-26');
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data function with more comprehensive mock data
  const fetchData = () => {
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

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-neutral-800 flex items-center">
            <TrendingUp className="mr-3 text-blue-600" size={24} />
            Biogas Performance Dashboard
          </h1>
          <div className="flex space-x-4">
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={fetchData}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 flex items-center"
            >
              {isLoading ? 'Loading...' : 'Refresh Data'}
            </button>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <ApexCharts 
              options={rawBioGasChartOptions.options} 
              series={rawBioGasChartOptions.series} 
              type="bar" 
              height={350} 
            />
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <ApexCharts 
              options={cbgCascadesChartOptions.options} 
              series={cbgCascadesChartOptions.series} 
              type="area" 
              height={350} 
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-100 border-b border-neutral-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">Time</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-neutral-600 uppercase tracking-wider">Raw Bio-Gas (m³/hr)</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-neutral-600 uppercase tracking-wider">CBG Cascades (kg/hr)</th>
              </tr>
            </thead>
            <tbody>
              {historyData.length > 0 ? (
                historyData.map((row, index) => (
                  <tr 
                    key={index} 
                    className="border-b border-neutral-100 hover:bg-neutral-50 transition duration-150"
                  >
                    <td className="px-4 py-3 text-sm">{row.time}</td>
                    <td className="px-4 py-3 text-right text-sm">{row.rawBioGas.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right text-sm">{row.cbgCascades.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-neutral-500">
                    No data available. Select a date and fetch data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Download Section */}
        <div className="mt-6 flex justify-end space-x-4">
          <button 
            className="flex items-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-300"
            onClick={() => alert('CSV download to be implemented')}
          >
            <FileSpreadsheet className="mr-2" size={20} /> Download CSV
          </button>
          <button 
            className="flex items-center bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition duration-300"
            onClick={() => alert('PDF download to be implemented')}
          >
            <FileDown className="mr-2" size={20} /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default BiogasDashboard;