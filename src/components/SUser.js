import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, MapPin, CheckCircle, Package, 
  TrendingUp, TrendingDown, Search, 
  PlusCircle, ArrowUp, ArrowDown, 
  Check, X, Trash2, Eye, MoreVertical,
  ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight,Upload 
} from 'lucide-react';

const SUser = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const users = [
    {
      id: 'USR-1',
      status: 'active',
      name: 'Prathaban Selvam',
      email: 'prathaban@example.com',
      userImage: '/Assets/male.png',
      role: 'Admin',
      location: 'Chennai',
      registeredDate: '09 May 2020',
      lastLogin: '28/10/2024'
    },
    {
      id: 'USR-2',
      status: 'inactive',
      name: 'Viji Rajendran',
      email: 'viji@example.com',
      userImage: '/Assets/female.png',
      role: 'Manager',
      location: 'Bangalore',
      registeredDate: '15 June 2020',
      lastLogin: '22/10/2024'
    },
    {
      id: 'USR-3',
      status: 'active',
      name: 'Muthuraja Krishnan',
      email: 'muthuraja@example.com',
      userImage: '/Assets/male2.png',
      role: 'Analyst',
      location: 'Mumbai',
      registeredDate: '22 July 2020',
      lastLogin: '27/10/2024'
    },
    {
      id: 'USR-4',
      status: 'active',
      name: 'Anand Patel',
      email: 'anand@example.com',
      userImage: '/Assets/male.png',
      role: 'Editor',
      location: 'Delhi',
      registeredDate: '03 Aug 2020',
      lastLogin: '26/10/2024'
    },
    {
      id: 'USR-5',
      status: 'inactive',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      userImage: '/Assets/female.png',
      role: 'Viewer',
      location: 'Kolkata',
      registeredDate: '10 Sept 2020',
      lastLogin: '25/10/2024'
    },
    {
      id: 'USR-6',
      status: 'active',
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      userImage: '/Assets/male2.png',
      role: 'Contributor',
      location: 'Hyderabad',
      registeredDate: '18 Oct 2020',
      lastLogin: '24/10/2024'
    }
  ];

  // Filtering and Sorting
  const filteredUsers = useMemo(() => {
    let result = users.filter(user => 
      (statusFilter === 'All' || 
       (statusFilter === 'Active' && user.status === 'active') ||
       (statusFilter === 'Inactive' && user.status === 'inactive')) &&
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
       user.id.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) 
          return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) 
          return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [users, statusFilter, searchTerm, sortConfig]);

  // Pagination
  const paginatedUsers = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return filteredUsers.slice(firstPageIndex, lastPageIndex);
  }, [filteredUsers, currentPage]);

  // Sorting Handler
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  // Pagination Controls
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Render based on active view
  if (activeView === 'create-user') {
    return <UserCreate onBack={() => setActiveView('dashboard')} />;
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen p-6"
    >
      {/* Breadcrumbs */}
      <motion.nav 
        variants={filterVariants}
        className="mb-6 text-sm text-gray-600"
      >
        <span>Dashboard</span> 
        <span className="mx-2">/</span> 
        <span className="font-semibold text-teal-700">Users</span>
      </motion.nav>

      <div className="mx-auto">
        <motion.h2 
          variants={filterVariants}
          className="text-4xl font-extrabold text-teal-900 mb-6"
        >
          User Management
        </motion.h2>

        {/* Metrics Overview */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-4 gap-6 mb-12"
        >
          {[
            { 
              icon: Users, 
              value: '64', 
              label: 'Total Users', 
              trend: 'up',
              trendValue: '15.6%'
            },
            { 
              icon: CheckCircle, 
              value: '52', 
              label: 'Active Users', 
              trend: 'up',
              trendValue: '12.3%'
            },
            { 
              icon: MapPin, 
              value: '7', 
              label: 'Locations', 
              trend: 'up',
              trendValue: '40.0%'
            },
            { 
              icon: Package, 
              value: '6', 
              label: 'User Roles', 
              trend: 'up',
              trendValue: '20.0%'
            }
          ].map((metric) => {
            const IconComponent = metric.icon;
            return (
              <motion.div 
                key={metric.label} 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 transform transition"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="bg-blue-50 p-3 rounded-full">
                    <IconComponent className="text-blue-600" size={24} />
                  </div>
                  <div className={`flex items-center ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {metric.trend === 'up' ? (
                      <TrendingUp size={18} className="mr-1" />
                    ) : (
                      <TrendingDown size={18} className="mr-1" />
                    )}
                    <span className="text-sm">{metric.trendValue}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-1">{metric.value}</h3>
                  <p className="text-gray-500">{metric.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Filters and Actions */}
        <motion.div 
          variants={filterVariants}
          className="flex justify-between items-center mb-6"
        >
          <div className="flex items-center space-x-4">
            <motion.select 
              whileFocus={{ scale: 1.05 }}
              className="border-2 border-teal-200 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-teal-300"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </motion.select>
            <div className="relative">
              <motion.input 
                whileFocus={{ scale: 1.05 }}
                type="text" 
                placeholder="Search Users" 
                className="border-2 border-teal-200 rounded-lg px-4 py-2 pl-10 w-72 focus:ring-2 focus:ring-teal-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>
          </div>
          <div className="flex space-x-4">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveView('create-user')}
              className="bg-teal-600 text-white px-5 py-2.5 rounded-lg flex items-center hover:bg-teal-700 transition shadow-md"
            >
              <PlusCircle className="mr-2" /> Create User
            </motion.button>
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="bg-white shadow-lg rounded-xl overflow-hidden"
        >
          <table className="w-full">
            <thead className="bg-teal-50 border-b-2 border-teal-200">
              <tr>
                <th className="p-4 text-left w-12">
                  <input type="checkbox" className="form-checkbox text-teal-600" />
                </th>
                <th 
                  className="p-4 text-left cursor-pointer hover:bg-teal-100"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Name
                    {sortConfig.key === 'name' && (
                      sortConfig.direction === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                    )}
                  </div>
                </th>
                <th className="p-4 text-left">Email</th>
                <th 
                  className="p-4 text-left cursor-pointer hover:bg-teal-100"
                  onClick={() => handleSort('role')}
                >
                  <div className="flex items-center">
                    Role
                    {sortConfig.key === 'role' && (
                      sortConfig.direction === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                    )}
                  </div>
                </th>
                <th className="p-4 text-left">Location</th>
                <th className="p-4 text-left">Registered Date</th>
                <th className="p-4 text-left">Last Login</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <motion.tr 
                  key={user.id} 
                  variants={itemVariants}
                  whileHover={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    scale: 1.01
                  }}
                  className="border-b hover:bg-teal-50 transition"
                >
                  <td className="p-4">
                    <input type="checkbox" className="form-checkbox text-teal-600" />
                  </td>
                 
                  <td className="p-4 flex items-center">
                    <img 
                      src={user.userImage} 
                      alt={user.name} 
                      className="w-8 h-8 mr-2 rounded-full" 
                    />
                    {user.name}
                  </td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.role}</td>
                  <td className="p-4">{user.location}</td>
                  <td className="p-4">{user.registeredDate}</td>
                  <td className="p-4">
                    <span 
                      className={`px-3 py-1 rounded-full text-sm ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.lastLogin}
                    </span>
                  </td>
                  <td className="p-4 flex space-x-3">
                    <motion.div 
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 
                        className="text-red-500 cursor-pointer hover:text-red-700 transition" 
                        size={20} 
                      />
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Eye 
                        className="text-blue-500 cursor-pointer hover:text-blue-700 transition" 
                        size={20} 
                      />
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <MoreVertical 
                        className="text-gray-500 cursor-pointer hover:text-gray-700 transition" 
                        size={20} 
                      />
                    </motion.div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <motion.div 
            variants={filterVariants}
            className="flex justify-between items-center p-4 bg-gray-50"
          >
            <span className="text-gray-600">
              Showing {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
            </span>
            <div className="flex items-center space-x-2">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(1)} 
                disabled={currentPage === 1}
                className="p-2 disabled:opacity-50 hover:bg-teal-100 rounded"
              >
                <ChevronsLeft />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                disabled={currentPage === 1}
                className="p-2 disabled:opacity-50 hover:bg-teal-100 rounded"
              >
                <ChevronLeft />
              </motion.button>
              {[...Array(totalPages)].map((_, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1 
                      ? 'bg-teal-600 text-white' 
                      : 'hover:bg-teal-100 text-gray-700'
                  }`}
                >
                  {i + 1}
                </motion.button>
              ))}
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                disabled={currentPage === totalPages}
                className="p-2 disabled:opacity-50 hover:bg-teal-100 rounded"
              >
                <ChevronRight />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(totalPages)} 
                disabled={currentPage === totalPages}
                className="p-2 disabled:opacity-50 hover:bg-teal-100 rounded"
              >
                <ChevronsRight />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
const UserCreate = ({ onBack }) => {
    const [formData, setFormData] = useState({
      name: '',
      username: '',
      emailId: '',
      location: '',
      companyInfo: '',
      mobileNo: '',
      role:'',
      logoImage: null,
      backgroundImage: null
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleImageUpload = (e) => {
      const { name, files } = e.target;
      if (files[0]) {
        setFormData(prev => ({
          ...prev,
          [name]: URL.createObjectURL(files[0])
        }));
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form Submitted', formData);
    };
  
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          delayChildren: 0.2,
          staggerChildren: 0.1 
        }
      },
      exit: { opacity: 0 }
    };
  
    const elementVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: 'spring', stiffness: 300, damping: 24 }
      }
    };
  
    return (
      <motion.div 
        className="min-h-screen p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Breadcrumbs */}
        <motion.nav 
          className="mb-6 text-sm text-gray-600"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span onClick={onBack} className="cursor-pointer hover:text-teal-700">Dashboard</span> 
          <span className="mx-2">/</span> 
          <span className="font-semibold text-teal-700">Create User</span>
        </motion.nav>
  
        <motion.div 
          className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8 overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.h2 
            className="text-3xl font-bold text-teal-900 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Create New User
          </motion.h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Name */}
                <motion.div variants={elementVariants}>
                  <motion.label 
                    className="block text-gray-700 font-semibold mb-2"
                    variants={elementVariants}
                  >
                    Name *
                  </motion.label>
                  <motion.input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300"
                    placeholder="Enter full name"
                    variants={elementVariants}
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                {/* Username */}
                <motion.div variants={elementVariants}>
                  <motion.label 
                    className="block text-gray-700 font-semibold mb-2"
                    variants={elementVariants}
                  >
                    Username *
                  </motion.label>
                  <motion.input 
                    type="text" 
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300"
                    placeholder="Enter username"
                    variants={elementVariants}
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                {/* Email ID */}
                <motion.div variants={elementVariants}>
                  <motion.label 
                    className="block text-gray-700 font-semibold mb-2"
                    variants={elementVariants}
                  >
                    Email ID *
                  </motion.label>
                  <motion.input 
                    type="email" 
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300"
                    placeholder="Enter email address"
                    variants={elementVariants}
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                {/* Mobile Number */}
                <motion.div variants={elementVariants}>
                  <motion.label 
                    className="block text-gray-700 font-semibold mb-2"
                    variants={elementVariants}
                  >
                    Mobile No *
                  </motion.label>
                  <motion.input 
                    type="tel" 
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300"
                    placeholder="Enter mobile number"
                    variants={elementVariants}
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>
                   {/* Mobile Number */}
                   <motion.div variants={elementVariants}>
                  <motion.label 
                    className="block text-gray-700 font-semibold mb-2"
                    variants={elementVariants}
                  >
                   Role *
                  </motion.label>
                  <motion.input 
                    type="text" 
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300"
                    placeholder="Admin/User"
                    variants={elementVariants}
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Location */}
                <motion.div variants={elementVariants}>
                  <motion.label 
                    className="block text-gray-700 font-semibold mb-2"
                    variants={elementVariants}
                  >
                    Location *
                  </motion.label>
                  <motion.select 
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300"
                    variants={elementVariants}
                    whileFocus={{ scale: 1.02 }}
                  >
                    <option value="">Select Location</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Kolkata">Kolkata</option>
                  </motion.select>
                </motion.div>
  {/* Logo Image */}
  <motion.div variants={elementVariants}>
                  <motion.label 
                    className="block text-gray-700 font-semibold mb-2"
                    variants={elementVariants}
                  >
                    Logo Image *
                  </motion.label>
                  <motion.div 
                    className="flex items-center space-x-4"
                    variants={elementVariants}
                  >
                    <div className="flex-grow">
                      <input 
                        type="file" 
                        name="logoImage"
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                        id="logoImageUpload"
                      />
                      <motion.label 
                        htmlFor="logoImageUpload" 
                        className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg flex items-center cursor-pointer hover:bg-teal-50 transition"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Upload className="mr-2 text-teal-600" />
                        {formData.logoImage ? 'Logo Selected' : 'Upload Logo'}
                      </motion.label>
                    </div>
                    {formData.logoImage && (
                      <motion.img 
                        src={formData.logoImage} 
                        alt="Logo" 
                        className="w-20 h-20 object-cover rounded-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    )}
                  </motion.div>
                </motion.div>

                {/* Background Image */}
                <motion.div variants={elementVariants}>
                  <motion.label 
                    className="block text-gray-700 font-semibold mb-2"
                    variants={elementVariants}
                  >
                    Background Image *
                  </motion.label>
                  <motion.div 
                    className="flex items-center space-x-4"
                    variants={elementVariants}
                  >
                    <div className="flex-grow">
                      <input 
                        type="file" 
                        name="backgroundImage"
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                        id="backgroundImageUpload"
                      />
                      <motion.label 
                        htmlFor="backgroundImageUpload" 
                        className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg flex items-center cursor-pointer hover:bg-teal-50 transition"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Upload className="mr-2 text-teal-600" />
                        {formData.backgroundImage ? 'Background Selected' : 'Upload Background'}
                      </motion.label>
                    </div>
                    {formData.backgroundImage && (
                      <motion.img 
                        src={formData.backgroundImage} 
                        alt="Background" 
                        className="w-20 h-20 object-cover rounded-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    )}
                  </motion.div>
                </motion.div>
                {/* Company Info */}
                <motion.div variants={elementVariants}>
                  <motion.label 
                    className="block text-gray-700 font-semibold mb-2"
                    variants={elementVariants}
                  >
                    Company Info *
                  </motion.label>
                  <motion.textarea 
                    name="companyInfo"
                    value={formData.companyInfo}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300"
                    placeholder="Enter company information"
                    rows="3"
                    variants={elementVariants}
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

              
              </div>
            </div>

            {/* Submit Buttons */}
            <motion.div 
              className="flex justify-end space-x-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button 
                type="button"
                onClick={onBack}
                className="px-6 py-2 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition shadow-md"
              >
                Create User
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    );
  };


export default SUser;