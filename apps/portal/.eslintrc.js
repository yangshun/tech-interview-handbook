module.exports = {
  root: true,
  extends: ['tih', 'next/core-web-vitals'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
};
