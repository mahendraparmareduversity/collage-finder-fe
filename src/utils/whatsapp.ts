/** WhatsApp business number (India) – same as footer & college detail */
export const WHATSAPP_NUMBER = '918889577772';

export function getCollegeShareUrl(college: { name: string; location?: string }): string {
  const text = [
    `Hi, I'm interested in: *${(college.name || '').trim()}*`,
    college.location?.trim() ? `Location: ${college.location.trim()}` : '',
    '',
    'Please share more details.',
  ]
    .filter(Boolean)
    .join('\n')
    .trim();
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function getEventShareUrl(event: {
  name: string;
  startDate: string;
  endDate: string;
  venue?: string | null;
}): string {
  let dateStr = '';
  try {
    const s = new Date(event.startDate);
    const e = new Date(event.endDate);
    const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    dateStr = `${s.toLocaleDateString('en-IN', opts)} – ${e.toLocaleDateString('en-IN', opts)}`;
  } catch {
    // ignore
  }
  const lines = [
    `Event: *${(event.name || '').trim()}*`,
    dateStr ? `Date: ${dateStr}` : '',
    event.venue?.trim() ? `Venue: ${event.venue.trim()}` : '',
    '',
    'Please share more details.',
  ].filter(Boolean);
  const text = lines.join('\n').trim();
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
