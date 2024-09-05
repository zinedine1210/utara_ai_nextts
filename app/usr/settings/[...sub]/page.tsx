import { notFound } from 'next/navigation';

export default function CatchAllClientPage() {
  // Setiap halaman yang tidak ada di folder /client/ akan memanggil halaman ini
  notFound(); // Memicu halaman not-found.tsx khusus untuk /client/
  
  return null; // Komponen ini tidak akan dirender, karena notFound() sudah dipanggil
}
