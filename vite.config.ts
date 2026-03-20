import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  test: {
    passWithNoTests: true,
  },
  fmt: {
    bracketSameLine: true,
    printWidth: 80,
    proseWrap: 'never',
    singleQuote: true,
    trailingComma: 'all',
    sortPackageJson: false,
    overrides: [
      {
        files: ['apps/portal/**/*.{js,jsx,ts,tsx}'],
        options: {
          sortTailwindcss: {
            config: 'apps/portal/tailwind.config.cjs',
            functions: ['clsx'],
          },
        },
      },
    ],
    ignorePatterns: [
      'node_modules',
      '.vscode',
      '.next',
      'build',
      'dist',
      '*.tsbuildinfo',
      '*.gitignore',
      '*.svg',
      '*.lock',
      '*.npmignore',
      '*.sql',
      '*.png',
      '*.jpg',
      '*.jpeg',
      '*.gif',
      '*.ico',
      '*.sh',
      'Dockerfile',
      'Dockerfile.*',
      '.env',
      '.env.*',
      'LICENSE',
      '*.log',
      '.DS_Store',
      '.dockerignore',
      '*.patch',
      '*.toml',
      '*.prisma',
      'apps/website/experimental/domain/**/*.html',
    ],
  },
  lint: {
    plugins: ['typescript', 'react'],
    categories: {
      correctness: 'error',
    },
    settings: {
      next: {
        rootDir: ['apps/portal/'],
      },
    },
    ignorePatterns: [
      '.next/**',
      '.turbo/**',
      '.cache/**',
      'dist/**',
      'dist-ssr/**',
      'coverage/**',
      'public/dist/**',
      'server/dist/**',
      'apps/portal/build/**',
      'apps/portal/out/**',
      'apps/portal/prisma/**',
      'apps/website/.docusaurus/**',
      'apps/website/.cache-loader/**',
      'apps/website/experimental/**',
    ],
    rules: {
      camelcase: [
        'error',
        {
          properties: 'never',
          ignoreDestructuring: true,
        },
      ],
      'capitalized-comments': [
        'error',
        'always',
        {
          ignoreConsecutiveComments: true,
        },
      ],
      curly: 'error',
      eqeqeq: ['error', 'smart'],
      'func-names': ['error', 'as-needed'],
      'func-style': [
        'error',
        'declaration',
        {
          allowArrowFunctions: true,
        },
      ],
      'guard-for-in': 'error',
      'init-declarations': 'error',
      'no-console': [
        'error',
        {
          allow: ['warn', 'error', 'info'],
        },
      ],
      'no-else-return': [
        'error',
        {
          allowElseIf: false,
        },
      ],
      'no-lonely-if': 'error',
      'no-shadow': 'off',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
      'operator-assignment': 'error',
      'prefer-const': 'error',
      'prefer-destructuring': [
        'error',
        {
          object: true,
        },
      ],
      radix: 'error',
      'react/button-has-type': 'error',
      'react/display-name': 'off',
      'react/exhaustive-deps': 'off',
      'react/jsx-boolean-value': ['error', 'always'],
      'react/jsx-curly-brace-presence': [
        'error',
        {
          props: 'never',
          children: 'never',
        },
      ],
      'react/jsx-no-useless-fragment': 'error',
      'react/no-array-index-key': 'error',
      'react/no-unescaped-entities': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/void-dom-elements-no-children': 'error',
      'typescript/array-type': [
        'error',
        {
          default: 'generic',
          readonly: 'generic',
        },
      ],
      'typescript/ban-ts-comment': 'off',
      'typescript/consistent-generic-constructors': ['error', 'constructor'],
      'typescript/consistent-indexed-object-style': ['error', 'record'],
      'typescript/consistent-type-definitions': ['error', 'type'],
      'typescript/consistent-type-imports': 'error',
      'typescript/dot-notation': 'error',
      'typescript/no-duplicate-enum-values': 'error',
      'typescript/no-explicit-any': 'off',
      'typescript/no-for-in-array': 'error',
      'typescript/prefer-optional-chain': 'error',
      'typescript/require-array-sort-compare': 'error',
      'typescript/restrict-plus-operands': 'error',
    },
    overrides: [
      {
        files: ['apps/portal/**/*.{js,jsx,ts,tsx}'],
        plugins: ['typescript', 'react', 'nextjs'],
        rules: {
          'nextjs/no-html-link-for-pages': 'off',
          'nextjs/no-img-element': 'off',
        },
      },
    ],
  },
});
