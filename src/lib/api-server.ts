/**
 * Server-side API helpers. Use process.env so they work in Next.js server components and API routes.
 */

import type { College, CollegeListSort, CourseCategory } from '@/types';
import type { ApiCourse } from '@/types';
import type { CollegesListPagination } from '@/api/colleges';
import { COLLEGES } from '@/data/colleges';

function normalizeBaseUrl(url: string): string {
  return (url || '').trim().replace(/\/+$/, '');
}

const getBaseUrl = () => {
  const env = normalizeBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL ?? '');
  if (env) return env;

  // In production (Vercel), don't guess localhost. Use static fallback instead.
  if (process.env.NODE_ENV === 'production') return '';

  // Local dev fallback
  return 'http://localhost:5000';
};

const DEFAULT_LIMIT = 12;
const CATEGORY_ALL = 'All' as const;
const STATE_ALL = 'All India';

export interface CollegesListParams {
  page?: number;
  limit?: number;
  category?: CourseCategory | string;
  courseId?: string | null;
  state?: string;
  search?: string;
  sort?: CollegeListSort;
}

export async function fetchCollegesListServer(
  params: CollegesListParams = {}
): Promise<{ colleges: College[]; pagination?: CollegesListPagination }> {
  const base = getBaseUrl();
  const limit = params.limit ?? DEFAULT_LIMIT;
  const page = Math.max(1, params.page ?? 1);

  if (base) {
    const q: Record<string, string | number | boolean> = {};
    if (params.page != null) q.page = params.page;
    if (params.limit != null) q.limit = params.limit;
    if (params.category && params.category !== 'All') q.category = params.category;
    if (params.courseId) q.courseId = params.courseId;
    if (params.state && params.state !== 'All India') q.state = params.state;
    if (params.search?.trim()) q.search = params.search.trim();
    if (params.sort) q.sort = params.sort;

    const search =
      '?' +
      Object.entries(q)
        .filter(([, v]) => v !== undefined && v !== '')
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
        .join('&');
    const url = `${base}/api/colleges${search}`;

    try {
      const res = await fetch(url, {
        headers: { Accept: 'application/json' },
        next: { revalidate: 60 },
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.success && data?.data) {
        return {
          colleges: data.data.colleges ?? [],
          pagination: data.data.pagination,
        };
      }
      return { colleges: [] };
    } catch {
      return { colleges: [] };
    }
  }

  // Fallback: filter and paginate static COLLEGES
  const category = params.category === CATEGORY_ALL || !params.category ? null : params.category;
  const state = params.state === STATE_ALL || !params.state ? null : params.state;
  const q = (params.search || '').toLowerCase();
  const categoryMatch = (c: College) => !category || c.category === category;
  const stateMatch = (c: College) => !state || c.state === state;
  const searchMatch = (c: College) =>
    !q ||
    c.name.toLowerCase().includes(q) ||
    c.location.toLowerCase().includes(q) ||
    (c.courses && c.courses.some((course) => course.toLowerCase().includes(q))) ||
    c.category.toLowerCase().includes(q);
  const filtered = COLLEGES.filter(
    (c) => categoryMatch(c) && stateMatch(c) && searchMatch(c)
  );
  const sort = params.sort ?? 'name_asc';
  const sorted =
    sort === 'name_asc'
      ? [...filtered].sort((a, b) => a.name.localeCompare(b.name))
      : sort === 'name_desc'
        ? [...filtered].sort((a, b) => b.name.localeCompare(a.name))
        : filtered;
  const total = sorted.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const start = (page - 1) * limit;
  const colleges = sorted.slice(start, start + limit);
  const pagination: CollegesListPagination = {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
  return { colleges, pagination };
}

/**
 * Fetch courses list for filters (GET /api/courses).
 * Returns empty array when API is not configured or on failure.
 */
export async function fetchCoursesServer(): Promise<ApiCourse[]> {
  const base = getBaseUrl();
  if (!base) return [];

  try {
    const res = await fetch(`${base}/api/courses`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 },
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data?.success && Array.isArray(data?.data)) return data.data;
    return [];
  } catch {
    return [];
  }
}

export async function fetchCollegeBySlugServer(
  slug: string
): Promise<import('@/types').CollegeDetail | null> {
  const base = getBaseUrl();

  // Fallback to static COLLEGES when API base isn't configured
  if (!base) {
    const c = COLLEGES.find((x) => x.id === slug);
    if (!c) return null;
    const { description, ...rest } = c;
    return {
      ...rest,
      description: description ?? undefined,
      slug: c.id,
    };
  }

  try {
    const res = await fetch(`${base}/api/colleges/${encodeURIComponent(slug)}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 },
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data?.success && data?.data) return data.data;

    // If API returns not found or errors, still allow static fallback in case
    // you're running without backend data for that slug.
    const c = COLLEGES.find((x) => x.id === slug);
    if (c) {
      const { description, ...rest } = c;
      return {
        ...rest,
        description: description ?? undefined,
        slug: c.id,
      };
    }
    return null;
  } catch {
    const c = COLLEGES.find((x) => x.id === slug);
    if (c) {
      const { description, ...rest } = c;
      return {
        ...rest,
        description: description ?? undefined,
        slug: c.id,
      };
    }
    return null;
  }
}
