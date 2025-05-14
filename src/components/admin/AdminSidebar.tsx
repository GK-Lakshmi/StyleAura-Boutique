
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Package, Bell, Settings, LogOut, User } from 'lucide-react';
import Logo from '../Logo';
import { useAuth } from '@/contexts/AuthContext';

interface AdminSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/admin' },
    { icon: ShoppingBag, label: 'Products', path: '/admin/products' },
    { icon: Package, label: 'Orders', path: '/admin/orders' },
    { icon: Bell, label: 'Announcements', path: '/admin/announcements' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
    { icon: User, label: 'My Profile', path: '/admin/profile' },
  ];

  // Helper function to determine if a menu item is active
  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`bg-white h-full overflow-y-auto shadow-md transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo */}
      <div className={`py-6 flex ${isOpen ? 'px-6 justify-start' : 'justify-center'}`}>
        {isOpen ? (
          <Logo />
        ) : (
          <div className="text-aura-dark-purple font-bold text-xl">SA</div>
        )}
      </div>

      {/* Menu Items */}
      <div className="px-3 py-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 mb-1 transition-colors ${
              isActive(item.path)
                ? 'bg-aura-purple text-white rounded-lg'
                : 'text-gray-600 hover:bg-aura-light-purple/20 hover:text-aura-dark-purple rounded-lg'
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {isOpen && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-3 mb-1 text-gray-600 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          {isOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>

      {/* Admin Info */}
      {isOpen && (
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="border-t pt-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-aura-purple text-white flex items-center justify-center font-medium">
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'admin@styleaura.com'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default AdminSidebar;
