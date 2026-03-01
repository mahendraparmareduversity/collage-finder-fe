import { Calendar, MapPin } from 'lucide-react';
import type { ApiEvent } from '../../types';

function formatEventDate(start: string, end: string): string {
  try {
    const s = new Date(start);
    const e = new Date(end);
    const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return `${s.toLocaleDateString('en-IN', opts)} – ${e.toLocaleDateString('en-IN', opts)}`;
  } catch {
    return '';
  }
}

interface EventCardProps {
  event: ApiEvent;
  onView: (id: string) => void;
}

export default function EventCard({ event, onView }: EventCardProps) {
  const dateStr = formatEventDate(event.startDate, event.endDate);

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden border border-neutral-border hover:border-cta hover:-translate-y-2 hover:shadow-card transition-all duration-300 cursor-pointer group"
      onClick={() => onView(event.id)}
    >
      <div className="h-44 bg-neutral-bg overflow-hidden relative">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-navy to-navy-mid flex items-center justify-center">
            <Calendar className="w-14 h-14 text-white/30" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span
            className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${
              event.status === 'running'
                ? 'bg-success/20 text-success'
                : 'bg-cta/20 text-cta'
            }`}
          >
            {event.status === 'running' ? 'Now' : 'Upcoming'}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-heading font-semibold text-neutral-text text-base leading-tight mb-1 group-hover:text-cta transition-colors line-clamp-2">
          {event.name}
        </h3>
        {event.shortDescription && (
          <p className="text-neutral-muted text-sm line-clamp-2 mb-2">
            {event.shortDescription}
          </p>
        )}
        {dateStr && (
          <div className="flex items-center gap-1.5 text-neutral-muted text-xs mb-1">
            <Calendar className="w-3 h-3 shrink-0" />
            {dateStr}
          </div>
        )}
        {event.venue && (
          <div className="flex items-center gap-1.5 text-neutral-muted text-xs">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
        )}
      </div>
    </div>
  );
}
