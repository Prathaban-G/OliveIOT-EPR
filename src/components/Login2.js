import React, { useState } from 'react';
import { Leaf, Lock, User } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simple login validation
    if (username === 'admin' && password === 'admin@123') {
      // In a real app, you'd handle authentication here
      alert('Login Successful!');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-center">
          <div className="flex justify-center items-center mb-4">
            <Leaf className="text-white mr-2" size={40} />
            <h1 className="text-3xl font-bold text-white">OliveIOT</h1>
          </div>
          <p className="text-green-100">Intelligent IoT Solutions</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              {error}
            </div>
          )}
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="text-green-500" />
            </div>
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="text-green-500" />
            </div>
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
          >
            <Lock className="mr-2" size={20} />
            Login
          </button>
        </form>
        
        <div className="bg-green-50 p-4 text-center text-green-600">
          <p className="text-sm">© 2024 OliveIOT. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;