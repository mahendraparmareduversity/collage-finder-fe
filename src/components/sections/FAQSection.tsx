import SectionHeader from '../ui/SectionHeader';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const FAQ_ITEMS = [
  { q: 'Is counselling really free?', a: 'Yes. Our expert career counselling is 100% free with no hidden charges.' },
  { q: 'How is your college data verified?', a: 'We verify fees, cutoffs and placement data directly from college official sources and NIRF.' },
  { q: 'Can parents join the counselling session?', a: 'Absolutely. We encourage students and parents to make the decision together.' },
];

export default function FAQSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="faq" className="bg-section-gradient py-20 px-4 sm:px-6">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <SectionHeader eyebrow="FAQ" title="Common " highlight="Questions" />
        <ul className="space-y-4">
          {FAQ_ITEMS.map((item) => (
            <li
              key={item.q}
              className="bg-surface-light rounded-lg p-5 border-2 border-primary/10 hover:border-primary/20 transition-colors duration-300"
            >
              <p className="font-heading font-semibold text-neutral-text mb-2">{item.q}</p>
              <p className="text-neutral-muted text-sm leading-relaxed">{item.a}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
