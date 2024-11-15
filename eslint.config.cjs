const nextPlugin = require('@next/eslint-plugin-next');
const typescriptParser = require('@typescript-eslint/parser');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');

module.exports = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      '@next/next': nextPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: 'readonly',
      },
    },
    settings: {
      react: {
        version: '19.0.0-rc-66855b96-20241106'
      }
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-unused-vars': 'off',
      'react/no-unescaped-entities': 'off',
      '@next/next/no-img-element': 'off'
    }
  }
];
