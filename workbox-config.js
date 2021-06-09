module.exports = {
  globDirectory: "dist/",
  globPatterns: ["**/*.{css,ico,svg,png,jpg,jpeg,webp,html,js,txt,woff,woff2}"],
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  swDest: "public/condidi/sw.js",
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|json)$/,
      handler: "StaleWhileRevalidate",
    },
  ],
};
