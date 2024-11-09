import React, { forwardRef, InputHTMLAttributes } from 'react';
import InputMask from 'react-input-mask';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  mask?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, mask, error, className = '', ...props }, ref) => {
    const inputClassName = `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#48C9A9] focus:border-transparent ${
      error ? 'border-red-500' : 'border-gray-300'
    } ${className}`;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        {mask ? (
          <InputMask
            mask={mask}
            className={inputClassName}
            {...props}
          >
            <input ref={ref} />
          </InputMask>
        ) : (
          <input ref={ref} className={inputClassName} {...props} />
        )}
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';