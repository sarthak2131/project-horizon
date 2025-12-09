import React, { useState, useEffect } from 'react';
import api from '../config/api.js';
import Dashboard from './admin/Dashboard.jsx';
import ProjectManagement from './admin/ProjectManagement.jsx';
import ClientManagement from './admin/ClientManagement.jsx';
import ContactDetails from './admin/ContactDetails.jsx';
import NewsletterSubscriptions from './admin/NewsletterSubscriptions.jsx';
import { LayoutDashboard, Building, Users, Mail, Bell, Home, LogOut } from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: Building },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'contacts', label: 'Contact Forms', icon: Mail },
    { id: 'newsletter', label: 'Newsletter', icon: Bell }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img
                alt="Real Estate Logo"
                className="h-10 w-auto"
                src="https://res.cloudinary.com/sarthak-bad/image/upload/v1765287828/platform-images/logo.png"
              />
              <div className="border-l border-gray-300 pl-4">
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Manage your real estate platform</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <a 
                href="/" 
                className="text-gray-600 hover:text-orange-500 font-medium transition-colors flex items-center gap-2"
              >
                <Home size={18} />
                Back to Site
              </a>
              <button
                onClick={() => {
                  localStorage.removeItem('adminToken');
                  window.location.href = '/admin/login';
                }}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-500 bg-orange-50'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'projects' && <ProjectManagement />}
        {activeTab === 'clients' && <ClientManagement />}
        {activeTab === 'contacts' && <ContactDetails />}
        {activeTab === 'newsletter' && <NewsletterSubscriptions />}
      </div>
    </div>
  );
};

export default AdminPanel;
