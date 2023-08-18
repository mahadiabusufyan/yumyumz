import Header from '@/components/Layout/Header';
import Hero from './components/Hero';
import BrowseRecipes from './components/BrowseRecipes';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <BrowseRecipes />
    </main>
  );
}
