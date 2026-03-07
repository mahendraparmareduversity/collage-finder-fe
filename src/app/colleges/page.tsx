import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { Search, ArrowLeft, ArrowRight } from 'lucide-react';
import { fetchCollegesListServer, fetchCoursesServer } from '@/lib/api-server';
import { INDIAN_STATES } from '@/data/colleges';
import type { CourseCategory } from '@/types';
import SectionHeader from '@/components/ui/SectionHeader';
import CollegesSearchForm from '@/components/colleges/CollegesSearchForm';
import CollegesGrid from '@/components/colleges/CollegesGrid';

const CATEGORY_TABS: CourseCategory[] = [
  'All',
  'Engineering',
  'MBA',
  'Medical',
  'Law',
  'Design',
  'Commerce',
  'Pharmacy',
  'Architecture',
  'Data Science',
  'MCA',
];

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;

type SearchParams = { [key: string]: string | string[] | undefined };

function buildCollegesUrl(params: SearchParams, overrides: Partial<Record<string, string>> = {}) {
  const p = new URLSearchParams();
  const page = String(overrides.page ?? params.page ?? DEFAULT_PAGE);
  const category = String(overrides.category ?? params.category ?? 'All');
  const state = String(overrides.state ?? params.state ?? 'All India');
  const search = String(overrides.search ?? params.search ?? '').trim();
  const courseId = String(overrides.courseId ?? params.courseId ?? '').trim();
  if (Number(page) > 1) p.set('page', page);
  if (category && category !== 'All') p.set('category', category);
  if (state && state !== 'All India') p.set('state', state);
  if (search) p.set('search', search);
  if (courseId) p.set('courseId', courseId);
  const q = p.toString();
  return q ? `/colleges?${q}` : '/colleges';
}

export const metadata: Metadata = {
  title: 'Colleges in India | Top Verified Colleges | College Eduversity',
  description:
    'Browse and compare verified colleges in India. Filter by course, state, and find the right college with placement data and fees.',
  openGraph: {
    title: 'Colleges in India | College Eduversity',
    description: 'Browse and compare verified colleges in India.',
  },
};

