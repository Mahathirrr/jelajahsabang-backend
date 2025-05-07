import { useState } from 'react';

// Data dummy untuk categories
const dummyCategories = [
  { id: 'cat1', name: 'Pantai', description: 'Berbagai pantai indah di Sabang', icon: 'beach' },
  { id: 'cat2', name: 'Pulau', description: 'Pulau-pulau kecil di sekitar Sabang', icon: 'island' },
  { id: 'cat3', name: 'Sejarah', description: 'Tempat bersejarah di Sabang', icon: 'history' },
  { id: 'cat4', name: 'Alam', description: 'Keindahan alam Sabang', icon: 'nature' }
];

// Data dummy untuk destinations
const dummyDestinations = [
  {
    id: 'dest1',
    name: 'Pantai Iboih',
    description: 'Pantai Iboih terkenal dengan pemandangan bawah laut yang indah. Pantai ini menawarkan snorkeling dan diving yang luar biasa dengan terumbu karang dan ikan warna-warni.',
    short_description: 'Pantai dengan pemandangan bawah laut memukau',
    address: 'Iboih, Sabang, Aceh',
    category_id: 'cat1',
    is_featured: true,
    latitude: 5.8623,
    longitude: 95.2423,
    created_at: '2023-01-01',
    categories: { name: 'Pantai', id: 'cat1' },
    destination_images: [
      { id: 'img1', destination_id: 'dest1', image_url: '/images/placeholder-beach.jpg', is_primary: true, alt_text: 'Pantai Iboih' }
    ]
  },
  {
    id: 'dest2',
    name: 'Tugu Kilometer Nol',
    description: 'Tugu Kilometer Nol Indonesia adalah monumen yang menandai titik paling barat dari Indonesia. Tugu ini menjadi landmark penting dan destinasi wisata yang wajib dikunjungi saat ke Sabang.',
    short_description: 'Titik paling barat Indonesia',
    address: 'Kota Sabang, Aceh',
    category_id: 'cat3',
    is_featured: true,
    latitude: 5.8893,
    longitude: 95.2673,
    created_at: '2023-01-02',
    categories: { name: 'Sejarah', id: 'cat3' },
    destination_images: [
      { id: 'img2', destination_id: 'dest2', image_url: '/images/placeholder-monument.jpg', is_primary: true, alt_text: 'Tugu Kilometer Nol' }
    ]
  },
  {
    id: 'dest3',
    name: 'Pulau Rubiah',
    description: 'Pulau Rubiah adalah surganya penyelam dengan keanekaragaman hayati bawah laut yang luar biasa. Pulau kecil ini memiliki ekosistem terumbu karang yang sehat dan beragam spesies ikan.',
    short_description: 'Surga penyelam dengan terumbu karang indah',
    address: 'Pulau Rubiah, Sabang, Aceh',
    category_id: 'cat2',
    is_featured: true,
    latitude: 5.8723,
    longitude: 95.2323,
    created_at: '2023-01-03',
    categories: { name: 'Pulau', id: 'cat2' },
    destination_images: [
      { id: 'img3', destination_id: 'dest3', image_url: '/images/placeholder-island.jpg', is_primary: true, alt_text: 'Pulau Rubiah' }
    ]
  },
  {
    id: 'dest4',
    name: 'Danau Aneuk Laot',
    description: 'Danau Aneuk Laot adalah danau air tawar yang indah dikelilingi perbukitan hijau. Danau ini adalah sumber air utama untuk penduduk Sabang dan merupakan tempat yang damai untuk bersantai.',
    short_description: 'Danau cantik dikelilingi perbukitan hijau',
    address: 'Kota Sabang, Aceh',
    category_id: 'cat4',
    is_featured: false,
    latitude: 5.8523,
    longitude: 95.2623,
    created_at: '2023-01-04',
    categories: { name: 'Alam', id: 'cat4' },
    destination_images: [
      { id: 'img4', destination_id: 'dest4', image_url: '/images/placeholder-lake.jpg', is_primary: true, alt_text: 'Danau Aneuk Laot' }
    ]
  },
  {
    id: 'dest5',
    name: 'Pantai Sumur Tiga',
    description: 'Pantai Sumur Tiga dikenal dengan pasir putihnya yang lembut dan air laut yang jernih. Pantai ini relatif tenang dan memiliki pemandangan matahari terbenam yang spektakuler.',
    short_description: 'Pantai pasir putih dengan air jernih',
    address: 'Sumur Tiga, Sabang, Aceh',
    category_id: 'cat1',
    is_featured: false,
    latitude: 5.8323,
    longitude: 95.2723,
    created_at: '2023-01-05',
    categories: { name: 'Pantai', id: 'cat1' },
    destination_images: [
      { id: 'img5', destination_id: 'dest5', image_url: '/images/placeholder-beach.jpg', is_primary: true, alt_text: 'Pantai Sumur Tiga' }
    ]
  },
  {
    id: 'dest6',
    name: 'Benteng Jepang',
    description: 'Benteng Jepang adalah sisa-sisa bangunan pertahanan dari masa pendudukan Jepang di Indonesia. Benteng ini menyimpan cerita sejarah yang menarik dan memiliki pemandangan laut yang indah.',
    short_description: 'Peninggalan bersejarah dari masa pendudukan Jepang',
    address: 'Kota Sabang, Aceh',
    category_id: 'cat3',
    is_featured: false,
    latitude: 5.8923,
    longitude: 95.2523,
    created_at: '2023-01-06',
    categories: { name: 'Sejarah', id: 'cat3' },
    destination_images: [
      { id: 'img6', destination_id: 'dest6', image_url: '/images/placeholder-fort.jpg', is_primary: true, alt_text: 'Benteng Jepang' }
    ]
  }
];

export function useDestination() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllDestinations = async ({ featured = false, categoryId = null }: { featured?: boolean; categoryId?: string | null } = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulasi delay untuk menunjukkan loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter data dummy berdasarkan parameter
      let filteredDestinations = [...dummyDestinations];
      
      if (featured) {
        filteredDestinations = filteredDestinations.filter(dest => dest.is_featured);
      }
      
      if (categoryId) {
        filteredDestinations = filteredDestinations.filter(dest => dest.category_id === categoryId);
      }

      return { success: true, destinations: filteredDestinations };
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Terjadi kesalahan saat mengambil destinasi');
      }
      return { success: false, error: err, destinations: [] };
    } finally {
      setLoading(false);
    }
  };

  const getDestinationById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulasi delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const destination = dummyDestinations.find(dest => dest.id === id);
      
      if (!destination) {
        throw new Error('Destinasi tidak ditemukan');
      }

      return { success: true, destination };
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Terjadi kesalahan saat mengambil detail destinasi');
      }
      return { success: false, error: err, destination: null };
    } finally {
      setLoading(false);
    }
  };

  const searchDestinations = async (searchTerm: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulasi delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const filteredDestinations = dummyDestinations.filter(
        dest => dest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                dest.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return { success: true, destinations: filteredDestinations };
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Terjadi kesalahan saat mencari destinasi');
      }
      return { success: false, error: err, destinations: [] };
    } finally {
      setLoading(false);
    }
  };

  const getAllCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulasi delay
      await new Promise(resolve => setTimeout(resolve, 300));

      return { success: true, categories: dummyCategories };
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Terjadi kesalahan saat mengambil kategori');
      }
      return { success: false, error: err, categories: [] };
    } finally {
      setLoading(false);
    }
  };

  return {
    getAllDestinations,
    getDestinationById,
    searchDestinations,
    getAllCategories,
    loading,
    error,
  };
}