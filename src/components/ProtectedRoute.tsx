
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute user:', user);

  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // If not authenticated, redirect to login with return URL
  if (!user) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  // If authenticated, render the children or the Outlet
  return <>{children || <></>}</>;
};

export default ProtectedRoute;
