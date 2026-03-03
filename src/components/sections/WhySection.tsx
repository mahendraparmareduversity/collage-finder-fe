import { Sparkles, CheckCircle, Users, BarChart3, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const FEATURES = [
  { Icon: Sparkles, title: 'Smart Matching', desc: 'Recommendations based on your marks, interests and budget' },
  { Icon: CheckCircle, title: 'Verified Data', desc: 'All fees, cutoffs and placement data verified directly from colleges' },
  { Icon: Users, title: 'Expert Counsellors', desc: '15+ years experienced counsellors available for free consultation' },
  { Icon: BarChart3, title: 'College Comparisons', desc: 'Compare colleges side-by-side on fees, placements, campus & more' },
];

const BUSINESS_EMAIL = 'eduversitycollege@gmail.com';

type StatItem = {
  title: string;
  desc?: string;
  wide: boolean;
  isEmail?: boolean;
  email?: string;
};

const STATS: StatItem[] = [
  { title: 'Students Successfully Placed', desc: 'Through our partner colleges and expert counselling', wide: true },
  { title: 'Colleges Across India', desc: 'Verified listings nationwide', wide: false },
  { title: 'Courses Covered', desc: 'Multiple streams and programmes', wide: false },
  { title: 'Contact', email: BUSINESS_EMAIL, wide: false, isEmail: true },
];

export default function WhySection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      className="py-20 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1E3550 0%, #2A476F 100%)' }}
    >
      {/* Subtle white grid on blue – same as hero */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
      <div
        ref={ref}
        className={`relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[3px] text-neutral-on-dark mb-2">
            Why College Eduversity?
          </p>
          <h2 className="font-heading font-semibold text-h2 text-white leading-tight mb-4">
            India's Most Trusted{' '}
            <span className="text-cta">College Discovery</span> Platform
          </h2>
          <p className="text-neutral-on-dark/80 leading-relaxed mb-8">
            We help lakhs of students make the right education choice every
            year. Our expert counsellors, verified data, and AI-powered tools
            make college search simple.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-xl p-4 hover:-translate-y-1 transition-all border border-primary/20"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <div className="w-10 h-10 rounded-lg bg-cta/20 flex items-center justify-center mb-2">
                  <Icon className="w-5 h-5 text-cta" />
                </div>
                <p className="font-heading font-semibold text-white text-sm mb-1">{title}</p>
                <p className="text-neutral-on-dark/70 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() =>
              document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="mt-8 bg-cta hover:bg-cta-hover text-white py-3 px-7 rounded-btn font-bold text-sm inline-flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cta/30"
          >
            Get Free Counselling <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {STATS.map((s) => {
            const cardClass = `rounded-2xl p-6 text-center transition-all border border-primary/20 ${
              s.wide ? 'col-span-2' : ''
            } ${s.isEmail ? 'hover:border-cta/50' : ''}`;
            const cardStyle = {
              background: s.wide ? 'rgba(249,115,22,0.12)' : 'rgba(255,255,255,0.06)',
              borderColor: s.wide ? 'rgba(249,115,22,0.3)' : undefined,
            };
            const content = s.isEmail ? (
              <>
                <p className="font-heading font-bold text-xl text-white leading-none">{s.title}</p>
                <p className="text-neutral-on-dark/80 text-xs break-all mt-2">{s.email}</p>
              </>
            ) : (
              <>
                <p className="font-heading font-bold text-xl text-white leading-tight">{s.title}</p>
                {s.desc && <p className="text-neutral-on-dark/80 text-sm mt-2">{s.desc}</p>}
              </>
            );
            const key = s.title + (s.email ?? '');
            return s.isEmail && s.email ? (
              <a key={key} href={`mailto:${s.email}`} className={cardClass} style={cardStyle}>
                {content}
              </a>
            ) : (
              <div key={key} className={cardClass} style={cardStyle}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
