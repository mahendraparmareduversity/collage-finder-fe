import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';
import { fetchEventById } from '../api/events';
import type { ApiEventDetail } from '../types';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

function formatEventDate(start: string, end: string): string {
  try {
    const s = new Date(start);
    const e = new Date(end);
    const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return `${s.toLocaleDateString('en-IN', opts)} – ${e.toLocaleDateString('en-IN', opts)}`;
  } catch {
    return '';
  }
}

function isValidImageUrl(url: string | undefined | null): boolean {
  if (!url || !url.trim()) return false;
  if (url.includes('mail.google') || url.includes('gmail.com')) return false;
  return true;
}

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<ApiEventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    setLoading(true);
    setNotFound(false);
    fetchEventById(id)
      .then((data) => {
        if (data) setEvent(data);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const scrollToCTA = () => {
    window.location.href = '/#cta';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-bg">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cta border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-muted">Loading event...</p>
        </div>
      </div>
    );
  }

  if (notFound || !event) {
    return (
      <div className="min-h-screen">
        <Navbar onCounsellingClick={scrollToCTA} />
        <main className="max-w-2xl mx-auto px-4 py-20 text-center">
          <p className="text-6xl mb-4">📅</p>
          <h1 className="font-heading font-semibold text-xl text-neutral-text mb-2">
            Event not found
          </h1>
          <p className="text-neutral-muted mb-6">
            This event doesn't exist, has ended, or is no longer available.
          </p>
          <Link
            to="/#events"
            className="inline-flex items-center gap-2 text-cta font-semibold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to events
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const dateStr = formatEventDate(event.startDate, event.endDate);
  const hasImage = isValidImageUrl(event.imageUrl);

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden">
      <Navbar onCounsellingClick={scrollToCTA} />

      <main className="bg-neutral-bg min-w-0 overflow-x-hidden">
        <section className="w-full relative">
          <div
            className="w-full h-64 sm:h-80 md:h-96 bg-gradient-to-br from-navy to-navy-mid relative overflow-hidden"
            style={
              hasImage && event.imageUrl
                ? {
                    backgroundImage: `url(${event.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }
                : undefined
            }
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
              <div className="max-w-4xl mx-auto">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-3 ${
                    event.status === 'running'
                      ? 'bg-success/90 text-white'
                      : 'bg-cta text-white'
                  }`}
                >
                  {event.status === 'running' ? 'Happening now' : 'Upcoming'}
                </span>
                <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white leading-tight">
                  {event.name}
                </h1>
                {event.shortDescription && (
                  <p className="text-white/90 text-sm mt-2 max-w-2xl">
                    {event.shortDescription}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 min-w-0">
          <Link
            to="/#events"
            className="inline-flex items-center gap-2 text-neutral-muted hover:text-cta text-sm font-medium mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to events
          </Link>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-neutral-border p-6 shadow-sm flex flex-wrap gap-4">
              {dateStr && (
                <div className="flex items-center gap-2 text-neutral-text">
                  <Calendar className="w-5 h-5 text-cta shrink-0" />
                  <span className="font-medium">{dateStr}</span>
                </div>
              )}
              {event.venue && (
                <div className="flex items-center gap-2 text-neutral-text">
                  <MapPin className="w-5 h-5 text-cta shrink-0" />
                  <span className="font-medium">{event.venue}</span>
                </div>
              )}
            </div>

            {event.longDescription && event.longDescription.trim() && (
              <section className="bg-white rounded-2xl border border-neutral-border p-6 shadow-sm">
                <h2 className="font-heading font-semibold text-lg text-neutral-text mb-4">
                  About this event
                </h2>
                <div className="prose prose-sm max-w-none text-neutral-muted leading-relaxed whitespace-pre-wrap">
                  {event.longDescription}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
