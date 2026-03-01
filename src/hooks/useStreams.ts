import { useState, useEffect } from 'react';
import { fetchPopularStreams } from '../api/streams';
import type { ApiStream } from '../types';

/**
 * Fetch popular streams for "Explore Popular Courses" grid (GET /api/streams/popular).
 */
export function useStreamsPopular(limit: number = 9) {
  const [streams, setStreams] = useState<ApiStream[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPopularStreams(limit)
      .then(setStreams)
      .finally(() => setLoading(false));
  }, [limit]);

  return { streams, loading };
}
