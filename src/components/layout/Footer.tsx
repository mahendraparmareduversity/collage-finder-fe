import { Mail } from 'lucide-react';

const SUPPORT_EMAIL = 'eduversitycollege@gmail.com';

export default function Footer() {
  const exploreLinks = [
    { label: 'Top Colleges', href: '#colleges' },
    { label: 'Explore Courses', href: '#courses' },
    { label: 'Events', href: '#events' },
    { label: 'Free Counselling', href: '#cta' },
    { label: 'FAQ', href: '#faq' },
  ];

  const courseLinks = [
    { label: 'B.Tech / Engineering', href: '#colleges' },
    { label: 'MBA / PGDM', href: '#colleges' },
    { label: 'MBBS / Medical', href: '#colleges' },
    { label: 'Law (LLB)', href: '#colleges' },
    { label: 'B.Com / M.Com', href: '#colleges' },
    { label: 'BCA / MCA', href: '#colleges' },
    { label: 'B.Design', href: '#colleges' },
  ];

  const quickLinks = [
    { label: 'Compare Colleges', href: '#colleges' },
    { label: 'Contact Us', href: `mailto:${SUPPORT_EMAIL}` },
  ];

  return (
    <footer className="text-neutral-on-dark bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div>
            <a href="/" className="inline-block mb-4">
              <img
                src="/logo.png"
                alt="College Eduversity"
                className="h-10 w-auto object-contain"
              />
            </a>
            <p className="text-sm leading-relaxed max-w-xs text-neutral-on-dark/90">
              India’s trusted college discovery platform. Helping students and parents make the right education choice.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-cta shrink-0" />
              <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-white transition-colors">
                {SUPPORT_EMAIL}
              </a>
            </div>
          </div>

          {/* Explore — matches main sections */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-4">
              Explore
            </h4>
            <ul className="space-y-2">
              {exploreLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-neutral-on-dark hover:text-cta transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses — streams that link to college list */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-4">
              Courses
            </h4>
            <ul className="space-y-2">
              {courseLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-neutral-on-dark hover:text-cta transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-neutral-on-dark hover:text-cta transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright & legal */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center gap-4 pt-6 text-xs text-neutral-on-dark/70">
          <span>© 2025 College Eduversity. All rights reserved.</span>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
