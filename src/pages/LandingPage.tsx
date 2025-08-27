import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';

const LandingPage: React.FC = () => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Logo size="lg" className="scale-150" />
        </div>
        
        {/* Welcome message */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            TechCorp
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed">
          Empowering innovation through cutting-edge technology solutions and seamless project management.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/auth/login">
            <Button size="lg" className="w-full sm:w-auto px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
              Login
            </Button>
          </Link>
          
          <Link to="/auth/signup">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Sign Up
            </Button>
          </Link>
        </div>
        
        {/* Features preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Analytics</h3>
            <p className="text-gray-300 text-sm">Real-time insights and performance tracking</p>
          </div>
          
          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Projects</h3>
            <p className="text-gray-300 text-sm">Comprehensive project management tools</p>
          </div>
          
          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Collaboration</h3>
            <p className="text-gray-300 text-sm">Seamless team collaboration features</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;