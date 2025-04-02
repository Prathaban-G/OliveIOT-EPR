import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  FlameIcon, ArrowLeft,
  GaugeIcon, 
  CloudIcon, 
  DropletIcon, 
  WindIcon, 
  OctagonIcon,
  Power
} from 'lucide-react';

const DeviceDashboard = ({ product, onBackToDeviceList }) => {
  // State to manage different sections of the device dashboard
  const [activeSection, setActiveSection] = useState('overview');
  const [isRunning, setIsRunning] = useState(false);
  const [showProduct2, setShowProduct2] = useState(false);
  
  // Mock data - in a real app, this would come from your backend or props
  const deviceDetails = {
    ...product,
    serialNumber: product.id,
    firmwareVersion: 'v2.3.1',
    installationDate: product.lastUpdated,
    batteryLevel: '85%',
    networkConnection: product.status,
    additionalInfo: {
      manufacturer: 'TechCorp',
      modelNumber: 'ABC-123',
      warranty: 'Active until 2026'
    }
  }; 
    // Mock data with random values
    const [data, setData] = useState({
      timestamp: new Date().toLocaleString(),
      param1: Math.random() * 70, // Upgradation Unit Methane
      param2: Math.random(), // Upgradation Unit O2
      param3: Math.random() * 20, // Upgradation Unit H2S
      param4: Math.random() * 40, // Upgradation Unit CO2
      param9: Math.random() * 65, // Digestor Unit Methane
      param10: Math.random(), // Digestor Unit O2
      param11: Math.random() * 18, // Digestor Unit H2S
      param12: Math.random() * 35, // Digestor Unit CO2
      param13: Math.random() * 50, // Upgradation Unit Raw Bio-Gas
      param14: Math.random() * 45 // Digestor Unit Raw Bio-Gas
    });
  
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
  
    // Icons mapping
    const icons = {
      fire: <FlameIcon className="w-8 h-8 text-orange-500" />,
      gas: <GaugeIcon className="w-8 h-8 text-blue-500" />,
      methane: <CloudIcon className="w-8 h-8 text-green-500" />,
      co2: <DropletIcon className="w-8 h-8 text-red-500" />,
      h2s: <WindIcon className="w-8 h-8 text-purple-500" />,
      o2: <OctagonIcon className="w-8 h-8 text-teal-500" />
    };

    // Toggle function for switching between SVGs
    const toggleSvg = () => {
      setShowProduct2(prev => !prev);
    };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Header with Back Button */}
      <div className="flex items-center mb-6">
        <button 
          onClick={onBackToDeviceList} 
          className="mr-4 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          Device Dashboard: {deviceDetails.id}
        </h2>
      </div>
        
      {/* SVG content with animation */}
      <div className="mb-6 relative">
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
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
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

      {/* Add more sections as needed */}
    </div>
  );
};

export default DeviceDashboard;