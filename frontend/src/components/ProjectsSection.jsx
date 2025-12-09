import React from 'react';
import { Building, Loader2, FolderOpen, ArrowRight } from 'lucide-react';

const ProjectsSection = ({ projects, loading }) => {
  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
              <Building className="text-orange-500" size={28} />
            </div>
            <h2 className="text-4xl font-bold text-gray-800">Our Projects</h2>
          </div>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-4" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take a look at some of our recent successful projects and see how we've helped clients
            achieve their real estate goals.
          </p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="inline-block animate-spin text-orange-500" size={48} />
            <p className="text-gray-600 mt-4">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <FolderOpen className="mx-auto text-gray-400 mb-4" size={64} />
            <p className="text-gray-600 text-lg">No projects available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project._id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100">
                <div className="relative overflow-hidden">
                  <div className="w-full h-56">
                    <img
                      src={
                        project.image?.startsWith('http')
                          ? project.image
                          : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${project.image}`
                      }
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/450x350?text=Project+Image';
                      }}
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                      Project
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                  <button className="text-orange-500 font-semibold hover:text-orange-600 transition-colors flex items-center gap-2 group-hover:gap-3">
                    Read More
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;