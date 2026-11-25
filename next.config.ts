import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tailwind CSS v4 runs as a Turbopack loader for every .css file
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Posts and pin assets are read from disk at build time. These lines make
  // sure Vercel also ships them with any server function that might need them.
  outputFileTracingIncludes: {
    "/pin/**": ["./assets/**/*", "./content/**/*"],
    "/ideas/**": ["./content/**/*"],
  },
};

export default nextConfig;
