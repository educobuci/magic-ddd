module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'next/core-web-vitals',
    'next/typescript',
  ],
  rules: {
    'prettier/prettier': 'error',
  },
}
