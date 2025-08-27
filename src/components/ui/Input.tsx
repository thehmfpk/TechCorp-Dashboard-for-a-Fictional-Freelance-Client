import React, { InputHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helper,
  icon,
  className,
  ...props
}, ref) => {
  const inputClasses = classNames(
    'block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-200',
    {
      'border-red-500 dark:border-red-400 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500/20 dark:focus:ring-red-400/20': error,
      'pl-10': icon,
    },
    className
  );

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
      </div>
      {(error || helper) && (
        <p className={classNames(
          'mt-1 text-xs',
          error ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
        )}>
          {error || helper}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;