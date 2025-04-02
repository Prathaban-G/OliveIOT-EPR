import React, { useState } from 'react';
import UserHistory from "./UserHistory";
import {
  FlameIcon, ArrowLeft,
  GaugeIcon,
  CloudIcon,
  DropletIcon,
  WindIcon,
  OctagonIcon, LogOut, Search, LayoutDashboard,
  FileText, ServerIcon, WifiIcon, PowerIcon, Power
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import UserHeader from './UserHeader';

const UserDashboard = ({ onLogout }) => {
  const deviceDetails = {
    serialNumber: 'HW-1',
    firmwareVersion: 'v2.3.1',
    installationDate: "12-12-2022",
    batteryLevel: '85%',
    networkConnection: "online",
    additionalInfo: {
      manufacturer: 'TechCorp',
      modelNumber: 'ABC-123',
      warranty: 'Active until 2026'
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/"; // Redirect to login page
  };

  const [isOnline, setIsOnline] = useState(true);
  const [isRunning, setIsRunning] = useState(true);
  const [showProduct2, setShowProduct2] = useState(false);

  // Mock data with random values
  const [data, setData] = useState({
    timestamp: new Date().toLocaleString(),
    param1: Math.random() * 70, // Upgradation Unit Methane
    param2: Math.random(), // Upgradation Unit O2
    param3: Math.random() * 20, // Upgradation Unit H2S
    param4: Math.random() * 40, // Upgradation Unit CO2
    param9: Math.random() * 65, // Digestor Unit Methane
    param10: Math.random(), // Upgradation Unit O2
    param11: Math.random() * 18, // Digestor Unit H2S
    param12: Math.random() * 35, // Digestor Unit CO2
    param13: Math.random() * 50, // Upgradation Unit Raw Bio-Gas
    param14: Math.random() * 45 // Digestor Unit Raw Bio-Gas
  });
  
  // New state to track current view
  const [currentView, setCurrentView] = useState('dashboard');
  const [hourlyData, setHourlyData] = useState({
    totalizer: (Math.random() * 1000000).toFixed(0),
    comp_totalizer: (Math.random() * 1000000).toFixed(0)
  });

  // Function to generate new random data
  const refreshData = () => {
    setData({
      timestamp: new Date().toLocaleString(),
      param1: Math.random() * 70,
      param2: Math.random(),
      param3: Math.random() * 20,
      param4: Math.random() * 40,
      param9: Math.random() * 65,
      param10: Math.random(),
      param11: Math.random() * 18,
      param12: Math.random() * 35,
      param13: Math.random() * 50,
      param14: Math.random() * 45
    });

    setHourlyData({
      totalizer: (Math.random() * 1000000).toFixed(0),
      comp_totalizer: (Math.random() * 1000000).toFixed(0)
    });
  };

  // Toggle function for switching between SVGs
  const toggleSvg = () => {
    setShowProduct2(prev => !prev);
  };

  // Icons mapping
  const icons = {
    fire: <FlameIcon className="w-8 h-8 text-orange-500" />,
    gas: <GaugeIcon className="w-8 h-8 text-blue-500" />,
    methane: <CloudIcon className="w-8 h-8 text-green-500" />,
    co2: <DropletIcon className="w-8 h-8 text-red-500" />,
    h2s: <WindIcon className="w-8 h-8 text-purple-500" />,
    o2: <OctagonIcon className="w-8 h-8 text-teal-500" />
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <UserHeader />
      <div className="flex items-center space-x-4 w-full mt-3 ms-5">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentView('dashboard')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${currentView === 'dashboard'
              ? 'bg-teal-700 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentView('report')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${currentView === 'report'
              ? 'bg-teal-700 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          <FileText size={20} />
          <span>Reports</span>
        </motion.button>
      </div>
      
      {/* Conditional Rendering of Dashboard or Reports */}
      <AnimatePresence mode="wait">
        <motion.main
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-grow p-6"
        >
          {currentView === 'dashboard' ? (
            <div className="bg-white shadow-md rounded-lg p-6">
              {/* Existing dashboard content */}
              <div className="text-2xl font-bold mb-6 text-gray-800">
                Device Dashboard: HW-1
              </div>

              {/* SVG content with animation */}
              <div className="relative mb-6">
                <AnimatePresence mode="wait">
                  {showProduct2 ? (
                    <motion.div
                      key="product2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                    >
                      <img src="/Assets/product2.svg" alt="Product 2" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="product1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                    >
                      <img src="/Assets/product.svg" alt="Product" />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Power toggle button */}
                <motion.button
                  onClick={toggleSvg}
                  className={`absolute bottom-4 right-4 rounded-full p-3 shadow-lg ${showProduct2 ? 'bg-green-500' : 'bg-gray-400'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Power className="w-6 h-6 text-white" />
                </motion.button>
              </div>

              <div className="flex justify-end mb-4">
                <motion.button
                  onClick={refreshData}
                  className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Refresh Data
                </motion.button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Anaerobic Digestor Unit */}
                <motion.div 
                  className="bg-white shadow-md rounded-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    Anaerobic Digestor Unit
                  </h2>
                  <div className="text-sm text-gray-500 mb-4">
                    Last updated: {data.timestamp}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {/* Raw Bio-Gas */}
                    <motion.div 
                      className="bg-gray-50 p-4 rounded-lg flex items-center"
                      whileHover={{ scale: 1.03 }}
                    >
                      {icons.fire}
                      <div className="ml-4">
                        <div className="text-lg font-semibold">
                          {Number(data.param14).toFixed(2)} m³/hr
                        </div>
                        <div className="text-xs text-gray-500">Raw Bio-Gas</div>
                      </div>
                    </motion.div>

                    {/* Total Bio-Gas */}
                    <motion.div 
                      className="bg-gray-50 p-4 rounded-lg flex items-center"
                      whileHover={{ scale: 1.03 }}
                    >
                      {icons.gas}
                      <div className="ml-4">
                        <div className="text-lg font-semibold">
                          {hourlyData.totalizer}
                        </div>
                        <div className="text-xs text-gray-500">Raw Bio-Gas Total</div>
                      </div>
                    </motion.div>

                    {/* Methane */}
                    <motion.div 
                      className="bg-gray-50 p-4 rounded-lg flex items-center"
                      whileHover={{ scale: 1.03 }}
                    >
                      {icons.methane}
                      <div className="ml-4">
                        <div className="text-lg font-semibold">
                          {Number(data.param9).toFixed(2)} %v/v
                        </div>
                        <div className="text-xs text-gray-500">Methane</div>
                      </div>
                    </motion.div>

                    {/* Carbon Dioxide */}
                    <motion.div 
                      className="bg-gray-50 p-4 rounded-lg flex items-center"
                      whileHover={{ scale: 1.03 }}
                    >
                      {icons.co2}
                      <div className="ml-4">
                        <div className="text-lg font-semibold">
                          {Number(data.param12).toFixed(2)} %v/v
                        </div>
                        <div className="text-xs text-gray-500">Carbon Di-Oxide</div>
                      </div>
                    </motion.div>

                    {/* Hydrogen Sulfide */}
                    <motion.div 
                      className="bg-gray-50 p-4 rounded-lg flex items-center"
                      whileHover={{ scale: 1.03 }}
                    >
                      {icons.h2s}
                      <div className="ml-4">
                        <div className="text-lg font-semibold">
                          {Number(data.param11).toFixed(2)} ppm
                        </div>
                        <div className="text-xs text-gray-500">Hydrogen Sulfide</div>
                      </div>
                    </motion.div>

                    {/* Oxygen */}
                    <motion.div 
                      className="bg-gray-50 p-4 rounded-lg flex items-center"
                      whileHover={{ scale: 1.03 }}
                    >
                      {icons.o2}
                      <div className="ml-4">
                        <div className="text-lg font-semibold">
                          {Number(data.param10).toFixed(2)} %v/v
                        </div>
                        <div className="text-xs text-gray-500">O2</div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Bio-Gas Upgradation Unit */}
                <motion.div 
                  className="bg-white shadow-md rounded-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    Bio-Gas Upgradation Unit
                  </h2>
                  <div className="text-sm text-gray-500 mb-4">
                    Last updated: {data.timestamp}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {/* Raw Bio-Gas */}
                    <motion.div 
                      className="bg-red-50 p-4 rounded-lg flex items-center"
                      whileHover={{ scale: 1.03 }}
                    >
                      {icons.fire}
                      <div className="ml-4">
                        <div className="text-lg font-semibold text-red-700">
                          {Number(data.param13).toFixed(2)} m³/min
                        </div>
                        <div className="text-xs text-red-500">Raw Bio-Gas</div>
                      </div>
                    </motion.div>

                    {/* Compressed Bio-Gas */}
                    <motion.div 
                      className="bg-red-50 p-4 rounded-lg flex items-center"
                      whileHover={{ scale: 1.03 }}
                    >
                      {icons.gas}
                      <div className="ml-4">
                        <div className="text-lg font-semibold text-red-700">
                          {hourlyData.comp_totalizer}
                        </div>
                        <div className="text-xs text-red-500">Comp Bio-Gas</div>
                      </div>
                    </motion.div>

                    {/* Methane */}
                    <motion.div 
                      className="bg-red-50 p-4 rounded-lg flex items-center"
                      whileHover={{ scale: 1.03 }}
                    >
                      {icons.methane}
                      <div className="ml-4">
                        <div className="text-lg font-semibold text-red-700">
                          {Number(data.param1).toFixed(2)} %v/v
                        </div>
                        <div className="text-xs text-red-500">Methane</div>
                      </div>
                    </motion.div>

                    {/* Carbon Dioxide */}
                    <motion.div 
                      className="bg-red-50 p-4 rounded-lg flex items-center"
                      whileHover={{ scale: 1.03 }}
                    >
                      {icons.co2}
                      <div className="ml-4">
                        <div className="text-lg font-semibold text-red-700">
                          {Number(data.param4).toFixed(2)} %v/v
                        </div>
                        <div className="text-xs text-red-500">Carbon Di-Oxide</div>
                      </div>
                    </motion.div>

                    {/* Hydrogen Sulfide */}
                    <motion.div 
                      className="bg-red-50 p-4 rounded-lg flex items-center"
                      whileHover={{ scale: 1.03 }}
                    >
                      {icons.h2s}
                      <div className="ml-4">
                        <div className="text-lg font-semibold text-red-700">
                          {Number(data.param3).toFixed(2)} ppm
                        </div>
                        <div className="text-xs text-red-500">Hydrogen Sulfide</div>
                      </div>
                    </motion.div>

                    {/* Oxygen */}
                    <motion.div 
                      className="bg-red-50 p-4 rounded-lg flex items-center"
                      whileHover={{ scale: 1.03 }}
                    >
                      {icons.o2}
                      <div className="ml-4">
                        <div className="text-lg font-semibold text-red-700">
                          {Number(data.param2).toFixed(2)} %v/v
                        </div>
                        <div className="text-xs text-red-500">O2</div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          ) : (
            <UserHistory />
          )}
        </motion.main>
      </AnimatePresence>
      
      <footer className="bg-white border-t border-gray-200 mt-8 py-8">
        <div className="container mx-auto px-6">
          <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
            © 2025 EcoInfinity. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;