import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Pages
import LandingPage from '../pages/LandingPage';
import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';
import Overview from '../pages/Overview';
import Projects from '../pages/Projects';
import Profile from '../pages/Profile';

// Layout
import DashboardLayout from '../components/layout/DashboardLayout';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? <Navigate to="/app/overview" replace /> : <LandingPage />
          } 
        />
        <Route 
          path="/auth/login" 
          element={
            isAuthenticated ? <Navigate to="/app/overview" replace /> : <Login />
          } 
        />
        <Route 
          path="/auth/signup" 
          element={
            isAuthenticated ? <Navigate to="/app/overview" replace /> : <SignUp />
          } 
        />

        {/* Protected Routes */}
        <Route path="/app" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="projects" element={<Projects />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;