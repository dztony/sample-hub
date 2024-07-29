/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  distDir: 'dist',
  sassOptions: {
    includePaths: [path.join(__dirname, 'src' ,'styles')],
    prependData: `@import "preLoad.scss";`,
  },
}

module.exports = nextConfig
