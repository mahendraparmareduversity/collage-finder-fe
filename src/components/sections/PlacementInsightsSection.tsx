import { Briefcase } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const INSIGHTS = [
  { label: 'Top recruiters', value: '500+', desc: 'Companies hiring from our listed colleges' },
  { label: 'Avg. placement rate', value: '85%+', desc: 'Across verified engineering & MBA colleges' },
  { label: 'Highest package', value: '₹1 Cr+', desc: 'Reported by NIRF-ranked institutions' },
];

export default function PlacementInsightsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="placements" className="bg-section-gradient py-20 px-4 sm:px-6 border-t border-primary/10">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <SectionHeader
          eyebrow="Real Placement Data"
          title="Placement "
          highlight="Insights"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INSIGHTS.map((item) => (
            <div
              key={item.label}
              className="flex gap-4 p-6 rounded-xl border border-neutral-border hover:border-cta/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-btn bg-success/10 flex items-center justify-center shrink-0">
                <Briefcase className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="font-heading font-bold text-2xl text-neutral-text">{item.value}</p>
                <p className="text-sm font-semibold text-neutral-muted">{item.label}</p>
                <p className="text-xs text-neutral-muted mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