export default async function CollegesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = searchParams;
  const page = Math.max(1, Number(params.page) || DEFAULT_PAGE);
  const category = (params.category as string) || 'All';
  const state = (params.state as string) || 'All India';
  const search = (params.search as string) || '';
  const courseId = (params.courseId as string) || null;

  const [courses, { colleges, pagination }] = await Promise.all([
    fetchCoursesServer(),
    fetchCollegesListServer({
      page,
      limit: DEFAULT_LIMIT,
      category: category as CourseCategory,
      state: state !== 'All India' ? state : undefined,
      search: search.trim() || undefined,
      courseId: courseId || undefined,
      sort: search.trim() ? 'relevance' : 'name_asc',
    }),
  ]);

  const useApiCourses = courses.length > 0;

  const prevUrl = page > 1 ? buildCollegesUrl(params, { page: String(page - 1) }) : null;
  const nextUrl =
    pagination?.hasNext ? buildCollegesUrl(params, { page: String(page + 1) }) : null;

  return (
    <section className="bg-colleges-section py-16 px-4 sm:px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-neutral-muted hover:text-cta text-sm font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <SectionHeader
          eyebrow="Browse & Compare"
          title="Colleges "
          highlight="in India"
        />

        <Suspense fallback={<div className="h-14 max-w-xl mx-auto mb-8 bg-neutral-border/50 rounded-xl animate-pulse" />}>
          <div className="w-full flex justify-center px-0 sm:px-4 mb-8">
            <CollegesSearchForm />
          </div>
        </Suspense>

        <div className="w-full flex justify-center mb-6">
          <div className="flex gap-1 sm:gap-1.5 bg-neutral-bg rounded-xl p-1 sm:p-1.5 flex-wrap justify-center max-w-4xl">
            {useApiCourses ? (
              <>
                <Link
                  href={buildCollegesUrl(params, { courseId: '', category: 'All', page: '1' })}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    !courseId
                      ? 'bg-surface text-neutral-text shadow-md border border-neutral-border'
                      : 'text-neutral-muted hover:text-neutral-text'
                  }`}
                >
                  All
                </Link>
                {courses.map((c) => {
                  const isSelected = courseId === c._id;
                  const href = buildCollegesUrl(params, { courseId: c._id, category: 'All', page: '1' });
                  return (
                    <Link
                      key={c._id}
                      href={href}
                      className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                        isSelected
                          ? 'bg-surface text-neutral-text shadow-md border border-neutral-border'
                          : 'text-neutral-muted hover:text-neutral-text'
                      }`}
                    >
                      {c.name}
                    </Link>
                  );
                })}
              </>
            ) : (
              CATEGORY_TABS.map((cat) => {
                const href = buildCollegesUrl(params, { category: cat, page: '1' });
                const isSelected = category === cat;
                return (
                  <Link
                    key={cat}
                    href={href}
                    className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                      isSelected
                        ? 'bg-surface text-neutral-text shadow-md border border-neutral-border'
                        : 'text-neutral-muted hover:text-neutral-text'
                    }`}
                  >
                    {cat}
                  </Link>
                );
              })
            )}
          </div>
        </div>

        <div className="w-full flex justify-center mb-8">
          <div className="flex gap-2 flex-wrap justify-center max-w-4xl px-0 sm:px-2">
            {INDIAN_STATES.map((s) => {
              const filterValue = s === 'All India' ? 'All India' : s;
              const href = buildCollegesUrl(params, { state: filterValue, page: '1' });
              const isSelected = state === filterValue;
              return (
                <Link
                  key={s}
                  href={href}
                  className={`px-3 py-1.5 sm:px-4 rounded-full border text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-primary border-primary text-white hover:bg-primary hover:text-white'
                      : 'bg-[#F47C3C] border-[#F47C3C] text-white hover:bg-[#E06D2E] hover:border-[#E06D2E]'
                  }`}
                >
                  {s === 'All India' ? 'All India' : s}
                </Link>
              );
            })}
          </div>
        </div>

        {colleges.length === 0 ? (
          <div className="text-center py-16 text-neutral-muted">
            <div className="inline-flex w-14 h-14 rounded-full bg-neutral-border items-center justify-center mb-3">
              <Search className="w-7 h-7 text-neutral-muted" />
            </div>
            <p className="font-semibold text-lg text-neutral-text">No colleges found</p>
            <p className="text-sm mb-4">Try changing your filters or search query</p>
            <Link
              href="/colleges"
              className="text-cta font-semibold hover:underline"
            >
              Clear filters
            </Link>
          </div>
        ) : (
          <>
            <CollegesGrid colleges={colleges} />

            {pagination && (
              <p className="text-center text-sm text-neutral-muted mt-4">
                Showing {colleges.length} of {pagination.total} colleges
                {pagination.totalPages > 1 && ` · Page ${pagination.page} of ${pagination.totalPages}`}
              </p>
            )}

            {(prevUrl || nextUrl) && (
              <div className="flex items-center justify-center gap-4 mt-8">
                {prevUrl ? (
                  <Link
                    href={prevUrl}
                    className="inline-flex items-center gap-2 border-2 border-cta text-cta hover:bg-cta hover:text-white py-3 px-6 rounded-btn font-bold text-sm transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </Link>
                ) : (
                  <span className="py-3 px-6 text-neutral-muted text-sm">Previous</span>
                )}
                {nextUrl ? (
                  <Link
                    href={nextUrl}
                    className="inline-flex items-center gap-2 border-2 border-cta text-cta hover:bg-cta hover:text-white py-3 px-6 rounded-btn font-bold text-sm transition-all"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <span className="py-3 px-6 text-neutral-muted text-sm">Next</span>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
