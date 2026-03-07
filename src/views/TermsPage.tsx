'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';

export default function TermsPage() {
  return (
    <main className="flex-1 bg-section-gradient py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-cta transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <div className="bg-transparent rounded-2xl p-6 sm:p-8 md:p-10 text-glossy-black">
            <h1 className="font-heading font-bold text-2xl sm:text-3xl mb-2">
              Terms & Conditions
            </h1>
            <p className="text-sm mb-8 opacity-90">
              College Eduversity – Admission Consultancy Services
            </p>

            <div className="prose prose-sm max-w-none space-y-6">
              <AnimatedSection>
                <section>
                  <h2 className="font-heading font-semibold text-lg mt-6 mb-2">1. Introduction</h2>
                  <p className="leading-relaxed">
                    College Eduversity provides admission consultancy services for students seeking admission to
                    colleges and universities in India and abroad.
                  </p>
                </section>
              </AnimatedSection>

              <AnimatedSection>
                <section>
                  <h2 className="font-heading font-semibold text-lg mt-6 mb-2">2. Services Provided</h2>
                <ul className="list-disc pl-5 space-y-1 leading-relaxed">
                  <li>College and university selection guidance</li>
                  <li>Application and documentation support</li>
                  <li>Career counseling</li>
                  <li>Scholarship information (if applicable)</li>
                  <li>Interview preparation (if required)</li>
                </ul>
                <p className="leading-relaxed mt-3">
                  College Eduversity provides consultancy services only and does not guarantee admission,
                  scholarship, or visa approval.
                </p>
                </section>
              </AnimatedSection>

              <AnimatedSection>
                <section>
                  <h2 className="font-heading font-semibold text-lg mt-6 mb-2">3. Registration & Fees</h2>
                <ul className="list-disc pl-5 space-y-1 leading-relaxed">
                  <li>Registration fees are non-refundable.</li>
                  <li>Consultancy fees do not include tuition fees, exam fees, travel, or institutional charges.</li>
                  <li>Discounts, if offered, are valid for a limited period only.</li>
                </ul>
                </section>
              </AnimatedSection>

              <AnimatedSection>
                <section>
                  <h2 className="font-heading font-semibold text-lg mt-6 mb-2">4. Student Responsibilities</h2>
                <ul className="list-disc pl-5 space-y-1 leading-relaxed">
                  <li>Provide accurate academic and personal information.</li>
                  <li>Submit required documents on time.</li>
                  <li>Follow institutional deadlines and procedures.</li>
                </ul>
                <p className="leading-relaxed mt-3">
                  Providing false information may result in cancellation of services.
                </p>
                </section>
              </AnimatedSection>

              <AnimatedSection>
                <section>
                  <h2 className="font-heading font-semibold text-lg mt-6 mb-2">5. Payment Policy</h2>
                <ul className="list-disc pl-5 space-y-1 leading-relaxed">
                  <li>All payments must be made through official payment methods.</li>
                  <li>Consultancy fees once paid are non-refundable.</li>
                  <li>Additional services may incur extra charges.</li>
                </ul>
                </section>
              </AnimatedSection>

              <AnimatedSection>
                <section>
                  <h2 className="font-heading font-semibold text-lg mt-6 mb-2">6. Abroad Education & Visa</h2>
                <ul className="list-disc pl-5 space-y-1 leading-relaxed">
                  <li>Visa approval depends on embassy rules and regulations.</li>
                  <li>College Eduversity is not responsible for visa rejection.</li>
                  <li>Travel, accommodation, and living expenses are the student&apos;s responsibility.</li>
                </ul>
                </section>
              </AnimatedSection>

              <AnimatedSection>
                <section>
                  <h2 className="font-heading font-semibold text-lg mt-6 mb-2">7. Limitation of Liability</h2>
                <p className="leading-relaxed mb-2">
                  College Eduversity is not liable for:
                </p>
                <ul className="list-disc pl-5 space-y-1 leading-relaxed">
                  <li>Admission rejection</li>
                  <li>Visa rejection</li>
                  <li>Changes in institutional policies</li>
                  <li>Delays caused by third-party institutions</li>
                </ul>
                </section>
              </AnimatedSection>

              <AnimatedSection>
                <section>
                  <h2 className="font-heading font-semibold text-lg mt-6 mb-2">8. Confidentiality</h2>
                <p className="leading-relaxed">
                  All student information will be kept confidential and used only for admission purposes.
                </p>
                </section>
              </AnimatedSection>

              <AnimatedSection>
                <section>
                  <h2 className="font-heading font-semibold text-lg mt-6 mb-2">9. Modification of Terms</h2>
                <p className="leading-relaxed">
                  College Eduversity reserves the right to update these terms at any time without prior notice.
                </p>
                </section>
              </AnimatedSection>

              <AnimatedSection>
                <section>
                  <h2 className="font-heading font-semibold text-lg mt-6 mb-2">10. Jurisdiction</h2>
                  <p className="leading-relaxed">
                    All disputes are subject to the jurisdiction of courts in Madhya Pradesh, India.
                  </p>
                </section>
              </AnimatedSection>
            </div>
          </div>
        </div>
    </main>
  );
}
