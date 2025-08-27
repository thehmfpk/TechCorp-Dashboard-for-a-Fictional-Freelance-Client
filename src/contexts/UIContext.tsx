import React, { createContext, useContext, useEffect, useState } from 'react';
import { UIState } from '../types';
import { storage, STORAGE_KEYS } from '../utils/storage';

const UIContext = createContext<UIState | undefined>(undefined);

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

interface UIProviderProps {
  children: React.ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const savedDarkMode = storage.get(STORAGE_KEYS.DARK_MODE);
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode);
    }

    // Check for mobile screen
    const checkMobile = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    storage.set(STORAGE_KEYS.DARK_MODE, newDarkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const value: UIState = {
    darkMode,
    sidebarOpen,
    toggleDarkMode,
    toggleSidebar,
  };

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};