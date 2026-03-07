import { useState, useEffect, useCallback } from 'react';
import { College, CourseCategory, FilterState, CollegeListSort } from '../types';
import { COLLEGES } from '../data';
import { fetchCollegesList, CollegesListPagination } from '../api/colleges';
import { getApiBaseUrl } from '../api/client';

const DEFAULT_LIMIT = 12;
const CATEGORY_ALL = 'All' as const;
const STATE_ALL = 'All India';

export function useColleges() {
  const baseUrl = getApiBaseUrl();
  const useApi = Boolean(baseUrl);

  const [filters, setFilters] = useState<FilterState>({
    category: CATEGORY_ALL,
    state: STATE_ALL,
    searchQuery: '',
    courseId: null,
  });
  const [sort, setSort] = useState<CollegeListSort>('name_asc');
  const [, setPage] = useState(1);
  const [colleges, setColleges] = useState<College[]>([]);
  const [pagination, setPagination] = useState<CollegesListPagination | undefined>(undefined);
  const [loading, setLoading] = useState(useApi);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!useApi) {
      const categoryMatch = (c: College) =>
        filters.category === CATEGORY_ALL || c.category === filters.category;
      const stateMatch = (c: College) =>
        filters.state === STATE_ALL || c.state === filters.state;
      const q = (filters.searchQuery || '').toLowerCase();
      const searchMatch = (c: College) =>
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.courses.some((course) => course.toLowerCase().includes(q)) ||
        c.category.toLowerCase().includes(q);
      const filtered = COLLEGES.filter(
        (c) => categoryMatch(c) && stateMatch(c) && searchMatch(c)
      );
      const sorted =
        sort === 'name_asc'
          ? [...filtered].sort((a, b) => a.name.localeCompare(b.name))
          : sort === 'name_desc'
            ? [...filtered].sort((a, b) => b.name.localeCompare(a.name))
            : filtered;
      setColleges(sorted);
      setPagination(undefined);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    const category = filters.category === CATEGORY_ALL ? undefined : filters.category;
    const state = filters.state === STATE_ALL ? undefined : filters.state;
    const search = filters.searchQuery?.trim() || undefined;
    const courseId = filters.courseId || undefined;
    fetchCollegesList({
      page: 1,
      limit: DEFAULT_LIMIT,
      category,
      courseId,
      state,
      search,
      sort: search ? (sort === 'name_asc' ? 'relevance' : sort) : sort,
    })
      .then(({ colleges: list, pagination: p }) => {
        setColleges(list);
        setPagination(p ?? undefined);
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : 'Failed to load colleges');
        setColleges([]);
        setPagination(undefined);
      })
      .finally(() => setLoading(false));
  }, [useApi, filters.category, filters.courseId, filters.state, filters.searchQuery, sort]);

  const setCategory = useCallback((category: CourseCategory) => {
    setFilters((prev) => ({ ...prev, category, courseId: null }));
    setPage(1);
  }, []);

  const setState = useCallback((state: string) => {
    setFilters((prev) => ({ ...prev, state }));
    setPage(1);
  }, []);

  const setSearchQuery = useCallback((searchQuery: string) => {
    setFilters((prev) => ({ ...prev, searchQuery }));
    setPage(1);
  }, []);

  const setCourseId = useCallback((courseId: string | null) => {
    setFilters((prev) => ({ ...prev, courseId }));
    setPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({ category: CATEGORY_ALL, state: STATE_ALL, searchQuery: '', courseId: null });
    setPage(1);
  }, []);

  const appendNextPage = useCallback(async () => {
    if (!useApi || !pagination?.hasNext) return;
    const nextPage = (pagination?.page ?? 1) + 1;
    setLoading(true);
    try {
      const category = filters.category === CATEGORY_ALL ? undefined : filters.category;
      const state = filters.state === STATE_ALL ? undefined : filters.state;
      const search = filters.searchQuery?.trim() || undefined;
      const courseId = filters.courseId || undefined;
      const { colleges: nextList, pagination: nextP } = await fetchCollegesList({
        page: nextPage,
        limit: DEFAULT_LIMIT,
        category,
        courseId,
        state,
        search,
        sort: search ? (sort === 'name_asc' ? 'relevance' : sort) : sort,
      });
      setColleges((prev) => [...prev, ...nextList]);
      setPagination(nextP ?? undefined);
    } finally {
      setLoading(false);
    }
  }, [useApi, filters.category, filters.courseId, filters.state, filters.searchQuery, sort, pagination]);

  return {
    colleges,
    pagination,
    loading,
    error,
    filters,
    sort,
    setCategory,
    setState,
    setSearchQuery,
    setCourseId,
    setSort,
    resetFilters,
    loadMore: useApi ? appendNextPage : undefined,
    hasNextPage: pagination?.hasNext ?? false,
  };
}
