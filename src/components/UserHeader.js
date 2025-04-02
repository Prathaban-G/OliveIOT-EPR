import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WifiIcon, ServerIcon, LogOut } from 'lucide-react';

function ResponsiveHeader() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isOnline, setIsOnline] = useState(true);
  const [isRunning, setIsRunning] = useState(true);
  // Handle responsive design
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Add event listener
    window.addEventListener('resize', checkMobileView);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/"; // Redirect to login page
  };
  // Mobile view with icons only
  const MobileHeader = () => (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-sm flex justify-between items-center p-4 sticky top-0 z-10"
    >
      <motion.img
        src="/Assets/ecoinfinity.svg"
        alt="EcoInfinity Logo"
        className="h-8"
        initial={{ rotate: -180, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      />

      <div className="flex items-center space-x-4">
        <WifiIcon 
          size={20} 
          className="text-green-500 animate-pulse" 
          title="Online Status"
        />
        <ServerIcon 
          size={20} 
          className="text-blue-500 animate-spin-slow" 
          title="Machine Status"
        />
        <motion.img
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
          src="/Assets/man-user.svg"
          alt="User Avatar"
          className="w-8 h-8 rounded-full border-2 border-teal-500 cursor-pointer"
          onClick={handleLogout}
        />
      </div>
    </motion.header>
  );

  // Full desktop view
  const DesktopHeader = () => (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-sm flex flex-col justify-between items-center p-4 sticky top-0 z-10"
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <motion.img
            src="/Assets/olivelogoo.png"
            alt="EcoInfinity Logo"
            className="h-10"
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          />
          <div>
            <h1 className="text-xl font-bold text-teal-700">Olive IoT</h1>
            <div className="text-xs text-gray-500">INDUSTRIAL DATA LOGGER</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          {/* Status Indicators */}
          <div className="flex items-center space-x-4">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <WifiIcon 
                size={20} 
                className="text-green-500 animate-pulse" 
                title="Online Status"
              />
              <span className="text-sm font-medium text-green-600">Online</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ServerIcon 
                size={20} 
                className="text-blue-500 animate-spin-slow" 
                title="Machine Status"
              />
              <span className="text-sm font-medium text-blue-600">Running</span>
            </motion.div>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="font-medium text-sm text-right">
              <div>User</div>
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
                  <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Prathab</a>
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
      </div>
    </motion.header>
  );

  // Render appropriate header based on screen size
  return isMobile ? <MobileHeader /> : <DesktopHeader />;
}

export default ResponsiveHeader;