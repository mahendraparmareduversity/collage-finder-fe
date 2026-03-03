import { Search, ArrowRight, Loader2, X } from 'lucide-react';
import { CourseCategory, College, FilterState } from '../../types';
import type { ApiCourse } from '../../types';
import { Pagination } from '../../types';
import { INDIAN_STATES } from '../../data';
import CollegeCard from '../cards/CollegeCard';
import SectionHeader from '../ui/SectionHeader';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const CATEGORY_TABS: CourseCategory[] = [
  'All', 'Engineering', 'MBA', 'Medical', 'Law', 'Design',
];

interface CollegesSectionProps {
  colleges: College[];
  filters: FilterState;
  loading?: boolean;
  error?: string | null;
  pagination?: Pagination | null;
  hasNextPage?: boolean;
  /** Courses from API – when set, show course filter tabs here (by courseId) */
  courses?: ApiCourse[];
  onCategoryChange: (c: CourseCategory) => void;
  onCourseChange?: (courseId: string | null) => void;
  onStateChange: (s: string) => void;
  onApply: (name: string) => void;
  onView: (slug: string) => void;
  onLoadMore?: () => void;
}

export default function CollegesSection({
  colleges,
  filters,
  loading = false,
  error = null,
  pagination,
  hasNextPage = false,
  courses = [],
  onCategoryChange,
  onCourseChange,
  onStateChange,
  onApply,
  onView,
  onLoadMore,
}: CollegesSectionProps) {
  const { ref, isVisible } = useScrollAnimation();
  const showCourseTabs = courses.length > 0 && onCourseChange;
  const selectedCourse = showCourseTabs && filters.courseId
    ? courses.find((c) => c._id === filters.courseId)
    : null;
  const isAllSelected = !filters.courseId;

  return (
    <section id="colleges" className="bg-colleges-section py-20 px-4 sm:px-6">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <SectionHeader
          eyebrow="Handpicked for You"
          title="Top Colleges "
          highlight="in India"
        />

        {selectedCourse && onCourseChange && (
          <div className="mb-4 flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cta/10 text-cta text-sm font-medium">
              Colleges for: {selectedCourse.name}
              <button
                type="button"
                onClick={() => onCourseChange(null)}
                className="p-0.5 rounded hover:bg-cta/20"
                aria-label="Clear course filter"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Course filter row: API courses when available, else category tabs */}
        <div className="flex gap-1 bg-neutral-bg rounded-xl p-1 w-fit mb-6 flex-wrap">
          {showCourseTabs ? (
            <>
              <button
                onClick={() => onCourseChange(null)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isAllSelected
                    ? 'bg-surface text-neutral-text shadow-md border border-neutral-border'
                    : 'text-neutral-muted hover:text-neutral-text'
                }`}
              >
                All
              </button>
              {courses.map((c) => {
                const isSelected = filters.courseId === c._id;
                return (
                  <button
                    key={c._id}
                    onClick={() => onCourseChange(c._id)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isSelected
                        ? 'bg-surface text-neutral-text shadow-md border border-neutral-border'
                        : 'text-neutral-muted hover:text-neutral-text'
                    }`}
                  >
                    {c.name}
                  </button>
                );
              })}
            </>
          ) : (
            CATEGORY_TABS.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  filters.category === cat
                    ? 'bg-surface text-neutral-text shadow-md border border-neutral-border'
                    : 'text-neutral-muted hover:text-neutral-text'
                }`}
              >
                {cat}
              </button>
            ))
          )}
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
          {INDIAN_STATES.map((state) => {
            const displayState = state === 'All India' ? 'All India' : state;
            const filterValue = state === 'All India' ? 'All India' : state;
            return (
              <button
                key={state}
                onClick={() => onStateChange(filterValue)}
                className={`px-4 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                  filters.state === filterValue
                    ? 'border-cta text-cta bg-cta/5'
                    : 'border-neutral-border text-neutral-muted hover:border-cta hover:text-cta'
                }`}
              >
                {displayState}
              </button>
            );
          })}
        </div>

        {loading && colleges.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-neutral-muted">
            <Loader2 className="w-12 h-12 animate-spin mb-4" />
            <p className="font-medium text-neutral-text">Loading colleges...</p>
          </div>
        ) : colleges.length === 0 ? (
          <div className="text-center py-16 text-neutral-muted">
            <div className="inline-flex w-14 h-14 rounded-full bg-neutral-border items-center justify-center mb-3">
              <Search className="w-7 h-7 text-neutral-muted" />
            </div>
            <p className="font-semibold text-lg text-neutral-text">No colleges found</p>
            <p className="text-sm">Try changing your filters or search query</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {colleges.map((college) => (
                <CollegeCard
                  key={college.id}
                  college={college}
                  onApply={onApply}
                  onView={onView}
                />
              ))}
            </div>
            {pagination && (
              <p className="text-center text-sm text-neutral-muted mt-4">
                Showing {colleges.length} of {pagination.total} colleges
              </p>
            )}
          </>
        )}

        <div className="text-center mt-10">
          {hasNextPage && onLoadMore ? (
            <button
              onClick={onLoadMore}
              disabled={loading}
              className="border-2 border-cta text-cta hover:bg-cta hover:text-white py-3 px-8 rounded-btn font-bold text-sm transition-all inline-flex items-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              Load More Colleges
            </button>
          ) : (
            <button className="border-2 border-cta text-cta hover:bg-cta hover:text-white py-3 px-8 rounded-btn font-bold text-sm transition-all inline-flex items-center gap-2">
              Load More Colleges <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
