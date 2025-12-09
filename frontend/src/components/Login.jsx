import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';
import { Shield, User, Lock, LogIn, AlertCircle, ArrowLeft } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', formData);
      
      // Store token in localStorage
      localStorage.setItem('adminToken', response.data.token);
      
      // Redirect to admin panel
      navigate('/admin');
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
          <div>
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center shadow-lg">
                <Shield className="text-orange-500" size={40} />
              </div>
            </div>
            <h2 className="text-center text-4xl font-bold text-gray-800 mb-2">
              Admin Login
            </h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto mb-4" />
            <p className="text-center text-gray-600 mb-4">
              Sign in to access the admin panel
            </p>
            <div className="text-center text-sm text-gray-700 bg-orange-50 border border-orange-200 rounded-lg px-4 py-3">
              <p className="font-medium text-orange-800 mb-1">Demo Credentials</p>
              <p>
                <span className="font-semibold">Username:</span> admin | 
                <span className="font-semibold ml-2">Password:</span> admin123
              </p>
            </div>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                <AlertCircle size={20} />
                <span className="text-sm">{error}</span>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="text-gray-400" size={20} />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                    placeholder="Enter your username"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="text-gray-400" size={20} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-base font-semibold rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <LogIn className="animate-pulse" size={20} />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    Sign in
                  </>
                )}
              </button>
            </div>

            <div className="text-center pt-4 border-t border-gray-200">
              <a
                href="/"
                className="font-medium text-orange-600 hover:text-orange-700 flex items-center justify-center gap-2 transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Landing Page
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
