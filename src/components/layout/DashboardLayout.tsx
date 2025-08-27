import React from 'react';
import { Outlet } from 'react-router-dom';
import { useUI } from '../../contexts/UIContext';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import classNames from 'classnames';

const DashboardLayout: React.FC = () => {
  const { sidebarOpen } = useUI();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <div className={classNames(
          'flex-1 flex flex-col transition-all duration-300 ease-in-out',
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
        )}>
          <main className="flex-1 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
          
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;