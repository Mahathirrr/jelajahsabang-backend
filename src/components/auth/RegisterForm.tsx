import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface RegisterFormProps {
  onSuccess?: () => void;
  redirectPath?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  redirectPath = '/',
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    phone?: string;
    terms?: string;
    general?: string;
  }>({});

  const { signUp, loading, error } = useAuth();

  const validateForm = () => {
    const errors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
      phone?: string;
      terms?: string;
    } = {};
    let isValid = true;

    if (!firstName) {
      errors.firstName = 'Nama depan harus diisi';
      isValid = false;
    }

    if (!lastName) {
      errors.lastName = 'Nama belakang harus diisi';
      isValid = false;
    }

    if (!email) {
      errors.email = 'Email harus diisi';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Format email tidak valid';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password harus diisi';
      isValid = false;
    } else if (password.length < 6) {
      errors.password = 'Password minimal 6 karakter';
      isValid = false;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Password tidak cocok';
      isValid = false;
    }

    if (phone && !/^(\+62|62|0)8[1-9][0-9]{6,9}$/.test(phone)) {
      errors.phone = 'Format nomor telepon tidak valid';
      isValid = false;
    }

    if (!agreeTerms) {
      errors.terms = 'Anda harus menyetujui Syarat & Ketentuan';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const result = await signUp(email, password, {
        firstName,
        lastName,
        phone: phone || undefined,
      });
      
      if (result.success) {
        if (onSuccess) {
          onSuccess();
        }
        // Redirect or notification will be handled by parent
      } else {
        setFormErrors({
          general: 'Pendaftaran gagal. Silakan coba lagi.'
        });
      }
    } catch (err) {
      setFormErrors({
        general: 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.'
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Buat Akun Baru</h2>
      <p className="text-gray-600 mb-6">
        Daftar untuk menjelajahi berbagai destinasi menarik dan layanan premium di Sabang.
      </p>

      {(formErrors.general || error) && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {formErrors.general || error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              Nama Depan
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Masukkan nama depan"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-800 placeholder-gray-400
                ${formErrors.firstName 
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-[#2F35E0]/20 focus:border-[#2F35E0]'} 
                focus:outline-none focus:ring-2`
              }
            />
            {formErrors.firstName && <p className="text-sm text-red-600">{formErrors.firstName}</p>}
          </div>
          
          <div className="space-y-1.5">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Nama Belakang
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Masukkan nama belakang"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-800 placeholder-gray-400
                ${formErrors.lastName 
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-[#2F35E0]/20 focus:border-[#2F35E0]'} 
                focus:outline-none focus:ring-2`
              }
            />
            {formErrors.lastName && <p className="text-sm text-red-600">{formErrors.lastName}</p>}
          </div>
        </div>
        
        <div className="space-y-1.5">
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
              ${formErrors.email 
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-[#2F35E0]/20 focus:border-[#2F35E0]'} 
              focus:outline-none focus:ring-2`
            }
          />
          {formErrors.email && <p className="text-sm text-red-600">{formErrors.email}</p>}
        </div>
        
        <div className="space-y-1.5">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Nomor Telepon (Opsional)
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="Masukkan nomor telepon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-800 placeholder-gray-400
              ${formErrors.phone 
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-[#2F35E0]/20 focus:border-[#2F35E0]'} 
              focus:outline-none focus:ring-2`
            }
          />
          {formErrors.phone && <p className="text-sm text-red-600">{formErrors.phone}</p>}
        </div>
        
        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-800 placeholder-gray-400
              ${formErrors.password 
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-[#2F35E0]/20 focus:border-[#2F35E0]'} 
              focus:outline-none focus:ring-2`
            }
          />
          {formErrors.password && <p className="text-sm text-red-600">{formErrors.password}</p>}
        </div>
        
        <div className="space-y-1.5">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Konfirmasi Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Konfirmasi password Anda"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-800 placeholder-gray-400
              ${formErrors.confirmPassword 
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-[#2F35E0]/20 focus:border-[#2F35E0]'} 
              focus:outline-none focus:ring-2`
            }
          />
          {formErrors.confirmPassword && <p className="text-sm text-red-600">{formErrors.confirmPassword}</p>}
        </div>
        
        <div className="mb-6">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 text-[#2F35E0] border-gray-300 rounded focus:ring-[#2F35E0]/20"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-700">
                Saya setuju dengan <a href="/terms" className="text-[#2F35E0] hover:text-[#2F35E0]/80">Syarat & Ketentuan</a> dan <a href="/privacy" className="text-[#2F35E0] hover:text-[#2F35E0]/80">Kebijakan Privasi</a>.
              </label>
            </div>
          </div>
          {formErrors.terms && <p className="mt-1 text-sm text-red-600">{formErrors.terms}</p>}
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#2F35E0] hover:bg-[#2F35E0]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2F35E0] transition-colors
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
          ) : "Daftar"}
        </button>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Sudah punya akun?{' '}
          <Link
            to="/auth/login"
            className="font-medium text-[#2F35E0] hover:text-[#2F35E0]/80"
          >
            Masuk
          </Link>
        </p>
      </div>

      <div className="mt-6 text-center">
        <Link to="/" className="text-sm text-gray-500 hover:text-[#2F35E0] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke halaman utama
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;