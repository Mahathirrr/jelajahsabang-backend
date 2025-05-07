import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';

// Dummy blog data
const blogPosts = [
  {
    id: 'post1',
    title: 'Menjelajah Pantai Iboih',
    summary: 'Temukan keindahan bawah laut dan pengalaman snorkeling di Pantai Iboih, salah satu destinasi terbaik di Sabang.',
    date: '2025-04-15',
    image: '/images/iboih.png',
  },
  {
    id: 'post2',
    title: 'Kuliner Khas Sabang yang Wajib Dicoba',
    summary: 'Rasakan cita rasa autentik Mie Aceh dan seafood segar yang menjadi kebanggaan kuliner Sabang.',
    date: '2025-04-10',
    image: '/images/danau-aneuk-laot-sabang-aceh.png',
  },
  {
    id: 'post3',
    title: 'Sejarah Tugu Kilometer Nol',
    summary: 'Pelajari cerita di balik Tugu Kilometer Nol, landmark bersejarah yang menandai ujung barat Indonesia.',
    date: '2025-04-05',
    image: '/images/sumur-tiga.png',
  },
];

const Blogs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar transparent = {true}/>

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
                  Blog JelajahSabang
                </h1>
                <p className="text-lg text-white/90 mb-8">
                  Temukan cerita, tips, dan pengalaman menarik tentang wisata di Sabang.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Articles Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">
              Artikel Terbaru
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {post.summary}
                    </p>
                    <p className="text-blue-600 text-sm mb-4">
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {new Date(post.date).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <Button
                      as={Link}
                      to={`/blogs/${post.id}`}
                      variant="primary"
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                    >
                      Baca Selengkapnya
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

export default Blogs;