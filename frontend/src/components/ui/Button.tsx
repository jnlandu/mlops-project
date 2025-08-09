/**
 * Button component with various styles and states
 */

import React from 'react';
import { ButtonProps } from '../../types';

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  loading = false,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseClasses = 'btn d-inline-flex align-items-center justify-content-center';
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    danger: 'btn-danger',
    warning: 'btn-warning',
    info: 'btn-info',
  } as const;

  const sizeClasses = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  } as const;

  const buttonClasses = [
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span
          className="spinner-border spinner-border-sm me-2"
          role="status"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
};

export default Button;
