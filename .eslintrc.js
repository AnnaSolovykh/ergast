module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react-native/all',
    'prettier',
  ],
  plugins: ['unused-imports', '@typescript-eslint', 'import'],
  parser: '@typescript-eslint/parser',
  rules: {
    'react-native/no-inline-styles': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
  },
};
