import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Logo from '../ui/Logo';
import Button from '../ui/Button';

interface NavbarProps {
  transparent?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Deteksi scroll untuk mengubah tampilan navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMobileMenuOpen(false);
  };
  
  // Menentukan kelas untuk navbar berdasarkan props dan status scroll
  const navbarClass = transparent && !isScrolled
    ? 'absolute top-0 left-0 right-0 z-50 transition-all duration-300'
    : isScrolled 
      ? 'fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300'
      : 'bg-white shadow-sm';
  
  // Menentukan warna teks berdasarkan transparansi dan status scroll
  const textColor = transparent && !isScrolled ? 'text-white' : 'text-gray-800';
  const activeTextColor = transparent && !isScrolled ? 'text-white font-bold underline decoration-2 underline-offset-8' : 'text-[#2F35E0] font-bold';
  
  // Kelas untuk efek hover pada link
  const linkHoverClass = transparent && !isScrolled
    ? 'hover:text-[#2F35E0]' 
    : 'hover:text-[#2F35E0]';
  
  // Fungsi untuk menentukan apakah menu aktif
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Menu items
  const menuItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Destinasi', path: '/destinations' },
    { name: 'Akomodasi', path: '/accommodations' },
    { name: 'Kuliner', path: '/culinary' },
    { name: 'Blog', path: '/blog' },
    { name: 'Kontak', path: '/contact' }
  ];
  
  return (
    <nav className={navbarClass}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-24">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Logo variant={transparent && !isScrolled ? 'light' : 'dark'} />
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`py-2 text-sm font-medium transition-colors ${
                  isActive(item.path) 
                    ? activeTextColor
                    : `${textColor} ${linkHoverClass}`
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Auth Buttons or User Menu */}
          <div className="hidden md:flex items-center ml-6">
            {user ? (
              <div className="relative group">
                <button 
                  className={`flex items-center text-sm px-4 py-2 rounded-md font-medium border ${
                    transparent && !isScrolled 
                      ? 'border-white/30 bg-white/10 text-white' 
                      : 'border-gray-300 bg-white text-gray-700'
                  } transition-colors hover:bg-opacity-80`}
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2 overflow-hidden">
                    {user.email ? (
                      <span className="uppercase font-bold">{user.email.charAt(0)}</span>
                    ) : (
                      <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="mr-1 truncate max-w-[100px]">
                    {user.email?.split('@')[0]}
                  </span>
                  <svg 
                    className="h-4 w-4" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#2F35E0]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profil Saya
                  </Link>
                  <Link
                    to="/bookings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#2F35E0]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Pesanan Saya
                  </Link>
                  <Link
                    to="/favorites"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#2F35E0]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Favorit
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  to="/auth/login"
                  className={`px-5 py-2 rounded-md text-sm font-medium border transition-colors ${
                    transparent && !isScrolled 
                      ? "border-white text-white hover:bg-white hover:text-[#2F35E0]" 
                      : "border-gray-300 text-gray-700 hover:border-[#2F35E0] hover:text-[#2F35E0]"
                  }`}
                >
                  Masuk
                </Link>
                <Link
                  to="/auth/register"
                  className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                    transparent && !isScrolled 
                      ? "bg-white text-[#2F35E0] hover:bg-white/90" 
                      : "bg-[#2F35E0] text-white hover:bg-[#2F35E0]/90"
                  }`}
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className={`${textColor} inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">{isMobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu - Slide Down */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out transform ${
          isMobileMenuOpen 
            ? 'opacity-100 translate-y-0 max-h-screen visible' 
            : 'opacity-0 -translate-y-4 max-h-0 invisible'
        } bg-white border-t border-gray-200 shadow-md absolute w-full left-0 z-40`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(item.path)
                  ? 'text-[#2F35E0] bg-blue-50'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-[#2F35E0]'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Mobile Auth Buttons */}
          {!user ? (
            <div className="mt-4 flex flex-col space-y-2 px-3">
              <Link
                to="/auth/login"
                className="w-full text-center border border-gray-300 hover:border-[#2F35E0] text-gray-700 hover:text-[#2F35E0] px-4 py-2 rounded-md font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Masuk
              </Link>
              <Link
                to="/auth/register"
                className="w-full text-center bg-[#2F35E0] hover:bg-[#2F35E0]/90 text-white px-4 py-2 rounded-md font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Daftar
              </Link>
            </div>
          ) : (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <div className="px-3 py-2">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 overflow-hidden">
                    <span className="text-blue-600 font-bold text-lg uppercase">{user.email?.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">{user.email?.split('@')[0]}</div>
                    <div className="text-xs text-gray-500 truncate">{user.email}</div>
                  </div>
                </div>
              </div>
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-[#2F35E0]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profil Saya
              </Link>
              <Link
                to="/bookings"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-[#2F35E0]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pesanan Saya
              </Link>
              <Link
                to="/favorites"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-[#2F35E0]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Favorit
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
              >
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;