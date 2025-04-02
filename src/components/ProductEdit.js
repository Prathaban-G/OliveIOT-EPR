import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Trash2, 
  Upload, 
  Move, 
  RotateCw, 
  Expand, 
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown 
} from 'lucide-react';

const ProductEdit = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [parameters, setParameters] = useState([]);
  const [newParam, setNewParam] = useState({
    paramName: '',
    units: '',
    type: 'annotation',
    arrowType: null
  });
  const [selectedDbName, setSelectedDbName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);

  // Arrow types
  const arrowTypes = [
    { icon: ArrowRight, value: 'right' },
    { icon: ArrowLeft, value: 'left' },
    { icon: ArrowUp, value: 'up' },
    { icon: ArrowDown, value: 'down' }
  ];

  // Database options
  const dbOptions = [
    'Product Database',
    'Inventory Management',
    'Engineering Specs',
    'Quality Control'
  ];

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new parameter
  const addParameter = () => {
    if (newParam.paramName && newParam.units && selectedDbName) {
      const newParamItem = {
        id: `param-${Date.now()}`,
        ...newParam,
        x: 20, 
        y: 20,  
        width: 100, 
        height: 50,
        rotation: 0,
        dbReference: selectedDbName
      };
      setParameters([...parameters, newParamItem]);
      
      // Reset input fields
      setNewParam({
        paramName: '',
        units: '',
        type: 'annotation',
        arrowType: null
      });
      setSelectedDbName('');
      setIsModalOpen(false);
    }
  };

  // Delete parameter
  const deleteParameter = (id) => {
    setParameters(parameters.filter(param => param.id !== id));
  };

  // Handle parameter drag
  const handleParameterDrag = (e, parameterId) => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setParameters(parameters.map(param => 
        param.id === parameterId 
          ? { ...param, x, y } 
          : param
      ));
    }
  };

  // Render arrow based on type
  const renderArrow = (arrowType) => {
    const ArrowIcon = arrowTypes.find(a => a.value === arrowType)?.icon;
    return ArrowIcon ? <ArrowIcon className="h-4 w-4" /> : null;
  };

  return (
    <div className="relative w-full h-screen">
      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Image Container */}
      <div 
        ref={imageRef}
        className="relative w-full h-full bg-gray-200 border-2 border-dashed flex items-center justify-center"
      >
        {uploadedImage ? (
          // Uploaded Image
          <div className="relative w-full h-full">
            <img 
              src={uploadedImage} 
              alt="Uploaded" 
              className="w-full h-full object-contain"
            />

            {/* Draggable Parameters */}
            {parameters.map((parameter) => (
              <div 
                key={parameter.id}
                draggable
                onDragEnd={(e) => handleParameterDrag(e, parameter.id)}
                style={{
                  position: 'absolute',
                  left: `${parameter.x}px`,
                  top: `${parameter.y}px`,
                  transform: `rotate(${parameter.rotation}deg)`
                }}
                className="absolute cursor-move"
              >
                <div className="flex items-center space-x-2">
                  {parameter.arrowType && renderArrow(parameter.arrowType)}
                  <div className="text-sm">
                    <span className="font-bold">{parameter.paramName}</span>
                    <div className="text-gray-600 text-xs">
                      {parameter.dbReference} | {parameter.units}
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteParameter(parameter.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Upload Prompt
          <div className="text-center">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition flex items-center justify-center"
            >
              <Upload className="h-6 w-6 mr-2" />
              Upload Image
            </button>
            <p className="mt-2 text-gray-600">Click to upload an image</p>
          </div>
        )}

        {/* Add Parameter Button - Bottom Right */}
        {uploadedImage && (
          <>
            <button 
              className="absolute bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition shadow-lg"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="h-6 w-6" />
            </button>

            {/* Custom Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                  <h2 className="text-xl font-bold mb-4">Add New Parameter</h2>
                  <div className="space-y-4">
                    <select
                      value={selectedDbName}
                      onChange={(e) => setSelectedDbName(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select Database Reference</option>
                      {dbOptions.map((db) => (
                        <option key={db} value={db}>{db}</option>
                      ))}
                    </select>
                    <input 
                      value={newParam.paramName}
                      onChange={(e) => setNewParam({...newParam, paramName: e.target.value})}
                      placeholder="Parameter Name"
                      className="w-full p-2 border rounded"
                    />
                    <input 
                      value={newParam.units}
                      onChange={(e) => setNewParam({...newParam, units: e.target.value})}
                      placeholder="Units"
                      className="w-full p-2 border rounded"
                    />
                    <div className="flex justify-between mb-4">
                      <span>Select Arrow Type:</span>
                      <div className="flex space-x-2">
                        {arrowTypes.map((arrow) => (
                          <button
                            key={arrow.value}
                            onClick={() => setNewParam({...newParam, arrowType: arrow.value})}
                            className={`p-1 rounded ${newParam.arrowType === arrow.value ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                          >
                            <arrow.icon className="h-5 w-5" />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <button 
                        onClick={() => setIsModalOpen(false)}
                        className="bg-gray-200 p-2 rounded hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={addParameter}
                        disabled={!newParam.paramName || !newParam.units || !selectedDbName}
                        className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
                      >
                        Add Parameter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductEdit;