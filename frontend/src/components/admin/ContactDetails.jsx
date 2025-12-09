import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import { Mail, Loader2, User, Phone, MapPin, Calendar, CheckCircle } from 'lucide-react';

const ContactDetails = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await api.get('/contact');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Contact Form Submissions</h2>
          <div className="w-20 h-1 bg-orange-500"></div>
        </div>
        <div className="bg-white p-12 rounded-2xl shadow-lg text-center border border-gray-100">
          <Loader2 className="text-orange-500 animate-spin mx-auto mb-4" size={48} />
          <p className="text-gray-600 text-lg">Loading contact submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Contact Form Submissions</h2>
        <div className="w-20 h-1 bg-orange-500"></div>
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <Mail className="text-orange-500" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">All Contact Submissions</h3>
            <p className="text-gray-600 text-sm">Total: {contacts.length} submissions</p>
          </div>
        </div>

        {contacts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-gray-400" size={48} />
            </div>
            <p className="text-gray-600 text-lg">No contact form submissions yet.</p>
            <p className="text-gray-500 text-sm mt-2">Contact submissions will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Email Address
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Mobile Number
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    City
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Submitted At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-orange-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                          <User className="text-orange-500" size={18} />
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{contact.fullName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="text-gray-400" size={16} />
                        {contact.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Phone className="text-gray-400" size={16} />
                        {contact.mobileNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="text-gray-400" size={16} />
                        {contact.city}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="text-gray-400" size={16} />
                        {new Date(contact.createdAt).toLocaleString()}
                      </div>
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

export default ContactDetails;
