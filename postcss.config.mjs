/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {}, // ✅ সঠিক নাম
    autoprefixer: {}, // ✅ ঠিক আছে
  },
};

export default config;
