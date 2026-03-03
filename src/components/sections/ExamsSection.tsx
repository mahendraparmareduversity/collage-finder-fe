import { ArrowRight } from 'lucide-react';
import { EXAMS } from '../../data';
import ExamCard from '../cards/ExamCard';
import SectionHeader from '../ui/SectionHeader';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function ExamsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="exams" className="bg-section-gradient py-20 px-4 sm:px-6 border-t border-primary/10">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <SectionHeader
          eyebrow="Competitive Exams"
          title="Upcoming "
          highlight="Entrance Exams"
          action={
            <a
              href="#"
              className="text-primary font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
            >
              All Exams <ArrowRight className="w-4 h-4" />
            </a>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {EXAMS.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      </div>
    </section>
  );
}
