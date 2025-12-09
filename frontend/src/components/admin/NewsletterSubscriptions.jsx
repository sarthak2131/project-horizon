import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import { Bell, Loader2, Mail, Clock, CheckCircle, Calendar } from 'lucide-react';

const NewsletterSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await api.get('/newsletter');
      setSubscriptions(response.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Newsletter Subscriptions</h2>
          <div className="w-20 h-1 bg-orange-500"></div>
        </div>
        <div className="bg-white p-12 rounded-2xl shadow-lg text-center border border-gray-100">
          <Loader2 className="text-orange-500 animate-spin mx-auto mb-4" size={48} />
          <p className="text-gray-600 text-lg">Loading subscriptions...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Newsletter Subscriptions</h2>
        <div className="w-20 h-1 bg-orange-500"></div>
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <Bell className="text-orange-500" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">All Newsletter Subscribers</h3>
            <p className="text-gray-600 text-sm">Total: {subscriptions.length} subscribers</p>
          </div>
        </div>

        {subscriptions.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="text-gray-400" size={48} />
            </div>
            <p className="text-gray-600 text-lg">No newsletter subscriptions yet.</p>
            <p className="text-gray-500 text-sm mt-2">Newsletter subscribers will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Mail size={14} />
                      Email Address
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      Subscribed At
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscriptions.map((subscription) => (
                  <tr key={subscription._id} className="hover:bg-orange-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                          <Mail className="text-orange-500" size={18} />
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{subscription.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="text-gray-400" size={16} />
                        {new Date(subscription.createdAt).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        <CheckCircle className="mr-1" size={14} />
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterSubscriptions;
