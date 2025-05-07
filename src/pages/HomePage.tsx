import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import Footer from '../components/layout/Footer';

// Hero carousel images
const carouselImages = [
  {
    id: 1,
    src: '/images/danau-aneuk-laot-sabang-aceh.png',
    title: 'Danau Aneuk Laot',
    subtitle: 'Keindahan tersembunyi di tengah pulau'
  },
  {
    id: 2,
    src: '/images/iboih.png',
    title: 'Pantai Iboih',
    subtitle: 'Surga snorkeling dan diving dengan terumbu karang eksotis'
  },
  {
    id: 3,
    src: '/images/sumur-tiga.png',
    title: 'Pantai Sumur Tiga',
    subtitle: 'Pantai pasir putih dengan air biru jernih'
  }
];

// Featured destinations data
const featuredDestinations = [
  {
    id: 1,
    name: 'Tugu Kilometer Nol',
    location: 'Sabang, Aceh',
    image: '/images/tugu-km-0.png',
    description: 'Titik nol kilometer Indonesia yang menandai awal dari jalan nasional yang membentang dari Sabang hingga Merauke.'
  },
  {
    id: 2,
    name: 'Pantai Iboih',
    location: 'Sabang, Aceh',
    image: '/images/iboih.png',
    description: 'Destinasi diving dan snorkeling terbaik di Pulau Weh dengan keindahan terumbu karang dan ikan laut tropis.'
  },
  {
    id: 3,
    name: 'Danau Aneuk Laot',
    location: 'Sabang, Aceh',
    image: '/images/danau-aneuk-laot-sabang-aceh.png',
    description: 'Danau vulkanik dengan pemandangan spektakuler yang menjadi sumber air utama di Pulau Weh.'
  }
];

// Gallery images
const galleryImages = [
  { id: 1, src: '/images/danau-aneuk-laot-sabang-aceh.png', alt: 'Danau Aneuk Laot' },
  { id: 2, src: '/images/pantai-iboih-luas.png', alt: 'Pantai Iboih Aerial View' },
  { id: 3, src: '/images/air-terjun-sabang.png', alt: 'Air Terjun Sabang' },
  { id: 4, src: '/images/gua-sarang.png', alt: 'Gua Sarang' },
  { id: 5, src: '/images/hutan-sabang.png', alt: 'Hutan Sabang' },
  { id: 6, src: '/images/underwater-sabang.png', alt: 'Underwater Sabang' }
];

