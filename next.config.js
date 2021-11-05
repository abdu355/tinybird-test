const withTM = require("next-transpile-modules")([]);
module.exports = withTM({
  reactStrictMode: true,
  experimental: {
    concurrentFeatures: false,
    serverComponents: false,
  },
})
