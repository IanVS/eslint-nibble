import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import pluginPromise from 'eslint-plugin-promise';
import globals from 'globals';

export default [
  {
    ...js.configs.recommended,
    ignores: ['tests/fixtures/**/*.js', 'tests/fixtures/**/*.jsx'],
  },
  {
    ...importPlugin.flatConfigs.recommended,
    ignores: ['tests/fixtures/**/*.js', 'tests/fixtures/**/*.jsx'],
  },
  {
    ...pluginPromise.configs['flat/recommended'],
    ignores: ['tests/fixtures/**/*.js', 'tests/fixtures/**/*.jsx'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['tests/fixtures/files/multi-error/no-semi-plusplus.js'],
    rules: {
      semi: ['error', 'always'],
      'no-plusplus': 'error',
    },
  },
  {
    files: [
      'tests/fixtures/files/fatal-error/fatal.js',
      'tests/fixtures/files/jsx/no-semi.jsx',
      'tests/fixtures/files/semi-error/no-semi.js',
      'tests/fixtures/files/semi-okay/semi.js',
    ],
    rules: {
      semi: ['error', 'always'],
    },
  },
  {
    files: ['tests/fixtures/files/semi-warn/no-semi.js'],
    rules: {
      semi: ['warn', 'always'],
    },
  },
  {
    files: ['tests/fixtures/files/multi-error/two-unused.js'],
    rules: {
      'no-unused-vars': 'error',
    },
  },
];
