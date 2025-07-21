import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    domains: ['raw.githubusercontent.com', 'pokeapi.co'],
  },
};

export default nextConfig;
