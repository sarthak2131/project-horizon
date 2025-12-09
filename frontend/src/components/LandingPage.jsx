import React, { useState, useEffect } from 'react';
import api from '../config/api';
import ProjectsSection from './ProjectsSection';
import ClientsSection from './ClientsSection';
import ContactForm from './ContactForm';
import NewsletterSection from './NewsletterSection';
import NavBar from './landing/NavBar';
import HeroSection from './landing/HeroSection';
import AboutSection from './landing/AboutSection';
import ServicesSection from './landing/ServicesSection';
import StatsSection from './landing/StatsSection';
import LandingFooter from './landing/LandingFooter';
import { ChevronUp } from 'lucide-react';

const RealEstateLandingPage = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    fetchData();
    
    // Navbar scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, clientsRes] = await Promise.all([
        api.get('/projects'),
        api.get('/clients')
      ]);
      setProjects(projectsRes.data);
      setClients(clientsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <NavBar scrolled={scrolled} scrollToSection={scrollToSection} />

      <HeroSection scrollToSection={scrollToSection} />

      <AboutSection scrollToSection={scrollToSection} />

      <ServicesSection />

      {/* Our Projects Section - Dynamic from Backend */}
      <div id="portfolio">
        <ProjectsSection projects={projects} loading={loading} />
      </div>

      <StatsSection />

      {/* Happy Clients Section */}
      <ClientsSection clients={clients} loading={loading} />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Contact Form */}
      <div id="contact">
        <ContactForm />
      </div>

      <LandingFooter scrollToSection={scrollToSection} />

      {/* Scroll to Top Button */}
      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-all hover:scale-110 z-40 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
};

export default RealEstateLandingPage;
