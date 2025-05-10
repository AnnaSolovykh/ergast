module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
  tabWidth: 2,
  semi: true,
  importOrder: [
    '^react',
    '^@react',
    '^@?\\w',
    '^src/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
