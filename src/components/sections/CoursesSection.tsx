import { ArrowRight } from 'lucide-react';
import { CourseCategory } from '../../types';
import type { ApiStream } from '../../types';
import { COURSES } from '../../data';
import CourseCard from '../cards/CourseCard';
import StreamCard from '../cards/StreamCard';
import SectionHeader from '../ui/SectionHeader';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface CoursesSectionProps {
  /** When set, show streams from API (GET /api/streams/popular) and use onStreamSelect. */
  streams?: ApiStream[];
  loading?: boolean;
  onStreamSelect?: (slug: string) => void;
  /** Fallback when no streams from API; uses static COURSES and category filter. */
  onCourseSelect: (key: CourseCategory) => void;
}

export default function CoursesSection({
  streams = [],
  loading = false,
  onStreamSelect,
  onCourseSelect,
}: CoursesSectionProps) {
  const { ref, isVisible } = useScrollAnimation();
  const useApiStreams = streams.length > 0 && onStreamSelect;

  return (
    <section id="courses" className="bg-white py-20 px-4 sm:px-6">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <SectionHeader
          eyebrow="Browse by Stream"
          title="Explore "
          highlight="Popular Courses"
          action={
            <a
              href="#colleges"
              className="text-primary font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All <ArrowRight className="w-4 h-4" />
            </a>
          }
        />

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-[180px] rounded-2xl border border-neutral-border/60 animate-pulse bg-neutral-bg/50"
              />
            ))}
          </div>
        ) : useApiStreams ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {streams.map((stream, index) => (
              <StreamCard
                key={stream.id}
                stream={stream}
                onClick={onStreamSelect}
                variant={index % 2 === 1 ? 'alternate' : 'default'}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {COURSES.map((course, index) => (
              <CourseCard
                key={course.key}
                course={course}
                onClick={() => onCourseSelect(course.key)}
                variant={index % 2 === 1 ? 'alternate' : 'default'}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
