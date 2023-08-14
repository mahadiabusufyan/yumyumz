import Header from '@/components/Layout/Header';
import Image from 'next/image';
import Hero from './components/Hero';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
    </main>
  );
}
