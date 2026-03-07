'use client';

import { useRouter } from 'next/navigation';
import type { College } from '@/types';
import CollegeCard from '@/components/cards/CollegeCard';

export default function CollegesGrid({ colleges }: { colleges: College[] }) {
  const router = useRouter();

  const handleView = (slug: string) => {
    router.push(`/college/${slug}`);
  };

  const handleApply = () => {
    router.push('/#cta');
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {colleges.map((college) => (
        <CollegeCard
          key={college.id}
          college={college}
          onApply={handleApply}
          onView={handleView}
        />
      ))}
    </div>
  );
}
