'use client';

import Link from 'next/link';
import { ArrowLeft, GraduationCap, CheckCircle, Target, Eye } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';

const ACHIEVEMENTS = [
  { text: '12+ Years of Experience in education consultancy', emoji: '🎓' },
  { text: '10,000+ Successful Admissions in reputed colleges', emoji: '🎓' },
  { text: '25,000+ One-to-One Career Counselling Sessions', emoji: '🎓' },
  { text: '100,000+ Students Guided through call & group counselling programs', emoji: '🎓' },
];

const SERVICES = [
  'College & University Selection Guidance',
  'Complete Admission Application Assistance',
  'Documentation & Form Filling Support',
  'Career Counseling (Personalized & Group)',
  'Scholarship Guidance',
  'Study Abroad Support',
  'Interview & Entrance Preparation Assistance',
];

export default function AboutPage() {
  return (
    <main className="flex-1 bg-section-gradient py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-cta transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

          <div className="bg-transparent rounded-2xl p-6 sm:p-8 md:p-10 text-glossy-black">
            <h1 className="font-heading font-bold text-2xl sm:text-3xl mb-2">
              About Us
            </h1>
            <p className="text-sm mb-8 opacity-90">
              College Eduversity – Admission Consultancy
            </p>

            <div className="prose prose-sm max-w-none space-y-8">
              <AnimatedSection>
                <section>
                  <p className="leading-relaxed">
                    College Eduversity is a trusted and experienced admission consultancy dedicated to guiding students toward the right academic and career path. With over 12 years of experience in the education industry, we have helped thousands of students achieve their dreams of higher education in India and abroad.
                  </p>
                  <p className="leading-relaxed mt-4">
                    We believe that every student deserves the right guidance, transparent support, and personalized counseling to make confident educational decisions.
                  </p>
                </section>
              </AnimatedSection>

              <AnimatedSection>
                <section>
                  <h2 className="font-heading font-semibold text-lg mt-8 mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-cta" />
                    Our Experience & Achievements
                  </h2>
                <ul className="space-y-3">
                  {ACHIEVEMENTS.map(({ text, emoji }) => (
                    <li
                      key={text}
                      className="flex items-start gap-3 leading-relaxed"
                    >
                      <span className="text-xl shrink-0" aria-hidden>{emoji}</span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
                <p className="leading-relaxed mt-4">
                  Our consistent results and student trust make us one of the growing names in admission consultancy services.
                </p>
                </section>
              </AnimatedSection>

              <AnimatedSection>
                <section>
                  <h2 className="font-heading font-semibold text-lg mt-8 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-cta" />
                    What We Do
                  </h2>
                <ul className="space-y-2">
                  {SERVICES.map((service) => (
                    <li
                      key={service}
                      className="flex items-start gap-2 leading-relaxed"
                    >
                      <span className="text-success shrink-0 mt-0.5">✔</span>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
                <p className="leading-relaxed mt-4">
                  We ensure that students receive accurate and updated information about institutions, eligibility, and admission procedures.
                </p>
                </section>
              </AnimatedSection>

              <AnimatedSection>
                <section>
                  <h2 className="font-heading font-semibold text-lg mt-8 mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-cta" />
                    Our Mission
                  </h2>
                <p className="leading-relaxed">
                  To provide honest, transparent, and professional guidance that helps students build successful academic careers.
                </p>
                </section>
              </AnimatedSection>

              <AnimatedSection>
                <section>
                  <h2 className="font-heading font-semibold text-lg mt-8 mb-3 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-cta" />
                    Our Vision
                  </h2>
                  <p className="leading-relaxed">
                    To become one of India&apos;s most reliable admission consultancy organizations, empowering students to achieve their educational goals with confidence.
                  </p>
                </section>
              </AnimatedSection>
            </div>
          </div>
        </div>
    </main>
  );
}
