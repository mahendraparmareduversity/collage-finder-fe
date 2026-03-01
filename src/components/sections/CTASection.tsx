import { useState } from 'react';
import { Phone, User, Mail, MessageSquare, BookOpen, Check, Star, GraduationCap, Award } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { ApiCourse } from '../../types';
import type { EnquiryPayload } from '../../types';

interface CTASectionProps {
  /** Courses from GET /api/courses for the course dropdown (value = _id, label = name). */
  courses?: ApiCourse[];
  /** Submit enquiry payload. Mobile required; name, email, description, courseId optional. */
  onSubmit: (payload: EnquiryPayload) => void | Promise<void>;
}

export default function CTASection({ courses = [], onSubmit }: CTASectionProps) {
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [courseId, setCourseId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  const handleSubmit = async () => {
    const trimmed = mobile.replace(/\D/g, '').slice(0, 10);
    if (trimmed.length < 10) {
      setFieldError('Enter a valid 10-digit mobile number');
      return;
    }
    setFieldError(null);
    setSubmitting(true);
    try {
      const payload: EnquiryPayload = {
        mobile: trimmed,
        ...(name.trim() && { name: name.trim() }),
        ...(email.trim() && { email: email.trim() }),
        ...(description.trim() && { description: description.trim() }),
        ...(courseId.trim() && { courseId: courseId.trim() }),
      };
      await onSubmit(payload);
      setMobile('');
      setName('');
      setEmail('');
      setDescription('');
      setCourseId('');
    } catch (e) {
      setFieldError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="cta"
      className="py-20 px-4 sm:px-6 bg-neutral-bg"
    >
      <div
        ref={ref}
        className={`max-w-2xl mx-auto text-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="text-xs font-bold uppercase tracking-[3px] text-cta mb-2">
          Free Career Counselling
        </p>
        <h2 className="font-heading font-semibold text-h2 text-neutral-text leading-tight mb-4">
          Not Sure Which College{' '}
          <span className="text-primary">to Choose?</span>
        </h2>
        <p className="text-neutral-muted text-base leading-relaxed mb-8">
          Talk to our expert counsellors for <strong className="text-neutral-text">FREE</strong>. We'll help
          you pick the right course, college, and career path based on your
          interests and scores.
        </p>

        <div className="space-y-3 max-w-md mx-auto text-left">
          <div className="flex items-center border-2 border-neutral-border focus-within:border-cta rounded-lg bg-white overflow-hidden transition-colors px-3 gap-2">
            <Phone className="w-4 h-4 text-neutral-muted shrink-0" />
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="Mobile number (required)"
              maxLength={10}
              className="flex-1 py-3 outline-none text-sm text-neutral-text placeholder-neutral-muted"
            />
          </div>
          <div className="flex items-center border-2 border-neutral-border focus-within:border-cta rounded-lg bg-white overflow-hidden transition-colors px-3 gap-2">
            <User className="w-4 h-4 text-neutral-muted shrink-0" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name (optional)"
              className="flex-1 py-3 outline-none text-sm text-neutral-text placeholder-neutral-muted"
            />
          </div>
          <div className="flex items-center border-2 border-neutral-border focus-within:border-cta rounded-lg bg-white overflow-hidden transition-colors px-3 gap-2">
            <Mail className="w-4 h-4 text-neutral-muted shrink-0" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional)"
              className="flex-1 py-3 outline-none text-sm text-neutral-text placeholder-neutral-muted"
            />
          </div>
          {courses.length > 0 && (
            <div className="flex items-center border-2 border-neutral-border focus-within:border-cta rounded-lg bg-white overflow-hidden transition-colors px-3 gap-2">
              <BookOpen className="w-4 h-4 text-neutral-muted shrink-0" />
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="flex-1 py-3 outline-none text-sm text-neutral-text bg-transparent w-full"
              >
                <option value="">Course of interest (optional)</option>
                {courses.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
          )}
          <div className="flex items-start border-2 border-neutral-border focus-within:border-cta rounded-lg bg-white overflow-hidden transition-colors px-3 gap-2 pt-2">
            <MessageSquare className="w-4 h-4 text-neutral-muted shrink-0 mt-3" />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Your message (optional)"
              rows={3}
              className="flex-1 py-2 outline-none text-sm text-neutral-text placeholder-neutral-muted resize-none"
            />
          </div>
          {fieldError && (
            <p className="text-sm text-red-600">{fieldError}</p>
          )}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-cta hover:bg-cta-hover disabled:opacity-60 text-white py-3 px-5 rounded-btn font-bold text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cta/30"
          >
            {submitting ? 'Submitting…' : 'Get Expert Guidance'}
          </button>
        </div>

        <p className="text-xs text-neutral-muted mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-success" /> 100% Free</span>
          <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-success" /> No Spam</span>
          <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-success" /> Response within 24 hrs</span>
        </p>

        <p className="text-xs text-neutral-muted mt-3 max-w-sm mx-auto">
          Your details are safe. We never share your data.
        </p>

        <div className="flex justify-center gap-6 mt-8 flex-wrap">
          {[
            { Icon: Star, text: '4.8/5 Rating' },
            { Icon: GraduationCap, text: '2 Lakh+ Students' },
            { Icon: Award, text: '15+ Years Experience' },
          ].map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-neutral-muted font-medium">
              <Icon className="w-5 h-5 text-cta shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
