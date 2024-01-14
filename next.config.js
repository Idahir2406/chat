/** @type {import('next').NextConfig} */
const nextConfig = {
  env:{
    NEXTAUTH_SECRET: "mysecret",
    NEXTAUTH_JWT_SECRET: "myjwtsecret",
    NEXTAUTH_JWT_SIGNING_KEY: "myjwtsigningkey",
    NEXTAUTH_JWT_ENCRYPTION_KEY: "myjwtencryptionkey",
    NEXTAUTH_URL: "http://localhost:3000/",
    NEXT_PUBLIC_API_URL: "http://localhost:3000",
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
