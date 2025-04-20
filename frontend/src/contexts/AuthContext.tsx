import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'mentor' | 'student' | 'hybrid';
  points: number;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  register: (userData: any, role: string) => Promise<void>;
  logout: () => void;
  connectWallet: () => Promise<void>;
  walletConnected: boolean;
  walletAddress: string | null;
}

const initialAuthContext: AuthContextType = {
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  connectWallet: async () => {},
  walletConnected: false,
  walletAddress: null,
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Mock login function - would be replaced with actual API call
  const login = async (email: string, password: string, role: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (!email || !password) {
        throw new Error('Please enter both email and password');
      }
      
      // Mock successful login with fake user data
      const mockUser: User = {
        id: '123456',
        name: email.split('@')[0],
        email,
        role: role as 'mentor' | 'student' | 'hybrid',
        points: 100,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      };
      
      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Mock register function - would be replaced with actual API call
  const register = async (userData: any, role: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (!userData.email || !userData.password) {
        throw new Error('Please fill in all required fields');
      }
      
      // Mock successful registration with fake user data
      const mockUser: User = {
        id: '123456',
        name: userData.name || userData.email.split('@')[0],
        email: userData.email,
        role: role as 'mentor' | 'student' | 'hybrid',
        points: 0,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
      };
      
      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Mock wallet connection
  const connectWallet = async () => {
    setLoading(true);
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockAddress = '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
      setWalletConnected(true);
      setWalletAddress(mockAddress);
    } catch (err) {
      setError('Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    connectWallet,
    walletConnected,
    walletAddress,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};