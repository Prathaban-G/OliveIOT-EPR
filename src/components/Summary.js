import React from 'react';
import { 
  Package, 
  Users, 
  MapPin, 
  Server 
} from 'lucide-react';

const SummaryCard = ({ icon: Icon, title, value, bgColor }) => (
  <div className="p-4 bg-white rounded-lg shadow-md flex items-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
    <div className={`p-3 ${bgColor} text-white rounded-full mr-4 shadow-md`}>
      <Icon size={24} />
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wider">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const SummarySection = () => {
  const summaryItems = [
    { 
      title: "Products", 
      icon: Package, 
      value: "123", 
      bgColor: "bg-teal-600 hover:bg-teal-700" 
    },
    { 
      title: "Clients", 
      icon: Users, 
      value: "456", 
      bgColor: "bg-blue-600 hover:bg-blue-700" 
    },
    { 
      title: "Locations", 
      icon: MapPin, 
      value: "7", 
      bgColor: "bg-green-600 hover:bg-green-700" 
    },
    { 
      title: "Active Machines", 
      icon: Server, 
      value: "89", 
      bgColor: "bg-purple-600 hover:bg-purple-700" 
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {summaryItems.map((item, index) => (
        <SummaryCard 
          key={index}
          icon={item.icon}
          title={item.title}
          value={item.value}
          bgColor={item.bgColor}
        />
      ))}
    </div>
  );
};

export default SummarySection;