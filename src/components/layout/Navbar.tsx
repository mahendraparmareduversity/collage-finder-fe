import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onCounsellingClick: () => void;
}

const NAV_LINKS = [
  { label: 'Courses', href: '/#courses' },
  { label: 'Top Colleges', href: '/#colleges' },
  { label: 'Latest Updates', href: '/#events' },
  { label: 'Study Abroad', href: '/study-abroad', isRoute: true },
  { label: 'About Us', href: '/about', isRoute: true },
];

export default function Navbar({ onCounsellingClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        className="sticky top-0 z-50 border-b border-primary/15 bg-surface shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20 sm:h-[5.25rem]">
          <a href="/" className="flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-200 rounded py-1">
            <img
              src="/logo.png"
              alt="College Eduversity"
              className="h-[5rem] sm:h-[7rem] w-auto object-contain"
            />
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              link.isRoute ? (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-neutral-text hover:text-cta text-base font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ) : (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-neutral-text hover:text-cta text-base font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              )
            )}
          </ul>

          <div className="flex items-center gap-4">
            <button
              onClick={onCounsellingClick}
              className="hidden sm:block bg-cta hover:bg-cta-hover text-white py-3.5 px-6 rounded-btn text-base font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cta/30"
            >
              Free Counselling
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-neutral-text p-1.5 hover:text-cta"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-primary/15 px-4 pb-4 bg-surface">
            <ul className="flex flex-col gap-1 pt-2">
              {NAV_LINKS.map((link) =>
                link.isRoute ? (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2.5 text-neutral-text hover:text-cta text-base font-medium transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2.5 text-neutral-text hover:text-cta text-base font-medium transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                )
              )}
              <li className="pt-2">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onCounsellingClick();
                  }}
                  className="w-full bg-cta text-white py-3.5 rounded-btn text-base font-semibold"
                >
                  Free Counselling
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
