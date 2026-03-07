'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

export default function CollegesSearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) params.set('search', query.trim());
    else params.delete('search');
    params.delete('page'); // reset to page 1 on new search
    router.push(`/colleges?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="flex rounded-xl overflow-hidden shadow-md border-2 border-neutral-border focus-within:border-cta transition-colors bg-white min-w-0">
        <div className="flex flex-1 items-center px-3 sm:px-4 py-3 min-w-0">
          <Search className="w-5 h-5 text-neutral-muted shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search college, course, city..."
            className="flex-1 min-w-0 px-2 sm:px-3 py-2 text-sm sm:text-base outline-none bg-transparent text-neutral-text placeholder-neutral-muted"
            aria-label="Search colleges"
          />
        </div>
        <button
          type="submit"
          className="bg-cta hover:bg-cta-hover text-white px-4 sm:px-6 py-3 font-semibold text-sm shrink-0 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
