import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

const SUPPORT_EMAIL = 'eduversitycollege@gmail.com';
const ADDRESS = '105 Bombay Tower 5, Indrapuri Bhawarkua, Indore, Madhya Pradesh 452001';
const MOBILE = ['8889577772', '7777883465'];
const INSTAGRAM_URL = 'https://www.instagram.com/college_eduversity?igsh=MW5wbGY5NDBldnp4eQ==';

export default function Footer() {
  const exploreLinks = [
    { label: 'Top Colleges', to: '/#colleges' },
    { label: 'Explore Courses', to: '/#courses' },
    { label: 'Latest Updates', to: '/#events' },
    { label: 'Study Abroad', to: '/study-abroad' },
    { label: 'Free Counselling', to: '/#cta' },
    { label: 'FAQ', to: '/#faq' },
    { label: 'About Us', to: '/about' },
  ];

  const courseLinks = [
    { label: 'B.Tech / Engineering', to: '/#colleges' },
    { label: 'MBA / PGDM', to: '/#colleges' },
    { label: 'MBBS / Medical', to: '/#colleges' },
    { label: 'Law (LLB)', to: '/#colleges' },
    { label: 'B.Com / M.Com', to: '/#colleges' },
    { label: 'BCA / MCA', to: '/#colleges' },
    { label: 'B.Design', to: '/#colleges' },
  ];

  const quickLinks = [
    { label: 'Compare Colleges', to: '/#colleges' },
    { label: 'Contact Us', to: '/#cta' },
  ];

  return (
    <footer className="text-neutral-on-dark bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-primary/20">
          {/* Brand & Contact — left-aligned, icon and text aligned */}
          <div className="text-left">
            <Link to="/" className="inline-block mb-4" aria-label="College Eduversity home">
              <img
                src="/logo2.png"
                alt="College Eduversity"
                className="h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-neutral-on-dark/90">
              India’s trusted college discovery platform. Helping students and parents make the right education choice.
            </p>
            <div className="mt-4 space-y-3 text-sm text-neutral-on-dark/90">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cta shrink-0 mt-0.5" />
                <span className="min-w-0 leading-relaxed break-words">{ADDRESS}</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-cta shrink-0 mt-0.5" />
                <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-white transition-colors break-all">
                  {SUPPORT_EMAIL}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-cta shrink-0 mt-0.5" />
                <span className="min-w-0 flex flex-wrap gap-x-4 gap-y-1">
                  {MOBILE.map((num) => (
                    <a key={num} href={`tel:${num}`} className="hover:text-white transition-colors">
                      {num}
                    </a>
                  ))}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <InstagramIcon className="w-4 h-4 text-cta shrink-0 mt-0.5" />
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Explore — matches main sections */}
          <div className="text-left">
            <h4 className="font-heading font-bold text-white text-sm mb-4">
              Explore
            </h4>
            <ul className="space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-neutral-on-dark hover:text-cta transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses — streams that link to college list */}
          <div className="text-left">
            <h4 className="font-heading font-bold text-white text-sm mb-4">
              Courses
            </h4>
            <ul className="space-y-2">
              {courseLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-neutral-on-dark hover:text-cta transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="text-left">
            <h4 className="font-heading font-bold text-white text-sm mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-neutral-on-dark hover:text-cta transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright & legal */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center gap-4 pt-6 text-xs text-neutral-on-dark/70">
          <span>© {new Date().getFullYear()} College Eduversity. All rights reserved.</span>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
