import React, { useState, useMemo } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import ProductEdit from './ProductEdit';
import { 
  Eye, 
  Trash2, 
  MoreVertical, 
  Check, 
  X, 
  Filter, 
  Search, 
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,Pencil,
  ChevronsRight,
  ArrowUp,
  ArrowDown,
  Package, 
  Users, 
  MapPin, 
  CheckCircle,
  TrendingUp, 
  TrendingDown,
  Upload
} from 'lucide-react';
const containerVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
    transition: {
      duration: 0.3
    }
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
      duration: 0.5
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: {
      duration: 0.3
    }
  }
};

const formVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    transition: {
      duration: 0.3
    }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
      delay: 0.2
    }
  },
  exit: { 
    opacity: 0, 
    y: 50,
    transition: {
      duration: 0.3
    }
  }
};
const elementVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};
const ProductCreate = ({ onBack }) => {
  const [formData, setFormData] = useState({
    productName: '',
    serialNumber: '',
    contactPerson: '',
    location: '',
    companyInfo: '',
    productImage: null,
    issuedDate: '',
    maintenanceDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        productImage: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement submission logic
    console.log('Form Submitted', formData);
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
      <span className="font-semibold text-teal-700">Create Product</span>
    </motion.nav>

    <motion.div 
      className="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl p-8 overflow-hidden"
      variants={formVariants}
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
        Create New Product
      </motion.h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div 
          className="grid grid-cols-2 gap-6"
          variants={containerVariants}
        >
          {/* Product Name */}
          <motion.div variants={elementVariants}>
            <motion.label 
              className="block text-gray-700 font-semibold mb-2"
              variants={elementVariants}
            >
              Product Name *
            </motion.label>
            <motion.input 
              type="text" 
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300"
              placeholder="Enter product name"
              variants={elementVariants}
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>

          {/* Serial Number */}
          <motion.div variants={elementVariants}>
            <motion.label 
              className="block text-gray-700 font-semibold mb-2"
              variants={elementVariants}
            >
              Serial Number *
            </motion.label>
            <motion.input 
              type="text" 
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300"
              placeholder="Enter serial number"
              variants={elementVariants}
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 gap-6"
          variants={containerVariants}
        >
          {/* Contact Person */}
          <motion.div variants={elementVariants}>
            <motion.label 
              className="block text-gray-700 font-semibold mb-2"
              variants={elementVariants}
            >
              Contact Person *
            </motion.label>
            <motion.input 
              type="text" 
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300"
              placeholder="Enter contact person"
              variants={elementVariants}
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>

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

        {/* Product Image */}
        <motion.div variants={elementVariants}>
          <motion.label 
            className="block text-gray-700 font-semibold mb-2"
            variants={elementVariants}
          >
            Product Image *
          </motion.label>
          <motion.div 
            className="flex items-center space-x-4"
            variants={elementVariants}
          >
            <div className="flex-grow">
              <input 
                type="file" 
                name="productImage"
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
                id="productImageUpload"
              />
              <motion.label 
                htmlFor="productImageUpload" 
                className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg flex items-center cursor-pointer hover:bg-teal-50 transition"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Upload className="mr-2 text-teal-600" />
                {formData.productImage ? 'Image Selected' : 'Upload Image'}
              </motion.label>
            </div>
            {formData.productImage && (
              <motion.img 
                src={formData.productImage} 
                alt="Product" 
                className="w-20 h-20 object-cover rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 gap-6"
          variants={containerVariants}
        >
          {/* Issued Date */}
          <motion.div variants={elementVariants}>
            <motion.label 
              className="block text-gray-700 font-semibold mb-2"
              variants={elementVariants}
            >
              Issued Date *
            </motion.label>
            <motion.input 
              type="date" 
              name="issuedDate"
              value={formData.issuedDate}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300"
              variants={elementVariants}
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>

          {/* Maintenance Date */}
          <motion.div variants={elementVariants}>
            <motion.label 
              className="block text-gray-700 font-semibold mb-2"
              variants={elementVariants}
            >
              Maintenance Date
            </motion.label>
            <motion.input 
              type="date" 
              name="maintenanceDate"
              value={formData.maintenanceDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300"
              variants={elementVariants}
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>
        </motion.div>

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
            Create Product
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  </motion.div>
  );
};

const ProductDashboard = () => {
  const [activeView, setActiveView] = useState('dashboard');

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const products = [
    {
      id: 'HW-1',
      status: 'success',
      client: 'Prathaban',
      clientImage: '/Assets/male.png',
      location: 'Chennai',
      issuedDate: '09 May 2020',
      lastUpdated: '28/10/2024',
      productType: 'Motherboard'
    },
    {
      id: 'HW-2',
      status: 'success',
      client: 'Viji',
      clientImage: '/Assets/female.png',
      location: 'Bangalore',
      issuedDate: '15 June 2020',
      lastUpdated: '28/10/2024',
      productType: 'Graphics Card'
    },
    {
      id: 'HW-3',
      status: 'danger',
      client: 'Muthuraja',
      clientImage: '/Assets/male2.png',
      location: 'Mumbai',
      issuedDate: '22 July 2020',
      lastUpdated: '27/10/2024',
      productType: 'Processor'
    },
    // Add more products to demonstrate pagination
    {
      id: 'HW-4',
      status: 'success',
      client: 'Anand',
      clientImage: '/Assets/male.png',
      location: 'Delhi',
      issuedDate: '03 Aug 2020',
      lastUpdated: '26/10/2024',
      productType: 'RAM'
    },
    {
      id: 'HW-5',
      status: 'danger',
      client: 'Priya',
      clientImage: '/Assets/female.png',
      location: 'Kolkata',
      issuedDate: '10 Sept 2020',
      lastUpdated: '25/10/2024',
      productType: 'SSD'
    },
    {
      id: 'HW-6',
      status: 'success',
      client: 'Rajesh',
      clientImage: '/Assets/male2.png',
      location: 'Hyderabad',
      issuedDate: '18 Oct 2020',
      lastUpdated: '24/10/2024',
      productType: 'Power Supply'
    }
  ];

  // Filtering and Sorting
  const filteredProducts = useMemo(() => {
    let result = products.filter(product => 
      (statusFilter === 'All' || 
       (statusFilter === 'Online' && product.status === 'success') ||
       (statusFilter === 'Offline' && product.status === 'danger')) &&
      (product.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
       product.id.toLowerCase().includes(searchTerm.toLowerCase()))
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
  }, [products, statusFilter, searchTerm, sortConfig]);

  // Pagination
  const paginatedProducts = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return filteredProducts.slice(firstPageIndex, lastPageIndex);
  }, [filteredProducts, currentPage]);

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
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
 // Render based on active view
 if (activeView === 'create-product') {
  return <ProductCreate onBack={() => setActiveView('dashboard')} />;
}
if (activeView === 'productedit') {
  return <ProductEdit onBack={() => setActiveView('dashboard')} />;
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
      <span className="font-semibold text-teal-700">Products</span>
    </motion.nav>

    <div className="mx-auto">
      <motion.h2 
        variants={filterVariants}
        className="text-4xl font-extrabold text-teal-900 mb-6"
      >
        Product Management
      </motion.h2>

      {/* Metrics Overview */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-4 gap-6 mb-12"
      >
        {[
          { 
            icon: Package, 
            value: '124', 
            label: 'Total Products', 
            trend: 'up',
            trendValue: '12.5%'
          },
          { 
            icon: Users, 
            value: '56', 
            label: 'Unique Clients', 
            trend: 'up',
            trendValue: '8.3%'
          },
          { 
            icon: MapPin, 
            value: '4', 
            label: 'Locations', 
            trend: 'up',
            trendValue: '33.3%'
          },
          { 
            icon: CheckCircle, 
            value: '65%', 
            label: 'Active Products', 
            trend: 'down',
            trendValue: '2.1%'
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
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </motion.select>
          <div className="relative">
            <motion.input 
              whileFocus={{ scale: 1.05 }}
              type="text" 
              placeholder="Search Products" 
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
  onClick={() => setActiveView('productedit')}
  className="bg-teal-600 text-white px-5 py-2.5 rounded-lg flex items-center hover:bg-indigo-700 transition shadow-md"
>
  <Pencil className="mr-2" /> Product Edit
</motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveView('create-product')}
            className="bg-teal-600 text-white px-5 py-2.5 rounded-lg flex items-center hover:bg-teal-700 transition shadow-md"
          >
            <PlusCircle className="mr-2" /> Create Product
          </motion.button>
         
        </div>
      </motion.div>

      {/* Products Table */}
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
              onClick={() => handleSort('id')}
            >
              <div className="flex items-center">
                Product ID
                {sortConfig.key === 'id' && (
                  sortConfig.direction === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                )}
              </div>
            </th>
            <th className="p-4 text-left">Status</th>
            <th 
              className="p-4 text-left cursor-pointer hover:bg-teal-100"
              onClick={() => handleSort('client')}
            >
              <div className="flex items-center">
                Client
                {sortConfig.key === 'client' && (
                  sortConfig.direction === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                )}
              </div>
            </th>
            <th className="p-4 text-left">Location</th>
            <th 
              className="p-4 text-left cursor-pointer hover:bg-teal-100"
              onClick={() => handleSort('productType')}
            >
              <div className="flex items-center">
                Product Type
                {sortConfig.key === 'productType' && (
                  sortConfig.direction === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                )}
              </div>
            </th>
            <th className="p-4 text-left">Issued Date</th>
            <th className="p-4 text-left">Last Updated</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product) => (
            <motion.tr 
              key={product.id} 
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
                  src="/Assets/chip.png" 
                  alt="chip" 
                  className="w-8 h-8 mr-2" 
                />
                {product.id}
              </td>
              <td className="p-4">
                {product.status === 'success' ? (
                  <Check className="text-green-500" />
                ) : (
                  <X className="text-red-500" />
                )}
              </td>
              <td className="p-4 flex items-center">
                <img 
                  src={product.clientImage} 
                  alt={product.client} 
                  className="w-8 h-8 mr-2 rounded-full" 
                />
                {product.client}
              </td>
              <td className="p-4">{product.location}</td>
              <td className="p-4">{product.productType}</td>
              <td className="p-4">{product.issuedDate}</td>
              <td className="p-4">
                <span 
                  className={`px-3 py-1 rounded-full text-sm ${
                    product.status === 'success' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {product.lastUpdated}
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
          Showing {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
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

export default ProductDashboard;