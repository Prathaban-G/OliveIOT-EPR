import React, { useState, useEffect, useRef } from 'react';
import { Bell, Filter, LogOut, ChevronDown, Map, Download, Eye, Trash2, MoreVertical, CheckCircle, XCircle, Sliders, Search, TrendingUp } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import BiogasBarChart from './BiogasBarChart';
import MapComponent from './MapComponent';
import { motion, AnimatePresence } from 'framer-motion';
import ReportSection from './Report';  // Importing the Report component
import DeviceDashboard from './DeviceDashboard';
const AdminDashboard = () => {
  // State management
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "HW-3 went offline", time: "10 minutes ago", read: false },
    { id: 2, message: "HW-5 went offline", time: "1 hour ago", read: false },
    { id: 3, message: "HW-7 went offline", time: "2 hours ago", read: false },
    { id: 4, message: "New client registration: Jerin", time: "3 hours ago", read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [mapView, setMapView] = useState(true);
  const [loading, setLoading] = useState(true);
  const [bioReactorModel, setBioReactorModel] = useState(null);
  const [activePage, setActivePage] = useState('dashboard'); // 'dashboard', 'reports'

 
  
  const products = [
    { id: "HW-1", status: "online", client: "Prathaban", clientAvatar: "male.png", location: "Chennai", lastUpdated: "28/10/2024" },
    { id: "HW-2", status: "online", client: "Viji", clientAvatar: "female.png", location: "Chennai", lastUpdated: "28/10/2024" },
    { id: "HW-3", status: "offline", client: "Muthuraja", clientAvatar: "male2.png", location: "Chennai", lastUpdated: "27/10/2024" },
    { id: "HW-4", status: "online", client: "Varshana", clientAvatar: "female2.png", location: "Chennai", lastUpdated: "28/10/2024" },
    { id: "HW-5", status: "offline", client: "Robin", clientAvatar: "man.png", location: "Chennai", lastUpdated: "27/10/2024" },
    { id: "HW-6", status: "online", client: "Jerin", clientAvatar: "male.png", location: "Chennai", lastUpdated: "28/10/2024" },
    { id: "HW-7", status: "offline", client: "Sujith", clientAvatar: "male2.png", location: "Chennai", lastUpdated: "27/10/2024" }
  ];

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [deviceInfoModal, setDeviceInfoModal] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || product.status === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });
  const handleViewDevice = (product) => {
    setSelectedDevice(product);
    // Optionally, you can keep the current page as 'dashboard'
    setActivePage('dashboard');
  };


  const handleDeviceSettings = (device) => {
    setSelectedDevice(device);
    setDeviceInfoModal(true);
  };

  const handleNotificationClick = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setShowNotifications(false);
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/"; // Redirect to login page
  };
  // Summary card content
  const summaryContent = {
    title: "Biogas Plant Overview",
    description: "Sustainable energy generation tracking system.",
    highlights: [
      "Optimizing renewable energy production",

    ]
  };

  // Stats data
  const stats = [
    {
      id: 1,
      title: "Total Devices",
      value: "7",
      icon: <div className="bg-blue-100 p-3 rounded-full"><img src="/Assets/chip.png" alt="Devices" className="h-6 w-6" /></div>,
      change: "+12%"
    },
    {
      id: 2,
      title: "Active Devices",
      value: "4",
      icon: <div className="bg-green-100 p-3 rounded-full"><CheckCircle className="h-6 w-6 text-green-500" /></div>,
      change: "+5%"
    },
    {
      id: 3,
      title: "Biogas Production",
      value: "1,284 m³",
      icon: <div className="bg-amber-100 p-3 rounded-full"><img src="/Assets/gas.svg" alt="Biogas" className="h-6 w-6" /></div>,
      change: "+3.2%"
    },
    {
      id: 4,
      title: "Carbon Offset",
      value: "846 kg",
      icon: <div className="bg-teal-100 p-3 rounded-full"><img src="/Assets/co2.svg" alt="Carbon" className="h-6 w-6" /></div>,
      change: "+7.1%"
    }
  ];
  const handleBackToDashboard = () => {
    setActivePage('dashboard');
  };
  const handleDeviceInfoSubmit = () => {
    // Handle device info submission logic here
    console.log('Device info submitted:', selectedDevice);
    setDeviceInfoModal(false);
  };


  return (
    <div className="  min-h-screen bg-gray-50 flex flex-col">
      {/* Header with animation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-sm flex justify-between items-center p-4 sticky top-0 z-10"
      >
        <div className="flex items-center space-x-2">
         
          <div>
          <motion.img
            src="/Assets/olivee.png"
            alt="EcoInfinity Logo"
            className="h-8 ps-1"
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 2 }}
            transition={{ duration: 0.8, type: "spring" }}
          />
            <div className="text-xs text-gray-500">Intelligent bio-manufacturing and energy analytics</div>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <motion.input
              initial={{ width: "48px", opacity: 0.5 }}
              animate={{ width: "16rem", opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              
             title='based on sections'
            />
          </div>
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="relative p-2 rounded-full hover:bg-gray-100"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-20 border border-gray-200"
                >
                  <div className="flex justify-between items-center p-4 border-b border-gray-100">
                    <h3 className="font-semibold">Notifications</h3>
                    <button
                      className="text-xs text-teal-600 hover:text-teal-800"
                      onClick={markAllAsRead}
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${notification.read ? '' : 'bg-blue-50'}`}
                          onClick={() => handleNotificationClick(notification.id)}
                        >
                          <div className="flex justify-between items-start">
                            <p className="text-sm">{notification.message}</p>
                            {!notification.read && <div className="w-2 h-2 rounded-full bg-blue-500 mt-1"></div>}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </motion.div>
                      ))
                    ) : (
                      <p className="p-4 text-center text-gray-500 text-sm">No notifications</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex items-center space-x-3">
            <div className="font-medium text-sm text-right">
              <div>Admin</div>
              <div className="text-xs text-gray-500">Administrator</div>
            </div>
            <div className="relative group">
              <motion.img
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
                src="/Assets/man-user.svg"
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-teal-500 cursor-pointer"
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 border border-gray-200 hidden group-hover:block">
                <div className="py-1">
                  <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin</a>
                  
                  <a
                    href="#logout"
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center cursor-pointer"
                  >
                    <LogOut size={16} className="mr-2 text-red-500" /> Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Stats Section */}
 {activePage === 'dashboard' && !selectedDevice && (
          <>
        <div className="grid grid-cols-12 gap-6 mb-5">
          {/* Summary Card - 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-3 bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800">{summaryContent.title}</h2>
            <p className="text-gray-600 mb-4">{summaryContent.description}</p>
            <div className="space-y-2">
              {summaryContent.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  {highlight}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats Grid - 9 columns */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                className="bg-white rounded-lg shadow-md p-6 flex items-center"
              >
                {stat.icon}
                <div className="ml-5">
                  <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <span>↑</span> {stat.change} this week
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <motion.h2
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-gray-800"
          >
            Products
          </motion.h2>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex space-x-3"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-md flex items-center ${mapView
                ? 'bg-teal-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
                }`}
              onClick={() => setMapView(!mapView)}
            >
              <Map size={18} className="mr-2" />
              {mapView ? 'Table View' : 'Map View'}
            </motion.button>

          </motion.div>
        </div>

        {/* Map View with 3D model section */}
        <AnimatePresence>
          {mapView && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Map Section */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg shadow-md p-4 mb-6"
              >
                <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center ">
                  <MapComponent />
                </div>
              </motion.div>



              {/* Chart Section */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-lg shadow-md p-4 mb-6 "
              >
                <h2 className="text-xl font-semibold mb-4">Biogas Production</h2>
                <BiogasBarChart />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>



        {/* Table Controls */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label htmlFor="entriesPerPage" className="text-sm text-gray-600">Show</label>
                <select
                  id="entriesPerPage"
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                </select>
                <span className="text-sm text-gray-600">entries</span>
              </div>

              {/* Existing buttons */}
              <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-teal-600 text-white px-4 py-2 rounded-md flex items-center"
                  onClick={() => setActivePage('reports')}
                >
                  View Reports
                </motion.button>

            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search Hardware"
                  className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm w-48 md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <input
                      type="checkbox"
                      className="rounded text-teal-600 focus:ring-teal-500"
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Product ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Client
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Last Updated
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product,index) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="ml-4 font-medium text-gray-900">
          {index + 1} {/* Serial number starts from 1 */}
        </div>
      </div>
    </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4 font-medium text-gray-900">
                    {product.id}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.status === 'online'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {product.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      {product.client}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.location}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.lastUpdated}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleViewDevice(product)}
                    className="text-teal-600 hover:text-teal-900"
                  >
                    <Eye size={18} />
                  </button>
                  <button 
                    onClick={() => handleDeviceSettings(product)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <MoreVertical size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{' '}
              <span className="font-medium">
                {Math.min(entriesPerPage, filteredProducts.length)}
              </span>{' '}
              of{' '}
              <span className="font-medium">{filteredProducts.length}</span> results
            </div>
            <div className="flex-1 flex justify-end">
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <a
                  href="#previous"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#1"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  1
                </a>
                <a
                  href="#2"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-teal-50 text-sm font-medium text-teal-600"
                >
                  2
                </a>
                <a
                  href="#3"
                  className="relative hidden md:inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  3
                </a>
                <a
                  href="#next"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div></>
        )}  {activePage === 'dashboard' && selectedDevice && (
          <DeviceDashboard 
            product={selectedDevice} 
            onBackToDeviceList={() => setSelectedDevice(null)} 
          />
        )}
          {activePage === 'reports' && (
          <ReportSection onBackToDashboard={handleBackToDashboard} />
        )}
      </main> {deviceInfoModal && selectedDevice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Device Information</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Device ID</label>
              <input 
                type="text" 
                value={selectedDevice.id} 
                readOnly 
                className="w-full px-3 py-2 border rounded bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Status</label>
              <select 
                className="w-full px-3 py-2 border rounded"
                defaultValue={selectedDevice.status}
              >
                <option value="enable">Enable</option>
                <option value="disable">Disable</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setDeviceInfoModal(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeviceInfoSubmit}
                className="px-4 py-2 bg-teal-600 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
   
      <footer className="bg-white border-t border-gray-200 mt-8 py-8">
        <div className="container mx-auto px-6">
          <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
            © 2025 EcoInfinity. All rights reserved.
          </div>
        </div>
      </footer>
    </div >
  );
};

export default AdminDashboard;