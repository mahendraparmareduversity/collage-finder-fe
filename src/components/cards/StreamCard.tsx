import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Cog,
  TrendingUp,
  Stethoscope,
  Scale,
  Palette,
  ShoppingCart,
  Pill,
  Building,
  Cpu,
  Monitor,
} from 'lucide-react';
import type { ApiStream } from '../../types';
import { cn } from '../../utils/cn';

/** Map API iconKey/slug to Lucide icon (same as CourseCard) */
const STREAM_ICONS: Record<string, LucideIcon> = {
  engineering: Cog,
  mba: TrendingUp,
  bba: Building,
  medical: Stethoscope,
  law: Scale,
  design: Palette,
  commerce: ShoppingCart,
  pharmacy: Pill,
  architecture: Building,
  'data-science': Cpu,
  mca: Monitor,
};

const STREAM_COLORS: Record<string, string> = {
  engineering: 'bg-orange-50 text-orange-700',
  mba: 'bg-blue-50 text-blue-700',
  bba: 'bg-slate-100 text-slate-700',
  medical: 'bg-green-50 text-green-700',
  law: 'bg-purple-50 text-purple-700',
  design: 'bg-pink-50 text-pink-700',
  commerce: 'bg-yellow-50 text-yellow-700',
  pharmacy: 'bg-teal-50 text-teal-700',
  architecture: 'bg-red-50 text-red-700',
  'data-science': 'bg-indigo-50 text-indigo-700',
  mca: 'bg-cyan-50 text-cyan-700',
};

function formatCollegeCount(n: number): string {
  const s = n >= 1000 ? n.toLocaleString('en-IN') : String(n);
  return s + '+';
}

interface StreamCardProps {
  stream: ApiStream;
  onClick: (slug: string) => void;
  /** Alternate style for striped grid (e.g. light grey background) */
  variant?: 'default' | 'alternate';
}

export default function StreamCard({ stream, onClick, variant = 'default' }: StreamCardProps) {
  const iconKey = (stream.iconKey || stream.slug || '').toLowerCase().replace(/\s+/g, '-');
  const Icon = STREAM_ICONS[iconKey] || Building;
  const colorClass = STREAM_COLORS[iconKey] || 'bg-neutral-bg text-neutral-muted';
  const countText = `${formatCollegeCount(stream.collegeCount)} colleges`;

  return (
    <button
      type="button"
      onClick={() => onClick(stream.slug)}
      className={cn(
        'group text-center rounded-2xl border-2 border-primary/15 p-5 min-h-[180px] flex flex-col items-center justify-between',
        'hover:border-cta hover:-translate-y-1.5 hover:shadow-card-hover hover:scale-[1.02] transition-all duration-300 w-full',
        variant === 'alternate' ? 'bg-surface-warm' : 'bg-surface-light'
      )}
    >
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mb-4',
            colorClass
          )}
        >
          {stream.iconUrl ? (
            <img src={stream.iconUrl} alt="" className="w-6 h-6 object-contain" />
          ) : (
            <Icon className="w-6 h-6" />
          )}
        </div>
        <p className="font-heading font-semibold text-neutral-text text-base leading-tight mb-1.5">
          {stream.name}
        </p>
        <p className="text-neutral-muted text-sm mb-4">{countText}</p>
      </div>
      <span
        className={cn(
          'inline-flex items-center gap-1.5 text-sm font-semibold text-primary',
          'group-hover:gap-2 transition-all'
        )}
      >
        Explore Verified Colleges <ArrowRight className="w-4 h-4" />
      </span>
    </button>
  );
}
