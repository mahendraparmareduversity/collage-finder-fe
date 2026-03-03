import { Calendar, MapPin } from 'lucide-react';
import type { ApiEvent } from '../../types';

const CARD_GRADIENTS = [
  'linear-gradient(165deg, #E0E8F5 0%, #D0DAEB 40%, #E2E8F0 100%)',
  'linear-gradient(165deg, #FDF0E8 0%, #F5E4D8 40%, #EDE8E4 100%)',
  'linear-gradient(165deg, #D8E2F0 0%, #E4EAEF 50%, #ECEEF2 100%)',
  'linear-gradient(165deg, #F5E8E0 0%, #EDE0D8 50%, #E6E2DE 100%)',
  'linear-gradient(165deg, #E4ECF5 0%, #DAE2EA 40%, #E8ECF0 100%)',
  'linear-gradient(165deg, #EDE4E8 0%, #E8E0E4 50%, #F0ECEE 100%)',
  'linear-gradient(165deg, #E0E4EC 0%, #E8EAEE 50%, #EEF0F2 100%)',
  'linear-gradient(165deg, #F0E8E4 0%, #E8E2DE 50%, #EEE8E4 100%)',
];

function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = ((h << 5) - h) + id.charCodeAt(i) | 0;
  return Math.abs(h);
}

function getCardGradient(id: string): string {
  return CARD_GRADIENTS[hashId(id) % CARD_GRADIENTS.length];
}

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
  const cardGradient = getCardGradient(event.id);

  return (
    <div
      className="rounded-2xl overflow-hidden border-2 border-primary/15 hover:border-primary/40 hover:-translate-y-2 hover:shadow-card-hover transition-all duration-300 cursor-pointer group"
      style={{ background: cardGradient }}
      onClick={() => onView(event.id)}
    >
      <div className="h-44 bg-gradient-to-br from-navy to-navy-mid overflow-hidden relative">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-navy to-navy-mid flex items-center justify-center">
            <Calendar className="w-14 h-14 text-neutral-on-dark/40 group-hover:text-neutral-on-dark/60 transition-colors duration-300" />
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
