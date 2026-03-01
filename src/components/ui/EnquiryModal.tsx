import { useState } from 'react';
import { X, Phone, User, Mail, MessageSquare, BookOpen } from 'lucide-react';
import type { ApiCourse } from '../../types';
import type { EnquiryPayload } from '../../types';

const ENQUIRY_MODAL_KEY = 'enquiryModalDismissed';

export function wasEnquiryModalDismissed(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(ENQUIRY_MODAL_KEY) === '1';
}

export function setEnquiryModalDismissed(): void {
  sessionStorage.setItem(ENQUIRY_MODAL_KEY, '1');
}

interface EnquiryModalProps {
  open: boolean;
  onClose: () => void;
  courses?: ApiCourse[];
  onSubmit: (payload: EnquiryPayload) => void | Promise<void>;
}

export default function EnquiryModal({
  open,
  onClose,
  courses = [],
  onSubmit,
}: EnquiryModalProps) {
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [courseId, setCourseId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);

  const handleClose = () => {
    setEnquiryModalDismissed();
    onClose();
  };

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
      setEnquiryModalDismissed();
      onClose();
    } catch (e) {
      setFieldError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      {/* Backdrop — click to close */}
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-label="Close"
      />

      {/* Floating modal */}
      <div
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl border border-neutral-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-neutral-border bg-white rounded-t-2xl z-10">
          <h2 id="enquiry-modal-title" className="font-heading font-bold text-lg text-neutral-text">
            Get Free Counselling
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-lg text-neutral-muted hover:text-neutral-text hover:bg-neutral-bg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <p className="text-sm text-neutral-muted mb-4">
            Share your details and we&apos;ll get back within 24 hours.
          </p>

          <div className="flex items-center border-2 border-neutral-border focus-within:border-cta rounded-lg bg-neutral-bg overflow-hidden transition-colors px-3 gap-2">
            <Phone className="w-4 h-4 text-neutral-muted shrink-0" />
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="Mobile number (required)"
              maxLength={10}
              className="flex-1 py-3 outline-none text-sm text-neutral-text placeholder-neutral-muted bg-transparent"
            />
          </div>
          <div className="flex items-center border-2 border-neutral-border focus-within:border-cta rounded-lg bg-neutral-bg overflow-hidden transition-colors px-3 gap-2">
            <User className="w-4 h-4 text-neutral-muted shrink-0" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name (optional)"
              className="flex-1 py-3 outline-none text-sm text-neutral-text placeholder-neutral-muted bg-transparent"
            />
          </div>
          <div className="flex items-center border-2 border-neutral-border focus-within:border-cta rounded-lg bg-neutral-bg overflow-hidden transition-colors px-3 gap-2">
            <Mail className="w-4 h-4 text-neutral-muted shrink-0" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional)"
              className="flex-1 py-3 outline-none text-sm text-neutral-text placeholder-neutral-muted bg-transparent"
            />
          </div>
          {courses.length > 0 && (
            <div className="flex items-center border-2 border-neutral-border focus-within:border-cta rounded-lg bg-neutral-bg overflow-hidden transition-colors px-3 gap-2">
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
          <div className="flex items-start border-2 border-neutral-border focus-within:border-cta rounded-lg bg-neutral-bg overflow-hidden transition-colors px-3 gap-2 pt-2">
            <MessageSquare className="w-4 h-4 text-neutral-muted shrink-0 mt-3" />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Your message (optional)"
              rows={3}
              className="flex-1 py-2 outline-none text-sm text-neutral-text placeholder-neutral-muted resize-none bg-transparent"
            />
          </div>
          {fieldError && (
            <p className="text-sm text-red-600">{fieldError}</p>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-cta hover:bg-cta-hover disabled:opacity-60 text-white py-3 px-5 rounded-btn font-bold text-sm transition-all"
          >
            {submitting ? 'Submitting…' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}
