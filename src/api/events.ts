import { get, getApiBaseUrl } from './client';
import type { ApiEvent, ApiEventDetail } from '../types';
import type { EventsListResponse } from '../types';

interface EventsApiListResponse {
  success: boolean;
  data?: {
    events?: ApiEvent[];
    pagination?: EventsListResponse['pagination'];
  };
}

interface EventDetailApiResponse {
  success: boolean;
  data?: ApiEventDetail;
}

/**
 * Fetch paginated list of running and upcoming events (GET /api/events).
 */
export async function fetchEvents(
  page: number = 1,
  limit: number = 12
): Promise<EventsListResponse> {
  const base = getApiBaseUrl();
  if (!base) {
    return { events: [], pagination: { page: 1, limit, total: 0, totalPages: 0, hasNext: false, hasPrev: false } };
  }

  try {
    const res = await get<EventsApiListResponse>('/api/events', { page, limit });
    if (res.success && res.data?.events && res.data?.pagination) {
      return {
        events: res.data.events,
        pagination: res.data.pagination,
      };
    }
    return {
      events: [],
      pagination: { page: 1, limit, total: 0, totalPages: 0, hasNext: false, hasPrev: false },
    };
  } catch {
    return {
      events: [],
      pagination: { page: 1, limit, total: 0, totalPages: 0, hasNext: false, hasPrev: false },
    };
  }
}

/**
 * Fetch single event by id (GET /api/events/:id). Returns null if not found/inactive.
 */
export async function fetchEventById(id: string): Promise<ApiEventDetail | null> {
  const base = getApiBaseUrl();
  if (!base) return null;

  try {
    const res = await get<EventDetailApiResponse>(`/api/events/${id}`);
    if (res.success && res.data) return res.data;
    return null;
  } catch {
    return null;
  }
}
