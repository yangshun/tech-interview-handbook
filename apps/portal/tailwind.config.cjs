const config = require('@tih/tailwind-config/tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...config,
  // Extract styles from ui package instead of importing the ui package's generated CSS
  // file as the importing approach runs into style ordering issues.
  content: [...config.content, './../../packages/ui/src/**/*.{ts,tsx}'],
};
