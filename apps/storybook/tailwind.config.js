const config = require('@tih/tailwind-config/tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...config,
  content: [...config.content, './stories/**/*.{js,jsx,ts,tsx,md,mdx}'],
};
