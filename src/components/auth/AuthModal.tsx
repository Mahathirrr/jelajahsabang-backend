import React, { useState, useEffect } from 'react';
import ForgotPassword from './ForgotPassword.tsx';
import LoginForm from './LoginForm.tsx';
import RegisterForm from './RegisterForm.tsx';

type AuthTab = 'login' | 'register' | 'forgot-password';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: AuthTab;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'login',
  onSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<AuthTab>(initialTab);

  // Trap focus inside modal when open
  useEffect(() => {
    if (!isOpen) return;

    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    // Return focus to document when modal closes
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess();
    }
    onClose();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'login':
        return <LoginForm onSuccess={handleSuccess} />;
      case 'register':
        return <RegisterForm onSuccess={handleSuccess} />;
      case 'forgot-password':
        return <ForgotPassword onSuccess={() => setActiveTab('login')} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-md p-0 mx-4 overflow-hidden bg-white rounded-lg shadow-xl">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-6 h-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
        
        {/* Tabs */}
        {activeTab !== 'forgot-password' && (
          <div className="flex bg-gray-100 border-b">
            <button
              className={`w-1/2 py-3 text-sm font-medium ${
                activeTab === 'login'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Masuk
            </button>
            <button
              className={`w-1/2 py-3 text-sm font-medium ${
                activeTab === 'register'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('register')}
            >
              Daftar
            </button>
          </div>
        )}
        
        {/* Form Container */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;