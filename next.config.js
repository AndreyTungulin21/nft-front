const env = process.env.NODE_ENV
console.log(env)

const configs = {
  production: {
    urlPoint: 'https://nft.siera.tech:3001',
  },
  development: {
    // urlPoint: 'https://nft.siera.tech:3002',
    urlPoint: 'http://localhost:3001',
  },
}[env];

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  env: {
    ...configs
  },
  images: {
    domains: ['s3.sobix.io'],
    unoptimized: true,
    minimumCacheTTL: 20,
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig


