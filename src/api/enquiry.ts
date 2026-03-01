import { EnquiryPayload, EnquiryValidationError } from '../types';
import { post } from './client';
import type { ApiError } from './client';

interface EnquirySuccessResponse {
  success: true;
  data: {
    id: string;
    mobile: string;
    name?: string;
    email?: string;
    description?: string;
    courseId?: string;
    status: string;
    createdAt: string;
  };
}

export class EnquirySubmitError extends Error {
  constructor(
    message: string,
    public errors?: EnquiryValidationError[]
  ) {
    super(message);
    this.name = 'EnquirySubmitError';
  }
}

/**
 * Submit student/customer enquiry to POST /api/enquiries.
 * Mobile is required; name, email, description, courseId are optional.
 * Throws EnquirySubmitError with optional field-level errors on 400.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<void> {
  const base = import.meta.env.VITE_API_BASE_URL;
  if (!base) {
    // No backend: resolve so UI can show success message
    return;
  }

  const body: Record<string, string> = {
    mobile: payload.mobile.trim(),
  };
  if (payload.name?.trim()) body.name = payload.name.trim();
  if (payload.email?.trim()) body.email = payload.email.trim();
  if (payload.description?.trim()) body.description = payload.description.trim();
  if (payload.courseId?.trim()) body.courseId = payload.courseId.trim();

  try {
    const res = await post<EnquirySuccessResponse>('/api/enquiries', body);
    if (!res.success) throw new EnquirySubmitError('Failed to submit enquiry');
  } catch (err) {
    if (err && typeof err === 'object' && 'data' in err) {
      const data = (err as { data?: ApiError }).data;
      if (data?.errors?.length) {
        throw new EnquirySubmitError(
          data.error || 'Validation failed',
          data.errors as EnquiryValidationError[]
        );
      }
      throw new EnquirySubmitError((data as ApiError)?.error || 'Failed to submit enquiry');
    }
    throw err instanceof EnquirySubmitError
      ? err
      : new EnquirySubmitError(err instanceof Error ? err.message : 'Failed to submit enquiry');
  }
}
