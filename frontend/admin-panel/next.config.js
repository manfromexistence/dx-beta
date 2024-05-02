// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

/** @type {import("next").NextConfig} */
const config = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "utfs.io",
        },
      ],
      unoptimized: true,
    },
    experimental: {
      ppr: true,
    },
  }
  
  module.exports = config
  