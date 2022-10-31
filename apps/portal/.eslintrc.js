module.exports = {
  root: true,
  extends: ['tih'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  rules: {
    '@typescript-eslint/ban-ts-comment': 0,
  },
};
