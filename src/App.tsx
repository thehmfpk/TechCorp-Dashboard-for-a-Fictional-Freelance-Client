import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { UIProvider } from './contexts/UIContext';
import { DataProvider } from './contexts/DataContext';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <AuthProvider>
      <UIProvider>
        <DataProvider>
          <AppRouter />
        </DataProvider>
      </UIProvider>
    </AuthProvider>
  );
}

export default App;