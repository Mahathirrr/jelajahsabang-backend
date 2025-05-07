import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';

// Dummy culinary data (adapted from the UI reference)
const culinaryItems = [
    {
        id: 'cul1',
        name: 'Warung Mie Aceh Bang Jol',
        description: 'Mie Aceh otentik dengan bumbu rempah khas, disajikan dengan porsi yang mengenyangkan.',
        address: 'Jl. Perdagangan, Sabang',
        image: '/images/placeholder-culinary1.jpg',
        rating: 4.8,
        priceRange: 'Rp15.000 - Rp50.000',
    },
    {
        id: 'cul2',
        name: 'Seafood Iboih Beach',
        description: 'Hidangan laut segar dengan pemandangan pantai, menyajikan ikan bakar dan kepiting saus.',
        address: 'Pantai Iboih, Sabang',
        image: '/images/placeholder-culinary2.jpg',
        rating: 4.7,
        priceRange: 'Rp50.000 - Rp100.000',
    },
    {
        id: 'cul3',
        name: 'Kopi Ulee Kareng',
        description: 'Kopi Aceh asli dengan metode tradisional, disajikan bersama dessert lokal yang manis.',
        address: 'Jl. Perdagangan, Sabang',
        image: '/images/placeholder-culinary3.jpg',
        rating: 4.6,
        priceRange: 'Rp10.000 - Rp25.000',
    },
    {
        id: 'cul4',
        name: 'Rujak Aceh Cut Nyak',
        description: 'Rujak Aceh dengan cita rasa pedas manis, dilengkapi buah segar dan bumbu kacang khas.',
        address: 'Jl. Sultan Iskandar Muda, Sabang',
        image: '/images/placeholder-culinary4.jpg',
        rating: 4.5,
        priceRange: 'Rp10.000 - Rp20.000',
    },
    {
        id: 'cul5',
        name: 'Ayam Tangkap Teuku Umar',
        description: 'Ayam goreng khas Aceh dengan daun kari goreng renyah dan bumbu rempah lokal.',
        address: 'Jl. Teuku Umar, Sabang',
        image: '/images/placeholder-culinary5.jpg',
        rating: 4.7,
        priceRange: 'Rp30.000 - Rp60.000',
    },
    {
        id: 'cul6',
        name: 'Sate Gurita Sabang',
        description: 'Sate gurita bakar khas Sabang dengan sambal kacang dan lontong.',
        address: 'Pelabuhan Balohan, Sabang',
        image: '/images/placeholder-culinary6.jpg',
        rating: 4.9,
        priceRange: 'Rp25.000 - Rp55.000',
    },
    {
        id: 'cul7',
        name: 'Martabak India Lampulo',
        description: 'Martabak dengan isian kari daging, dibuat dengan resep turun-temurun.',
        address: 'Jl. Lampulo, Sabang',
        image: '/images/placeholder-culinary7.jpg',
        rating: 4.6,
        priceRange: 'Rp20.000 - Rp40.000',
    },
    {
        id: 'cul8',
        name: 'Es Timun Serut Ujong Kareung',
        description: 'Minuman segar dari timun serut, jeruk nipis, dan selasih yang cocok untuk cuaca panas.',
        address: 'Pantai Ujong Kareung, Sabang',
        image: '/images/placeholder-culinary8.jpg',
        rating: 4.4,
        priceRange: 'Rp8.000 - Rp15.000',
    },
    {
        id: 'cul9',
        name: 'Bakso Tuna Sabang',
        description: 'Bakso berbahan dasar ikan tuna segar, disajikan dengan kuah kaldu gurih.',
        address: 'Jl. Yos Sudarso, Sabang',
        image: '/images/placeholder-culinary9.jpg',
        rating: 4.5,
        priceRange: 'Rp15.000 - Rp35.000',
    }
];

const Culinary: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <Navbar transparent={true} />

            {/* Main Content */}
            <main className="flex-grow">
                {/* Header Section */}
                <section className="relative h-96">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url('/images/danau-aneuk-laot-sabang-aceh.png')`,
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
                    <div className="relative h-full flex items-center pt-16">
                        <div className="container mx-auto px-6">
                            <div className="max-w-2xl">
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                    Kuliner Khas Sabang
                                </h1>
                                <p className="text-lg text-white/90 mb-8">
                                    Nikmati kelezatan masakan lokal dan hidangan laut segar khas Sabang
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Recommended Culinary Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-10">
                            Rekomendasi Tempat Makan
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {culinaryItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {item.name}
                                        </h3>
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
                                                    strokeWidth={2}
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            {item.address}
                                        </p>
                                        <p className="text-gray-600 text-sm mb-4">
                                            {item.description}
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
                                            <span className="text-gray-600 text-sm">
                                                {item.rating}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-4">
                                            {item.priceRange}
                                        </p>
                                        <Button
                                            as={Link}
                                            to={`/culinary/${item.id}`}
                                            variant="primary"
                                            size="sm"
                                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                                        >
                                            Lihat Detail
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Culinary;