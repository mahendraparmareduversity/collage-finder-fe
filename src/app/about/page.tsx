import type { Metadata } from 'next';
import AboutPage from '@/views/AboutPage';

export const metadata: Metadata = {
  title: 'About Us | College Eduversity',
  description: 'College Eduversity – trusted admission consultancy with 12+ years of experience guiding students in India and abroad.',
};

export default function AboutRoute() {
  return <AboutPage />;
}
