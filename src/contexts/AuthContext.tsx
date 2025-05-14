
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string, phone?: string, address?: string) => Promise<User>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<User>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('styleaura_user');
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('styleaura_user');
      }
    }
    
    setIsLoading(false);
  }, []);

  // Mock login function (will be replaced with actual API call)
  const login = async (email: string, password: string): Promise<User> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo login logic (in real app this would be an API call)
    let mockUser: User;
    
    if (email === 'admin@styleaura.com' && password === 'admin123') {
      mockUser = {
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@styleaura.com',
        role: 'admin',
        phone: '9876543210',
        address: 'StyleAura Office, Mumbai'
      };
    } else {
      mockUser = {
        id: 'user-' + Math.floor(Math.random() * 1000),
        name: email.split('@')[0],
        email,
        role: 'user'
      };
    }
    
    // Store user in localStorage
    localStorage.setItem('styleaura_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoading(false);
    
    return mockUser;
  };

  // Mock register function
  const register = async (
    name: string,
    email: string,
    password: string,
    phone?: string,
    address?: string
  ): Promise<User> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: 'user-' + Math.floor(Math.random() * 1000),
      name,
      email,
      role: 'user',
      phone,
      address
    };
    
    // Store user in localStorage
    localStorage.setItem('styleaura_user', JSON.stringify(newUser));
    setUser(newUser);
    setIsLoading(false);
    
    return newUser;
  };

  // Update profile function
  const updateProfile = async (data: Partial<User>): Promise<User> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update user data
    if (user) {
      const updatedUser = { ...user, ...data };
      localStorage.setItem('styleaura_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsLoading(false);
      return updatedUser;
    }
    
    setIsLoading(false);
    throw new Error('No user is currently logged in');
  };

  // Update password function
  const updatePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, just return success
    setIsLoading(false);
    return true;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('styleaura_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      register, 
      logout,
      updateProfile,
      updatePassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
