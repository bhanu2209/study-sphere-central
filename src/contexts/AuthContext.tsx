
import React, { createContext, useContext, useState, useEffect } from 'react';
import { simulateAuth } from '../services/api';
import { toast } from 'sonner';

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  avatar?: string | null;
}

// Define context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: 'student' | 'faculty') => Promise<boolean>;
  logout: () => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Check localStorage for user data on mount
    const storedUser = localStorage.getItem('campus_hub_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('campus_hub_user');
      }
    }
    setIsLoading(false);
  }, []);
  
  // Login function
  const login = async (email: string, password: string, role: 'student' | 'faculty') => {
    setIsLoading(true);
    try {
      const auth = simulateAuth();
      const success = await auth.login(email, password, role);
      if (success) {
        // Get user from localStorage after login
        const storedUser = localStorage.getItem('campus_hub_user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          toast.success(`Welcome back, ${userData.name}!`);
        }
      }
      return success;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      const auth = simulateAuth();
      await auth.logout();
      setUser(null);
      toast.success('You have been logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Context value
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
