/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./src/styles'],
    quietDeps: true,
    logger: {
      silent: true
    }
  },
};

module.exports = nextConfig; 