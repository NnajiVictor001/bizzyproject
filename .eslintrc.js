module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:cypress/recommended'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'prettier', 'cypress'],
  rules: {
    'no-param-reassign': 0,
    camelcase: 0,
    'react/function-component-definition': 0,
    'react/jsx-filename-extension': 0,
    'prefer-destructuring': ['error', { object: true, array: false }],
    'no-plusplus': 0,
    'react/prop-types': 0, // disable this until refactoring on prop types
    'react/no-array-index-key': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'no-loop-func': 0,
    'no-nested-ternary': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-unsafe-optional-chaining': 0,
    radix: 0,
    'import/prefer-default-export': 0,
    'no-bitwise': 0,
    'react/jsx-props-no-spreading': 0,
    'no-throw-literal': 0,
    'react/button-has-type': 0,
    'no-prototype-builtins': 0,
    'jsx-a11y/no-autofocus': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'no-return-await': 0,
    'no-console': 0,
    'react/no-unstable-nested-components': 0,
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }
    ],
    'cypress/unsafe-to-chain-command': 0
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/']
      }
    }
  }
};
