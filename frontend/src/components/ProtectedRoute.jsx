import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';

// Guard admin routes using the backend auth check
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem('adminToken');

      if (!token) {
        navigate('/admin/login', { replace: true });
        return;
      }

      try {
        await api.get('/auth/check');
        setAuthorized(true);
      } catch (err) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login', { replace: true });
      } finally {
        setChecking(false);
      }
    };

    verify();
  }, [navigate]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700">
        Checking authentication...
      </div>
    );
  }

  return authorized ? children : null;
};

export default ProtectedRoute;


