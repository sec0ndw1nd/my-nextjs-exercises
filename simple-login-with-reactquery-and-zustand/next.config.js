const path = require('path');

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

/* module.exports = {
  ...nextConfig,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
}; */

// module.exports = {
//   ...nextConfig,
//   webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       '@': path.resolve(__dirname),
//     };
//     return config;
//   },
// };
