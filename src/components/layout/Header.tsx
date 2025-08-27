import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, Moon, Sun, User, Edit, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useUI } from '../../contexts/UIContext';
import { useData } from '../../contexts/DataContext';
import { useSearch } from '../../hooks/useSearch';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import { formatRelativeTime } from '../../utils/formatters';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode, toggleSidebar } = useUI();
  const { projects, notifications, markNotificationAsRead, markAllNotificationsAsRead } = useData();
  const { searchQuery, setSearchQuery, searchResults, hasResults } = useSearch(projects);
  
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/app/projects?search=${encodeURIComponent(searchQuery)}`);
      setShowSearchResults(false);
    }
  };

  const handleNotificationClick = (notification: any) => {
    markNotificationAsRead(notification.id);
    if (notification.projectId) {
      navigate('/app/projects');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="lg:hidden"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <Link to="/app/overview" className="flex-shrink-0">
              <Logo size="md" />
            </Link>
          </div>

          {/* Center section - Search */}
          <div className="flex-1 max-w-lg mx-4 relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(e.target.value.length > 0);
                  }}
                  onFocus={() => setShowSearchResults(searchQuery.length > 0)}
                  placeholder="Search projects and tasks..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </form>

            {/* Search Results Dropdown */}
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                {hasResults ? (
                  <div className="py-2">
                    {searchResults.map((project) => (
                      <button
                        key={project.id}
                        onClick={() => {
                          navigate('/app/projects');
                          setShowSearchResults(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <div className="font-medium text-gray-900 dark:text-gray-100">{project.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{project.description}</div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-4 px-4 text-gray-500 dark:text-gray-400 text-sm">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Button>

              {showNotifications && (
                <div className="absolute right-0 top-full mt-1 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Notifications</h3>
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllNotificationsAsRead}
                        className="text-xs text-blue-600 dark:text-blue-400"
                      >
                        Mark all read
                      </Button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <button
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification)}
                          className={`w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                            !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="font-medium text-sm text-gray-900 dark:text-gray-100">
                                {notification.title}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {notification.message}
                              </div>
                            </div>
                            <div className="text-xs text-gray-400 dark:text-gray-500 ml-2">
                              {formatRelativeTime(notification.timestamp)}
                            </div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                        No notifications yet
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative" ref={profileRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  {user?.profilePicture ? (
                    <img src={user.profilePicture} alt="Profile" className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <User className="h-4 w-4 text-white" />
                  )}
                </div>
                <span className="hidden sm:block font-medium text-gray-700 dark:text-gray-300">
                  {user?.name}
                </span>
              </Button>

              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                  <div className="py-1">
                    <Link
                      to="/app/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                    </Link>
                    <Link
                      to="/app/profile?edit=true"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;