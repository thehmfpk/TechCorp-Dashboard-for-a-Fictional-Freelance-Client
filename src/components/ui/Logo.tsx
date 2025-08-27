import React from 'react';
import { Zap } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', showText = true, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`${sizeClasses[size]} rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center`}>
        <Zap className={`${size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-6 w-6'} text-white`} />
      </div>
      {showText && (
        <span className={`font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${textSizeClasses[size]}`}>
          TechCorp
        </span>
      )}
    </div>
  );
};

export default Logo;