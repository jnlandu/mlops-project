/**
 * Input component with validation and error states
 */

import React from 'react';

const Input = ({
  value,
  onChange,
  placeholder = '',
  disabled = false,
  error = '',
  type = 'text',
  className = '',
  label = '',
  required = false,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const inputClasses = [
    'form-control',
    error ? 'is-invalid' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}
      
      <input
        id={inputId}
        type={type}
        className={inputClasses}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        {...props}
      />
      
      {error && (
        <div className="invalid-feedback">
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
