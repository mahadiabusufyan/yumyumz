import Header from '@/components/Layout/Header';
import Hero from './components/Hero';
import BrowseRecipes from './components/BrowseRecipes';
import Footer from '@/components/Layout/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <BrowseRecipes />
      <Footer />
    </main>
  );
}
