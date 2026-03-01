import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onCounsellingClick: () => void;
}

const NAV_LINKS = [
  { label: 'Courses', href: '#courses' },
  { label: 'Top Colleges', href: '#colleges' },
  { label: 'Events', href: '#events' },
];

export default function Navbar({ onCounsellingClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        className="sticky top-0 z-50 border-b border-neutral-border bg-neutral-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
          <a href="/" className="flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-200 rounded py-1">
            <img
              src="/logo.png"
              alt="College Eduversity"
              className="h-[3.25rem] sm:h-[4.5rem] w-auto object-contain"
            />
          </a>

          <ul className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-neutral-text hover:text-cta text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={onCounsellingClick}
              className="hidden sm:block bg-cta hover:bg-cta-hover text-white py-3 px-5 rounded-btn text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cta/30"
            >
              Free Counselling
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-neutral-text p-1 hover:text-cta"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-neutral-border px-4 pb-4 bg-neutral-200">
            <ul className="flex flex-col gap-1 pt-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 text-neutral-text hover:text-cta text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onCounsellingClick();
                  }}
                  className="w-full bg-cta text-white py-3 rounded-btn text-sm font-semibold"
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
