/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
};
async function headers() {
  return [
    {
      // Apply this to all routes
      source: '/(.*)',  // This applies the header to all routes in your Next.js app
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; upgrade-insecure-requests; block-all-mixed-content"
        }
      ]
    }
  ];
}

export default nextConfig;



