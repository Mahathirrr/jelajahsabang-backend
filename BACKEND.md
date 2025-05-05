# Backend Documentation JelajahSabang

## Overview

JelajahSabang menggunakan arsitektur modern dengan Supabase sebagai backend service utama, dilengkapi dengan Edge Functions untuk menangani logika bisnis yang kompleks. Sistem ini dirancang untuk mendukung aplikasi pariwisata yang scalable dengan fitur-fitur seperti autentikasi, manajemen konten, pemesanan, dan pembayaran.

## Teknologi Utama

- **Database**: PostgreSQL (melalui Supabase)
- **Autentikasi**: Supabase Auth
- **Storage**: Supabase Storage
- **Serverless Functions**: Supabase Edge Functions
- **Payment Gateway**: Xendit
- **Email Service**: Resend

## Fitur Backend

### 1. Autentikasi & Otorisasi

#### Sistem Multi-Role

- User (Wisatawan)
- Service Provider (Penyedia Layanan)
- Admin

#### Kebijakan Keamanan

- Row Level Security (RLS) untuk setiap tabel
- Kebijakan akses berbasis peran
- Token-based authentication

### 2. Manajemen Destinasi Wisata

#### Struktur Data

- Kategori destinasi
- Detail destinasi
- Gambar destinasi
- Lokasi GPS
- Integrasi peta

#### Fitur Pencarian

- Full-text search dengan PostgreSQL
- Filter berdasarkan kategori
- Sorting dan pagination

### 3. Manajemen Layanan

#### Jenis Layanan

- Akomodasi
- Tur
- Transportasi
- Aktivitas
- Kuliner

#### Fitur Provider

- Manajemen profil provider
- Pengelolaan layanan
- Upload gambar
- Pengaturan harga dan ketersediaan

### 4. Sistem Pemesanan

#### Proses Booking

- Pembuatan booking
- Validasi ketersediaan
- Perhitungan harga
- Pengelolaan status booking

#### Status Booking

- Pending
- Confirmed
- Cancelled
- Completed

### 5. Sistem Pembayaran (Xendit Integration)

#### Fitur Pembayaran

- Pembuatan invoice
- Multiple payment methods
- Callback handling
- Status tracking

#### Edge Functions

1. `create-payment`

   - Membuat invoice pembayaran
   - Mengintegrasikan dengan Xendit
   - Menyimpan data pembayaran

2. `webhook-xendit`

   - Menerima callback dari Xendit
   - Memproses status pembayaran
   - Mengupdate status booking

3. `check-payment-status`
   - Memeriksa status pembayaran
   - Sinkronisasi status dengan Xendit
   - Mengupdate data di database

### 6. Sistem Notifikasi

#### Jenis Notifikasi

- Email (via Resend)
- In-app notifications
- Status updates

#### Edge Function

- `send-notification`
  - Mengirim email notifikasi
  - Menyimpan notifikasi di database
  - Template email untuk berbagai event

### 7. Sistem Review & Rating

#### Fitur

- Rating (1-5 bintang)
- Komentar
- Verifikasi booking
- Moderasi konten

#### Kebijakan

- Hanya user dengan booking yang sudah selesai
- Satu review per booking
- Kemampuan edit dalam periode tertentu

### 8. Sistem Favorit

#### Fitur

- Menyimpan destinasi favorit
- Menyimpan layanan favorit
- Manajemen daftar favorit

### 9. Sistem Cache

#### Implementasi

- Cache layer untuk query populer
- Automatic cache invalidation
- Custom cache duration

### 10. Analytics & Reporting

#### Edge Function

- `export-data`
  - Generate laporan Excel
  - Filter berdasarkan periode
  - Multiple report types

#### Jenis Laporan

- Booking statistics
- Revenue reports
- Provider performance
- Destination popularity

## Struktur Database

### Tabel Utama

1. `profiles`

   - Informasi pengguna
   - Preferensi dan pengaturan
   - Role dan permissions

2. `categories`

   - Kategori destinasi wisata
   - Hirarki kategori
   - Metadata kategori

3. `destinations`

   - Informasi destinasi
   - Lokasi dan koordinat
   - Media dan deskripsi

4. `services`

   - Detail layanan
   - Pricing dan availability
   - Provider information

5. `bookings`

   - Data pemesanan
   - Status tracking
   - Payment information

6. `payments`

   - Transaction records
   - Payment status
   - Xendit integration data

7. `reviews`

   - User reviews
   - Ratings
   - Moderation status

8. `favorites`
   - User favorites
   - Type (destination/service)
   - Timestamp data

### Tabel Pendukung

1. `destination_images`

   - Image storage
   - Primary image flag
   - Alt text

2. `service_images`

   - Service photos
   - Gallery management
   - Image metadata

3. `notifications`

   - Notification history
   - Read status
   - Notification type

4. `cache`
   - Cached data
   - Expiration time
   - Cache key management

## Security Implementation

### Row Level Security (RLS)

- Policies untuk setiap tabel
- Role-based access control
- Data isolation

### API Security

- JWT validation
- Rate limiting
- CORS configuration

### Payment Security

- Webhook validation
- Secure key storage
- Transaction logging

## Maintenance & Monitoring

### Database Maintenance

- Regular backups
- Index optimization
- Query performance monitoring

### Cache Management

- Automatic cleanup
- Cache invalidation
- Performance metrics

### Error Handling

- Structured error logging
- Error notification system
- Recovery procedures

## Development Guidelines

### Database Migrations

- Version control untuk schema
- Backward compatibility
- Data preservation

### Edge Functions

- Modular development
- Error handling
- Performance optimization

### Testing

- Unit tests untuk functions
- Integration testing
- Security testing

## API Documentation

### RESTful Endpoints

Dokumentasi lengkap endpoint API tersedia di Supabase Dashboard, mencakup:

- Authentication endpoints
- CRUD operations
- File uploads
- Payment processing

### Edge Functions

Setiap Edge Function memiliki dokumentasi spesifik tentang:

- Input parameters
- Response format
- Error handling
- Usage examples

## Deployment

### Environment Setup

- Development
- Staging
- Production

### Configuration

- Environment variables
- API keys
- Service connections

### Monitoring

- Performance metrics
- Error tracking
- Usage statistics
