import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  description,
}) => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2">
        <div 
          className="h-full w-full bg-cover bg-center" 
          style={{ 
            backgroundImage: 'url("/images/login-jelajahsabang.jpg")',
            backgroundPosition: 'center'
          }}
        >
          <div className="h-full w-full flex flex-col justify-between bg-gradient-to-t from-[#2F35E0]/80 to-[#2F35E0]/40 p-12">
            <div>
              <Logo variant="light" />
            </div>
            <div className="max-w-md">
              <h1 className="text-4xl font-bold text-white mb-4">
                Jelajahi Keindahan Sabang Bersama Kami
              </h1>
              <p className="text-white/80">
                Temukan destinasi wisata terbaik, pemandu lokal berpengalaman, dan pengalaman tak terlupakan di ujung barat Indonesia.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          
          {description && (
            <p className="text-gray-600 mb-8">{description}</p>
          )}
          
          {children}
          
          <div className="mt-8 text-center">
            <Link to="/" className="text-sm text-gray-500 hover:text-[#2F35E0]">
              &larr; Kembali ke halaman utama
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;