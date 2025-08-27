import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthState } from '../types';
import { MOCK_USERS } from '../utils/mockData';
import { storage, STORAGE_KEYS } from '../utils/storage';

const AuthContext = createContext<AuthState | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = storage.get(STORAGE_KEYS.USER_DATA);
    const authToken = storage.get(STORAGE_KEYS.AUTH_TOKEN);
    
    if (savedUser && authToken) {
      setUser(savedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      setIsAuthenticated(true);
      storage.set(STORAGE_KEYS.USER_DATA, userWithoutPassword);
      storage.set(STORAGE_KEYS.AUTH_TOKEN, 'mock-token-' + foundUser.id);
      return true;
    }
    
    return false;
  };

  const signup = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    const existingUser = MOCK_USERS.find(u => u.email === userData.email);
    if (existingUser) {
      return false;
    }

    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
    };

    MOCK_USERS.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword as User);
    setIsAuthenticated(true);
    storage.set(STORAGE_KEYS.USER_DATA, userWithoutPassword);
    storage.set(STORAGE_KEYS.AUTH_TOKEN, 'mock-token-' + newUser.id);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    storage.clear();
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      storage.set(STORAGE_KEYS.USER_DATA, updatedUser);
      
      // Update in MOCK_USERS array
      const userIndex = MOCK_USERS.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], ...updates };
      }
    }
  };

  const value: AuthState = {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};