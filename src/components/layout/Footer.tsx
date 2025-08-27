import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 TechCorp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;