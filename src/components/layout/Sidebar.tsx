import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Folder, User, Facebook, Twitter, Linkedin, Github, Globe, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useUI } from '../../contexts/UIContext';
import Button from '../ui/Button';
import classNames from 'classnames';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { sidebarOpen, toggleSidebar } = useUI();

  const navigation = [
    { name: 'Overview', href: '/app/overview', icon: Home },
    { name: 'Projects', href: '/app/projects', icon: Folder },
    { name: 'Profile', href: '/app/profile', icon: User },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: user?.socialLinks?.facebook },
    { name: 'Twitter', icon: Twitter, url: user?.socialLinks?.twitter },
    { name: 'LinkedIn', icon: Linkedin, url: user?.socialLinks?.linkedin },
    { name: 'GitHub', icon: Github, url: user?.socialLinks?.github },
    { name: 'Website', icon: Globe, url: user?.socialLinks?.website },
  ].filter(link => link.url);

  const SidebarContent = () => (
    <>
      {/* Navigation */}
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200',
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                )}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    toggleSidebar();
                  }
                }}
              >
                <item.icon
                  className={classNames(
                    'mr-3 flex-shrink-0 h-5 w-5',
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Social Links */}
      {socialLinks.length > 0 && (
        <div className="mt-8 px-2">
          <h3 className="px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Social Media
          </h3>
          <div className="mt-2 space-y-1">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200"
              >
                <link.icon className="mr-3 flex-shrink-0 h-4 w-4 text-gray-400 group-hover:text-gray-500" />
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Mobile sidebar */}
      <div className={classNames(
        'fixed inset-0 flex z-40 lg:hidden transition-all duration-300 ease-in-out',
        sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      )}>
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleSidebar} />
        <div className={classNames(
          'relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
            >
              <X className="h-6 w-6 text-white" />
            </Button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <SidebarContent />
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className={classNames(
        'hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 transition-all duration-300 ease-in-out',
        sidebarOpen ? 'lg:translate-x-0' : 'lg:-translate-x-full'
      )}>
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <SidebarContent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;