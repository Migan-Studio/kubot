module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {},
  parserOptions: {
    parser: '@typescript-eslint/parser', // TS를 ESLint 인식할 수 있는 형태 EStree로 변환
  },
}
