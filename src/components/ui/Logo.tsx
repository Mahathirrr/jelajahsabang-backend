import React from 'react';
import { Link, redirect } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  withText = true,
}) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-[#2F35E0]';
  
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10'
  };
  
  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  // This is the placeholder rectangle that you can replace with your actual logo image later
  const LogoPlaceholder = () => (
    <div 
      className={`${sizeClasses[size]} bg-gray-100 rounded-md flex items-center justify-center ${variant === 'light' ? 'bg-white/20' : ''}`}
      style={{ width: size === 'sm' ? '24px' : size === 'md' ? '32px' : '40px' }}
    >
      {/* You can replace this with your actual SVG or image */}
      <span className={`text-xs ${variant === 'light' ? 'text-white' : 'text-[#2F35E0]'}`}>Logo</span>
    </div>
  );

  return (
    <Link to="/" className="flex items-center hover:opacity-80 cursor-pointer transition">
      <div className="flex items-center">
        {/* Logo Placeholder */}
        <LogoPlaceholder />
        
        {/* Logo Text */}
        {withText && (
          <span className={`ml-2 font-bold ${textColor} ${textSizeClasses[size]}`}>
            JelajahSabang
          </span>
        )}
      </div>
    </Link>
  );
};

export default Logo;