
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as authApi from '../api/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  const bootstrapApp = async () => {
    const token = await authApi.bootstrapAuth();
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  };
  bootstrapApp();
}, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      await authApi.login(email, password);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Falha no login (Context):', error);
      throw error;
    }
  };

  const handleLogout = async () => {
    await authApi.logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};