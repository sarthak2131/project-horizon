import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  Check,
  Phone,
  Mail,
  MapPin,
  Code
} from 'lucide-react';

const LandingFooter = ({ scrollToSection }) => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <img
              alt="Real Estate Logo"
              className="h-10 w-auto mb-4 filter brightness-0 invert"
              src="https://res.cloudinary.com/sarthak-bad/image/upload/v1765287828/platform-images/logo.png"
            />
            <p className="text-gray-400 leading-relaxed mb-4">
              Your trusted partner in real estate. We help you find the perfect property and make
              informed decisions.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'services', label: 'Services' },
                { id: 'portfolio', label: 'Portfolio' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-2"
                  >
                    <ArrowRight size={16} />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Services</h4>
            <ul className="space-y-2">
              {['Property Buying', 'Property Selling', 'Investment Consulting', 'Design Services'].map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-2">
                    <Check size={16} className="text-orange-500" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Contact Info</h4>
            <div className="space-y-3 text-gray-400">
              <p className="flex items-center gap-2">
                <Phone size={18} className="text-orange-500" />
                +1 (555) 123-4567
              </p>
              <p className="flex items-center gap-2">
                <Mail size={18} className="text-orange-500" />
                info@realestate.com
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={18} className="text-orange-500 mt-1" />
                <span>
                  123 Real Estate Ave
                  <br />
                  City, State 12345
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Real Estate. All rights reserved.
          </p>
       
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;

