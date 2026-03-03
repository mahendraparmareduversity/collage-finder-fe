import { Star } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const REVIEWS = [
  { name: 'Rahul S.', college: 'VIT Vellore', text: 'Got free counselling and shortlisted colleges in a week. Very helpful!', rating: 5 },
  { name: 'Priya M.', college: 'SRM University', text: 'Verified fee data helped my parents compare options easily.', rating: 5 },
  { name: 'Arjun K.', college: 'BITS Pilani', text: 'Expert counsellors guided me through the entire application process.', rating: 5 },
];

export default function StudentReviewsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="reviews" className="bg-section-gradient py-20 px-4 sm:px-6">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <SectionHeader
          eyebrow="Student Reviews"
          title="Trusted by "
          highlight="Students & Parents"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="bg-surface rounded-xl p-6 border border-neutral-border shadow-sm"
            >
              <div className="flex gap-0.5 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-neutral-text text-sm leading-relaxed mb-4">{r.text}</p>
              <p className="font-heading font-semibold text-neutral-text text-sm">{r.name}</p>
              <p className="text-neutral-muted text-xs">{r.college}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
