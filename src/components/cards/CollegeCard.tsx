import { MapPin, Building2 } from 'lucide-react';
import { College } from '../../types';
import Badge from '../ui/Badge';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { getCollegeShareUrl } from '../../utils/whatsapp';

function isValidImageUrl(url: string | undefined | null): boolean {
  if (!url || !url.trim()) return false;
  if (url.includes('mail.google') || url.includes('gmail.com')) return false;
  return true;
}

function formatFee(fee: string | undefined | null): string {
  if (!fee || !fee.trim()) return '—';
  const num = parseInt(fee.replace(/\D/g, ''), 10);
  if (Number.isNaN(num)) return fee;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1).replace(/\.0$/, '')} Lakh`;
  return `₹${num.toLocaleString('en-IN')}`;
}

interface CollegeCardProps {
  college: College;
  onApply: (name: string) => void;
  onView: (slug: string) => void;
}

export default function CollegeCard({
  college,
  onApply,
  onView,
}: CollegeCardProps) {
  const imageUrl = isValidImageUrl(college.coverImageUrl)
    ? college.coverImageUrl
    : isValidImageUrl(college.logoUrl)
      ? college.logoUrl
      : null;

  return (
    <div
      className="rounded-2xl overflow-hidden border border-neutral-border bg-white hover:border-primary/30 hover:-translate-y-2 hover:shadow-card-hover transition-all duration-300 cursor-pointer group animate-fade-up"
      onClick={() => onView(college.id)}
    >
      <div className="h-44 bg-gradient-to-br from-navy to-navy-mid flex items-center justify-center relative overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : null}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(42,71,111,0.25),transparent_60%)]" />
        {!imageUrl && (
          <Building2 className="w-14 h-14 text-neutral-on-dark/40 group-hover:text-neutral-on-dark/70 group-hover:scale-110 transition-all duration-500 relative z-10" />
        )}
        {college.badge?.trim() && (
          <div className="absolute top-3 right-3 z-10">
            <Badge variant="cta">{college.badge}</Badge>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-heading font-semibold text-neutral-text text-base leading-tight mb-1 group-hover:text-cta transition-colors line-clamp-2">
          {college.name}
        </h3>
        <div className="flex items-center gap-1.5 text-neutral-muted text-xs mb-3">
          <MapPin className="w-3 h-3 shrink-0" />
          {college.location}
        </div>

        {college.courses && college.courses.length > 0 && (
          <div className="mb-3">
            <p className="text-[10px] text-neutral-muted uppercase tracking-wide mb-1.5">Courses</p>
            <div className="flex gap-1.5 flex-wrap">
              {college.courses.slice(0, 4).map((course) => (
                <span
                  key={course}
                  className="bg-primary/15 text-primary font-semibold text-xs px-2.5 py-1 rounded-full border border-primary/20"
                >
                  {course}
                </span>
              ))}
              {college.courses.length > 4 && (
                <span className="text-neutral-muted text-xs">+{college.courses.length - 4}</span>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-neutral-border gap-2">
          <div>
            <p className="text-[10px] text-neutral-muted uppercase tracking-wide">Fees</p>
            <p className="text-sm font-bold text-neutral-text">{formatFee(college.fee)}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={getCollegeShareUrl(college)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white transition-colors"
              aria-label="Share via WhatsApp"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </a>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onApply(college.name);
              }}
              className="bg-[#F47C3C] hover:bg-[#E06D2E] text-white py-2 px-4 rounded-btn text-xs font-bold transition-all hover:shadow-card-cta"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
