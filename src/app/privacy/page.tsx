import type { Metadata } from 'next';
import PrivacyPolicyPage from '@/views/PrivacyPolicyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | College Eduversity',
  description: 'Privacy policy for College Eduversity – how we collect, use, and protect your information.',
};

export default function PrivacyRoute() {
  return <PrivacyPolicyPage />;
}
