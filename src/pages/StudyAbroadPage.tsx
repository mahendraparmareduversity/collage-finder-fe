import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, ChevronLeft } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedSection from '../components/ui/AnimatedSection';
import studyAbroadData from '../data/studyAbroad.json';

const data = studyAbroadData as Record<string, string[]>;
const countries = Object.keys(data);

// Solid vibrant orange & solid dark navy (from your reference)
const CARD_BG_ORANGE = '#F47C3C';   // vibrant orange
const CARD_BG_NAVY = '#1E3550';     // solid dark blue

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h) + s.charCodeAt(i) | 0;
  return Math.abs(h);
}

function getCardBg(name: string): string {
  return hashStr(name) % 2 === 0 ? CARD_BG_ORANGE : CARD_BG_NAVY;
}

export default function StudyAbroadPage() {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const scrollToCTA = () => {
    navigate('/#cta');
    setTimeout(() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onCounsellingClick={scrollToCTA} />

      <main className="flex-1 bg-section-gradient py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-cta transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <div className="bg-transparent rounded-2xl p-6 sm:p-8 md:p-10 text-glossy-black">
            <h1 className="font-heading font-bold text-2xl sm:text-3xl mb-2 flex items-center gap-2">
              <Globe className="w-8 h-8 text-cta" />
              Study Abroad
            </h1>
            <p className="text-sm mb-10 opacity-90">
              Select a country to view colleges & universities we partner with. Contact us for admission guidance.
            </p>

            {selectedCountry === null ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {countries.map((country) => (
                  <AnimatedSection key={country}>
                    <button
                      type="button"
                      onClick={() => setSelectedCountry(country)}
                      className="w-full text-left py-4 px-5 rounded-xl bg-white/70 hover:bg-white border border-primary/15 hover:border-cta transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                    >
                      <span className="font-heading font-semibold text-primary block">{country}</span>
                      <span className="text-sm text-neutral-muted mt-0.5">
                        {data[country].length} institutions
                      </span>
                    </button>
                  </AnimatedSection>
                ))}
              </div>
            ) : (
              <AnimatedSection>
                <button
                  type="button"
                  onClick={() => setSelectedCountry(null)}
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-cta transition-colors mb-6"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to countries
                </button>
                <section>
                  <h2 className="font-heading font-semibold text-lg text-primary mb-4 flex items-center gap-2">
                    <span className="w-2 h-6 rounded-full bg-cta shrink-0" />
                    {selectedCountry}
                    <span className="text-sm font-normal text-neutral-muted ml-2">
                      ({data[selectedCountry].length} institutions)
                    </span>
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {data[selectedCountry].map((name) => (
                      <li
                        key={name}
                        className="text-sm leading-relaxed py-1.5 px-3 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-300"
                        style={{ background: getCardBg(name) }}
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                </section>
              </AnimatedSection>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
