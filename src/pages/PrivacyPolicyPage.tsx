import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedSection from '../components/ui/AnimatedSection';

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();
  const scrollToCTA = () => {
    navigate('/#cta');
    setTimeout(() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onCounsellingClick={scrollToCTA} />

      <main className="flex-1 bg-section-gradient py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-cta transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <div className="bg-transparent rounded-2xl p-6 sm:p-8 md:p-10 text-glossy-black">
            <h1 className="font-heading font-bold text-2xl sm:text-3xl mb-2">
              Privacy Policy
            </h1>
            <p className="text-sm mb-8 opacity-90">
              College Eduversity – Last updated: 2025
            </p>

            <div className="prose prose-sm max-w-none space-y-6">
              <AnimatedSection>
                <section>
                  <h2 className="font-heading font-semibold text-lg mt-6 mb-2">1. Introduction</h2>
                  <p className="leading-relaxed">
                    College Eduversity (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our admission consultancy services, website, or get in touch with us.
                  </p>
                </section>
              </AnimatedSection>

              <AnimatedSection>
                <section>
                  <h2 className="font-heading font-semibold text-lg mt-6 mb-2">2. Information We Collect</h2>
                <p className="leading-relaxed mb-2">We may collect:</p>
                <ul className="list-disc pl-5 space-y-1 leading-relaxed">
                  <li>Name, email address, phone number, and other contact details</li>
                  <li>Academic information (marks, stream, preferred course, college preferences)</li>
                  <li>Documents you submit for counselling or application support</li>
                  <li>Usage data when you visit our website (e.g. pages viewed, device type)</li>
                </ul>
                </section>
              </AnimatedSection>

              <AnimatedSection>
                <section>
                  <h2 className="font-heading font-semibold text-lg mt-6 mb-2">3. How We Use Your Information</h2>
                <p className="leading-relaxed mb-2">We use your information to:</p>
                <ul className="list-disc pl-5 space-y-1 leading-relaxed">
                  <li>Provide admission guidance, college selection, and counselling</li>
                  <li>Process enquiries and communicate with you</li>
                  <li>Send relevant updates about colleges, courses, or events (with your consent)</li>
                  <li>Improve our services and website experience</li>
                  <li>Comply with legal or regulatory requirements</li>
                </ul>
                </section>
              </AnimatedSection>

              <AnimatedSection>
                <section>
                  <h2 className="font-heading font-semibold text-lg mt-6 mb-2">4. Sharing of Information</h2>
                <p className="leading-relaxed">
                  We do not sell your personal data. We may share your information only with partner colleges or institutions when necessary for admission-related processes, or when required by law. We ensure such parties handle your data in line with applicable privacy norms.
                </p>
                </section>
              </AnimatedSection>

              <AnimatedSection>
                <section>
                  <h2 className="font-heading font-semibold text-lg mt-6 mb-2">5. Data Security</h2>
                <p className="leading-relaxed">
                  We use reasonable technical and organisational measures to protect your personal information against unauthorised access, loss, or misuse. No method of transmission over the internet is 100% secure; we encourage you to share sensitive details only through official channels.
                </p>
                </section>
              </AnimatedSection>

              <AnimatedSection>
                <section>
                  <h2 className="font-heading font-semibold text-lg mt-6 mb-2">6. Your Rights</h2>
                <p className="leading-relaxed mb-2">You may:</p>
                <ul className="list-disc pl-5 space-y-1 leading-relaxed">
                  <li>Request access to or correction of your personal data</li>
                  <li>Withdraw consent for marketing communications at any time</li>
                  <li>Ask us to delete or restrict use of your data, subject to legal obligations</li>
                </ul>
                <p className="leading-relaxed mt-3">
                  To exercise these rights, contact us at eduversitycollege@gmail.com.
                </p>
                </section>
              </AnimatedSection>

              <AnimatedSection>
                <section>
                  <h2 className="font-heading font-semibold text-lg mt-6 mb-2">7. Cookies & Website</h2>
                <p className="leading-relaxed">
                  Our website may use cookies or similar technologies to improve functionality and user experience. You can adjust your browser settings to manage or disable cookies.
                </p>
                </section>
              </AnimatedSection>

              <AnimatedSection>
                <section>
                  <h2 className="font-heading font-semibold text-lg mt-6 mb-2">8. Changes to This Policy</h2>
                <p className="leading-relaxed">
                  We may update this Privacy Policy from time to time. The revised version will be posted on this page with an updated &quot;Last updated&quot; date. Continued use of our services after changes constitutes acceptance of the updated policy.
                </p>
                </section>
              </AnimatedSection>

              <AnimatedSection>
                <section>
                  <h2 className="font-heading font-semibold text-lg mt-6 mb-2">9. Contact Us</h2>
                  <p className="leading-relaxed">
                    For any privacy-related questions or requests, contact College Eduversity at eduversitycollege@gmail.com or through the contact form on our website.
                  </p>
                </section>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
