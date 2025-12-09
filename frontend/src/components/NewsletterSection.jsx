import React, { useState } from 'react';
import api from '../config/api';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await api.post('/newsletter', { email });
      setMessage({ type: 'success', text: 'Successfully subscribed to newsletter! You will receive updates soon.' });
      setEmail('');
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Something went wrong. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-800 text-white relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            'url("https://res.cloudinary.com/sarthak-bad/image/upload/v1765290886/platform-images/88a79f1369958753f8a15ff0c65904ad_xtrmik.jpg")',
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
            <Mail className="text-white" size={28} />
          </div>
          <h2 className="text-4xl font-bold">
            Stay Updated with Our Latest Projects
          </h2>
        </div>
        <h3 className="text-2xl font-semibold mb-8 text-gray-300">
          Subscribe to our newsletter and never miss an update
        </h3>
        
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMessage({ type: '', text: '' });
              }}
              placeholder="Enter your email address"
              required
              className="flex-1 px-6 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors whitespace-nowrap cursor-pointer disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Mail className="animate-pulse" size={20} />
                  Subscribing...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Subscribe
                </>
              )}
            </button>
          </div>

          {message.text && (
            <div className={`p-4 rounded-lg mt-4 flex items-center gap-3 ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
              {message.text}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;