// Testimonials
const testimonials = [
  {
    id: 1,
    name: 'Budi Santoso',
    avatar: '/images/avatar-1.png',
    role: 'Fotografer Traveler',
    comment: 'Sabang adalah surga tersembunyi Indonesia. Banyak spot foto yang luar biasa dan penduduk lokalnya sangat ramah. Saya pasti akan kembali lagi!'
  },
  {
    id: 2,
    name: 'Putri Amelia',
    avatar: '/images/avatar-2.png',
    role: 'Penikmat Kuliner',
    comment: 'Kuliner seafood di Sabang luar biasa segar dan lezat. Saya sangat menikmati mie Aceh dan kopi Gayo di sini. JelajahSabang membantu saya menemukan tempat makan terbaik!'
  },
  {
    id: 3,
    name: 'Ahmad Fadhil',
    avatar: '/images/avatar-3.png',
    role: 'Diving Enthusiast',
    comment: 'Spot diving di Sabang adalah yang terbaik di Indonesia. Terumbu karang yang masih alami dan beragam spesies ikan. Pengalaman yang tak terlupakan!'
  }
];

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useAuth();
  
  // Auto-carousel for hero section
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle manual navigation for carousel
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative h-screen">
        {/* Hero Carousel */}
        {carouselImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ zIndex: index === currentSlide ? 1 : 0 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${image.src})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />

            {/* Hero Content */}
            <div className="relative h-full flex items-center pt-16">
              <div className="container mx-auto px-6">
                <div className="max-w-2xl">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    {image.title}
                  </h1>
                  <p className="text-xl text-white/90 mb-8">
                    {image.subtitle}
                  </p>
                  <Button
                    as={Link}
                    to="/destinations"
                    variant="primary"
                    size="lg"
                    className="bg-[#2F35E0] hover:bg-[#2F35E0]/90 text-white py-3 px-6 rounded-lg shadow-md flex items-center"
                  >
                    Jelajahi
                    <svg
                      className="ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Navigation Dots */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-3 z-20">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* User Info Section (if logged in) */}
      {user && (
        <section className="py-10 bg-white">
          <div className="container mx-auto px-6 text-center">
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Selamat Datang!
              </h2>
              <p className="text-gray-600 mb-2">
                Anda berhasil login sebagai:
              </p>
              <p className="text-blue-600 font-medium mb-4">{user.email}</p>
              <p className="text-sm text-gray-500">User ID: {user.id}</p>
            </div>
          </div>
        </section>
      )}

      {/* Featured Destinations Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Destinasi Unggulan</h2>
            <Link
              to="/destinations"
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              Lihat Semua Destinasi
              <svg
                className="ml-1 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          <p className="text-gray-600 mb-10 max-w-3xl">
            Jelajahi tempat-tempat menarik di Sabang yang wajib Anda kunjungi. Dari pantai
            dengan air jernih hingga lokasi bersejarah yang menakjubkan.
          </p>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((destination) => (
              <div key={destination.id} className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                  <p className="text-blue-600 text-sm mb-3">
                    <svg className="inline-block w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {destination.location}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">{destination.description}</p>
                  <Link
                    to={`/destinations/${destination.id}`}
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Visit Sabang Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mengapa Harus Mengunjungi Sabang?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sabang menawarkan beragam pengalaman unik yang tidak akan Anda temukan di tempat lain di Indonesia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Reason 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Titik Nol Kilometer</h3>
              <p className="text-gray-600">
                Berkunjung ke titik awal Indonesia dan berfoto di monumen bersejarah Kilometer Nol.
              </p>
            </div>

            {/* Reason 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Keindahan Alam</h3>
              <p className="text-gray-600">
                Nikmati pantai eksotis, terumbu karang, dan danau vulkanik yang memukau.
              </p>
            </div>

            {/* Reason 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 22V12h6v10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Budaya & Kuliner</h3>
              <p className="text-gray-600">
                Rasakan keunikan budaya Aceh dan nikmati hidangan seafood segar terbaik.
              </p>
            </div>

            {/* Reason 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Petualangan Seru</h3>
              <p className="text-gray-600">
                Snorkeling, diving, hiking, dan beragam aktivitas outdoor yang menantang.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button 
              as={Link} 
              to="/about"
              variant="outline"
              size="md"
            >
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Galeri Foto</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image) => (
              <div key={image.id} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Kata Mereka Tentang Sabang
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Pengalaman dari para pengunjung yang telah menjelajahi keindahan Sabang
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-blue-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                <div className="mt-4 flex text-yellow-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h2 className="text-3xl font-bold text-white mb-4">
                Siap Jelajahi Keindahan Sabang?
              </h2>
              <p className="text-white/90 mb-8 max-w-md">
                Rencanakan perjalanan Anda sekarang dan temukan keajaiban di ujung barat Indonesia.
                Tim JelajahSabang siap membantu mewujudkan liburan terbaik Anda.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/services"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg shadow-md inline-block font-medium"
                >
                  Lihat Layanan
                </Link>
                <Link
                  to="/auth/register"
                  className="text-white border border-white hover:bg-white/20 px-6 py-3 rounded-lg shadow-md inline-block font-medium"
                >
                  Daftar Sekarang
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <img
                  src="/images/danau-aneuk-laot-sabang-aceh.png"
                  alt="Sabang"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center">
                    <div className="bg-yellow-400 text-white p-2 rounded-lg mr-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Dinilai</p>
                      <p className="font-bold text-gray-900">4.9/5.0 (120+ ulasan)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;