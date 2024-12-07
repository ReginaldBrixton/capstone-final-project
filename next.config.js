/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./src/styles'],
    prependData: `
      @use "sass:math";
      @use "./src/styles/_variables.scss" as *;
      @use "./src/styles/_mixins.scss" as *;
    `,
    silenceDeprecations: ['legacy-js-api'],
  },
};

module.exports = nextConfig;
