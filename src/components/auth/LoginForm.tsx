import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface LoginFormProps {
    onSuccess?: () => void;
    redirectPath?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
    onSuccess,
    redirectPath = '/',
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formErrors, setFormErrors] = useState<{
        email?: string;
        password?: string;
        general?: string;
    }>({});

    const { signIn, loading, error } = useAuth();

    const validateForm = () => {
        const errors: {
            email?: string;
            password?: string;
        } = {};
        let isValid = true;

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
            const result = await signIn(email, password);
            if (result.success) {
                if (onSuccess) {
                    onSuccess();
                }
                // Redirect will be handled by the auth hook or parent component
            } else {
                setFormErrors({
                    general: 'Login gagal. Periksa kembali email dan password Anda.'
                });
            }
        } catch (err) {
            setFormErrors({
                general: 'Terjadi kesalahan saat login. Silakan coba lagi.'
            });
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm p-6">
            {(formErrors.general || error) && (
                <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                    {formErrors.general || error}
                </div>
            )}

            <h2 className="text-3xl font-bold mb-2 text-center text-[#2F35E0]">
                Selamat Datang Kembali
            </h2>
            <p className="text-gray-600 mb-6">Masuk ke akun Anda untuk melanjutkan petualangan di Sabang.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Masukkan password Anda"
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

                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="w-4 h-4 text-[#2F35E0] border-gray-300 rounded focus:ring-[#2F35E0]/20"
                        />
                        <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-700">
                            Ingat saya
                        </label>
                    </div>

                    <Link
                        to="/auth/forgot-password"
                        className="text-sm font-medium text-[#2F35E0] hover:text-[#2F35E0]/80"
                    >
                        Lupa password?
                    </Link>
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
                    ) : "Masuk"}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                    Belum punya akun?{' '}
                    <Link
                        to="/auth/register"
                        className="font-medium text-[#2F35E0] hover:text-[#2F35E0]/80"
                    >
                        Daftar sekarang
                    </Link>
                </p>
            </div>

            <div className="mt-8 text-center">
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

export default LoginForm;