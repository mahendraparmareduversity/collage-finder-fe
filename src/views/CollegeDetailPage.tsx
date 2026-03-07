'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { fetchCollegeBySlug } from '../api/colleges';
import type { CollegeDetail } from '../types';
import CollegeDetailContent from '../components/college/CollegeDetailContent';

/**
 * Client-side college detail (e.g. for legacy Vite entry).
 * Next.js app uses app/college/[slug]/page.tsx with SSR instead.
 */
export default function CollegeDetailPage() {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const [college, setCollege] = useState<CollegeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    setLoading(true);
    setNotFound(false);
    fetchCollegeBySlug(slug)
      .then((data) => {
        if (data) setCollege(data);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-bg">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cta border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-muted">Loading college details...</p>
        </div>
      </main>
    );
  }

  if (notFound || !college) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">🏫</p>
        <h1 className="font-heading font-semibold text-xl text-neutral-text mb-2">
          College not found
        </h1>
        <p className="text-neutral-muted mb-6">
          The college you&apos;re looking for doesn&apos;t exist or is no longer listed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-cta font-semibold hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
      </main>
    );
  }

  return <CollegeDetailContent college={college} />;
}
