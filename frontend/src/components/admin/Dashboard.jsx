import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';
import { 
  Building, 
  Users, 
  Mail, 
  Bell, 
  PlusCircle, 
  UserPlus, 
  MessageSquare, 
  Send,
  Zap,
  Clock,
  Settings,
  ChevronRight
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    contacts: 0,
    newsletters: 0
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentClients, setRecentClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [projectsRes, clientsRes, contactsRes, newslettersRes] = await Promise.all([
        api.get('/projects'),
        api.get('/clients'),
        api.get('/contact'),
        api.get('/newsletter')
      ]);

      setStats({
        projects: projectsRes.data.length || 0,
        clients: clientsRes.data.length || 0,
        contacts: contactsRes.data.length || 0,
        newsletters: newslettersRes.data.length || 0
      });
      
      // Get recent 3 projects and clients
      setRecentProjects(projectsRes.data.slice(0, 3));
      setRecentClients(clientsRes.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: Building,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      description: 'Active projects'
    },
    {
      title: 'Total Clients',
      value: stats.clients,
      icon: Users,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      description: 'Happy clients'
    },
    {
      title: 'Contact Messages',
      value: stats.contacts,
      icon: Mail,
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      textColor: 'text-green-600',
      description: 'Pending messages'
    },
    {
      title: 'Newsletter Subscribers',
      value: stats.newsletters,
      icon: Bell,
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      description: 'Active subscribers'
    }
  ];

  const quickActions = [
    {
      title: 'Add Project',
      description: 'Create a new project',
      icon: PlusCircle,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      path: '/admin/projects'
    },
    {
      title: 'Add Client',
      description: 'Add client testimonial',
      icon: UserPlus,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      path: '/admin/clients'
    },
    {
      title: 'View Messages',
      description: 'Check contact messages',
      icon: MessageSquare,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      path: '/admin/contacts'
    },
    {
      title: 'Subscribers',
      description: 'Manage newsletter list',
      icon: Send,
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      path: '/admin/newsletter'
    }
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <div className="w-20 h-1 bg-orange-500"></div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-14 h-14 ${stat.lightColor} rounded-xl flex items-center justify-center`}>
                <stat.icon className={stat.textColor} size={28} />
              </div>
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-8 w-16 bg-gray-200 rounded"></div>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-800">{stat.value}</span>
              )}
            </div>
            <h3 className="text-gray-800 font-semibold text-lg mb-1">{stat.title}</h3>
            <p className="text-gray-500 text-sm">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <Clock className="text-orange-500" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Recent Activity</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Building className="text-orange-500" size={20} />
              Recent Projects
            </h3>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse flex gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recentProjects.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Building className="mx-auto text-gray-300 mb-2" size={40} />
                <p className="text-gray-500 text-sm">No projects yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentProjects.map((project) => (
                  <div
                    key={project._id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                  >
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
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                        {project.name}
                      </h4>
                      <p className="text-gray-600 text-xs line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Clients */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Users className="text-orange-500" size={20} />
              Recent Clients
            </h3>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse flex gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recentClients.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Users className="mx-auto text-gray-300 mb-2" size={40} />
                <p className="text-gray-500 text-sm">No clients yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentClients.map((client) => (
                  <div
                    key={client._id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                  >
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
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5 truncate">
                        {client.name}
                      </h4>
                      <p className="text-teal-600 text-xs font-medium mb-1">
                        {client.designation}
                      </p>
                      <p className="text-gray-600 text-xs line-clamp-1">
                        {client.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
