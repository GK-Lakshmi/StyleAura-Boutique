
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, ShoppingCart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { mockProducts } from '@/data/mockData';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      navigate(`/products/category/all?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowSearchResults(false);
    }
  };
  
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length > 2) {
      // Filter products based on search query
      const results = mockProducts
        .filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5);
      
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sarees', path: '/products/category/sarees' },
    { name: 'Kurtis', path: '/products/category/kurtis' },
    { name: 'Gowns', path: '/products/category/gowns' },
    { name: 'Lehengas', path: '/products/category/lehengas' },
    { name: 'Indo-Western', path: '/products/category/indo-western' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      <div className="aura-container py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link 
                key={index} 
                to={link.path}
                className="text-aura-dark-charcoal hover:text-aura-purple transition-colors duration-200 font-medium link-effect"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* Search, Cart, User Icons */}
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block" ref={searchRef}>
              <form onSubmit={handleSearch} className="flex items-center relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-4 pr-10 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-aura-purple focus:border-aura-purple text-sm"
                  value={searchQuery}
                  onChange={handleSearchInput}
                />
                <button type="submit" className="absolute right-3">
                  <Search className="h-4 w-4 text-gray-400" />
                </button>
              </form>
              
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {searchResults.map(product => (
                    <Link
                      key={product.id}
                      to={`/products/${product.id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setSearchQuery('');
                        setShowSearchResults(false);
                      }}
                    >
                      <div className="flex items-center">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="h-8 w-8 object-cover rounded mr-2"
                        />
                        <div>
                          {product.name}
                          <span className="block text-xs text-gray-500 capitalize">
                            {product.category}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                  <div 
                    className="px-4 py-2 text-xs text-center text-aura-purple border-t border-gray-200 hover:bg-gray-50 cursor-pointer"
                    onClick={handleSearch}
                  >
                    Show all results for "{searchQuery}"
                  </div>
                </div>
              )}
            </div>

            <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-aura-purple rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="bg-aura-purple text-white hover:bg-aura-dark-purple transition-colors h-8 w-8">
                    <AvatarFallback>
                      {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist">Wishlist</Link>
                  </DropdownMenuItem>
                  {user.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <User className="h-4 w-4 mr-1" />
                  Login
                </Button>
              </Link>
            )}
            
            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-2">
          <div className="aura-container space-y-1 flex flex-col">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="px-3 py-2 hover:bg-gray-50 text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <form onSubmit={handleSearch} className="mt-2 flex items-center relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-aura-purple focus:border-aura-purple text-sm"
                value={searchQuery}
                onChange={handleSearchInput}
              />
              <button type="submit" className="absolute right-3">
                <Search className="h-4 w-4 text-gray-400" />
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
