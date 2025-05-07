import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDestination } from '../hooks/UseDestination-DUMMY';
import Button from '../components/ui/Button';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Destinations: React.FC = () => {
  const { getAllDestinations, getAllCategories, loading, error } = useDestination();
  const [destinations, setDestinations] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const destResult = await getAllDestinations({ categoryId: selectedCategory });
      const catResult = await getAllCategories();
      
      if (destResult.success && destResult.destinations) {
        setDestinations(destResult.destinations);
      }
      
      if (catResult.success && catResult.categories) {
        setCategories(catResult.categories);
      }
    };
    
    fetchData();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar transparent={true}/>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-96">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/images/iboih.png')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
          <div className="relative h-full flex items-center pt-16">
            <div className="container mx-auto px-6">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Destinasi Wisata Sabang
                </h1>
                <p className="text-lg text-white/90 mb-8">
                  Jelajahi tempat-tempat menarik di Sabang yang menawarkan pemandangan menakjubkan dan pengalaman tak terlupakan.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Content Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            {/* Categories */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Kategori</h2>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === null 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  Semua
                </button>
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Destinations Grid */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {selectedCategory 
                  ? `Destinasi ${categories.find(c => c.id === selectedCategory)?.name || ''}`
                  : 'Semua Destinasi'
                }
              </h2>
              
              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : error ? (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg my-4">
                  {error}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {destinations.map(destination => (
                    <div 
                      key={destination.id} 
                      className="rounded-lg overflow-hidden shadow-lg bg-white transition transform hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="h-56 bg-gray-200 relative">
                        {/* Placeholder untuk gambar */}
                        <div className="w-full h-full flex items-center justify-center bg-blue-100">
                          <span className="text-blue-800 font-medium">Gambar {destination.name}</span>
                        </div>
                        {destination.categories && (
                          <span className="absolute top-4 left-4 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                            {destination.categories.name}
                          </span>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {destination.short_description || 
                           (destination.description && destination.description.substring(0, 100) + '...')}
                        </p>
                        <Button
                          as={Link}
                          to={`/destinations/${destination.id}`}
                          variant="primary"
                          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                          Lihat Detail
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {destinations.length === 0 && !loading && !error && (
                <div className="text-center py-16 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-lg mb-4">Tidak ada destinasi yang ditemukan.</p>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCategory(null)}
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    Lihat Semua Destinasi
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

export default Destinations;