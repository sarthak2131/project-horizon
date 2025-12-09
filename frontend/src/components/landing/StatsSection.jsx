import React from 'react';
import { Home, Calendar, TrendingUp } from 'lucide-react';

const StatsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About Us</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-8" />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            With over a decade of experience in the real estate industry, we&apos;ve built our reputation on
            trust, expertise, and exceptional service. Our team of dedicated professionals is committed
            to helping you navigate the complex world of real estate with confidence and ease.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-2xl hover:bg-orange-50 transition-all group">
            <div className="text-5xl font-bold text-orange-500 mb-3 group-hover:scale-110 transition-transform">500+</div>
            <div className="text-gray-700 font-medium text-lg mb-4">Properties Sold</div>
            <Home className="text-orange-200 mx-auto" size={40} />
          </div>

          <div className="p-6 rounded-2xl hover:bg-orange-50 transition-all group">
            <div className="text-5xl font-bold text-orange-500 mb-3 group-hover:scale-110 transition-transform">15+</div>
            <div className="text-gray-700 font-medium text-lg mb-4">Years Experience</div>
            <Calendar className="text-orange-200 mx-auto" size={40} />
          </div>

          <div className="p-6 rounded-2xl hover:bg-orange-50 transition-all group">
            <div className="text-5xl font-bold text-orange-500 mb-3 group-hover:scale-110 transition-transform">98%</div>
            <div className="text-gray-700 font-medium text-lg mb-4">Client Satisfaction</div>
            <TrendingUp className="text-orange-200 mx-auto" size={40} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

