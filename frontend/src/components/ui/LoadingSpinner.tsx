/**
 * Loading spinner component
 */

import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  variant = 'primary',
  text = '',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg',
  };

  const variantClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    danger: 'text-danger',
    warning: 'text-warning',
    info: 'text-info',
    light: 'text-light',
    dark: 'text-dark',
  };

  const spinnerClasses = [
    'spinner-border',
    sizeClasses[size],
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div
        className={spinnerClasses}
        role="status"
        aria-hidden="true"
      />
      {text && (
        <span className="ms-2">{text}</span>
      )}
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
