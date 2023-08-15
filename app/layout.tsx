import '../styles/globals.css';
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from '@/hooks/useAuth';
import AddRecipeModal from '@/components/Modals/AddRecipeModal';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://yumyumz.com'),
  title: {
    default: 'yumyumz | The Recipe Community',
    template: '%s | yumyumz | The Recipe Community',
  },
  description: 'A simple community of foodies that love to share ❤️',
  keywords: [
    'Recipe',
    'Recipe sharing',
    'Cooking',
    'Cuisine',
    'Food',
    'Dish',
    'Meal',
    'Home Cooking',
    'Cookbook',
    'Gastronomy',
    'Culinary Art',
    'Foodie',
    'Gourmet',
    'Home Chef',
    'Cooking Community',
    'Recipe Exchange',
    'Kitchen',
    'Ingredients',
    'Flavors',
    'Taste',
    'Cooking Tips',
    'Cooking Techniques',
    'Nutrition',
    'Healthy Recipes',
    'Desserts',
    'Appetizers',
    'Main Course',
    'Baking',
    'Family Recipes',
    'Seasonal Dishes',
    'International Cuisine',
    'Cooking Inspiration',
    'Food Photography',
    'Cooking Videos',
    'Kitchen Gadgets',
    'Meal Prep',
    'Cooking Challenges',
    'Cooking Events',
    'Culinary Traditions',
    'Food Sharing',
    'Recipe Discovery',
    'Cooking Enthusiasts',
    'Culinary Community',
    'Savoring',
    'Home Meals',
    'Dining Experiences',
    'Flavor Combinations',
    'World Cuisines',
    'Cooking Blogs',
    'Food Lovers',
    'Recipe Variations',
    'Homemade Delights',
    'Tried and Tested Recipes',
  ],

  openGraph: {
    title: 'yumyumz',
    description: 'A simple community of foodies that love to share ❤️',
    url: 'https://yumyumz.com',
    siteName: 'yumyumz',
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'yumyumz',
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <AuthProvider>
          <AddRecipeModal />
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
