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
import { Course } from '../../types';
import { cn } from '../../utils/cn';

const COURSE_ICONS: Record<string, LucideIcon> = {
  Engineering: Cog,
  MBA: TrendingUp,
  Medical: Stethoscope,
  Law: Scale,
  Design: Palette,
  Commerce: ShoppingCart,
  Pharmacy: Pill,
  Architecture: Building,
  'Data Science': Cpu,
  MCA: Monitor,
};

interface CourseCardProps {
  course: Course;
  onClick: () => void;
  /** Alternate style for striped grid */
  variant?: 'default' | 'alternate';
}

export default function CourseCard({ course, onClick, variant = 'default' }: CourseCardProps) {
  const Icon = COURSE_ICONS[course.key] || Building;

  return (
    <button
      onClick={onClick}
      className={cn(
        'group text-center rounded-2xl border-2 border-neutral-border/60 p-5 min-h-[180px] flex flex-col items-center justify-between',
        'hover:border-cta hover:-translate-y-1.5 hover:shadow-card transition-all duration-300 w-full',
        variant === 'alternate' ? 'bg-neutral-bg/70' : 'bg-white'
      )}
    >
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mb-4',
            course.colorBg,
            course.colorText
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
        <p className="font-heading font-semibold text-neutral-text text-base leading-tight mb-1.5">
          {course.name}
        </p>
        <p className="text-neutral-muted text-sm mb-4">{course.count}</p>
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
