import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SessionProviderWrapper from '@/components/SessionProvider';
import PostHogProvider from '@/components/PostHogProvider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MyNextSeat - Real College Reviews, AI Predictor & Honest Insights',
  description: '40,000+ colleges, JEE Main predictor, AI review summaries, and verified student reviews.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProviderWrapper>
          <PostHogProvider>
            <Navbar />
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900">{children}</main>
            <Footer />
            <Toaster position="bottom-right" />
          </PostHogProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}