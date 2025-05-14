
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import ScrollToTop from '../ScrollToTop';
import { useToast } from '@/hooks/use-toast';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is an admin when this component mounts
    if (!user) {
      navigate('/login?redirect=/admin');
      return;
    }
    
    if (user.role !== 'admin') {
      toast({
        title: "Access Denied",
        description: "You do not have permission to access the admin area.",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [user, navigate, toast]);

  // Show loading state until we've checked auth
  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // If not an admin, the useEffect will handle redirect
  if (user.role !== 'admin') {
    return <div className="flex justify-center items-center h-screen">Not authorized</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <ScrollToTop />
      <AdminSidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
