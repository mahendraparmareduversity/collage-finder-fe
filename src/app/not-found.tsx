import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
      <p className="text-6xl mb-4">🏫</p>
      <h1 className="font-heading font-semibold text-xl text-neutral-text mb-2">
        Page not found
      </h1>
      <p className="text-neutral-muted mb-6">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-cta font-semibold hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back to home
      </Link>
    </main>
  );
}
