import { Loader2 } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import EventCard from '../cards/EventCard';
import SectionHeader from '../ui/SectionHeader';
import type { ApiEvent } from '../../types';

interface EventsSectionProps {
  events: ApiEvent[];
  loading?: boolean;
  hasNextPage?: boolean;
  loadingMore?: boolean;
  onView: (id: string) => void;
  onLoadMore?: () => void;
}

export default function EventsSection({
  events,
  loading = false,
  hasNextPage = false,
  loadingMore = false,
  onView,
  onLoadMore,
}: EventsSectionProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="events" className="bg-section-gradient py-20 px-4 sm:px-6">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <SectionHeader
          eyebrow="What’s On"
          title="Latest "
          highlight="Updates"
        />

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-10 h-10 text-cta animate-spin" />
          </div>
        ) : events.length === 0 ? (
          <p className="text-neutral-muted text-center py-12">
            No latest updates at the moment. Check back soon.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} onView={onView} />
              ))}
            </div>
            {hasNextPage && onLoadMore && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={onLoadMore}
                  disabled={loadingMore}
                  className="bg-cta hover:bg-cta-hover disabled:opacity-60 text-white py-3 px-6 rounded-btn font-semibold text-sm transition-all flex items-center gap-2"
                >
                  {loadingMore ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : null}
                  Load more updates
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
