import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import { UserPlus, CheckCircle, AlertCircle, Loader2, Users, Trash2 } from 'lucide-react';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    description: '',
    image: null
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await api.get('/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({
        ...formData,
        image: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('designation', formData.designation);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('image', formData.image);

      await api.post('/clients', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage({ type: 'success', text: 'Client added successfully!' });
      setFormData({ name: '', designation: '', description: '', image: null });
      document.getElementById('client-image-input').value = '';
      fetchClients();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Failed to add client. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this client?')) {
      return;
    }

    try {
      await api.delete(`/clients/${id}`);
      setMessage({ type: 'success', text: 'Client deleted successfully!' });
      fetchClients();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to delete client. Please try again.' 
      });
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Client Management</h2>
        <div className="w-20 h-1 bg-orange-500"></div>
      </div>

      {/* Add Client Form */}
      <div className="bg-white p-8 rounded-2xl shadow-lg mb-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <UserPlus className="text-orange-500" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Add New Client</h3>
        </div>
        
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-800 font-semibold mb-2">Client Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter client name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-2">Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
                placeholder="e.g., CEO, Web Developer, Designer"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-2">Client Image</label>
              <input
                id="client-image-input"
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-50 file:text-orange-600 file:font-medium hover:file:bg-orange-100"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-800 font-semibold mb-2">Testimonial / Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Enter client testimonial or description"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Adding Client...
              </>
            ) : (
              <>
                <UserPlus size={20} />
                Add Client
              </>
            )}
          </button>
        </form>
      </div>

      {/* Clients List */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Existing Clients</h3>
        </div>
        
        {clients.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-gray-400" size={48} />
            </div>
            <p className="text-gray-600 text-lg">No clients added yet.</p>
            <p className="text-gray-500 text-sm mt-2">Add your first client testimonial using the form above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {clients.map((client) => (
              <div 
                key={client._id} 
                className="group flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-xl p-3 hover:shadow-md hover:border-gray-300 transition-all duration-200"
              >
                {/* Client Image - Circular */}
                <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-full bg-white shadow-sm">
                  <img
                    src={
                      client.image?.startsWith('http')
                        ? client.image
                        : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${client.image}`
                    }
                    alt={client.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/64x64?text=Client';
                    }}
                  />
                </div>

                {/* Client Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-base mb-0.5 text-gray-900">
                    {client.name}
                  </h4>
                  <p className="text-teal-600 text-xs font-medium mb-1">
                    {client.designation}
                  </p>
                  <p className="text-gray-600 text-sm leading-snug">
                    {client.description}
                  </p>
                </div>

                {/* Delete Button */}
                <div className="flex-shrink-0">
                  <button
                    onClick={() => handleDelete(client._id)}
                    className="bg-red-500 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-red-600 transition-colors shadow-sm flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientManagement;
