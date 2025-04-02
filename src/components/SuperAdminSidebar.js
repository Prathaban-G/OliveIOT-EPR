import React, { useState } from 'react';
import { 
  LayoutDashboard,
  Briefcase,
  Users,
  BarChart,
  ChevronRight,
  ChevronLeft,
  LogOut 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SuperAdminSidebar = ({ isExpanded, setIsExpanded, activeTab, setActiveTab }) => {
  const navItems = [
    { 
      icon: LayoutDashboard, 
      label: "Overview", 
      key: "overview" 
    },
    { 
      icon: Briefcase, 
      label: "Project Management", 
      key: "projects" 
    },
    { 
      icon: Users, 
      label: "User Management", 
      key: "users" 
    },
    { 
      icon: BarChart, 
      label: "Report Management", 
      key: "reports" 
    }
  ];

  const NavItem = ({ icon: Icon, label, active, onClick }) => (
    <motion.div 
      onClick={onClick}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        flex items-center
        ${isExpanded ? 'p-3' : 'justify-center p-2'}
        hover:bg-gray-100
        rounded-lg
        cursor-pointer
        transition-all
        duration-300
        group
        ${active ? 'bg-teal-100 shadow-md' : ''}
      `}
    >
      <motion.div 
        initial={{ rotate: 0 }}
        animate={{ rotate: active ? 5 : 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Icon
          className={`
            ${active ? 'text-teal-600' : 'text-gray-600'}
            ${isExpanded ? 'mr-3' : ''}
          `}
          size={20}
        />
      </motion.div>
      <AnimatePresence>
        {isExpanded && (
          <motion.span 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
            className={`
              ${active ? 'text-teal-600' : 'text-gray-700'}
              text-sm
              font-medium
              overflow-hidden
              whitespace-nowrap
            `}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );

  const ToggleButton = () => (
    <motion.button
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="
        absolute
        top-1
        left-5
        bg-white
        border
        rounded-full
        p-1
        shadow-md
        hover:bg-gray-100
        transition-all
        duration-300
        z-10
      "
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: isExpanded ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </motion.div>
    </motion.button>
  );

  return (
    <motion.aside
      initial={{ width: '5rem' }}
      animate={{ 
        width: isExpanded ? '16rem' : '5rem',
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
      className={`
        fixed
        left-0
        top-20
        h-screen
        bg-white
        border-r
        shadow-lg
        flex
        flex-col
        justify-between
        overflow-hidden
        transition-all
        duration-300
        ease-in-out
      `}
    >
      <div>
        <ToggleButton />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-12 space-y-2 px-2"
        >
          {navItems.map((item) => (
            <NavItem
              key={item.key}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.key}
              onClick={() => setActiveTab(item.key)}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Logout option at the bottom */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pb-4 px-2"
      >
        <NavItem
          icon={LogOut}
          label="Logout"
          onClick={() => {
            // Add logout logic here
            console.log('Logout clicked');
          }}
        />
      </motion.div>
    </motion.aside>
  );
};

export default SuperAdminSidebar;