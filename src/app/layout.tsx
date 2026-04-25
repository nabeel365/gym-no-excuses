import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'NO EXCUSES | Premium Fitness Platform',
  description: 'Transform your body. Elevate your life. No excuses. Only results.',
  keywords: 'gym, fitness, workout, transformation, personal training',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-primary text-white antialiased">
        <div className="noise-overlay">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}