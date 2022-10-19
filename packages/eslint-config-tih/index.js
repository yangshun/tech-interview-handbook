/* eslint-disable sort-keys-fix/sort-keys-fix */

const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'sort-keys-fix',
    'typescript-sort-keys',
  ],
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    camelcase: [ERROR, { properties: 'never', ignoreDestructuring: true }],
    'capitalized-comments': [
      ERROR,
      'always',
      { ignoreConsecutiveComments: true },
    ],
    'consistent-this': ERROR,
    curly: ERROR,
    'dot-notation': ERROR,
    eqeqeq: [ERROR, 'smart'],
    'func-name-matching': ERROR,
    'func-names': [ERROR, 'as-needed'],
    'func-style': [ERROR, 'declaration', { allowArrowFunctions: true }],
    'guard-for-in': ERROR,
    'init-declarations': ERROR,
    'no-console': [ERROR, { allow: ['warn', 'error', 'info'] }],
    'no-else-return': [ERROR, { allowElseIf: false }],
    'no-extra-boolean-cast': ERROR,
    'no-lonely-if': ERROR,
    'no-shadow': OFF,
    'no-unused-vars': OFF, // Use @typescript-eslint/no-unused-vars instead.
    'object-shorthand': ERROR,
    'one-var': [ERROR, 'never'],
    'operator-assignment': ERROR,
    'prefer-arrow-callback': ERROR,
    'prefer-const': ERROR,
    'prefer-destructuring': [
      ERROR,
      {
        object: true,
      },
    ],
    radix: ERROR,
    'spaced-comment': ERROR,

    'react/button-has-type': ERROR,
    'react/display-name': OFF,
    'react/destructuring-assignment': [ERROR, 'always'],
    // 'react/hook-use-state': ERROR,
    'react/no-array-index-key': ERROR,
    'react/no-unescaped-entities': OFF,
    'react/void-dom-elements-no-children': ERROR,

    'react/jsx-boolean-value': [ERROR, 'always'],
    'react/jsx-curly-brace-presence': [
      ERROR,
      { props: 'never', children: 'never' },
    ],
    'react/jsx-no-useless-fragment': ERROR,
    'react/jsx-sort-props': [
      ERROR,
      {
        callbacksLast: true,
        shorthandFirst: true,
        reservedFirst: true,
      },
    ],

    '@next/next/no-img-element': OFF,
    '@next/next/no-html-link-for-pages': OFF,

    '@typescript-eslint/array-type': [
      ERROR,
      { default: 'generic', readonly: 'generic' },
    ],
    '@typescript-eslint/consistent-generic-constructors': [
      ERROR,
      'constructor',
    ],
    '@typescript-eslint/consistent-indexed-object-style': [ERROR, 'record'],
    '@typescript-eslint/consistent-type-definitions': [ERROR, 'type'],
    '@typescript-eslint/consistent-type-imports': ERROR,
    '@typescript-eslint/no-duplicate-enum-values': ERROR,
    '@typescript-eslint/no-for-in-array': ERROR,
    '@typescript-eslint/no-non-null-assertion': OFF,
    '@typescript-eslint/no-unused-vars': [ERROR, { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-shadow': ERROR,
    '@typescript-eslint/prefer-optional-chain': ERROR,
    '@typescript-eslint/require-array-sort-compare': ERROR,
    '@typescript-eslint/restrict-plus-operands': ERROR,
    '@typescript-eslint/sort-type-union-intersection-members': ERROR,

    // Sorting
    'typescript-sort-keys/interface': ERROR,
    'typescript-sort-keys/string-enum': ERROR,
    'sort-keys-fix/sort-keys-fix': ERROR,
    'simple-import-sort/exports': WARN,
    'simple-import-sort/imports': [
      WARN,
      {
        groups: [
          // Ext library & side effect imports.
          ['^~?\\w', '^\\u0000', '^@'],
          // Lib and hooks.
          ['^~/lib', '^~/hooks'],
          // Static data.
          ['^~/data'],
          // Components.
          ['^~/components'],
          // Other imports.
          ['^~/'],
          // Relative paths up until 3 level.
          [
            '^\\./?$',
            '^\\.(?!/?$)',
            '^\\.\\./?$',
            '^\\.\\.(?!/?$)',
            '^\\.\\./\\.\\./?$',
            '^\\.\\./\\.\\.(?!/?$)',
            '^\\.\\./\\.\\./\\.\\./?$',
            '^\\.\\./\\.\\./\\.\\.(?!/?$)',
          ],
          ['^~/types'],
          // {s}css files
          ['^.+\\.s?css$'],
          // Others that don't fit in.
          ['^'],
        ],
      },
    ],
  },
};
