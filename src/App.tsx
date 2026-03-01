import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import SearchSection from './components/sections/SearchSection';
import CollegesSection from './components/sections/CollegesSection';
import EventsSection from './components/sections/EventsSection';
import CoursesSection from './components/sections/CoursesSection';
import WhySection from './components/sections/WhySection';
import CTASection from './components/sections/CTASection';
import FAQSection from './components/sections/FAQSection';
import ToastContainer from './components/ui/ToastContainer';
import EnquiryModal, { wasEnquiryModalDismissed } from './components/ui/EnquiryModal';
import { useColleges } from './hooks/useColleges';
import { useCourses } from './hooks/useCourses';
import { useEvents } from './hooks/useEvents';
import { useStreamsPopular } from './hooks/useStreams';
import { useToast } from './hooks/useToast';
import { submitEnquiry, EnquirySubmitError } from './api/enquiry';
import { CourseCategory } from './types';
import type { EnquiryPayload } from './types';

export default function App() {
  const navigate = useNavigate();
  const { courses } = useCourses();
  const {
    colleges,
    pagination,
    loading,
    error,
    filters,
    setCategory,
    setState,
    setSearchQuery,
    setCourseId,
    resetFilters,
    loadMore,
    hasNextPage,
  } = useColleges();
  const {
    events,
    loading: eventsLoading,
    hasNextPage: eventsHasNext,
    loadingMore: eventsLoadingMore,
    loadMore: eventsLoadMore,
  } = useEvents(12);
  const { streams, loading: streamsLoading } = useStreamsPopular(9);
  const { toasts, showToast } = useToast();
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!wasEnquiryModalDismissed()) setShowEnquiryModal(true);
    }, 7000);
    return () => clearTimeout(t);
  }, []);

  const scrollToColleges = () => {
    document.getElementById('colleges')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCTA = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCourseSelect = (key: CourseCategory) => {
    setCategory(key);
    resetFilters();
    setCategory(key);
    scrollToColleges();
  };

  const slugify = (s: string) =>
    s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const handleStreamSelect = (slug: string) => {
    resetFilters();
    const course = courses.find(
      (c) =>
        c.slug?.toLowerCase() === slug.toLowerCase() ||
        slugify(c.name) === slug.toLowerCase()
    );
    if (course) setCourseId(course._id);
    scrollToColleges();
  };

  const handleApply = () => {
    scrollToCTA();
  };

  const handleView = (slug: string) => {
    navigate(`/college/${slug}`);
  };

  const handleViewEvent = (id: string) => {
    navigate(`/events/${id}`);
  };

  const handleEnquirySubmit = async (payload: EnquiryPayload) => {
    try {
      await submitEnquiry(payload);
      showToast("We've received your enquiry. We'll get back to you within 24 hours.");
    } catch (e) {
      const msg = e instanceof EnquirySubmitError && e.errors?.length
        ? e.errors.map((x) => x.message).join('. ')
        : e instanceof Error ? e.message : 'Failed to submit. Please try again.';
      showToast(msg);
      throw e;
    }
  };

  const handleSearch = () => {
    scrollToColleges();
  };

  return (
    <div className="min-h-screen">
      <Navbar onCounsellingClick={scrollToCTA} />

      <main>
        <HeroSection
          onExploreClick={scrollToColleges}
          onCounsellingClick={scrollToCTA}
        />

        <SearchSection
          query={filters.searchQuery}
          onQueryChange={setSearchQuery}
          onCategoryChange={(c) => {
            setCategory(c);
            scrollToColleges();
          }}
          onSearch={handleSearch}
          courses={courses}
          selectedCourseId={filters.courseId ?? null}
          onCourseChange={(id) => {
            setCourseId(id);
            scrollToColleges();
          }}
        />

        <CollegesSection
          colleges={colleges}
          filters={filters}
          loading={loading}
          error={error}
          pagination={pagination}
          hasNextPage={hasNextPage}
          courses={courses}
          onCategoryChange={setCategory}
          onCourseChange={setCourseId}
          onStateChange={setState}
          onApply={handleApply}
          onView={handleView}
          onLoadMore={loadMore}
        />

        <EventsSection
          events={events}
          loading={eventsLoading}
          hasNextPage={eventsHasNext}
          loadingMore={eventsLoadingMore}
          onView={handleViewEvent}
          onLoadMore={eventsLoadMore}
        />

        <CoursesSection
          streams={streams}
          loading={streamsLoading}
          onStreamSelect={handleStreamSelect}
          onCourseSelect={handleCourseSelect}
        />

        <WhySection />

        <CTASection courses={courses} onSubmit={handleEnquirySubmit} />

        <FAQSection />
      </main>

      <Footer />

      <EnquiryModal
        open={showEnquiryModal}
        onClose={() => setShowEnquiryModal(false)}
        courses={courses}
        onSubmit={handleEnquirySubmit}
      />

      <ToastContainer toasts={toasts} />
    </div>
  );
}
