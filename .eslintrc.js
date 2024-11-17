module.exports = {
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  rules: {
    'no-unused-vars': 'warn',
    'no-unused-expressions': 'warn',
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-undef': 'warn'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}