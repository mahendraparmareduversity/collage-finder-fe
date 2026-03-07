import { get, getApiBaseUrl } from './client';
import type { ApiStream } from '../types';
import type { Pagination } from '../types';

interface StreamsPopularApiResponse {
  success: boolean;
  data?: ApiStream[];
}

interface StreamsListApiResponse {
  success: boolean;
  data?: {
    streams: ApiStream[];
    pagination: Pagination;
  };
}

/**
 * Fetch popular streams for "Explore Popular Courses" grid (GET /api/streams/popular).
 */
export async function fetchPopularStreams(limit: number = 9): Promise<ApiStream[]> {
  const base = getApiBaseUrl();
  if (!base) return [];

  try {
    const res = await get<StreamsPopularApiResponse>('/api/streams/popular', { limit });
    if (res.success && Array.isArray(res.data)) return res.data;
    return [];
  } catch {
    return [];
  }
}

/**
 * Fetch all streams with pagination for "View All" (GET /api/streams).
 */
export async function fetchStreams(params: {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
  search?: string;
} = {}): Promise<{ streams: ApiStream[]; pagination: Pagination }> {
  const base = getApiBaseUrl();
  const empty = {
    streams: [],
    pagination: {
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
    },
  };
  if (!base) return empty;

  try {
    const q: Record<string, string | number> = {};
    if (params.page != null) q.page = params.page;
    if (params.limit != null) q.limit = params.limit;
    if (params.sortBy) q.sortBy = params.sortBy;
    if (params.order) q.order = params.order;
    if (params.search?.trim()) q.search = params.search.trim();

    const res = await get<StreamsListApiResponse>('/api/streams', q);
    if (res.success && res.data?.streams && res.data?.pagination) {
      return { streams: res.data.streams, pagination: res.data.pagination };
    }
    return empty;
  } catch {
    return empty;
  }
}
