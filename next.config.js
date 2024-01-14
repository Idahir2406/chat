/** @type {import('next').NextConfig} */
const nextConfig = {
  env:{
    NEXTAUTH_SECRET: "mysecret",
    NEXTAUTH_JWT_SECRET: "myjwtsecret",
    NEXTAUTH_JWT_SIGNING_KEY: "myjwtsigningkey",
    NEXTAUTH_JWT_ENCRYPTION_KEY: "myjwtencryptionkey",
    NEXTAUTH_URL: "http://localhost:3000/",
    NEXT_PUBLIC_API_URL: "http://localhost:3000",
  }
}

module.exports = nextConfig
