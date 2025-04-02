import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FlameIcon, ArrowLeft,
  GaugeIcon, 
  CloudIcon, 
  DropletIcon, 
  WindIcon, 
  OctagonIcon 
} from 'lucide-react';

const DeviceDashboard = ({ product, onBackToDeviceList }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isRunning, setIsRunning] = useState(false);
  const [data, setData] = useState({
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

  const [hourlyData, setHourlyData] = useState({
    totalizer: (Math.random() * 1000000).toFixed(0),
    comp_totalizer: (Math.random() * 1000000).toFixed(0)
  });

  // Improved data refresh with animation
  const refreshData = () => {
    setIsRunning(true);
    const newData = {
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
    };

    setData(newData);
    setHourlyData({
      totalizer: (Math.random() * 1000000).toFixed(0),
      comp_totalizer: (Math.random() * 1000000).toFixed(0)
    });

    // Simulate device refresh
    setTimeout(() => setIsRunning(false), 1500);
  };

  // Icons mapping with enhanced styling
  const icons = {
    fire: <FlameIcon className="w-10 h-10 text-orange-500 animate-pulse" />,
    gas: <GaugeIcon className="w-10 h-10 text-blue-500 animate-bounce" />,
    methane: <CloudIcon className="w-10 h-10 text-green-500 animate-spin" />,
    co2: <DropletIcon className="w-10 h-10 text-red-500 animate-pulse" />,
    h2s: <WindIcon className="w-10 h-10 text-purple-500 animate-bounce" />,
    o2: <OctagonIcon className="w-10 h-10 text-teal-500 animate-spin" />
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  // Item animation variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-white via-blue-50 to-green-50 min-h-screen p-8"
    >
      {/* Header with Animated Back Button */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="flex items-center mb-8"
      >
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBackToDeviceList} 
          className="mr-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={28} />
        </motion.button>
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
          Device Dashboard: {product.id}
        </h2>
      </motion.div>

      {/* Refresh Button with Animation */}
      <div className="flex justify-end mb-6">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={refreshData}
          className={`px-6 py-3 rounded-full text-white transition duration-300 ${
            isRunning 
              ? 'bg-gradient-to-r from-blue-500 to-green-500 animate-pulse' 
              : 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700'
          }`}
        >
          {isRunning ? 'Refreshing...' : 'Refresh Data'}
        </motion.button>
      </div>
      <img src="/Assets/product.svg" alt="Product" />

      {/* Animated Grid Layout */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-8"
      >
        {/* Anaerobic Digestor Unit */}
        <motion.div 
          variants={itemVariants}
          className="bg-white shadow-2xl rounded-2xl p-8 border-2 border-blue-100"
        >
          <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
            Anaerobic Digestor Unit
          </h2>
          <div className="text-sm text-gray-500 mb-6">
            Last updated: {data.timestamp}
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-3 gap-4"
          >
            {/* Data Cards with Hover and Click Animations */}
            {[
              { icon: 'fire', value: data.param14, unit: 'm³/hr', label: 'Raw Bio-Gas' },
              { icon: 'gas', value: hourlyData.totalizer, unit: '', label: 'Raw Bio-Gas Total' },
              { icon: 'methane', value: data.param9, unit: '%v/v', label: 'Methane' },
              { icon: 'co2', value: data.param12, unit: '%v/v', label: 'Carbon Di-Oxide' },
              { icon: 'h2s', value: data.param11, unit: 'ppm', label: 'Hydrogen Sulfide' },
              { icon: 'o2', value: data.param10, unit: '%v/v', label: 'O2' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-50 p-4 rounded-xl flex items-center hover:shadow-lg transition duration-300"
              >
                {icons[item.icon]}
                <div className="ml-4">
                  <div className="text-lg font-bold text-blue-700">
                    {Number(item.value).toFixed(2)} {item.unit}
                  </div>
                  <div className="text-xs text-blue-500">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bio-Gas Upgradation Unit (Similar Animation Pattern) */}
        <motion.div 
          variants={itemVariants}
          className="bg-white shadow-2xl rounded-2xl p-8 border-2 border-green-100"
        >
          <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-500">
            Bio-Gas Upgradation Unit
          </h2>
          <div className="text-sm text-gray-500 mb-6">
            Last updated: {data.timestamp}
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-3 gap-4"
          >
            {/* Similar data cards for Upgradation Unit */}
            {[
              { icon: 'fire', value: data.param13, unit: 'm³/min', label: 'Raw Bio-Gas' },
              { icon: 'gas', value: hourlyData.comp_totalizer, unit: '', label: 'Comp Bio-Gas' },
              { icon: 'methane', value: data.param1, unit: '%v/v', label: 'Methane' },
              { icon: 'co2', value: data.param4, unit: '%v/v', label: 'Carbon Di-Oxide' },
              { icon: 'h2s', value: data.param3, unit: 'ppm', label: 'Hydrogen Sulfide' },
              { icon: 'o2', value: data.param2, unit: '%v/v', label: 'O2' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-50 p-4 rounded-xl flex items-center hover:shadow-lg transition duration-300"
              >
                {icons[item.icon]}
                <div className="ml-4">
                  <div className="text-lg font-bold text-green-700">
                    {Number(item.value).toFixed(2)} {item.unit}
                  </div>
                  <div className="text-xs text-green-500">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DeviceDashboard;