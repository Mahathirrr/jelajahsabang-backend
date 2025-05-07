import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import HomePage from './pages/HomePage';

// Components
import Navbar from './components/layout/Navbar';

// Protected Route Component
interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth/login" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/" 
          element={
            <>
              <Navbar transparent={true} />
              <HomePage />
            </>
          } 
        />
        
        {/* Auth routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected routes */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <div className="py-20 px-6">
                  <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Profil Saya</h1>
                    <p className="text-gray-600 mb-6">Halaman profil masih dalam pengembangan.</p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800">Ini adalah halaman yang dilindungi dan hanya bisa diakses setelah login.</p>
                    </div>
                  </div>
                </div>
              </>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/bookings" 
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <div className="py-20 px-6">
                  <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Pesanan Saya</h1>
                    <p className="text-gray-600 mb-6">Halaman pesanan masih dalam pengembangan.</p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800">Ini adalah halaman yang dilindungi dan hanya bisa diakses setelah login.</p>
                    </div>
                  </div>
                </div>
              </>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/favorites" 
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <div className="py-20 px-6">
                  <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Favorit Saya</h1>
                    <p className="text-gray-600 mb-6">Halaman favorit masih dalam pengembangan.</p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800">Ini adalah halaman yang dilindungi dan hanya bisa diakses setelah login.</p>
                    </div>
                  </div>
                </div>
              </>
            </ProtectedRoute>
          } 
        />
        
        {/* Catch all route */}
        <Route 
          path="*" 
          element={
            <>
              <Navbar />
              <div className="py-20 px-6">
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow text-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Halaman Tidak Ditemukan</h2>
                  <p className="text-gray-600 mb-6">Halaman yang Anda cari tidak ditemukan.</p>
                  <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">Kembali ke Beranda</a>
                </div>
              </div>
            </>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;