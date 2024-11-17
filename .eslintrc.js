module.exports = {
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  rules: {
    'no-unused-vars': 'warn',
    'no-unused-expressions': 'warn',
    'react/no-unescaped-entities': 'off'
  }
}