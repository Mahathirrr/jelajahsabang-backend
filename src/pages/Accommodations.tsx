import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

// Dummy hook simulation (replace with your actual useAccommodation hook)
const useAccommodation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accommodations, setAccommodations] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const getAllAccommodations = async ({ categoryId = null, searchTerm = '' }: { categoryId?: string | null; searchTerm?: string } = {}) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      const dummyAccommodations = [
        {
          id: 'acc1',
          name: 'Iboih Beach Resort',
          description: 'Resort tepi pantai dengan pemandangan laut yang menakjubkan.',
          address: 'Iboih, Sabang',
          image: '/images/iboih.png',
          rating: 4.8,
          price: 'Rp800.000/malam',
          amenities: ['Pool', 'WiFi', 'Restaurant', 'Parking'],
          category: 'resort',
        },
        {
          id: 'acc2',
          name: 'Sabang Homestay',
          description: 'Homestay nyaman dengan suasana lokal yang hangat.',
          address: 'Kota Sabang',
          image: '/images/danau-aneuk-laot-sabang-aceh.png',
          rating: 4.6,
          price: 'Rp300.000/malam',
          amenities: ['Kitchen', 'Parking'],
          category: 'homestay',
        },
        {
          id: 'acc3',
          name: 'Casa Marina Hotel',
          description: 'Hotel modern dengan fasilitas lengkap di pusat kota.',
          address: 'Kota Sabang',
          image: '/images/sumur-tiga.png',
          rating: 4.6,
          price: 'Rp600.000/malam',
          amenities: ['Gym', 'WiFi', 'Restaurant', 'Parking'],
          category: 'hotel',
        },
      ];
      let filteredAccommodations = [...dummyAccommodations];
      if (categoryId && categoryId !== 'all') {
        filteredAccommodations = filteredAccommodations.filter(acc => acc.category === categoryId);
      }
      if (searchTerm) {
        filteredAccommodations = filteredAccommodations.filter(acc =>
          acc.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setAccommodations(filteredAccommodations);
      return { success: true, accommodations: filteredAccommodations };
    } catch (err) {
      setError('Terjadi kesalahan saat mengambil akomodasi');
      return { success: false, error: err, accommodations: [] };
    } finally {
      setLoading(false);
    }
  };

  const getAllCategories = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API call
      const dummyCategories = [
        { id: 'all', name: 'Semua' },
        { id: 'resort', name: 'Resort' },
        { id: 'homestay', name: 'Homestay' },
        { id: 'hotel', name: 'Hotel' },
        { id: 'villa', name: 'Villa' },
      ];
      setCategories(dummyCategories);
      return { success: true, categories: dummyCategories };
    } catch (err) {
      setError('Terjadi kesalahan saat mengambil kategori');
      return { success: false, error: err, categories: [] };
    } finally {
      setLoading(false);
    }
  };

  return { getAllAccommodations, getAllCategories, loading, error, accommodations, categories };
};

const Accommodations: React.FC = () => {
  const { getAllAccommodations, getAllCategories, loading, error, accommodations, categories } = useAccommodation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>('all');

  useEffect(() => {
    const fetchData = async () => {
      await getAllCategories();
      await getAllAccommodations({ categoryId: selectedCategory, searchTerm });
    };
    fetchData();
  }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar transparent = {true}/>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-96">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/images/iboih.png')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
          <div className="relative h-full flex items-center pt-16">
            <div className="container mx-auto px-6">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Akomodasi
                </h1>
                <p className="text-lg text-white/90 mb-8">
                  Temukan tempat menginap terbaik untuk liburan Anda di Sabang.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
              <div className="flex-1 w-full">
                <Input
                  type="text"
                  placeholder="Cari akomodasi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border-gray-300 focus:border-blue-600 focus:ring-blue-600 p-2"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant="outline"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Accommodations Grid */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : error ? (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-red-100 text-red-700 p-4 rounded-lg my-4">
                  {error}
                </div>
              ) : accommodations.length > 0 ? (
                accommodations.map((accommodation) => (
                  <div
                    key={accommodation.id}
                    className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={accommodation.image}
                        alt={accommodation.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{accommodation.name}</h3>
                      <p className="text-blue-600 text-sm mb-3">
                        <svg
                          className="inline-block w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {accommodation.address}
                      </p>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {accommodation.description}
                      </p>
                      <div className="flex items-center mb-4">
                        <div className="flex text-yellow-400 mr-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-gray-600 text-sm">{accommodation.rating}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{accommodation.price}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {accommodation.amenities.map((amenity: string, index: number) => (
                          <span
                            key={index}
                            className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                      <Button
                        as={Link}
                        to={`/accommodation/${accommodation.id}`}
                        variant="primary"
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                      >
                        Lihat Detail
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-lg mb-4">Tidak ada akomodasi yang ditemukan.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchTerm('');
                    }}
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    Lihat Semua Akomodasi
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Accommodations;