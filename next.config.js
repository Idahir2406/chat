/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_SECRET: "mysecret",
    NEXTAUTH_JWT_SECRET: "myjwtsecret",
    NEXTAUTH_JWT_SIGNING_KEY: "myjwtsigningkey",
    NEXTAUTH_JWT_ENCRYPTION_KEY: "myjwtencryptionkey",
    NEXTAUTH_URL: "https://chat-livid-omega.vercel.app/",
    NEXT_PUBLIC_API_URL: "https://chat-livid-omega.vercel.app",
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
