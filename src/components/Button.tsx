import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = "w-full py-2 rounded-lg transition-colors font-medium disabled:opacity-50";
  const variants = {
    primary: "bg-[#FF7E39] text-white hover:bg-[#ff6a1f]",
    secondary: "bg-[#48C9A9] text-white hover:bg-[#3ab192]"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'Carregando...' : children}
    </button>
  );
}