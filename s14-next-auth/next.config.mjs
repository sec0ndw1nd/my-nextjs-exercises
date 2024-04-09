/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_SECRET: 'I_DONT_CARE',
  },
};

export default nextConfig;
