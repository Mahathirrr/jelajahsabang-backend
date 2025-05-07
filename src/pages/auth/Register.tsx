import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import RegisterForm from '../../components/auth/RegisterForm';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSuccess = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex">
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
            <div className="flex items-center">
              <div className="h-8 bg-white/20 rounded-md flex items-center justify-center" style={{ width: '32px' }}>
                <span className="text-xs text-white">Logo</span>
              </div>
              <span className="ml-2 font-bold text-white text-xl">JelajahSabang</span>
            </div>
            <div className="max-w-md">
              <h1 className="text-4xl font-bold text-white mb-4">
                Jelajahi Keindahan Sabang Bersama Kami
              </h1>
              <p className="text-white/90 text-lg">
                Temukan destinasi wisata terbaik, pemandu lokal berpengalaman, dan pengalaman tak terlupakan di ujung barat Indonesia.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden flex items-center justify-center">
            <div className="flex items-center">
              <div className="h-8 bg-gray-100 rounded-md flex items-center justify-center" style={{ width: '32px' }}>
                <span className="text-xs text-[#2F35E0]">Logo</span>
              </div>
              <span className="ml-2 font-bold text-[#2F35E0] text-xl">JelajahSabang</span>
            </div>
          </div>
          
          <RegisterForm onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
};

export default Register;