/** @type {import('next').NextConfig} */


const withTM = require('next-transpile-modules')(['compress.js']);

const nextConfig = withTM({
  reactStrictMode: true,
})
module.exports = nextConfig
