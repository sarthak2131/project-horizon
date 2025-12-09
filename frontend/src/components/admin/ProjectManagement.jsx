import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import { Plus, CheckCircle, AlertCircle, Loader2, PlusCircle, Building, Trash2 } from 'lucide-react';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
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
      formDataToSend.append('description', formData.description);
      formDataToSend.append('image', formData.image);

      await api.post('/projects', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage({ type: 'success', text: 'Project added successfully!' });
      setFormData({ name: '', description: '', image: null });
      document.getElementById('image-input').value = '';
      fetchProjects();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Failed to add project. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      await api.delete(`/projects/${id}`);
      setMessage({ type: 'success', text: 'Project deleted successfully!' });
      fetchProjects();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to delete project. Please try again.' 
      });
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Project Management</h2>
        <div className="w-20 h-1 bg-orange-500"></div>
      </div>

      {/* Add Project Form */}
      <div className="bg-white p-8 rounded-2xl shadow-lg mb-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <Plus className="text-orange-500" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Add New Project</h3>
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
              <label className="block text-gray-800 font-semibold mb-2">Project Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter project name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex flex-col justify-end">
              <label className="block text-gray-800 font-semibold mb-2">Project Image</label>
              <input
                id="image-input"
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-50 file:text-orange-600 file:font-medium hover:file:bg-orange-100 cursor-pointer"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-800 font-semibold mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Enter project description"
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
                Adding Project...
              </>
            ) : (
              <>
                <PlusCircle size={20} />
                Add Project
              </>
            )}
          </button>
        </form>
      </div>

      {/* Existing Projects */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Existing Projects</h3>
        </div>
        
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="text-gray-400" size={48} />
            </div>
            <p className="text-gray-600 text-lg">No projects added yet.</p>
            <p className="text-gray-500 text-sm mt-2">Add your first project using the form above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => (
              <div 
                key={project._id} 
                className="group flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-xl p-3 hover:shadow-md hover:border-gray-300 transition-all duration-200"
              >
                {/* Project Image */}
                <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-lg bg-white shadow-sm">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/64x64?text=Project';
                    }}
                  />
                </div>

                {/* Project Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-base mb-1 text-gray-900">
                    {project.name}
                  </h4>
                  <p className="text-gray-600 text-sm leading-snug">
                    {project.description}
                  </p>
                </div>

                {/* Delete Button */}
                <div className="flex-shrink-0">
                  <button
                    onClick={() => handleDelete(project._id)}
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

export default ProjectManagement;
