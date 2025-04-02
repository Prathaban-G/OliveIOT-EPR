import React from 'react';
import ReactApexChart from 'react-apexcharts';
import MapComponent  from './MapComponent';
import { 
  Activity, 
  MapPin, 
  CheckCircle, 
  Filter, 
  ChevronDown, 
  Box, 
  Users, 
  ArrowUp 
} from 'lucide-react';

// Mock MapComponent (replace with actual Leaflet implementation)
const MapChart = () => (
  <div className="h-full w-full rounded-lg bg-gray-100 flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gray-200 opacity-50">
      <div className="w-full h-full bg-map-bg"></div>
    </div>
    <div className="z-10 text-center">
      <MapPin size={40} className="mx-auto text-teal-600 mb-2" />
      <p className="text-gray-700 font-medium">Interactive Map</p>
      <p className="text-xs text-gray-500">Device locations shown here</p>
    </div>
  </div>
);

const DashboardCharts = () => {
  // Charts configuration
  const columnChartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    yaxis: {
      title: { text: 'Data points' }
    },
    fill: { opacity: 1 },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " units"
        }
      }
    },
    colors: ['#0D9488', '#14B8A6', '#2DD4BF']
  };

  const columnChartSeries = [{
    name: 'Active Devices',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 70]
  }, {
    name: 'Offline Devices',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 86]
  }, {
    name: 'Data Points',
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 55]
  }];

  const pieChartOptions = {
    chart: {
      type: 'pie',
      toolbar: { show: false }
    },
    labels: ['Online', 'Offline', 'Maintenance', 'Error'],
    colors: ['#4ade80', '#f87171', '#facc15', '#fb923c'],
    legend: {
      position: 'bottom'
    }
  };

  const pieChartSeries = [60, 25, 10, 5];

  const lineChartOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: { show: false }
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    markers: {
      size: 4
    },
    colors: ['#0D9488']
  };

  const lineChartSeries = [{
    name: "Data Logged",
    data: [28, 29, 33, 36, 32, 40]
  }];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Products Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-teal-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Products</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">7</h3>
              <p className="text-xs flex items-center text-green-600 mt-2">
                <ArrowUp size={14} className="mr-1" /> 12% from last month
              </p>
            </div>
            <div className="h-12 w-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <Box className="text-teal-600" size={24} />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Column Chart Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Activity className="mr-2 text-teal-600" size={20} />
                Device Performance
              </h3>
              <div className="flex items-center space-x-2">
                <button className="text-gray-500 hover:text-teal-600 transition-colors">
                  <ChevronDown size={18} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <ReactApexChart 
                type="bar" 
                series={columnChartSeries} 
                options={columnChartOptions} 
                height={300} 
              />
            </div>
          </div>

          {/* Map Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <MapPin className="mr-2 text-teal-600" size={20} />
                Device Locations
              </h3>
              <div className="flex items-center space-x-2">
                <button className="text-gray-500 hover:text-teal-600 transition-colors">
                  <Filter size={18} />
                </button>
                <button className="text-gray-500 hover:text-teal-600 transition-colors">
                  <ChevronDown size={18} />
                </button>
              </div>
            </div>
            <div className="p-4 h-[400px]">
              <div className="w-full h-full rounded-lg overflow-hidden shadow-inner">
                <MapComponent />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <CheckCircle className="mr-2 text-teal-600" size={20} />
                Device Status Distribution
              </h3>
            </div>
            <div className="p-4">
              <ReactApexChart 
                type="pie" 
                series={pieChartSeries} 
                options={pieChartOptions} 
                height={300} 
              />
            </div>
          </div>

          {/* Line Chart Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Activity className="mr-2 text-teal-600" size={20} />
                Data Logging Trend
              </h3>
            </div>
            <div className="p-4">
              <ReactApexChart 
                type="line" 
                series={lineChartSeries} 
                options={lineChartOptions} 
                height={300} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapChart;