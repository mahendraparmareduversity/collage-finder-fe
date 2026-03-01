import { useState, useEffect, useCallback } from 'react';
import { fetchEvents } from '../api/events';
import type { ApiEvent } from '../types';
import type { Pagination } from '../types';

/**
 * Fetch paginated events from GET /api/events (running + upcoming).
 * loadMore appends the next page.
 */
export function useEvents(initialLimit: number = 12) {
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadPage = useCallback(
    async (page: number, append: boolean = false) => {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);
      try {
        const { events: nextEvents, pagination: nextPagination } = await fetchEvents(
          page,
          initialLimit
        );
        setPagination(nextPagination);
        if (append) {
          setEvents((prev) => [...prev, ...nextEvents]);
        } else {
          setEvents(nextEvents);
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [initialLimit]
  );

  useEffect(() => {
    loadPage(1, false);
  }, [loadPage]);

  const loadMore = useCallback(() => {
    if (!pagination?.hasNext || loadingMore) return;
    loadPage(pagination.page + 1, true);
  }, [pagination, loadingMore, loadPage]);

  const hasNextPage = Boolean(pagination?.hasNext);

  return {
    events,
    pagination,
    loading,
    loadingMore,
    hasNextPage,
    loadMore,
  };
}
