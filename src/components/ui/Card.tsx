import React from 'react';
import classNames from 'classnames';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  padding = 'md'
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  return (
    <div className={classNames(
      'bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200',
      {
        'hover:shadow-md hover:scale-[1.02]': hover,
      },
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  );
};

export default Card;