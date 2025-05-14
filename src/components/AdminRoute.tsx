
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  console.log('AdminRoute user:', user);

  // If not authenticated or not an admin, redirect to login
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login?redirect=/admin" replace />;
  }

  // If admin, render the children
  return <>{children}</>;
};

export default AdminRoute;
