import { Search } from 'lucide-react';
import { CourseCategory } from '../../types';
import type { ApiCourse } from '../../types';

interface SearchSectionProps {
  query: string;
  onQueryChange: (q: string) => void;
  onCategoryChange: (c: CourseCategory) => void;
  onSearch: () => void;
  /** Courses from GET /api/courses – when set, show course dropdown and filter colleges by courseId */
  courses?: ApiCourse[];
  selectedCourseId?: string | null;
  onCourseChange?: (courseId: string | null) => void;
}

const COURSE_OPTIONS: { value: CourseCategory; label: string }[] = [
  { value: 'All', label: 'All Courses' },
  { value: 'Engineering', label: 'Engineering (B.Tech)' },
  { value: 'MBA', label: 'MBA / PGDM' },
  { value: 'Medical', label: 'Medical (MBBS)' },
  { value: 'Law', label: 'Law (LLB)' },
  { value: 'Commerce', label: 'Commerce (B.Com)' },
  { value: 'Design', label: 'Design (B.Des)' },
  { value: 'Pharmacy', label: 'Pharmacy (B.Pharm)' },
  { value: 'MCA', label: 'MCA / BCA' },
];

export default function SearchSection({
  query,
  onQueryChange,
  onCategoryChange,
  onSearch,
  courses = [],
  selectedCourseId = null,
  onCourseChange,
}: SearchSectionProps) {
  const showCourseDropdown = courses.length > 0 && onCourseChange;

  return (
    <section className="bg-white shadow-sm border-b border-neutral-border py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <p className="font-heading font-semibold text-center text-neutral-text text-lg mb-5">
          Search verified colleges across India
        </p>

        <div className="flex flex-col sm:flex-row rounded-xl overflow-hidden shadow-md border-2 border-neutral-border focus-within:border-cta transition-colors">
          <div className="flex flex-1 min-w-0 flex items-center px-4 py-3 sm:py-4 bg-neutral-bg border-b sm:border-b-0 sm:border-r border-neutral-border">
            <Search className="w-5 h-5 text-neutral-muted shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch()}
              placeholder="Search college, course, city..."
              className="flex-1 min-w-0 px-3 py-2 sm:py-0 text-base outline-none bg-transparent text-neutral-text placeholder-neutral-muted"
            />
          </div>
          {showCourseDropdown ? (
            <select
              value={selectedCourseId ?? ''}
              onChange={(e) => onCourseChange(e.target.value ? e.target.value : null)}
              className="w-full sm:w-auto sm:min-w-[160px] px-4 py-3 sm:py-4 bg-white border-b sm:border-b-0 sm:border-l border-neutral-border text-neutral-muted text-sm outline-none cursor-pointer"
            >
              <option value="">All courses</option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          ) : (
            <select
              onChange={(e) => onCategoryChange(e.target.value as CourseCategory)}
              className="w-full sm:w-auto sm:min-w-[180px] px-4 py-3 sm:py-4 bg-white border-b sm:border-b-0 sm:border-l border-neutral-border text-neutral-muted text-sm outline-none cursor-pointer"
            >
              {COURSE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={onSearch}
            className="w-full sm:w-auto bg-cta hover:bg-cta-hover text-white py-3 px-6 text-sm font-bold transition-colors whitespace-nowrap shrink-0"
          >
            Search →
          </button>
        </div>
      </div>
    </section>
  );
}
