import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: 'College Eduversity | Find Verified Colleges in India',
  description:
    'Compare verified colleges, real placement data, and get free expert guidance. Trusted by students across India.',
  openGraph: {
    title: 'College Eduversity | Find Verified Colleges in India',
    description:
      'Compare verified colleges, real placement data, and get free expert guidance.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <ScrollToTop />
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
