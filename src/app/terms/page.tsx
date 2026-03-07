import type { Metadata } from 'next';
import TermsPage from '@/views/TermsPage';

export const metadata: Metadata = {
  title: 'Terms & Conditions | College Eduversity',
  description: 'Terms and conditions for College Eduversity admission consultancy services.',
};

export default function TermsRoute() {
  return <TermsPage />;
}
