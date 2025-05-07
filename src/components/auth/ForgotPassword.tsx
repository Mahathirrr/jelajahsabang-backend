import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface ForgotPasswordProps {
  onSuccess?: () => void;
  onBackToLogin?: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  onSuccess,
  onBackToLogin,
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  
  const { loading } = useAuth();

  const validateForm = () => {
    if (!email) {
      setError('Email harus diisi');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Format email tidak valid');
      return false;
    }
    
    setError(undefined);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Simulate a successful submission
      setTimeout(() => {
        setIsSubmitted(true);
        if (onSuccess) {
          onSuccess();
        }
      }, 1000);
    } catch (err) {
      setError('Terjadi kesalahan saat mengirim email reset password. Silakan coba lagi.');
    }
  };

  return (
    <div className="w-full max-w-md p-6 mx-auto bg-white rounded-xl shadow-sm">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Lupa Password
      </h2>
      
      <p className="text-gray-600 mb-6">
        Masukkan alamat email yang terkait dengan akun Anda, dan kami akan mengirimkan email dengan instruksi untuk mereset password Anda.
      </p>
      
      {isSubmitted ? (
        <div className="text-center">
          <div className="p-4 mb-6 text-sm text-green-700 bg-green-100 rounded-lg">
            Email instruksi reset password telah dikirim ke <span className="font-medium">{email}</span>. Silakan periksa kotak masuk Anda.
          </div>
          
          <button
            type="button"
            onClick={onBackToLogin}
            className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#2F35E0] hover:bg-[#2F35E0]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2F35E0] transition-colors"
          >
            Kembali ke Halaman Login
          </button>
        </div>
      ) : (
        <>
          {error && (
            <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-1.5 mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-800 placeholder-gray-400
                  ${error 
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-[#2F35E0]/20 focus:border-[#2F35E0]'} 
                  focus:outline-none focus:ring-2`
                }
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#2F35E0] hover:bg-[#2F35E0]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2F35E0] transition-colors mb-4
                ${loading ? 'opacity-70 cursor-not-allowed' : ''}`
              }
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </>
              ) : "Kirim Instruksi Reset"}
            </button>
            
            <div className="text-center">
              <button
                type="button"
                className="text-sm font-medium text-[#2F35E0] hover:text-[#2F35E0]/80"
                onClick={onBackToLogin}
              >
                Kembali ke halaman login
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;