import React from 'react';
import { Home, TrendingUp, Headphones } from 'lucide-react';

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center group p-6 rounded-2xl hover:bg-gray-50 transition-all">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500 transition-all transform group-hover:scale-110">
              <Home className="text-orange-500 group-hover:text-white transition-colors" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-orange-500 transition-colors">Personalized Service</h3>
            <p className="text-gray-600 leading-relaxed">
              We take the time to understand your unique needs and preferences, providing tailored
              solutions that match your lifestyle and budget perfectly.
            </p>
          </div>

          <div className="text-center group p-6 rounded-2xl hover:bg-gray-50 transition-all">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500 transition-all transform group-hover:scale-110">
              <TrendingUp className="text-orange-500 group-hover:text-white transition-colors" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-orange-500 transition-colors">Market Expertise</h3>
            <p className="text-gray-600 leading-relaxed">
              Our deep knowledge of local market trends and property values ensures you make informed
              decisions and get the best possible outcomes.
            </p>
          </div>

          <div className="text-center group p-6 rounded-2xl hover:bg-gray-50 transition-all">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500 transition-all transform group-hover:scale-110">
              <Headphones className="text-orange-500 group-hover:text-white transition-colors" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-orange-500 transition-colors">24/7 Support</h3>
            <p className="text-gray-600 leading-relaxed">
              We&apos;re always available to answer your questions and provide support throughout your
              real estate journey, ensuring peace of mind every step of the way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

