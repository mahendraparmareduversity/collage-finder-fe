import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Building2,
  Globe,
  Phone,
  Mail,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';
import { fetchCollegeBySlug } from '../api/colleges';
import type { CollegeDetail } from '../types';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

/** Hide placeholder/junk text (e.g. repeated URLs) – do not use for image URLs */
function isLikelyPlaceholder(text: string | undefined | null): boolean {
  if (!text || !text.trim()) return true;
  const t = text.trim();
  if (t.startsWith('http') && t.includes('mail.google')) return true;
  if (t.length > 300 && t.includes('http')) return true;
  return false;
}

/** Image URL is valid (not a junk link like Gmail). Use for logoUrl / coverImageUrl. */
function isValidImageUrl(url: string | undefined | null): boolean {
  if (!url || !url.trim()) return false;
  if (url.includes('mail.google') || url.includes('gmail.com')) return false;
  return true;
}

function isValidWebsite(url: string | undefined | null): boolean {
  if (!url || !url.trim()) return false;
  if (url.includes('mail.google') || url.includes('gmail.com')) return false;
  return true;
}

/** WhatsApp business number (India) – same as footer contact */
const WHATSAPP_NUMBER = '918889577772';

function getWhatsAppEnquiryUrl(college: CollegeDetail): string {
  const trim = (s: string) => (s || '').trim();
  const name = trim(college.name);
  const location = trim(college.location || college.city || college.state || '') || '—';
  const category = trim(college.category || '') || '—';
  const fee =
    college.fee?.trim() ||
    (college.feeAmount != null ? `₹${(Number(college.feeAmount) / 100000).toFixed(1)} L` : '—');
  const coursesList: string[] = (college.courses ?? [])
    .slice(0, 8)
    .map((c) => trim(c))
    .filter((c): c is string => c.length > 0);
  const coursesStr = coursesList.length
    ? coursesList.join(', ') + ((college.courses ?? []).length > 8 ? ` (+${(college.courses ?? []).length - 8} more)` : '')
    : '—';

  const lines = [
    "Hi, I'm interested in this college:",
    '',
    `*College:* ${name}`,
    `*Location:* ${location}`,
    `*Category:* ${category}`,
    `*Fee:* ${fee}`,
    `*Courses:* ${coursesStr}`,
    '',
    'Please share more details.',
  ];
  const text = lines.join('\n').trim();
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

export default function CollegeDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [college, setCollege] = useState<CollegeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    setLoading(true);
    setNotFound(false);
    fetchCollegeBySlug(slug)
      .then((data) => {
        if (data) setCollege(data);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const scrollToCTA = () => {
    navigate('/#cta');
    setTimeout(() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-bg">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cta border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-muted">Loading college details...</p>
        </div>
      </div>
    );
  }

  if (notFound || !college) {
    return (
      <div className="min-h-screen">
        <Navbar onCounsellingClick={scrollToCTA} />
        <main className="max-w-2xl mx-auto px-4 py-20 text-center">
          <p className="text-6xl mb-4">🏫</p>
          <h1 className="font-heading font-semibold text-xl text-neutral-text mb-2">
            College not found
          </h1>
          <p className="text-neutral-muted mb-6">
            The college you're looking for doesn't exist or is no longer listed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-cta font-semibold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const showAbout = college.description && !isLikelyPlaceholder(college.description);
  const showEligibility = college.eligibility && !isLikelyPlaceholder(college.eligibility);
  const showWebsite = college.website && isValidWebsite(college.website);

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden">
      <Navbar onCounsellingClick={scrollToCTA} />

      <main className="bg-neutral-bg min-w-0 overflow-x-hidden">
        {/* Full-width hero: cover image or logo so college image is visible and full */}
        <section className="w-full relative">
          <div
            className="w-full h-64 sm:h-80 md:h-96 bg-gradient-to-br from-navy to-navy-mid relative overflow-hidden"
            style={{
              backgroundImage:
                isValidImageUrl(college.coverImageUrl)
                  ? `url(${college.coverImageUrl})`
                  : isValidImageUrl(college.logoUrl)
                    ? `url(${college.logoUrl})`
                    : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
              <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-end gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-primary/20 backdrop-blur flex items-center justify-center shrink-0 border border-primary/30 overflow-hidden">
                  {isValidImageUrl(college.logoUrl) ? (
                    <img
                      src={college.logoUrl!}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Building2 className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                  )}
                </div>
                <div className="min-w-0">
                  {college.badge && (
                    <span className="inline-block px-3 py-1 rounded-full bg-cta text-white text-xs font-bold uppercase mb-2">
                      {college.badge}
                    </span>
                  )}
                  <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white leading-tight">
                    {college.name}
                  </h1>
                  <p className="text-white/90 text-sm mt-1 flex items-center gap-1">
                    <MapPin className="w-4 h-4 shrink-0" />
                    {college.location || [college.city, college.state].filter(Boolean).join(', ') || '—'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 min-w-0">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-neutral-muted hover:text-cta text-sm font-medium mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to colleges
          </Link>

          <div className="space-y-8">
            {/* 1. Quick info */}
            <section className="bg-surface rounded-2xl border border-neutral-border p-6 shadow-sm">
              <h2 className="font-heading font-semibold text-lg text-neutral-text mb-4">
                Quick info
              </h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-neutral-muted text-xs uppercase tracking-wide">Category</dt>
                  <dd className="font-medium text-neutral-text mt-0.5">{college.category || '—'}</dd>
                </div>
                {!(college as CollegeDetail).courseFees?.length && (
                  <div>
                    <dt className="text-neutral-muted text-xs uppercase tracking-wide">Fee</dt>
                    <dd className="font-bold text-neutral-text mt-0.5">
                      {college.fee
                        ? college.fee
                        : college.feeAmount != null
                          ? `₹${(Number(college.feeAmount) / 100000).toFixed(1)}L`
                          : '—'}
                    </dd>
                  </div>
                )}
                {(college.rating != null || college.nirfRank != null) && (
                  <div>
                    <dt className="text-neutral-muted text-xs uppercase tracking-wide">Rating / Rank</dt>
                    <dd className="font-medium text-neutral-text mt-0.5">
                      {college.rating != null && <span>{college.rating}/5</span>}
                      {college.rating != null && college.nirfRank != null && ' · '}
                      {college.nirfRank != null && <span>NIRF #{college.nirfRank}</span>}
                    </dd>
                  </div>
                )}
                {(college.placementRate != null || college.avgPackage) && (
                  <div>
                    <dt className="text-neutral-muted text-xs uppercase tracking-wide">Placements</dt>
                    <dd className="font-medium text-neutral-text mt-0.5">
                      {college.placementRate != null && <span>{college.placementRate}% placed</span>}
                      {college.placementRate != null && college.avgPackage && ' · '}
                      {college.avgPackage && <span>{college.avgPackage}</span>}
                    </dd>
                  </div>
                )}
                {college.courses && college.courses.length > 0 && (
                  <div className="sm:col-span-2">
                    <dt className="text-neutral-muted text-xs uppercase tracking-wide mb-1">Courses</dt>
                    <dd className="flex flex-wrap gap-2 mt-0.5">
                      {college.courses.map((c) => (
                        <span
                          key={c}
                          className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                        >
                          {c}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={scrollToCTA}
                  className="w-full sm:w-auto bg-cta hover:bg-cta-hover text-white py-3 px-6 rounded-btn font-bold text-sm transition-all"
                >
                  Get Free Counselling
                </button>
                <a
                  href={getWhatsAppEnquiryUrl(college)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#25D366] hover:bg-[#20BD5A] text-white py-3 px-6 rounded-btn font-bold text-sm transition-all"
                  aria-label="Enquire via WhatsApp"
                >
                  <WhatsAppIcon className="w-5 h-5 shrink-0" />
                  Enquire via WhatsApp
                </a>
              </div>
            </section>

            {/* Fees as per course */}
            {(college.courses?.length > 0 || (college as CollegeDetail).courseFees?.length) && (
              <section className="bg-surface rounded-2xl border border-neutral-border p-6 shadow-sm">
                <h2 className="font-heading font-semibold text-lg text-neutral-text mb-4">
                  Fees as per course
                </h2>
                {(college as CollegeDetail).courseFees?.length ? (
                  <div className="overflow-x-auto min-w-0">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-neutral-border">
                          <th className="text-left py-2 pr-4 text-neutral-muted font-semibold uppercase tracking-wide">
                            Course
                          </th>
                          <th className="text-left py-2 text-neutral-muted font-semibold uppercase tracking-wide">
                            Fee
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(college as CollegeDetail).courseFees!.map((row, i) => (
                          <tr key={i} className="border-b border-neutral-border last:border-0">
                            <td className="py-3 pr-4 font-medium text-neutral-text">{row.course}</td>
                            <td className="py-3 font-bold text-neutral-text">{row.fee || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <ul className="space-y-2 text-sm">
                    {college.courses!.map((course) => (
                      <li
                        key={course}
                        className="flex justify-between items-center py-2 border-b border-neutral-border last:border-0"
                      >
                        <span className="font-medium text-neutral-text">{course}</span>
                        <span className="font-bold text-neutral-text">
                          {college.fee
                            ? college.fee
                            : college.feeAmount != null
                              ? `₹${(Number(college.feeAmount) / 100000).toFixed(1)}L`
                              : '—'}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            {/* 2. About */}
            {showAbout && (
              <section className="bg-surface rounded-2xl border border-neutral-border p-6 shadow-sm min-w-0 overflow-hidden">
                <h2 className="font-heading font-semibold text-lg text-neutral-text mb-3">
                  About
                </h2>
                <p className="text-neutral-muted leading-relaxed break-words">
                  {college.description}
                </p>
              </section>
            )}

            {/* 3. Highlights */}
            {college.highlights && college.highlights.length > 0 && (
              <section className="bg-surface rounded-2xl border border-neutral-border p-6 shadow-sm min-w-0 overflow-hidden">
                <h2 className="font-heading font-semibold text-lg text-neutral-text mb-3">
                  Highlights
                </h2>
                <ul className="space-y-2">
                  {college.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-neutral-muted break-words">
                      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span className="min-w-0">{h}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* 4. Eligibility */}
            {showEligibility && (
              <section className="bg-surface rounded-2xl border border-neutral-border p-6 shadow-sm min-w-0 overflow-hidden">
                <h2 className="font-heading font-semibold text-lg text-neutral-text mb-3">
                  Eligibility
                </h2>
                <p className="text-neutral-muted leading-relaxed break-words">
                  {college.eligibility}
                </p>
              </section>
            )}

            {/* 5. Facilities */}
            {college.facilities && college.facilities.length > 0 && (
              <section className="bg-surface rounded-2xl border border-neutral-border p-6 shadow-sm">
                <h2 className="font-heading font-semibold text-lg text-neutral-text mb-3">
                  Facilities
                </h2>
                <div className="flex flex-wrap gap-2">
                  {college.facilities.map((f) => (
                    <span
                      key={f}
                      className="px-3 py-1.5 rounded-lg bg-neutral-bg border border-neutral-border text-sm text-neutral-text"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* 6. Contact */}
            {(showWebsite || college.phone || college.email || college.address) && (
              <section className="bg-surface rounded-2xl border border-neutral-border p-6 shadow-sm min-w-0 overflow-hidden">
                <h2 className="font-heading font-semibold text-lg text-neutral-text mb-4">
                  Contact
                </h2>
                <ul className="space-y-3 text-sm text-neutral-muted">
                  {showWebsite && (
                    <li className="min-w-0 overflow-hidden">
                      <a
                        href={college.website!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-cta break-all"
                      >
                        <Globe className="w-4 h-4 shrink-0" />
                        <span className="min-w-0 break-all">{college.website}</span>
                      </a>
                    </li>
                  )}
                  {college.phone && (
                    <li className="flex items-center gap-2">
                      <Phone className="w-4 h-4 shrink-0" />
                      <a href={`tel:${college.phone}`} className="hover:text-cta">
                        {college.phone}
                      </a>
                    </li>
                  )}
                  {college.email && (
                    <li className="flex items-center gap-2 min-w-0 overflow-hidden">
                      <Mail className="w-4 h-4 shrink-0" />
                      <a href={`mailto:${college.email}`} className="hover:text-cta break-all">
                        {college.email}
                      </a>
                    </li>
                  )}
                  {(college.address || college.pinCode) && (
                    <li className="flex items-start gap-2 min-w-0 overflow-hidden">
                      <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                      <span className="min-w-0 break-words">
                        {[college.address, college.pinCode].filter(Boolean).join(', ')}
                      </span>
                    </li>
                  )}
                </ul>
              </section>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
