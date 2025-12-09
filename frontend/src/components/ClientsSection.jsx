import React from 'react';
import { Users, Loader2, UserX, Quote } from 'lucide-react';

const ClientsSection = ({ clients, loading }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
              <Users className="text-orange-500" size={28} />
            </div>
            <h2 className="text-4xl font-bold text-gray-800">Happy Clients</h2>
          </div>
          <div className="w-20 h-1 bg-orange-500 mx-auto" />
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="inline-block animate-spin text-orange-500" size={48} />
            <p className="text-gray-600 mt-4">Loading clients...</p>
          </div>
        ) : clients.length === 0 ? (
          <div className="text-center py-12">
            <UserX className="mx-auto text-gray-400 mb-4" size={64} />
            <p className="text-gray-600 text-lg">No clients available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => (
              <div key={client._id} className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-orange-100">
                  <img
                    src={
                      client.image?.startsWith('http')
                        ? client.image
                        : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${client.image}`
                    }
                    alt={client.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200x200?text=Client';
                    }}
                  />
                </div>
                <div className="relative mb-4">
                  <Quote className="absolute -top-2 -left-2 text-orange-200" size={20} />
                  <p className="text-sm text-gray-600 leading-relaxed italic px-4">
                    &quot;{client.description}&quot;
                  </p>
                </div>
                
                <h4 className="font-bold text-gray-800 mb-1">{client.name}</h4>
                <p className="text-sm text-orange-500 font-medium">{client.designation}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientsSection;