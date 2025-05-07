import React, { ButtonHTMLAttributes, ElementType, ComponentPropsWithoutRef } from 'react';

type ButtonBaseProps = {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  className?: string;
};

type PolymorphicComponentProp<C extends ElementType, Props = {}> = {
  as?: C;
} & ComponentPropsWithoutRef<C> & Props;

type ButtonProps<C extends ElementType = 'button'> = PolymorphicComponentProp<
  C,
  ButtonBaseProps
>;

export const Button = <C extends ElementType = 'button'>({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  className = '',
  as,
  ...props
}: ButtonProps<C>) => {
  const Component = as || 'button';
  
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#2F35E0]/20 focus:ring-offset-1 shadow-sm';
  
  const variantStyles = {
    primary: 'bg-[#2F35E0] hover:bg-[#2F35E0]/90 text-white shadow',
    secondary: 'bg-[#2F35E0]/10 hover:bg-[#2F35E0]/20 text-[#2F35E0]',
    outline: 'border border-gray-300 hover:border-[#2F35E0] hover:text-[#2F35E0] text-gray-700 bg-white'
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Determine if this component can be disabled (only buttons can)
  const isDisableable = Component === 'button';
  const disabledProps = isDisableable && props.disabled || isLoading 
    ? { disabled: true } 
    : {};
  const disabledClass = (isDisableable && props.disabled) || isLoading ? 'opacity-70 cursor-not-allowed' : '';
  
  const allClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthClass} ${disabledClass} ${className}`;
  
  return (
    <Component
      className={allClasses}
      {...disabledProps}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </Component>
  );
};

export default Button;