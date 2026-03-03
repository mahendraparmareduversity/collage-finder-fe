import { Calendar, Building2 } from 'lucide-react';
import { Exam } from '../../types';

interface ExamCardProps {
  exam: Exam;
}

export default function ExamCard({ exam }: ExamCardProps) {
  return (
    <div className="bg-surface-light rounded-xl p-5 border-2 border-primary/10 hover:border-cta hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300 cursor-pointer hover:scale-[1.02]">
      <div className="text-3xl mb-3">{exam.emoji}</div>
      <h3 className="font-heading font-semibold text-neutral-text text-lg mb-0.5">
        {exam.name}
      </h3>
      <p className="text-neutral-muted text-xs mb-3">{exam.fullName}</p>

      <div className="flex items-center gap-2 text-xs text-success font-semibold mb-1">
        <Calendar className="w-3 h-3" />
        {exam.date}
      </div>
      <div className="flex items-center gap-2 text-xs text-neutral-muted">
        <Building2 className="w-3 h-3" />
        {exam.colleges}
      </div>

      <div className="mt-3 pt-3 border-t border-neutral-border">
        <span className="text-[10px] bg-cta/10 text-cta font-semibold px-2 py-1 rounded-full">
          {exam.mode}
        </span>
      </div>
    </div>
  );
}
