
import React, { createContext, useContext, useState, useEffect } from 'react';
import { simulateAuth } from '../services/api';

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
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
  const auth = simulateAuth();
  const [user, setUser] = useState<User | null>(auth.user);
  
  useEffect(() => {
    // Check localStorage for user data on mount
    const storedUser = localStorage.getItem('campus_hub_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);
  
  // Login function
  const login = async (email: string, password: string, role: 'student' | 'faculty') => {
    setIsLoading(true);
    try {
      const success = await auth.login(email, password, role);
      if (success) {
        // Re-check user after login
        const storedUser = localStorage.getItem('campus_hub_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
      return success;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      await auth.logout();
      setUser(null);
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
