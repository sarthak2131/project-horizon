import React, { useState } from 'react';
import { Calendar, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../../config/api';

const HeroSection = ({ scrollToSection }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    city: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await api.post('/contact', formData);
      setMessage({ type: 'success', text: 'Thank you! We will contact you soon.' });
      setFormData({
        fullName: '',
        email: '',
        mobileNumber: '',
        city: ''
      });
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
    <section id="home" className="relative h-screen flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://res.cloudinary.com/sarthak-bad/image/upload/v1765288581/platform-images/e4bc7391f36a56e92b00d1b7e15e7e41_ejcjyq.jpg")',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40" />

      <div className="relative z-10 w-full px-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="w-full md:w-1/2">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fadeIn">
              Consultation,
              <br />
              Design,
              <br />
              &amp; Marketing
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Professional real estate services tailored to your needs. From consultation to closing,
              we&apos;re with you every step of the way.
            </p>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap cursor-pointer flex items-center gap-2"
            >
              <Calendar size={22} />
              Get Free Consultation
            </button>
          </div>

          <div className="hidden md:block w-1/3">
            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Mail className="text-orange-500" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Get In Touch</h3>
              </div>

              {message.text && (
                <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm ${
                  message.type === 'success' 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <input
                    placeholder="Full Name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition-all"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  <input
                    placeholder="Email Address"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition-all"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <input
                    placeholder="Mobile Number"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition-all"
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                  <input
                    placeholder="City"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition-all"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Mail className="animate-pulse" size={18} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
