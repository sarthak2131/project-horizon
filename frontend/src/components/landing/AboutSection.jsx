import React from 'react';
import { ArrowRight } from 'lucide-react';

const AboutSection = ({ scrollToSection }) => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2">
            <div className="mb-6">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Not Your Average Realtor</h2>
              <div className="w-20 h-1 bg-orange-500"></div>
            </div>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We&apos;re not just real estate agents - we&apos;re your partners in making informed property
              decisions. With years of experience and a deep understanding of the market, we provide
              comprehensive services that go beyond traditional real estate.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our team combines market expertise with innovative marketing strategies and personalized
              consultation to deliver exceptional results for every client.
            </p>

            <button
              onClick={() => scrollToSection('services')}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all hover:shadow-lg transform hover:-translate-y-1 whitespace-nowrap cursor-pointer flex items-center gap-2"
            >
              <ArrowRight size={20} />
              Learn More About Us
            </button>
          </div>

          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="w-full h-48 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <img
                      alt="Real Estate Consultation"
                      className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-300"
                      src="https://res.cloudinary.com/sarthak-bad/image/upload/v1765290133/platform-images/1dcbedc8bbe99eb0bc3e5f5c27b80cc0_e29cp0.jpg"
                    />
                  </div>
                  <div className="w-full h-32 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <img
                      alt="Team Meeting"
                      className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-300"
                      src="https://res.cloudinary.com/sarthak-bad/image/upload/v1765290280/platform-images/fa1a0281b2128340fb55f6fdfb5e852a_l0uxp7.jpg"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="w-full h-32 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <img
                      alt="Happy Clients"
                      className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-300"
                      src="https://res.cloudinary.com/sarthak-bad/image/upload/v1765290335/platform-images/03296c2761225688febf9e608edad32c_f4nemc.jpg"
                    />
                  </div>
                  <div className="w-full h-48 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <img
                      alt="Office Interior"
                      className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-300"
                      src="https://res.cloudinary.com/sarthak-bad/image/upload/v1765290390/platform-images/b8a609ed51b4a56e7a181eca021a460e_3_v2ssnm.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

