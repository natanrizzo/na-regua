
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as authApi from '../api/auth';
import { jwtDecode } from 'jwt-decode';

type Role = 'Administrator' | 'Barber' | 'Client';
interface User{
  sub: number;
  name: string;
  role: Role;
}
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name:string, email: string, password: string)=> Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User|null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setupSession = (token: string) =>{
    const decodedToken = jwtDecode<User>(token);
    setUser(decodedToken);
    setIsAuthenticated(true);
  }
  useEffect(() => {
    const bootstrapApp = async () => {
      const token = await authApi.bootstrapAuth();
      if (token) {
        setupSession(token);
      }
      setIsLoading(false);
    };
    bootstrapApp();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await authApi.login(email, password);
      setupSession(response.accessToken);
    } catch (error) {
      console.error('Falha no login (Context):', error);
      throw error;
    }
  };

  const handleLogout = async () => {
    await authApi.logout();
    setIsAuthenticated(false);
    setUser(null);
  };
  const handleRegister = async(name: string, email: string, password: string) =>{
    try{
      await authApi.register(name, email, password);
      setIsAuthenticated(true);
    }
    catch(err){
      console.error('Register failed: ', err)
      throw err;
    }

  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login: handleLogin, logout: handleLogout, register: handleRegister, user }}>
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