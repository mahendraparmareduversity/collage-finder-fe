import { get, getApiBaseUrl } from './client';
import type { ApiCourse } from '../types';

interface CoursesApiResponse {
  success: boolean;
  data?: ApiCourse[];
}

/**
 * Fetch courses list for dropdown (GET /api/courses).
 * Use each item's _id as courseId when calling GET /api/colleges?courseId=...
 */
export async function fetchCourses(): Promise<ApiCourse[]> {
  const base = getApiBaseUrl();
  if (!base) return [];

  try {
    const res = await get<CoursesApiResponse>('/api/courses');
    if (res.success && Array.isArray(res.data)) return res.data;
    return [];
  } catch {
    return [];
  }
}
