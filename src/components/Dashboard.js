import React, { useState, useEffect } from 'react';

import { Bell, Filter, LogOut, ChevronDown, Map, Download, Eye, Trash2, MoreVertical, CheckCircle, XCircle, Sliders, Search } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import BiogasBarChart from './BiogasBarChart';
import MapComponent from './MapComponent';
const Dashboard = () => {
  // State management (unchanged)
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

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  const products = [
    { id: "HW-1", status: "online", client: "Prathaban", clientAvatar: "male.png", location: "Chennai", lastUpdated: "28/10/2024" },
    { id: "HW-2", status: "online", client: "Viji", clientAvatar: "female.png", location: "Chennai", lastUpdated: "28/10/2024" },
    { id: "HW-3", status: "offline", client: "Muthuraja", clientAvatar: "male2.png", location: "Chennai", lastUpdated: "27/10/2024" },
    { id: "HW-4", status: "online", client: "Varshana", clientAvatar: "female2.png", location: "Chennai", lastUpdated: "28/10/2024" },
    { id: "HW-5", status: "offline", client: "Robin", clientAvatar: "man.png", location: "Chennai", lastUpdated: "27/10/2024" },
    { id: "HW-6", status: "online", client: "Jerin", clientAvatar: "male.png", location: "Chennai", lastUpdated: "28/10/2024" },
    { id: "HW-7", status: "offline", client: "Sujith", clientAvatar: "male2.png", location: "Chennai", lastUpdated: "27/10/2024" }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || product.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleNotificationClick = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload(); // Refresh page after logout
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header (unchanged) */}
      <header className="bg-white shadow-sm flex justify-between items-center p-4 sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <img src="/Assets/ecoinfinity.svg" alt="EcoInfinity Logo" className="h-10" />
          <div>
            <h1 className="text-xl font-bold text-teal-700">EcoInfinity</h1>
            <div className="text-xs text-gray-500">INDUSTRIAL DATA LOGGER</div>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <button
              className="relative p-2 rounded-full hover:bg-gray-100"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-20 border border-gray-200">
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
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${notification.read ? '' : 'bg-blue-50'}`}
                        onClick={() => handleNotificationClick(notification.id)}
                      >
                        <div className="flex justify-between items-start">
                          <p className="text-sm">{notification.message}</p>
                          {!notification.read && <div className="w-2 h-2 rounded-full bg-blue-500 mt-1"></div>}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))
                  ) : (
                    <p className="p-4 text-center text-gray-500 text-sm">No notifications</p>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <div className="font-medium text-sm text-right">
              <div>Admin User</div>
              <div className="text-xs text-gray-500">Administrator</div>
            </div>
            <div className="relative group">
              <img
                src="/Assets/man-user.svg"
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-teal-500 cursor-pointer"
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 border border-gray-200 hidden group-hover:block">
                <div className="py-1">
                  <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</a>
                  <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                  <a
                    href="#logout"
                    onClick={handleLogout} // Add your logout function here
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center cursor-pointer"
                  >
                    <LogOut size={16} className="mr-2 text-red-500" /> Logout
                  </a>

                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Products</h2>
          <div className="flex space-x-3">
            <button
              className={`px-4 py-2 rounded-md flex items-center ${mapView
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
                }`}
              onClick={() => setMapView(!mapView)}
            >
              <Map size={18} className="mr-2" />
              {mapView ? 'Table View' : 'Map View'}
            </button>
            <button className="px-4 py-2 bg-teal-600 text-white rounded-md flex items-center">
              <Download size={18} className="mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Map View */}
        {mapView && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Map Section */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <MapComponent />
              </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h2 className="text-xl font-semibold mb-4">Biogas Production</h2>
              <BiogasBarChart />
            </div>
          </div>
        )}

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

              <button className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm flex items-center space-x-2">
                <Sliders size={16} />
                <span>Generate Report</span>
              </button>
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
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="rounded text-teal-600 focus:ring-teal-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <img
                            src="/Assets/chip.png"
                            alt="chip"
                            className="h-6 w-6"
                          />
                        </div>
                        <div className="ml-4 font-medium text-gray-900">
                          {product.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.status === 'online' ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle size={16} className="mr-1" />
                          <span>Online</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-red-600">
                          <XCircle size={16} className="mr-1" />
                          <span>Offline</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <img
                            src="/Assets/man.png"
                            alt="client avatar"
                            className="h-8 w-8 rounded-full"
                          />
                        </div>
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${product.status === 'online'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                          }`}
                      >
                        {product.lastUpdated}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button className="text-teal-600 hover:text-teal-900">
                          <Eye size={18} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 size={18} />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700">
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
        </div>
      </main>
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

export default Dashboard;