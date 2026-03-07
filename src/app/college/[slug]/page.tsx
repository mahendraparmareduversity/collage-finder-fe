import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchCollegeBySlugServer } from '@/lib/api-server';
import CollegeDetailContent from '@/components/college/CollegeDetailContent';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const college = await fetchCollegeBySlugServer(params.slug);
  if (!college) return { title: 'College not found' };
  return {
    title: `${college.name} | College Eduversity`,
    description: college.description?.slice(0, 160) ?? `Details for ${college.name}, ${college.location}.`,
    openGraph: {
      title: `${college.name} | College Eduversity`,
      description: college.description?.slice(0, 160) ?? undefined,
    },
  };
}

export default async function CollegeDetailPage({ params }: Props) {
  const college = await fetchCollegeBySlugServer(params.slug);
  if (!college) notFound();
  return <CollegeDetailContent college={college} />;
}
