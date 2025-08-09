/**
 * Textarea component for multi-line input
 */

import React from 'react';

const Textarea = ({
  value,
  onChange,
  placeholder = '',
  disabled = false,
  error = '',
  className = '',
  label = '',
  required = false,
  rows = 3,
  maxLength,
  id,
  onKeyPress,
  ...props
}) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  const textareaClasses = [
    'form-control',
    error ? 'is-invalid' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleKeyPress = (e) => {
    if (onKeyPress) {
      onKeyPress(e);
    }
  };

  // Auto-resize based on content
  const calculatedRows = Math.min(10, Math.max(rows, Math.ceil(value.length / 100)));

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={textareaId} className="form-label">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}
      
      <textarea
        id={textareaId}
        className={textareaClasses}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={calculatedRows}
        maxLength={maxLength}
        onKeyPress={handleKeyPress}
        {...props}
      />
      
      <div className="d-flex justify-content-between">
        {error && (
          <div className="invalid-feedback d-block">
            {error}
          </div>
        )}
        
        {maxLength && (
          <small className="text-muted">
            {value.length}/{maxLength}
          </small>
        )}
      </div>
    </div>
  );
};

export default Textarea;
