
import React, { useState, useEffect, useRef } from 'react';
import { Menu, Bell, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { mockProducts, mockOrders } from '@/data/mockData';

interface Notification {
  id: number;
  text: string;
  time: string;
  read: boolean;
}

const AdminHeader = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Mock notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, text: "New order received", time: "5 minutes ago", read: false },
    { id: 2, text: "Product inventory low", time: "2 hours ago", read: false },
    { id: 3, text: "Customer support request", time: "Yesterday", read: true },
    { id: 4, text: "Weekly sales report ready", time: "3 days ago", read: true },
  ]);
  
  useEffect(() => {
    // Click outside search results to close
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Search function
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length > 2) {
      // Search in products
      const productResults = mockProducts
        .filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
        )
        .map(product => ({
          id: product.id,
          name: product.name,
          type: 'product',
          url: `/admin/products/${product.id}`
        }));
      
      // Search in orders
      const orderResults = mockOrders
        .filter(order => 
          order.id.toLowerCase().includes(query.toLowerCase()) ||
          order.status.toLowerCase().includes(query.toLowerCase())
        )
        .map(order => ({
          id: order.id,
          name: `Order #${order.id}`,
          type: 'order',
          url: `/admin/orders/${order.id}`
        }));
      
      setSearchResults([...productResults, ...orderResults].slice(0, 5));
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    toast({
      title: "Notifications cleared",
      description: "All notifications marked as read"
    });
  };
  
  const navigateToSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/admin/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowSearchResults(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigateToSearch();
    }
  };
  
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="mr-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="hidden md:block">
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden md:block" ref={searchRef}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-aura-purple focus:border-aura-purple sm:text-sm"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
              />
              {searchQuery && (
                <button 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchResults([]);
                    setShowSearchResults(false);
                  }}
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              )}
              
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {searchResults.map(result => (
                    <Link
                      key={result.id}
                      to={result.url}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setSearchQuery('');
                        setShowSearchResults(false);
                      }}
                    >
                      {result.name}
                      <span className="ml-2 text-xs text-gray-500 capitalize">
                        {result.type}
                      </span>
                    </Link>
                  ))}
                  <div 
                    className="px-4 py-2 text-xs text-center text-aura-purple border-t border-gray-200 hover:bg-gray-50 cursor-pointer"
                    onClick={navigateToSearch}
                  >
                    Show all results
                  </div>
                </div>
              )}
            </div>
            
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative border-none"
                >
                  <Bell className="h-5 w-5 text-gray-500" />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex justify-between items-center">
                  <span>Notifications</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-auto py-0 px-2 text-xs"
                    onClick={markAllAsRead}
                  >
                    Mark all as read
                  </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length > 0 ? (
                  <>
                    {notifications.map((notification) => (
                      <DropdownMenuItem key={notification.id} className="p-3 cursor-pointer">
                        <div className="flex items-start">
                          <div className={`w-2 h-2 rounded-full mt-1.5 ${notification.read ? 'bg-gray-300' : 'bg-aura-purple'}`} />
                          <div className="ml-2 flex-1">
                            <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                              {notification.text}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="p-2 flex justify-center" asChild>
                      <Link to="/admin/notifications">
                        <Button variant="ghost" size="sm" className="w-full text-aura-purple hover:text-aura-dark-purple">
                          View All Notifications
                        </Button>
                      </Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <div className="py-4 text-center text-gray-500">No new notifications</div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* User Menu */}
            <Link to="/admin/profile" className="flex items-center">
              <Avatar className="h-8 w-8 bg-aura-purple text-white">
                <AvatarFallback>
                  {user?.name?.charAt(0).toUpperCase() || 'A'}
                </AvatarFallback>
              </Avatar>
              <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
                {user?.name || 'Admin User'}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
