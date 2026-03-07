/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Vercel: uses standalone when available; no extra config needed for default deploy
  // If your backend API is on another domain, set NEXT_PUBLIC_API_BASE_URL in Vercel env
};

export default nextConfig;
