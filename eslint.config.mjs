import js from '@eslint/js';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

const config = [
  { ignores: ['.next/', 'node_modules/', 'next-env.d.ts'] },
  js.configs.recommended,
  ...nextVitals,
  ...nextTypescript,
  prettierRecommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: { projectService: true },
    },
    rules: {
      '@typescript-eslint/no-unsafe-argument': 'error',
    },
  },
  {
    // Config files at the root are CommonJS
    files: ['*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    rules: {
      'react/prop-types': 'off',
      // New in react-hooks 7; the existing mount/sync effects predate it
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
];

export default config;
