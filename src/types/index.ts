export type CourseCategory =
  | 'All'
  | 'Engineering'
  | 'MBA'
  | 'Medical'
  | 'Law'
  | 'Design'
  | 'Commerce'
  | 'Pharmacy'
  | 'Architecture'
  | 'Data Science'
  | 'MCA';

export interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  category: CourseCategory;
  courses: string[];
  fee: string;
  rating?: number;
  badge: string;
  emoji?: string;
  nirf?: number;
  placementRate?: number;
  avgPackage?: string;
  shortName?: string | null;
  city?: string;
  stateId?: string | null;
  cityId?: string | null;
  description?: string | null;
  logoUrl?: string | null;
  coverImageUrl?: string | null;
  isVerified?: boolean;
}

export interface Course {
  key: CourseCategory;
  name: string;
  icon: string;
  count: string;
  colorBg: string;
  colorText: string;
  borderColor: string;
}

export interface Exam {
  id: string;
  name: string;
  fullName: string;
  date: string;
  colleges: string;
  emoji: string;
  mode: string;
}

export interface HeroStat {
  value: string;
  suffix: string;
  label: string;
}

export interface WhyFeature {
  icon: string;
  title: string;
  description: string;
}

export interface FilterState {
  category: CourseCategory;
  state: string;
  searchQuery: string;
  /** Course ID from GET /api/courses (24-char hex). Filter colleges by this course (used when selecting course or stream). */
  courseId?: string | null;
}

/** Stream from GET /api/streams/popular or GET /api/streams (Browse by Stream) */
export interface ApiStream {
  id: string;
  name: string;
  slug: string;
  collegeCount: number;
  iconUrl: string | null;
  iconKey: string | null;
}

/** Course from GET /api/courses (for dropdown; use _id as courseId when filtering colleges) */
export interface ApiCourse {
  _id: string;
  name: string;
  slug: string;
}

/** Event list item from GET /api/events (running + upcoming) */
export interface ApiEvent {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  shortDescription: string | null;
  imageUrl: string | null;
  venue: string | null;
  status: 'running' | 'upcoming';
}

/** Event detail from GET /api/events/:id */
export interface ApiEventDetail extends ApiEvent {
  longDescription: string | null;
  createdAt?: string;
  updatedAt?: string;
}

/** Paginated events list response */
export interface EventsListResponse {
  events: ApiEvent[];
  pagination: Pagination;
}

// ---------- API / Backend types ----------

/** Fee for a single course (from API) */
export interface CourseFee {
  course: string;
  fee: string;
}

/** Full college details (from GET /api/colleges/:slug) */
export interface CollegeDetail extends College {
  slug?: string;
  /** NIRF rank when available */
  nirfRank?: number | null;
  feeAmount?: number;
  feePeriod?: string;
  /** Fees per course – show when API provides them */
  courseFees?: CourseFee[];
  description?: string;
  highlights?: string[];
  eligibility?: string;
  facilities?: string[];
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  pinCode?: string;
  galleryUrls?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext?: boolean;
  hasPrev?: boolean;
}

/** Sort option for college list API */
export type CollegeListSort =
  | 'name_asc'
  | 'name_desc'
  | 'fee_asc'
  | 'fee_desc'
  | 'rating_desc'
  | 'nirf_asc'
  | 'newest'
  | 'relevance';

export interface CollegesListResponse {
  colleges: College[];
  pagination: Pagination;
}

/** Payload for POST /api/enquiries (Consumer Enquiry API). Mobile is required; rest optional. */
export interface EnquiryPayload {
  mobile: string;
  name?: string;
  email?: string;
  description?: string;
  courseId?: string;
}

/** Validation error from enquiry API (400). */
export interface EnquiryValidationError {
  field: string;
  message: string;
}

/** Success response data from POST /api/enquiries (201). */
export interface EnquiryResponseData {
  id: string;
  mobile: string;
  name?: string;
  email?: string;
  description?: string;
  courseId?: string;
  status: string;
  createdAt: string;
}
