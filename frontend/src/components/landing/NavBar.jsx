import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ scrolled, scrollToSection }) => {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              alt="Real Estate Logo"
              className="h-14 w-auto cursor-pointer"
              src="https://res.cloudinary.com/sarthak-bad/image/upload/v1765287828/platform-images/logo.png"
              onClick={() => scrollToSection('home')}
            />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {[
              { id: 'home', label: 'HOME' },
              { id: 'about', label: 'ABOUT US' },
              { id: 'services', label: 'OUR SERVICES' },
              { id: 'portfolio', label: 'PORTFOLIO' },
              { id: 'contact', label: 'CONTACT' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-medium transition-colors hover:text-orange-500 ${
                  scrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <Link
              to="/admin"
              className="ml-4 px-6 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-md"
            >
              ADMIN
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
