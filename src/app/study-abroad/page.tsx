import type { Metadata } from 'next';
import StudyAbroadPage from '@/views/StudyAbroadPage';

export const metadata: Metadata = {
  title: 'Study Abroad | College Eduversity',
  description: 'Explore study abroad options and partner institutions with College Eduversity.',
};

export default function StudyAbroadRoute() {
  return <StudyAbroadPage />;
}
