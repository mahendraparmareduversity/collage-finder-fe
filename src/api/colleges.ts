import { College, CollegeDetail, CourseCategory, CollegeListSort } from '../types';
import { get, getApiBaseUrl } from './client';

/** Query params for GET /api/colleges (Consumer API) */
export interface CollegesListParams {
  page?: number;
  limit?: number;
  category?: CourseCategory | string;
  /** Course ObjectId from GET /api/courses – filter colleges that offer this course */
  courseId?: string | null;
  state?: string;
  stateId?: string;
  city?: string;
  cityId?: string;
  search?: string;
  sort?: CollegeListSort;
  verified?: boolean;
}

export interface CollegesListPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface CollegesListApiResponse {
  success: boolean;
  data?: {
    colleges: College[];
    pagination: CollegesListPagination;
  };
}

interface CollegeDetailApiResponse {
  success: boolean;
  data?: CollegeDetail;
}

/**
 * Fetch college list from Consumer API (GET /api/colleges).
 * Supports filters, search, sort, pagination.
 * Returns empty list when API is not configured or on failure.
 */
export async function fetchCollegesList(params: CollegesListParams = {}): Promise<{
  colleges: College[];
  pagination?: CollegesListPagination;
}> {
  const base = getApiBaseUrl();
  if (!base) return { colleges: [] };

  try {
    const q: Record<string, string | number | boolean> = {};
    if (params.page != null) q.page = params.page;
    if (params.limit != null) q.limit = params.limit;
    if (params.category && params.category !== 'All') q.category = params.category;
    if (params.courseId) q.courseId = params.courseId;
    if (params.state && params.state !== 'All India') q.state = params.state;
    if (params.stateId) q.stateId = params.stateId;
    if (params.city) q.city = params.city;
    if (params.cityId) q.cityId = params.cityId;
    if (params.search?.trim()) q.search = params.search.trim();
    if (params.sort) q.sort = params.sort;
    if (params.verified === true || params.verified === false) q.verified = params.verified;

    const res = await get<CollegesListApiResponse>('/api/colleges', q);
    if (res.success && res.data) {
      return {
        colleges: res.data.colleges,
        pagination: res.data.pagination,
      };
    }
    return { colleges: [] };
  } catch {
    return { colleges: [] };
  }
}

/**
 * Fetch single college details by slug (GET /api/colleges/:slug).
 * Returns null when not found or API unavailable.
 */
export async function fetchCollegeBySlug(slug: string): Promise<CollegeDetail | null> {
  const base = getApiBaseUrl();
  if (!base) return null;

  try {
    const res = await get<CollegeDetailApiResponse>(`/api/colleges/${encodeURIComponent(slug)}`);
    if (res.success && res.data) return res.data;
    return null;
  } catch (err: unknown) {
    const status = (err as { status?: number })?.status;
    if (status === 404) return null;
    return null;
  }
}

/** Alias for fetchCollegeBySlug (id in list response is the slug) */
export const fetchCollegeById = fetchCollegeBySlug;
